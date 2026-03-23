import { useQuery } from "@apollo/client/react";
import { useMemo } from "react";
import { GET_VOTER_BY_ID } from "../services";
import { toVoterProfileVM, type VoterProfileVM } from "../types";

/** Format ISO datetime for voter profile "Created at" and similar. */
export function formatVoterDateTime(iso: string): string {
    if (!iso) return "—";
    try {
        return new Date(iso).toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
        });
    } catch {
        return iso;
    }
}

/** Two-letter initials from a display name for the profile avatar. */
export function voterDisplayInitials(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "?";
    if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
    return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

export function useVoterProfile(id: number) {
    const skip = !Number.isFinite(id) || id <= 0;

    const { data, loading, error } = useQuery(GET_VOTER_BY_ID, {
        variables: { id },
        skip,
    });

    const voter: VoterProfileVM | null = useMemo(() => {
        if (skip) return null;
        if (!data?.voter) return null;
        return toVoterProfileVM(data.voter);
    }, [data, skip]);

    return {
        voter,
        loading: skip ? false : loading,
        error: skip ? null : error,
    };
}
