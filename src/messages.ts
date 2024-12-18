export type Language = 'sk' | 'en';

export interface Messages {
  invalidLength: (expected: number, got: number) => string;
  invalidCountryCode: (expected: string, got: string) => string;
  invalidFormat: string;
  unknownBankCode: (code: string) => string;
  invalidChecksum: string;
}

const messages: Record<Language, Messages> = {
  sk: {
    invalidLength: (expected, got) =>
      `Nesprávna dĺžka: očakávaných ${expected} znakov, zadaných ${got}`,
    invalidCountryCode: (expected, got) =>
      `Nesprávny kód krajiny: očakávaný ${expected}, zadaný ${got}`,
    invalidFormat: 'Nesprávny formát: IBAN by mal obsahovať iba číslice za kódom krajiny',
    unknownBankCode: (code) => `Neznámy kód banky: ${code}`,
    invalidChecksum: 'Nesprávny kontrolný súčet',
  },
  en: {
    invalidLength: (expected, got) =>
      `Invalid length: expected ${expected} characters, got ${got}`,
    invalidCountryCode: (expected, got) =>
      `Invalid country code: expected ${expected}, got ${got}`,
    invalidFormat: 'Invalid format: IBAN should contain only digits after country code',
    unknownBankCode: (code) => `Unknown bank code: ${code}`,
    invalidChecksum: 'Invalid checksum',
  },
};

export const getMessages = (language: Language = 'sk'): Messages => messages[language];
