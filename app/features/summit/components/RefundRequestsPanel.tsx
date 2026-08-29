import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useApolloClient } from "@apollo/client/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Clock,
  Loader2,
  Search,
  Send,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import {
  ADMIN_REFUND_REQUESTS_QUERY,
  RECONCILE_PAYMENT_MUTATION,
  REPLY_TO_REFUND_REQUEST_MUTATION,
  UPDATE_REFUND_REQUEST_STATUS_MUTATION,
} from "~/features/summit/services";
import { formatPaise } from "~/features/summit/lib/money";
import type {
  Pagination,
  PaymentReconciliation,
  RefundRequest,
  RefundStatus,
} from "~/features/summit/types";

const STATUS_LABELS: Record<RefundStatus, string> = {
  open: "Open",
  in_review: "Under review",
  approved: "Approved",
  rejected: "Rejected",
  refunded: "Refunded",
  resolved: "Resolved",
};

const REQUEST_TYPE_LABELS: Record<string, string> = {
  refund: "Refund",
  payment_not_reflected: "Payment not showing",
  other: "Other",
};

const statusTextClass = (status: RefundStatus) =>
  status === "approved" || status === "refunded" || status === "resolved"
    ? "text-success"
    : status === "rejected"
      ? "text-error"
      : "text-warning";

function statusIcon(status: RefundStatus) {
  switch (status) {
    case "approved":
    case "refunded":
    case "resolved":
      return <CheckCircle2 className="w-4 h-4 text-success" aria-hidden />;
    case "rejected":
      return <XCircle className="w-4 h-4 text-error" aria-hidden />;
    default:
      return <Clock className="w-4 h-4 text-warning" aria-hidden />;
  }
}

/** Support tickets. A conversation: admin replies appear on the requester's
 *  public ticket page. */
