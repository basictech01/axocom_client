import * as React from "react";
import { Link } from "react-router";
import { DataTableCard, type ColumnDef } from "~/components/molecules/data-table-card";
import { Badge } from "~/components/ui/badge";
import type { PartyListVM } from "~/features/party/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";

interface PartyDataTableProps {
    parties: PartyListVM[];
    loading: boolean;
}

export const PartyDataTable: React.FC<PartyDataTableProps> = ({
    parties,
    loading,
}) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const rowsPerPage = 10;

    React.useEffect(() => {
        setCurrentPage(1);
    }, [parties]);

    const totalPages = Math.ceil(parties.length / rowsPerPage);
    const currentParties = parties.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const columns: ColumnDef<PartyListVM>[] = [
        {
            key: "party",
            header: "Party",
            render: (p) => (
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden">
                        {p.imageUrl ? (
                            <img
                                alt={p.name}
                                src={p.imageUrl}
                                className="h-full w-full object-contain"
                            />
                        ) : (
                            <div className="h-full w-full bg-slate-200 rounded" />
                        )}
                    </div>
                    <div className="font-bold text-slate-900 text-sm">
                        {p.name}
                    </div>
                </div>
            ),
        },
        {
            key: "shortName",
            header: "Short Name",
            render: (p) => (
                <span className="text-sm text-slate-700">{p.shortName}</span>
            ),
        },
        {
            key: "type",
            header: "Type",
            render: (p) => (
                <Badge
                    variant="secondary"
                    className="bg-slate-100 text-slate-700 hover:bg-slate-100 rounded px-2 py-0.5"
                >
                    {p.type}
                </Badge>
            ),
        },
        {
            key: "action",
            header: "Action",
            headerAlign: "right",
            variant: "right",
            render: (p) => (
                <Link
                    to={`/parties/${p.id}`}
                    className="px-4 py-1.5 text-xs font-bold text-blue-600 border border-blue-600/20 rounded-lg hover:bg-blue-600 hover:text-white transition-all inline-block"
                >
                    View Party
                </Link>
            ),
        },
    ];

    if (loading) {
        return (
            <div className="p-8 text-center text-sm text-slate-500 bg-white rounded-xl border border-slate-200 shadow-sm">
                Loading parties...
            </div>
        );
    }

    if (parties.length === 0) {
        return (
            <div className="p-8 text-center text-sm text-slate-500 bg-white rounded-xl border border-slate-200 shadow-sm">
                No parties found.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <DataTableCard
                title="Party List"
                columns={columns}
                rows={currentParties}
            />

            {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <span className="text-xs font-medium text-slate-500">
                        Showing {(currentPage - 1) * rowsPerPage + 1}-
                        {Math.min(currentPage * rowsPerPage, parties.length)} of{" "}
                        {parties.length} parties
                    </span>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                setCurrentPage((p) => Math.max(1, p - 1))
                            }
                            disabled={currentPage === 1}
                            className="h-8 w-8 text-slate-400 hover:text-slate-600"
                        >
                            <ChevronLeft size={16} />
                        </Button>
                        <span className="text-sm font-bold text-slate-700 px-2 flex items-center h-8">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                setCurrentPage((p) =>
                                    Math.min(totalPages, p + 1)
                                )
                            }
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
