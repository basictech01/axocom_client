import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CertificateSvg } from "./CertificateArtwork";

const participant = {
  id: "sample", hash: "1234567890abcdef123456", fullName: "Aman Rawat",
  institution: "Example University", course: null, city: "Dehradun",
  issuedAt: "2026-09-11T20:15:00.000Z",
};

describe("shared certificate artwork", () => {
  it("includes all seven existing logos and the participant's ID and IST date", () => {
    const markup = renderToStaticMarkup(createElement(CertificateSvg, { participant, idPrefix: "test" }));
    expect(markup.match(/<image /g)).toHaveLength(7);
    expect(markup).toContain("Aman Rawat");
    expect(markup).toContain("1234567890ABCDEF");
    expect(markup).toContain("12 September 2026");
    expect(markup).toContain("viewBox=\"0 0 1000 707\"");
    expect(markup).not.toContain("NOT A VALID CERTIFICATE");
  });

  it("watermarks previews in the same SVG used for downloads", () => {
    const markup = renderToStaticMarkup(createElement(CertificateSvg, { participant, preview: true, idPrefix: "preview" }));
    expect(markup).toContain(">PREVIEW</text>");
    expect(markup).toContain("DESIGN PREVIEW · NOT A VALID CERTIFICATE");
  });

  it("escapes participant content rather than interpreting it as SVG", () => {
    const markup = renderToStaticMarkup(createElement(CertificateSvg, {
      participant: { ...participant, fullName: "<script>alert(1)</script> & Name" }, idPrefix: "test",
    }));
    expect(markup).not.toContain("<script>");
    expect(markup).toContain("&lt;script&gt;");
    expect(markup).toContain("&amp;");
  });

  it("scopes decorative references for multiple certificates on the same page", () => {
    const markup = renderToStaticMarkup(createElement(CertificateSvg, { participant, idPrefix: "second" }));
    expect(markup).toContain('id="second-panel"');
    expect(markup).toContain('fill="url(#second-panel)"');
    expect(markup).toContain('clip-path="url(#second-panel-clip)"');
  });
});