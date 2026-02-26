import { useState } from "react";
import { Users, MapPin, Flag, CalendarDays, Vote, Building2, TrendingUp, TrendingDown } from "lucide-react";
import { Sidebar } from "~/components/molecules/sidebar";
import { StatCard } from "~/components/molecules/stat-card";
import { DonutPieChart } from "~/components/molecules/ratio-pie-chart";
import { VotesBarList } from "~/components/molecules/elections/votes-bar-list";
import { AgeBarChart } from "~/components/molecules/elections/age-bar-chart";
import { TurnoutList } from "~/components/molecules/elections/turnout-list";
import { ElectionTable } from "~/components/molecules/elections/election-table";
import { Badge } from "~/components/ui/badge";
import { useNavigation } from "~/hooks/useNavigation";
import { cn } from "~/lib/utils";

//  Static Data

const STAT_CARDS = [
    {
        label: "Total Electorate",
        value: "94.5 Cr",
        icon: <Users size={16} />,
        color: "blue" as const,
        sub: "Registered voters nationwide",
        trend: "+2.1%",
    },
    {
        label: "Active Nominations",
        value: "8,054",
        icon: <Flag size={16} />,
        color: "purple" as const,
        sub: "Across 543 constituencies",
        active: true,
    },
    {
        label: "Parliamentary Seats",
        value: "543",
        icon: <Building2 size={16} />,
        color: "teal" as const,
        sub: "Lok Sabha constituencies",
    },
    {
        label: "Registered Parties",
        value: "673",
        icon: <MapPin size={16} />,
        color: "orange" as const,
        sub: "National + state parties",
    },
    {
        label: "Polling Cycle",
        value: "45 Days",
        icon: <CalendarDays size={16} />,
        color: "green" as const,
        sub: "7 phases of voting",
    },
    {
        label: "Votes Cast",
        value: "64.2 Cr",
        icon: <Vote size={16} />,
        color: "blue" as const,
        sub: "67.9% turnout",
        trend: "+1.4%",
    },
    {
        label: "Total Stations",
        value: "10.5 L",
        icon: <Building2 size={16} />,
        color: "purple" as const,
        sub: "Polling booths deployed",
    },
];

const GENDER_DATA = [
    { name: "Male", value: 52.3, color: "#2563eb" },
    { name: "Female", value: 47.1, color: "#ec4899" },
    { name: "Other", value: 0.6, color: "#f97316" },
];

const AGE_DATA = [
    { group: "18–25", voters: 18.2 },
    { group: "26–35", voters: 22.4 },
    { group: "36–45", voters: 19.8 },
    { group: "46–55", voters: 17.3 },
    { group: "56–65", voters: 13.6 },
    { group: "65+", voters: 8.7 },
];

const PARTY_DOMINANCE_DATA = [
    { name: "BJP", value: 43.7, color: "#f97316" },
    { name: "INC", value: 19.5, color: "#2563eb" },
    { name: "SP", value: 6.4, color: "#ef4444" },
    { name: "Others", value: 30.4, color: "#9ca3af" },
];

const VOTES_PER_CONSTITUENCY = [
    { constituency: "Malkajgiri", votes: 31.5 },
    { constituency: "Bangalore North", votes: 28.2 },
    { constituency: "Ghaziabad", votes: 26.1 },
    { constituency: "Thane", votes: 23.8 },
    { constituency: "Unnao", votes: 22.4 },
    { constituency: "Diamond Harbour", votes: 20.8 },
    { constituency: "Gurgaon", votes: 19.2 },
    { constituency: "Raipur", votes: 17.6 },
    { constituency: "Lucknow", votes: 16.4 },
    { constituency: "Pune", votes: 15.1 },
];


type PartyRow = {
    party: string;
    seats: number;
    voteShare: string;
    trend: string;
    trendDir: "up" | "down";
    color: string;
};

const PARTY_PERFORMANCE: PartyRow[] = [
    { party: "BJP", seats: 240, voteShare: "36.6%", trend: "+2.4%", trendDir: "up", color: "#f97316" },
    { party: "INC", seats: 99, voteShare: "21.2%", trend: "+3.1%", trendDir: "up", color: "#2563eb" },
    { party: "SP", seats: 37, voteShare: "6.2%", trend: "+1.8%", trendDir: "up", color: "#ef4444" },
    { party: "AITC", seats: 29, voteShare: "4.8%", trend: "-0.6%", trendDir: "down", color: "#22c55e" },
    { party: "DMK", seats: 22, voteShare: "3.7%", trend: "+0.9%", trendDir: "up", color: "#8b5cf6" },
    { party: "TDP", seats: 16, voteShare: "2.1%", trend: "-1.2%", trendDir: "down", color: "#eab308" },
    { party: "Others", seats: 100, voteShare: "25.4%", trend: "-5.4%", trendDir: "down", color: "#9ca3af" },
];

const HIGHEST_TURNOUT = [
    { rank: 1, constituency: "Nagaland East", state: "Nagaland", turnout: 89.4 },
    { rank: 2, constituency: "Tripura West", state: "Tripura", turnout: 87.1 },
    { rank: 3, constituency: "Lakshadweep", state: "Lakshadweep", turnout: 86.8 },
    { rank: 4, constituency: "Sikkim", state: "Sikkim", turnout: 85.3 },
    { rank: 5, constituency: "Mizoram", state: "Mizoram", turnout: 83.9 },
];

