import { useState } from "react";
import { useLazyQuery } from "@apollo/client/react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileSearch,
  Loader2,
  Search,
  XCircle,
} from "lucide-react";
import { Button } from "~/features/hackathon/components/ui/button";
import { getProblemById } from "~/features/hackathon/lib/data";
import { isValidNormalizedPhone, normalizeEmail, normalizePhone } from "~/features/hackathon/lib/normalize";
import { Link } from "~/features/hackathon/lib/router";
import { SOLUTION_STATUS_QUERY } from "~/features/hackathon/services";
import type { ReviewStatus, SolutionStatus } from "~/features/hackathon/types";

const statusContent: Record<ReviewStatus, {
  label: string;
  title: string;
  description: string;
  icon: typeof Clock3;
  className: string;
}> = {
  pending: {
    label: "Under review",
    title: "Your solution is being reviewed",
    description: "The UKIS team is evaluating your submission. Check this page again for an update.",
    icon: Clock3,
    className: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
  accepted: {
    label: "Selected",
    title: "Your solution has been selected",
    description: "Congratulations. Your submission has moved forward in the UKIS 2026 review process.",
    icon: CheckCircle2,
    className: "border-success/30 bg-success/10 text-success",
  },
  rejected: {
    label: "Not selected",
    title: "Your solution was not selected",
    description: "Thank you for taking part. We appreciate the work your team put into the submission.",
    icon: XCircle,
    className: "border-destructive/30 bg-destructive/10 text-destructive",
  },
};

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function normalizeContact(value: string) {
  return value.includes("@") ? normalizeEmail(value) : normalizePhone(value);
}

function isValidContact(value: string | null): value is string {
  return value != null && (value.includes("@")
    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    : isValidNormalizedPhone(value));
}

export default function SolutionStatusLookup() {
  const [contact, setContact] = useState("");
  const [result, setResult] = useState<SolutionStatus | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [findStatus, { loading }] = useLazyQuery(SOLUTION_STATUS_QUERY, {
    fetchPolicy: "network-only",
  });

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setResult(null);
    setMessage(null);

    const normalizedContact = normalizeContact(contact);
    if (!isValidContact(normalizedContact)) {
      setMessage("Enter a valid email address or 10-digit mobile number.");
      return;
    }

    try {
      const { data } = await findStatus({ variables: { contact: normalizedContact } });
      if (!data?.solutionStatus) {
        setMessage("No submission was found. Check that you entered the email or mobile number used during registration.");
        return;
      }
      setResult(data.solutionStatus);
    } catch {
      setMessage("We could not check your status right now. Please try again shortly.");
    }
  }

  const content = result ? statusContent[result.status] : null;
  const StatusIcon = content?.icon;
  const problem = result ? getProblemById(result.problemCode) : undefined;

  return (
    <section id="check-status" className="mb-16 scroll-mt-28">
      <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase text-primary">Team lead portal</p>
          <h2 className="max-w-2xl font-display text-3xl font-bold text-foreground sm:text-5xl">
            Check your solution <span className="text-brand-accent">status.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Use either the email address or mobile number entered by the team lead during registration.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="border-l-2 border-primary px-6 py-2 sm:px-8">
          <label htmlFor="solution-contact" className="block text-sm font-semibold text-foreground">
            Registered email or mobile number
          </label>
          <div className="relative mt-3">
            <FileSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={19} />
            <input
              id="solution-contact"
              type="text"
              autoComplete="username"
              value={contact}
              onChange={(event) => setContact(event.target.value)}
              placeholder="you@example.com or 9876543210"
              className="h-13 w-full rounded-lg border border-input bg-card pl-12 pr-4 text-foreground outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30"
              required
            />
          </div>
          <Button type="submit" size="lg" disabled={loading} className="mt-4 h-12 w-full rounded-lg">
            {loading ? <Loader2 className="animate-spin" /> : <Search />}
            {loading ? "Checking status..." : "Check status"}
          </Button>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Your contact detail is used only to locate the submission and is never displayed here.
          </p>
          <Link href="/team" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80">
            Edit solution or manage team <ArrowRight size={16} />
          </Link>
          {message && (
            <div role="alert" className="mt-4 flex items-start gap-2 border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 shrink-0" size={17} />
              <span>{message}</span>
            </div>
          )}
        </form>
      </div>

      {result && content && StatusIcon && (
        <div aria-live="polite" className="mt-10 border-t border-border pt-8">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <div className={`inline-flex items-center gap-2 border px-3 py-1.5 text-sm font-semibold ${content.className}`}>
                <StatusIcon size={17} />
                {content.label}
              </div>
              <p className="mt-5 text-sm text-muted-foreground">Submission ID</p>
              <p className="mt-1 font-mono text-sm font-semibold text-foreground">{result.id}</p>
              <p className="mt-5 text-sm text-muted-foreground">Submitted</p>
              <p className="mt-1 text-sm font-semibold text-foreground">{dateFormatter.format(new Date(result.createdAt))}</p>
            </div>

            <div>
              <h3 className="font-display text-3xl font-bold text-foreground">{content.title}</h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{content.description}</p>

              <dl className="mt-7 grid gap-5 border-y border-border py-6 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase text-muted-foreground">Solution</dt>
                  <dd className="mt-2 font-display text-lg font-semibold text-foreground">{result.solutionTitle}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase text-muted-foreground">Problem</dt>
                  <dd className="mt-2 font-display text-lg font-semibold text-foreground">{problem?.title ?? result.problemCode}</dd>
                </div>
              </dl>

              {problem && (
                <Button asChild variant="outline" className="mt-7 rounded-lg">
                  <Link href={`/problems/${result.problemCode}`}>View problem <ArrowRight /></Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}