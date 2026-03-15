import { useQuery } from "@apollo/client/react";
import { useMemo } from "react";
import { GET_SEATS_WON_PER_YEAR } from "../services";

export type SeatsDatum = { value: number; label: string };

export function usePartySeatsHistory(
    partyId: number,
    selectedYear: number,
    seatsWonCurrentYear: number
) {
    const { data, loading } = useQuery(GET_SEATS_WON_PER_YEAR, {
        variables: { party_id: partyId },
        skip: !partyId,
    });

    const raw = data?.seatsWonPerYearByParty ?? [];

    const seatsData: SeatsDatum[] = useMemo(() => {
        return raw.map(({ year, seatsWon }) => {
            const value =
                Number(year) === Number(selectedYear)
                    ? seatsWonCurrentYear
                    : seatsWon;
            const label = `'${year.toString().slice(-2)}`;
            return { value, label };
        });
    }, [raw, selectedYear, seatsWonCurrentYear]);

    const seatsMax = useMemo(
        () => Math.max(1, ...seatsData.map((d) => d.value)),
        [seatsData]
    );

    return { seatsData, seatsMax, loading };
}
