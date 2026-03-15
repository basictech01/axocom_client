import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Sidebar } from "~/components/molecules/sidebar";
import { StatCard } from "~/components/molecules/stat-card";
import { DonutPieChart } from "~/components/molecules/ratio-pie-chart";
import { VotesBarList } from "~/components/molecules/elections/votes-bar-list";
import { AgeBarChart } from "~/components/molecules/elections/age-bar-chart";
import { ElectionFilterBar } from "~/components/molecules/elections/election-filter";
import { TurnoutList } from "~/components/molecules/elections/turnout-list";
import { ElectionTable } from "~/components/molecules/elections/election-table";
import { Badge } from "~/components/ui/badge";
import { useNavigation } from "~/hooks/useNavigation";
import { cn } from "~/lib/utils";
import { useElectionStats } from "~/features/elections/hooks/useElectionStats";
import { useElectionFilter } from "~/features/elections/hooks/useElectionFilter";
import { useGenderSplitFromElections } from "~/features/elections/hooks/useGenderSplit";
import { useVotesPerConstituency } from "~/features/elections/hooks/useVotesPerConstituency";
import { useVoterAgeDemographic } from "~/features/elections/hooks/useVoterAgeDemographics";
import { usePartyDominance } from "~/features/elections/hooks/usePartyDominance";
import { useDetailedCandidateResults } from "~/features/elections/hooks/useDetailedCandidateResults";
import type { CandidateRow } from "~/features/elections/hooks/useDetailedCandidateResults";
import { STATUS_STYLE } from "~/features/elections/hooks/useDetailedCandidateResults";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { usePartyPerformance } from "~/features/elections/hooks/usePartyPerformance";
import type { PartyPerformanceRow } from "~/features/elections/types";
import { useConstituencyTurnout } from "~/features/elections/hooks/useConstituencyTurnout";

