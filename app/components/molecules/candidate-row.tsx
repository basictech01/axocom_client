import * as React from "react";
import {
    TableRow,
    TableCell,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";

export type CandidateRowProps = {
    name: string;
    party: string;
    education: string;
    projectedShare: string;
    votesPolled: number;
    /** Tailwind color keyword used in text/bg classes, e.g. "orange" | "blue" */
    partyColor: string;
    /** Optional profile image URL; falls back to a gray circle if not provided */
    profileImageUrl?: string;
    /** Called when "View Profile" is clicked */
    onViewProfile?: () => void;
};

export const CandidateRow: React.FC<CandidateRowProps> = ({
    name,
    party,
    education,
    projectedShare,
    votesPolled,
    partyColor,
    profileImageUrl,
    onViewProfile,
}) => {
    const PLACEHOLDER_PROFILE_IMAGE =
        "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    const partyBadgeClasses = `text-${partyColor}-600 bg-${partyColor}-50 border-${partyColor}-100 font-black text-xs`;
    const [imageSrc, setImageSrc] = React.useState(
        profileImageUrl?.trim() || PLACEHOLDER_PROFILE_IMAGE
    );

    React.useEffect(() => {
        setImageSrc(profileImageUrl?.trim() || PLACEHOLDER_PROFILE_IMAGE);
    }, [profileImageUrl]);

    return (
        <TableRow className="border-gray-50">
            <TableCell className="font-bold flex items-center gap-3 py-4">
                <img
                    src={imageSrc}
                    alt={name}
                    className="size-8 rounded-full object-cover"
                    onError={() => setImageSrc(PLACEHOLDER_PROFILE_IMAGE)}
                />
                {name}
            </TableCell>

            <TableCell>
                <Badge variant="outline" className={partyBadgeClasses}>
                    ● {party}
                </Badge>
            </TableCell>

            <TableCell className="text-gray-500 font-medium text-xs">
                {education}
            </TableCell>

            <TableCell className="font-black text-sm">
                {projectedShare}
            </TableCell>

            <TableCell className="font-black text-sm text-middle">
                {votesPolled}
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