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
    isConstituencyLocked?: boolean;
    assemblyConstituencyOptions: string[];
    parliamentaryConstituency: string;
    onParliamentaryConstituencyChange: (value: string) => void;
    parliamentaryConstituencyOptions: string[];
    partNumberName: string;
    onPartNumberNameChange: (value: string) => void;
    partNumberNameOptions: string[];
    onApply: () => void;
    onReset: () => void;
    className?: string;
};

export const VoterFilterBar: React.FC<VoterFilterBarProps> = ({
    search,
    onSearchChange,
    constituency,
    onConstituencyChange,
    isConstituencyLocked = false,
    assemblyConstituencyOptions,
    parliamentaryConstituency,
    onParliamentaryConstituencyChange,
    parliamentaryConstituencyOptions,
    partNumberName,
    onPartNumberNameChange,
    partNumberNameOptions,
    onApply,
    onReset,
    className = "",
}) => {
    const resolvedAssemblyConstituencyOptions = React.useMemo(() => {
        if (!constituency || constituency === "ALL") {
            return assemblyConstituencyOptions;
        }
        const hasCurrent = assemblyConstituencyOptions.some(
            (option) =>
                option.trim().toLowerCase() ===
                constituency.trim().toLowerCase()
        );
        return hasCurrent
            ? assemblyConstituencyOptions
            : [constituency, ...assemblyConstituencyOptions];
    }, [assemblyConstituencyOptions, constituency]);

    return (
        <div className={`bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4 ${className}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
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
                        Constituency {isConstituencyLocked ? "(Locked)" : ""}
                    </label>
                    <Select
                        value={constituency}
                        onValueChange={onConstituencyChange}
                        disabled={isConstituencyLocked}
                    >
                        <SelectTrigger className="bg-white border-slate-200 text-slate-600 text-sm focus:ring-blue-600 focus:border-blue-600">
                            <SelectValue placeholder="All Constituencies" />
                        </SelectTrigger>
                        <SelectContent>
                            {!isConstituencyLocked && (
                                <SelectItem value="ALL">All Constituencies</SelectItem>
                            )}
                            {resolvedAssemblyConstituencyOptions.map((option) => (
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
                    disabled={constituency === "ALL" || parliamentaryConstituencyOptions.length === 0}
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div className="space-y-1.5 min-w-0">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                        Part Name
                    </label>
                    <Select
                        value={partNumberName}
                        onValueChange={onPartNumberNameChange}
                        disabled={partNumberNameOptions.length === 0}
                    >
                        <SelectTrigger className="bg-white border-slate-200 text-slate-600 text-sm focus:ring-blue-600 focus:border-blue-600">
                            <SelectValue placeholder="All Parts" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Parts</SelectItem>
                            {partNumberNameOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-end gap-2 md:justify-end">
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 px-8"
                        onClick={onApply}
                        type="button"
                    >
                        Apply Filters
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className="px-6"
                        onClick={onReset}
                    >
                        Reset
                    </Button>
                </div>
            </div>
        </div>
    );
};
