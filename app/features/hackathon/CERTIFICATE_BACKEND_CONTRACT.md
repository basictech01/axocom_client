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

## Teams and teammate certificates

Entries can be solo or a team of up to 4 people. Team entries originally stored only the team lead, so teammates had no registration and no certificate. The backend (`005_hackathon_team_members.sql`) adds `hackathon_solution_team_members`: one row per teammate, linked to the lead's `solution_submissions` row.

```graphql
input SolutionTeamMemberInput { fullName: String!  email: String!  phone: String! }
# SubmitSolutionInput gains: teamMembers: [SolutionTeamMemberInput!]   (0–3 people besides the lead)
# SolutionSubmission (admin) gains: teamMembers: [SolutionTeamMember!]!

type CertificateTeamMember { id: ID!  fullName: String!  emailHint: String!  certificate: CertificateParticipant }
type CertificateTeam {
  solutionTitle: String!  problemCode: String!  leadName: String!
  leadCertificate: CertificateParticipant  members: [CertificateTeamMember!]!  maxMembers: Int!
}
input CertificateTeamLeadInput { leadEmail: String!  leadPhone: String! }
input AddCertificateTeamMemberInput {
  leadEmail: String!  leadPhone: String!
  fullName: String!  email: String!  phone: String!  institution: String!  course: String  city: String!
}

type Query    { certificateTeamByLead(input: CertificateTeamLeadInput!): CertificateTeam! }
type Mutation { addCertificateTeamMember(input: AddCertificateTeamMemberInput!): CertificateTeamMember! }
```

### Rules

- **One person, one entry.** Every email and mobile number may appear once across all leads and teammates. New entries check this in a transaction; unique keys back it up within each table.
- **Team lead verification.** Team queries and mutations need the lead's registered email *and* mobile. A teammate's email gets `NOT_TEAM_LEAD`.
- **Teammates are final.** A lead can add teammates until the team has 4 people, but cannot edit or remove them. Adding to a team locks the submission row, so concurrent adds cannot exceed the limit.
- **Registered teammates.** When a teammate was listed at registration, `addCertificateTeamMember` must use their registered email and mobile, and the certificate uses their registered name.
- **Deadlines.** Solo participants and leads keep the original cutoff (`2026-09-15T16:00:00+05:30`). Teammate certificates, whether created by a lead or by the teammate through `registerCertificateParticipant`, close at `2026-09-23T16:00:00+05:30`.
- `emailHint` is masked (`as•••@gmail.com`); teammate contact details are never returned by public queries.

Deploy the backend and apply `005_hackathon_team_members.sql` **before** deploying this frontend: the registration form sends `teamMembers`, which an older API rejects.
