import { z } from 'zod';
import { SlovakIBANValidator } from './index';

export interface ZodIBANResult {
  raw: string;
  formatted: string | null;
  bank_name: string | null;
  bank_swift: string | null;
  valid: boolean;
}

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
      valid: result.valid,
    } as ZodIBANResult;
  });
};
