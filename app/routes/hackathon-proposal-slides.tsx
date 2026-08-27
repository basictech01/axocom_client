import proposalSlidesHtml from "../../hackathon-proposal-slides.html?raw";
import { buildHackathonNoIndexMeta } from "~/features/hackathon/lib/seo";

const embeddedProposalSlidesHtml = proposalSlidesHtml
  .replaceAll('src="public/', 'src="/')
  .replaceAll('url("public/', 'url("/')
  .replaceAll("Number(location.hash.slice(1))", "Number(window.parent.location.hash.slice(1))")
  .replace(
    'if (updateHash) history.replaceState(null, "", `#${current + 1}`);',
    'if (updateHash) window.parent.history.replaceState(null, "", `#${current + 1}`);',
  )
  .replace(
    'addEventListener("hashchange", () =>',
    'window.parent.addEventListener("hashchange", () =>',
  );

export function meta() {
  return buildHackathonNoIndexMeta(
    "UKIS Hackathon 2026 Proposal",
    "Private UKIS Hackathon 2026 proposal presentation.",
  );
}

export default function HackathonProposalSlides() {
  return (
    <iframe
      title="Uttarakhand Innovation and Solutions Hackathon 2026 proposal"
      srcDoc={embeddedProposalSlidesHtml}
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
