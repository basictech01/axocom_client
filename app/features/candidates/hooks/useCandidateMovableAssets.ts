import { useMemo } from "react";
import type { RawCandidate } from "../types";
import {
    parseColTable,
    buildColTableColumns,
    type ColTableRow,
} from "../parseColTable";
import type { ColumnDef } from "~/components/molecules/data-table-card";

export function useCandidateMovableAssets(candidate: RawCandidate | null) {
    const { rows, columns } = useMemo(() => {
        const { headers, rows } = parseColTable(candidate?.details_of_movable_assets);
        const columns: ColumnDef<ColTableRow>[] = buildColTableColumns(headers);
        return { rows, columns };
    }, [candidate]);

    return { rows, columns };
}