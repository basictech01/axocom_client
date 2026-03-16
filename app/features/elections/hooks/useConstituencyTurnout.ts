import { useMemo } from "react";
import type { ElectionStatByStateData, ElectionCandidateStatByStateData } from "../types";
import type { ConstituenciesByStateData } from "~/features/constituency/types";
import type { TurnoutItem } from "~/components/molecules/elections/turnout-list";

export function useConstituencyTurnout(
    electionsData: ElectionStatByStateData | undefined,
    candidatesData: ElectionCandidateStatByStateData | undefined,
    constituenciesData: ConstituenciesByStateData | undefined,
    topN: number = 5
) {
    const elections = electionsData?.electionsByStateAndYear ?? [];
    const candidates = candidatesData?.electionCandidatesByStateAndYear ?? [];
    const constituencies = constituenciesData?.constituenciesByState ?? [];

    return useMemo(() => {
        if (!elections.length || !candidates.length) {
            return { highest: [] as TurnoutItem[], lowest: [] as TurnoutItem[] };
        }

        // Map constituency_id → total registered voters (from election table)
        const registeredById = new Map<number, number>();
        for (const e of elections) {
            registeredById.set(
                e.constituency_id,
                (registeredById.get(e.constituency_id) ?? 0) + e.total_voters
            );
        }

        // Map constituency_id → total votes cast (sum of candidates' votes_polled)
        const castById = new Map<number, number>();
        for (const c of candidates) {
            castById.set(
                c.constituency_id,
                (castById.get(c.constituency_id) ?? 0) + c.votes_polled
            );
        }

        // Map constituency_id → name + state
        const infoById = new Map(
            constituencies.map((c) => [c.id, { name: c.name, state: c.state }])
        );

        // Build turnout entries for each constituency that has both data points
        const turnoutList = Array.from(registeredById.entries())
            .filter(([id, total]) => total > 0 && castById.has(id))
            .map(([id, totalVoters]) => {
                const votesCast = castById.get(id) ?? 0;
                const turnout = Number(((votesCast / totalVoters) * 100).toFixed(1));
                const info = infoById.get(id);
                return {
                    constituency_id: id,
                    constituency: info?.name ?? `#${id}`,
                    state: info?.state ?? "—",
                    turnout,
                };
            })
            .sort((a, b) => b.turnout - a.turnout);

        const highest: TurnoutItem[] = turnoutList
            .slice(0, topN)
            .map((r, i) => ({ rank: i + 1, constituency: r.constituency, state: r.state, turnout: r.turnout }));

        const lowest: TurnoutItem[] = [...turnoutList]
            .reverse()
            .slice(0, topN)
            .map((r, i) => ({ rank: i + 1, constituency: r.constituency, state: r.state, turnout: r.turnout }));

        return { highest, lowest };
    }, [elections, candidates, constituencies, topN]);
}