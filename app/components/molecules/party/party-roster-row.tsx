import * as React from "react";
import { TableRow, TableCell } from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";

export type PartyRosterRowProps = {
    name: string;
    caste: string;
    education: string;
    voteShare: string;
    votesPolled: number;
    imageUrl?: string | null;
    onViewProfile?: () => void;
};

export const PartyRosterRow: React.FC<PartyRosterRowProps> = ({
    name,
    caste,
    education,
    voteShare,
    votesPolled,
    imageUrl,
    onViewProfile,
}) => {
    return (
        <TableRow className="border-gray-50">
            <TableCell className="font-bold flex items-center gap-3 py-4">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={name}
                        className="size-8 rounded-full object-cover"
                    />
                ) : (
                    <div className="size-8 bg-gray-200 rounded-full" />
                )}
                {name}
            </TableCell>

            <TableCell>
                <Badge variant="outline" className="text-gray-700 bg-gray-50 border-gray-200 text-xs">
                    {caste || "Unknown"}
                </Badge>
            </TableCell>

            <TableCell className="text-gray-500 font-medium text-xs">
                {education}
            </TableCell>

            <TableCell className="font-black text-sm">
                {voteShare}
            </TableCell>

            <TableCell className="font-black text-sm text-middle">
                {votesPolled.toLocaleString("en-IN")}
            </TableCell>

            <TableCell className="text-right">
                <button
                    type="button"
                    onClick={onViewProfile}
                    className="text-blue-600 font-bold text-xs hover:underline"
                >
                    View Profile
                </button>
            </TableCell>
        </TableRow>
    );
};

