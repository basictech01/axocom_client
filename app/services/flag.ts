import { gql, type TypedDocumentNode } from "@apollo/client";

export interface SubmitFlagDataResult {
    submitFlagData: {
        id: number;
        email: string;
        data: string;
        created_at: string;
    };
}

export interface SubmitFlagDataVariables {
    data: string;
    email: string;
}

export interface MyFlagDataByUrlResult {
    myFlagDataByUrl: Array<{
        id: number;
        email: string;
        data: string;
        created_at: string;
    }>;
}

export interface MyFlagDataByUrlVariables {
    url: string;
}

export const SUBMIT_FLAG: TypedDocumentNode<
    SubmitFlagDataResult,
    SubmitFlagDataVariables
> = gql`
    mutation SubmitFlagData($data: String!, $email: String!) {
        submitFlagData(data: $data, email: $email) {
            id
            email
            data
            created_at
        }
    }
`;

export const GET_MY_FLAG_DATA_BY_URL: TypedDocumentNode<
    MyFlagDataByUrlResult,
    MyFlagDataByUrlVariables
> = gql`
    query GetMyFlagDataByUrl($url: String!) {
        myFlagDataByUrl(url: $url) {
            id
            email
            data
            created_at
        }
    }
`;
