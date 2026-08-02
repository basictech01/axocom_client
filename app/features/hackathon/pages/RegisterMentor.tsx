/**
 * Register Mentor Page - Kinetic Dark design
 * Multi-step animated form for mentor application
 */
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "~/features/hackathon/lib/router";
import { ArrowLeft, ArrowRight, Check, AlertCircle, Loader2 } from "lucide-react";
import { useScrollReveal } from "~/features/hackathon/hooks/useScrollReveal";
import { toast } from "sonner";
import { normalizePhone, isValidNormalizedPhone } from "~/features/hackathon/lib/normalize";
import { WhatsAppCommunityCta } from "~/features/hackathon/components/WhatsAppCommunityCta";
import RegisterAsideImage from "~/features/hackathon/components/RegisterAsideImage";
import { APPLY_MENTOR_MUTATION } from "~/features/hackathon/services";

const steps = [
  { id: 1, label: "Profile" },
  { id: 2, label: "Expertise" },
  { id: 3, label: "Motivation" },
  { id: 4, label: "Consent" },
];

function parseExpertise(expertise: string): string[] {
  return expertise
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function RegisterMentor() {
  const [applyAsMentor] = useMutation(APPLY_MENTOR_MUTATION);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { ref } = useScrollReveal();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentRole: "",
    organisation: "",
    expertise: "",
    experienceSummary: "",
    motivation: "",
    profileUrl: "",
    acceptConsent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function validateStep(step: number): boolean {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
      if (!formData.phone.trim()) newErrors.phone = "Phone / WhatsApp is required";
      else if (!isValidNormalizedPhone(normalizePhone(formData.phone))) {
        newErrors.phone = "Enter a valid 10-digit mobile number";
      }
      if (!formData.currentRole.trim()) newErrors.currentRole = "Current role is required";
    } else if (step === 2) {
      if (!formData.expertise.trim()) newErrors.expertise = "Please list your areas of expertise";
      if (!formData.experienceSummary.trim()) newErrors.experienceSummary = "Experience summary is required";
      if (formData.profileUrl && !formData.profileUrl.startsWith("https://")) {
        newErrors.profileUrl = "Profile URL must start with https://";
      }
    } else if (step === 3) {
      if (!formData.motivation.trim()) newErrors.motivation = "Please tell us why you want to mentor";
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
      await applyAsMentor({
        variables: {
          input: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            currentRole: formData.currentRole,
            organisation: formData.organisation || null,
            expertise: parseExpertise(formData.expertise),
            experienceSummary: formData.experienceSummary,
            motivation: formData.motivation,
            profileUrl: formData.profileUrl || null,
            contactConsent: formData.acceptConsent,
          },
        },
      });

      setIsSubmitted(true);
      toast.success("Mentor application submitted successfully!");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to submit application.";
      if (message.toLowerCase().includes("already exists")) {
        toast.error("An entry has already been submitted using this email address or mobile number.");
      } else {
        toast.error(message || "Failed to submit application. Please try again.");
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
            <h1 className="font-display font-bold text-3xl text-foreground mb-4">Application Received</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Your mentor application has been received. Our team will review it and contact you if it is accepted.
            </p>
            <Link href="/">
              <button className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary-hover transition-all">
                Back to Home
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
        label="UKIS mentor with a team photograph"
        note="Mentor registration: mentor speaking with a builder team"
        src="/hackathon/logos/prop11.webp"
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
              Become a <span className="text-brand-accent">Mentor</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Share your expertise and help builders ship faster. Apply to join our mentor network.
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
                  <div className="space-y-5">
                    <h2 className="font-display font-semibold text-xl text-foreground">Basic Information</h2>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name *</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-card border text-foreground outline-none transition-all ${errors.fullName ? "border-destructive" : "border-border focus:border-primary/50"}`}
                        placeholder="Your full name"
                      />
                      {errors.fullName && <p className="mt-1 text-xs text-destructive">{errors.fullName}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-card border text-foreground outline-none transition-all ${errors.email ? "border-destructive" : "border-border focus:border-primary/50"}`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Phone / WhatsApp *</label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-card border text-foreground outline-none transition-all ${errors.phone ? "border-destructive" : "border-border focus:border-primary/50"}`}
                        placeholder="+91 98765 43210"
                        required
                      />
                      {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Current Role / Title *</label>
                      <input
                        type="text"
                        value={formData.currentRole}
                        onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-card border text-foreground outline-none transition-all ${errors.currentRole ? "border-destructive" : "border-border focus:border-primary/50"}`}
                        placeholder="e.g., Senior Software Engineer"
                      />
                      {errors.currentRole && <p className="mt-1 text-xs text-destructive">{errors.currentRole}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Organisation (optional)</label>
                      <input
                        type="text"
                        value={formData.organisation}
                        onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground outline-none focus:border-primary/50 transition-all"
                        placeholder="Where you work"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-5">
                    <h2 className="font-display font-semibold text-xl text-foreground">Expertise & Experience</h2>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Areas of Expertise *</label>
                      <input
                        type="text"
                        value={formData.expertise}
                        onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-card border text-foreground outline-none transition-all ${errors.expertise ? "border-destructive" : "border-border focus:border-primary/50"}`}
                        placeholder="e.g., React, AI, Product Management"
                      />
                      {errors.expertise && <p className="mt-1 text-xs text-destructive">{errors.expertise}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Professional Summary *</label>
                      <textarea
                        value={formData.experienceSummary}
                        onChange={(e) => setFormData({ ...formData, experienceSummary: e.target.value })}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-xl bg-card border text-foreground outline-none transition-all resize-none ${errors.experienceSummary ? "border-destructive" : "border-border focus:border-primary/50"}`}
                        placeholder="Tell us about your professional background..."
                      />
                      {errors.experienceSummary && <p className="mt-1 text-xs text-destructive">{errors.experienceSummary}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">LinkedIn / Portfolio URL (optional)</label>
                      <input
                        type="text"
                        value={formData.profileUrl}
                        onChange={(e) => setFormData({ ...formData, profileUrl: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-card border text-foreground outline-none transition-all ${errors.profileUrl ? "border-destructive" : "border-border focus:border-primary/50"}`}
                        placeholder="https://linkedin.com/in/..."
                      />
                      {errors.profileUrl && <p className="mt-1 text-xs text-destructive">{errors.profileUrl}</p>}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-5">
                    <h2 className="font-display font-semibold text-xl text-foreground">Why Mentor?</h2>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Your Motivation *</label>
                      <textarea
                        value={formData.motivation}
                        onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                        rows={6}
                        className={`w-full px-4 py-3 rounded-xl bg-card border text-foreground outline-none transition-all resize-none ${errors.motivation ? "border-destructive" : "border-border focus:border-primary/50"}`}
                        placeholder="Why do you want to mentor in this hackathon?"
                      />
                      {errors.motivation && <p className="mt-1 text-xs text-destructive">{errors.motivation}</p>}
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
                          I consent to be contacted through email or WhatsApp regarding my mentor application. *
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
                      {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Application"}
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
