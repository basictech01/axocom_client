// Fixed print colours: certificates must not change with the site's day/night mode.
export const CERTIFICATE_DESIGN = {
  width: 1000,
  height: 707,
  nameWidth: 625,
  colours: {
    navy: "#053075",
    ink: "#10213A",
    muted: "#526174",
    blue: "#0058D4",
    azure: "#168FED",
    cyan: "#35DCF5",
    glacier: "#38B5F2",
    line: "#CBD6E2",
    paper: "#FFFFFF",
    mist: "#EDF5FB",
  },
  fonts: [
    { family: "Marcellus", url: "/fonts/Marcellus-Regular.ttf" },
    { family: "Poppins", url: "/fonts/Poppins-Regular.ttf" },
  ],
} as const;

export interface CertificateNameLayout {
  lines: string[];
  fontSize: number;
  constrained: boolean;
}

type MeasureText = (text: string, fontSize: number) => number;

/** Keep long names intact, using two balanced lines before resorting to compression. */
export function layoutCertificateName(
  fullName: string,
  measure: MeasureText = (text, size) => Array.from(text).length * size * 0.62,
): CertificateNameLayout {
  const name = fullName.trim().replace(/\s+/g, " ");
  const { nameWidth } = CERTIFICATE_DESIGN;
  const width = Math.max(measure(name, 1), 1);
  const singleLineSize = Math.min(46, nameWidth / width);
  let lines = [name];

  if (singleLineSize < 30) {
    const words = name.split(" ");
    let bestWidth = Infinity;
    for (let index = 1; index < words.length; index++) {
      const candidate = [words.slice(0, index).join(" "), words.slice(index).join(" ")];
      const candidateWidth = Math.max(...candidate.map((line) => measure(line, 1)));
      if (candidateWidth < bestWidth) {
        lines = candidate;
        bestWidth = candidateWidth;
      }
    }
  }

  const widest = Math.max(...lines.map((line) => measure(line, 1)), 1);
  const fontSize = Math.max(18, Math.min(lines.length > 1 ? 36 : 46, nameWidth / widest));
  return { lines, fontSize, constrained: widest * fontSize > nameWidth };
}