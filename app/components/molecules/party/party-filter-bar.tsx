import * as React from "react";
import { Input } from "~/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import { Search } from "lucide-react";

type PartyFilterBarProps = {
    searchName: string;
    onSearchNameChange: (value: string) => void;
    partyType: string;
    onPartyTypeChange: (value: string) => void;
    typeOptions: string[];
    className?: string;
};

export const PartyFilterBar: React.FC<PartyFilterBarProps> = ({
    searchName,
    onSearchNameChange,
    partyType,
    onPartyTypeChange,
    typeOptions,
    className = "",
}) => {
    return (
        <div
            className={`bg-white p-4 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4 items-end ${className}`}
        >
            <div className="space-y-1.5 min-w-0">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Name
                </label>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        value={searchName}
                        onChange={(e) => onSearchNameChange(e.target.value)}
                        className="pl-10 bg-white border-slate-200 text-slate-900 text-sm focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                        placeholder="Search by party name..."
                    />
                </div>
            </div>

            <div className="space-y-1.5 min-w-0">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Type
                </label>
                <Select value={partyType} onValueChange={onPartyTypeChange}>
                    <SelectTrigger className="bg-white border-slate-200 text-slate-600 text-sm focus:ring-blue-600 focus:border-blue-600">
                        <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Types</SelectItem>
                        {typeOptions.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                                {opt}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};
