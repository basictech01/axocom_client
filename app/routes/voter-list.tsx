import { useState } from "react";
import { Sidebar } from "~/components/molecules/sidebar";
import { VoterDataTable } from "~/components/molecules/voters/voter-data-table";
import { VoterFilterBar } from "~/components/molecules/voters/voter-filter";
import { useVoterList } from "~/features/voters/hooks/useVoterList";
import { useNavigation } from "~/hooks/useNavigation";
import { cn } from "~/lib/utils";

export default function VoterExplorer() {
    const { navItems, onNavChange } = useNavigation();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const {
        voters,
        loading,
        search,
        setSearch,
        constituency,
        setConstituency,
        parliamentaryConstituency,
        setParliamentaryConstituency,
        onApply,
        onReset,
        options,
        currentPage,
        setCurrentPage,
        totalRows,
        totalPages,
        rowsPerPage,
    } = useVoterList();

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
                    <div className="space-y-2">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                            Voter Intelligence Explorer
                        </h2>
                        <p className="text-sm text-slate-500 font-medium">
                            Search and analyze voter rolls by constituency and polling station.
                        </p>
                    </div>

                    <VoterFilterBar
                        search={search}
                        onSearchChange={setSearch}
                        constituency={constituency}
                        onConstituencyChange={setConstituency}
                        assemblyConstituencyOptions={options.constituencies}
                        parliamentaryConstituency={parliamentaryConstituency}
                        onParliamentaryConstituencyChange={setParliamentaryConstituency}
                        parliamentaryConstituencyOptions={options.parliamentaryConstituencies}
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
