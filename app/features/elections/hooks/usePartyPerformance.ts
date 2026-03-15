import { useMemo } from "react";
import type {
    ElectionCandidateStatByStateData,
    ElectionResultsByCandidateIdsData,
    PartiesData,
} from "../types";
import type { PartyPerformanceRow } from "../types";
import { PARTY_COLORS } from "~/features/elections/utils/constant";


function partyColor(shortName: string): string {
    return PARTY_COLORS[shortName] ?? "#9ca3af";
}

export function usePartyPerformance(
    candidatesData: ElectionCandidateStatByStateData | undefined,
    partiesData: PartiesData | undefined,
    resultsData: ElectionResultsByCandidateIdsData | undefined
) {
    const rows: PartyPerformanceRow[] = useMemo(() => {
        const candidates = candidatesData?.electionCandidatesByStateAndYear ?? [];
        if (!candidates.length) return [];

        const partyById = new Map(
            (partiesData?.parties ?? []).map((p) => [p.id, p])
        );

        const statusById = new Map(
            (resultsData?.election_resultsByCandidateIds ?? []).map((r) => [
                r.election_candidate_id,
                r.status,
            ])
        );

        const totalVotes = candidates.reduce((sum, c) => sum + c.votes_polled, 0);

        const byParty = new Map<number, { votes: number; seats: number }>();
        for (const c of candidates) {
            const prev = byParty.get(c.party_id) ?? { votes: 0, seats: 0 };
            byParty.set(c.party_id, {
                votes: prev.votes + c.votes_polled,
                seats: prev.seats + (statusById.get(c.id)?.toLowerCase() === "won" ? 1 : 0),
            });
        }

        return Array.from(byParty.entries())
            .map(([partyId, { votes, seats }]) => {
                const party = partyById.get(partyId);
                const shortName = party?.short_name || party?.name || `#${partyId}`;
                const share =
                    totalVotes > 0
                        ? ((votes / totalVotes) * 100).toFixed(1) + "%"
                        : "—";
                return { partyId, party: shortName, color: partyColor(shortName), seats, voteShare: share };
            })
            .sort((a, b) => {
                const shareA = parseFloat(a.voteShare) || 0;
                const shareB = parseFloat(b.voteShare) || 0;
                return shareB - shareA;
            });
    }, [candidatesData, partiesData, resultsData]);

    return { rows };
}