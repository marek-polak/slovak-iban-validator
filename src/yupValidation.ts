import * as yup from "yup";
import { SlovakIBANValidator } from "./index";

yup.addMethod(yup.string, "isSlovakIBAN", function (message) {
  return this.test({
    name: "is-slovak-iban",
    message,
    test: (value: string | undefined, ctx) => {
      if (!value) return true;
      const result = SlovakIBANValidator.validateIBAN(value);
      return result.valid || ctx.createError({ message: result.errors[0] });
    },
  }).transform((value) => {
    if (!value) return value;
    const result = SlovakIBANValidator.validateIBAN(value);
    return result.formatted || value;
  });
});

/**
 * Creates a Yup validator for Slovak IBAN
 * @returns Yup string schema with Slovak IBAN validation
 */
export const createYupValidator = () => {
  return yup.string().isSlovakIBAN();
};

// Export the type augmentation
declare module "yup" {
  interface StringSchema {
    isSlovakIBAN(message?: string): StringSchema;
  }
}
