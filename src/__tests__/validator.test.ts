import { SlovakIBANValidator } from "../index";

const ibanForBankCode = (bankCode: string): string => {
  const bban = `${bankCode}${"0".repeat(16)}`;
  const rearranged = `${bban}282000`;
  let remainder = 0;

  for (const digit of rearranged) {
    remainder = (remainder * 10 + Number(digit)) % 97;
  }

  const checkDigits = String(98 - remainder).padStart(2, "0");
  return `SK${checkDigits}${bban}`;
};

describe("SlovakIBANValidator", () => {
  // Valid IBAN for Tatra banka
  const validIBAN = "SK5911000000002610001237";
  const formattedIBAN = "SK59 1100 0000 0026 1000 1237";

  describe("validateIBAN", () => {
    it("should validate correct IBAN", () => {
      const result = SlovakIBANValidator.validateIBAN(validIBAN);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.formatted).toBe(formattedIBAN);
      expect(result.bank_name).toBe("Tatra banka, a.s.");
      expect(result.bank_swift).toBe("TATRSKBX");
    });

    it("should return the NBS bank details for code 7300", () => {
      const result = SlovakIBANValidator.validateIBAN(ibanForBankCode("7300"));

      expect(result.valid).toBe(true);
      expect(result.bank_name).toBe(
        "ING Bank N.V., pobočka zahraničnej banky"
      );
      expect(result.bank_swift).toBe("INGBSKBX");
    });

    it("should return the NBS bank details for code 8320", () => {
      const result = SlovakIBANValidator.validateIBAN(ibanForBankCode("8320"));

      expect(result.valid).toBe(true);
      expect(result.bank_name).toBe(
        "J&T BANKA, a.s., pobočka zahraničnej banky"
      );
      expect(result.bank_swift).toBe("JTBPSKBA");
    });

    it("should return the NBS bank details for code 6500", () => {
      const result = SlovakIBANValidator.validateIBAN(ibanForBankCode("6500"));

      expect(result.valid).toBe(true);
      expect(result.bank_name).toBe("365.bank, a.s.");
      expect(result.bank_swift).toBe("POBNSKBA");
    });

    it("should allow an NBS provider without a BIC", () => {
      const result = SlovakIBANValidator.validateIBAN(ibanForBankCode("8400"));

      expect(result.valid).toBe(true);
      expect(result.bank_name).toBe("COFIDIS SA, pobočka zahraničnej banky");
      expect(result.bank_swift).toBeNull();
    });

    it("should reject removed bank code 5200", () => {
      const result = SlovakIBANValidator.validateIBAN(
        ibanForBankCode("5200"),
        { locale: "en" }
      );

      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Unknown bank code: 5200");
    });

    it("should validate formatted IBAN", () => {
      const result = SlovakIBANValidator.validateIBAN(formattedIBAN);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should handle invalid length", () => {
      const result = SlovakIBANValidator.validateIBAN("SK311200", {
        locale: "en",
      });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain(
        "Invalid length: expected 24 characters, got 8"
      );
    });

    it("should handle invalid country code", () => {
      const result = SlovakIBANValidator.validateIBAN(
        "CZ8511000000002611803119",
        { locale: "en" }
      );
      expect(result.valid).toBe(false);
      expect(result.errors).toContain(
        "Invalid country code: expected SK, got CZ"
      );
    });

    it("should handle invalid format", () => {
      const result = SlovakIBANValidator.validateIBAN(
        "SK85AB000000002611803119",
        { locale: "en" }
      );
      expect(result.valid).toBe(false);
      expect(result.errors).toContain(
        "Invalid format: IBAN should contain only digits after country code"
      );
    });

    it("should handle unknown bank code", () => {
      const result = SlovakIBANValidator.validateIBAN(
        "SK8599000000002611803119",
        { locale: "en" }
      );
      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Unknown bank code: 9900");
    });

    it("should handle invalid checksum", () => {
      const result = SlovakIBANValidator.validateIBAN(
        "SK8511000000002611803118",
        { locale: "en" }
      );
      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Invalid checksum");
    });

    it("should handle empty input", () => {
      const result = SlovakIBANValidator.validateIBAN("", { locale: "en" });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain(
        "Invalid length: expected 24 characters, got 0"
      );
    });
  });

  describe("localization", () => {
    it("should default to Slovak messages", () => {
      const result = SlovakIBANValidator.validateIBAN(
        "SK0011000000002610001237"
      );
      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Neplatný kontrolný súčet");
    });

    it("should return Slovak country code error by default", () => {
      const result = SlovakIBANValidator.validateIBAN(
        "CZ8511000000002611803119"
      );
      expect(result.valid).toBe(false);
      expect(result.errors).toContain(
        "Neplatný kód krajiny: očakávaný SK, zadaný CZ"
      );
    });

    it("should return Slovak length error by default", () => {
      const result = SlovakIBANValidator.validateIBAN("SK311200");
      expect(result.valid).toBe(false);
      expect(result.errors).toContain(
        "Neplatná dĺžka: očakávaných 24 znakov, zadaných 8"
      );
    });

    it("should still support boolean second arg for multipleErrors", () => {
      const result = SlovakIBANValidator.validateIBAN("SK311200", true);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
      expect(result.errors).toContain(
        "Neplatná dĺžka: očakávaných 24 znakov, zadaných 8"
      );
    });

    it("should support multipleErrors via options object", () => {
      const result = SlovakIBANValidator.validateIBAN("SK311200", {
        multipleErrors: true,
        locale: "en",
      });
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });
  });
});
