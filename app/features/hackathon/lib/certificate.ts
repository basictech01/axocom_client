export function certificatePath(hash: string): string {
  return `/certificate/${encodeURIComponent(hash)}`;
}

export function normalizeCertificateEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function formatCertificateDate(issuedAt: string | Date): string {
  const date = issuedAt instanceof Date ? issuedAt : new Date(issuedAt);
  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

export function isCertificateApiUnavailable(error: unknown): boolean {
  const message = error instanceof Error ? error.message.toLowerCase() : "";
  return (
    message.includes("cannot query field") ||
    message.includes("unknown argument") ||
    message.includes("registercertificateparticipant") ||
    message.includes("certificatebyemail") ||
    message.includes("certificatelookupbyemail") ||
    message.includes("certificatebyhash")
  );
}
