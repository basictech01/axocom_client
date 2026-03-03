import { gql, type TypedDocumentNode } from "@apollo/client";
import type {
  ElectionStatByStateData,
  ElectionCandidateStatByStateData,
  ElectionsByStateAndYearData,
  VoterAgeBucketsData,
  PartiesData,
  ElectionResultsByCandidateIdsData,
} from "../types";

// Elections filtered by state + year
export const GET_ELECTIONS_BY_STATE_AND_YEAR: TypedDocumentNode<
  ElectionStatByStateData,
  { state: string; year: number }
> = gql`
  query GetElectionsByStateAndYear($state: String!, $year: Int!) {
    electionsByStateAndYear(state: $state, year: $year) {
      id
      constituency_id
      total_voters
      male_voters
      female_voters
      start_date
      end_date
      year
      number_of_polling_stations
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
      constituency_id
      candidate_id
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

export const GET_VOTER_AGE_BUCKETS_BY_STATE: TypedDocumentNode<
  VoterAgeBucketsData,
  { state: string }
> = gql`
  query GetVoterAgeBucketsByState($state: String!) {
    voterAgeBucketsByState(state: $state) {
      group
      total
    }
  }
`;

export const GET_PARTIES: TypedDocumentNode<
  PartiesData,
  Record<string, never>
> = gql`
  query GetParties {
    parties {
      id
      name
      short_name
    }
  }
`;

export const GET_ELECTION_RESULTS_BY_CANDIDATE_IDS: TypedDocumentNode<
  ElectionResultsByCandidateIdsData,
  { election_candidate_ids: number[] }
> = gql`
  query GetElectionResultsByCandidateIds($election_candidate_ids: [Int!]!) {
    election_resultsByCandidateIds(election_candidate_ids: $election_candidate_ids) {
      id
      election_candidate_id
      votes_polled
      position
      status
      election_candidate {
        candidate {
          name
        }
      }
    }
  }
`;
