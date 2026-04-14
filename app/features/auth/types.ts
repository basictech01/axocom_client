export interface AuthUser {
    id: number;
    email: string;
    name: string;
    default_assembly_constituency: string;
}

export interface AuthPayload {
    access_token: string;
    refresh_token: string;
    user: AuthUser;
}

export interface MeResponse {
    me: AuthUser | null;
}

export interface LoginMutationResponse {
    login: AuthPayload;
}

export interface SignupMutationResponse {
    signup: AuthPayload;
}

export interface SignupConstituenciesResponse {
    signup_constituencies: string[];
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface SignupInput extends LoginInput {
    name: string;
    default_assembly_constituency: string;
}
