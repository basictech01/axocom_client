import { useCallback } from "react";
import type { ElectionDetailData, CandidateRowData } from "../types";

type TurnoutDatum = {
    year: string;
    voters: number;
};

type GenderDatum = {
    name: string;
    value: number;
};

type IndicatorDatum = {
    label: string;
    value: string;
    sub?: string;
};

type HistoricalControlDatum = {
    label: string;
    value: string;
    subtitle?: string;
};

type IncumbentDatum = {
    roleLabel: string;
    name: string;
    party: string;
    badgeText?: string;
};

type UseConstituencyExportParams = {
    detailData?: ElectionDetailData;
    electionYear: string;
    turnoutData: TurnoutDatum[];
    genderData: GenderDatum[];
    sortedCandidates: CandidateRowData[];
    indicators: IndicatorDatum[];
    historicalControl: HistoricalControlDatum[];
    incumbent: IncumbentDatum;
};

export function useConstituencyExport({
    detailData,
    electionYear,
    turnoutData,
    genderData,
    sortedCandidates,
    indicators,
    historicalControl,
    incumbent,
}: UseConstituencyExportParams) {
    const handleExport = useCallback(() => {
        if (!detailData) return;

        const csvEscape = (value: unknown) => {
            const text = value == null ? "" : String(value);
            return `"${text.replace(/"/g, '""')}"`;
        };

        const election = detailData.electionByConstituencyAndYear;
        const constituency = detailData.constituency;

        const rows: string[] = [];
        const addRow = (values: unknown[]) => {
            rows.push(values.map(csvEscape).join(","));
        };
        const addBlankRow = () => rows.push("");

        addRow(["Constituency Overview"]);
        addRow(["Field", "Value"]);
        addRow(["Name", constituency?.name ?? "—"]);
        addRow(["State", constituency?.state ?? "—"]);
        addRow(["AC Number", constituency?.ac_number ?? "—"]);
        addRow(["Election Name", election?.name ?? "—"]);
        addRow(["Election Type", election?.type ?? "—"]);
        addRow(["Election Year", electionYear]);
        addRow(["Total Voters", election?.total_voters ?? "—"]);
        addRow(["Polling Stations", election?.number_of_polling_stations ?? "—"]);
        addBlankRow();

        addRow(["Turnout Trend"]);
        addRow(["Year", "Voters"]);
        turnoutData.forEach((item) => {
            addRow([item.year, item.voters]);
        });
        addBlankRow();

        addRow(["Gender Breakdown"]);
        addRow(["Gender", "Count", "Percentage"]);
        genderData.forEach((item) => {
            addRow([item.name, item.value, `${item.value}%`]);
        });
        addBlankRow();

        addRow(["Candidates"]);
        addRow(["Candidate Name", "Party", "Education", "Votes Polled", "Vote Share"]);
        sortedCandidates.forEach((candidate) => {
            addRow([
                candidate.name,
                candidate.party,
                candidate.education,
                candidate.votes_polled ?? 0,
                `${candidate.projectedShare}%`,
            ]);
        });
        addBlankRow();

        addRow(["Political Quality Indicators"]);
        addRow(["Indicator", "Value", "Detail"]);
        indicators.forEach((indicator) => {
            addRow([indicator.label, indicator.value, indicator.sub ?? ""]);
        });
        addBlankRow();

        addRow(["Historical Control"]);
        addRow(["Role", "Party", "Votes / Margin"]);
        historicalControl.forEach((item) => {
            addRow([item.label, item.value, item.subtitle ?? ""]);
        });
        addBlankRow();

        addRow(["Incumbent"]);
        addRow(["Role", "Name", "Party", "Result"]);
        addRow([incumbent.roleLabel, incumbent.name, incumbent.party, incumbent.badgeText ?? ""]);

        const csvContent = rows.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        const constituencyName = (constituency?.name ?? "constituency")
            .toLowerCase()
            .replace(/\s+/g, "-");
        link.href = url;
        link.download = `${constituencyName}_${electionYear}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [
        detailData,
        electionYear,
        turnoutData,
        genderData,
        sortedCandidates,
        indicators,
        historicalControl,
        incumbent,
    ]);

    return { handleExport };
}
