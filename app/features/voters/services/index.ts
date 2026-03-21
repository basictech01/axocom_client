import { gql, type TypedDocumentNode } from "@apollo/client";
import type {
    PaginatedVotersData,
    VoterFilterOptionsData,
    VotersPageVariables,
} from "../types";

export const GET_VOTERS_LIST: TypedDocumentNode<
    PaginatedVotersData,
    VotersPageVariables
> = gql`
    query GetVotersList(
        $page: Int
        $limit: Int
        $search: String
        $assembly_constituency: String
        $parliamentary_constituency: String
    ) {
        votersPaginated(
            page: $page
            limit: $limit
            search: $search
            assembly_constituency: $assembly_constituency
            parliamentary_constituency: $parliamentary_constituency
        ) {
            rows {
                id
                epic_number
                first_name_english
                last_name_english
                gender
                age
                state
                assembly_constituency
                parliamentary_constituency
                part_number_name
                part_serial_number
            }
            total
            page
            limit
        }
    }
`;

export const GET_VOTER_FILTER_OPTIONS: TypedDocumentNode<
    VoterFilterOptionsData,
    Record<string, never>
> = gql`
    query GetVoterFilterOptions {
        voterFilterOptions {
            assembly_constituencies
            parliamentary_constituencies
        }
    }
`;
