import { gql, type TypedDocumentNode } from "@apollo/client";
import type {
  ApplyMentorInput,
  MentorApplication,
  Pagination,
  PublicSolution,
  ReviewStatus,
  SolutionSubmission,
  SubmitSolutionInput,
  CertificateParticipant,
  CertificateLookupResult,
  RegisterCertificateParticipantInput,
  CertificateTeam,
  CertificateTeamLeadInput,
  CertificateTeamMember,
  AddCertificateTeamMemberInput,
} from "~/features/hackathon/types";

export const REGISTER_CERTIFICATE_PARTICIPANT_MUTATION: TypedDocumentNode<
  { registerCertificateParticipant: CertificateParticipant },
  { input: RegisterCertificateParticipantInput }
> = gql`
  mutation RegisterCertificateParticipant($input: RegisterCertificateParticipantInput!) {
    registerCertificateParticipant(input: $input) {
      id hash fullName institution course city issuedAt
    }
  }
`;

export const CERTIFICATE_LOOKUP_BY_EMAIL_QUERY: TypedDocumentNode<
  { certificateLookupByEmail: CertificateLookupResult },
  { email: string }
> = gql`
  query CertificateLookupByEmail($email: String!) {
    certificateLookupByEmail(email: $email) {
      registered
      certificate {
        id hash fullName institution course city issuedAt
      }
    }
  }
`;

export const CERTIFICATE_BY_HASH_QUERY: TypedDocumentNode<
  { certificateByHash: CertificateParticipant | null },
  { hash: string }
> = gql`
  query CertificateByHash($hash: String!) {
    certificateByHash(hash: $hash) {
      id hash fullName institution course city issuedAt
    }
  }
`;

const CERTIFICATE_TEAM_MEMBER_FIELDS = `
  id fullName emailHint
  certificate { id hash fullName institution course city issuedAt }
`;

export const CERTIFICATE_TEAM_BY_LEAD_QUERY: TypedDocumentNode<
  { certificateTeamByLead: CertificateTeam },
  { input: CertificateTeamLeadInput }
> = gql`
  query CertificateTeamByLead($input: CertificateTeamLeadInput!) {
    certificateTeamByLead(input: $input) {
      solutionTitle problemCode leadName maxMembers
      leadCertificate { id hash fullName institution course city issuedAt }
      members { ${CERTIFICATE_TEAM_MEMBER_FIELDS} }
    }
  }
`;

export const ADD_CERTIFICATE_TEAM_MEMBER_MUTATION: TypedDocumentNode<
  { addCertificateTeamMember: CertificateTeamMember },
  { input: AddCertificateTeamMemberInput }
> = gql`
  mutation AddCertificateTeamMember($input: AddCertificateTeamMemberInput!) {
    addCertificateTeamMember(input: $input) { ${CERTIFICATE_TEAM_MEMBER_FIELDS} }
  }
`;

export const PUBLIC_SOLUTION_COUNTS_QUERY: TypedDocumentNode<
  { publicSolutionCounts: { problemCode: string; acceptedSolutions: number }[] },
  Record<string, never>
> = gql`
  query PublicSolutionCounts {
    publicSolutionCounts {
      problemCode
      acceptedSolutions
    }
  }
`;

export const PUBLIC_SOLUTIONS_QUERY: TypedDocumentNode<
  { publicSolutions: { data: PublicSolution[]; pagination: Pagination } },
  { problemCode?: string; page?: number; limit?: number }
> = gql`
  query PublicSolutions($problemCode: String, $page: Int, $limit: Int) {
    publicSolutions(problemCode: $problemCode, page: $page, limit: $limit) {
      data {
        id
        fullName
        problemCode
        solutionTitle
        solutionDescription
        prototypeUrl
        createdAt
        status
      }
      pagination {
        total
        page
        limit
        totalPages
      }
    }
  }
`;

export const SUBMIT_SOLUTION_MUTATION: TypedDocumentNode<
  { submitSolution: { submissionId: string; status: string } },
  { input: SubmitSolutionInput }
> = gql`
  mutation SubmitSolution($input: SubmitSolutionInput!) {
    submitSolution(input: $input) {
      submissionId
      status
    }
  }
`;

export const APPLY_MENTOR_MUTATION: TypedDocumentNode<
  { applyAsMentor: { submissionId: string; status: string } },
  { input: ApplyMentorInput }
> = gql`
  mutation ApplyAsMentor($input: ApplyMentorInput!) {
    applyAsMentor(input: $input) {
      submissionId
      status
    }
  }
`;

export const ADMIN_SOLUTION_SUBMISSIONS_QUERY: TypedDocumentNode<
  { adminSolutionSubmissions: { data: SolutionSubmission[]; pagination: Pagination } },
  { status?: ReviewStatus; search?: string; problemCode?: string; page?: number; limit?: number }
> = gql`
  query AdminSolutionSubmissions(
    $status: ReviewStatus
    $search: String
    $problemCode: String
    $page: Int
    $limit: Int
  ) {
    adminSolutionSubmissions(
      status: $status
      search: $search
      problemCode: $problemCode
      page: $page
      limit: $limit
    ) {
      data {
        id
        fullName
        email
        phone
        teamMembers {
          fullName
          email
          phone
        }
        problemCode
        solutionTitle
        solutionDescription
        prototypeUrl
        contactConsentAt
        status
        adminNote
        reviewedAt
        reviewedByAdminId
        createdAt
        updatedAt
      }
      pagination {
        total
        page
        limit
        totalPages
      }
    }
  }
`;

export const ADMIN_MENTOR_APPLICATIONS_QUERY: TypedDocumentNode<
  { adminMentorApplications: { data: MentorApplication[]; pagination: Pagination } },
  { status?: ReviewStatus; search?: string; page?: number; limit?: number }
> = gql`
  query AdminMentorApplications($status: ReviewStatus, $search: String, $page: Int, $limit: Int) {
    adminMentorApplications(status: $status, search: $search, page: $page, limit: $limit) {
      data {
        id
        fullName
        email
        phone
        currentRole
        organisation
        expertise
        experienceSummary
        motivation
        profileUrl
        contactConsentAt
        status
        adminNote
        reviewedAt
        reviewedByAdminId
        createdAt
        updatedAt
      }
      pagination {
        total
        page
        limit
        totalPages
      }
    }
  }
`;

export const UPDATE_SOLUTION_STATUS_MUTATION: TypedDocumentNode<
  { updateSolutionStatus: boolean },
  { id: string; input: { status: ReviewStatus; adminNote?: string | null } }
> = gql`
  mutation UpdateSolutionStatus($id: ID!, $input: UpdateReviewStatusInput!) {
    updateSolutionStatus(id: $id, input: $input)
  }
`;

export const UPDATE_MENTOR_STATUS_MUTATION: TypedDocumentNode<
  { updateMentorStatus: boolean },
  { id: string; input: { status: ReviewStatus; adminNote?: string | null } }
> = gql`
  mutation UpdateMentorStatus($id: ID!, $input: UpdateReviewStatusInput!) {
    updateMentorStatus(id: $id, input: $input)
  }
`;
