import { createYupValidator, createZodValidator } from '../validation';
import * as yup from 'yup';
import { z } from 'zod';

describe('Validation Library Integration', () => {
  // Valid IBAN for Tatra banka
  const validIBAN = 'SK8511000000002611803119';
  const formattedIBAN = 'SK85 1100 0000 0026 1180 3119';
  const invalidIBAN = 'SK311200';

  describe('Yup Integration', () => {
    let schema: yup.ObjectSchema<{ iban: string }>;

    beforeEach(() => {
      schema = yup.object({
        iban: createYupValidator().required()
      });
    });

    it('should validate correct IBAN', async () => {
      const result = await schema.validate({ iban: validIBAN });
      expect(result.iban).toBe(formattedIBAN);
    });

    it('should validate formatted IBAN', async () => {
      const result = await schema.validate({ iban: formattedIBAN });
      expect(result.iban).toBe(formattedIBAN);
    });

    it('should handle invalid IBAN', async () => {
      await expect(schema.validate({ iban: invalidIBAN }))
        .rejects
        .toThrow('Invalid length: expected 24 characters, got 8');
    });

    it('should handle empty IBAN when required', async () => {
      await expect(schema.validate({ iban: '' }))
        .rejects
        .toThrow('iban is a required field');
    });

    it('should handle undefined IBAN when required', async () => {
      await expect(schema.validate({}))
        .rejects
        .toThrow('iban is a required field');
    });
  });

  describe('Zod Integration', () => {
    let schema: z.ZodObject<{ iban: ReturnType<typeof createZodValidator> }>;

    beforeEach(() => {
      schema = z.object({
        iban: createZodValidator()
      });
    });

    it('should validate correct IBAN', () => {
      const result = schema.safeParse({ iban: validIBAN });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.iban).toEqual({
          raw: validIBAN,
          formatted: formattedIBAN,
          bank_name: 'Tatra banka, a.s.',
          bank_swift: 'TATRSKBX',
          valid: true
        });
      }
    });

    it('should validate formatted IBAN', () => {
      const result = schema.safeParse({ iban: formattedIBAN });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.iban.formatted).toBe(formattedIBAN);
      }
    });

    it('should handle invalid IBAN', () => {
      const result = schema.safeParse({ iban: invalidIBAN });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid length: expected 24 characters, got 8');
      }
    });

    it('should handle empty IBAN', () => {
      const result = schema.safeParse({ iban: '' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid length: expected 24 characters, got 0');
      }
    });

    it('should handle missing IBAN field', () => {
      const result = schema.safeParse({});
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Required');
      }
    });
  });
});
