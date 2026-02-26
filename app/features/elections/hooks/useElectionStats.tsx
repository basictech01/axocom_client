import { useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import { Users, MapPin, Flag, CalendarDays, Vote, Building2 } from "lucide-react";
import {
    GET_ELECTIONS_BY_STATE_AND_YEAR,
    GET_ELECTION_CANDIDATES_BY_STATE_AND_YEAR,
} from "../services";
import { GET_CONSTITUENCIES_BY_STATE } from "../../constituency/services";

function formatDateRange(dates: string[]): string {
    if (!dates.length) return "—";
    const sorted = [...dates].sort();
    const fmt = (d: string) =>
        new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    const start = fmt(sorted[0]);
    const end = fmt(sorted[sorted.length - 1]);
    return start === end ? start : `${start} – ${end}`;
}

function formatLakh(n: number): string {
    if (n >= 1e7) return `${(n / 1e7).toFixed(1)} Cr`;
    if (n >= 1e5) return `${(n / 1e5).toFixed(1)} L`;
    return n.toLocaleString("en-IN");
}

export function useElectionStats(state: string, year: string) {
    const yearNum = Number(year);
    const hasFilter = !!state && state !== "ALL" && !!yearNum;

    const { data: electionsData, loading: loadingElections } = useQuery(
        GET_ELECTIONS_BY_STATE_AND_YEAR,
        { variables: { state, year: yearNum }, skip: !hasFilter }
    );

    const { data: candidatesData, loading: loadingCandidates } = useQuery(
        GET_ELECTION_CANDIDATES_BY_STATE_AND_YEAR,
        { variables: { state, year: yearNum }, skip: !hasFilter }
    );

    const { data: constituenciesData, loading: loadingConst } = useQuery(
        GET_CONSTITUENCIES_BY_STATE,
        { variables: { state }, skip: !state || state === "ALL" }
    );

    const loading = loadingElections || loadingCandidates || loadingConst;

    const statCards = useMemo(() => {
        const elections = electionsData?.electionsByStateAndYear ?? [];
        const candidates = candidatesData?.electionCandidatesByStateAndYear ?? [];
        const constituencies = constituenciesData?.constituenciesByState ?? [];

        const blank = "—";
        const val = (v: string | number) => (loading || !hasFilter ? blank : String(v));

        const totalVoters = elections.reduce((s, e) => s + e.total_voters, 0);
        const totalCandidates = candidates.length;
        const totalParties = new Set(candidates.map((c) => c.party_id)).size;
        const totalConstituencies = constituencies.length;
        const totalPollingStns = constituencies.reduce((s, c) => s + (c.number_of_polling_stations ?? 0), 0);
        const votesCast = candidates.reduce((s, c) => s + c.votes_polled, 0);
        const electionDates = hasFilter && !loading
            ? formatDateRange(elections.flatMap((e) => [e.start_date, e.end_date]))
            : blank;
        const electionTimeline = hasFilter && !loading && elections.length > 0
            ? `${Math.ceil((new Date(elections[elections.length - 1].end_date).getTime() - new Date(elections[0].start_date).getTime()) / (1000 * 60 * 60 * 24)) + 1} Days`
            : blank;


        return [
            {
                label: "Total Electorate",
                value: val(formatLakh(totalVoters)),
                icon: <Users size={16} />,
                color: "blue" as const,
                sub: "Registered voters",
            },
            {
                label: "Active Candidates",
                value: val(totalCandidates.toLocaleString("en-IN")),
                icon: <Flag size={16} />,
                color: "purple" as const,
                sub: "Across all constituencies",
                active: true,
            },
            {
                label: "Total Constituencies",
                value: val(totalConstituencies),
                icon: <Building2 size={16} />,
                color: "teal" as const,
                sub: "All Lok Sabha constituencies",
            },
            {
                label: "Registered Parties",
                value: val(totalParties),
                icon: <MapPin size={16} />,
                color: "orange" as const,
                sub: "Distinct parties contesting",
            },
            {
                label: "Election Dates",
                value: electionTimeline,
                icon: <CalendarDays size={16} />,
                color: "green" as const,
                sub: electionDates,
            },
            {
                label: "Votes Cast",
                value: val(formatLakh(votesCast)),
                icon: <Vote size={16} />,
                color: "blue" as const,
                sub: "Total votes polled",
            },
            {
                label: "Total Stations",
                value: val(formatLakh(totalPollingStns)),
                icon: <Building2 size={16} />,
                color: "purple" as const,
                sub: "Total polling stations",
            },
        ];
    }, [hasFilter, loading, electionsData, candidatesData, constituenciesData]);

    return { statCards, loading };
}
