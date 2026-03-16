import { useState } from "react";
import { Sidebar } from "~/components/molecules/sidebar";
import { useNavigation } from "~/hooks/useNavigation";
import { cn } from "~/lib/utils";
import { usePartyList } from "~/features/party/hooks/usePartyList";
import { PartyFilterBar } from "~/components/molecules/party/party-filter-bar";
import { PartyDataTable } from "~/components/molecules/party/party-data-table";

export default function PartyExplorer() {
    const { navItems, onNavChange } = useNavigation();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const {
        parties,
        loading,
        searchName,
        setSearchName,
        partyType,
        setPartyType,
        typeOptions,
    } = usePartyList();

    return (
        <div className="min-h-screen bg-[#F7F9FC] text-slate-900 font-sans selection:bg-blue-100">
            <Sidebar
                navItems={navItems}
                activeNavId="parties"
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
                    {/* Header */}
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                                Find Parties
                            </h2>
                            <p className="text-sm text-slate-500 font-medium">
                                Browse and filter political parties by name and type.
                            </p>
                        </div>

                        {/* Filter Bar */}
                        <PartyFilterBar
                            searchName={searchName}
                            onSearchNameChange={setSearchName}
                            partyType={partyType}
                            onPartyTypeChange={setPartyType}
                            typeOptions={typeOptions}
                        />
                    </div>

                    {/* Data Table Container */}
                    <PartyDataTable parties={parties} loading={loading} />
                </div>
            </main>
        </div>
    );
}
