import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useQuery, useLazyQuery } from "@apollo/client/react";
import {
    GET_ALL_CONSTITUENCIES,
    GET_CONSTITUENCIES_BY_STATE,
    GET_ELECTIONS_YEARS,
    GET_ELECTION_BY_CONSTITUENCY_AND_YEAR,
} from "../services";
import type { StateOption, Constituency } from "../types";
import { useAuth } from "~/contexts/auth-context";

export function useElectionFilter() {
    const { user } = useAuth();
    //  Local filter state 
    const [selectedState, setSelectedState] = useState<string>("");
    const [selectedYear, setSelectedYear] = useState<string>("");
    const [constituencySearch, setConstituencySearch] = useState<string>("");
    const [selectedConstituencyId, setSelectedConstituencyId] = useState<number | null>(null);

    //  1. Eagerly load lightweight lists (for dropdowns) 
    const { data: allConstituencies } = useQuery(GET_ALL_CONSTITUENCIES);
    const { data: allElections } = useQuery(GET_ELECTIONS_YEARS);

    // 2. Lazily load constituencies for a chosen state 
    const [fetchByState, { data: stateConstituencies }] = useLazyQuery(
        GET_CONSTITUENCIES_BY_STATE
    );

    // 3. Lazily load full detail on "Update View" 
    const [fetchDetail, { data: detailData, loading: detailLoading }] =
        useLazyQuery(GET_ELECTION_BY_CONSTITUENCY_AND_YEAR);

    // Derived: unique state options 
    const stateOptions: StateOption[] = useMemo(() => {
        if (!allConstituencies?.constituencies) return [];
        const unique = [
            ...new Set(allConstituencies.constituencies.map((c) => c.state)),
        ];
        return unique.sort().map((s) => ({ value: s, label: s }));
    }, [allConstituencies]);

    // Derived: unique election years 
    const electionYearOptions: string[] = useMemo(() => {
        if (!allElections?.elections) return [];
        const unique = [...new Set(allElections.elections.map((e) => String(e.year)))];
        return unique.sort((a, b) => Number(b) - Number(a)); // descending
    }, [allElections]);

    // Derived: constituency list for search autocomplete 
    const constituencyOptions: Constituency[] = useMemo(() => {
        const list = stateConstituencies?.constituenciesByState ?? [];
        if (!constituencySearch) return list;
        return list.filter((c) =>
            c.name.toLowerCase().includes(constituencySearch.toLowerCase())
        );
    }, [stateConstituencies, constituencySearch]);

    const hasFetchedDefault = useRef(false);

    // Default: load first constituency on initial data 
    useEffect(() => {
        if (allConstituencies?.constituencies?.length && !selectedState) {
            const defaultAssembly = user?.default_assembly_constituency
                ?.trim()
                .toLowerCase();

            const preferred =
                defaultAssembly
                    ? allConstituencies.constituencies.find((item) => {
                        const normalizedName = item.name.trim().toLowerCase();
                        return (
                            normalizedName === defaultAssembly ||
                            normalizedName.includes(defaultAssembly) ||
                            defaultAssembly.includes(normalizedName)
                        );
                    })
                    : null;

            const initialConstituency = preferred ?? allConstituencies.constituencies[0];
            setSelectedState(initialConstituency.state);
            setSelectedConstituencyId(initialConstituency.id);
            setConstituencySearch(initialConstituency.name);
            fetchByState({ variables: { state: initialConstituency.state } });
        }
    }, [allConstituencies, selectedState, fetchByState, user?.default_assembly_constituency]);

    // Default: pick first year once years are loaded 
    useEffect(() => {
        if (electionYearOptions.length && !selectedYear) {
            setSelectedYear(electionYearOptions[0]);
        }
    }, [electionYearOptions]);

    useEffect(() => {
        if (selectedConstituencyId && selectedYear && !hasFetchedDefault.current) {
            hasFetchedDefault.current = true;
            fetchDetail({
                variables: {
                    constituencyId: selectedConstituencyId,
                    electionYear: Number(selectedYear),
                },
            });
        }
    }, [selectedConstituencyId, selectedYear, fetchDetail]);

    // Handlers 
    const onStateChange = useCallback(
        (state: string) => {
            setSelectedState(state);
            setConstituencySearch("");
            setSelectedConstituencyId(null);
            fetchByState({ variables: { state } });
        },
        [fetchByState]
    );

    const onElectionYearChange = useCallback((year: string) => {
        setSelectedYear(year);
    }, []);

    const onConstituencyChange = useCallback((value: string) => {
        setConstituencySearch(value);
        // If exact match found, store its ID
        const match = (stateConstituencies?.constituenciesByState ?? []).find(
            (c) => c.name.toLowerCase() === value.toLowerCase()
        );
        setSelectedConstituencyId(match?.id ?? null);
    }, [stateConstituencies]);

    const onConstituencySelect = useCallback((constituency: { id: number; name: string }) => {
        setSelectedConstituencyId(constituency.id);
        setConstituencySearch(constituency.name);
    }, []);

    const onUpdateView = useCallback(() => {
        if (!selectedConstituencyId || !selectedYear) return;
        fetchDetail({
            variables: {
                constituencyId: selectedConstituencyId,
                electionYear: Number(selectedYear),
            },
        });
    }, [selectedConstituencyId, selectedYear, fetchDetail]);

    // Return shape matches what ConstituencyFilterBar expects 
    return {
        // filter bar props
        stateOptions,
        selectedState,
        onStateChange,
        electionYear: selectedYear,
        onElectionYearChange,
        electionYearOptions,
        constituency: constituencySearch,
        onConstituencyChange,
        onUpdateView,

        // constituency autocomplete
        constituencyOptions,    // filtered list for dropdown
        onConstituencySelect,   // when user clicks a suggestion
        selectedConstituencyId,

        // detail data (fetched only on Update View)
        detailData,
        detailLoading,
    };
}