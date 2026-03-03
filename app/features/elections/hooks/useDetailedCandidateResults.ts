import { useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import {
    GET_PARTIES,
    GET_ELECTION_RESULTS_BY_CANDIDATE_IDS,
} from "../services";
import type {
    ElectionCandidateStatByStateData,
    ElectionResultsByCandidateIdsData,
    PartiesData,
} from "../types";
import type { ConstituenciesByStateData } from "~/features/constituency/types";

export type CandidateRow = {
    name: string;
    constituency: string;
    party: string;
    partyColor: string;
    votes: string;
    status: "Won" | "Lost" | "Leading" | "Trailing";
};

export const STATUS_STYLE: Record<CandidateRow["status"], string> = {
    Won: "bg-green-100 text-green-700",
    Lost: "bg-red-100 text-red-600",
    Leading: "bg-blue-100 text-blue-700",
    Trailing: "bg-amber-100 text-amber-700",
};

function formatVotes(n: number): string {
    return n.toLocaleString("en-IN");
}

// Optional: simple color map; tweak as you like
function getPartyColor(shortName: string): string {
    switch (shortName) {
        case "BJP":
            return "#f97316";
        case "INC":
            return "#2563eb";
        case "SP":
            return "#ef4444";
        case "AITC":
            return "#22c55e";
        case "TDP":
            return "#eab308";
        case "NC":
            return "#6366f1";
        default:
            return "#64748b"; // neutral
    }
}

export function useDetailedCandidateResults(
    candidatesData: ElectionCandidateStatByStateData | undefined,
    constituenciesData: ConstituenciesByStateData | undefined
) {
    const candidates = candidatesData?.electionCandidatesByStateAndYear ?? [];
    const constituencies = constituenciesData?.constituenciesByState ?? [];

    // Pre-compute ids for downstream queries
    const electionCandidateIds = useMemo(
        () => candidates.map((c) => c.id),
        [candidates]
    );

    // 1) Fetch all parties once
    const { data: partiesData } = useQuery<PartiesData>(GET_PARTIES);

    // 2) Fetch election results for these election_candidate_ids
    const { data: resultsData } = useQuery<ElectionResultsByCandidateIdsData>(
        GET_ELECTION_RESULTS_BY_CANDIDATE_IDS,
        {
            variables: { election_candidate_ids: electionCandidateIds },
            skip: electionCandidateIds.length === 0,
        }
    );

    const rows: CandidateRow[] = useMemo(() => {
        if (!candidates.length) return [];

        const partyById = new Map(
            (partiesData?.parties ?? []).map((p) => [p.id, p])
        );

        const constituencyById = new Map(
            constituencies.map((c) => [c.id, c.name] as const)
        );

        const resultByElectionCandidateId = new Map(
            (resultsData?.election_resultsByCandidateIds ?? []).map((r) => [
                r.election_candidate_id,
                r,
            ] as const)
        );

        // Sort election candidates by votes_polled descending
        const sorted = [...candidates].sort(
            (a, b) => b.votes_polled - a.votes_polled
        );

        return sorted.map((ec) => {
            const result = resultByElectionCandidateId.get(ec.id);
            const party = partyById.get(ec.party_id);
            const constituencyName =
                constituencyById.get(ec.constituency_id) ??
                `#${ec.constituency_id}`;

            const partyShort = party?.short_name || party?.name || "Other";
            const partyColor = getPartyColor(partyShort);
            const votes = formatVotes(ec.votes_polled);

            // Map backend status string into UI union; assume backend uses "Won"/"Lost"/"Leading"/"Trailing"
            const statusRaw = result?.status ?? "Trailing";
            const status =
                statusRaw === "Won" ||
                    statusRaw === "Lost" ||
                    statusRaw === "Leading" ||
                    statusRaw === "Trailing"
                    ? statusRaw
                    : "Trailing";

            return {
                name: result?.election_candidate?.candidate?.name ?? "Unknown", // see note below
                constituency: constituencyName,
                party: partyShort,
                partyColor,
                votes,
                status,
            };
        });
    }, [candidates, constituencies, partiesData, resultsData]);

    return { rows };
}