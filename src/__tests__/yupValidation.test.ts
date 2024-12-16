import * as yup from "yup";
import { createYupValidator } from "../yupValidation";

describe("Validation Library Yup Integration", () => {
  // Valid IBAN for Tatra banka
  const validIBAN = "SK5911000000002610001237";
  const formattedIBAN = "SK59 1100 0000 0026 1000 1237";
  const invalidIBAN = "SK311200";

  let schema: yup.ObjectSchema<{ iban: string }>;

  beforeEach(() => {
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
});
