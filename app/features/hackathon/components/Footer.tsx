/**
 * Footer - Uttarakhand Innovation & Solutions Hackathon
 */
import { Facebook, Instagram, Linkedin, Phone, Youtube, type LucideIcon } from "lucide-react";
import { Link } from "~/features/hackathon/lib/router";
import { useTheme } from "~/features/hackathon/contexts/ThemeContext";
import { WHATSAPP_COMMUNITY_URL } from "~/features/hackathon/components/WhatsAppCommunityCta";
import { WhatsAppLogo } from "~/features/hackathon/components/WhatsAppLogo";
import { InstagramLogo } from "~/features/hackathon/components/InstagramLogo";

const INSTAGRAM_URL = "https://www.instagram.com/ukis.hackathon/";

const SOCIAL_LINKS: { icon: LucideIcon; label: string; href: string; hoverClass: string }[] = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/devbhoomi-ai-summit/",
    hoverClass: "hover:text-[#0A66C2]",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/devbhoomi_ai_summit/",
    hoverClass: "hover:text-[#E4405F]",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61591908117967",
    hoverClass: "hover:text-[#1877F2]",
  },
  {
    icon: Youtube,
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCo2Gq0ZKw3m0_cDf_conEsQ",
    hoverClass: "hover:text-[#FF0000]",
  },
];

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="absolute top-0 left-0 right-0 h-[2px] brand-gradient opacity-40" />
      <div className="container py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <img
                src="/hackathon/logo.png"
                alt="Uttarakhand Innovation & Solutions Hackathon"
                className={`h-12 w-auto max-w-[240px] object-contain object-left ${theme === "light" ? "brightness-0" : ""}`}
                width={240}
                height={48}
              />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Connecting Uttarakhand problems with builders and solutions for
              Devbhoomi.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm text-foreground mb-4">Programme</h4>
            <div className="flex flex-col gap-2">
              <Link href="/problems" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Published Problems
              </Link>
              <Link href="/solutions" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Registered Solutions
              </Link>
              <Link href="/mentors" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Mentors
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm text-foreground mb-4">Get Involved</h4>
            <div className="flex flex-col gap-2">
              <Link href="/register/solution" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Register a Solution
              </Link>
              <Link href="/register/mentor" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Become a Mentor
              </Link>
              <a
                href="tel:+916399910916"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" strokeWidth={1.8} />
                +91 63999 10916
              </a>
              <a
                href={WHATSAPP_COMMUNITY_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#25D366] transition-colors"
              >
                <WhatsAppLogo className="w-4 h-4 text-[#25D366]" />
                Join WhatsApp Community
              </a>
            </div>

            <h4 className="font-display font-semibold text-sm text-foreground mt-6 mb-3">Follow Us</h4>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Devbhoomi AI Summit on ${social.label}`}
                  title={social.label}
                  className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border text-muted-foreground transition-colors ${social.hoverClass}`}
                >
                  <social.icon className="w-4 h-4" strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Uttarakhand Innovation & Solutions Hackathon. All rights reserved.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#E4405F] transition-colors"
            aria-label="UKIS Hackathon on Instagram"
          >
            <InstagramLogo className="w-3.5 h-3.5 text-[#E4405F]" />
            @ukis.hackathon
          </a>
        </div>
      </div>
    </footer>
  );
}
