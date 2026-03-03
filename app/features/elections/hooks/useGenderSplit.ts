import { useMemo } from "react";
import type { ElectionStatByStateData } from "../types";
import { formatLakh } from "../utils/formatLakh";

type DonutPieDatum = {
    name: string;
    value: number;
    color?: string;
};


/**
 * Derives gender split chart data from electionsData (by state + year).
 */
export function useGenderSplitFromElections(
    electionsData: ElectionStatByStateData | undefined
) {
    return useMemo(() => {
        const elections = electionsData?.electionsByStateAndYear ?? [];
        if (!elections.length) {
            return {
                data: [] as DonutPieDatum[],
                centerValue: "—",
                centerLabel: "TOTAL VOTERS",
            };
        }

        const totalMale = elections.reduce(
            (sum, e: any) => sum + (e.male_voters ?? 0),
            0
        );
        const totalFemale = elections.reduce(
            (sum, e: any) => sum + (e.female_voters ?? 0),
            0
        );
        const totalVoters = elections.reduce(
            (sum, e: any) => sum + (e.total_voters ?? 0),
            0
        );

        const known = totalMale + totalFemale;
        const other = Math.max(totalVoters - known, 0);

        const denom = totalVoters || known || 1;
        const toPct = (n: number) =>
            Number(((n / denom) * 100).toFixed(1));

        const data: DonutPieDatum[] = [
            { name: "Male", value: toPct(totalMale), color: "#2563eb" },
            { name: "Female", value: toPct(totalFemale), color: "#ec4899" },
        ];

        if (other > 0) {
            data.push({
                name: "Other / Unspecified",
                value: toPct(other),
                color: "#f97316",
            });
        }

        return {
            data,
            centerValue: formatLakh(totalVoters),
            centerLabel: "TOTAL VOTERS",
        };
    }, [electionsData]);
}