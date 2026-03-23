import * as React from "react";
import { Search } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";

type VoterFilterBarProps = {
    search: string;
    onSearchChange: (value: string) => void;
    constituency: string;
    onConstituencyChange: (value: string) => void;
    assemblyConstituencyOptions: string[];
    parliamentaryConstituency: string;
    onParliamentaryConstituencyChange: (value: string) => void;
    parliamentaryConstituencyOptions: string[];
    onApply: () => void;
    onReset: () => void;
    className?: string;
};

export const VoterFilterBar: React.FC<VoterFilterBarProps> = ({
    search,
    onSearchChange,
    constituency,
    onConstituencyChange,
    assemblyConstituencyOptions,
    parliamentaryConstituency,
    onParliamentaryConstituencyChange,
    parliamentaryConstituencyOptions,
    onApply,
    onReset,
    className = "",
}) => {
    return (
        <div
            className={`bg-white p-4 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-end ${className}`}
        >
            <div className="space-y-1.5 min-w-0">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Search by Name / EPIC
                </label>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-10 bg-white border-slate-200 text-slate-900 text-sm focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                        placeholder="Enter EPIC Number or Full Name..."
                    />
                </div>
            </div>

            <div className="space-y-1.5 min-w-0">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Constituency
                </label>
                <Select value={constituency} onValueChange={onConstituencyChange}>
                    <SelectTrigger className="bg-white border-slate-200 text-slate-600 text-sm focus:ring-blue-600 focus:border-blue-600">
                        <SelectValue placeholder="All Constituencies" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Constituencies</SelectItem>
                        {assemblyConstituencyOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-1.5 min-w-0">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Parliamentary Constituency
                </label>
                <Select
                    value={parliamentaryConstituency}
                    onValueChange={onParliamentaryConstituencyChange}
                >
                    <SelectTrigger className="bg-white border-slate-200 text-slate-600 text-sm focus:ring-blue-600 focus:border-blue-600">
                        <SelectValue placeholder="All Parliamentary Constituencies" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Parliamentary Constituencies</SelectItem>
                        {parliamentaryConstituencyOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-end gap-2">
                <Button
                    className="bg-blue-600 hover:bg-blue-700 px-8"
                    onClick={onApply}
                    type="button"
                >
                    Apply Filters
                </Button>
                <Button type="button" variant="outline" className="flex-1" onClick={onReset}>
                    Reset
                </Button>
            </div>
        </div>
    );
};
