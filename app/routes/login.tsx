import * as React from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { useMutation } from "@apollo/client/react";
import { LOGIN_MUTATION } from "~/features/auth/services";
import { useAuth } from "~/contexts/auth-context";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, establishSession } = useAuth();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [submitError, setSubmitError] = React.useState<string | null>(null);

    const [login, { loading }] = useMutation(LOGIN_MUTATION);
    const redirectTo = (location.state as { from?: string } | null)?.from ?? "/";

    if (isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitError(null);
        try {
            const response = await login({
                variables: {
                    input: {
                        email: email.trim().toLowerCase(),
                        password,
                    },
                },
            });

            const payload = response.data?.login;
            if (!payload) {
                setSubmitError("Login failed. Please try again.");
                return;
            }

            establishSession(payload);
            navigate(redirectTo, { replace: true });
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : "Login failed.");
        }
    };

    return (
        <div className="min-h-screen bg-[#F7F9FC] text-slate-900 flex items-center justify-center p-4">
            <main className="w-full max-w-[440px] space-y-8">
                <div className="text-center space-y-1">
                    <h1 className="text-2xl font-black tracking-tight">Axocom Intelligence</h1>
                    <p className="text-sm text-slate-500 font-medium">Welcome back</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                    <form className="space-y-5" onSubmit={onSubmit}>
                        <div className="space-y-1.5">
                            <label className="text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">
                                Email Address
                            </label>
                            <input
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="name@company.com"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full px-4 py-3 pr-11 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    placeholder="********"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((value) => !value)}
                                    className="absolute inset-y-0 right-0 px-3 text-slate-500 hover:text-slate-700"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>
                            </div>
                        </div>

                        {submitError && (
                            <p className="text-sm text-red-600 font-medium">{submitError}</p>
                        )}

                        <button
                            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-colors disabled:opacity-60"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>
                </div>

                {/* <p className="text-center text-sm text-slate-500">
                    Need an account?{" "}
                    <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700">
                        Sign up
                    </Link>
                </p> */}
            </main>
        </div>
    );
}
