import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

/**
 * Page chrome shared by the refund request form and the ticket lookup, so both
 * match the delegate pass / nomination pages they follow on from.
 */
export function RefundShell({
  kicker,
  title,
  intro,
  children,
}: {
  kicker: string;
  title: ReactNode;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="refund-page">
      <style>{`
        .refund-page {
          --ink:#15171A; --muted:#676C73; --line:#DDE3E5;
          --gradient:linear-gradient(135deg,#B7D933 0%,#67C85A 25%,#17B6B8 52%,#2D7DBB 78%,#2C4F96 100%);
          min-height:100vh; color:var(--ink); background:#F7FAFA; font-family:"Montserrat",sans-serif; font-size:16px;
        }
        .refund-page * { box-sizing:border-box; }
        .refund-page a { color:inherit; text-decoration:none; }
        .refund-shell { width:min(1180px,calc(100% - 48px)); margin:0 auto; }
        .refund-nav { position:sticky; top:0; z-index:20; border-bottom:1px solid rgba(221,227,229,.85); background:rgba(255,255,255,.92); backdrop-filter:blur(16px); }
        .refund-nav-inner { min-height:82px; display:flex; align-items:center; justify-content:space-between; gap:24px; }
        .refund-brand { width:fit-content; display:flex; align-items:center; gap:6px; }
        .refund-itda { width:39px; height:39px; object-fit:contain; }
        .refund-logo { width:auto; height:68px; object-fit:contain; }
        .refund-back { display:inline-flex; align-items:center; gap:8px; color:#227684; font-size:13px; font-weight:700; }
        .refund-back svg { width:18px; height:18px; }
        .refund-hero { position:relative; overflow:hidden; padding:70px 0 108px; background:#fff; }
        .refund-hero-inner { position:relative; z-index:1; max-width:820px; }
        .refund-kicker { margin:0; color:#128F9D; font-size:12px; font-weight:800; letter-spacing:.14em; text-transform:uppercase; }
        .refund-hero h1 { margin:14px 0 0; font-size:clamp(36px,5vw,58px); line-height:1.05; font-weight:800; }
        .refund-hero h1 span { background:var(--gradient); color:transparent; background-clip:text; -webkit-background-clip:text; }
        .refund-hero-copy { max-width:660px; margin:20px 0 0; color:var(--muted); font-size:16px; line-height:1.75; }
        .refund-main { position:relative; z-index:2; margin-top:-58px; padding-bottom:88px; }
        .refund-card { padding:34px; border:1px solid var(--line); border-radius:8px; background:#fff; box-shadow:0 18px 48px rgba(44,79,150,.09); }
        .refund-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:20px 18px; align-items:start; }
        .refund-field { min-width:0; display:grid; grid-template-rows:18px auto; gap:8px; }
        .refund-field.full { grid-column:1/-1; }
        .refund-field label { display:flex; align-items:center; font-size:12px; font-weight:700; line-height:18px; }
        .refund-field input, .refund-field select, .refund-field textarea { width:100%; min-width:0; margin:0; padding:13px 14px; border:1px solid #D6DCDD; border-radius:7px; color:var(--ink); background:#fff; font:inherit; font-size:13px; outline:0; }
        .refund-field input, .refund-field select { height:48px; padding:0 14px; }
        .refund-field textarea { min-height:120px; resize:vertical; line-height:1.6; }
        .refund-field input:focus, .refund-field select:focus, .refund-field textarea:focus { border-color:#17A9AB; box-shadow:0 0 0 3px rgba(23,182,184,.11); }
        .refund-hint { margin:0; color:var(--muted); font-size:11px; line-height:1.5; }
        .refund-submit { grid-column:1/-1; width:100%; min-height:52px; border:0; border-radius:8px; color:#fff; background:var(--gradient); font:inherit; font-size:14px; font-weight:800; cursor:pointer; }
        .refund-submit:disabled { cursor:wait; opacity:.7; }
        .refund-error { grid-column:1/-1; margin:0; color:#B42318; font-size:12px; text-align:center; }
        .refund-success { padding:44px 20px; text-align:center; }
        .refund-success-icon { width:64px; height:64px; margin:0 auto; display:grid; place-items:center; border-radius:50%; color:#fff; background:var(--gradient); }
        .refund-success h2 { margin:22px 0 0; font-size:30px; }
        .refund-success > p { max-width:480px; margin:12px auto 24px; color:var(--muted); line-height:1.7; }
        .refund-ticket-box { display:grid; gap:4px; max-width:420px; margin:0 auto 24px; padding:14px 16px; border:1px dashed #C9D6D8; border-radius:8px; background:#F7FAFA; font-size:11px; color:var(--muted); }
        .refund-ticket-box strong { color:var(--ink); font-size:17px; font-family:ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing:.02em; }
        .refund-status-row { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:14px; padding-bottom:20px; margin-bottom:22px; border-bottom:1px solid #EDF0F1; }
        .refund-status-row h2 { margin:0; font-size:20px; }
        .refund-status-row p { margin:4px 0 0; color:var(--muted); font-size:12px; }
        .refund-badge { padding:7px 12px; border-radius:999px; font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:.04em; }
        .refund-badge.open { color:#8A6100; background:#FFF4D6; }
        .refund-badge.in_review { color:#1F5EA8; background:#E4EFFC; }
        .refund-badge.approved { color:#186B45; background:#DFF5E9; }
        .refund-badge.refunded { color:#186B45; background:#DFF5E9; }
        .refund-badge.rejected { color:#A32018; background:#FDE7E5; }
        .refund-thread { display:grid; gap:14px; }
        .refund-message { padding:15px 17px; border-radius:10px; border:1px solid var(--line); background:#fff; }
        .refund-message.admin { border-color:#CCE7EA; background:#F2FAFB; }
        .refund-message-top { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:7px; }
        .refund-message-who { font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:.06em; }
        .refund-message.admin .refund-message-who { color:#128F9D; }
        .refund-message-when { color:var(--muted); font-size:11px; }
        .refund-message p { margin:0; font-size:13px; line-height:1.65; white-space:pre-wrap; }
        .refund-empty { padding:34px 20px; text-align:center; color:var(--muted); font-size:13px; }
        .refund-alt { margin:22px 0 0; color:var(--muted); font-size:12px; text-align:center; }
        .refund-alt a { color:#128F9D; font-weight:700; text-decoration:underline; }
        .refund-footer { padding:26px 0; border-top:1px solid var(--line); color:var(--muted); background:#fff; font-size:11px; }
        .refund-footer-inner { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:12px 20px; }
        .refund-footer-links { display:flex; flex-wrap:wrap; gap:6px 18px; }
        .refund-footer-links a { color:#227684; font-weight:600; }
        .refund-footer-links a:hover { text-decoration:underline; }
        @media (max-width:640px) {
          .refund-shell { width:min(100% - 32px,1180px); }
          .refund-nav-inner { min-height:72px; gap:12px; }
          .refund-itda { width:29px; height:29px; }
          .refund-logo { height:54px; }
          .refund-back span { display:none; }
          .refund-hero { padding:56px 0 96px; }
          .refund-card { padding:24px 18px; }
          .refund-grid { grid-template-columns:1fr; }
          .refund-field.full, .refund-submit, .refund-error { grid-column:auto; }
          .refund-footer-inner { flex-direction:column; }
        }
      `}</style>

      <nav className="refund-nav" aria-label="Refund navigation">
        <div className="refund-shell refund-nav-inner">
          <a className="refund-brand" href="/DevbhoomiAISummit" aria-label="Devbhoomi AI Summit home">
            <img className="refund-itda" src="/itda_without_background.png" alt="Information Technology Development Agency" />
            <img className="refund-logo" src="/images/devbhoomi-ai/summit-logo.png" alt="Devbhoomi AI Summit 2026" />
          </a>
          <a className="refund-back" href="/DevbhoomiAISummit"><ArrowLeft /><span>Back to Summit</span></a>
        </div>
      </nav>

      <header className="refund-hero">
        <div className="refund-shell refund-hero-inner">
          <p className="refund-kicker">{kicker}</p>
          <h1>{title}</h1>
          <p className="refund-hero-copy">{intro}</p>
        </div>
      </header>

      <main className="refund-shell refund-main">{children}</main>

      <footer className="refund-footer">
        <div className="refund-shell refund-footer-inner">
          <span>© 2026 Devbhoomi AI Summit. All rights reserved.</span>
          <nav className="refund-footer-links" aria-label="Policies and support">
            <a href="/refund-request">Get help</a>
            <a href="/refund-status">Track a request</a>
            <a href="/refund-policy">Refund policy</a>
            <a href="/terms-and-conditions">Terms</a>
            <a href="/privacy-policy">Privacy</a>
            <a href="/support">Support</a>
          </nav>
          <span>Questions? info@axocom.in</span>
        </div>
      </footer>
    </div>
  );
}

export const REFUND_STATUS_LABELS: Record<string, string> = {
  open: "Open",
  in_review: "Under review",
  approved: "Approved",
  rejected: "Rejected",
  refunded: "Refunded",
};

export const formatDateTime = (value: string) =>
  new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
