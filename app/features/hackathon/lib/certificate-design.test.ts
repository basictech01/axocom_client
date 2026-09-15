import { describe, expect, it } from "vitest";
import { CERTIFICATE_DESIGN, layoutCertificateName } from "./certificate-design";

describe("certificate name layout", () => {
  it("keeps short names prominent on one line", () => {
    expect(layoutCertificateName("Aman Rawat")).toEqual({
      lines: ["Aman Rawat"], fontSize: 46, constrained: false,
    });
  });

  it("balances long names across two lines without dropping any words", () => {
    const name = "Alexandra Elizabeth Catherine Montgomery Richardson";
    const layout = layoutCertificateName(name);
    expect(layout.lines).toHaveLength(2);
    expect(layout.lines.join(" ")).toBe(name);
    expect(layout.fontSize).toBeGreaterThanOrEqual(18);
    expect(layout.lines.every((line) => line.length * layout.fontSize * 0.62 <= CERTIFICATE_DESIGN.nameWidth + 0.01)).toBe(true);
  });

  it("constrains a very long unbroken name instead of clipping or truncating it", () => {
    const name = "W".repeat(120);
    const layout = layoutCertificateName(name);
    expect(layout.lines).toEqual([name]);
    expect(layout.fontSize).toBe(18);
    expect(layout.constrained).toBe(true);
  });

  it("uses measured glyph width rather than treating narrow and wide names equally", () => {
    const narrow = layoutCertificateName("iiiiiiiiiiiiiiiiiiii", (text, size) => text.length * size * 0.2);
    const wide = layoutCertificateName("WWWWWWWWWWWWWWWWWWWW", (text, size) => text.length * size);
    expect(narrow.fontSize).toBe(46);
    expect(wide.fontSize).toBeLessThan(narrow.fontSize);
  });

  it("preserves multilingual names and normalizes excess whitespace", () => {
    expect(layoutCertificateName("  अमन   सिंह रावत  ").lines.join(" ")).toBe("अमन सिंह रावत");
    expect(layoutCertificateName("Zoë Élise O’Connor").lines.join(" ")).toBe("Zoë Élise O’Connor");
  });

  it("returns a finite layout for empty input", () => {
    expect(layoutCertificateName("").fontSize).toBe(46);
  });
});