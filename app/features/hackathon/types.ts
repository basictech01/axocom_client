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

export interface SolutionSubmission extends PublicSolution {
  email: string;
  phone: string;
  contactConsentAt: string;
  adminNote: string | null;
  reviewedAt: string | null;
  reviewedByAdminId: number | null;
  updatedAt: string;
}

export interface SolutionStatus {
  id: string;
  problemCode: string;
  solutionTitle: string;
  status: ReviewStatus;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SolutionTeamMember {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface TeamLeaderDashboard {
  accessToken: string;
  id: string;
  fullName: string;
  email: string;
  phone: string;
  problemCode: string;
  solutionTitle: string;
  solutionDescription: string;
  prototypeUrl: string | null;
  status: ReviewStatus;
  createdAt: string;
  updatedAt: string;
  members: SolutionTeamMember[];
}

export interface SolutionTeamMemberInput {
  fullName: string;
  email: string;
  phone: string;
}

export interface UpdateTeamSolutionInput {
  solutionTitle: string;
  solutionDescription: string;
  prototypeUrl?: string | null;
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
  institution: string | null;
  course: string | null;
  city: string | null;
  issuedAt: string;
}

export interface CertificateLookupResult {
  registered: boolean;
  certificate: CertificateParticipant | null;
}
