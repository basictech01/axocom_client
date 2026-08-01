/**
 * Register Solution Page — Kinetic Dark design
 * Multi-step animated form with progress indicator
 * Fields: select problem, solution title, description, prototype URL, owner details, consent
 */
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "~/features/hackathon/lib/router";
import { ArrowLeft, ArrowRight, Check, AlertCircle, Loader2 } from "lucide-react";
import { problems } from "~/features/hackathon/lib/data";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";
import { toast } from "sonner";
import { normalizePhone, isValidNormalizedPhone } from "~/features/hackathon/lib/normalize";
import { WhatsAppCommunityCta } from "~/features/hackathon/components/WhatsAppCommunityCta";
import RegisterAsideImage from "~/features/hackathon/components/RegisterAsideImage";
import { SUBMIT_SOLUTION_MUTATION } from "~/features/hackathon/services";

const steps = [
  { id: 1, label: "Problem" },
  { id: 2, label: "Solution" },
  { id: 3, label: "Details" },
  { id: 4, label: "Consent" },
];

export default function RegisterSolution() {
  const [submitSolution] = useMutation(SUBMIT_SOLUTION_MUTATION);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { ref } = useScrollReveal();

  const [formData, setFormData] = useState({
    problemId: "",
    solutionTitle: "",
    description: "",
    prototypeUrl: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    acceptConsent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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
    setCurrentStep((s) => Math.max(s - 1, 1));
    setErrors({});
  }

  async function handleSubmit() {
    if (!formData.acceptConsent) {
      toast.error("Please accept the contact consent.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitSolution({
        variables: {
          input: {
            fullName: formData.ownerName,
            email: formData.ownerEmail,
            phone: formData.ownerPhone,
            problemCode: formData.problemId,
            solutionTitle: formData.solutionTitle,
            solutionDescription: formData.description,
            prototypeUrl: formData.prototypeUrl || null,
            contactConsent: formData.acceptConsent,
          },
        },
      });

      setIsSubmitted(true);
      toast.success("Solution registered successfully!");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to submit solution.";
      if (message.toLowerCase().includes("already exists")) {
        toast.error("An entry has already been submitted using this email address or mobile number.");
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
            Your solution has been received. Our team will review it before it is published. We may contact you through email or WhatsApp regarding the next steps.
            </p>
            <Link href="/problems">
              <button className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary-hover transition-all">
                Back to Problems
              </button>
            </Link>
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
        note="Solution registration — misty terraced hills of Uttarakhand"
        src="/hackathon/logos/prop12.webp"
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
              Register Your <span className="text-brand-accent">Solution</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Pick a problem and describe your approach. Our team will review your submission.
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="mb-10 flex items-center gap-2">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                    currentStep >= step.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground border border-border"
                  }`}
                >
                  {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <span className={`text-sm font-medium hidden sm:inline ${currentStep >= step.id ? "text-foreground" : "text-muted-foreground"}`}>
                  {step.label}
                </span>
                {i < steps.length - 1 && (
                  <div className={`w-8 sm:w-16 h-0.5 rounded transition-colors duration-300 ${currentStep > step.id ? "bg-primary" : "bg-border"}`} />
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
                    <h2 className="font-display font-semibold text-xl text-foreground">Solution Owner Details</h2>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name *</label>
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
                          I consent to be contacted through email or WhatsApp regarding my solution submission. *
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 1 || isSubmitting}
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
