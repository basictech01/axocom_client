import * as React from "react";
import { useApolloClient } from "@apollo/client/react";
import type { AuthPayload, AuthUser } from "~/features/auth/types";
import { GET_ME } from "~/features/auth/services";
import { clearTokens, getAccessToken, persistTokens } from "~/lib/auth-storage";

type AuthContextValue = {
    user: AuthUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    establishSession: (payload: AuthPayload) => void;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const client = useApolloClient();
    const [user, setUser] = React.useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    const refreshUser = React.useCallback(async () => {
        const token = getAccessToken();
        if (!token) {
            setUser(null);
            setIsLoading(false);
            return;
        }

        try {
            const response = await client.query({
                query: GET_ME,
                fetchPolicy: "network-only",
            });
            setUser(response.data?.me ?? null);
        } catch {
            clearTokens();
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, [client]);

    React.useEffect(() => {
        void refreshUser();
    }, [refreshUser]);

    const establishSession = React.useCallback((payload: AuthPayload) => {
        persistTokens(payload.access_token, payload.refresh_token);
        setUser(payload.user);
    }, []);

    const logout = React.useCallback(async () => {
        clearTokens();
        setUser(null);
        await client.clearStore();
    }, [client]);

    const value = React.useMemo(
        () => ({
            user,
            isLoading,
            isAuthenticated: Boolean(user),
            establishSession,
            logout,
            refreshUser,
        }),
        [user, isLoading, establishSession, logout, refreshUser]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
}
