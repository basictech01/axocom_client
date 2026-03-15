import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { BAR_COLORS } from "~/components/constant";
import type { AssetDatum } from "~/features/party/hooks/usePartyCandidateRoster";

type AssetBarChartProps = {
    title?: string;
    data: AssetDatum[];
    className?: string;
    /** Label for the count, e.g. "candidates" */
    unitLabel?: string;
};

const AssetBarChartInner: React.FC<AssetBarChartProps> = ({
    title = "Asset Distribution",
    data,
    className,
    unitLabel = "candidates",
}) => {
    const maxVal = React.useMemo(
        () => (data.length ? Math.max(...data.map((d) => d.candidates)) : 0),
        [data]
    );

    return (
        <Card className={`border-none shadow-sm overflow-hidden ${className ?? ""}`}>
            <CardHeader>
                <CardTitle className="text-base font-bold">{title}</CardTitle>
            </CardHeader>

            <CardContent className="pb-4 px-4">
                <div className="flex items-end gap-2 h-40 w-full">
                    {data.map((d, i) => {
                        const heightPct =
                            maxVal > 0 ? (d.candidates / maxVal) * 100 : 0;

                        return (
                            <div
                                key={d.group}
                                className="flex flex-col items-center flex-1 min-w-0 h-full justify-end group cursor-pointer"
                            >
                                {/* hover label */}
                                <span className="text-xs font-bold text-slate-700 mb-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {d.candidates} {unitLabel}
                                </span>

                                {/* bar */}
                                <div
                                    className="w-full rounded-t-md transition-all duration-200 group-hover:brightness-90"
                                    style={{
                                        height: `${heightPct}%`,
                                        backgroundColor: BAR_COLORS[i % BAR_COLORS.length],
                                        minHeight: "4px",
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* x-axis labels */}
                <div className="flex justify-between gap-2 mt-2">
                    {data.map((d) => (
                        <span
                            key={d.group}
                            className="flex-1 text-center text-xs font-semibold text-slate-500 uppercase truncate"
                        >
                            {d.group}
                        </span>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export const AssetBarChart = React.memo(AssetBarChartInner);