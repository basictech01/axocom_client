import { useQuery } from "@apollo/client/react";
import { useMemo, useState } from "react";
import { GET_VOTER_FILTER_OPTIONS, GET_VOTERS_LIST } from "../services";
import { toVoterListVM, type VoterListVM } from "../types";

const ROWS_PER_PAGE = 10;

export function useVoterList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchInput, setSearchInput] = useState("");
    const [constituencyInput, setConstituencyInput] = useState("ALL");
    const [parliamentaryInput, setParliamentaryInput] = useState("ALL");

    const [appliedSearch, setAppliedSearch] = useState("");
    const [appliedConstituency, setAppliedConstituency] = useState("");
    const [appliedParliamentary, setAppliedParliamentary] = useState("");

    const { data, loading, error } = useQuery(GET_VOTERS_LIST, {
        variables: {
            page: currentPage,
            limit: ROWS_PER_PAGE,
            search: appliedSearch || undefined,
            assembly_constituency: appliedConstituency || undefined,
            parliamentary_constituency: appliedParliamentary || undefined,
        },
    });

    const { data: filterOptionsData } = useQuery(GET_VOTER_FILTER_OPTIONS);

    const voters: VoterListVM[] = useMemo(() => {
        if (!data?.votersPaginated?.rows) return [];
        return data.votersPaginated.rows.map(toVoterListVM);
    }, [data]);

    const totalRows = data?.votersPaginated?.total ?? 0;
    const totalPages = Math.max(1, Math.ceil(totalRows / ROWS_PER_PAGE));

    const options = useMemo(
        () => ({
            constituencies:
                filterOptionsData?.voterFilterOptions?.assembly_constituencies ?? [],
            parliamentaryConstituencies:
                filterOptionsData?.voterFilterOptions?.parliamentary_constituencies ?? [],
        }),
        [filterOptionsData]
    );

    const onApply = () => {
        setAppliedSearch(searchInput.trim());
        setAppliedConstituency(constituencyInput === "ALL" ? "" : constituencyInput);
        setAppliedParliamentary(parliamentaryInput === "ALL" ? "" : parliamentaryInput);
        setCurrentPage(1);
    };

    const onReset = () => {
        setSearchInput("");
        setConstituencyInput("ALL");
        setParliamentaryInput("ALL");
        setAppliedSearch("");
        setAppliedConstituency("");
        setAppliedParliamentary("");
        setCurrentPage(1);
    };

    return {
        voters,
        loading,
        error,
        search: searchInput,
        setSearch: setSearchInput,
        constituency: constituencyInput,
        setConstituency: setConstituencyInput,
        parliamentaryConstituency: parliamentaryInput,
        setParliamentaryConstituency: setParliamentaryInput,
        onApply,
        onReset,
        options,
        currentPage,
        setCurrentPage,
        totalRows,
        totalPages,
        rowsPerPage: ROWS_PER_PAGE,
    };
}
