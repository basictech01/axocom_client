import type { CertificateParticipant } from "~/features/hackathon/types";
import { formatCertificateDate } from "~/features/hackathon/lib/certificate";

const WIDTH = 1754;
const HEIGHT = 1240;
const SCALE = WIDTH / 1000;
const NAVY = "#26345f";
const GOLD = "#d2a851";
const GOLD_TEXT = "#9d792d";

interface CertificateDownloadOptions {
  preview?: boolean;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load certificate asset: ${src}`));
    image.src = src;
  });
}

function fitText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  initialSize: number,
  minimumSize: number,
  fontFamily: string,
): number {
  let size = initialSize;
  while (size > minimumSize) {
    ctx.font = `${size}px ${fontFamily}`;
    if (ctx.measureText(text).width <= maxWidth) return size;
    size -= 2;
  }
  return size;
}

function drawPlaque(ctx: CanvasRenderingContext2D) {
  const p = (value: number) => value * SCALE;
  ctx.fillStyle = NAVY;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.beginPath();
  ctx.moveTo(p(88), p(29));
  ctx.lineTo(p(912), p(29));
  ctx.bezierCurveTo(p(914), p(68), p(932), p(84), p(972), p(88));
  ctx.lineTo(p(972), p(619));
  ctx.bezierCurveTo(p(932), p(623), p(914), p(640), p(912), p(678));
  ctx.lineTo(p(88), p(678));
  ctx.bezierCurveTo(p(86), p(640), p(68), p(623), p(28), p(619));
  ctx.lineTo(p(28), p(88));
  ctx.bezierCurveTo(p(68), p(84), p(86), p(68), p(88), p(29));
  ctx.closePath();
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = p(5);
  ctx.stroke();

  ctx.strokeStyle = GOLD;
  ctx.lineWidth = p(1.5);
  ctx.strokeRect(p(43), p(46), p(914), p(615));
  for (const [x, y] of [[28, 28], [972, 28], [28, 679], [972, 679]]) {
    ctx.beginPath(); ctx.arc(p(x), p(y), p(6), 0, Math.PI * 2); ctx.fillStyle = GOLD; ctx.fill();
  }
}

function drawSeal(ctx: CanvasRenderingContext2D) {
  const p = (value: number) => value * SCALE;
  ctx.fillStyle = "#fffdf8";
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = p(1.2);
  ctx.beginPath(); ctx.arc(p(500), p(519), p(54), 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.setLineDash([p(2), p(2)]);
  ctx.lineWidth = p(1);
  ctx.beginPath(); ctx.arc(p(500), p(519), p(45), 0, Math.PI * 2); ctx.stroke();
  ctx.setLineDash([]);
  ctx.lineWidth = p(0.8);
  ctx.beginPath(); ctx.arc(p(500), p(519), p(40), 0, Math.PI * 2); ctx.stroke();
  ctx.textAlign = "center";
  ctx.fillStyle = GOLD_TEXT;
  ctx.font = `500 ${p(15)}px Poppins, sans-serif`;
  ctx.fillText("★ ★ ★", p(500), p(502));
  ctx.font = `600 ${p(12)}px Poppins, sans-serif`;
  ctx.fillText("PARTICIPATED", p(500), p(526));
  ctx.fillText("UKIS 2026", p(500), p(547));
}

async function renderCertificateCanvas(
  participant: CertificateParticipant,
  { preview = false }: CertificateDownloadOptions = {},
): Promise<HTMLCanvasElement> {
  await Promise.all([
    document.fonts.load("64px Marcellus"),
    document.fonts.load("100px 'Alex Brush'"),
    document.fonts.load("18px Poppins"),
  ]);

  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Certificate download is not supported in this browser.");
  const p = (value: number) => value * SCALE;

  drawPlaque(ctx);
  const [itdaLogo, ukisLogo] = await Promise.all([
    loadImage("/itda_without_background.png"),
    loadImage("/hackathon/logo.png"),
  ]);
  ctx.drawImage(itdaLogo, p(402), p(65), p(52), p(52));
  const ukisWidth = p(145);
  const ukisNaturalHeight = ukisWidth * (ukisLogo.naturalHeight / ukisLogo.naturalWidth);
  const ukisHeight = Math.min(p(52), ukisNaturalHeight);
  ctx.drawImage(ukisLogo, p(466), p(65) + (p(52) - ukisHeight) / 2, ukisWidth, ukisHeight);

  ctx.textAlign = "center";
  ctx.fillStyle = NAVY;
  ctx.font = `${p(46)}px Marcellus, serif`;
  ctx.fillText("Certificate of participation", p(500), p(184));
  ctx.fillStyle = GOLD_TEXT;
  ctx.font = `500 ${p(11)}px Poppins, sans-serif`;
  ctx.fillText("THIS IS TO CERTIFY THAT", p(500), p(230));

  const nameSize = fitText(ctx, participant.fullName, p(610), p(72), p(40), "'Alex Brush', cursive");
  ctx.fillStyle = NAVY;
  ctx.font = `${nameSize}px 'Alex Brush', cursive`;
  ctx.fillText(participant.fullName, p(500), p(330));
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = p(1.3);
  ctx.beginPath(); ctx.moveTo(p(208), p(354)); ctx.lineTo(p(792), p(354)); ctx.stroke();

  ctx.fillStyle = NAVY;
  ctx.font = `${p(10.5)}px Poppins, sans-serif`;
  ctx.fillText("for participating in the Uttarakhand Innovation & Solutions Hackathon 2026,", p(500), p(389));
  ctx.fillText("where they contributed ideas, collaboration and innovation towards building", p(500), p(405));
  ctx.fillText("practical solutions for a stronger Uttarakhand.", p(500), p(421));

  ctx.strokeStyle = GOLD;
  ctx.lineWidth = p(1.2);
  ctx.beginPath(); ctx.moveTo(p(195), p(536)); ctx.lineTo(p(395), p(536)); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(p(605), p(536)); ctx.lineTo(p(805), p(536)); ctx.stroke();
  ctx.fillStyle = NAVY;
  ctx.font = `500 ${p(7.5)}px Poppins, sans-serif`;
  ctx.fillText("INFORMATION TECHNOLOGY DEVELOPMENT AGENCY", p(295), p(520));
  ctx.font = `${p(9)}px Poppins, sans-serif`;
  ctx.fillText("Government of Uttarakhand", p(295), p(558));
  ctx.font = `500 ${p(10)}px Poppins, sans-serif`;
  ctx.fillText("AXOLOTL EMPRISE LLP", p(705), p(520));
  ctx.font = `${p(9)}px Poppins, sans-serif`;
  ctx.fillText("Organiser", p(705), p(558));

  drawSeal(ctx);
  ctx.fillStyle = NAVY;
  ctx.font = `${p(9)}px Poppins, sans-serif`;
  ctx.fillText(`Certificate ID:     ${participant.hash.slice(0, 16).toUpperCase()}`, p(405), p(630));
  ctx.fillText(`Registration Date:     ${formatCertificateDate(participant.issuedAt)}`, p(620), p(630));

  if (preview) {
    ctx.save();
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.rotate(-Math.PI / 14);
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(38, 52, 95, 0.08)";
    ctx.font = `600 ${p(105)}px Poppins, sans-serif`;
    ctx.fillText("PREVIEW", 0, p(30));
    ctx.restore();
  }
  return canvas;
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
  const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [canvas.width, canvas.height], hotfixes: ["px_scaling"] });
  pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, canvas.width, canvas.height, undefined, "FAST");
  pdf.save(`${certificateFileName(participant)}.pdf`);
}
