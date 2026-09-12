import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { CheckCircle2, Download, ExternalLink, Loader2, Share2 } from "lucide-react";
import { useParams } from "react-router";
import { toast } from "sonner";
import { CertificateArtwork } from "~/features/hackathon/components/CertificateArtwork";
import { Button } from "~/features/hackathon/components/ui/button";
import { Link } from "~/features/hackathon/lib/router";
import { downloadCertificatePdf } from "~/features/hackathon/lib/download-certificate";
import { buildHackathonNoIndexMeta } from "~/features/hackathon/lib/seo";
import { CERTIFICATE_BY_HASH_QUERY } from "~/features/hackathon/services";

export const meta = () => buildHackathonNoIndexMeta("UKIS 2026 Certificate of Participation", "View and download a verified UKIS Hackathon 2026 participation certificate.");

export default function CertificateView() {
  const { hash = "" } = useParams();
  const [downloading, setDownloading] = useState(false);
  const { data, loading, error } = useQuery(CERTIFICATE_BY_HASH_QUERY, { variables: { hash }, skip: !hash, fetchPolicy: "network-only" });
  const participant = data?.certificateByHash;

  async function handleDownload() {
    if (!participant) return;
    setDownloading(true);
    try { await downloadCertificatePdf(participant); toast.success("Certificate PDF downloaded."); }
    catch (downloadError) { toast.error(downloadError instanceof Error ? downloadError.message : "Download failed."); }
    finally { setDownloading(false); }
  }

  async function handleShare() {
    const shareData = { title: `${participant?.fullName ?? "UKIS 2026"} — Certificate of Participation`, text: "UKIS Hackathon 2026 Certificate of Participation", url: window.location.href };
    try {
      if (navigator.share) await navigator.share(shareData);
      else { await navigator.clipboard.writeText(window.location.href); toast.success("Certificate link copied."); }
    } catch (shareError) { if ((shareError as DOMException)?.name !== "AbortError") toast.error("Could not share the link."); }
  }

  if (loading) return <div className="flex min-h-[75vh] items-center justify-center pt-20"><Loader2 className="h-9 w-9 animate-spin text-primary" /></div>;
  if (error || !participant) return <div className="container flex min-h-[75vh] max-w-xl items-center pt-24 pb-16"><div className="w-full rounded-3xl border border-border bg-card p-9 text-center"><ExternalLink className="mx-auto h-10 w-10 text-muted-foreground" /><h1 className="mt-5 font-display text-3xl font-bold">Certificate not found</h1><p className="mt-3 text-muted-foreground">This link is invalid or the certificate is no longer available. Try retrieving it with your registered email.</p><Button asChild className="mt-7"><Link href="/certificate">Find my certificate</Link></Button></div></div>;

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container max-w-6xl">
        <div className="mx-auto max-w-3xl text-center"><span className="inline-flex items-center gap-2 rounded-full bg-success/10 px-4 py-2 text-sm font-semibold text-success"><CheckCircle2 size={17} /> Participation verified</span><h1 className="mt-5 font-display text-4xl font-bold sm:text-5xl">Congratulations, {participant.fullName}!</h1><p className="mt-4 text-lg text-muted-foreground">Thank you for bringing your curiosity, ideas, and energy to UKIS 2026. Your contribution helped make the hackathon meaningful.</p></div>
        <div className="mx-auto mt-10 max-w-5xl"><CertificateArtwork participant={participant} /></div>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"><Button size="lg" onClick={handleDownload} disabled={downloading} className="h-12 min-w-56 rounded-xl">{downloading ? <Loader2 className="animate-spin" /> : <Download />}{downloading ? "Preparing PDF…" : "Download certificate PDF"}</Button><Button size="lg" variant="outline" onClick={handleShare} className="h-12 min-w-44 rounded-xl"><Share2 /> Share link</Button></div>
        <p className="mx-auto mt-5 max-w-xl text-center text-xs leading-relaxed text-muted-foreground">This URL is your unique certificate link. Save or share it to verify your participation. Personal contact details are never shown on this page.</p>
      </div>
    </div>
  );
}
