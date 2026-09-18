import * as yup from 'yup';
import { SlovakIBANValidator, Locale } from './core';
import { getMessages } from './messages';

export interface YupValidatorOptions {
  locale?: Locale;
}

/**
 * Creates a Yup validator for Slovak IBAN
 * @returns Yup string schema with Slovak IBAN validation
 */
export const createYupValidator = (options: YupValidatorOptions = {}) => {
  const { locale } = options;
  return yup.string().test({
    name: 'is-slovak-iban',
    message: getMessages(locale).invalidIBAN,
    test: function (value: string | undefined) {
      if (!value) return true; // Let the required() validator handle empty values
      const result = SlovakIBANValidator.validateIBAN(value, { locale });
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
    const result = SlovakIBANValidator.validateIBAN(value, { locale });
    return result.formatted || value;
  });
};
