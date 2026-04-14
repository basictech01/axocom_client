import { useState } from "react";
import { Sidebar } from "~/components/molecules/sidebar";
import { VoterDataTable } from "~/components/molecules/voters/voter-data-table";
import { VoterFilterBar } from "~/components/molecules/voters/voter-filter";
import { useVoterList } from "~/features/voters/hooks/useVoterList";
import { useVoterExport } from "~/features/voters/hooks/useVoterExport";
import { useNavigation } from "~/hooks/useNavigation";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useAuth } from "~/contexts/auth-context";

export default function VoterExplorer() {
    const { navItems, onNavChange } = useNavigation();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { user } = useAuth();
    const defaultConstituency = user?.default_assembly_constituency ?? "";
    const {
        voters,
        loading,
        search,
        setSearch,
        constituency,
        setConstituency,
        isConstituencyLocked,
        parliamentaryConstituency,
        setParliamentaryConstituency,
        partNumberName,
        setPartNumberName,
        onApply,
        onReset,
        options,
        currentPage,
        setCurrentPage,
        totalRows,
        totalPages,
        rowsPerPage,
        appliedConstituency,
        appliedParliamentary,
        appliedPartName,
    } = useVoterList(defaultConstituency);

    const { handleExport, exporting } = useVoterExport();

    return (
        <div className="min-h-screen bg-[#F7F9FC] text-slate-900 font-sans selection:bg-blue-100">
            <Sidebar
                navItems={navItems}
                activeNavId="voters"
                onNavChange={onNavChange}
                open={sidebarOpen}
                onOpenChange={setSidebarOpen}
            />

            <main
                className={cn(
                    "min-h-screen p-8 transition-[padding-left] duration-200",
                    sidebarOpen ? "pl-60" : "pl-20"
                )}
            >
                <div className="mx-auto max-w-[1400px] space-y-6">
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                                Voter Intelligence for {user?.default_assembly_constituency}
                            </h2>
                            <p className="text-sm text-slate-500 font-medium">
                                Search and analyze voter rolls by constituency and polling
                                station.
                            </p>
                        </div>

                        <Button
                            className="bg-blue-600 hover:bg-blue-700 px-5 gap-2 disabled:opacity-60"
                            type="button"
                            disabled={!appliedConstituency || exporting}
                            onClick={() =>
                                handleExport(
                                    appliedConstituency,
                                    appliedParliamentary || undefined,
                                    appliedPartName || undefined
                                )
                            }
                        >
                            {exporting ? (
                                <Loader2 size={14} className="animate-spin" />
                            ) : (
                                <Download size={14} />
                            )}
                            {exporting ? "Exporting..." : "Export"}
                        </Button>
                    </div>

                    <VoterFilterBar
                        search={search}
                        onSearchChange={setSearch}
                        constituency={constituency}
                        onConstituencyChange={setConstituency}
                        isConstituencyLocked={isConstituencyLocked}
                        assemblyConstituencyOptions={options.constituencies}
                        parliamentaryConstituency={parliamentaryConstituency}
                        onParliamentaryConstituencyChange={setParliamentaryConstituency}
                        parliamentaryConstituencyOptions={options.parliamentaryConstituencies}
                        partNumberName={partNumberName}
                        onPartNumberNameChange={setPartNumberName}
                        partNumberNameOptions={options.partNumberNames}
                        onApply={onApply}
                        onReset={onReset}
                    />

                    <VoterDataTable
                        voters={voters}
                        loading={loading}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalRows={totalRows}
                        rowsPerPage={rowsPerPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </main>
        </div>
    );
}
