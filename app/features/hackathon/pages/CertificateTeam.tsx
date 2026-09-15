import { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import {
  AlertCircle,
  Award,
  Building2,
  CheckCircle2,
  Clock3,
  Copy,
  ExternalLink,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserPlus,
  UserRound,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "~/features/hackathon/components/ui/button";
import { HACKATHON_BASE_PATH, Link } from "~/features/hackathon/lib/router";
import {
  TEAMMATE_CERTIFICATE_DEADLINE_LABEL,
  certificatePath,
  isCertificateApiUnavailable,
  isTeammateCertificateWindowOpen,
} from "~/features/hackathon/lib/certificate";
import { isValidNormalizedPhone, normalizeEmail, normalizePhone } from "~/features/hackathon/lib/normalize";
import { cleanPersonName, validateTeamMembers } from "~/features/hackathon/lib/team";
import { buildHackathonNoIndexMeta } from "~/features/hackathon/lib/seo";
import {
  ADD_CERTIFICATE_TEAM_MEMBER_MUTATION,
  CERTIFICATE_TEAM_BY_LEAD_QUERY,
} from "~/features/hackathon/services";
import type { CertificateTeam as CertificateTeamData, CertificateTeamMember } from "~/features/hackathon/types";

export const meta = () => buildHackathonNoIndexMeta(
  "Teammate Certificates · UKIS 2026",
  "Registered team leads can generate UKIS Hackathon 2026 participation certificates for their teammates.",
);

const inputClass =
  "h-12 w-full rounded-xl border border-input bg-card pl-11 pr-4 text-foreground outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30 aria-invalid:border-destructive read-only:bg-muted/50";

const initialMember = { fullName: "", email: "", phone: "", institution: "", course: "", city: "" };
type MemberForm = typeof initialMember;

function teamErrorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message.toLowerCase() : "";
  if (isCertificateApiUnavailable(error)) return "Teammate certificates are being set up. Please try again shortly.";
  if (message.includes("closed")) return `Teammate certificates closed on ${TEAMMATE_CERTIFICATE_DEADLINE_LABEL}.`;
  if (message.includes("not registered")) return "We could not find a hackathon registration with these details.";
  if (message.includes("do not match")) return "The email or mobile number does not match the registration.";
  if (message.includes("not the team lead")) return "Only the person who submitted the team's registration can add teammates. Ask your team lead to do this.";
  if (message.includes("team is full")) return "Your team already has the maximum of 4 people.";
  if (message.includes("already")) return "This person has already participated, either solo or in another team. Each person can take part only once.";
  return "Something went wrong. Please try again.";
}

function copyLink(hash: string) {
  const url = `${window.location.origin}${HACKATHON_BASE_PATH}${certificatePath(hash)}`;
  navigator.clipboard.writeText(url).then(
    () => toast.success("Certificate link copied. Share it with your teammate."),
    () => toast.error("Could not copy the link."),
  );
}

export default function CertificateTeam() {
  const windowOpen = isTeammateCertificateWindowOpen();
  const [lead, setLead] = useState({ email: "", phone: "" });
  const [verifiedLead, setVerifiedLead] = useState<{ leadEmail: string; leadPhone: string } | null>(null);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [team, setTeam] = useState<CertificateTeamData | null>(null);
  const [findTeam, { loading: verifying }] = useLazyQuery(CERTIFICATE_TEAM_BY_LEAD_QUERY, { fetchPolicy: "network-only" });

  const [member, setMember] = useState<MemberForm>(initialMember);
  const [lockedName, setLockedName] = useState(false);
  const [memberErrors, setMemberErrors] = useState<Partial<Record<keyof MemberForm, string>>>({});
  const [confirmed, setConfirmed] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [addMember, { loading: adding }] = useMutation(ADD_CERTIFICATE_TEAM_MEMBER_MUTATION);

  async function handleVerify(event: React.FormEvent) {
    event.preventDefault();
    setVerifyError(null);
    const leadEmail = normalizeEmail(lead.email);
    const leadPhone = normalizePhone(lead.phone);
    if (!/^\S+@\S+\.\S+$/.test(leadEmail) || !isValidNormalizedPhone(leadPhone)) {
      setVerifyError("Enter the email and 10-digit mobile number used to register the team.");
      return;
    }
    try {
      const { data, error } = await findTeam({ variables: { input: { leadEmail, leadPhone: leadPhone! } } });
      if (error) throw error;
      if (!data?.certificateTeamByLead) throw new Error("not registered");
      setVerifiedLead({ leadEmail, leadPhone: leadPhone! });
      setTeam(data.certificateTeamByLead);
      setFormOpen(data.certificateTeamByLead.members.length === 0);
    } catch (error) {
      setVerifyError(teamErrorMessage(error));
    }
  }

  function updateMember(field: keyof MemberForm, value: string) {
    setMember((current) => ({ ...current, [field]: value }));
    setMemberErrors((current) => ({ ...current, [field]: undefined }));
  }

  function openForm(existing?: CertificateTeamMember) {
    setMember({ ...initialMember, fullName: existing?.fullName ?? "" });
    setLockedName(Boolean(existing));
    setMemberErrors({});
    setConfirmed(false);
    setFormOpen(true);
  }

  async function handleAddMember(event: React.FormEvent) {
    event.preventDefault();
    if (!verifiedLead || !team) return;

    const [contactErrors] = validateTeamMembers(
      { email: verifiedLead.leadEmail, phone: verifiedLead.leadPhone },
      [member],
    );
    const next: Partial<Record<keyof MemberForm, string>> = { ...contactErrors };
    if (member.institution.trim().length < 2) next.institution = "Enter their school, college, university, or organisation.";
    if (member.city.trim().length < 2) next.city = "Enter their city.";
    setMemberErrors(next);
    if (Object.values(next).some(Boolean)) return;
    if (!confirmed) {
      toast.error("Please confirm this person was part of your team.");
      return;
    }

    try {
      const { data } = await addMember({ variables: { input: {
        ...verifiedLead,
        fullName: cleanPersonName(member.fullName),
        email: normalizeEmail(member.email),
        phone: normalizePhone(member.phone) ?? "",
        institution: member.institution.trim(),
        course: member.course.trim() || null,
        city: member.city.trim(),
      } } });
      const added = data?.addCertificateTeamMember;
      if (!added) throw new Error("The certificate could not be created.");
      setTeam((current) => current && {
        ...current,
        members: current.members.some((m) => m.id === added.id)
          ? current.members.map((m) => (m.id === added.id ? added : m))
          : [...current.members, added],
      });
      setMember(initialMember);
      setConfirmed(false);
      setFormOpen(false);
      toast.success(`Certificate created for ${added.fullName}.`);
    } catch (error) {
      toast.error(teamErrorMessage(error));
    }
  }

  if (!windowOpen) {
    return (
      <div className="container flex min-h-[75vh] max-w-2xl items-center pt-24 pb-16">
        <div className="w-full rounded-3xl border border-border bg-card p-8 text-center sm:p-12">
          <Clock3 className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-5 font-display text-3xl font-bold">Teammate certificates have closed</h1>
          <p className="mt-4 text-muted-foreground">
            Team leads could add teammates until {TEAMMATE_CERTIFICATE_DEADLINE_LABEL}. Certificates that were already
            created can still be opened with the teammate's email.
          </p>
          <Button asChild size="lg" className="mt-7 rounded-xl"><Link href="/certificate">Get my certificate</Link></Button>
        </div>
      </div>
    );
  }

  const spotsLeft = team ? team.maxMembers - team.members.length : 0;

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container max-w-3xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"><Users size={17} /> Team certificates</span>
          <h1 className="mt-5 font-display text-4xl font-bold sm:text-5xl">Certificates for your whole team</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            If you registered your team's solution, you can create a participation certificate for each teammate here.
            Teams can have up to 4 people, including you.
          </p>
        </div>
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm">
          <Clock3 className="mt-0.5 shrink-0 text-primary" size={18} />
          <p><strong>Open until:</strong> {TEAMMATE_CERTIFICATE_DEADLINE_LABEL}</p>
        </div>

        {!team ? (
          <form onSubmit={handleVerify} className="mt-7 rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-9">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><ShieldCheck size={20} /></div>
              <div>
                <h2 className="font-display text-xl font-bold">Confirm you are the team lead</h2>
                <p className="text-sm text-muted-foreground">Use the email and mobile number from your hackathon registration.</p>
              </div>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="lead-email" className="mb-2 block text-sm font-semibold">Registered email <span className="text-destructive">*</span></label>
                <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} /><input id="lead-email" type="email" autoComplete="email" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} placeholder="you@example.com" className={inputClass} required /></div>
              </div>
              <div>
                <label htmlFor="lead-phone" className="mb-2 block text-sm font-semibold">Registered mobile <span className="text-destructive">*</span></label>
                <div className="relative"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} /><input id="lead-phone" type="tel" autoComplete="tel" value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} placeholder="10-digit mobile number" className={inputClass} required /></div>
              </div>
            </div>
            {verifyError && (
              <div role="status" aria-live="polite" className="mt-5 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="mt-0.5 shrink-0" size={17} /><span>{verifyError}</span>
              </div>
            )}
            <Button type="submit" size="lg" disabled={verifying} className="mt-6 h-12 w-full rounded-xl text-base">
              {verifying ? <Loader2 className="animate-spin" /> : <ShieldCheck />}{verifying ? "Checking registration…" : "Continue"}
            </Button>
            <p className="mt-4 text-center text-xs text-muted-foreground">Not the team lead? Ask them to add you, then use <Link href="/certificate" className="font-semibold text-primary hover:underline">Get my certificate</Link> with your own email.</p>
          </form>
        ) : (
          <div className="mt-7 space-y-6">
            <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">{team.problemCode}</p>
              <h2 className="mt-1 font-display text-2xl font-bold">{team.solutionTitle}</h2>
              <ul className="mt-6 divide-y divide-border rounded-2xl border border-border">
                <li className="flex flex-wrap items-center justify-between gap-3 p-4">
                  <div>
                    <p className="font-semibold">{team.leadName} <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Team lead</span></p>
                    <p className="text-sm text-muted-foreground">{team.leadCertificate ? "Certificate ready" : "No certificate created"}</p>
                  </div>
                  {team.leadCertificate && (
                    <Button asChild variant="outline" size="sm" className="rounded-lg"><Link href={certificatePath(team.leadCertificate.hash)}><ExternalLink /> Open</Link></Button>
                  )}
                </li>
                {team.members.map((m) => (
                  <li key={m.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                    <div>
                      <p className="font-semibold">{m.fullName}</p>
                      <p className="text-sm text-muted-foreground">{m.emailHint} · {m.certificate ? <span className="text-success">Certificate ready</span> : "Certificate not created yet"}</p>
                    </div>
                    {m.certificate ? (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-lg" onClick={() => copyLink(m.certificate!.hash)}><Copy /> Copy link</Button>
                        <Button asChild variant="outline" size="sm" className="rounded-lg"><Link href={certificatePath(m.certificate.hash)}><ExternalLink /> Open</Link></Button>
                      </div>
                    ) : (
                      <Button size="sm" className="rounded-lg" onClick={() => openForm(m)}><Award /> Create certificate</Button>
                    )}
                  </li>
                ))}
              </ul>
              {spotsLeft > 0 && !formOpen && (
                <Button size="lg" variant="outline" className="mt-5 w-full rounded-xl" onClick={() => openForm()}>
                  <UserPlus /> Add a teammate ({spotsLeft} {spotsLeft === 1 ? "place" : "places"} left)
                </Button>
              )}
              {spotsLeft === 0 && <p className="mt-5 text-center text-sm text-muted-foreground">Your team is complete with 4 people.</p>}
            </section>

            {formOpen && (spotsLeft > 0 || lockedName) && (
              <form onSubmit={handleAddMember} className="rounded-3xl border border-primary/20 bg-card p-6 shadow-xl shadow-primary/5 sm:p-9">
                <h2 className="font-display text-xl font-bold">{lockedName ? `Create certificate for ${member.fullName}` : "Add a teammate"}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Their certificate is created right away. They can open it later from the certificate page using this email.
                </p>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {([
                    { key: "fullName", label: "Full name", placeholder: "Name to print on certificate", icon: UserRound, type: "text", required: true },
                    { key: "email", label: "Email address", placeholder: "teammate@example.com", icon: Mail, type: "email", required: true },
                    { key: "phone", label: "Mobile / WhatsApp", placeholder: "10-digit mobile number", icon: Phone, type: "tel", required: true },
                    { key: "institution", label: "Institution / organisation", placeholder: "College, university, school or organisation", icon: Building2, type: "text", required: true },
                    { key: "course", label: "Course / programme", placeholder: "Optional", icon: Award, type: "text", required: false },
                    { key: "city", label: "City", placeholder: "Their city", icon: MapPin, type: "text", required: true },
                  ] as const).map(({ key, label, placeholder, icon: Icon, type, required }) => (
                    <div key={key} className={key === "institution" ? "sm:col-span-2" : ""}>
                      <label htmlFor={`member-${key}`} className="mb-2 block text-sm font-semibold">{label}{required && <span className="text-destructive"> *</span>}</label>
                      <div className="relative">
                        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input id={`member-${key}`} type={type} autoComplete="off" value={member[key]} readOnly={key === "fullName" && lockedName} onChange={(e) => updateMember(key, e.target.value)} placeholder={placeholder} aria-invalid={Boolean(memberErrors[key])} className={inputClass} required={required} />
                      </div>
                      {memberErrors[key] && <p className="mt-2 text-xs text-destructive">{memberErrors[key]}</p>}
                    </div>
                  ))}
                </div>
                {lockedName && <p className="mt-3 text-xs text-muted-foreground">Enter the email and mobile you gave for this teammate when you registered.</p>}
                <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl bg-muted/60 p-4 text-sm text-muted-foreground">
                  <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 rounded border-border" />
                  <span>
                    I confirm this person was part of my team and has not entered solo or in another team.
                    <strong className="text-foreground"> Teammates can't be changed or removed once added.</strong>
                  </span>
                </label>
                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
                  <Button type="button" variant="outline" size="lg" className="h-12 rounded-xl" onClick={() => setFormOpen(false)} disabled={adding}>Cancel</Button>
                  <Button type="submit" size="lg" disabled={adding} className="h-12 flex-1 rounded-xl text-base">
                    {adding ? <Loader2 className="animate-spin" /> : <CheckCircle2 />}{adding ? "Creating certificate…" : "Create certificate"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
