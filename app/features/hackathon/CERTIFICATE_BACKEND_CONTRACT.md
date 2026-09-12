# UKIS certificate backend contract

The certificate UI uses the project's configured GraphQL endpoint. The backend must expose the following schema and persist records in its primary database.

```graphql
input RegisterCertificateParticipantInput {
  fullName: String!
  email: String!
  phone: String!
  institution: String!
  course: String
  city: String!
}

type CertificateParticipant {
  id: ID!
  hash: String!
  fullName: String!
  institution: String!
  course: String
  city: String!
  issuedAt: String!
}

type CertificateLookupResult {
  registered: Boolean!
  certificate: CertificateParticipant
}

type Query {
  certificateByEmail(email: String!): CertificateParticipant
  certificateLookupByEmail(email: String!): CertificateLookupResult!
  certificateByHash(hash: String!): CertificateParticipant
}

type Mutation {
  registerCertificateParticipant(input: RegisterCertificateParticipantInput!): CertificateParticipant!
}
```

## Required server rules

- Reject `registerCertificateParticipant` at or after `2026-09-15T16:00:00+05:30`. The server check is authoritative; the browser check is only for user experience.
- Treat `hackathon_solution_submissions` as the registration source of truth. Reject certificate creation unless the normalized email exists there and the submitted mobile number matches the registration record. Use the registered full name on the certificate.
- Normalize email with `trim().toLowerCase()` and mobile numbers to their canonical ten-digit representation before lookup and storage.
- Enforce unique indexes on normalized email, normalized phone, and `hash`.
- Generate `hash` on the server with at least 128 bits from a cryptographically secure random source (for example, 24 random bytes encoded as base64url). Never derive it from email or other personal data.
- Rate-limit both public queries and the registration mutation. Return a generic not-found response for email lookup.
- Store `created_at` and `issued_at`; retain only the participant fields required for certificate issuance and duplicate prevention.
- Never return email or phone from the public certificate type. Contact details are used only for lookup and duplicate prevention.

The backend repository implements this contract using MySQL. Apply its isolated `src/dataconfig/004_hackathon_certificates.sql` migration before deploying the API. Table creation is deliberately not part of global server startup, so a certificate-specific database permission or migration problem cannot prevent the rest of the website API from starting.

```sql
CREATE TABLE hackathon_certificate_participants (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  hash varchar(64) NOT NULL UNIQUE,
  full_name varchar(120) NOT NULL,
  email_normalized varchar(254) NOT NULL UNIQUE,
  phone_normalized varchar(20) NOT NULL UNIQUE,
  institution varchar(180) NOT NULL,
  course varchar(160),
  city varchar(120) NOT NULL,
  issued_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
);
```
