export type ReviewStatus = "pending" | "accepted" | "rejected";

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PublicSolution {
  id: string;
  fullName: string;
  problemCode: string;
  solutionTitle: string;
  solutionDescription: string;
  prototypeUrl: string | null;
  createdAt: string;
  status: ReviewStatus;
}

export interface PublicMentor {
  id: string;
  fullName: string;
  currentRole: string;
  organisation: string | null;
  expertise: string;
  experienceSummary: string;
  motivation: string;
  profileUrl: string | null;
  createdAt: string;
  status: ReviewStatus;
}

export interface SolutionTeamMember {
  fullName: string;
  email: string;
  phone: string;
}

export interface SolutionSubmission extends PublicSolution {
  email: string;
  phone: string;
  teamMembers: SolutionTeamMember[];
  contactConsentAt: string;
  adminNote: string | null;
  reviewedAt: string | null;
  reviewedByAdminId: number | null;
  updatedAt: string;
}

export interface MentorApplication extends PublicMentor {
  email: string;
  phone: string;
  contactConsentAt: string;
  adminNote: string | null;
  reviewedAt: string | null;
  reviewedByAdminId: number | null;
  updatedAt: string;
}

export interface SubmitSolutionInput {
  fullName: string;
  email: string;
  phone: string;
  problemCode: string;
  solutionTitle: string;
  solutionDescription: string;
  prototypeUrl?: string | null;
  /** Teammates other than the person submitting; empty for solo entries. */
  teamMembers: SolutionTeamMember[];
  contactConsent: boolean;
}

export interface ApplyMentorInput {
  fullName: string;
  email: string;
  phone: string;
  currentRole: string;
  organisation?: string | null;
  expertise: string[];
  experienceSummary: string;
  motivation: string;
  profileUrl?: string | null;
  contactConsent: boolean;
}

export interface CertificateParticipant {
  id: string;
  hash: string;
  fullName: string;
  institution: string;
  course: string | null;
  city: string;
  issuedAt: string;
}

export interface CertificateLookupResult {
  registered: boolean;
  certificate: CertificateParticipant | null;
}

export interface RegisterCertificateParticipantInput {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  course?: string | null;
  city: string;
}

export interface CertificateTeamMember {
  id: string;
  fullName: string;
  /** Masked by the server, e.g. "as•••@gmail.com". */
  emailHint: string;
  certificate: CertificateParticipant | null;
}

export interface CertificateTeam {
  solutionTitle: string;
  problemCode: string;
  leadName: string;
  leadCertificate: CertificateParticipant | null;
  members: CertificateTeamMember[];
  maxMembers: number;
}

export interface CertificateTeamLeadInput {
  leadEmail: string;
  leadPhone: string;
}

export interface AddCertificateTeamMemberInput extends CertificateTeamLeadInput {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  course?: string | null;
  city: string;
}
