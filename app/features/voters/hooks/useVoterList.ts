import { useQuery } from "@apollo/client/react";
import { useEffect, useMemo, useState } from "react";
import {
    GET_VOTER_FILTER_OPTIONS_BY_ASSEMBLY,
    GET_VOTERS_LIST,
} from "../services";
import { toVoterListVM, type VoterListVM } from "../types";
const ROWS_PER_PAGE = 10;

const toNullableFilter = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed || trimmed === "ALL") return null;
    return trimmed;
};

export function useVoterList(default_assembly_constituency: string) {

    const lockedConstituency = default_assembly_constituency?.trim() ?? "";
    const isConstituencyLocked = Boolean(lockedConstituency);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchInput, setSearchInput] = useState("");
    const [constituencyInput, setConstituencyInput] = useState(
        lockedConstituency || "ALL"
    );
    const [parliamentaryInput, setParliamentaryInput] = useState("ALL");
    const [partNameInput, setPartNameInput] = useState("ALL");

    const [appliedSearch, setAppliedSearch] = useState("");
    const [appliedParliamentary, setAppliedParliamentary] = useState("");
    const [appliedPartName, setAppliedPartName] = useState("");
    const selectedConstituency = lockedConstituency || constituencyInput;
    const selectedConstituencyFilter = toNullableFilter(selectedConstituency);
    const appliedConstituency = selectedConstituencyFilter ?? "";

    const { data, loading, error } = useQuery(GET_VOTERS_LIST, {
        variables: {
            page: currentPage,
            limit: ROWS_PER_PAGE,
            search: toNullableFilter(appliedSearch) ?? undefined,
            assembly_constituency: selectedConstituencyFilter ?? undefined,
            parliamentary_constituency:
                toNullableFilter(appliedParliamentary) ?? undefined,
            part_number_name: toNullableFilter(appliedPartName) ?? undefined,
        },
    });

    const { data: assemblyScopedOptionsData } = useQuery(
        GET_VOTER_FILTER_OPTIONS_BY_ASSEMBLY,
        {
            variables: {
                assembly_constituency: selectedConstituencyFilter ?? "",
            },
            skip: !selectedConstituencyFilter,
        }
    );

    const voters: VoterListVM[] = useMemo(() => {
        if (!data?.votersPaginated?.rows) return [];
        return data.votersPaginated.rows.map(toVoterListVM);
    }, [data]);

    const totalRows = data?.votersPaginated?.total ?? 0;
    const totalPages = Math.max(1, Math.ceil(totalRows / ROWS_PER_PAGE));

    const options = useMemo(() => {
        const constituencies = lockedConstituency
            ? [lockedConstituency]
            : [];

        return {
            constituencies,
            parliamentaryConstituencies:
                selectedConstituencyFilter
                    ? assemblyScopedOptionsData?.voterFilterOptionsByAssembly
                        ?.parliamentary_constituencies ?? []
                    : [],
            partNumberNames:
                assemblyScopedOptionsData?.voterFilterOptionsByAssembly
                    ?.part_number_names ?? [],
        };
    }, [
        assemblyScopedOptionsData,
        selectedConstituencyFilter,
        lockedConstituency,
    ]);

    useEffect(() => {
        if (!lockedConstituency) return;
        if (constituencyInput !== lockedConstituency) {
            setConstituencyInput(lockedConstituency);
        }
    }, [lockedConstituency, constituencyInput]);

    useEffect(() => {
        setParliamentaryInput("ALL");
        setPartNameInput("ALL");
    }, [constituencyInput]);

    const onApply = () => {
        setAppliedSearch(searchInput.trim());
        setAppliedParliamentary(toNullableFilter(parliamentaryInput) ?? "");
        setAppliedPartName(toNullableFilter(partNameInput) ?? "");
        setCurrentPage(1);
    };

    const onReset = () => {
        setSearchInput("");
        setConstituencyInput(lockedConstituency || "ALL");
        setParliamentaryInput("ALL");
        setPartNameInput("ALL");
        setAppliedSearch("");
        setAppliedParliamentary("");
        setAppliedPartName("");
        setCurrentPage(1);
    };

    return {
        voters,
        loading,
        error,
        search: searchInput,
        setSearch: setSearchInput,
        constituency: constituencyInput,
        setConstituency: (value: string) => {
            if (!isConstituencyLocked) {
                setConstituencyInput(value);
            }
        },
        isConstituencyLocked,
        parliamentaryConstituency: parliamentaryInput,
        setParliamentaryConstituency: setParliamentaryInput,
        partNumberName: partNameInput,
        setPartNumberName: setPartNameInput,
        onApply,
        onReset,
        options,
        // Export requires "applied" filters (after user clicks Apply in the filter bar)
        appliedConstituency,
        appliedParliamentary,
        appliedPartName,
        currentPage,
        setCurrentPage,
        totalRows,
        totalPages,
        rowsPerPage: ROWS_PER_PAGE,
    };
}
