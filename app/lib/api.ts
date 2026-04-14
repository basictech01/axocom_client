import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GRAPHQL_ENDPOINT } from "~/types/constant";
import { getAccessToken } from "~/lib/auth-storage";

const httpLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
    const token = getAccessToken();
    return {
        headers: {
            ...headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    };
});

export const apolloClient = new ApolloClient({
    link: from([authLink, httpLink]),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    // Add field-level cache policies as needed
                    // e.g., pagination for candidates, voters, etc.
                },
            },
        },
    }),
});