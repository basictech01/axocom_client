import { useState } from "react";
import { useParams } from "react-router";
import { Sidebar } from "~/components/molecules/sidebar";
import { SuggestCorrection } from "~/components/molecules/suggest-correction";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
    formatVoterDateTime,
    useVoterProfile,
    voterDisplayInitials,
} from "~/features/voters/hooks/useVoterProfile";
import { useNavigation } from "~/hooks/useNavigation";
import { cn } from "~/lib/utils";
import { DetailRow } from "~/components/molecules/voters/detail-row";


export default function VoterProfilePage() {
    const { id } = useParams<{ id: string }>();
    const parsedId = Number(id);
    const { voter, loading, error } = useVoterProfile(parsedId);
    const { navItems, onNavChange } = useNavigation();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center text-lg text-slate-600">
                Loading voter…
            </div>
        );
    }

    if (!Number.isFinite(parsedId) || parsedId <= 0) {
        return (
            <div className="min-h-screen bg-[#F7F9FC] text-slate-900 font-sans">
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
                    <p className="max-w-2xl text-base leading-relaxed text-slate-600">
                        Invalid voter id. Use a positive number in the URL (e.g.{" "}
                        <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm">
                            /voters/1
                        </code>
                        ).
                    </p>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#F7F9FC] text-slate-900 font-sans">
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
                    <p className="max-w-2xl text-base leading-relaxed text-red-700">
                        Could not load this voter. They may not exist or the server
                        returned an error.
                    </p>
                    <p className="mt-2 text-sm text-slate-500">{error.message}</p>
                </main>
            </div>
        );
    }

    if (!voter) {
        return (
            <div className="min-h-screen bg-[#F7F9FC] text-slate-900 font-sans">
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
                    <p className="max-w-2xl text-base leading-relaxed text-slate-600">
                        No voter data was returned for this id.
                    </p>
                </main>
            </div>
        );
    }

    const v = voter;

    return (
        <div className="min-h-screen bg-[#F7F9FC] text-slate-900 font-sans">
            <Sidebar
                navItems={navItems}
                activeNavId="voters"
                onNavChange={onNavChange}
                open={sidebarOpen}
                onOpenChange={setSidebarOpen}
            />

            <main
                className={cn(
                    "min-h-screen p-8 pb-24 transition-[padding-left] duration-200",
                    sidebarOpen ? "pl-60" : "pl-20"
                )}
            >
                <div className="mx-auto max-w-[1400px] space-y-8">
                    {/* Hero — same card rhythm as candidate / party profile */}
                    <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                        <CardContent className="p-6 sm:p-8">
                            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                                <div
                                    className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-2xl font-black text-slate-800"
                                    aria-hidden
                                >
                                    {voterDisplayInitials(v.displayName)}
                                </div>
                                <div className="min-w-0 flex-1 space-y-3">
                                    <h1 className="text-2xl font-black tracking-tight text-slate-900">
                                        {v.displayName}
                                    </h1>
                                    <p className="text-sm text-slate-600">
                                        {v.displayNameLocal}
                                    </p>
                                    <div className="flex flex-wrap gap-3 text-sm">
                                        <span className="font-mono font-semibold text-blue-700">
                                            {v.epicNumber}
                                        </span>
                                        <span className="font-medium text-slate-500">
                                            {v.gender} · {v.age} yrs
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Personal & Legal */}
                    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">
                                Personal &amp; legal identity
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 sm:grid-cols-2">
                            <DetailRow label="First name (EN)" value={v.firstNameEnglish} />
                            <DetailRow label="Last name (EN)" value={v.lastNameEnglish} />
                            <DetailRow label="First name (local)" value={v.firstNameLocal} />
                            <DetailRow label="Last name (local)" value={v.lastNameLocal} />
                            <DetailRow label="Relative (EN)" value={v.relativeName} />
                            <DetailRow label="Relative (local)" value={v.relativeNameLocal} />
                            <DetailRow label="State" value={v.state} />
                            <DetailRow
                                label="Parliamentary constituency"
                                value={v.parliamentaryConstituency}
                            />
                            <DetailRow
                                label="Assembly constituency"
                                value={v.assemblyConstituency}
                                className="sm:col-span-2"
                            />
                        </CardContent>
                    </Card>

                    {/* Polling */}
                    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">
                                Polling assignment
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="rounded-lg border border-sky-200 bg-sky-50/80 p-4">
                                <p className="text-xs font-bold uppercase tracking-widest text-sky-700">
                                    Polling station
                                </p>
                                <p className="mt-1 text-sm font-semibold text-slate-900">
                                    {v.pollingStation}
                                </p>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <DetailRow label="Part name" value={v.partNumberName} />
                                <DetailRow
                                    label="Part serial"
                                    value={String(v.partSerialNumber)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-slate-800">
                                Record
                            </CardTitle>
                            <p className="text-sm text-slate-500">
                                When this voter record was first created in the system.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <DetailRow
                                label="Created at"
                                value={formatVoterDateTime(v.createdAt)}
                            />
                        </CardContent>
                    </Card>

                    <SuggestCorrection entityId={v.id} />
                </div>
            </main>
        </div>
    );
}

