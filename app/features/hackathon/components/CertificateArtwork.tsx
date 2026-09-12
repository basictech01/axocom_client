import type { CertificateParticipant } from "~/features/hackathon/types";
import { formatCertificateDate } from "~/features/hackathon/lib/certificate";

interface CertificateArtworkProps {
  participant: CertificateParticipant;
  preview?: boolean;
}

const navy = "#26345f";
const gold = "#d2a851";

export function CertificateArtwork({ participant, preview = false }: CertificateArtworkProps) {
  const nameFontSize = Math.min(76, Math.max(43, 1350 / Math.max(participant.fullName.length, 1)));
  const registrationDate = formatCertificateDate(participant.issuedAt);

  return (
    <div className="relative aspect-[1.414/1] w-full overflow-hidden bg-[#26345f] shadow-2xl" role="img" aria-label={`Certificate of participation for ${participant.fullName}`}>
      <svg viewBox="0 0 1000 707" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M88 29H912C914 68 932 84 972 88V619C932 623 914 640 912 678H88C86 640 68 623 28 619V88C68 84 86 68 88 29Z" fill="#fff" stroke={gold} strokeWidth="5" />
        <path d="M43 46H957V661H43Z" fill="none" stroke={gold} strokeWidth="1.5" />
        <circle cx="28" cy="28" r="6" fill={gold} /><circle cx="972" cy="28" r="6" fill={gold} />
        <circle cx="28" cy="679" r="6" fill={gold} /><circle cx="972" cy="679" r="6" fill={gold} />

        <image href="/itda_without_background.png" x="402" y="65" width="52" height="52" preserveAspectRatio="xMidYMid meet" />
        <image href="/hackathon/logo.png" x="466" y="65" width="145" height="52" preserveAspectRatio="xMidYMid meet" />

        <text x="500" y="184" textAnchor="middle" fill={navy} fontFamily="Marcellus, serif" fontSize="46">Certificate of participation</text>
        <text x="500" y="230" textAnchor="middle" fill="#9d792d" fontFamily="Poppins, sans-serif" fontSize="11" fontWeight="500">THIS IS TO CERTIFY THAT</text>
        <text x="500" y="330" textAnchor="middle" fill={navy} fontFamily="Alex Brush, cursive" fontSize={nameFontSize}>{participant.fullName}</text>
        <line x1="208" y1="354" x2="792" y2="354" stroke={gold} strokeWidth="1.3" />
        <text x="500" y="389" textAnchor="middle" fill={navy} fontFamily="Poppins, sans-serif" fontSize="10.5">
          <tspan x="500">for participating in the Uttarakhand Innovation &amp; Solutions Hackathon 2026,</tspan>
          <tspan x="500" dy="16">where they contributed ideas, collaboration and innovation towards building</tspan>
          <tspan x="500" dy="16">practical solutions for a stronger Uttarakhand.</tspan>
        </text>

        <text x="295" y="520" textAnchor="middle" fill={navy} fontFamily="Poppins, sans-serif" fontSize="7.5" fontWeight="500">INFORMATION TECHNOLOGY DEVELOPMENT AGENCY</text>
        <line x1="195" y1="536" x2="395" y2="536" stroke={gold} strokeWidth="1.2" />
        <text x="295" y="558" textAnchor="middle" fill={navy} fontFamily="Poppins, sans-serif" fontSize="9">Government of Uttarakhand</text>

        <circle cx="500" cy="519" r="54" fill="#fffdf8" stroke={gold} strokeWidth="1.2" />
        <circle cx="500" cy="519" r="45" fill="none" stroke={gold} strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="500" cy="519" r="40" fill="none" stroke={gold} strokeWidth="0.8" />
        <text x="500" y="502" textAnchor="middle" fill="#9d792d" fontFamily="Poppins, sans-serif" fontSize="15">★ ★ ★</text>
        <text x="500" y="526" textAnchor="middle" fill="#9d792d" fontFamily="Poppins, sans-serif" fontSize="12" fontWeight="600">PARTICIPATED</text>
        <text x="500" y="547" textAnchor="middle" fill="#9d792d" fontFamily="Poppins, sans-serif" fontSize="12" fontWeight="600">UKIS 2026</text>

        <text x="705" y="520" textAnchor="middle" fill={navy} fontFamily="Poppins, sans-serif" fontSize="10" fontWeight="500">AXOLOTL EMPRISE LLP</text>
        <line x1="605" y1="536" x2="805" y2="536" stroke={gold} strokeWidth="1.2" />
        <text x="705" y="558" textAnchor="middle" fill={navy} fontFamily="Poppins, sans-serif" fontSize="9">Organiser</text>

        <text x="405" y="630" textAnchor="middle" fill={navy} fontFamily="Poppins, sans-serif" fontSize="9"><tspan fontWeight="500">Certificate ID:</tspan><tspan dx="12">{participant.hash.slice(0, 16).toUpperCase()}</tspan></text>
        <text x="620" y="630" textAnchor="middle" fill={navy} fontFamily="Poppins, sans-serif" fontSize="9"><tspan fontWeight="500">Registration Date:</tspan><tspan dx="12">{registrationDate}</tspan></text>

        {preview && <text x="500" y="410" textAnchor="middle" fill="rgba(38, 52, 95, 0.08)" fontFamily="Poppins, sans-serif" fontSize="105" fontWeight="600" letterSpacing="12" transform="rotate(-13 500 353)">PREVIEW</text>}
      </svg>
    </div>
  );
}
