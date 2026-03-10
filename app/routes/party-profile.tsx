import { useState } from "react";
import { Users, Trophy, BarChart3, Percent } from "lucide-react";
import { Sidebar } from "~/components/molecules/sidebar";
import { DonutPieChart } from "~/components/molecules/ratio-pie-chart";
import { TrendAreaChart } from "~/components/molecules/trend-area-chart";
import { AssetBarChart } from "~/components/molecules/party/asset-bar-chart";
import { BarChartBar } from "~/components/ui/bar-chart-bar";
import { Indicator } from "~/components/ui/indicator";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table";
import { PartyRosterRow } from "~/components/molecules/party/party-roster-row";
import { useNavigation } from "~/hooks/useNavigation";
import { cn } from "~/lib/utils";
import { useParams, useNavigate } from "react-router";
import { usePartyProfile } from "~/features/party/hooks/usePartyProfile";
import { usePartyYearFilter } from "~/features/party/hooks/usePartyYearFilter";
import { usePartyKpiStats } from "~/features/party/hooks/usePartyKpiStats";
import { usePartyCandidateRoster } from "~/features/party/hooks/usePartyCandidateRoster";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";

// Static data

const KPI_CARD_META = [
    {
        label: "Total Candidates",
        icon: <Users size={15} />,
    },
    {
        label: "Seats Won",
        icon: <Trophy size={15} />,
    },
    {
        label: "Total Votes",
        icon: <BarChart3 size={15} />,
    },
    {
        label: "Win Rate %",
        icon: <Percent size={15} />,
    },
];

const SEATS_DATA = [
    { value: 145, label: "'04" },
    { value: 206, label: "'09" },
    { value: 44, label: "'14" },
    { value: 52, label: "'19" },
];
const SEATS_MAX = 206;

const VOTE_SHARE_DATA = [
    { year: "'04", voteShare: 26.5 },
    { year: "'09", voteShare: 28.6 },
    { year: "'14", voteShare: 19.3 },
    { year: "'19", voteShare: 19.5 },
];

// Page 

