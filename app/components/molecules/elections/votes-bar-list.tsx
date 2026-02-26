import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";

type VotesBarItem = {
    constituency: string;
    votes: number;
};

type VotesBarListProps = {
    title: string;
    subtitle?: string;
    data: VotesBarItem[];
    className?: string;
};

export const VotesBarList: React.FC<VotesBarListProps> = ({
    title,
    subtitle,
    data,
    className,
}) => {
    const maxVotes = Math.max(...data.map((d) => d.votes));

    return (
        <Card className={cn("border-none shadow-sm overflow-hidden flex flex-col", className)}>
            <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-base font-bold">{title}</CardTitle>
                        {subtitle && (
                            <p className="text-xs text-gray-400 font-medium mt-0.5">{subtitle}</p>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-1 px-6 pb-6 overflow-y-auto max-h-[340px] space-y-3 pr-3">
                {data.map((item, index) => {
                    const pct = (item.votes / maxVotes) * 100;
                    return (
                        <div key={index} className="flex items-center text-xs group">
                            <span className="w-36 text-slate-600 font-medium truncate shrink-0">
                                {item.constituency}
                            </span>
                            <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden ml-3">
                                <div
                                    className="h-full bg-[#2563eb] rounded-full group-hover:bg-blue-700 transition-colors"
                                    style={{ width: `${pct}%` }}
                                />
                            </div>
                            <span className="w-14 text-right font-bold text-slate-800 ml-3 shrink-0">
                                {item.votes}L
                            </span>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
};
