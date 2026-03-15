import { useLazyQuery } from "@apollo/client/react";
import { useEffect, useMemo } from "react";
import { GET_ELECTION_RESULTS_BY_CANDIDATE_IDS } from "~/features/elections/services";
import type { PartyKpiStats } from "../types";
import { GET_PARTY_CANDIDATES_BY_YEAR } from "../services";

export function usePartyKpiStats(partyId: number, year: number) {
    const [fetchCandidates, candidatesState] = useLazyQuery(
        GET_PARTY_CANDIDATES_BY_YEAR
    );
    const [fetchResults, resultsState] = useLazyQuery(
        GET_ELECTION_RESULTS_BY_CANDIDATE_IDS
    );

    const hasFilter = !!partyId && !!year;

    useEffect(() => {
        if (!hasFilter) return;
        fetchCandidates({ variables: { party_id: partyId, year } });
    }, [hasFilter, partyId, year, fetchCandidates]);

    useEffect(() => {
        const candidates = candidatesState.data?.electionCandidatesByPartyAndYear ?? [];
        if (!hasFilter) return;
        if (!candidates.length) return;

        fetchResults({
            variables: {
                election_candidate_ids: candidates.map((c) => c.id),
            },
        });
    }, [hasFilter, candidatesState.data, fetchResults]);

    const kpiStats: PartyKpiStats | null = useMemo(() => {
        if (!hasFilter) return null;

        const candidates = candidatesState.data?.electionCandidatesByPartyAndYear ?? [];
        const results = resultsState.data?.election_resultsByCandidateIds ?? [];

        const totalCandidates = candidates.length;
        const totalVotes = candidates.reduce((s, c) => s + (c.votes_polled ?? 0), 0);
        const seatsWon = results.filter((r) => r.status === "won").length;

        const winRate =
            totalCandidates > 0
                ? `${((seatsWon / totalCandidates) * 100).toFixed(1)}%`
                : "—";

        return { totalCandidates, seatsWon, totalVotes, winRate };
    }, [hasFilter, candidatesState.data, resultsState.data]);

    const electionCandidateIds: number[] = useMemo(
        () =>
            (candidatesState.data?.electionCandidatesByPartyAndYear ?? []).map(
                (c) => c.id as number
            ),
        [candidatesState.data]
    );

    const loading = candidatesState.loading || resultsState.loading;

    return { kpiStats, loading, electionCandidateIds };
}

