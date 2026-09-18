import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Loader2,
  LogOut,
  Mail,
  Phone,
  Plus,
  Save,
  ShieldCheck,
  UserRound,
  UsersRound,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "~/features/hackathon/components/ui/button";
import { getProblemById } from "~/features/hackathon/lib/data";
import { isValidNormalizedPhone, normalizeEmail, normalizePhone } from "~/features/hackathon/lib/normalize";
import { MAX_TEAM_SIZE } from "~/features/hackathon/lib/participation";
import { Link } from "~/features/hackathon/lib/router";
import { buildHackathonNoIndexMeta } from "~/features/hackathon/lib/seo";
import {
  ADD_SOLUTION_TEAM_MEMBER_MUTATION,
  OPEN_TEAM_LEADER_DASHBOARD_MUTATION,
  TEAM_DASHBOARD_QUERY,
  UPDATE_TEAM_SOLUTION_MUTATION,
} from "~/features/hackathon/services";
import type { ReviewStatus, TeamLeaderDashboard as DashboardData } from "~/features/hackathon/types";

export const meta = () => buildHackathonNoIndexMeta(
  "Team Leader Dashboard | UKIS 2026",
  "Manage your UKIS 2026 solution and team members.",
);

// Only the short-lived scoped token is persisted, never the email and phone used to sign in.
const SESSION_KEY = "ukis-team-dashboard-token";
const inputClass = "h-12 w-full rounded-md border border-input bg-background px-4 text-foreground outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20";
const statusDetails: Record<ReviewStatus, { label: string; icon: typeof Clock3; className: string }> = {
  pending: { label: "Under review", icon: Clock3, className: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300" },
  accepted: { label: "Selected", icon: CheckCircle2, className: "border-success/30 bg-success/10 text-success" },
  rejected: { label: "Not selected", icon: XCircle, className: "border-destructive/30 bg-destructive/10 text-destructive" },
};

type Credentials = { email: string; phone: string };

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function isUnauthorized(error: unknown) {
  return errorMessage(error, "").toLowerCase().includes("unauthorized");
}

export default function TeamLeaderDashboard() {
  const [credentials, setCredentials] = useState<Credentials>({ email: "", phone: "" });
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [solutionForm, setSolutionForm] = useState({
    solutionTitle: "",
    solutionDescription: "",
    prototypeUrl: "",
  });
  const [memberForm, setMemberForm] = useState({ fullName: "", email: "", phone: "" });

  const [resumeDashboard] = useLazyQuery(TEAM_DASHBOARD_QUERY, { fetchPolicy: "network-only" });
  const [openDashboard, { loading: isSigningIn }] = useMutation(OPEN_TEAM_LEADER_DASHBOARD_MUTATION);
  const [updateSolution, { loading: isSaving }] = useMutation(UPDATE_TEAM_SOLUTION_MUTATION);
  const [addMember, { loading: isAddingMember }] = useMutation(ADD_SOLUTION_TEAM_MEMBER_MUTATION);

  function showDashboard(data: DashboardData) {
    setDashboard(data);
    setSolutionForm({
      solutionTitle: data.solutionTitle,
      solutionDescription: data.solutionDescription,
      prototypeUrl: data.prototypeUrl ?? "",
    });
    sessionStorage.setItem(SESSION_KEY, data.accessToken);
  }

  async function signIn(nextCredentials: Credentials) {
    const email = normalizeEmail(nextCredentials.email);
    const phone = normalizePhone(nextCredentials.phone);
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !isValidNormalizedPhone(phone)) {
      setLoginError("Enter the registered email and a valid 10-digit mobile number.");
      return;
    }

    try {
      const { data, error } = await openDashboard({ variables: { email, phone } });
      if (error) throw error;
      if (!data?.openTeamLeaderDashboard) throw new Error("unauthorized");
      setLoginError(null);
      showDashboard(data.openTeamLeaderDashboard);
    } catch (error) {
      setLoginError(
        isUnauthorized(error)
          ? "Those details do not match a registered team leader."
          : "The team dashboard is temporarily unavailable. Please try again.",
      );
    }
  }

  useEffect(() => {
    const accessToken = sessionStorage.getItem(SESSION_KEY);
    if (!accessToken) return;

    void (async () => {
      const { data } = await resumeDashboard({ variables: { accessToken } });
      if (data?.teamDashboard) showDashboard(data.teamDashboard);
      else sessionStorage.removeItem(SESSION_KEY);
    })();
  }, []);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setLoginError(null);
    await signIn(credentials);
  }

  async function handleSolutionSave(event: React.FormEvent) {
    event.preventDefault();
    const accessToken = dashboard?.accessToken;
    if (!accessToken) return;
    if (!solutionForm.solutionTitle.trim() || !solutionForm.solutionDescription.trim()) {
      toast.error("A title and description are required.");
      return;
    }
    if (solutionForm.prototypeUrl && !solutionForm.prototypeUrl.startsWith("https://")) {
      toast.error("Prototype URL must start with https://");
      return;
    }

    try {
      await updateSolution({
        variables: {
          accessToken,
          input: {
            solutionTitle: solutionForm.solutionTitle.trim(),
            solutionDescription: solutionForm.solutionDescription.trim(),
            prototypeUrl: solutionForm.prototypeUrl.trim() || null,
          },
        },
      });
      setDashboard((current) => current ? {
        ...current,
        ...solutionForm,
        prototypeUrl: solutionForm.prototypeUrl.trim() || null,
        updatedAt: new Date().toISOString(),
      } : current);
      toast.success("Solution updated.");
    } catch (error) {
      if (isUnauthorized(error)) return expireSession();
      toast.error(errorMessage(error, "Could not update the solution."));
    }
  }

  async function handleAddMember(event: React.FormEvent) {
    event.preventDefault();
    const accessToken = dashboard?.accessToken;
    if (!accessToken) return;
    const email = normalizeEmail(memberForm.email);
    const phone = normalizePhone(memberForm.phone);
    if (!memberForm.fullName.trim() || !phone || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !isValidNormalizedPhone(phone)) {
      toast.error("Enter a name, valid email, and valid 10-digit mobile number.");
      return;
    }

    try {
      const { data } = await addMember({
        variables: {
          accessToken,
          input: { fullName: memberForm.fullName.trim(), email, phone },
        },
      });
      if (data?.addSolutionTeamMember) {
        setDashboard((current) => current ? {
          ...current,
          members: [...current.members, data.addSolutionTeamMember],
        } : current);
      }
      setMemberForm({ fullName: "", email: "", phone: "" });
      toast.success("Team member added.");
    } catch (error) {
      if (isUnauthorized(error)) return expireSession();
      toast.error(errorMessage(error, "Could not add the team member."));
    }
  }

  function expireSession() {
    logout();
    toast.error("Your dashboard session has expired. Please sign in again.");
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setDashboard(null);
    setCredentials({ email: "", phone: "" });
  }

  if (!dashboard) {
    return (
      <div className="relative min-h-[82vh] overflow-hidden pt-28 pb-16">
        <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: "radial-gradient(circle at 75% 20%, color-mix(in srgb, var(--brand-himalayan-cyan) 15%, transparent), transparent 32%), linear-gradient(135deg, transparent 30%, color-mix(in srgb, var(--primary) 8%, transparent))" }} />
        <div className="container relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.75fr]">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase text-primary">Team leader access</p>
            <h1 className="font-display text-4xl font-bold leading-tight text-foreground sm:text-6xl">
              Keep your team and solution <span className="text-brand-accent">up to date.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Sign in with the email and mobile number used for your UKIS 2026 registration.
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
              <ShieldCheck className="text-primary" size={20} />
              Both details must match the team leader registration.
            </div>
          </div>

          <form onSubmit={handleLogin} className="border-t-4 border-primary bg-card p-6 shadow-xl sm:p-8">
            <h2 className="font-display text-2xl font-bold text-foreground">Sign in</h2>
            <label className="mt-6 block text-sm font-semibold text-foreground" htmlFor="leader-email">Registered email</label>
            <div className="relative mt-2">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input id="leader-email" type="email" autoComplete="email" className={`${inputClass} pl-11`} value={credentials.email} onChange={(event) => setCredentials((current) => ({ ...current, email: event.target.value }))} required />
            </div>
            <label className="mt-5 block text-sm font-semibold text-foreground" htmlFor="leader-phone">Registered mobile number</label>
            <div className="relative mt-2">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input id="leader-phone" type="tel" inputMode="numeric" autoComplete="tel" className={`${inputClass} pl-11`} value={credentials.phone} onChange={(event) => setCredentials((current) => ({ ...current, phone: event.target.value }))} required />
            </div>
            {loginError && <p role="alert" className="mt-4 border-l-2 border-destructive bg-destructive/10 p-3 text-sm text-destructive">{loginError}</p>}
            <Button type="submit" size="lg" className="mt-6 h-12 w-full rounded-md" disabled={isSigningIn}>
              {isSigningIn ? <Loader2 className="animate-spin" /> : <UserRound />}
              {isSigningIn ? "Signing in..." : "Open dashboard"}
            </Button>
            <Link href="/solutions#check-status" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"><ArrowLeft size={16} /> Check status only</Link>
          </form>
        </div>
      </div>
    );
  }

  const problem = getProblemById(dashboard.problemCode);
  const status = statusDetails[dashboard.status];
  const StatusIcon = status.icon;
  const addedMemberCount = dashboard.members.length;
  const maxAdditionalMembers = MAX_TEAM_SIZE - 1;

  return (
    <div className="min-h-screen bg-muted/25 pt-24 pb-16">
      <div className="container">
        <header className="flex flex-col gap-5 border-b border-border pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className={`inline-flex items-center gap-2 border px-3 py-1.5 text-xs font-semibold ${status.className}`}><StatusIcon size={15} />{status.label}</div>
            <h1 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">Team dashboard</h1>
            <p className="mt-2 text-muted-foreground">Welcome back, {dashboard.fullName}.</p>
          </div>
          <Button type="button" variant="outline" className="self-start rounded-md" onClick={logout}><LogOut /> Sign out</Button>
        </header>

        <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)]">
          <form onSubmit={handleSolutionSave} className="border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div><p className="text-xs font-semibold uppercase text-primary">Submission {dashboard.id}</p><h2 className="mt-1 font-display text-xl font-bold text-foreground">Edit solution</h2></div>
              {dashboard.prototypeUrl && <a href={dashboard.prototypeUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary" title="Open prototype"><ExternalLink size={20} /></a>}
            </div>
            <div className="space-y-5 p-6">
              <div className="border-l-2 border-primary bg-primary/5 px-4 py-3">
                <p className="text-xs font-semibold uppercase text-muted-foreground">Problem</p>
                <p className="mt-1 font-semibold text-foreground">{problem?.title ?? dashboard.problemCode}</p>
              </div>
              <div><label htmlFor="solution-title" className="text-sm font-semibold text-foreground">Solution title</label><input id="solution-title" className={`${inputClass} mt-2`} value={solutionForm.solutionTitle} onChange={(event) => setSolutionForm((current) => ({ ...current, solutionTitle: event.target.value }))} required /></div>
              <div><label htmlFor="solution-description" className="text-sm font-semibold text-foreground">Description</label><textarea id="solution-description" rows={9} className="mt-2 w-full resize-y rounded-md border border-input bg-background p-4 leading-relaxed text-foreground outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20" value={solutionForm.solutionDescription} onChange={(event) => setSolutionForm((current) => ({ ...current, solutionDescription: event.target.value }))} required /></div>
              <div><label htmlFor="prototype-url" className="text-sm font-semibold text-foreground">Prototype URL <span className="font-normal text-muted-foreground">(optional)</span></label><input id="prototype-url" type="url" placeholder="https://" className={`${inputClass} mt-2`} value={solutionForm.prototypeUrl} onChange={(event) => setSolutionForm((current) => ({ ...current, prototypeUrl: event.target.value }))} /></div>
              <Button type="submit" size="lg" className="h-12 rounded-md" disabled={isSaving}>{isSaving ? <Loader2 className="animate-spin" /> : <Save />}{isSaving ? "Saving..." : "Save changes"}</Button>
            </div>
          </form>

          <aside className="space-y-7">
            <section className="border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-5 py-4"><div className="flex items-center gap-3"><UsersRound className="text-primary" size={21} /><h2 className="font-display text-lg font-bold text-foreground">Team</h2></div><span className="text-sm font-semibold text-muted-foreground">{addedMemberCount + 1} / {MAX_TEAM_SIZE} total</span></div>
              <div className="divide-y divide-border">
                <div className="flex gap-3 p-5"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{dashboard.fullName.charAt(0).toUpperCase()}</div><div className="min-w-0"><div className="flex items-center gap-2"><p className="truncate font-semibold text-foreground">{dashboard.fullName}</p><span className="bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase text-primary">Lead</span></div><p className="mt-1 truncate text-sm text-muted-foreground">{dashboard.email}</p><p className="text-sm text-muted-foreground">{dashboard.phone}</p></div></div>
                {dashboard.members.map((member) => <div key={member.id} className="flex gap-3 p-5"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-foreground">{member.fullName.charAt(0).toUpperCase()}</div><div className="min-w-0 flex-1"><p className="truncate font-semibold text-foreground">{member.fullName}</p><p className="mt-1 truncate text-sm text-muted-foreground">{member.email}</p><p className="text-sm text-muted-foreground">{member.phone}</p></div></div>)}
              </div>
            </section>

            {addedMemberCount < maxAdditionalMembers ? <form onSubmit={handleAddMember} className="border border-border bg-card p-5">
              <div className="flex items-center gap-3"><Plus className="text-primary" size={21} /><h2 className="font-display text-lg font-bold text-foreground">Add member</h2></div>
              <div className="mt-5 space-y-4">
                <input aria-label="Member full name" placeholder="Full name" className={inputClass} value={memberForm.fullName} onChange={(event) => setMemberForm((current) => ({ ...current, fullName: event.target.value }))} required />
                <input aria-label="Member email" type="email" placeholder="Email address" className={inputClass} value={memberForm.email} onChange={(event) => setMemberForm((current) => ({ ...current, email: event.target.value }))} required />
                <input aria-label="Member phone" type="tel" inputMode="numeric" placeholder="10-digit mobile number" className={inputClass} value={memberForm.phone} onChange={(event) => setMemberForm((current) => ({ ...current, phone: event.target.value }))} required />
                <Button type="submit" className="h-11 w-full rounded-md" disabled={isAddingMember}>{isAddingMember ? <Loader2 className="animate-spin" /> : <Plus />}{isAddingMember ? "Adding..." : "Add to team"}</Button>
              </div>
            </form> : <div className="border border-success/30 bg-success/10 p-5 text-sm text-success"><CheckCircle2 className="mb-3" size={22} /><p className="font-semibold">Your team has reached the maximum of {MAX_TEAM_SIZE} people.</p></div>}
          </aside>
        </div>
      </div>
    </div>
  );
}