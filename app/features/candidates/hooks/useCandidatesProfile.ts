import { useLazyQuery } from "@apollo/client/react";
import { useCallback, useMemo } from "react";
import { GET_CANDIDATE_BY_ID } from "../services";
import type { RawCandidate } from "../types";

export function useCandidatesProfile() {
    const [fetchCandidate, { data, loading }] = useLazyQuery(
        GET_CANDIDATE_BY_ID
    );

    const candidate: RawCandidate | null = useMemo(() => {
        return data?.candidate ?? null;
    }, [data]);

    const loadCandidate = useCallback(
        (candidateId: number) => {
            fetchCandidate({ variables: { id: candidateId } });
        },
        [fetchCandidate]
    );

    return {
        candidate,
        loading,
        loadCandidate,
        rawCandidateData: data?.candidate ?? null,
    };
}