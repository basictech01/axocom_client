import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { BAR_COLORS } from "~/components/constant";

type AgeDatum = {
    group: string;
    voters: number;
};

type AgeBarChartProps = {
    title: string;
    subtitle?: string;
    data: AgeDatum[];
    className?: string;
};



export const AgeBarChartInner: React.FC<AgeBarChartProps> = ({
    title,
    subtitle,
    data,
    className,
}) => {
    const maxVal = React.useMemo(
        () => Math.max(...data.map((d) => d.voters)),
        [data]
    );

    return (
        <Card className={`border-none shadow-sm overflow-hidden ${className ?? ""}`}>
            <CardHeader>
                <CardTitle className="text-base font-bold">{title}</CardTitle>
                {subtitle && (
                    <p className="text-xs text-gray-400 font-medium">{subtitle}</p>
                )}
            </CardHeader>

            <CardContent className="pb-4 px-4">
                {/* chart area */}
                <div className="flex items-end justify-between gap-2 h-40">
                    {data.map((d, i) => {
                        const heightPct = (d.voters / maxVal) * 100;
                        return (
                            <div
                                key={d.group}
                                className="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer"
                            >
                                {/* hover label */}
                                <span className="text-xs font-bold text-slate-700 mb-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {d.voters}
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

                {/* x-axis labels — separated so they never affect bar height */}
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

export const AgeBarChart = React.memo(AgeBarChartInner);
