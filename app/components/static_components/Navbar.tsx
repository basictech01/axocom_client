import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

const events = [
  { to: '/nprweek2026', label: 'NPR Week 2026' },
  { to: '/DevbhoomiAISummit', label: 'Devbhoomi AI Summit' },
  { to: '/UKISHackathon', label: 'UKIS Hackathon' },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isMobileEventsOpen, setIsMobileEventsOpen] = useState(false);
  const eventsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (eventsRef.current && !eventsRef.current.contains(event.target as Node)) setIsEventsOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const partnerUp = () => {
    setIsMenuOpen(false);
    if (window.location.pathname === '/') document.getElementById('finale')?.scrollIntoView({ behavior: 'smooth' });
    else navigate('/#finale');
  };

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 bg-white/90 text-[#101116] backdrop-blur-xl">
        <div className="landing-shell flex h-20 items-center justify-between">
          <Link to="/" aria-label="AxoCom home" className="flex items-center">
            <img src="/images/logo2.png" alt="AxoCom" className="h-9 w-auto" />
          </Link>

          <div className="hidden items-center gap-9 lg:flex">
            <Link to="/election-management" className="text-sm font-medium text-black/60 transition-colors hover:text-black">Elections</Link>
            <div className="relative" ref={eventsRef}>
              <button type="button" onClick={() => setIsEventsOpen(!isEventsOpen)} aria-expanded={isEventsOpen} className="flex items-center gap-1.5 text-sm font-medium text-black/60 transition-colors hover:text-black">
                Events <ChevronDown className={`size-4 transition-transform ${isEventsOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              {isEventsOpen && (
                <div className="absolute left-1/2 top-full mt-5 w-64 -translate-x-1/2 border border-white/15 bg-[#0b0b0b] p-2 shadow-2xl">
                  {events.map((event) => (
                    <Link key={event.to} to={event.to} onClick={() => setIsEventsOpen(false)} className="block px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-[#4f95e8] hover:text-[#101116]">{event.label}</Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/careers" className="text-sm font-medium text-black/60 transition-colors hover:text-black">Careers</Link>
          </div>

          <button type="button" onClick={partnerUp} className="hidden rounded-full bg-[#101116] px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.03] lg:block">Partner Up</button>
          <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMenuOpen} className="flex size-11 items-center justify-center border border-black/30 lg:hidden">
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-40 flex flex-col bg-[#4f95e8] px-5 pb-8 pt-28 text-[#101116] transition-transform duration-500 lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <Link to="/election-management" onClick={() => setIsMenuOpen(false)} className="border-b border-black/20 py-5 text-4xl font-black">Elections</Link>
        <div className="border-b border-black/20 py-5">
          <button type="button" onClick={() => setIsMobileEventsOpen(!isMobileEventsOpen)} aria-expanded={isMobileEventsOpen} className="flex w-full items-center justify-between text-4xl font-black">
            Events <ChevronDown className={`size-7 transition-transform ${isMobileEventsOpen ? 'rotate-180' : ''}`} />
          </button>
          {isMobileEventsOpen && <div className="mt-4 border-l border-black/30 pl-5">{events.map((event) => <Link key={event.to} to={event.to} onClick={() => setIsMenuOpen(false)} className="block py-2 text-lg text-black/65">{event.label}</Link>)}</div>}
        </div>
        <Link to="/careers" onClick={() => setIsMenuOpen(false)} className="border-b border-black/20 py-5 text-4xl font-black">Careers</Link>
        <button type="button" onClick={partnerUp} className="mt-auto bg-[#101116] py-4 text-lg font-bold text-white">Partner Up</button>
      </div>
    </>
  );
};

export default Navbar;
