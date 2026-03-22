import { gql, type TypedDocumentNode } from "@apollo/client";

export interface SubmitFlagDataResult {
    submitFlagData: {
        id: number;
        data: string;
        created_at: string;
    };
}

export interface SubmitFlagDataVariables {
    data: string;
}

export const SUBMIT_FLAG: TypedDocumentNode<
    SubmitFlagDataResult,
    SubmitFlagDataVariables
> = gql`
    mutation SubmitFlagData($data: String!) {
        submitFlagData(data: $data) {
            id
            data
            created_at
        }
    }
`;
