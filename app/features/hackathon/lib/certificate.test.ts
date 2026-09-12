import { describe, expect, it } from "vitest";
import {
  CERTIFICATE_REGISTRATION_DEADLINE,
  certificatePath,
  formatCertificateDate,
  isCertificateRegistrationOpen,
  isCertificateApiUnavailable,
  normalizeCertificateEmail,
} from "./certificate";
import { certificateFileName } from "./download-certificate";

describe("certificate registration rules", () => {
  it("stays open until the precise IST cutoff", () => {
    expect(isCertificateRegistrationOpen(new Date("2026-09-15T15:59:59+05:30"))).toBe(true);
    expect(isCertificateRegistrationOpen(new Date("2026-09-15T16:00:00+05:30"))).toBe(false);
    expect(CERTIFICATE_REGISTRATION_DEADLINE.toISOString()).toBe("2026-09-15T10:30:00.000Z");
  });

  it("normalizes lookup emails", () => {
    expect(normalizeCertificateEmail("  Student@Example.COM ")).toBe("student@example.com");
  });

  it("formats the participant's actual certificate registration date in IST", () => {
    expect(formatCertificateDate("2026-09-11T20:15:00.000Z")).toBe("12 September 2026");
    expect(formatCertificateDate("not-a-date")).toBe("Date unavailable");
  });

  it("safely builds a unique certificate path", () => {
    expect(certificatePath("abc/123")).toBe("/certificate/abc%2F123");
  });

  it("recognizes a backend that has not deployed the certificate schema", () => {
    expect(
      isCertificateApiUnavailable(
        new Error('Cannot query field "certificateByEmail" on type "Query".'),
      ),
    ).toBe(true);
  });
});

describe("certificateFileName", () => {
  const participant = {
    id: "1",
    hash: "abc_DEF-1234567890",
    fullName: "Prateek Thapliyal",
    institution: "Example University",
    course: null,
    city: "Dehradun",
    issuedAt: "2026-09-15T10:30:00.000Z",
  };

  it("uses the unique certificate id and ends with the participant name", () => {
    expect(certificateFileName(participant)).toBe(
      "UKIS-2026-participation-ABCDEF123456-Prateek-Thapliyal",
    );
  });

  it("preserves Unicode names while removing unsafe filename characters", () => {
    expect(certificateFileName({ ...participant, fullName: "अमन / रावत" })).toBe(
      "UKIS-2026-participation-ABCDEF123456-अमन-रावत",
    );
  });
});
