import React from 'react';
import { Link } from 'react-router';
import { Instagram, Linkedin, Youtube } from 'lucide-react';

const legalLinks = [
  { to: '/support', label: 'Support' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms-and-conditions', label: 'Terms & Conditions' },
  { to: '/refund-policy', label: 'Refund & Cancellation' },
];

const LegalFooter: React.FC = () => (
  <footer className="bg-[#101116] py-12 text-white">
    <div className="landing-shell grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto] md:items-end">
      <div>
        <img src="/images/logo2.png" alt="AxoCom" className="h-10 w-auto brightness-0 invert" />
        <p className="mt-3 text-[10px] font-bold uppercase tracking-[.14em] text-white/40">Axolotl Emprise LLP</p>
      </div>
      <div className="flex gap-5">
        <a href="https://www.youtube.com/@AxoComTechXMedia" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube className="size-5" /></a>
        <a href="https://www.instagram.com/axocommedia/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram className="size-5" /></a>
        <a href="https://www.linkedin.com/company/axocom-tech-x-media/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin className="size-5" /></a>
      </div>
    </div>
    <div className="landing-shell mt-9 flex flex-col gap-5 border-t border-white/10 pt-5 md:flex-row md:items-center md:justify-between">
      <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-white/50">
        {legalLinks.map((link) => (
          <Link key={link.to} to={link.to} className="transition-colors hover:text-white">{link.label}</Link>
        ))}
      </nav>
      <p className="text-xs text-white/30">© 2026 AxoCom · Axolotl Emprise LLP. All rights reserved.</p>
    </div>
  </footer>
);

export default LegalFooter;
