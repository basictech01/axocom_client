import { Outlet, useLocation } from "react-router";
import ErrorBoundary from "~/features/hackathon/components/ErrorBoundary";
import Footer from "~/features/hackathon/components/Footer";
import Navbar from "~/features/hackathon/components/Navbar";
import { Toaster } from "~/features/hackathon/components/ui/sonner";
import { TooltipProvider } from "~/features/hackathon/components/ui/tooltip";
import { ThemeProvider, useTheme } from "~/features/hackathon/contexts/ThemeContext";
import { HACKATHON_BASE_PATH } from "~/features/hackathon/lib/router";
import type { Route } from "./+types/Layout";
import "./index.css";

export const meta: Route.MetaFunction = () => [
  { title: "Uttarakhand Innovation & Solutions Hackathon" },
  {
    name: "description",
    content:
      "A state-wide innovation series connecting Uttarakhand's real problems with builders, solutions, and mentors.",
  },
];

function HackathonFrame() {
  const { pathname } = useLocation();
  const { theme } = useTheme();
  const isAdminRoute = pathname.startsWith(`${HACKATHON_BASE_PATH}/admin`);

  return (
    <div data-theme={theme} className="hackathon-app min-h-screen bg-background text-foreground">
      <TooltipProvider>
        {isAdminRoute ? (
          <Outlet />
        ) : (
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
          </div>
        )}
        <Toaster position="top-center" richColors />
      </TooltipProvider>
    </div>
  );
}

export default function HackathonLayout() {
  return (
    <ErrorBoundary>
      <ThemeProvider switchable>
        <HackathonFrame />
      </ThemeProvider>
    </ErrorBoundary>
  );
}