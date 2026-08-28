import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useApolloClient } from "@apollo/client/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  Loader2,
  RotateCcw,
  Search,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import {
  ADMIN_DELEGATE_PASS_REGISTRATIONS_QUERY,
  ADMIN_NOMINATION_REGISTRATIONS_QUERY,
  UPDATE_DELEGATE_PASS_PAYMENT_STATUS_MUTATION,
  UPDATE_NOMINATION_PAYMENT_STATUS_MUTATION,
} from "~/features/summit/services";
import { formatPaise } from "~/features/summit/lib/money";
import type {
  DelegatePassRegistration,
  NominationRegistration,
  Pagination,
  PaymentStatus,
} from "~/features/summit/types";

type Registration = DelegatePassRegistration | NominationRegistration;

function isDelegate(item: Registration): item is DelegatePassRegistration {
  return "passName" in item;
}

const displayName = (item: Registration) =>
  isDelegate(item) ? item.fullName : item.nomineeName;

const planName = (item: Registration) =>
  isDelegate(item) ? item.passName : item.planName;

export function paymentStatusIcon(status: PaymentStatus) {
  switch (status) {
    case "paid":
      return <CheckCircle2 className="w-4 h-4 text-success" aria-hidden />;
    case "failed":
      return <XCircle className="w-4 h-4 text-error" aria-hidden />;
    case "refunded":
      return <RotateCcw className="w-4 h-4 text-muted-foreground" aria-hidden />;
    default:
      return <Clock className="w-4 h-4 text-warning" aria-hidden />;
  }
}

const statusTextClass = (status: PaymentStatus) =>
  status === "paid"
    ? "text-success"
    : status === "failed"
      ? "text-error"
      : status === "refunded"
        ? "text-muted-foreground"
        : "text-warning";

/**
 * Delegate pass and nomination registrations share every interaction (list,
 * search, payment status filter, detail drawer, mark paid/failed/refunded), so
 * one panel drives both and only the query and detail fields differ.
 */
