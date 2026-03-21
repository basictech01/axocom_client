import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DataTableCard, type ColumnDef } from "~/components/molecules/data-table-card";
import { Button } from "~/components/ui/button";
import type { VoterListVM } from "~/features/voters/types";

interface VoterDataTableProps {
    voters: VoterListVM[];
    loading?: boolean;
    currentPage: number;
    totalPages: number;
    totalRows: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
}

export const VoterDataTable: React.FC<VoterDataTableProps> = ({
    voters,
    loading = false,
    currentPage,
    totalPages,
    totalRows,
    rowsPerPage,
    onPageChange,
}) => {
    const columns: ColumnDef<VoterListVM>[] = [
        {
            key: "epic_number",
            header: "EPIC Number",
            variant: "bold",
            render: (voter) => <span className="font-mono text-blue-700">{voter.epicNumber}</span>,
        },
        {
            key: "name",
            header: "Name",
            render: (voter) => (
                <span className="text-sm font-semibold text-slate-900">{voter.fullNameEnglish}</span>
            ),
        },
        {
            key: "gender_age",
            header: "G / Age",
            render: (voter) => (
                <span className="inline-flex rounded px-2 py-0.5 text-xs font-semibold bg-slate-100 text-slate-700">
                    {voter.genderAge}
                </span>
            ),
        },
        {
            key: "state",
            header: "State",
            variant: "bold",
            render: (voter) => voter.state,
        },
        {
            key: "assembly",
            header: "Assembly (AC)",
            render: (voter) => voter.assemblyConstituency,
        },
        {
            key: "parliamentary",
            header: "Parliamentary (PC)",
            render: (voter) => voter.parliamentaryConstituency,
        },
        {
            key: "part_name",
            header: "Part Name",
            render: (voter) => voter.partNumberName,
        },
        {
            key: "part_serial",
            header: "Part Serial",
            render: (voter) => voter.partSerialNumber,
        },
        {
            key: "action",
            header: "Action",
            headerAlign: "right",
            variant: "right",
            render: () => (
                <Button variant="outline" size="sm" className="font-semibold">
                    View Voter
                </Button>
            ),
        },
    ];

    if (loading) {
        return (
            <div className="p-8 text-center text-sm text-slate-500 bg-white rounded-xl border border-slate-200 shadow-sm">
                Loading voters...
            </div>
        );
    }

    if (!loading && voters.length === 0) {
        return (
            <div className="p-8 text-center text-sm text-slate-500 bg-white rounded-xl border border-slate-200 shadow-sm">
                No voters found.
            </div>
        );
    }

    const firstRow = (currentPage - 1) * rowsPerPage + 1;
    const lastRow = Math.min(currentPage * rowsPerPage, totalRows);

    return (
        <div className="space-y-4">
            <DataTableCard
                title="Voter Explorer"
                subtitle={`${totalRows.toLocaleString()} total`}
                columns={columns}
                rows={voters}
            />
            {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <span className="text-xs font-medium text-slate-500">
                        Showing {firstRow}–{lastRow} of {totalRows.toLocaleString()} voters
                    </span>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="h-8 w-8 text-slate-400 hover:text-slate-600"
                        >
                            <ChevronLeft size={16} />
                        </Button>
                        <span className="text-sm font-bold text-slate-700 px-2">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="h-8 w-8 text-slate-400 hover:text-slate-600"
                        >
                            <ChevronRight size={16} />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
