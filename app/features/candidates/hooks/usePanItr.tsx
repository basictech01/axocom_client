import { useMemo } from "react";
import { CheckCircle2, Info } from "lucide-react";
import type { RawCandidate } from "../types";
import type { ColumnDef } from "~/components/molecules/data-table-card";

export type PanItrRow = {
  relationLabel: string;
  panStatus: string;
  panProvided: boolean;
  financialYear: string;
  totalIncome: string;
};

const RELATION_LABELS: Record<string, string> = {
  self: "Self",
  spouse: "Spouse",
  huf: "HUF",
  dependent1: "Dependent 1",
  dependent2: "Dependent 2",
  dependent3: "Dependent 3",
};

function parseLatestIncome(raw: string): string {
  const match = raw.match(/Rs\s+([\d,]+)/);
  return match ? `₹${match[1]}` : "₹0";
}

const PAN_ITR_COLUMNS: ColumnDef<PanItrRow>[] = [
  {
    key: "member",
    header: "Family Member",
    variant: "bold",
    render: (row) => row.relationLabel,
  },
  {
    key: "pan",
    header: "PAN Status",
    render: (row) => (
      <div className={`flex items-center gap-1.5 ${row.panProvided ? "text-green-600" : "text-slate-400"}`}>
        {row.panProvided ? <CheckCircle2 size={14} /> : <Info size={14} />}
        <span className="text-xs font-bold uppercase">{row.panStatus}</span>
      </div>
    ),
  },
  {
    key: "year",
    header: "Year of Last ITR Filed",
    render: (row) => (
      <span className={row.panProvided ? "text-slate-700" : "text-slate-400 italic"}>
        {row.financialYear}
      </span>
    ),
  },
  {
    key: "income",
    header: "Total Income Shown in ITR",
    headerAlign: "right",
    variant: "right-bold",
    render: (row) => row.totalIncome,
  },
];

export function usePanItrTable(candidate: RawCandidate | null) {
  const rows = useMemo(() => {
    if (!candidate?.pan_itr) return [];

    const entries = candidate.pan_itr as unknown as Array<{
      pan_given: string;
      relation_type: string;
      financial_year: string;
      total_income_shown_in_itr: string;
    }>;

    return entries.map((entry) => ({
      relationLabel: RELATION_LABELS[entry.relation_type] ?? entry.relation_type,
      panStatus: entry.pan_given === "Y" ? "Provided" : "Not Provided",
      panProvided: entry.pan_given === "Y",
      financialYear: entry.financial_year === "None" ? "N/A" : entry.financial_year,
      totalIncome: parseLatestIncome(entry.total_income_shown_in_itr),
    }));
  }, [candidate]);

  return {
    rows,
    columns: PAN_ITR_COLUMNS,
  };
}