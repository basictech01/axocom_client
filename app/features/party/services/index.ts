import { gql, type TypedDocumentNode } from "@apollo/client";
import type {
    PartyData,
    PartyDistinctYearsData,
    PartyElectionCandidatesData,
    PartyListData,
    PartyRosterData,
    PartySeatsHistoryData,
} from "../types";

export const GET_PARTIES_LIST: TypedDocumentNode<
    PartyListData,
    Record<string, never>
> = gql`
  query GetPartiesList {
    parties {
      id
      name
      short_name
      symbol
      party_type
    }
  }
`;

export const GET_PARTY_BY_ID: TypedDocumentNode<PartyData, { id: number }> = gql`
  query GetPartyById($id: Int!) {
    party(id: $id) {
      id
      name
      symbol
      short_name
      party_type
      created_at
    }
  }
`;

export const GET_DISTINCT_YEARS_BY_PARTY: TypedDocumentNode<
    PartyDistinctYearsData,
    { party_id: number }
> = gql`
  query GetDistinctYearsByParty($party_id: Int!) {
    distinctYearsByParty(party_id: $party_id)
  }
`;

export const GET_PARTY_CANDIDATES_BY_YEAR: TypedDocumentNode<
    PartyElectionCandidatesData,
    { party_id: number; year: number }
> = gql`
  query GetPartyElectionCandidatesByYear($party_id: Int!, $year: Int!) {
    electionCandidatesByPartyAndYear(party_id: $party_id, year: $year) {
      id
      votes_polled
    }
  }
`;

export const GET_PARTY_ROSTER_BY_IDS: TypedDocumentNode<
    PartyRosterData,
    { ids: number[] }
> = gql`
  query GetPartyRosterByIds($ids: [Int!]!) {
    electionCandidatesByIds(ids: $ids) {
      id
      votes_polled
      criminal_cases
      assets
      candidate {
        id
        name
        caste
        education_category
        candidate_image
      }
    }
  }
`;

export const GET_SEATS_WON_PER_YEAR: TypedDocumentNode<
    PartySeatsHistoryData,
    { party_id: number }
> = gql`
  query GetSeatsWonPerYearByParty($party_id: Int!) {
    seatsWonPerYearByParty(party_id: $party_id) {
      year
      seatsWon
    }
  }
`;

