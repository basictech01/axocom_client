export interface RawParty {
    id: number;
    name: string;
    symbol: string;
    short_name: string;
    party_type: string;
    created_at: string;
}

export interface PartyData {
    party: RawParty | null;
}

export interface PartyElectionCandidate {
    id: number;
    votes_polled: number;
}

export interface PartyElectionCandidatesData {
    electionCandidatesByPartyAndYear: PartyElectionCandidate[];
}

export interface PartyElectionResult {
    id: number;
    election_candidate_id: number;
    status: string;
}

export interface PartyElectionResultsData {
    election_resultsByCandidateIds: PartyElectionResult[];
}

export interface PartyDistinctYearsData {
    distinctYearsByParty: number[];
}

export interface PartyYearSeatsWon {
    year: number;
    seatsWon: number;
}

export interface PartySeatsHistoryData {
    seatsWonPerYearByParty: PartyYearSeatsWon[];
}

export interface PartyKpiStats {
    totalCandidates: number;
    seatsWon: number;
    totalVotes: number;
    winRate: string;
}

export interface PartyRosterCandidateRaw {
    id: number;
    votes_polled: number;
    criminal_cases: number;
    assets: number;
    candidate: {
        id: number;
        name: string;
        caste: string;
        education_category: string | null;
        candidate_image: string | null;
    } | null;
}

export interface PartyRosterData {
    electionCandidatesByIds: PartyRosterCandidateRaw[];
}

export interface PartyRosterRowVM {
    ecId: number;
    candidateId: number;
    name: string;
    caste: string;
    education: string;
    voteShare: string;
    votesPolled: number;
    imageUrl: string | null;
}

export interface RawPartyListItem {
    id: number;
    name: string;
    short_name: string;
    symbol: string;
    party_type: string;
}

export interface PartyListData {
    parties: RawPartyListItem[];
}

export interface PartyListVM {
    id: number;
    name: string;
    shortName: string;
    imageUrl: string | null;
    type: string;
}


