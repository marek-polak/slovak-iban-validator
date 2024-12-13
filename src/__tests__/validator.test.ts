import { SlovakIBANValidator } from '../index';

describe('SlovakIBANValidator', () => {
  // Valid IBAN for Tatra banka
  const validIBAN = 'SK8511000000002611803119';
  const formattedIBAN = 'SK85 1100 0000 0026 1180 3119';

  describe('validateIBAN', () => {
    it('should validate correct IBAN', () => {
      const result = SlovakIBANValidator.validateIBAN(validIBAN);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.formatted).toBe(formattedIBAN);
      expect(result.bank_name).toBe('Tatra banka, a.s.');
      expect(result.bank_swift).toBe('TATRSKBX');
    });

    it('should validate formatted IBAN', () => {
      const result = SlovakIBANValidator.validateIBAN(formattedIBAN);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should handle invalid length', () => {
      const result = SlovakIBANValidator.validateIBAN('SK311200');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Invalid length: expected 24 characters, got 8');
    });

    it('should handle invalid country code', () => {
      const result = SlovakIBANValidator.validateIBAN('CZ8511000000002611803119');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Invalid country code: expected SK, got CZ');
    });

    it('should handle invalid format', () => {
      const result = SlovakIBANValidator.validateIBAN('SK85AB000000002611803119');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Invalid format: IBAN should contain only digits after country code');
    });

    it('should handle unknown bank code', () => {
      const result = SlovakIBANValidator.validateIBAN('SK8599000000002611803119');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Unknown bank code: 9900');
    });

    it('should handle invalid checksum', () => {
      const result = SlovakIBANValidator.validateIBAN('SK8511000000002611803118');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Invalid checksum');
    });

    it('should handle empty input', () => {
      const result = SlovakIBANValidator.validateIBAN('');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Invalid length: expected 24 characters, got 0');
    });
  });
});
