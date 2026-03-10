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


