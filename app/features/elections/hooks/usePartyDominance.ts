import { useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_PARTIES } from "../services";
import type {
    ElectionCandidateStatByStateData,
    PartiesData,
} from "../types";

type DonutSlice = { name: string; value: number; color?: string };

export function usePartyDominance(
    candidatesData: ElectionCandidateStatByStateData | undefined
) {
    const { data: partiesData } = useQuery<PartiesData>(GET_PARTIES);

    return useMemo(() => {
        const candidates = candidatesData?.electionCandidatesByStateAndYear ?? [];
        const parties = partiesData?.parties ?? [];

        if (!candidates.length || !parties.length) {
            return {
                data: [] as DonutSlice[],
                centerValue: "—",
                centerLabel: "PARTY SHARE",
            };
        }

        // 1) Aggregate votes by party_id
        const votesByParty = new Map<number, number>();
        for (const c of candidates) {
            votesByParty.set(
                c.party_id,
                (votesByParty.get(c.party_id) ?? 0) + c.votes_polled
            );
        }

        const totalVotes = Array.from(votesByParty.values()).reduce(
            (sum, v) => sum + v,
            0
        );
        if (!totalVotes) {
            return {
                data: [] as DonutSlice[],
                centerValue: "—",
                centerLabel: "PARTY SHARE",
            };
        }

        // 2) Join with party names, compute share %
        const rows = Array.from(votesByParty.entries()).map(
            ([partyId, votes]) => {
                const party = parties.find((p) => p.id === partyId);
                const name = party?.short_name || party?.name || `#${partyId}`;
                const share = (votes / totalVotes) * 100;
                return { partyId, name, votes, share };
            }
        );

        // 3) Sort by share descending
        rows.sort((a, b) => b.share - a.share);

        const top = rows.slice(0, 3);
        const rest = rows.slice(3);

        // 4) Build donut slices: top 3 + Others
        const data: DonutSlice[] = top.map((r) => ({
            name: r.name,
            value: Number(r.share.toFixed(1)),
        }));

        if (rest.length) {
            const restVotes = rest.reduce((s, r) => s + r.votes, 0);
            const restShare = (restVotes / totalVotes) * 100;
            data.push({
                name: "Others",
                value: Number(restShare.toFixed(1)),
            });
        }

        const lead = top[0];
        const centerValue = lead ? `${lead.share.toFixed(1)}%` : "—";
        const centerLabel = lead
            ? `${(lead.name ?? "PARTY").toUpperCase()} SHARE`
            : "PARTY SHARE";

        return { data, centerValue, centerLabel };
    }, [candidatesData, partiesData]);
}