export type Locale = 'sk' | 'en';
export const DEFAULT_LOCALE: Locale = 'sk';
export interface Messages {
  invalidLength: (expected: number, got: number) => string;
  invalidCountryCode: (expected: string, got: string) => string;
  invalidFormat: string;
  unknownBankCode: (code: string) => string;
  invalidChecksum: string;
  invalidIBAN: string; // generic fallback used by yup schema `message`
}
export const MESSAGES: Record<Locale, Messages> = {
  en: {
    invalidLength: (e, g) => `Invalid length: expected ${e} characters, got ${g}`,
    invalidCountryCode: (e, g) => `Invalid country code: expected ${e}, got ${g}`,
    invalidFormat: 'Invalid format: IBAN should contain only digits after country code',
    unknownBankCode: (c) => `Unknown bank code: ${c}`,
    invalidChecksum: 'Invalid checksum',
    invalidIBAN: 'Invalid Slovak IBAN',
  },
  sk: {
    invalidLength: (e, g) => `Neplatná dĺžka: očakávaných ${e} znakov, zadaných ${g}`,
    invalidCountryCode: (e, g) => `Neplatný kód krajiny: očakávaný ${e}, zadaný ${g}`,
    invalidFormat: 'Neplatný formát: IBAN musí za kódom krajiny obsahovať iba číslice',
    unknownBankCode: (c) => `Neznámy kód banky: ${c}`,
    invalidChecksum: 'Neplatný kontrolný súčet',
    invalidIBAN: 'Neplatný slovenský IBAN',
  },
};
export const getMessages = (locale: Locale = DEFAULT_LOCALE): Messages => MESSAGES[locale];
