import { getMessages } from '../messages';

describe('messages', () => {
  describe('getMessages', () => {
    it('should return Slovak messages by default', () => {
      const messages = getMessages();
      expect(messages.invalidFormat).toBe('Nesprávny formát: IBAN by mal obsahovať iba číslice za kódom krajiny');
    });

    it('should return English messages when specified', () => {
      const messages = getMessages('en');
      expect(messages.invalidFormat).toBe('Invalid format: IBAN should contain only digits after country code');
    });

    it('should handle message functions for Slovak', () => {
      const messages = getMessages('sk');
      expect(messages.invalidLength(24, 20)).toBe('Nesprávna dĺžka: očakávaných 24 znakov, zadaných 20');
      expect(messages.invalidCountryCode('SK', 'CZ')).toBe('Nesprávny kód krajiny: očakávaný SK, zadaný CZ');
      expect(messages.unknownBankCode('1234')).toBe('Neznámy kód banky: 1234');
    });

    it('should handle message functions for English', () => {
      const messages = getMessages('en');
      expect(messages.invalidLength(24, 20)).toBe('Invalid length: expected 24 characters, got 20');
      expect(messages.invalidCountryCode('SK', 'CZ')).toBe('Invalid country code: expected SK, got CZ');
      expect(messages.unknownBankCode('1234')).toBe('Unknown bank code: 1234');
    });
  });
});
