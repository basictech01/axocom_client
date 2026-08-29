import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client/react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "~/features/hackathon/lib/router";
import {
  FileText,
  Users,
  LogOut,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  Loader2,
  Sun,
  Moon,
  Ticket,
  Award,
  ReceiptText,
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "~/features/hackathon/contexts/ThemeContext";
import { useAuth } from "~/contexts/auth-context";
import { buildHackathonNoIndexMeta } from "~/features/hackathon/lib/seo";
import {
  ADMIN_MENTOR_APPLICATIONS_QUERY,
  ADMIN_SOLUTION_SUBMISSIONS_QUERY,
  UPDATE_MENTOR_STATUS_MUTATION,
  UPDATE_SOLUTION_STATUS_MUTATION,
} from "~/features/hackathon/services";
import type {
  MentorApplication,
  ReviewStatus,
  SolutionSubmission,
} from "~/features/hackathon/types";
import { SummitRegistrationsPanel } from "~/features/summit/components/SummitRegistrationsPanel";
import { RefundRequestsPanel } from "~/features/summit/components/RefundRequestsPanel";

export const meta = () =>
  buildHackathonNoIndexMeta(
    "UKIS Hackathon Administration",
    "Private administration area for UKIS Hackathon submissions and mentor applications.",
  );

type AdminItem = SolutionSubmission | MentorApplication;

/**
 * Hackathon review tabs share one data shape and one accept/reject flow; the
 * summit tabs are payment and ticket driven, so they live in their own panels.
 */
type AdminTab = "solutions" | "mentors" | "delegate" | "nominations" | "refunds";

const HACKATHON_TABS: AdminTab[] = ["solutions", "mentors"];

function isSolutionSubmission(item: AdminItem): item is SolutionSubmission {
  return "solutionTitle" in item;
}

export default function AdminDashboard() {
  const client = useApolloClient();
  const { logout } = useAuth();
  const [, setLocation] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<AdminTab>('solutions');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<AdminItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<AdminItem | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const [adminNote, setAdminNote] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
  });
  
  // Filters
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const isHackathonTab = HACKATHON_TABS.includes(activeTab);

  const fetchData = async (pageOverride?: number) => {
    // Summit tabs own their fetching inside their panels.
    if (!isHackathonTab) return;

    const pageToLoad = pageOverride ?? page;
    setIsLoading(true);
    try {
      const variables = {
        status: (statusFilter || undefined) as ReviewStatus | undefined,
        search: searchQuery || undefined,
        page: pageToLoad,
        limit: 20,
      };

      if (activeTab === "solutions") {
        const response = await client.query({
          query: ADMIN_SOLUTION_SUBMISSIONS_QUERY,
          variables,
          fetchPolicy: "network-only",
        });
        if (!response.data) throw new Error("Failed to fetch solution submissions");
        setData(response.data.adminSolutionSubmissions.data);
        setPagination(response.data.adminSolutionSubmissions.pagination);
      } else {
        const response = await client.query({
          query: ADMIN_MENTOR_APPLICATIONS_QUERY,
          variables,
          fetchPolicy: "network-only",
        });
        if (!response.data) throw new Error("Failed to fetch mentor applications");
        setData(response.data.adminMentorApplications.data);
        setPagination(response.data.adminMentorApplications.pagination);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to fetch data";
      if (/unauthorized|admin access required/i.test(message)) {
        await logout();
        setLocation("/admin/sign-in");
      } else {
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setSelectedItem(null);
  }, [activeTab, statusFilter]);

  useEffect(() => {
    fetchData();
  }, [activeTab, statusFilter, page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (page !== 1) {
      setPage(1);
    } else {
      fetchData(1);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setLocation("/admin/sign-in");
  };

  const handleUpdateStatus = async (status: ReviewStatus) => {
    if (!selectedItem) return;
    
    const confirmMsg = `Are you sure you want to ${status} this ${activeTab === 'solutions' ? 'submission' : 'application'}?`;
    if (!confirm(confirmMsg)) return;

    setIsReviewing(true);
    try {
      if (isSolutionSubmission(selectedItem)) {
        await client.mutate({
          mutation: UPDATE_SOLUTION_STATUS_MUTATION,
          variables: { id: selectedItem.id, input: { status, adminNote: adminNote || null } },
        });
      } else {
        await client.mutate({
          mutation: UPDATE_MENTOR_STATUS_MUTATION,
          variables: { id: selectedItem.id, input: { status, adminNote: adminNote || null } },
        });
      }
      toast.success(`Successfully ${status}`);
      setSelectedItem(null);
      fetchData();
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setIsReviewing(false);
    }
  };

  const getStatusIcon = (status: ReviewStatus) => {
    switch (status) {
      case 'accepted': return <CheckCircle2 className="w-4 h-4 text-success" aria-hidden />;
      case 'rejected': return <XCircle className="w-4 h-4 text-error" aria-hidden />;
      default: return <Clock className="w-4 h-4 text-warning" aria-hidden />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col">
        <div className="p-4 border-b border-border">
          <img
            src="/hackathon/logo.png"
            alt="Uttarakhand Innovation & Solutions Hackathon"
            className="w-full h-auto max-h-20 object-contain object-left"
            width={2127}
            height={1299}
          />
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => { setActiveTab('solutions'); setStatusFilter(""); setSelectedItem(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'solutions' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
          >
            <FileText className="w-4 h-4" />
            Solutions
          </button>
          <button
            onClick={() => { setActiveTab('mentors'); setStatusFilter(""); setSelectedItem(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'mentors' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
          >
            <Users className="w-4 h-4" />
            Mentors
          </button>

          <p className="px-4 pt-5 pb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
            Devbhoomi AI Summit
          </p>
          <button
            onClick={() => { setActiveTab('delegate'); setStatusFilter(""); setSelectedItem(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'delegate' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
          >
            <Ticket className="w-4 h-4" />
            Delegate Passes
          </button>
          <button
            onClick={() => { setActiveTab('nominations'); setStatusFilter(""); setSelectedItem(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'nominations' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
          >
            <Award className="w-4 h-4" />
            Nominations
          </button>
          <button
            onClick={() => { setActiveTab('refunds'); setStatusFilter(""); setSelectedItem(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'refunds' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
          >
            <ReceiptText className="w-4 h-4" />
            User Queries
          </button>
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to day mode" : "Switch to night mode"}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground border border-border transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {theme === "dark" ? "Day mode" : "Night mode"}
          </button>
          <button
            onClick={() => void handleSignOut()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {activeTab === 'delegate' || activeTab === 'nominations' ? (
          <SummitRegistrationsPanel kind={activeTab} onUnauthorized={handleSignOut} />
        ) : activeTab === 'refunds' ? (
          <RefundRequestsPanel onUnauthorized={handleSignOut} />
        ) : (
          <>
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-10">
          <h2 className="font-display font-bold text-lg text-foreground capitalize">
            {activeTab} Submissions
          </h2>
          
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to day mode" : "Switch to night mode"}
              className="md:hidden p-2.5 rounded-lg border border-border bg-secondary text-foreground hover:bg-accent transition-colors"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 rounded-lg bg-card border border-border text-sm outline-none focus:border-primary/50 w-40 sm:w-64"
              />
            </form>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-card border border-border text-sm outline-none focus:border-primary/50"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-auto">
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : data.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                <Search className="w-8 h-8 opacity-20" />
              </div>
              <p>No {activeTab} found matching your criteria.</p>
            </div>
          ) : (
            <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {data.map((item) => (
                <motion.div
                  key={item.id}
                  layoutId={item.id}
                  onClick={() => { setSelectedItem(item); setAdminNote(item.adminNote || ""); }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer hover:shadow-lg ${
                    selectedItem?.id === item.id ? 'bg-primary/5 border-primary/30' : 'bg-card border-border hover:border-primary/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2 py-0.5 rounded-md bg-secondary text-[10px] font-mono font-medium text-muted-foreground border border-border">
                      {item.id}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-medium capitalize">
                      {getStatusIcon(item.status)}
                      <span className={item.status === 'accepted' ? 'text-success' : item.status === 'rejected' ? 'text-error' : 'text-warning'}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="font-display font-semibold text-foreground mb-1 line-clamp-1">
                    {isSolutionSubmission(item) ? item.solutionTitle : item.fullName}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    {isSolutionSubmission(item) ? `Primary contact: ${item.fullName}` : item.currentRole}
                  </p>
                  
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-3 border-t border-border/50">
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1">View Details <ChevronRight className="w-3 h-3" /></span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border pt-4">
              <p className="text-sm text-muted-foreground">
                Page {pagination.page} of {pagination.totalPages} · {pagination.total} total
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1 || isLoading}
                  className="px-4 py-2 rounded-lg border border-border text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-secondary transition-colors"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                  disabled={page >= pagination.totalPages || isLoading}
                  className="px-4 py-2 rounded-lg border border-border text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-secondary transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
            </>
          )}
        </div>
          </>
        )}
      </main>

      {/* Details Drawer / Modal */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-card border-l border-border z-50 shadow-2xl overflow-auto"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-display font-bold text-2xl text-foreground">Review Details</h2>
                  <button onClick={() => setSelectedItem(null)} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                    <XCircle className="w-6 h-6 text-muted-foreground" />
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Status Badge */}
                  <div className="flex items-center gap-3">
                    <div className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold capitalize border ${
                      selectedItem.status === 'accepted' ? 'bg-surface-subtle border-success/40 text-success' :
                      selectedItem.status === 'rejected' ? 'bg-surface-subtle border-error/40 text-error' :
                      'bg-surface-subtle border-warning/40 text-warning'
                    }`}>
                      {getStatusIcon(selectedItem.status)}
                      <span>{selectedItem.status}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Submitted on {new Date(selectedItem.createdAt).toLocaleString()}</span>
                  </div>

                  {/* Content Sections */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                        {isSolutionSubmission(selectedItem) ? "Participant / Team Lead" : "Applicant"}
                      </h4>
                      <p className="text-foreground font-medium">{selectedItem.fullName}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Email</h4>
                      <p className="text-foreground">{selectedItem.email}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Phone</h4>
                      <p className="text-foreground">{selectedItem.phone || 'N/A'}</p>
                    </div>
                    {activeTab === 'solutions' ? (
                      <div>
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Problem Code</h4>
                        <span className="px-2 py-0.5 rounded bg-secondary text-xs font-mono">{isSolutionSubmission(selectedItem) ? selectedItem.problemCode : ""}</span>
                      </div>
                    ) : (
                      <div>
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Organisation</h4>
                        <p className="text-foreground">{!isSolutionSubmission(selectedItem) ? selectedItem.organisation || 'N/A' : 'N/A'}</p>
                      </div>
                    )}
                  </div>

                  {activeTab === 'solutions' ? (
                    <>
                      <div>
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Solution Title</h4>
                        <p className="text-foreground text-lg font-semibold">{isSolutionSubmission(selectedItem) ? selectedItem.solutionTitle : ""}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Description</h4>
                        <div className="p-4 rounded-xl bg-card border border-border text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                          {isSolutionSubmission(selectedItem) ? selectedItem.solutionDescription : ""}
                        </div>
                      </div>
                      {isSolutionSubmission(selectedItem) && selectedItem.prototypeUrl && (
                        <div>
                          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Prototype URL</h4>
                          <a href={selectedItem.prototypeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline">
                            {selectedItem.prototypeUrl} <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div>
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Current Role</h4>
                        <p className="text-foreground font-semibold">{!isSolutionSubmission(selectedItem) ? selectedItem.currentRole : ""}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Expertise</h4>
                        <p className="text-foreground">{!isSolutionSubmission(selectedItem) ? selectedItem.expertise : ""}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Experience Summary</h4>
                        <div className="p-4 rounded-xl bg-card border border-border text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                          {!isSolutionSubmission(selectedItem) ? selectedItem.experienceSummary : ""}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Motivation</h4>
                        <div className="p-4 rounded-xl bg-card border border-border text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                          {!isSolutionSubmission(selectedItem) ? selectedItem.motivation : ""}
                        </div>
                      </div>
                      {!isSolutionSubmission(selectedItem) && selectedItem.profileUrl && (
                        <div>
                          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Profile / Portfolio</h4>
                          <a href={selectedItem.profileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline">
                            {selectedItem.profileUrl} <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </>
                  )}

                  {/* Admin Actions */}
                  <div className="pt-8 border-t border-border">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Admin Review</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Internal Admin Note</label>
                        <textarea
                          value={adminNote}
                          onChange={(e) => setAdminNote(e.target.value)}
                          placeholder="Add a private note about this submission..."
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground outline-none focus:border-primary/50 transition-all resize-none text-sm"
                        />
                      </div>
                      
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleUpdateStatus('accepted')}
                          disabled={isReviewing}
                          className="flex-1 py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
                        >
                          {isReviewing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                          Accept
                        </button>
                        <button
                          onClick={() => handleUpdateStatus('rejected')}
                          disabled={isReviewing}
                          className="flex-1 py-3 bg-destructive text-destructive-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
                        >
                          {isReviewing ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
