import { useEffect, useRef } from "react";
import { useLazyQuery } from "@apollo/client/react";
import { EXPORT_VOTERS_CSV } from "../services";

function slugify(value: string) {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export function useVoterExport() {
    const downloadNameRef = useRef<string>("voters_export.csv");

    const [fetchCsv, { loading, data }] = useLazyQuery(EXPORT_VOTERS_CSV, {
        fetchPolicy: "no-cache",
    });

    useEffect(() => {
        const csv = data?.votersExportCsv;
        if (!csv) return;

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = downloadNameRef.current;
        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);
    }, [data]);

    const handleExport = (
        assemblyConstituency: string,
        parliamentaryConstituency?: string
    ) => {
        if (!assemblyConstituency || assemblyConstituency === "ALL") return;

        downloadNameRef.current = `voters_${slugify(assemblyConstituency)}.csv`;

        fetchCsv({
            variables: {
                assembly_constituency: assemblyConstituency,
                parliamentary_constituency: parliamentaryConstituency ?? null,
            },
        });
    };

    return { handleExport, exporting: loading };
}

