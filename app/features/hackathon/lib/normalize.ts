/**
 * Identity normalization for duplicate prevention.
 */

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Normalize Indian mobile/WhatsApp numbers to a 10-digit identity key.
 * Examples treated as the same:
 *   +91 98765 43210
 *   9876543210
 *   +91-98765-43210
 *
 * Returns null when the value is empty/missing after normalization.
 * Returns the digit string (possibly shorter than 10) when present but invalid —
 * callers should validate length separately if needed.
 */
export function normalizePhone(phone: string | null | undefined): string | null {
  if (phone == null) return null;
  const trimmed = String(phone).trim();
  if (!trimmed) return null;

  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return null;

  // Prefer last 10 digits (covers +91XXXXXXXXXX and local 10-digit forms).
  if (digits.length >= 10) {
    return digits.slice(-10);
  }

  return digits;
}

/** True when a provided phone normalizes to a usable 10-digit Indian mobile key. */
export function isValidNormalizedPhone(normalized: string | null): boolean {
  return normalized != null && /^\d{10}$/.test(normalized);
}
