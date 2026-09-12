import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { Award, Building2, CheckCircle2, Clock3, Loader2, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Button } from "~/features/hackathon/components/ui/button";
import { Link, useLocation } from "~/features/hackathon/lib/router";
import { CERTIFICATE_DEADLINE_LABEL, certificatePath, isCertificateApiUnavailable, isCertificateRegistrationOpen, normalizeCertificateEmail } from "~/features/hackathon/lib/certificate";
import { normalizePhone, isValidNormalizedPhone } from "~/features/hackathon/lib/normalize";
import { buildHackathonNoIndexMeta } from "~/features/hackathon/lib/seo";
import { REGISTER_CERTIFICATE_PARTICIPANT_MUTATION } from "~/features/hackathon/services";

export const meta = () => buildHackathonNoIndexMeta("Register for your UKIS Participation Certificate", "Submit participant details to generate a UKIS Hackathon 2026 certificate.");

const initialForm = { fullName: "", email: "", phone: "", institution: "", course: "", city: "" };

export default function CertificateRegistration() {
  const [, navigate] = useLocation();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registerParticipant, { loading }] = useMutation(REGISTER_CERTIFICATE_PARTICIPANT_MUTATION);
  const registrationOpen = isCertificateRegistrationOpen();

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  }

  function validate() {
    const next: Record<string, string> = {};
    if (form.fullName.trim().length < 2) next.fullName = "Enter your full name as it should appear on the certificate.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = "Enter a valid email address.";
    if (!isValidNormalizedPhone(normalizePhone(form.phone))) next.phone = "Enter a valid 10-digit mobile number.";
    if (form.institution.trim().length < 2) next.institution = "Enter your school, college, university, or organisation.";
    if (form.city.trim().length < 2) next.city = "Enter your city.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!isCertificateRegistrationOpen()) {
      toast.error("Certificate registration has closed.");
      return;
    }
    if (!validate()) return;

    try {
      const { data } = await registerParticipant({ variables: { input: {
        fullName: form.fullName.trim().replace(/\s+/g, " "),
        email: normalizeCertificateEmail(form.email),
        phone: normalizePhone(form.phone) ?? "",
        institution: form.institution.trim(),
        course: form.course.trim() || null,
        city: form.city.trim(),
      } } });
      if (!data?.registerCertificateParticipant) throw new Error("The certificate could not be created.");
      navigate(certificatePath(data.registerCertificateParticipant.hash));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Registration failed. Please try again.";
      toast.error(
        message.toLowerCase().includes("not registered")
          ? "You are not registered. Please register first to get a participation certificate."
          : message.toLowerCase().includes("do not match")
            ? "Your email or mobile number does not match your hackathon registration."
            : message.toLowerCase().includes("already")
          ? "A certificate already exists for this email or mobile number. Use ‘Get my certificate’ instead."
          : isCertificateApiUnavailable(error)
            ? "Certificate registration is being set up. Please try again shortly."
            : "We could not complete your registration. Please try again.",
      );
    }
  }

  if (!registrationOpen) {
    return <div className="container flex min-h-[75vh] max-w-2xl items-center pt-24 pb-16"><div className="w-full rounded-3xl border border-border bg-card p-8 text-center sm:p-12"><Clock3 className="mx-auto h-12 w-12 text-primary" /><h1 className="mt-5 font-display text-3xl font-bold">Certificate registration has closed</h1><p className="mt-4 text-muted-foreground">The form closed on {CERTIFICATE_DEADLINE_LABEL}. If you already registered, you can still retrieve your certificate.</p><Button asChild size="lg" className="mt-7 rounded-xl"><Link href="/certificate">Get my certificate</Link></Button></div></div>;
  }

  const fields = [
    { key: "fullName", label: "Full name", placeholder: "Name to print on certificate", icon: UserRound, type: "text", required: true },
    { key: "email", label: "Email address", placeholder: "you@example.com", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Mobile / WhatsApp", placeholder: "10-digit mobile number", icon: Phone, type: "tel", required: true },
    { key: "institution", label: "Institution / organisation", placeholder: "College, university, school or organisation", icon: Building2, type: "text", required: true },
    { key: "course", label: "Course / programme", placeholder: "Optional", icon: Award, type: "text", required: false },
    { key: "city", label: "City", placeholder: "Your city", icon: MapPin, type: "text", required: true },
  ] as const;

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container max-w-3xl">
        <div className="text-center"><span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"><Award size={17} /> Certificate of Participation</span><h1 className="mt-5 font-display text-4xl font-bold sm:text-5xl">Add your participant details</h1><p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Use accurate details. Your name will appear exactly as entered and the email will be used to retrieve your certificate later.</p></div>
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm"><Clock3 className="mt-0.5 shrink-0 text-primary" size={18} /><p><strong>Form closes:</strong> {CERTIFICATE_DEADLINE_LABEL}</p></div>
        <form onSubmit={handleSubmit} className="mt-7 rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-9">
          <div className="grid gap-6 sm:grid-cols-2">
            {fields.map(({ key, label, placeholder, icon: Icon, type, required }) => (
              <div key={key} className={key === "institution" ? "sm:col-span-2" : ""}>
                <label htmlFor={key} className="mb-2 block text-sm font-semibold">{label}{required && <span className="text-destructive"> *</span>}</label>
                <div className="relative"><Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} /><input id={key} type={type} value={form[key]} onChange={(event) => update(key, event.target.value)} placeholder={placeholder} autoComplete={key === "fullName" ? "name" : key === "email" ? "email" : key === "phone" ? "tel" : key === "city" ? "address-level2" : undefined} aria-invalid={Boolean(errors[key])} className="h-12 w-full rounded-xl border border-input bg-card pl-11 pr-4 text-foreground outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30 aria-invalid:border-destructive" required={required} /></div>
                {errors[key] && <p className="mt-2 text-xs text-destructive">{errors[key]}</p>}
              </div>
            ))}
          </div>
          <div className="mt-7 flex items-start gap-3 rounded-xl bg-muted/60 p-4 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 shrink-0 text-success" size={18} /><p>By submitting, you confirm these details are yours and consent to their storage for certificate issuance and verification.</p></div>
          <Button type="submit" size="lg" disabled={loading} className="mt-7 h-12 w-full rounded-xl text-base">{loading ? <Loader2 className="animate-spin" /> : <Award />}{loading ? "Creating certificate…" : "Generate my certificate"}</Button>
          <p className="mt-4 text-center text-xs text-muted-foreground">Already registered? <Link href="/certificate" className="font-semibold text-primary hover:underline">Retrieve your certificate</Link></p>
        </form>
      </div>
    </div>
  );
}
