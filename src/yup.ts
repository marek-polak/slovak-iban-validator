import * as yup from 'yup';
import { SlovakIBANValidator } from './core';

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