export default function PartyProfilePage() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { navItems, onNavChange } = useNavigation();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const partyId = Number(id);
    const { partyVM, loading: partyLoading } = usePartyProfile(partyId);
    const {
        yearOptions,
        selectedYear,
        onYearChange,
        loading: yearsLoading,
    } = usePartyYearFilter(partyId);
    const {
        kpiStats,
        loading: kpiLoading,
        electionCandidateIds,
    } = usePartyKpiStats(partyId, Number(selectedYear));
    const {
        rosterRows,
        criminalData,
        educationData,
        assetData,
        loading: rosterLoading,
    } = usePartyCandidateRoster(electionCandidateIds);

    const loadingHeader = partyLoading || yearsLoading || kpiLoading;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100">
            <Sidebar
                navItems={navItems}
                activeNavId="parties"
                open={sidebarOpen}
                onOpenChange={setSidebarOpen}
                onNavChange={onNavChange}
            />

            <main
                className={cn(
                    "min-h-screen transition-[padding-left] duration-200",
                    sidebarOpen ? "pl-56" : "pl-14"
                )}
            >
                <div className="max-w-[1400px] mx-auto p-6 space-y-8">

                    {/* ── Party Header ── */}
                    <Card className="border-none shadow-sm overflow-hidden gap-0 py-0">
                        {/* Identity row */}
                        <div className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="size-24 shrink-0 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center p-2">
                                {partyVM.imageUrl ? (
                                    <img
                                        src={partyVM.imageUrl}
                                        alt={partyVM.name}
                                        className="size-full object-contain"
                                    />
                                ) : (
                                    <div className="size-full rounded-md bg-slate-200" />
                                )}
                            </div>
                            <div className="flex-1">
                                <h1 className="text-2xl font-black text-slate-900 mb-3">
                                    {partyLoading ? "Loading..." : `${partyVM.name} (${partyVM.shortName})`}
                                </h1>
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge variant="outline" className="text-xs font-medium text-slate-600">
                                        {partyLoading ? "Loading..." : partyVM.type}
                                    </Badge>
                                </div>
                            </div>

                            {/* Year Filter (header) */}
                            <div className="w-full md:w-auto">
                                <div className="space-y-1.5 w-40">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                                        Election Year
                                    </label>
                                    <Select
                                        value={selectedYear}
                                        onValueChange={onYearChange}
                                        disabled={!yearOptions.length}
                                    >
                                        <SelectTrigger className="bg-white border-slate-200 text-slate-600 text-sm focus:ring-blue-600 focus:border-blue-600">
                                            <SelectValue
                                                placeholder={yearsLoading ? "Loading..." : "Select Year"}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {yearOptions.map((y) => (
                                                <SelectItem key={y} value={y}>
                                                    {y}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* KPI row */}
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100 border-t border-slate-100 bg-slate-50/50">
                            {KPI_CARD_META.map((stat) => (
                                <div key={stat.label} className="p-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                                            {stat.icon}
                                        </span>
                                    </div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                                        {stat.label}
                                    </p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-black">
                                            {loadingHeader || !kpiStats
                                                ? "—"
                                                : stat.label === "Total Candidates"
                                                    ? kpiStats.totalCandidates.toLocaleString("en-IN")
                                                    : stat.label === "Seats Won"
                                                        ? kpiStats.seatsWon.toLocaleString("en-IN")
                                                        : stat.label === "Total Votes"
                                                            ? kpiStats.totalVotes.toLocaleString("en-IN")
                                                            : kpiStats.winRate}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* ── Election Performance ── */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold">Election Performance (Lok Sabha)</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Seats Won */}
                            <Card className="border-none shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-sm font-medium text-gray-500">
                                        Seats Won per Election
                                    </CardTitle>
                                    <p className="text-2xl font-black text-slate-900">
                                        52{" "}
                                        <span className="text-sm font-normal text-slate-500">
                                            Seats (2019)
                                        </span>
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-end justify-around gap-2 pt-4">
                                        {SEATS_DATA.map((d) => (
                                            <BarChartBar
                                                key={d.label}
                                                value={d.value}
                                                label={d.label}
                                                maxValue={SEATS_MAX}
                                                height={120}
                                                barColor="bg-blue-500"
                                            />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Vote Share */}
                            <TrendAreaChart
                                title="Vote Share Trend"
                                subtitle="Lok Sabha elections"
                                headlineValue="19.46%"
                                headlineDelta="(2019)"
                                data={VOTE_SHARE_DATA}
                                xKey="year"
                                yKey="voteShare"
                                valueSuffix="%"
                            />
                        </div>
                    </section>

                    {/* ── Candidate Intelligence + Financial Risk ── */}
                    <div className="grid lg:grid-cols-3 gap-6">

                        {/* Candidate Intelligence */}
                        <section className="lg:col-span-3 space-y-4">
                            <h2 className="text-lg font-bold">
                                Candidate Intelligence{" "}
                                {selectedYear ? `(${selectedYear})` : ""}
                            </h2>
                            <div className="grid sm:grid-cols-3 gap-4">
                                <DonutPieChart
                                    title="Criminal Case Distribution"
                                    centerValue={
                                        rosterLoading
                                            ? ""
                                            : String(rosterRows.length || 0)
                                    }
                                    centerLabel="CANDIDATES"
                                    data={criminalData}
                                    valueSuffix=" candidates"
                                />

                                <Card className="border-none shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="text-base font-bold">
                                            Education Profile
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {educationData.map((ed) => (
                                            <Indicator
                                                key={ed.label}
                                                label={ed.label}
                                                value={ed.value}
                                                percent={ed.percent}
                                                color={ed.color}
                                                valueColorClassName="text-blue-600"
                                            />
                                        ))}
                                    </CardContent>
                                </Card>
                                <AssetBarChart
                                    title="Asset Distribution"
                                    data={assetData}
                                    className="border-none shadow-sm"
                                    unitLabel="candidates"
                                />
                            </div>
                        </section>
                    </div>

                    {/* ── Candidate Roster ── */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-bold">
                            Full Candidate Roster{" "}
                            {selectedYear ? `(${selectedYear})` : ""}
                        </h2>
                        <Card className="border-none shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h3 className="font-bold text-base">
                                    {partyLoading ? "Candidates" : `${partyVM.shortName} Candidates`}
                                </h3>
                                <p className="text-xs text-gray-400 font-medium mt-0.5">
                                    {loadingHeader || !kpiStats
                                        ? "— candidates fielded"
                                        : `${kpiStats.totalCandidates.toLocaleString(
                                            "en-IN"
                                        )} candidates fielded`}
                                </p>
                            </div>
                            <Table>
                                <TableHeader className="bg-gray-50/50">
                                    <TableRow>
                                        <TableHead className="text-sm">Candidate Name</TableHead>
                                        <TableHead className="text-sm">Caste</TableHead>
                                        <TableHead className="text-sm">Education</TableHead>
                                        <TableHead className="text-sm">Share</TableHead>
                                        <TableHead className="text-sm">Votes Polled</TableHead>
                                        <TableHead className="text-right py-4" />
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rosterRows.map((row) => (
                                        <PartyRosterRow
                                            key={row.ecId}
                                            name={row.name}
                                            caste={row.caste}
                                            education={row.education}
                                            voteShare={row.voteShare}
                                            votesPolled={row.votesPolled}
                                            imageUrl={row.imageUrl}
                                            onViewProfile={() => navigate(`/candidates/${row.candidateId}`)}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </section>

                </div>
            </main>
        </div>
    );
}
