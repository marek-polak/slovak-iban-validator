import * as yup from 'yup';
import { z } from 'zod';
import { SlovakIBANValidator } from './index';

/**
 * Creates a Yup validator for Slovak IBAN
 * @returns Yup string schema with Slovak IBAN validation
 */
export const createYupValidator = () => {
  return yup.string().test({
    name: 'is-slovak-iban',
    message: 'Invalid Slovak IBAN',
    test: function (value: string | undefined) {
      if (!value) return true; // Let the required() validator handle empty values
      const result = SlovakIBANValidator.validateIBAN(value);
      if (!result.valid) {
        throw this.createError({
          message: result.errors.join(', '),
          path: this.path,
        });
      }
      return true;
    }
  }).transform((value) => {
    if (!value) return value;
    const result = SlovakIBANValidator.validateIBAN(value);
    return result.formatted || value;
  });
};

/**
 * Creates a Zod validator for Slovak IBAN
 * @returns Zod schema with Slovak IBAN validation
 */
export const createZodValidator = () => {
  return z.string().superRefine((value, ctx) => {
    const result = SlovakIBANValidator.validateIBAN(value);
    if (!result.valid) {
      result.errors.forEach(error => {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: error,
        });
      });
    }
    return result.valid;
  }).transform(value => {
    const result = SlovakIBANValidator.validateIBAN(value);
    return {
      raw: value,
      formatted: result.formatted,
      bank_name: result.bank_name,
      bank_swift: result.bank_swift,
      valid: result.valid
    };
  });
};

// Type for Zod validation result
export interface ZodIBANResult {
  raw: string;
  formatted: string | null;
  bank_name: string | null;
  bank_swift: string | null;
  valid: boolean;
}
