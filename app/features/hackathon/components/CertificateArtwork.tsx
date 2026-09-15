import { useEffect, useId, useState } from "react";
import type { CertificateParticipant } from "~/features/hackathon/types";
import { formatCertificateDate } from "~/features/hackathon/lib/certificate";
import {
  CERTIFICATE_DESIGN,
  layoutCertificateName,
  type CertificateNameLayout,
} from "~/features/hackathon/lib/certificate-design";

interface CertificateArtworkProps {
  participant: CertificateParticipant;
  preview?: boolean;
}

interface CertificateSvgProps extends CertificateArtworkProps {
  idPrefix: string;
  nameLayout?: CertificateNameLayout;
}

const c = CERTIFICATE_DESIGN.colours;

/** The single artwork source for the on-screen certificate, PNG and PDF. */
export function CertificateSvg({
  participant,
  preview = false,
  idPrefix,
  nameLayout = layoutCertificateName(participant.fullName),
}: CertificateSvgProps) {
  const gradient = (name: string) => `url(#${idPrefix}-${name})`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={CERTIFICATE_DESIGN.width}
      height={CERTIFICATE_DESIGN.height}
      viewBox="0 0 1000 707"
      style={{ display: "block", width: "100%", height: "auto" }}
      aria-hidden="true"
      fontFamily="Poppins, sans-serif"
    >
      <defs>
        <linearGradient id={`${idPrefix}-accent`} x1="0" y1="0" x2="1" y2="0">
          <stop stopColor={c.cyan} /><stop offset="1" stopColor={c.blue} />
        </linearGradient>
        <linearGradient id={`${idPrefix}-panel`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={c.navy} /><stop offset="1" stopColor={c.ink} />
        </linearGradient>
        <linearGradient id={`${idPrefix}-mountain`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={c.glacier} stopOpacity="0.48" /><stop offset="1" stopColor={c.navy} stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${idPrefix}-panel-clip`}><rect x="750" width="250" height="617" /></clipPath>
      </defs>

      <rect width="1000" height="707" fill={c.paper} />
      <rect width="750" height="5" fill={gradient("accent")} />
      <rect x="750" width="250" height="617" fill={gradient("panel")} />
      <rect x="749" width="1" height="617" fill={c.glacier} fillOpacity="0.35" />

      {/* A Himalayan landscape meeting a connected, technological future. */}
      <g clipPath={gradient("panel-clip")}>
        <g fill="none" stroke={c.glacier} strokeWidth="0.7" opacity="0.15">
          {[100, 126, 152, 178, 204, 230].map((radius) => (
            <circle key={radius} cx="1014" cy="28" r={radius} />
          ))}
          <path d="M769 327V284L790 263V220M966 292V237L943 214V157M784 470H823L850 497H978" />
        </g>
        <g fill={c.cyan}>
          <circle cx="790" cy="220" r="2.5" /><circle cx="943" cy="157" r="2.5" />
        </g>
        <circle cx="937" cy="275" r="33" fill={c.glacier} fillOpacity="0.06" />
        <circle cx="937" cy="275" r="24" fill="none" stroke={c.cyan} strokeOpacity="0.25" strokeWidth="0.7" />
        <path d="M750 431L791 363L812 381L870 280L910 337L932 309L1000 410V509H750Z" fill={gradient("mountain")} />
        <path d="M750 431L791 363L812 381L870 280L910 337L932 309L1000 410" fill="none" stroke={c.glacier} strokeWidth="1.2" strokeOpacity="0.75" />
        <path d="M870 280L847 359L870 344L889 365Z" fill={c.paper} fillOpacity="0.8" />
        <path d="M870 280L870 344L889 365Z" fill={c.cyan} fillOpacity="0.4" />
        <path d="M791 363L779 384L790 378L802 389Z M932 309L919 335L933 328L947 344Z" fill={c.paper} fillOpacity="0.5" />
        <path d="M750 467L807 414L860 461L932 380L1000 445V512H750Z" fill={c.navy} />
        <path d="M750 467L807 414L860 461L932 380L1000 445" fill="none" stroke={c.glacier} strokeWidth="0.8" strokeOpacity="0.55" />
        <path d="M750 505L813 463L874 489L929 456L1000 496V617H750Z" fill={c.ink} fillOpacity="0.7" />
        <path d="M895 430C830 472 954 467 912 498C887 517 871 522 889 545" fill="none" stroke={c.cyan} strokeWidth="2" strokeOpacity="0.7" />
        <g fill={c.cyan} stroke={c.navy} strokeWidth="2">
          <circle cx="895" cy="430" r="3.5" /><circle cx="912" cy="498" r="3.5" />
        </g>
      </g>

      <text x="782" y="52" fill={c.cyan} fontSize="10" letterSpacing="3">UKIS HACKATHON</text>
      <text x="780" y="118" fill={c.paper} fontFamily="Marcellus, serif" fontSize="61">2026</text>
      <line x1="782" y1="143" x2="822" y2="143" stroke={c.cyan} strokeWidth="2" />
      <text x="782" y="184" fill={c.paper} fontFamily="Marcellus, serif" fontSize="27">
        <tspan x="782">Ideas. Impact.</tspan>
        <tspan x="782" dy="35">Uttarakhand.</tspan>
      </text>
      <text x="782" y="565" fill={c.cyan} fontSize="9" letterSpacing="1.5">REAL PROBLEMS. REAL SOLUTIONS.</text>
      <text x="782" y="587" fill={c.paper} fillOpacity="0.8" fontSize="10">Built for Devbhoomi.</text>

      {/* Event identity is separate from the supporting partner strip. */}
      <image href="/hackathon/logo.png" x="56" y="32" width="157" height="99" preserveAspectRatio="xMidYMid meet" />
      <line x1="237" y1="54" x2="237" y2="111" stroke={c.line} strokeWidth="0.8" />
      <text x="261" y="72" fill={c.navy} fontSize="11" fontWeight="600" letterSpacing="0.5">
        <tspan x="261">UTTARAKHAND INNOVATION</tspan>
        <tspan x="261" dy="18">&amp; SOLUTIONS HACKATHON</tspan>
      </text>
      <text x="261" y="110" fill={c.muted} fontSize="9" letterSpacing="1.3">AI · GOVTECH · CIVIC INNOVATION</text>
      <line x1="60" y1="149" x2="690" y2="149" stroke={c.line} strokeWidth="0.8" />

      <text x="58" y="216" fill={c.navy} fontFamily="Marcellus, serif" fontSize="60" letterSpacing="-1.5">Certificate</text>
      <text x="62" y="247" fill={c.blue} fontSize="14" fontWeight="600" letterSpacing="4.5">OF PARTICIPATION</text>
      <text x="62" y="287" fill={c.muted} fontSize="9" letterSpacing="2.1">THIS IS TO CERTIFY THAT</text>

      <text
        data-certificate-name="true"
        x="60"
        fill={c.ink}
        fontFamily="Marcellus, serif"
        fontSize={nameLayout.fontSize}
      >
        {nameLayout.lines.map((line, index) => (
          <tspan
            key={index}
            x="60"
            y={nameLayout.lines.length > 1 ? 322 + index * 35 : 337}
            textLength={nameLayout.constrained ? CERTIFICATE_DESIGN.nameWidth : undefined}
            lengthAdjust={nameLayout.constrained ? "spacingAndGlyphs" : undefined}
          >{line}</tspan>
        ))}
      </text>
      <line x1="60" y1="373" x2="687" y2="373" stroke={c.line} strokeWidth="0.8" />
      <line x1="60" y1="373" x2="137" y2="373" stroke={c.azure} strokeWidth="2" />

      <text x="60" y="400" fill={c.muted} fontSize="11">In recognition of their participation in the</text>
      <text x="60" y="422" fill={c.navy} fontSize="12" fontWeight="600">Uttarakhand Innovation &amp; Solutions Hackathon 2026</text>
      <text x="60" y="445" fill={c.muted} fontSize="11">
        <tspan x="60">and their contribution of ideas, collaboration and innovation</tspan>
        <tspan x="60" dy="18">towards practical solutions for a stronger Uttarakhand.</tspan>
      </text>

      <line x1="60" y1="504" x2="321" y2="504" stroke={c.line} strokeWidth="0.8" />
      <line x1="415" y1="504" x2="687" y2="504" stroke={c.line} strokeWidth="0.8" />
      <text x="60" y="522" fill={c.navy} fontSize="8.5" fontWeight="600">
        <tspan x="60">INFORMATION TECHNOLOGY</tspan>
        <tspan x="60" dy="13">DEVELOPMENT AGENCY</tspan>
      </text>
      <text x="60" y="551" fill={c.muted} fontSize="8.5">Government of Uttarakhand</text>
      <text x="415" y="522" fill={c.navy} fontSize="10" fontWeight="600">AXOLOTL EMPRISE LLP</text>
      <text x="415" y="540" fill={c.muted} fontSize="8.5">Organiser</text>

      <rect x="60" y="570" width="627" height="33" rx="3" fill={c.mist} />
      <text x="72" y="591" fill={c.muted} fontSize="7.5">CERTIFICATE ID</text>
      <text x="152" y="591" fill={c.navy} fontSize="8.5" letterSpacing="0.4">{participant.hash.slice(0, 16).toUpperCase()}</text>
      <line x1="355" y1="578" x2="355" y2="595" stroke={c.line} strokeWidth="0.8" />
      <text x="370" y="591" fill={c.muted} fontSize="7.5">REGISTRATION DATE</text>
      <text x="476" y="591" fill={c.navy} fontSize="8.5">{formatCertificateDate(participant.issuedAt)}</text>

      <line x1="32" y1="617" x2="968" y2="617" stroke={c.line} strokeWidth="0.8" />
      <g>
        <image href="/itda_without_background.png" x="62" y="631" width="38" height="38" preserveAspectRatio="xMidYMid meet" />
        <text x="81" y="681" textAnchor="middle" fill={c.navy} fontSize="6.5" fontWeight="600" letterSpacing="1">ITDA</text>
        <image href="/images/uttarakhand_government.svg" x="184" y="630" width="40" height="40" preserveAspectRatio="xMidYMid meet" />
        <text x="204" y="681" textAnchor="middle" fill={c.navy} fontSize="5.5" fontWeight="600">UTTARAKHAND GOVT.</text>
        <image href="/images/logo2.png" x="300" y="636" width="136" height="39" preserveAspectRatio="xMidYMid meet" />
        <image href="/hackathon/logos/namami-gange.png" x="472" y="630" width="90" height="47" preserveAspectRatio="xMidYMid meet" />
        <image href="/hackathon/logos/graphic-era.svg" x="605" y="632" width="181" height="44" preserveAspectRatio="xMidYMid meet" />
        <image href="/hackathon/logos/tbi-geu.png" x="827" y="631" width="43" height="43" preserveAspectRatio="xMidYMid meet" />
        <text x="881" y="643" fill={c.navy} fontSize="7.5" fontWeight="600">
          <tspan x="881">Technology</tspan><tspan x="881" dy="11">Business</tspan><tspan x="881" dy="11">Incubator</tspan>
        </text>
      </g>
      <rect y="701" width="1000" height="6" fill={gradient("accent")} />

      {preview && (
        <g fill={c.navy} fontWeight="600" textAnchor="middle">
          <text x="374" y="370" fontSize="88" fillOpacity="0.065" letterSpacing="10" transform="rotate(-16 374 350)">PREVIEW</text>
          <text x="500" y="694" fontSize="6" letterSpacing="1.5">DESIGN PREVIEW · NOT A VALID CERTIFICATE</text>
        </g>
      )}
    </svg>
  );
}

export function CertificateArtwork({ participant, preview = false }: CertificateArtworkProps) {
  const idPrefix = useId();
  const [measuredName, setMeasuredName] = useState<{ name: string; layout: CertificateNameLayout } | null>(null);

  useEffect(() => {
    let cancelled = false;
    // Measure the actual font, not character count, for wide and multilingual names.
    document.fonts.load("46px Marcellus").then(() => {
      const context = document.createElement("canvas").getContext("2d");
      if (!context || cancelled) return;
      const layout = layoutCertificateName(participant.fullName, (text, size) => {
        context.font = `${size}px Marcellus, serif`;
        return context.measureText(text).width;
      });
      setMeasuredName({ name: participant.fullName, layout });
    }).catch(() => { /* Retain the conservative fallback if a font cannot load. */ });
    return () => { cancelled = true; };
  }, [participant.fullName]);

  return (
    <div
      className="w-full overflow-hidden bg-white shadow-2xl ring-1 ring-black/5"
      role="img"
      aria-label={`${preview ? "Design preview — not a valid certificate. " : ""}Certificate of participation for ${participant.fullName}. Uttarakhand Innovation & Solutions Hackathon 2026. Certificate ID: ${participant.hash.slice(0, 16).toUpperCase()}. Registration date: ${formatCertificateDate(participant.issuedAt)}.`}
    >
      <CertificateSvg
        participant={participant}
        preview={preview}
        idPrefix={idPrefix}
        nameLayout={measuredName?.name === participant.fullName ? measuredName.layout : undefined}
      />
    </div>
  );
}