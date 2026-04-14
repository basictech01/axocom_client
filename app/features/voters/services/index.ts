import { gql, type TypedDocumentNode } from "@apollo/client";
import type {
    PaginatedVotersData,
    VoterByIdData,
    VoterByIdVariables,
    VoterFilterOptionsByAssemblyData,
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
        $part_number_name: String
    ) {
        votersPaginated(
            page: $page
            limit: $limit
            search: $search
            assembly_constituency: $assembly_constituency
            parliamentary_constituency: $parliamentary_constituency
            part_number_name: $part_number_name
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
        }
    }
`;

export const GET_VOTER_FILTER_OPTIONS_BY_ASSEMBLY: TypedDocumentNode<
    VoterFilterOptionsByAssemblyData,
    { assembly_constituency: string }
> = gql`
    query GetVoterFilterOptionsByAssembly($assembly_constituency: String!) {
        voterFilterOptionsByAssembly(assembly_constituency: $assembly_constituency) {
            parliamentary_constituencies
            part_number_names
        }
    }
`;

export const GET_VOTER_BY_ID: TypedDocumentNode<
    VoterByIdData,
    VoterByIdVariables
> = gql`
    query GetVoterById($id: Int!) {
        voter(id: $id) {
            id
            epic_number
            first_name_english
            first_name_local
            last_name_english
            last_name_local
            gender
            age
            relative_first_name_english
            relative_first_name_local
            relative_last_name_english
            relative_last_name_local
            state
            parliamentary_constituency
            assembly_constituency
            polling_station
            part_number_name
            part_serial_number
            created_at
        }
    }
`;

