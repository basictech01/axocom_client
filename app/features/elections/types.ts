// Election fields used by stat cards
export interface ElectionStat {
    id: number;
    constituency_id: number;
    total_voters: number;
    male_voters: number;
    female_voters: number;
    start_date: string;
    end_date: string;
    number_of_polling_stations: number;
    year: number;
}

export interface ElectionStatData {
    elections: ElectionStat[]
}

export interface ElectionStatByStateData {
    electionsByStateAndYear: ElectionStat[];
}

// ElectionCandidate fields used by stat cards
export interface ElectionCandidateStat {
    id: number;
    party_id: number;
    votes_polled: number;
    constituency_id: number;
    candidate_id: number;
}

export interface ElectionCandidateStatData {
    election_candidates: ElectionCandidateStat[];
}

export interface ElectionCandidateStatByStateData {
    electionCandidatesByStateAndYear: ElectionCandidateStat[];
}

// Lightweight election rows for deriving years in filter dropdown
export interface ElectionYearRow {
    id: number;
    year: number;
    constituency_id: number;
}

export interface ElectionsByStateAndYearData {
    electionsByStateAndYear: ElectionYearRow[];
}

export interface VoterAgeBucket {
    group: string;
    total: number;
}

export interface VoterAgeBucketsData {
    voterAgeBucketsByState: VoterAgeBucket[];
}

export interface Party {
    id: number;
    name: string;
    short_name: string;
}

export interface PartiesData {
    parties: Party[];
}

export interface ElectionResultRow {
    id: number;
    election_candidate_id: number;
    votes_polled: number;
    position: number;
    status: string;
    election_candidate: {
        candidate: {
            name: string;
        };
    };
}

export interface ElectionResultsByCandidateIdsData {
    election_resultsByCandidateIds: ElectionResultRow[];
}

export interface PartyPerformanceRow {
    [key: string]: unknown;
    partyId: number;
    party: string;
    color: string;
    seats: number;
    voteShare: string;
}

export interface PartyPerformanceData {
    rows: PartyPerformanceRow[];
}