import { useMemo } from "react";
import type { ElectionCandidateStatByStateData } from "../types";
import type { ConstituenciesByStateData } from "~/features/constituency/types";

type VotesBarItem = { constituency: string; votes: number };

export function useVotesPerConstituency(
    candidatesData: ElectionCandidateStatByStateData | undefined,
    constituenciesData: ConstituenciesByStateData | undefined,
    topN: number = 10
) {
    const candidates = candidatesData?.electionCandidatesByStateAndYear ?? [];
    const constituencies = constituenciesData?.constituenciesByState ?? [];

    const nameById = useMemo(() => {
        return new Map(constituencies.map((c) => [c.id, c.name] as const));
    }, [constituencies]);

    const data: VotesBarItem[] = useMemo(() => {
        // Sum votes_polled for all candidates per constituency_id
        const votesByConstituency = new Map<number, number>();
        for (const c of candidates) {
            votesByConstituency.set(
                c.constituency_id,
                (votesByConstituency.get(c.constituency_id) ?? 0) + c.votes_polled
            );
        }

        return Array.from(votesByConstituency.entries())
            .map(([constituency_id, totalVotes]) => ({
                constituency_id,
                votesLakh: Number((totalVotes / 1e5).toFixed(1)),
            }))
            .sort((a, b) => b.votesLakh - a.votesLakh)
            .slice(0, topN)
            .map((r) => ({
                constituency: nameById.get(r.constituency_id) ?? `#${r.constituency_id}`,
                votes: r.votesLakh,
            }));
    }, [candidates, nameById, topN]);

    return { data };
}