import { MAX_TEAM_SIZE } from "./participation";
import { isValidNormalizedPhone, normalizeEmail, normalizePhone } from "./normalize";

export const MAX_ADDITIONAL_TEAM_MEMBERS = MAX_TEAM_SIZE - 1;

export interface TeamMemberDraft {
  fullName: string;
  email: string;
  phone: string;
}

export interface TeamIdentity {
  email: string;
  phone: string;
}

export type TeamMemberErrors = Partial<Record<keyof TeamMemberDraft, string>>;

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

export function emptyTeamMember(): TeamMemberDraft {
  return { fullName: "", email: "", phone: "" };
}

/** Grow or shrink the teammate list so it matches a total team size (lead included). */
export function resizeTeamMembers(members: TeamMemberDraft[], teamSize: number): TeamMemberDraft[] {
  const additional = Math.min(Math.max(teamSize - 1, 0), MAX_ADDITIONAL_TEAM_MEMBERS);
  if (members.length >= additional) return members.slice(0, additional);
  return [...members, ...Array.from({ length: additional - members.length }, emptyTeamMember)];
}

export function cleanPersonName(name: string): string {
  return name.trim().replace(/\s+/g, " ");
}

/**
 * Validate teammates against each other and the team lead. Every person in an
 * entry needs a distinct email and mobile, because one person may appear in only
 * one entry. The server repeats these checks across all entries.
 */
export function validateTeamMembers(lead: TeamIdentity, members: TeamMemberDraft[]): TeamMemberErrors[] {
  const seenEmails = new Set<string>();
  const seenPhones = new Set<string>();
  const leadEmail = normalizeEmail(lead.email);
  const leadPhone = normalizePhone(lead.phone);
  if (leadEmail) seenEmails.add(leadEmail);
  if (leadPhone) seenPhones.add(leadPhone);

  return members.map((member) => {
    const errors: TeamMemberErrors = {};
    const email = normalizeEmail(member.email);
    const phone = normalizePhone(member.phone);

    if (cleanPersonName(member.fullName).length < 2) errors.fullName = "Enter this teammate's full name.";

    if (!EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email address.";
    else if (seenEmails.has(email)) errors.email = "Each team member needs a different email address.";
    else seenEmails.add(email);

    if (!isValidNormalizedPhone(phone)) errors.phone = "Enter a valid 10-digit mobile number.";
    else if (seenPhones.has(phone!)) errors.phone = "Each team member needs a different mobile number.";
    else seenPhones.add(phone!);

    return errors;
  });
}

export function hasTeamMemberErrors(errors: TeamMemberErrors[]): boolean {
  return errors.some((memberErrors) => Object.keys(memberErrors).length > 0);
}

export function normalizeTeamMembers(members: TeamMemberDraft[]): TeamMemberDraft[] {
  return members.map((member) => ({
    fullName: cleanPersonName(member.fullName),
    email: normalizeEmail(member.email),
    phone: normalizePhone(member.phone) ?? "",
  }));
}
