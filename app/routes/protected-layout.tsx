import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "~/contexts/auth-context";

export default function ProtectedLayout() {
    const { isLoading, isAuthenticated } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC] text-slate-600 text-sm font-medium">
                Checking session...
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: `${location.pathname}${location.search}` }}
            />
        );
    }

    return <Outlet />;
}
