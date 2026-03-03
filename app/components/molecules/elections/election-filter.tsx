import * as React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";

type ElectionFilterBarProps = {
    state: string;
    onStateChange: (value: string) => void;
    stateOptions: string[];

    year: string;
    onYearChange: (value: string) => void;
    yearOptions: string[];

    className?: string;
};

export const ElectionFilterBar: React.FC<ElectionFilterBarProps> = ({
    state,
    onStateChange,
    stateOptions,
    year,
    onYearChange,
    yearOptions,
    className = "",
}) => {
    return (
        <div
            className={`flex flex-wrap sm:flex-nowrap items-end gap-3 ${className}`}
        >
            {/* State */}
            <div className="space-y-1.5 flex-1 min-w-[180px]">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                    State
                </label>
                <Select value={state} onValueChange={onStateChange}>
                    <SelectTrigger className="bg-white border-slate-200 text-slate-600 text-sm focus:ring-blue-600 focus:border-blue-600">
                        <SelectValue placeholder="All States" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All States</SelectItem>
                        {stateOptions.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                                {opt}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Year */}
            <div className="space-y-1.5 w-40">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Election Year
                </label>
                <Select value={year} onValueChange={onYearChange}>
                    <SelectTrigger className="bg-white border-slate-200 text-slate-600 text-sm focus:ring-blue-600 focus:border-blue-600">
                        <SelectValue placeholder="Select Year" />
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
    );
};
