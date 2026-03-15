import { useLazyQuery } from "@apollo/client/react";
import { useCallback, useEffect, useMemo } from "react";
import { GET_PARTY_BY_ID } from "../services";
import type { RawParty } from "../types";

export type PartyProfileVM = {
    name: string;
    shortName: string;
    type: string;
    imageUrl: string;
};

export function usePartyProfile(partyId: number) {
    const [fetchParty, { data, loading, error }] = useLazyQuery(GET_PARTY_BY_ID);

    const loadParty = useCallback(
        (partyId: number) => {
            fetchParty({ variables: { id: partyId } });
        },
        [fetchParty]
    );

    useEffect(() => {
        if (partyId) {
            loadParty(partyId);
        }
    }, [partyId, loadParty]);

    const party: RawParty | null = useMemo(() => {
        return data?.party ?? null;
    }, [data]);

    const partyVM: PartyProfileVM = useMemo(() => {
        return {
            name: party?.name ?? "—",
            shortName: party?.short_name ?? "—",
            type: party?.party_type ?? "—",
            imageUrl: party?.symbol ?? "",
        };
    }, [party]);

    return {
        party,
        partyVM,
        loading,
        error,
        loadParty,
        rawPartyData: data?.party ?? null,
    };
}

