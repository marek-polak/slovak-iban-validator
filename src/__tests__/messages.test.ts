import {
  DEFAULT_LOCALE,
  MESSAGES,
  getMessages,
  Locale,
} from "../messages";

describe("messages", () => {
  const locales: Locale[] = ["sk", "en"];

  it("should define every message key in both locales", () => {
    const keys = Object.keys(MESSAGES.en) as (keyof typeof MESSAGES.en)[];
    expect(keys.length).toBeGreaterThan(0);
    for (const locale of locales) {
      for (const key of keys) {
        expect(MESSAGES[locale][key]).toBeDefined();
      }
      expect(Object.keys(MESSAGES[locale]).sort()).toEqual(
        Object.keys(MESSAGES.en).sort()
      );
    }
  });

  it("should default to Slovak", () => {
    expect(DEFAULT_LOCALE).toBe("sk");
    expect(getMessages()).toBe(MESSAGES.sk);
    expect(getMessages().invalidChecksum).toBe("Neplatný kontrolný súčet");
  });

  it("should return the requested locale", () => {
    expect(getMessages("en")).toBe(MESSAGES.en);
    expect(getMessages("sk")).toBe(MESSAGES.sk);
  });
});
