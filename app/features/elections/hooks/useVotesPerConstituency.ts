import { useMemo } from "react";
import type { ElectionStatByStateData } from "../types";
import type { ConstituenciesByStateData } from "~/features/constituency/types";

type VotesBarItem = { constituency: string; votes: number };

export function useVotesPerConstituency(
    electionsData: ElectionStatByStateData | undefined,
    constituenciesData: ConstituenciesByStateData | undefined,
    topN: number = 10
) {
    const elections = electionsData?.electionsByStateAndYear ?? [];
    const constituencies = constituenciesData?.constituenciesByState ?? [];

    const nameById = useMemo(() => {
        return new Map(constituencies.map((c) => [c.id, c.name] as const));
    }, [constituencies]);

    const data: VotesBarItem[] = useMemo(() => {
        return elections
            .map((e) => ({
                constituency_id: e.constituency_id,
                votesLakh: Number(((e.total_voters ?? 0) / 1e5).toFixed(1)),
            }))
            .sort((a, b) => b.votesLakh - a.votesLakh)
            .slice(0, topN)
            .map((r) => ({
                constituency: nameById.get(r.constituency_id) ?? `#${r.constituency_id}`,
                votes: r.votesLakh,
            }));
    }, [elections, nameById, topN]);

    return { data };
}