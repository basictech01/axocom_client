import React from 'react';
import Navbar from './Navbar';
import LegalFooter from './LegalFooter';

interface LegalLayoutProps {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const LegalLayout: React.FC<LegalLayoutProps> = ({ eyebrow, title, lastUpdated, children }) => (
  <div className="landing-page min-h-screen w-full bg-white text-[#101116]">
    <Navbar />

    <main>
      <section className="border-b border-black/10 bg-white pb-16 pt-40">
        <div className="landing-shell">
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[.14em] text-[#4f95e8]">
            <span className="size-2 rounded-full bg-[#4f95e8]" />
            {eyebrow}
          </p>
          <h1 className="mt-6 max-w-3xl text-[clamp(2.4rem,5vw,4.4rem)] font-semibold leading-[.98] tracking-[-.045em]">{title}</h1>
          <p className="mt-6 text-sm text-black/45">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="landing-shell max-w-3xl">
          <div className="axo-legal-prose">{children}</div>
        </div>
      </section>
    </main>

    <LegalFooter />
  </div>
);

export default LegalLayout;
