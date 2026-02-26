// Election fields used by stat cards
export interface ElectionStat {
    id: number;
    total_voters: number;
    start_date: string;
    end_date: string;
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
