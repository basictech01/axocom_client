import { gql, type TypedDocumentNode } from "@apollo/client";
import type {
  ElectionStatByStateData,
  ElectionCandidateStatByStateData,
  ElectionsByStateAndYearData,
} from "../types";

// Elections filtered by state + year
export const GET_ELECTIONS_BY_STATE_AND_YEAR: TypedDocumentNode<
  ElectionStatByStateData,
  { state: string; year: number }
> = gql`
  query GetElectionsByStateAndYear($state: String!, $year: Int!) {
    electionsByStateAndYear(state: $state, year: $year) {
      id
      total_voters
      start_date
      end_date
      year
    }
  }
`;
// Election candidates filtered by state + year
export const GET_ELECTION_CANDIDATES_BY_STATE_AND_YEAR: TypedDocumentNode<
  ElectionCandidateStatByStateData,
  { state: string; year: number }
> = gql`
  query GetElectionCandidatesByStateAndYear($state: String!, $year: Int!) {
    electionCandidatesByStateAndYear(state: $state, year: $year) {
      id
      party_id
      votes_polled
    }
  }
`;

export const GET_ELECTIONS_YEARS_FOR_STATE: TypedDocumentNode<
  { electionsByStateAndYear: { id: number; year: number }[] },
  { state: string; year: number }
> = gql`
  query GetElectionsYearsForState($state: String!, $year: Int!) {
    electionsByStateAndYear(state: $state, year: $year) {
      id
      year
    }
  }
`;