export default function ElectionPage() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { navItems, onNavChange } = useNavigation();
    const {
        selectedState, onStateChange, stateOptions,
        selectedYear, onYearChange, yearOptions,
    } = useElectionFilter();
    const { statCards, electionsData, constituenciesData, candidatesData } = useElectionStats(selectedState, selectedYear);
    const { data: genderData, centerValue: genderTotal, centerLabel } = useGenderSplitFromElections(electionsData);
    const { data: votesPerConstituency } = useVotesPerConstituency(candidatesData, constituenciesData, 10);
    const { ageData } = useVoterAgeDemographic(selectedState);
    const {
        data: partyDominanceData,
        centerValue: partyCenterValue,
        centerLabel: partyCenterLabel,
    } = usePartyDominance(candidatesData);
    const { rows: detailedCandidateRows, partiesData, resultsData } =
        useDetailedCandidateResults(candidatesData, constituenciesData);

    const { rows: partyPerformanceRows } = usePartyPerformance(
        candidatesData,
        partiesData,
        resultsData
    );

    const { highest: highestTurnout, lowest: lowestTurnout } = useConstituencyTurnout(
        electionsData,
        candidatesData,
        constituenciesData,
        5
    );

    const navigate = useNavigate();
    const [showAllCandidates, setShowAllCandidates] = useState(false);

    const visibleCandidateRows = showAllCandidates
        ? detailedCandidateRows
        : detailedCandidateRows.slice(0, 5);


    return (
        <div className="min-h-screen bg-slate-100 text-slate-900 font-sans selection:bg-blue-100">
            <Sidebar
                navItems={navItems}
                activeNavId="elections"
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

                    {/* ── Header ── */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-black tracking-tight">
                                Election Performance Dashboard
                            </h2>
                            <p className="text-sm text-gray-400 font-medium mt-1">
                                Real-time enterprise analytics for the General Elections
                            </p>
                        </div>

                        <ElectionFilterBar
                            state={selectedState}
                            onStateChange={onStateChange}
                            stateOptions={stateOptions}
                            year={selectedYear}
                            onYearChange={onYearChange}
                            yearOptions={yearOptions}
                        />
                    </div>

                    {/* ── Stat Cards ── */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                        {statCards.map((s) => (
                            <StatCard
                                key={s.label}
                                icon={s.icon}
                                label={s.label}
                                value={s.value}
                                sub={s.sub}
                                color={s.color}
                                active={s.active}
                            />
                        ))}
                    </div>

                    {/* ── Row 1: Gender / Age / Party Dominance ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <DonutPieChart
                            title="Gender Split"
                            subtitle="Voter registration breakdown by gender"
                            centerValue={genderTotal}
                            centerLabel={centerLabel}
                            data={genderData}
                            valueSuffix="%"
                        />

                        <AgeBarChart
                            title="Age Demographics"
                            subtitle="Voter distribution by age group (Cr)"
                            data={ageData}
                        />

                        <DonutPieChart
                            title="Party Dominance"
                            subtitle="State vote share by major parties"
                            centerValue={partyCenterValue}
                            centerLabel={partyCenterLabel}
                            data={partyDominanceData}
                            valueSuffix="%"
                        />
                    </div>

                    {/* ── Row 2: Votes per Constituency ── */}
                    <VotesBarList
                        title="Votes per Constituency (Top 10)"
                        subtitle="Highest vote counts in lakh"
                        data={votesPerConstituency}
                    />

                    {/* ── Party Performance Table ── */}
                    <ElectionTable<PartyPerformanceRow>
                        title="Party Performance Breakdown"
                        subtitle="General Election — seat counts and vote shares"
                        columns={[
                            {
                                key: "party",
                                label: "Party",
                                render: (row) => (
                                    <span className="flex items-center gap-2 font-bold">
                                        <span
                                            className="size-2.5 rounded-full shrink-0"
                                            style={{ background: row.color }}
                                        />
                                        {row.party}
                                    </span>
                                ),
                            },
                            { key: "seats", label: "Seats Won", align: "right" },
                            { key: "voteShare", label: "Vote Share", align: "right" },
                            {
                                key: "action",
                                label: "Action",
                                align: "center",
                                render: (row) => (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => navigate(`/parties/${row.partyId}`)}
                                    >
                                        View Party
                                    </Button>
                                ),
                            },
                        ]}
                        rows={partyPerformanceRows}
                    />

                    {/* ── Highest / Lowest Turnout ── */}
                    <TurnoutList
                        title="Highest Turnout Constituencies"
                        subtitle="Top 5 by voter participation"
                        items={highestTurnout}
                        variant="high"
                    />
                    <TurnoutList
                        title="Lowest Turnout Constituencies"
                        subtitle="Bottom 5 by voter participation"
                        items={lowestTurnout}
                        variant="low"
                    />

                    {/* ── Candidate Outcomes Table ── */}
                    <ElectionTable<CandidateRow>
                        title="Detailed Candidate Outcomes"
                        subtitle="Key candidate results from the General Election"
                        columns={[
                            { key: "name", label: "Candidate" },
                            { key: "constituency", label: "Constituency" },
                            {
                                key: "party",
                                label: "Party",
                                render: (row) => (
                                    <span className="flex items-center gap-2">
                                        <span
                                            className="size-2 rounded-full shrink-0"
                                            style={{ background: row.partyColor }}
                                        />
                                        <span className="font-medium">{row.party}</span>
                                    </span>
                                ),
                            },
                            { key: "votes", label: "Votes", align: "right" },
                            {
                                key: "status",
                                label: "Status",
                                align: "center",
                                render: (row) => (
                                    <Badge
                                        className={cn(
                                            "text-xs font-black border-none px-2",
                                            STATUS_STYLE[row.status]
                                        )}
                                    >
                                        {row.status}
                                    </Badge>
                                ),
                            },
                            {
                                key: "action",
                                label: "Action",
                                align: "center",
                                render: (row) => (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => navigate(`/candidates/${row.candidateId}`)}
                                    >
                                        View Profile
                                    </Button>
                                ),
                            },
                        ]}
                        rows={visibleCandidateRows}
                    />

                    {!showAllCandidates && detailedCandidateRows.length > 5 && (
                        <div className="flex justify-center mt-4">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowAllCandidates(true)}
                            >
                                Show all {detailedCandidateRows.length} candidates
                                <ArrowRight size={14} />
                            </Button>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}
