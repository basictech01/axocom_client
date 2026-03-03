import { useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_VOTER_AGE_BUCKETS_BY_STATE } from "../services";
import type { VoterAgeBucketsData } from "../types";

// AgeBarChart expects Cr units.
const CRORE = 1e7;

type AgeDatum = { group: string; voters: number };

const GROUP_ORDER = ["18–25", "26–35", "36–45", "46–55", "56–65", "65+"];

export function useVoterAgeDemographic(state: string) {
    const shouldFetch = !!state && state !== "ALL";

    const { data, loading, error } = useQuery<VoterAgeBucketsData>(
        GET_VOTER_AGE_BUCKETS_BY_STATE,
        {
            variables: { state },
            skip: !shouldFetch,
        }
    );

    const ageData: AgeDatum[] = useMemo(() => {
        const buckets = data?.voterAgeBucketsByState ?? [];

        const map = new Map<string, number>();
        for (const b of buckets) {
            map.set(b.group, (map.get(b.group) ?? 0) + b.total);
        }

        // Ensure all 6 groups exist, in order, converting to Cr
        return GROUP_ORDER.map((label) => {
            const total = map.get(label) ?? 0;
            const votersCr = Number((total / CRORE).toFixed(1));
            return { group: label, voters: votersCr };
        });
    }, [data]);

    return { ageData, loading, error };
}