export function SummitRegistrationsPanel({
  kind,
  onUnauthorized,
}: {
  kind: "delegate" | "nominations";
  onUnauthorized: () => void | Promise<void>;
}) {
  const client = useApolloClient();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Registration[]>([]);
  const [selectedItem, setSelectedItem] = useState<Registration | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [adminNote, setAdminNote] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
  });

  const label = kind === "delegate" ? "delegate pass registrations" : "nominations";

  const fetchData = async (pageOverride?: number) => {
    setIsLoading(true);
    try {
      const variables = {
        paymentStatus: (statusFilter || undefined) as PaymentStatus | undefined,
        search: searchQuery || undefined,
        page: pageOverride ?? page,
        limit: 20,
      };

      if (kind === "delegate") {
        const response = await client.query({
          query: ADMIN_DELEGATE_PASS_REGISTRATIONS_QUERY,
          variables,
          fetchPolicy: "network-only",
        });
        if (!response.data) throw new Error("Failed to fetch delegate pass registrations");
        setData(response.data.adminDelegatePassRegistrations.data);
        setPagination(response.data.adminDelegatePassRegistrations.pagination);
      } else {
        const response = await client.query({
          query: ADMIN_NOMINATION_REGISTRATIONS_QUERY,
          variables,
          fetchPolicy: "network-only",
        });
        if (!response.data) throw new Error("Failed to fetch nominations");
        setData(response.data.adminNominationRegistrations.data);
        setPagination(response.data.adminNominationRegistrations.pagination);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to fetch data";
      if (/unauthorized|admin access required/i.test(message)) {
        await onUnauthorized();
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
  }, [kind, statusFilter]);

  useEffect(() => {
    void fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, statusFilter, page]);

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    if (page !== 1) setPage(1);
    else void fetchData(1);
  };

  const handleUpdatePaymentStatus = async (paymentStatus: PaymentStatus) => {
    if (!selectedItem) return;
    if (!confirm(`Mark this registration as ${paymentStatus}?`)) return;

    setIsSaving(true);
    try {
      const variables = {
        id: selectedItem.id,
        input: { paymentStatus, adminNote: adminNote || null },
      };
      await client.mutate({
        mutation:
          kind === "delegate"
            ? UPDATE_DELEGATE_PASS_PAYMENT_STATUS_MUTATION
            : UPDATE_NOMINATION_PAYMENT_STATUS_MUTATION,
        variables,
      });
      toast.success(`Marked as ${paymentStatus}`);
      setSelectedItem(null);
      void fetchData();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update payment status";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-10">
        <h2 className="font-display font-bold text-lg text-foreground">
          {kind === "delegate" ? "Delegate Passes" : "Nominations"}
        </h2>

        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Name, email, phone, id..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="pl-9 pr-4 py-1.5 rounded-lg bg-card border border-border text-sm outline-none focus:border-primary/50 w-40 sm:w-64"
            />
          </form>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="px-3 py-1.5 rounded-lg bg-card border border-border text-sm outline-none focus:border-primary/50"
          >
            <option value="">All Payments</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
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
            <p>No {label} found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {data.map((item) => (
                <motion.div
                  key={item.id}
                  layoutId={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    setAdminNote(item.adminNote || "");
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer hover:shadow-lg ${
                    selectedItem?.id === item.id
                      ? "bg-primary/5 border-primary/30"
                      : "bg-card border-border hover:border-primary/20"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2 py-0.5 rounded-md bg-secondary text-[10px] font-mono font-medium text-muted-foreground border border-border">
                      {item.id}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-medium capitalize">
                      {paymentStatusIcon(item.paymentStatus)}
                      <span className={statusTextClass(item.paymentStatus)}>{item.paymentStatus}</span>
                    </div>
                  </div>

                  <h3 className="font-display font-semibold text-foreground mb-1 line-clamp-1">
                    {displayName(item)}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
                    {planName(item)}
                    {isDelegate(item) && item.quantity > 1 ? ` · ${item.quantity} passes` : ""}
                  </p>
                  <p className="text-lg font-bold text-foreground">{formatPaise(item.totalAmount)}</p>

                  <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-3 mt-3 border-t border-border/50">
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1">
                      View Details <ChevronRight className="w-3 h-3" />
                    </span>
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
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-card border-l border-border z-50 shadow-2xl overflow-auto"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-display font-bold text-2xl text-foreground">Registration Details</h2>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <XCircle className="w-6 h-6 text-muted-foreground" />
                  </button>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold capitalize border bg-surface-subtle border-border">
                      {paymentStatusIcon(selectedItem.paymentStatus)}
                      <span className={statusTextClass(selectedItem.paymentStatus)}>
                        {selectedItem.paymentStatus}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Registered {new Date(selectedItem.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="p-5 rounded-xl bg-surface-subtle border border-border">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                      Amount
                    </h4>
                    <p className="text-3xl font-bold text-foreground">
                      {formatPaise(selectedItem.totalAmount)}
                    </p>
                    {isDelegate(selectedItem) && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {selectedItem.quantity} × {formatPaise(selectedItem.unitAmount)} per delegate
                      </p>
                    )}
                    {selectedItem.paidAt && (
                      <p className="text-xs text-success mt-2">
                        Paid on {new Date(selectedItem.paidAt).toLocaleString()}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                        {isDelegate(selectedItem) ? "Delegate" : "Nominee"}
                      </h4>
                      <p className="text-foreground font-medium">{displayName(selectedItem)}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                        Email
                      </h4>
                      <p className="text-foreground break-all">{selectedItem.email}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                        Phone
                      </h4>
                      <p className="text-foreground">{selectedItem.phone}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                        Organisation
                      </h4>
                      <p className="text-foreground">{selectedItem.organisation}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                        Designation
                      </h4>
                      <p className="text-foreground">{selectedItem.designation}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                        {isDelegate(selectedItem) ? "Pass" : "Plan"}
                      </h4>
                      <p className="text-foreground">{planName(selectedItem)}</p>
                    </div>
                    {isDelegate(selectedItem) && selectedItem.gstNumber && (
                      <div>
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                          GST Number
                        </h4>
                        <p className="text-foreground font-mono text-sm">{selectedItem.gstNumber}</p>
                      </div>
                    )}
                  </div>

                  {!isDelegate(selectedItem) && (
                    <>
                      <div>
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                          Impact & Achievements
                        </h4>
                        <div className="p-4 rounded-xl bg-card border border-border text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                          {selectedItem.achievements}
                        </div>
                      </div>
                      {selectedItem.website && (
                        <div>
                          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                            Website / Profile
                          </h4>
                          <a
                            href={selectedItem.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:underline break-all"
                          >
                            {selectedItem.website} <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        </div>
                      )}
                    </>
                  )}

                  {(selectedItem.razorpayOrderId || selectedItem.razorpayPaymentId) && (
                    <div className="grid grid-cols-1 gap-3">
                      {selectedItem.razorpayOrderId && (
                        <div>
                          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                            Razorpay Order
                          </h4>
                          <p className="text-foreground font-mono text-xs break-all">
                            {selectedItem.razorpayOrderId}
                          </p>
                        </div>
                      )}
                      {selectedItem.razorpayPaymentId && (
                        <div>
                          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                            Razorpay Payment
                          </h4>
                          <p className="text-foreground font-mono text-xs break-all">
                            {selectedItem.razorpayPaymentId}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="pt-8 border-t border-border">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                      Payment Review
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">
                          Internal Admin Note
                        </label>
                        <textarea
                          value={adminNote}
                          onChange={(event) => setAdminNote(event.target.value)}
                          placeholder="Add a private note about this registration..."
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground outline-none focus:border-primary/50 transition-all resize-none text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => void handleUpdatePaymentStatus("paid")}
                          disabled={isSaving}
                          className="py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
                        >
                          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                          Mark Paid
                        </button>
                        <button
                          onClick={() => void handleUpdatePaymentStatus("pending")}
                          disabled={isSaving}
                          className="py-3 border border-border text-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-secondary transition-all disabled:opacity-50"
                        >
                          <Clock className="w-4 h-4" />
                          Mark Pending
                        </button>
                        <button
                          onClick={() => void handleUpdatePaymentStatus("failed")}
                          disabled={isSaving}
                          className="py-3 bg-destructive text-destructive-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
                        >
                          <XCircle className="w-4 h-4" />
                          Mark Failed
                        </button>
                        <button
                          onClick={() => void handleUpdatePaymentStatus("refunded")}
                          disabled={isSaving}
                          className="py-3 border border-border text-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-secondary transition-all disabled:opacity-50"
                        >
                          <RotateCcw className="w-4 h-4" />
                          Mark Refunded
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
    </>
  );
}
