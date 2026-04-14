import { gql, type TypedDocumentNode } from "@apollo/client";
import type {
    LoginInput,
    LoginMutationResponse,
    MeResponse,
    SignupConstituenciesResponse,
    SignupInput,
    SignupMutationResponse,
} from "../types";

export const GET_ME: TypedDocumentNode<MeResponse, Record<string, never>> = gql`
    query GetMe {
        me {
            id
            email
            name
            default_assembly_constituency
        }
    }
`;

export const LOGIN_MUTATION: TypedDocumentNode<
    LoginMutationResponse,
    { input: LoginInput }
> = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            access_token
            refresh_token
            user {
                id
                email
                name
                default_assembly_constituency
            }
        }
    }
`;

export const GET_SIGNUP_CONSTITUENCIES: TypedDocumentNode<
    SignupConstituenciesResponse,
    Record<string, never>
> = gql`
    query GetSignupConstituencies {
        signup_constituencies
    }
`;

export const SIGNUP_MUTATION: TypedDocumentNode<
    SignupMutationResponse,
    { input: SignupInput }
> = gql`
    mutation Signup($input: SignupInput!) {
        signup(input: $input) {
            access_token
            refresh_token
            user {
                id
                email
                name
                default_assembly_constituency
            }
        }
    }
`;
