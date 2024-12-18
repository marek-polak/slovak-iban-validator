import { z } from "zod";
import { createZodValidator, ZodIBANResult } from "../zodValidation";
import { SlovakIBANValidator } from "../validator";

describe("Validation Library ZodIntegration", () => {
  // Valid IBAN for Tatra banka
  const validIBAN = "SK5911000000002610001237";
  const formattedIBAN = "SK59 1100 0000 0026 1000 1237";
  const invalidIBAN = "SK311200";
  let schema: z.ZodObject<{ iban: ReturnType<typeof createZodValidator> }>;

  beforeEach(() => {
    // Set English language for consistent error messages in tests
    SlovakIBANValidator.setLanguage('en');
    schema = z.object({
      iban: createZodValidator(),
    });
  });

  it("should validate correct IBAN", () => {
    const result = schema.safeParse({ iban: validIBAN });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.iban).toEqual({
        raw: validIBAN,
        formatted: formattedIBAN,
        bank_name: "Tatra banka, a.s.",
        bank_swift: "TATRSKBX",
        valid: true,
      });
    }
  });

  it("should validate formatted IBAN", () => {
    const result = schema.safeParse({ iban: formattedIBAN });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.iban.formatted).toBe(formattedIBAN);
    }
  });

  it("should handle invalid IBAN", () => {
    const result = schema.safeParse({ iban: invalidIBAN });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Invalid length: expected 24 characters, got 8"
      );
    }
  });

  it("should handle empty IBAN", () => {
    const result = schema.safeParse({ iban: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Invalid length: expected 24 characters, got 0"
      );
    }
  });

  it("should handle missing IBAN field", () => {
    const result = schema.safeParse({});
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Required");
    }
  });

  it("should handle multiple validation errors", () => {
    const invalidFormatIBAN = "SK59AB0000002610001237"; // Contains letters instead of numbers
    const result = schema.safeParse({ iban: invalidFormatIBAN });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThan(0);
    }
  });

  it("should transform IBAN to result object", () => {
    const validator = createZodValidator();
    const result = validator.safeParse(invalidIBAN);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Invalid length: expected 24 characters, got 8"
      );
    }
  });

  it("should handle optional IBAN", () => {
    const optionalSchema = z.object({
      iban: createZodValidator().optional(),
    });

    const result = optionalSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it("should handle nullable IBAN", () => {
    const nullableSchema = z.object({
      iban: createZodValidator().nullable(),
    });

    const result = nullableSchema.safeParse({ iban: null });
    expect(result.success).toBe(true);
  });
});
