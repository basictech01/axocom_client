import { createElement } from "react";
import type { CertificateParticipant } from "~/features/hackathon/types";
import { CertificateSvg } from "~/features/hackathon/components/CertificateArtwork";
import { CERTIFICATE_DESIGN, layoutCertificateName } from "./certificate-design";

// A4 landscape at approximately 300 dpi, with identical geometry to the preview.
const WIDTH = 3508;
const HEIGHT = Math.round(WIDTH * CERTIFICATE_DESIGN.height / CERTIFICATE_DESIGN.width);

interface CertificateDownloadOptions {
  preview?: boolean;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not render the certificate artwork. Please try again."));
    image.src = src;
  });
}

async function assetDataUrl(src: string): Promise<string> {
  const response = await fetch(src);
  if (!response.ok) throw new Error(`Could not load certificate asset: ${src}`);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error(`Could not read certificate asset: ${src}`));
    reader.readAsDataURL(blob);
  });
}

async function renderCertificateCanvas(
  participant: CertificateParticipant,
  { preview = false }: CertificateDownloadOptions = {},
): Promise<HTMLCanvasElement> {
  await Promise.all(CERTIFICATE_DESIGN.fonts.map(({ family }) => document.fonts.load(`46px "${family}"`)));

  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Certificate download is not supported in this browser.");
  const nameLayout = layoutCertificateName(participant.fullName, (text, size) => {
    ctx.font = `${size}px Marcellus, serif`;
    return ctx.measureText(text).width;
  });

  const { renderToStaticMarkup } = await import("react-dom/server");
  const markup = renderToStaticMarkup(createElement(CertificateSvg, {
    participant, preview, nameLayout, idPrefix: "certificate-export",
  }));
  const svg = new DOMParser().parseFromString(markup, "image/svg+xml").documentElement;
  svg.setAttribute("width", String(WIDTH));
  svg.setAttribute("height", String(HEIGHT));
  svg.removeAttribute("style");

  // SVGs loaded as images cannot fetch external assets. Embed every logo and font
  // so the downloaded artwork matches the inline SVG and the canvas stays readable.
  const [, embeddedFonts] = await Promise.all([
    Promise.all(Array.from(svg.querySelectorAll("image")).map(async (image) => {
      const src = image.getAttribute("href");
      if (src) image.setAttribute("href", await assetDataUrl(src));
    })),
    Promise.all(CERTIFICATE_DESIGN.fonts.map(async ({ family, url }) => (
      `@font-face{font-family:'${family}';src:url('${await assetDataUrl(url)}') format('truetype');font-weight:400;font-style:normal;}`
    ))),
  ]);
  const style = svg.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "style");
  style.textContent = embeddedFonts.join("\n");
  svg.prepend(style);

  const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)], { type: "image/svg+xml;charset=utf-8" }));
  try {
    const image = await loadImage(url);
    ctx.drawImage(image, 0, 0, WIDTH, HEIGHT);
    return canvas;
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function certificateFileName(participant: CertificateParticipant): string {
  const safeName = participant.fullName
    .normalize("NFKC")
    .replace(/[\\/:*?"<>|]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80) || "Participant";
  const certificateId = participant.hash.replace(/[^a-z0-9]/gi, "").slice(0, 12).toUpperCase() || "CERTIFICATE";
  return `UKIS-2026-participation-${certificateId}-${safeName}`;
}

export async function downloadCertificatePng(participant: CertificateParticipant): Promise<void> {
  const canvas = await renderCertificateCanvas(participant);
  const anchor = document.createElement("a");
  anchor.download = `${certificateFileName(participant)}.png`;
  anchor.href = canvas.toDataURL("image/png");
  anchor.click();
}

export async function downloadCertificatePdf(
  participant: CertificateParticipant,
  options: CertificateDownloadOptions = {},
): Promise<void> {
  const [{ jsPDF }, canvas] = await Promise.all([
    import("jspdf"),
    renderCertificateCanvas(participant, options),
  ]);
  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 297, 210, undefined, "FAST");
  pdf.save(`${certificateFileName(participant)}.pdf`);
}