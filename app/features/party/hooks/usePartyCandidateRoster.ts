import { useLazyQuery } from "@apollo/client/react";
import { useEffect, useMemo } from "react";
import { GET_PARTY_ROSTER_BY_IDS } from "../services";
import type {
    PartyRosterCandidateRaw,
    PartyRosterData,
    PartyRosterRowVM,
} from "../types";

type CriminalDatum = { name: string; value: number; color: string };
type EducationDatum = {
    label: string;
    value: string;
    percent: number;
    color: string;
};
export type AssetDatum = { group: string; candidates: number };

export function usePartyCandidateRoster(electionCandidateIds: number[]) {
    const [fetchRoster, { data, loading }] = useLazyQuery<PartyRosterData>(
        GET_PARTY_ROSTER_BY_IDS
    );

    useEffect(() => {
        if (!electionCandidateIds.length) return;
        fetchRoster({ variables: { ids: electionCandidateIds } });
    }, [electionCandidateIds, fetchRoster]);

    const rows: PartyRosterCandidateRaw[] =
        data?.electionCandidatesByIds ?? [];

    const totalVotes = useMemo(
        () => rows.reduce((s, r) => s + (r.votes_polled ?? 0), 0),
        [rows]
    );

    const criminalData: CriminalDatum[] = useMemo(() => {
        if (!rows.length) {
            return [
                { name: "0 Cases", value: 0, color: "green" },
                { name: "1–3 Cases", value: 0, color: "orange" },
                { name: "4+ Cases", value: 0, color: "red" },
            ];
        }

        const zero = rows.filter((r) => (r.criminal_cases ?? 0) === 0).length;
        const oneToThree = rows.filter(
            (r) => (r.criminal_cases ?? 0) >= 1 && (r.criminal_cases ?? 0) <= 3
        ).length;
        const fourPlus = rows.filter((r) => (r.criminal_cases ?? 0) >= 4).length;

        return [
            { name: "0 Cases", value: zero, color: "green" },
            { name: "1–3 Cases", value: oneToThree, color: "orange" },
            { name: "4+ Cases", value: fourPlus, color: "red" },
        ];
    }, [rows]);

    const educationData: EducationDatum[] = useMemo(() => {
        if (!rows.length) return [];

        const counts = new Map<string, number>();
        for (const r of rows) {
            const key =
                r.candidate?.education_category?.trim() || "Other / Not Declared";
            counts.set(key, (counts.get(key) ?? 0) + 1);
        }

        const total = rows.length || 1;
        const palette = ["bg-blue-600", "bg-blue-400", "bg-blue-300", "bg-blue-200"];

        return Array.from(counts.entries()).map(([label, count], idx) => {
            const percent = (count / total) * 100;
            return {
                label,
                value: `${percent.toFixed(0)}%`,
                percent,
                color: palette[idx % palette.length],
            };
        });
    }, [rows]);

    const assetData: AssetDatum[] = useMemo(() => {
        if (!rows.length) {
            return [
                { group: "<10L", candidates: 0 },
                { group: "10L–1Cr", candidates: 0 },
                { group: "1–5Cr", candidates: 0 },
                { group: "5–10Cr", candidates: 0 },
                { group: "10Cr+", candidates: 0 },
            ];
        }

        const buckets = {
            "<10L": 0,
            "10L–1Cr": 0,
            "1–5Cr": 0,
            "5–10Cr": 0,
            "10Cr+": 0,
        };

        for (const r of rows) {
            const assets = r.assets ?? 0;
            if (assets < 1_000_000) {
                buckets["<10L"]++;
            } else if (assets < 10_000_000) {
                buckets["10L–1Cr"]++;
            } else if (assets < 50_000_000) {
                buckets["1–5Cr"]++;
            } else if (assets < 100_000_000) {
                buckets["5–10Cr"]++;
            } else {
                buckets["10Cr+"]++;
            }
        }

        return Object.entries(buckets).map(([group, candidates]) => ({
            group,
            candidates,
        }));
    }, [rows]);

    const rosterRows: PartyRosterRowVM[] = useMemo(() => {
        if (!rows.length) return [];

        return rows.map((r) => {
            const candidate = r.candidate;
            const votesPolled = r.votes_polled ?? 0;
            const share =
                totalVotes > 0
                    ? `${((votesPolled / totalVotes) * 100).toFixed(1)}%`
                    : "—";

            return {
                ecId: r.id,
                candidateId: candidate?.id ?? 0,
                name: candidate?.name ?? "Unknown",
                caste: candidate?.caste ?? "Unknown",
                education: candidate?.education_category ?? "—",
                voteShare: share,
                votesPolled,
                imageUrl: candidate?.candidate_image ?? null,
            };
        });
    }, [rows, totalVotes]);

    return {
        rosterRows,
        criminalData,
        educationData,
        assetData,
        loading,
    };
}

