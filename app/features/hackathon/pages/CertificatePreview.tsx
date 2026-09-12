import { useState } from "react";
import { ArrowLeft, Download, Eye, Loader2, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { CertificateArtwork } from "~/features/hackathon/components/CertificateArtwork";
import { Button } from "~/features/hackathon/components/ui/button";
import { Link } from "~/features/hackathon/lib/router";
import { downloadCertificatePdf } from "~/features/hackathon/lib/download-certificate";
import { buildHackathonNoIndexMeta } from "~/features/hackathon/lib/seo";
import type { CertificateParticipant } from "~/features/hackathon/types";

export const meta = () => buildHackathonNoIndexMeta(
  "UKIS Certificate Design Preview",
  "Internal preview of the proposed UKIS 2026 certificate design.",
);

const sampleParticipant: CertificateParticipant = {
  id: "preview",
  hash: "PREVIEW-SAMPLE-NOT-VALID",
  fullName: "Sample Participant",
  institution: "Example University, Uttarakhand",
  course: "Computer Science",
  city: "Dehradun",
  issuedAt: new Date().toISOString(),
};

export default function CertificatePreview() {
  const [downloading, setDownloading] = useState(false);

  async function handleSampleDownload() {
    setDownloading(true);
    try {
      await downloadCertificatePdf(sampleParticipant, { preview: true });
      toast.success("Watermarked sample certificate downloaded.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not create the sample PDF.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-warning/30 bg-warning/10 px-4 py-2 text-sm font-semibold text-warning">
            <Eye size={17} /> Design preview · Not a valid certificate
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold sm:text-5xl">Certificate design for your approval</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            This page uses sample data and does not contact the backend. Review the wording, layout, colours, logos, and signature area before participant certificates go live.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl">
          <CertificateArtwork participant={sampleParticipant} preview />
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card p-5 text-center sm:p-6">
          <div className="flex items-center justify-center gap-2 font-semibold text-foreground"><MessageCircle size={18} className="text-primary" /> Approval checklist</div>
          <p className="mx-auto mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Please confirm the participant wording, event title, date, organiser name, logos, colours, and whether an authorised signature or designation should be added.
          </p>
        </div>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" className="rounded-xl" onClick={handleSampleDownload} disabled={downloading}>
            {downloading ? <Loader2 className="animate-spin" /> : <Download />}
            {downloading ? "Preparing sample…" : "Download sample PDF"}
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-xl"><Link href="/certificate"><ArrowLeft /> Back to certificate page</Link></Button>
        </div>
      </div>
    </div>
  );
}
