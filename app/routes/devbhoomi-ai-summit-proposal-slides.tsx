import proposalSlidesHtml from "../../devbhoomi-ai-summit-proposal-slides.html?raw";

const embeddedProposalSlidesHtml = proposalSlidesHtml
  .replaceAll('src="public/', 'src="/')
  .replaceAll('url("public/', 'url("/')
  .replace("Number(location.hash.slice(1))", "Number(window.parent.location.hash.slice(1))")
  .replace(
    'if (updateHash) history.replaceState(null, "", `#${current + 1}`);',
    'if (updateHash) window.parent.history.replaceState(null, "", `#${current + 1}`);',
  )
  .replace('addEventListener("hashchange", () =>', 'window.parent.addEventListener("hashchange", () =>');

export function meta() {
  return [
    { title: "Devbhoomi AI Summit 2026 Proposal" },
    {
      name: "description",
      content: "Devbhoomi AI Summit 2026 partnership and participation proposal.",
    },
  ];
}

export default function DevbhoomiAISummitProposalSlides() {
  return (
    <iframe
      title="Devbhoomi AI Summit 2026 proposal presentation"
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