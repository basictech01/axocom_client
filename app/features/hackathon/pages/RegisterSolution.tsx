/**
 * Register Solution Page - Kinetic Dark design
 * Multi-step animated form with progress indicator
 * Fields: select problem (skipped when arriving from a problem page),
 * solution title, description, prototype URL, owner details, consent
 */
import { useEffect, useMemo, useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useSearchParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "~/features/hackathon/lib/router";
import { ArrowRight, Check, AlertCircle, Loader2, Plus, Trash2, UsersRound } from "lucide-react";
import { getProblemById, problems } from "~/features/hackathon/lib/data";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";
import { toast } from "sonner";
import { normalizeEmail, normalizePhone, isValidNormalizedPhone } from "~/features/hackathon/lib/normalize";
import { MAX_TEAM_SIZE } from "~/features/hackathon/lib/participation";
import { WhatsAppCommunityCta } from "~/features/hackathon/components/WhatsAppCommunityCta";
import RegisterAsideImage from "~/features/hackathon/components/RegisterAsideImage";
import { PARTICIPATION_RULE_SUMMARY } from "~/features/hackathon/lib/participation";
import { buildParticipantRegistrationSeoMeta } from "~/features/hackathon/lib/seo";
import {
  ADD_SOLUTION_TEAM_MEMBER_MUTATION,
  SUBMIT_SOLUTION_MUTATION,
} from "~/features/hackathon/services";
import type { SolutionTeamMemberInput } from "~/features/hackathon/types";

export const meta = buildParticipantRegistrationSeoMeta;

const steps = [
  { id: 1, label: "Problem" },
  { id: 2, label: "Solution" },
  { id: 3, label: "Details" },
  { id: 4, label: "Consent" },
];

export default function RegisterSolution() {
  const [searchParams] = useSearchParams();
  const problemFromQuery = searchParams.get("problem")?.trim() || "";
  const preselectedProblem = useMemo(
    () => (problemFromQuery ? getProblemById(problemFromQuery) : undefined),
    [problemFromQuery],
  );
  const hasPreselectedProblem = Boolean(preselectedProblem);
  const minStep = hasPreselectedProblem ? 2 : 1;

  const [submitSolution] = useMutation(SUBMIT_SOLUTION_MUTATION);
  const [addTeamMember] = useMutation(ADD_SOLUTION_TEAM_MEMBER_MUTATION);
  const [currentStep, setCurrentStep] = useState(minStep);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { ref } = useScrollReveal();

  const [formData, setFormData] = useState({
    problemId: preselectedProblem?.id ?? "",
    solutionTitle: "",
    description: "",
    prototypeUrl: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    acceptConsent: false,
  });
  const [teamMembers, setTeamMembers] = useState<SolutionTeamMemberInput[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (preselectedProblem) {
      setFormData((prev) => ({ ...prev, problemId: preselectedProblem.id }));
      setCurrentStep((step) => Math.max(step, 2));
      setErrors({});
      return;
    }

    // Arrived without a problem (or chose "different problem"): show picker
    if (!problemFromQuery) {
      setFormData((prev) => ({ ...prev, problemId: "" }));
      setCurrentStep(1);
      setErrors({});
    }
  }, [preselectedProblem, problemFromQuery]);

  function validateStep(step: number): boolean {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.problemId) newErrors.problemId = "Please select a problem";
    } else if (step === 2) {
      if (!formData.solutionTitle.trim()) newErrors.solutionTitle = "Solution title is required";
      if (!formData.description.trim()) newErrors.description = "Description is required";
      if (formData.prototypeUrl && !formData.prototypeUrl.startsWith("https://")) {
        newErrors.prototypeUrl = "Prototype URL must start with https://";
      }
    } else if (step === 3) {
      if (!formData.ownerName.trim()) newErrors.ownerName = "Full name is required";
      if (!formData.ownerEmail.trim()) newErrors.ownerEmail = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.ownerEmail)) newErrors.ownerEmail = "Invalid email format";
      if (!formData.ownerPhone.trim()) newErrors.ownerPhone = "Phone / WhatsApp is required";
      else if (!isValidNormalizedPhone(normalizePhone(formData.ownerPhone))) {
        newErrors.ownerPhone = "Enter a valid 10-digit mobile number";
      }
      teamMembers.forEach((member, index) => {
        const prefix = `member-${index}`;
        if (!member.fullName.trim()) newErrors[`${prefix}-fullName`] = "Full name is required";
        if (!member.email.trim()) newErrors[`${prefix}-email`] = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(member.email)) newErrors[`${prefix}-email`] = "Invalid email format";
        if (!member.phone.trim()) newErrors[`${prefix}-phone`] = "Mobile number is required";
        else if (!isValidNormalizedPhone(normalizePhone(member.phone))) {
          newErrors[`${prefix}-phone`] = "Enter a valid 10-digit mobile number";
        }
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function nextStep() {
    if (validateStep(currentStep)) {
      setCurrentStep((s) => Math.min(s + 1, 4));
    }
  }

  function prevStep() {
    setCurrentStep((s) => Math.max(s - 1, minStep));
    setErrors({});
  }

  async function handleSubmit() {
    if (!formData.acceptConsent) {
      toast.error("Please accept the contact consent.");
      return;
    }

    setIsSubmitting(true);
    try {
      const leaderEmail = normalizeEmail(formData.ownerEmail);
      const leaderPhone = normalizePhone(formData.ownerPhone) ?? "";
      const { data } = await submitSolution({
        variables: {
          input: {
            fullName: formData.ownerName.trim(),
            email: leaderEmail,
            phone: leaderPhone,
            problemCode: formData.problemId,
            solutionTitle: formData.solutionTitle,
            solutionDescription: formData.description,
            prototypeUrl: formData.prototypeUrl || null,
            contactConsent: formData.acceptConsent,
          },
        },
      });
      const accessToken = data?.submitSolution.accessToken;
      if (!accessToken) throw new Error("Team access could not be created. Please open the team dashboard.");

      const failedMembers: string[] = [];
      for (const member of teamMembers) {
        try {
          await addTeamMember({
            variables: {
              accessToken,
              input: {
                fullName: member.fullName.trim(),
                email: normalizeEmail(member.email),
                phone: normalizePhone(member.phone) ?? "",
              },
            },
          });
        } catch (error) {
          const reason = error instanceof Error ? error.message : "could not be added";
          failedMembers.push(`${member.fullName.trim()} (${reason})`);
        }
      }

      setIsSubmitted(true);
      if (failedMembers.length > 0) {
        toast.warning(
          `Solution registered, but these team members were not added: ${failedMembers.join("; ")}. You can add them from the team dashboard.`,
        );
      } else {
        toast.success("Solution and team registered successfully!");
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to submit solution.";
      if (message.toLowerCase().includes("already exists")) {
        toast.error(
          "An entry already exists using this email address or mobile number. Each person may participate only once.",
        );
      } else {
        toast.error(message || "Failed to submit solution. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="pt-28 pb-20">
        <div className="container max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 rounded-3xl bg-card border border-primary/20"
          >
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display font-bold text-3xl text-foreground mb-4">Submission Received</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Your solo or team entry has been received. Our team will review it before it is
              published and may contact the primary participant through email or WhatsApp regarding
              the next steps.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/team">
                <button className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary-hover transition-all">
                  Open team dashboard
                </button>
              </Link>
              <Link href="/problems">
                <button className="w-full px-6 py-3 border border-border bg-secondary text-foreground font-semibold rounded-xl hover:bg-accent transition-all">
                  Back to Problems
                </button>
              </Link>
            </div>
          </motion.div>
          <WhatsAppCommunityCta delay={0.2} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden pt-28 pb-20">
      <RegisterAsideImage
        label="Uttarakhand hillside landscape"
        note="Solution registration: misty terraced hills of Uttarakhand"
        src="/hackathon/logos/prop12.webp"
        imageWidth={941}
        imageHeight={1672}
      />

      <div className="container relative z-10">
        <div className="max-w-2xl" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-foreground mb-4">
              Register for <span className="text-brand-accent">UKIS 2026</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg">
              {hasPreselectedProblem
                ? "Registration is open. Describe your approach for this problem for review by the UKIS team."
                : "Registration is open to students, developers and working professionals. Pick one problem and describe your approach for review by the UKIS team."}
            </p>
            <div className="mt-5 max-w-2xl rounded-xl border border-primary/20 bg-primary/5 p-4">
              <p className="text-sm font-semibold text-foreground">Participation rule</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {PARTICIPATION_RULE_SUMMARY}
              </p>
            </div>
          </motion.div>

          {preselectedProblem && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mb-8 p-4 rounded-xl bg-primary/5 border border-primary/20"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-primary mb-1">
                Solving
              </p>
              <p className="font-display font-semibold text-foreground">
                {preselectedProblem.title}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                <Link
                  href={`/problems/${preselectedProblem.id}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  View problem
                </Link>
                <span className="text-border">·</span>
                <Link
                  href="/register/solution"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Choose a different problem
                </Link>
              </div>
            </motion.div>
          )}

          {/* Progress Steps */}
          <div className="mb-10 flex items-center gap-2">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                    currentStep >= step.id || (hasPreselectedProblem && step.id === 1)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground border border-border"
                  }`}
                >
                  {currentStep > step.id || (hasPreselectedProblem && step.id === 1) ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step.id
                  )}
                </div>
                <span
                  className={`text-sm font-medium hidden sm:inline ${
                    currentStep >= step.id || (hasPreselectedProblem && step.id === 1)
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
                {i < steps.length - 1 && (
                  <div
                    className={`w-8 sm:w-16 h-0.5 rounded transition-colors duration-300 ${
                      currentStep > step.id || (hasPreselectedProblem && step.id === 1)
                        ? "bg-primary"
                        : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border">
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h2 className="font-display font-semibold text-xl text-foreground">Choose a Problem</h2>
                    <div className="space-y-3">
                      {problems.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            setFormData({ ...formData, problemId: p.id });
                            setErrors({});
                          }}
                          className={`w-full text-left p-4 rounded-xl border transition-all ${
                            formData.problemId === p.id ? "border-primary bg-primary/5 ring-1 ring-primary/30" : "border-border hover:border-primary/30"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.problemId === p.id ? "border-primary bg-primary" : "border-muted-foreground"}`}>
                              {formData.problemId === p.id && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                            </div>
                            <div>
                              <span className="font-display font-medium text-foreground">{p.title}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    {errors.problemId && <p className="text-sm text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.problemId}</p>}
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-5">
                    <h2 className="font-display font-semibold text-xl text-foreground">Describe Your Solution</h2>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Solution Title *</label>
                      <input
                        type="text"
                        value={formData.solutionTitle}
                        onChange={(e) => setFormData({ ...formData, solutionTitle: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-card border text-foreground outline-none transition-all ${errors.solutionTitle ? "border-destructive" : "border-border focus:border-primary/50"}`}
                        placeholder="e.g., AI-Powered Triage Assistant"
                      />
                      {errors.solutionTitle && <p className="mt-1 text-xs text-destructive">{errors.solutionTitle}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Description *</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-xl bg-card border text-foreground outline-none transition-all resize-none ${errors.description ? "border-destructive" : "border-border focus:border-primary/50"}`}
                        placeholder="Describe your approach..."
                      />
                      {errors.description && <p className="mt-1 text-xs text-destructive">{errors.description}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Prototype URL (optional)</label>
                      <input
                        type="text"
                        value={formData.prototypeUrl}
                        onChange={(e) => setFormData({ ...formData, prototypeUrl: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-card border text-foreground outline-none transition-all ${errors.prototypeUrl ? "border-destructive" : "border-border focus:border-primary/50"}`}
                        placeholder="https://..."
                      />
                      {errors.prototypeUrl && <p className="mt-1 text-xs text-destructive">{errors.prototypeUrl}</p>}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-5">
                    <div>
                      <h2 className="font-display font-semibold text-xl text-foreground">
                        Participant / Team Lead Details
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        If this is a team entry, enter the team lead as the primary contact, then
                        add up to {MAX_TEAM_SIZE - 1} more team members below.
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Participant / Team Lead Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.ownerName}
                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-card border text-foreground outline-none transition-all ${errors.ownerName ? "border-destructive" : "border-border focus:border-primary/50"}`}
                        placeholder="Your full name"
                      />
                      {errors.ownerName && <p className="mt-1 text-xs text-destructive">{errors.ownerName}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                      <input
                        type="email"
                        value={formData.ownerEmail}
                        onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-card border text-foreground outline-none transition-all ${errors.ownerEmail ? "border-destructive" : "border-border focus:border-primary/50"}`}
                        placeholder="your@email.com"
                      />
                      {errors.ownerEmail && <p className="mt-1 text-xs text-destructive">{errors.ownerEmail}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Phone / WhatsApp *</label>
                      <input
                        type="text"
                        value={formData.ownerPhone}
                        onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-card border text-foreground outline-none transition-all ${errors.ownerPhone ? "border-destructive" : "border-border focus:border-primary/50"}`}
                        placeholder="+91 98765 43210"
                        required
                      />
                      {errors.ownerPhone && <p className="mt-1 text-xs text-destructive">{errors.ownerPhone}</p>}
                    </div>
                    <div className="border-t border-border pt-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <UsersRound className="text-primary" size={20} />
                            <h3 className="font-display font-semibold text-foreground">Team members</h3>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">Optional, up to {MAX_TEAM_SIZE - 1} additional members.</p>
                        </div>
                        {teamMembers.length < MAX_TEAM_SIZE - 1 && (
                          <button
                            type="button"
                            onClick={() => setTeamMembers((members) => [
                              ...members,
                              { fullName: "", email: "", phone: "" },
                            ])}
                            className="flex shrink-0 items-center gap-2 rounded-lg border border-primary/30 px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
                          >
                            <Plus size={16} /> Add member
                          </button>
                        )}
                      </div>
                      <div className="mt-4 space-y-4">
                        {teamMembers.map((member, index) => {
                          const prefix = `member-${index}`;
                          return (
                            <div key={index} className="rounded-xl border border-border bg-secondary/30 p-4">
                              <div className="mb-3 flex items-center justify-between">
                                <p className="text-sm font-semibold text-foreground">Member {index + 1}</p>
                                <button
                                  type="button"
                                  aria-label={`Remove member ${index + 1}`}
                                  title="Remove member"
                                  onClick={() => setTeamMembers((members) => members.filter((_, memberIndex) => memberIndex !== index))}
                                  className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                                >
                                  <Trash2 size={17} />
                                </button>
                              </div>
                              <div className="grid gap-3 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                  <input
                                    aria-label={`Member ${index + 1} full name`}
                                    value={member.fullName}
                                    onChange={(event) => setTeamMembers((members) => members.map((item, memberIndex) => memberIndex === index ? { ...item, fullName: event.target.value } : item))}
                                    className={`w-full rounded-lg border bg-card px-4 py-3 text-foreground outline-none transition-all ${errors[`${prefix}-fullName`] ? "border-destructive" : "border-border focus:border-primary/50"}`}
                                    placeholder="Full name"
                                  />
                                  {errors[`${prefix}-fullName`] && <p className="mt-1 text-xs text-destructive">{errors[`${prefix}-fullName`]}</p>}
                                </div>
                                <div>
                                  <input
                                    aria-label={`Member ${index + 1} email`}
                                    type="email"
                                    value={member.email}
                                    onChange={(event) => setTeamMembers((members) => members.map((item, memberIndex) => memberIndex === index ? { ...item, email: event.target.value } : item))}
                                    className={`w-full rounded-lg border bg-card px-4 py-3 text-foreground outline-none transition-all ${errors[`${prefix}-email`] ? "border-destructive" : "border-border focus:border-primary/50"}`}
                                    placeholder="Email address"
                                  />
                                  {errors[`${prefix}-email`] && <p className="mt-1 text-xs text-destructive">{errors[`${prefix}-email`]}</p>}
                                </div>
                                <div>
                                  <input
                                    aria-label={`Member ${index + 1} mobile number`}
                                    type="tel"
                                    inputMode="numeric"
                                    value={member.phone}
                                    onChange={(event) => setTeamMembers((members) => members.map((item, memberIndex) => memberIndex === index ? { ...item, phone: event.target.value } : item))}
                                    className={`w-full rounded-lg border bg-card px-4 py-3 text-foreground outline-none transition-all ${errors[`${prefix}-phone`] ? "border-destructive" : "border-border focus:border-primary/50"}`}
                                    placeholder="10-digit mobile number"
                                  />
                                  {errors[`${prefix}-phone`] && <p className="mt-1 text-xs text-destructive">{errors[`${prefix}-phone`]}</p>}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h2 className="font-display font-semibold text-xl text-foreground">Final Consent</h2>
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-4">
                      <label className="flex gap-3 cursor-pointer group">
                        <div className="pt-0.5">
                          <input
                            type="checkbox"
                            checked={formData.acceptConsent}
                            onChange={(e) => setFormData({ ...formData, acceptConsent: e.target.checked })}
                            className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30"
                          />
                        </div>
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          I confirm that I am participating solo or as the primary contact for one
                          team of at most {MAX_TEAM_SIZE} people; every participant in this entry will participate
                          only once. I also consent to be contacted through email or WhatsApp
                          regarding this submission. *
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === minStep || isSubmitting}
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors"
                  >
                    Back
                  </button>
                  {currentStep < 4 ? (
                    <button
                      onClick={nextStep}
                      className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl flex items-center gap-2 hover:opacity-90 transition-all"
                    >
                      Next Step
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="px-8 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl flex items-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Solution"}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <WhatsAppCommunityCta />
        </div>
      </div>
    </div>
  );
}
