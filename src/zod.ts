import { z } from 'zod';
import { SlovakIBANValidator, Locale } from './core';

export interface ZodValidatorOptions {
  locale?: Locale;
}

/**
 * Creates a Zod validator for Slovak IBAN
 * @returns Zod schema with Slovak IBAN validation
 */
export const createZodValidator = (options: ZodValidatorOptions = {}) => {
  const { locale } = options;
  return z.string().superRefine((value, ctx) => {
    const result = SlovakIBANValidator.validateIBAN(value, {
      multipleErrors: true,
      locale,
    });
    for (const message of result.errors) {
      ctx.addIssue({
        code: 'custom',
        message,
      });
    }
  }).transform((value): ZodIBANResult => {
    const result = SlovakIBANValidator.validateIBAN(value, { locale });
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
