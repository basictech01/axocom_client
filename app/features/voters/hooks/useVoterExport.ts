import { useState } from "react";
import { getAccessToken } from "~/lib/auth-storage";
import { API_BASE_URL } from "~/types/constant";

function slugify(value: string) {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export function useVoterExport() {
    const [exporting, setExporting] = useState(false);

    const handleExport = async (
        assemblyConstituency: string,
        parliamentaryConstituency?: string,
        partNumberName?: string
    ) => {
        if (!assemblyConstituency || assemblyConstituency === "ALL") return;

        const token = getAccessToken();
        if (!token) return;

        setExporting(true);
        try {
            const query = new URLSearchParams({
                assembly_constituency: assemblyConstituency,
            });
            if (parliamentaryConstituency && parliamentaryConstituency !== "ALL") {
                query.set("parliamentary_constituency", parliamentaryConstituency);
            }
            if (partNumberName && partNumberName !== "ALL") {
                query.set("part_number_name", partNumberName);
            }

            const response = await fetch(
                `${API_BASE_URL}/voters/export?${query.toString()}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to export voters");
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const fileName = `voters_${slugify(assemblyConstituency)}.csv`;

            const link = document.createElement("a");
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
        } finally {
            setExporting(false);
        }
    };

    return { handleExport, exporting };
}

