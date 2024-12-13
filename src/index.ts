import { SLOVAK_BANKS, BankInfo } from "./banks";
export * from "./validation";

export interface IBANValidationResult {
  valid: boolean;
  errors: string[];
  formatted: string | null;
  bank_swift: string | null;
  bank_name: string | null;
}

/**
 * Validates a Slovak IBAN number
 * Slovak IBAN format: SK + 2 digits + 4 digits (bank code) + 16 digits (account number)
 * Total length: 24 characters
 */
export class SlovakIBANValidator {
  private static readonly IBAN_LENGTH = 24;
  private static readonly COUNTRY_CODE = "SK";

  /**
   * Validates a Slovak IBAN number and returns detailed validation result
   * @param iban The IBAN number to validate
   * @param multipleErrors If true, returns an array of errors, otherwise returns the first error
   * @returns IBANValidationResult object containing validation details
   */
  public static validateIBAN(
    iban: string,
    multipleErrors = false
  ): IBANValidationResult {
    const result: IBANValidationResult = {
      valid: true,
      errors: [],
      formatted: null,
      bank_swift: null,
      bank_name: null,
    };

    // Remove spaces and convert to uppercase
    const normalizedIBAN = iban.replace(/\s/g, "").toUpperCase();

    // Check length
    if (normalizedIBAN.length !== this.IBAN_LENGTH) {
      result.errors.push(
        `Invalid length: expected ${this.IBAN_LENGTH} characters, got ${normalizedIBAN.length}`
      );
    }

    // Check country code
    if (!normalizedIBAN.startsWith(this.COUNTRY_CODE)) {
      result.errors.push(
        `Invalid country code: expected ${
          this.COUNTRY_CODE
        }, got ${normalizedIBAN.slice(0, 2)}`
      );
    }

    // Check if the rest consists of digits only
    const expectedRegex = new RegExp(
      `^${this.COUNTRY_CODE}\\d{${this.IBAN_LENGTH - 2}}$`
    );
    if (!expectedRegex.test(normalizedIBAN)) {
      result.errors.push(
        "Invalid format: IBAN should contain only digits after country code"
      );
    }

    // Check bank code
    if (normalizedIBAN.length >= 8) {
      const bankCode = normalizedIBAN.substring(4, 8);
      const bankInfo = SLOVAK_BANKS[bankCode];

      if (!bankInfo) {
        result.errors.push(`Unknown bank code: ${bankCode}`);
      } else {
        result.bank_swift = bankInfo.swift;
        result.bank_name = bankInfo.name;
      }
    }

    // Verify checksum
    if (!this.verifyChecksum(normalizedIBAN)) {
      result.errors.push("Invalid checksum");
    }

    // Set formatted value for valid IBAN
    result.formatted = normalizedIBAN.match(/.{1,4}/g)?.join(" ") || null;
    result.valid = result.errors.length === 0;

    if (!multipleErrors) {
      result.errors = result.errors.slice(0, 1);
    }

    return result;
  }

  private static verifyChecksum(iban: string): boolean {
    // Move the first 4 characters to the end
    const rearranged = iban.slice(4) + iban.slice(0, 4);

    // Convert letters to numbers (A=10, B=11, etc.)
    const converted = rearranged
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0);
        return code >= 65 && code <= 90 ? (code - 55).toString() : char;
      })
      .join("");

    // Split into chunks of 7 digits to avoid integer overflow
    const chunks = converted.match(/.{1,7}/g) || [];
    let remainder = 0;

    for (const chunk of chunks) {
      remainder = parseInt(remainder + chunk) % 97;
    }

    return remainder === 1;
  }
}
