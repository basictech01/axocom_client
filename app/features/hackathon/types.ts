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