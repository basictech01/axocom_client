import { describe, expect, it } from "vitest";
import {
  MAX_ADDITIONAL_TEAM_MEMBERS,
  hasTeamMemberErrors,
  normalizeTeamMembers,
  resizeTeamMembers,
  validateTeamMembers,
} from "./team";

const lead = { email: "Lead@Example.com", phone: "+91 98765 43210" };
const member = (overrides = {}) => ({
  fullName: "Asha Rawat",
  email: "asha@example.com",
  phone: "9123456789",
  ...overrides,
});

describe("resizeTeamMembers", () => {
  it("keeps one slot per teammate excluding the lead", () => {
    expect(resizeTeamMembers([], 1)).toHaveLength(0);
    expect(resizeTeamMembers([], 3)).toHaveLength(2);
    expect(resizeTeamMembers([], 9)).toHaveLength(MAX_ADDITIONAL_TEAM_MEMBERS);
  });

  it("preserves entered teammates when the size changes", () => {
    const grown = resizeTeamMembers([member()], 4);
    expect(grown[0]).toEqual(member());
    expect(resizeTeamMembers(grown, 2)).toEqual([member()]);
  });
});

describe("validateTeamMembers", () => {
  it("accepts distinct, complete teammates", () => {
    const errors = validateTeamMembers(lead, [member(), member({ email: "dev@example.com", phone: "9000000001" })]);
    expect(hasTeamMemberErrors(errors)).toBe(false);
  });

  it("requires name, email and a 10-digit mobile", () => {
    const [errors] = validateTeamMembers(lead, [{ fullName: " ", email: "nope", phone: "123" }]);
    expect(Object.keys(errors).sort()).toEqual(["email", "fullName", "phone"]);
  });

  it("rejects a teammate reusing the lead's email or mobile in another format", () => {
    const [errors] = validateTeamMembers(lead, [member({ email: " lead@example.COM ", phone: "9876543210" })]);
    expect(errors.email).toMatch(/different email/);
    expect(errors.phone).toMatch(/different mobile/);
  });

  it("rejects two teammates sharing contact details", () => {
    const errors = validateTeamMembers(lead, [member(), member({ fullName: "Other" })]);
    expect(errors[0]).toEqual({});
    expect(errors[1].email).toBeDefined();
    expect(errors[1].phone).toBeDefined();
  });
});

it("normalizes teammate details for submission", () => {
  expect(normalizeTeamMembers([{ fullName: "  Asha   Rawat ", email: " Asha@Example.com", phone: "+91-91234-56789" }]))
    .toEqual([{ fullName: "Asha Rawat", email: "asha@example.com", phone: "9123456789" }]);
});
