import { useQuery } from "@apollo/client/react";
import { useMemo, useState } from "react";
import { GET_PARTIES_LIST } from "../services";
import type { PartyListVM, RawPartyListItem } from "../types";

export function usePartyList() {
    const { data, loading } = useQuery(GET_PARTIES_LIST);

    const [searchName, setSearchName] = useState("");
    const [partyType, setPartyType] = useState("ALL");

    const allParties: PartyListVM[] = useMemo(() => {
        if (!data?.parties) {
            return [];
        }
        return data.parties.map((p: RawPartyListItem) => ({
            id: p.id,
            name: p.name,
            shortName: p.short_name,
            imageUrl: p.symbol?.trim() ? p.symbol : null,
            type: p.party_type ?? "Unknown",
        }));
    }, [data]);

    const parties = useMemo(() => {
        return allParties.filter((p) => {
            if (
                searchName &&
                !p.name.toLowerCase().includes(searchName.toLowerCase())
            )
                return false;
            if (partyType !== "ALL" && p.type !== partyType) return false;
            return true;
        });
    }, [allParties, searchName, partyType]);

    const typeOptions = useMemo(() => {
        const types = new Set<string>();
        allParties.forEach((p) => {
            if (p.type !== "Unknown") types.add(p.type);
        });
        return Array.from(types).sort();
    }, [allParties]);

    return {
        parties,
        loading,
        searchName,
        setSearchName,
        partyType,
        setPartyType,
        typeOptions,
    };
}
