import * as yup from "yup";
import { createYupValidator } from "../yupValidation";
import { SlovakIBANValidator } from "../validator";

describe("Validation Library Yup Integration", () => {
  // Valid IBAN for Tatra banka
  const validIBAN = "SK5911000000002610001237";
  const formattedIBAN = "SK59 1100 0000 0026 1000 1237";
  const invalidIBAN = "SK311200";
  let schema: yup.ObjectSchema<{ iban: string }>;

  beforeEach(() => {
    // Set English language for consistent error messages in tests
    SlovakIBANValidator.setLanguage('en');
    schema = yup.object({
      iban: createYupValidator().required(),
    });
  });

  it("should validate correct IBAN", async () => {
    const result = await schema.validate({ iban: validIBAN });
    expect(result.iban).toBe(formattedIBAN);
  });

  it("should validate formatted IBAN", async () => {
    const result = await schema.validate({ iban: formattedIBAN });
    expect(result.iban).toBe(formattedIBAN);
  });

  it("should handle invalid IBAN", async () => {
    await expect(schema.validate({ iban: invalidIBAN })).rejects.toThrow(
      "Invalid length: expected 24 characters, got 8"
    );
  });

  it("should handle empty IBAN when required", async () => {
    await expect(schema.validate({ iban: "" })).rejects.toThrow(
      "iban is a required field"
    );
  });

  it("should handle undefined IBAN when required", async () => {
    await expect(schema.validate({})).rejects.toThrow(
      "iban is a required field"
    );
  });

  it("should handle optional IBAN", async () => {
    const optionalSchema = yup.object({
      iban: createYupValidator(),
    });

    const result = await optionalSchema.validate({});
    expect(result.iban).toBeUndefined();
  });

  it("should handle null IBAN when optional", async () => {
    const optionalSchema = yup.object({
      iban: createYupValidator().nullable(),
    });

    const result = await optionalSchema.validate({ iban: null });
    expect(result.iban).toBeNull();
  });

  it("should transform invalid IBAN", async () => {
    const optionalSchema = yup.object({
      iban: createYupValidator(),
    });

    await expect(optionalSchema.validate({ iban: invalidIBAN })).rejects.toThrow();
    
    // Test the transform function directly
    const validator = createYupValidator();
    const result = await validator.validate(invalidIBAN).catch(error => error.value);
    expect(result.replace(/\s/g, "")).toBe(invalidIBAN);
  });
});
