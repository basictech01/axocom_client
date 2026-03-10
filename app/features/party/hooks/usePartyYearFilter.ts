import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_DISTINCT_YEARS_BY_PARTY } from "../services";

export function usePartyYearFilter(partyId: number) {
    const [selectedYear, setSelectedYear] = useState<string>("");

    const { data, loading } = useQuery(GET_DISTINCT_YEARS_BY_PARTY, {
        variables: { party_id: partyId },
        skip: !partyId,
    });

    const yearOptions = useMemo(() => {
        const years = data?.distinctYearsByParty ?? [];
        return years.map(String);
    }, [data]);

    useEffect(() => {
        if (!selectedYear && yearOptions.length) {
            setSelectedYear(yearOptions[0]); // latest year (backend ordered DESC)
        }
    }, [selectedYear, yearOptions]);

    const onYearChange = useCallback((year: string) => {
        setSelectedYear(year);
    }, []);

    return {
        yearOptions,
        selectedYear,
        onYearChange,
        loading,
    };
}