const LOWEST_TURNOUT = [
    { rank: 1, constituency: "Srinagar", state: "J & K", turnout: 14.4 },
    { rank: 2, constituency: "Anantnag", state: "J & K", turnout: 19.2 },
    { rank: 3, constituency: "Baramulla", state: "J & K", turnout: 24.7 },
    { rank: 4, constituency: "Inner Manipur", state: "Manipur", turnout: 31.5 },
    { rank: 5, constituency: "Outer Manipur", state: "Manipur", turnout: 38.1 },
];

type CandidateRow = {
    name: string;
    constituency: string;
    party: string;
    partyColor: string;
    votes: string;
    status: "Won" | "Lost" | "Leading" | "Trailing";
};

const CANDIDATE_OUTCOMES: CandidateRow[] = [
    { name: "Narendra Modi", constituency: "Varanasi", party: "BJP", partyColor: "#f97316", votes: "6,12,970", status: "Won" },
    { name: "Rahul Gandhi", constituency: "Raebareli", party: "INC", partyColor: "#2563eb", votes: "6,83,726", status: "Won" },
    { name: "Smriti Irani", constituency: "Amethi", party: "BJP", partyColor: "#f97316", votes: "4,14,718", status: "Lost" },
    { name: "Akhilesh Yadav", constituency: "Kannauj", party: "SP", partyColor: "#ef4444", votes: "5,93,507", status: "Won" },
    { name: "Mamata Banerjee", constituency: "Bhawanipur", party: "AITC", partyColor: "#22c55e", votes: "—", status: "Trailing" },
    { name: "Chandrababu Naidu", constituency: "Kuppam", party: "TDP", partyColor: "#eab308", votes: "1,08,432", status: "Won" },
    { name: "Omar Abdullah", constituency: "Baramulla", party: "NC", partyColor: "#6366f1", votes: "4,64,043", status: "Won" },
];

const STATUS_STYLE: Record<CandidateRow["status"], string> = {
    Won: "bg-green-100 text-green-700",
    Lost: "bg-red-100 text-red-600",
    Leading: "bg-blue-100 text-blue-700",
    Trailing: "bg-amber-100 text-amber-700",
};

//  Component 

export default function ElectionPage() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { navItems, onNavChange } = useNavigation();

    return (
        <div className="min-h-screen bg-[#f6f6f8] text-[#111318] font-sans selection:bg-blue-100">
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
                    <div>
                        <h2 className="text-2xl font-black tracking-tight">
                            Election Performance Dashboard
                        </h2>
                        <p className="text-sm text-gray-400 font-medium mt-1">
                            Real-time enterprise analytics for the 2024 General Elections
                        </p>
                    </div>

                    {/* ── Stat Cards ── */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                        {STAT_CARDS.map((s) => (
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
                            centerValue="94.5 Cr"
                            centerLabel="TOTAL VOTERS"
                            data={GENDER_DATA}
                            valueSuffix="%"
                        />

                        <AgeBarChart
                            title="Age Demographics"
                            subtitle="Voter distribution by age group (Cr)"
                            data={AGE_DATA}
                        />

                        <DonutPieChart
                            title="Party Dominance"
                            subtitle="National vote share by major parties"
                            centerValue="43.7%"
                            centerLabel="BJP SHARE"
                            data={PARTY_DOMINANCE_DATA}
                            valueSuffix="%"
                        />
                    </div>

                    {/* ── Row 2: Votes per Constituency ── */}
                    <VotesBarList
                        title="Votes per Constituency (Top 10)"
                        subtitle="Highest vote counts in lakh"
                        data={VOTES_PER_CONSTITUENCY}
                    />

                    {/* ── Party Performance Table ── */}
                    <ElectionTable<PartyRow>
                        title="Party Performance Breakdown"
                        subtitle="2024 General Election — seat counts and vote shares"
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
                                key: "trend",
                                label: "Trend",
                                align: "right",
                                render: (row) => (
                                    <span
                                        className={cn(
                                            "flex items-center justify-end gap-1 font-bold text-xs",
                                            row.trendDir === "up"
                                                ? "text-green-600"
                                                : "text-red-500"
                                        )}
                                    >
                                        {row.trendDir === "up" ? (
                                            <TrendingUp size={13} />
                                        ) : (
                                            <TrendingDown size={13} />
                                        )}
                                        {row.trend}
                                    </span>
                                ),
                            },
                        ]}
                        rows={PARTY_PERFORMANCE}
                    />

                    {/* ── Highest / Lowest Turnout ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <TurnoutList
                            title="Highest Turnout Constituencies"
                            subtitle="Top 5 by voter participation"
                            items={HIGHEST_TURNOUT}
                            variant="high"
                        />
                        <TurnoutList
                            title="Lowest Turnout Constituencies"
                            subtitle="Bottom 5 by voter participation"
                            items={LOWEST_TURNOUT}
                            variant="low"
                        />
                    </div>

                    {/* ── Candidate Outcomes Table ── */}
                    <ElectionTable<CandidateRow>
                        title="Detailed Candidate Outcomes"
                        subtitle="Key candidate results from the 2024 General Election"
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
                                            "text-[10px] font-black border-none px-2",
                                            STATUS_STYLE[row.status]
                                        )}
                                    >
                                        {row.status}
                                    </Badge>
                                ),
                            },
                        ]}
                        rows={CANDIDATE_OUTCOMES}
                    />

                </div>
            </main>
        </div>
    );
}
