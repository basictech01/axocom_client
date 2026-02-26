import { useState, useMemo, useCallback } from "react";
import { useQuery, useLazyQuery } from "@apollo/client/react";
import {
    GET_ALL_CONSTITUENCIES,
    GET_ELECTIONS_YEARS,
} from "../../constituency/services";
import { GET_CONSTITUENCIES_BY_STATE } from "../../constituency/services";

/**
 * useElectionFilter
 *
 * - Eagerly loads all constituencies (for distinct states dropdown)
 * - Eagerly loads all elections (year + constituency_id, for year dropdown)
 * - When state changes: lazily fetches constituencies for that state, then
 *   cross-references with all elections to derive distinct years for that state.
 * - Returns controlled state + options for ElectionFilterBar.
 */
export function useElectionFilter() {
    const [selectedState, setSelectedState] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    // 1. All constituencies — used to derive distinct state options
    const { data: allConstData } = useQuery(GET_ALL_CONSTITUENCIES);

    // 2. All elections lightweight — year + constituency_id for cross-reference
    const { data: allElectionsData } = useQuery(GET_ELECTIONS_YEARS);

    // 3. Constituencies for the selected state — to get their IDs
    const [fetchByState, { data: stateConstData }] = useLazyQuery(
        GET_CONSTITUENCIES_BY_STATE
    );

    // Derived: distinct sorted state options from all constituencies
    const stateOptions: string[] = useMemo(() => {
        if (!allConstData?.constituencies) return [];
        return [
            ...new Set(allConstData.constituencies.map((c: { state: string }) => c.state)),
        ].sort();
    }, [allConstData]);

    // Derived: distinct years for the selected state
    // Cross-reference: get constituency IDs for the state, then filter elections by those IDs
    const yearOptions: string[] = useMemo(() => {
        if (!stateConstData?.constituenciesByState || !allElectionsData?.elections) return [];

        const stateConstIds = new Set(
            stateConstData.constituenciesByState.map((c: { id: number }) => c.id)
        );

        const years = [
            ...new Set(
                allElectionsData.elections
                    .filter((e: { constituency_id: number }) => stateConstIds.has(e.constituency_id))
                    .map((e: { year: number }) => String(e.year))
            ),
        ].sort((a, b) => Number(b) - Number(a)); // descending

        return years;
    }, [stateConstData, allElectionsData]);

    // When year options change and current selection is invalid, auto-pick the first
    useMemo(() => {
        if (yearOptions.length && !yearOptions.includes(selectedYear)) {
            setSelectedYear(yearOptions[0]);
        }
    }, [yearOptions]);

    const onStateChange = useCallback(
        (state: string) => {
            setSelectedState(state);
            setSelectedYear(""); // reset year until the new state's years load
            fetchByState({ variables: { state } });
        },
        [fetchByState]
    );

    const onYearChange = useCallback((year: string) => {
        setSelectedYear(year);
    }, []);

    return {
        selectedState,
        onStateChange,
        stateOptions,
        selectedYear,
        onYearChange,
        yearOptions,
    };
}
