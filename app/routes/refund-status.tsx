import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router";
import { buildSeoLinks, buildSeoMeta } from "~/lib/seo";
import { apolloClient } from "~/lib/api";
import {
  REFUND_TICKET_QUERY,
  REPLY_TO_REFUND_TICKET_MUTATION,
} from "~/features/summit/services";
import {
  RefundShell,
  REFUND_STATUS_LABELS,
  formatDateTime,
} from "~/features/summit/components/RefundShell";
import type { RefundTicket } from "~/features/summit/types";
import { REGISTRATION_TYPE } from "~/features/summit/types";

const seo = {
  title: "Track a Request | Devbhoomi AI Summit 2026",
  description:
    "Check the status of your Devbhoomi AI Summit 2026 request and read replies from the team using your ticket reference.",
  path: "/refund-status",
  image: "/images/devbhoomi-ai/summit-logo.png",
  imageAlt: "Devbhoomi AI Summit 2026 request status",
};

export const meta = () => buildSeoMeta(seo);
export const links = () => [
  ...buildSeoLinks(seo),
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap",
  },
];

export default function RefundStatus() {
  const [searchParams] = useSearchParams();
  const [ticketId, setTicketId] = useState("");
  const [email, setEmail] = useState("");
  const [ticket, setTicket] = useState<RefundTicket | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [replying, setReplying] = useState(false);

  // Prefilled when arriving straight from the request form.
  useEffect(() => {
    const fromQuery = searchParams.get("ticket");
    if (fromQuery) setTicketId(fromQuery);
  }, [searchParams]);

  const loadTicket = async (id: string, emailAddress: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apolloClient.query({
        query: REFUND_TICKET_QUERY,
        variables: { ticketId: id, email: emailAddress },
        fetchPolicy: "network-only",
      });
      if (!response.data?.refundTicket) throw new Error("We could not find that request.");
      setTicket(response.data.refundTicket);
    } catch (lookupError) {
      const message =
        lookupError instanceof Error && lookupError.message
          ? lookupError.message
          : "We could not find that request.";
      setError(
        /not found/i.test(message)
          ? "We could not find a refund request with that ticket reference and email address."
          : message
      );
      setTicket(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLookup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    void loadTicket(ticketId.trim(), email.trim());
  };

  const handleReply = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (replying || !reply.trim() || !ticket) return;

    setReplying(true);
    try {
      await apolloClient.mutate({
        mutation: REPLY_TO_REFUND_TICKET_MUTATION,
        variables: { ticketId: ticket.id, email: email.trim(), message: reply.trim() },
      });
      setReply("");
      await loadTicket(ticket.id, email.trim());
    } catch (replyError) {
      const message =
        replyError instanceof Error && replyError.message
          ? replyError.message
          : "We could not post your message.";
      setError(message);
    } finally {
      setReplying(false);
    }
  };

  return (
    <RefundShell
      kicker="Help & support"
      title={<>Track your <span>request</span></>}
      intro="Enter the ticket reference you received along with the email address you filed the request with. Both are required so nobody else can open your request."
    >
      <div className="refund-card">
        <form className="refund-grid" onSubmit={handleLookup}>
          <div className="refund-field">
            <label htmlFor="status-ticket">Ticket reference</label>
            <input id="status-ticket" required value={ticketId} onChange={(event) => setTicketId(event.target.value)} placeholder="e.g. rfd_XXXXXXXX" />
          </div>
          <div className="refund-field">
            <label htmlFor="status-email">Registered email</label>
            <input id="status-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email used on the request" />
          </div>
          <button className="refund-submit" type="submit" disabled={loading}>
            {loading ? "Looking up..." : "View request"}
          </button>
          {error && <p className="refund-error">{error}</p>}
        </form>
      </div>

      {ticket && (
        <div className="refund-card" style={{ marginTop: 24 }}>
          <div className="refund-status-row">
            <div>
              <h2>{ticket.id}</h2>
              <p>
                {ticket.registrationType === REGISTRATION_TYPE.DELEGATE_PASS ? "Delegate pass" : "Award nomination"}
                {ticket.registrationId ? ` · ${ticket.registrationId}` : ""} · raised {formatDateTime(ticket.createdAt)}
              </p>
            </div>
            <span className={`refund-badge ${ticket.status}`}>
              {REFUND_STATUS_LABELS[ticket.status] ?? ticket.status}
            </span>
          </div>

          <div className="refund-thread">
            {ticket.messages.map((message) => (
              <article className={`refund-message ${message.author}`} key={message.id}>
                <div className="refund-message-top">
                  <span className="refund-message-who">
                    {message.author === "admin" ? "AxoCom team" : "You"}
                  </span>
                  <span className="refund-message-when">{formatDateTime(message.createdAt)}</span>
                </div>
                <p>{message.message}</p>
              </article>
            ))}
          </div>

          <form className="refund-grid" style={{ marginTop: 24 }} onSubmit={handleReply}>
            <div className="refund-field full">
              <label htmlFor="status-reply">Add a message</label>
              <textarea id="status-reply" value={reply} onChange={(event) => setReply(event.target.value)} placeholder="Reply to the team about this request." />
            </div>
            <button className="refund-submit" type="submit" disabled={replying || !reply.trim()}>
              {replying ? "Sending..." : "Send message"}
            </button>
          </form>
        </div>
      )}
    </RefundShell>
  );
}
