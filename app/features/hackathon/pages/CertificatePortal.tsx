import { useState } from "react";
import { useLazyQuery } from "@apollo/client/react";
import { AlertCircle, ArrowRight, Award, CalendarClock, CheckCircle2, Eye, Loader2, Mail, Search } from "lucide-react";
import { Button } from "~/features/hackathon/components/ui/button";
import { Link, useLocation } from "~/features/hackathon/lib/router";
import {
  CERTIFICATE_DEADLINE_LABEL,
  certificatePath,
  isCertificateRegistrationOpen,
  isCertificateApiUnavailable,
  normalizeCertificateEmail,
} from "~/features/hackathon/lib/certificate";
import { buildHackathonNoIndexMeta } from "~/features/hackathon/lib/seo";
import { CERTIFICATE_LOOKUP_BY_EMAIL_QUERY } from "~/features/hackathon/services";

export const meta = () => buildHackathonNoIndexMeta(
  "Get your UKIS 2026 Participation Certificate",
  "Register for or retrieve your UKIS Hackathon 2026 certificate of participation.",
);

export default function CertificatePortal() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [lookupMessage, setLookupMessage] = useState<{ text: string; success: boolean } | null>(null);
  const [findCertificate, { loading }] = useLazyQuery(CERTIFICATE_LOOKUP_BY_EMAIL_QUERY, {
    fetchPolicy: "network-only",
  });
  const registrationOpen = isCertificateRegistrationOpen();

  async function handleLookup(event: React.FormEvent) {
    event.preventDefault();
    const normalizedEmail = normalizeCertificateEmail(email);
    setLookupMessage(null);
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setLookupMessage({ text: "Enter the email address you used to register.", success: false });
      return;
    }

    try {
      const { data } = await findCertificate({ variables: { email: normalizedEmail } });
      const result = data?.certificateLookupByEmail;
      if (!result?.registered) {
        setLookupMessage({
          text: "You are not registered. Please register first to get a participation certificate.",
          success: false,
        });
        return;
      }
      if (!result.certificate) {
        setLookupMessage({
          text: "Your hackathon registration is confirmed, but your certificate has not been generated yet. Use ‘Register now’ to create it.",
          success: true,
        });
        return;
      }
      navigate(certificatePath(result.certificate.hash));
    } catch (error) {
      setLookupMessage({
        text: isCertificateApiUnavailable(error)
          ? "Certificate service is being set up. Please try again shortly."
          : "We could not retrieve a certificate right now. Please try again.",
        success: false,
      });
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden pt-28 pb-20">
      <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: "radial-gradient(circle at 15% 15%, color-mix(in srgb, var(--primary) 17%, transparent), transparent 32%), radial-gradient(circle at 90% 70%, color-mix(in srgb, var(--brand-himalayan-cyan) 14%, transparent), transparent 30%)" }} />
      <div className="container relative z-10">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Your participation deserves to be <span className="text-brand-accent">celebrated.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Get your official Certificate of Participation for the Uttarakhand Innovation &amp; Solutions Hackathon 2026.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <section className="rounded-3xl border border-border bg-card p-7 sm:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><CalendarClock /></div>
              <h2 className="mt-6 font-display text-2xl font-bold text-foreground">{registrationOpen ? "Register for your certificate" : "Registration has closed"}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {registrationOpen
                  ? "Add your participant details before the deadline. Your certificate will be created instantly with a private, shareable link."
                  : `New certificate registrations closed on ${CERTIFICATE_DEADLINE_LABEL}. Existing certificates remain available.`}
              </p>
              <div className="mt-6 rounded-xl border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
                <strong className="text-foreground">Registration deadline</strong><br />{CERTIFICATE_DEADLINE_LABEL}
              </div>
              {registrationOpen && (
                <Button asChild size="lg" className="mt-7 w-full rounded-xl">
                  <Link href="/certificate/register">Register now <ArrowRight /></Link>
                </Button>
              )}
            </section>

            <section className="rounded-3xl border border-primary/20 bg-card p-7 shadow-xl shadow-primary/5 sm:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Search /></div>
              <h2 className="mt-6 font-display text-2xl font-bold text-foreground">Already registered?</h2>
              <p className="mt-3 text-muted-foreground">Enter the same email address you used during registration to open your certificate.</p>
              <form onSubmit={handleLookup} className="mt-7 space-y-4">
                <label htmlFor="certificate-email" className="block text-sm font-semibold text-foreground">Registered email address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input id="certificate-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="h-12 w-full rounded-xl border border-input bg-card pl-11 pr-4 text-foreground outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30" required />
                </div>
                <Button type="submit" size="lg" disabled={loading} className="h-12 w-full rounded-xl">
                  {loading ? <Loader2 className="animate-spin" /> : <Award />} {loading ? "Finding certificate…" : "Get my certificate"}
                </Button>
                {lookupMessage && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`flex items-start gap-2 rounded-xl border p-3 text-sm leading-relaxed ${
                      lookupMessage.success
                        ? "border-success/30 bg-success/10 text-foreground"
                        : "border-destructive/30 bg-destructive/10 text-destructive"
                    }`}
                  >
                    {lookupMessage.success
                      ? <CheckCircle2 className="mt-0.5 shrink-0" size={17} />
                      : <AlertCircle className="mt-0.5 shrink-0" size={17} />}
                    <span>{lookupMessage.text}</span>
                  </div>
                )}
              </form>
              <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">Your email is used only to locate your registration. Your shareable page does not display it.</p>
            </section>
          </div>
          <div className="mt-7 text-center">
            <Button asChild variant="outline" size="lg" className="rounded-xl">
              <Link href="/certificate/preview"><Eye /> Preview certificate design</Link>
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">No registration or email is required to view the sample.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
