import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";

export type TurnoutItem = {
    rank: number;
    constituency: string;
    state: string;
    turnout: number;
};

type TurnoutListProps = {
    title: string;
    subtitle?: string;
    items: TurnoutItem[];
    /** "high" uses green accents, "low" uses red accents */
    variant?: "high" | "low";
    className?: string;
};

export const TurnoutList: React.FC<TurnoutListProps> = ({
    title,
    subtitle,
    items,
    variant = "high",
    className,
}) => {
    const isHigh = variant === "high";

    return (
        <Card className={`border-none shadow-sm ${className ?? ""}`}>
            <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold">{title}</CardTitle>
                {subtitle && (
                    <p className="text-xs text-gray-400 font-medium">{subtitle}</p>
                )}
            </CardHeader>
            <CardContent className="space-y-2">
                {items.map((item) => (
                    <div
                        key={item.rank}
                        className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0"
                    >
                        {/* Rank badge */}
                        <div
                            className={cn(
                                "size-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0",
                                isHigh
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-600"
                            )}
                        >
                            {item.rank}
                        </div>

                        {/* Name + state */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-800 truncate">
                                {item.constituency}
                            </p>
                            <p className="text-[11px] text-gray-400 font-medium">
                                {item.state}
                            </p>
                        </div>

                        {/* Turnout + mini bar */}
                        <div className="text-right shrink-0 space-y-1">
                            <span
                                className={cn(
                                    "text-sm font-black",
                                    isHigh ? "text-green-600" : "text-red-500"
                                )}
                            >
                                {item.turnout}%
                            </span>
                            <div className="w-16 h-1 rounded-full bg-gray-100 overflow-hidden">
                                <div
                                    className={cn(
                                        "h-full rounded-full",
                                        isHigh ? "bg-green-500" : "bg-red-400"
                                    )}
                                    style={{ width: `${item.turnout}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};
