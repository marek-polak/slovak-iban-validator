import { BANK_LOGOS, getBankLogo, hasBankLogo } from "../logos";
import { SLOVAK_BANKS } from "../index";

describe("BANK_LOGOS", () => {
  it("should only contain codes that exist in SLOVAK_BANKS", () => {
    for (const code of Object.keys(BANK_LOGOS)) {
      expect(SLOVAK_BANKS[code]).toBeDefined();
    }
  });

  it("should contain valid normalized SVG markup", () => {
    for (const [code, svg] of Object.entries(BANK_LOGOS)) {
      expect(svg.startsWith("<svg")).toBe(true);
      expect(svg).toContain('viewBox="0 0 240 80"');
      expect(svg).not.toContain("<image");
      expect(svg).not.toContain("<style");
      expect(svg).not.toContain("<script");
    }
  });

  it("getBankLogo should return a logo for a known code", () => {
    expect(getBankLogo("1100")).toBeDefined();
    expect(getBankLogo("1100")).toBe(BANK_LOGOS["1100"]);
  });

  it("getBankLogo should return undefined for an unknown code", () => {
    expect(getBankLogo("9999")).toBeUndefined();
  });

  it("hasBankLogo should reflect logo availability", () => {
    expect(hasBankLogo("1100")).toBe(true);
    expect(hasBankLogo("9999")).toBe(false);
  });

  it("root index should not export BANK_LOGOS", () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    expect("BANK_LOGOS" in require("../index")).toBe(false);
  });
});
