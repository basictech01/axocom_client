import proposalSlidesHtml from "../../hackathon-proposal-slides.html?raw";
import { buildHackathonNoIndexMeta } from "~/features/hackathon/lib/seo";

const embeddedProposalSlidesHtml = proposalSlidesHtml
  .replaceAll('src="public/', 'src="/')
  .replaceAll('url("public/', 'url("/');

export function meta() {
  return buildHackathonNoIndexMeta(
    "UKIS Hackathon 2026 Inauguration",
    "UKIS inauguration: real problems, student talent and an innovation ecosystem for Uttarakhand.",
  );
}

export default function HackathonProposalSlides() {
  return (
    <iframe
      title="Uttarakhand Innovation and Solutions Hackathon 2026 inauguration"
      srcDoc={embeddedProposalSlidesHtml}
      allowFullScreen
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        border: 0,
      }}
    />
  );
}