export function RefundRequestsPanel({
  onUnauthorized,
}: {
  onUnauthorized: () => void | Promise<void>;
}) {
  const client = useApolloClient();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<RefundRequest[]>([]);
  const [selectedItem, setSelectedItem] = useState<RefundRequest | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [reply, setReply] = useState("");
  const [reconciliation, setReconciliation] = useState<PaymentReconciliation | null>(null);
  const [reconcileError, setReconcileError] = useState<string | null>(null);
  const [isReconciling, setIsReconciling] = useState(false);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [requestTypeFilter, setRequestTypeFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
  });

  const fetchData = async (pageOverride?: number) => {
    setIsLoading(true);
    try {
      const response = await client.query({
        query: ADMIN_REFUND_REQUESTS_QUERY,
        variables: {
          status: (statusFilter || undefined) as RefundStatus | undefined,
          requestType: (requestTypeFilter || undefined) as
            | "refund"
            | "payment_not_reflected"
            | "other"
            | undefined,
          registrationType: (typeFilter || undefined) as
            | "delegate_pass"
            | "nomination"
            | undefined,
          search: searchQuery || undefined,
          page: pageOverride ?? page,
          limit: 20,
        },
        fetchPolicy: "network-only",
      });
      if (!response.data) throw new Error("Failed to fetch refund requests");
      const { data: requests, pagination: nextPagination } = response.data.adminRefundRequests;
      setData(requests);
      setPagination(nextPagination);

      // Keep the open drawer in sync.
      setSelectedItem((current) =>
        current ? requests.find((item) => item.id === current.id) ?? null : null
      );
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
  }, [statusFilter, typeFilter, requestTypeFilter]);

  useEffect(() => {
    void fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, typeFilter, requestTypeFilter, page]);

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    if (page !== 1) setPage(1);
    else void fetchData(1);
  };

  /**
   * Checks what Razorpay holds before a refund is approved. A payment that
   * failed at the gateway is auto-reversed by the bank, so refunding it here
   * would pay the customer twice.
   */
  const handleReconcile = async () => {
    if (!selectedItem) return;
    setIsReconciling(true);
    setReconcileError(null);
    try {
      const response = await client.mutate({
        mutation: RECONCILE_PAYMENT_MUTATION,
        variables: {
          registrationType: selectedItem.registrationType === "delegate_pass" ? "delegate_pass" : "nomination",
          registrationId: selectedItem.registrationId ?? "",
        },
      });
      setReconciliation(response.data?.reconcilePayment ?? null);
    } catch (error) {
      // "No payment was ever started" is an answer, not a failure.
      const message = error instanceof Error ? error.message : "Could not reach the gateway";
      setReconcileError(message);
      setReconciliation(null);
    } finally {
      setIsReconciling(false);
    }
  };

  const handleReply = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedItem || !reply.trim() || isSaving) return;

    setIsSaving(true);
    try {
      await client.mutate({
        mutation: REPLY_TO_REFUND_REQUEST_MUTATION,
        variables: { id: selectedItem.id, message: reply.trim() },
      });
      setReply("");
      toast.success("Reply sent to the requester");
      await fetchData();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send reply";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateStatus = async (status: RefundStatus) => {
    if (!selectedItem) return;
    if (!confirm(`Set this request to "${STATUS_LABELS[status]}"?`)) return;

    setIsSaving(true);
    try {
      await client.mutate({
        mutation: UPDATE_REFUND_REQUEST_STATUS_MUTATION,
        variables: { id: selectedItem.id, status },
      });
      toast.success(`Marked as ${STATUS_LABELS[status]}`);
      await fetchData();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update status";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-10">
        <h2 className="font-display font-bold text-lg text-foreground">Support Requests</h2>

        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Name, email, ticket..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="pl-9 pr-4 py-1.5 rounded-lg bg-card border border-border text-sm outline-none focus:border-primary/50 w-36 sm:w-56"
            />
          </form>

          <select
            value={requestTypeFilter}
            onChange={(event) => setRequestTypeFilter(event.target.value)}
            className="px-3 py-1.5 rounded-lg bg-card border border-border text-sm outline-none focus:border-primary/50"
          >
            <option value="">All Requests</option>
            <option value="refund">Refunds</option>
            <option value="payment_not_reflected">Payment not showing</option>
            <option value="other">Other</option>
          </select>

          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            className="px-3 py-1.5 rounded-lg bg-card border border-border text-sm outline-none focus:border-primary/50"
          >
            <option value="">All Types</option>
            <option value="delegate_pass">Delegate pass</option>
            <option value="nomination">Nomination</option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="px-3 py-1.5 rounded-lg bg-card border border-border text-sm outline-none focus:border-primary/50"
          >
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="in_review">Under review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="refunded">Refunded</option>
            <option value="resolved">Resolved</option>
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
            <p>No refund requests found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {data.map((item) => {
                const adminReplies = item.messages.filter((m) => m.author === "admin").length;
                return (
                  <motion.div
                    key={item.id}
                    layoutId={item.id}
                    onClick={() => {
                      setSelectedItem(item);
                      setReply("");
                      setReconciliation(null);
                      setReconcileError(null);
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
                      <div className="flex items-center gap-1.5 text-xs font-medium">
                        {statusIcon(item.status)}
                        <span className={statusTextClass(item.status)}>
                          {STATUS_LABELS[item.status]}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-display font-semibold text-foreground mb-1 line-clamp-1">
                      {item.fullName}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      {REQUEST_TYPE_LABELS[item.requestType] ?? item.requestType}
                      {" · "}
                      {item.registrationType === "delegate_pass" ? "Delegate pass" : "Nomination"}
                      {item.registrationId ? ` · ${item.registrationId}` : ""}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.reason}</p>

                    <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-3 mt-3 border-t border-border/50">
                      <span>
                        {new Date(item.createdAt).toLocaleDateString()} ·{" "}
                        {adminReplies > 0 ? `${adminReplies} replied` : "Not replied"}
                      </span>
                      <span className="flex items-center gap-1">
                        Open Ticket <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
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
                  <h2 className="font-display font-bold text-2xl text-foreground">Refund Ticket</h2>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <XCircle className="w-6 h-6 text-muted-foreground" />
                  </button>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold border bg-surface-subtle border-border">
                      {statusIcon(selectedItem.status)}
                      <span className={statusTextClass(selectedItem.status)}>
                        {STATUS_LABELS[selectedItem.status]}
                      </span>
                    </div>
                    <span className="px-2 py-1 rounded-md bg-secondary text-[11px] font-mono text-muted-foreground border border-border">
                      {selectedItem.id}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                        Requester
                      </h4>
                      <p className="text-foreground font-medium">{selectedItem.fullName}</p>
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
                        Type
                      </h4>
                      <p className="text-foreground">
                        {selectedItem.registrationType === "delegate_pass"
                          ? "Delegate pass"
                          : "Nomination"}
                      </p>
                    </div>
                    {selectedItem.registrationId && (
                      <div>
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                          Registration
                        </h4>
                        <p className="text-foreground font-mono text-xs break-all">
                          {selectedItem.registrationId}
                        </p>
                      </div>
                    )}
                    {selectedItem.paymentReference && (
                      <div>
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                          Payment Reference
                        </h4>
                        <p className="text-foreground font-mono text-xs break-all">
                          {selectedItem.paymentReference}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-border">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                      Gateway Record
                    </h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Check what Razorpay actually holds before approving. A payment that failed at
                      the gateway is auto-reversed by the customer's bank &mdash; refunding it here
                      as well would pay them twice.
                    </p>
                    <button
                      onClick={() => void handleReconcile()}
                      disabled={isReconciling || !selectedItem.registrationId}
                      className="w-full py-2.5 border border-border text-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-secondary transition-all disabled:opacity-50 text-sm"
                    >
                      {isReconciling ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                      Verify with Razorpay
                    </button>

                    {reconcileError && (
                      <div className="mt-3 p-3 rounded-xl border border-warning/40 bg-surface-subtle text-xs flex gap-2">
                        <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                        <span className="text-foreground">
                          {reconcileError} &mdash; there is nothing for us to refund.
                        </span>
                      </div>
                    )}

                    {reconciliation && (
                      <div className="mt-3 p-4 rounded-xl border border-border bg-surface-subtle space-y-2 text-xs">
                        <div className="flex justify-between gap-3">
                          <span className="text-muted-foreground">Our record</span>
                          <span className="font-medium text-foreground">{reconciliation.ourPaymentStatus}</span>
                        </div>
                        <div className="flex justify-between gap-3">
                          <span className="text-muted-foreground">Charged</span>
                          <span className="font-medium text-foreground">{formatPaise(reconciliation.ourAmount)}</span>
                        </div>
                        <div className="flex justify-between gap-3">
                          <span className="text-muted-foreground">Received at gateway</span>
                          <span className="font-medium text-foreground">{formatPaise(reconciliation.amountPaid)}</span>
                        </div>

                        {reconciliation.capturedPayment ? (
                          <div className="pt-2 border-t border-border flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                            <div>
                              <p className="text-success font-medium">
                                Money received &mdash; safe to refund {formatPaise(reconciliation.capturedPayment.amount)}
                              </p>
                              <p className="font-mono text-muted-foreground break-all mt-0.5">
                                {reconciliation.capturedPayment.paymentId}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="pt-2 border-t border-border flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-error shrink-0 mt-0.5" />
                            <div>
                              <p className="text-error font-medium">Do not refund.</p>
                              <p className="text-muted-foreground mt-0.5">
                                {reconciliation.payments.length === 0
                                  ? "Razorpay holds no payment for this order, so no money reached us."
                                  : "No payment was captured. Any debit the customer saw is auto-reversed by their bank."}
                              </p>
                            </div>
                          </div>
                        )}

                        {reconciliation.payments.length > 0 && (
                          <div className="pt-2 border-t border-border space-y-1">
                            {reconciliation.payments.map((payment) => (
                              <div key={payment.paymentId} className="flex justify-between gap-3">
                                <span className="font-mono text-muted-foreground break-all">{payment.paymentId}</span>
                                <span className={payment.status === "captured" ? "text-success font-medium" : "text-warning font-medium"}>
                                  {payment.status} · {formatPaise(payment.amount)}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                      Conversation
                    </h4>
                    <div className="space-y-3">
                      {selectedItem.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`p-4 rounded-xl border text-sm ${
                            message.author === "admin"
                              ? "bg-primary/5 border-primary/20"
                              : "bg-card border-border"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              {message.author === "admin" ? "You (admin)" : selectedItem.fullName}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              {new Date(message.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                            {message.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleReply} className="space-y-3">
                    <label className="text-sm font-medium text-foreground block">
                      Reply to requester
                    </label>
                    <textarea
                      value={reply}
                      onChange={(event) => setReply(event.target.value)}
                      placeholder="This reply is visible to the requester on their ticket page."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground outline-none focus:border-primary/50 transition-all resize-none text-sm"
                    />
                    <button
                      type="submit"
                      disabled={isSaving || !reply.trim()}
                      className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
                    >
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      Send Reply
                    </button>
                  </form>

                  <div className="pt-8 border-t border-border">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                      Update Status
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => void handleUpdateStatus("in_review")}
                        disabled={isSaving}
                        className="py-3 border border-border text-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-secondary transition-all disabled:opacity-50"
                      >
                        <Clock className="w-4 h-4" />
                        Under Review
                      </button>
                      <button
                        onClick={() => void handleUpdateStatus("approved")}
                        disabled={isSaving}
                        className="py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => void handleUpdateStatus("rejected")}
                        disabled={isSaving}
                        className="py-3 bg-destructive text-destructive-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                      <button
                        onClick={() => void handleUpdateStatus("refunded")}
                        disabled={isSaving}
                        className="py-3 border border-border text-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-secondary transition-all disabled:opacity-50"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Mark Refunded
                      </button>
                      <button
                        onClick={() => void handleUpdateStatus("resolved")}
                        disabled={isSaving}
                        className="col-span-2 py-3 border border-border text-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-secondary transition-all disabled:opacity-50"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Mark Resolved
                        <span className="font-normal text-muted-foreground">
                          (closes a request where no money moves)
                        </span>
                      </button>
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
