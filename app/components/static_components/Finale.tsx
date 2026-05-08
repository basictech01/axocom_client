import React from 'react';
import { Link } from 'react-router';

const Finale: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-white font-space flex flex-col pt-24">
      <div className="flex-1 flex flex-col items-center justify-center p-4">

        <div className="w-full max-w-[960px] relative rounded-2xl md:rounded-3xl overflow-hidden flex flex-col items-center justify-center text-center p-8 md:p-12 shadow-2xl shadow-indigo-500/10 border border-gray-200"
          style={{
            background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 30%, #C7D2FE 60%, #A5B4FC 100%)'
          }}
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/20 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-400/15 rounded-full blur-[60px] pointer-events-none"></div>
          <h1 className="relative z-10 text-gray-900 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 md:mb-6 tracking-tight">
            Join the revolution.
          </h1>
          <h2 className="relative z-10 text-gray-600 text-base sm:text-lg md:text-2xl max-w-2xl font-light mb-8 md:mb-10">
            Let’s build the future of media together. AxoCom. Where campaigns meet code.
          </h2>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full justify-center items-center mb-10">
            <a
              href="mailto:pranav.pandey@axocom.in?subject=Collaboration%20Inquiry%20-%20AxoCom&body=Hello%20AxoCom%20Team%2C%0D%0A%0D%0AI%20am%20interested%20in%20collaborating%20with%20AxoCom.%0D%0A%0D%0AName%3A%20%0D%0AOrganization%2FCompany%3A%20%0D%0AEmail%3A%20%0D%0APhone%3A%20%0D%0A%0D%0ACollaboration%20Interest%3A%0D%0A%5BPlease%20describe%20your%20collaboration%20idea%20or%20inquiry%5D%0D%0A%0D%0ABest%20regards"
              className="w-full sm:w-auto px-8 py-3 md:px-10 md:py-4 bg-primary hover:bg-indigo-600 text-white font-semibold rounded-xl text-base md:text-lg transition-all transform hover:scale-105 shadow-lg shadow-primary/30 inline-block text-center"
            >
              Partner With Us
            </a>
            <Link
              to="/careers"
              className="w-full sm:w-auto px-8 py-3 md:px-10 md:py-4 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold rounded-xl text-base md:text-lg transition-all transform hover:scale-105 inline-block text-center"
            >
              Join Our Team
            </Link>
          </div>

          <div className="relative z-10 text-gray-500 text-sm max-w-2xl">
            <p>Want to transform your brand's narrative? Build cutting-edge media tech? Shape the future of communication? Let's talk.</p>
          </div>
        </div>
      </div>

      <footer className="w-full py-10 px-6 border-t border-gray-200 bg-white text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Top Section: Branding and Social Links */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start">
              <img src="/images/logo2.png" alt="AxoCom" className="h-12 mb-2" />
              <span className="text-xs uppercase tracking-widest text-gray-400">Axolotl Emprise LLP</span>
              <div className="flex flex-col gap-0.5 mt-2">
                <a href="tel:+916399905916" className="text-sm text-gray-500 hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">call</span>+91 63999 05916
                </a>
                <a href="tel:+916399906916" className="text-sm text-gray-500 hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">call</span>+91 63999 06916
                </a>
              </div>
            </div>

            <div className="flex gap-6">
              <a href="https://www.youtube.com/@AxoComTechXMedia" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
              </a>
              <a href="https://www.instagram.com/axocommedia" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </a>
              <a href="https://www.linkedin.com/company/axocom-tech-x-media/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
            </div>
          </div>


          {/* Bottom Section: Copyright */}
          <div className="text-center pt-4 border-t border-gray-100">
            <p className="text-sm">© 2024 AxoCom. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Finale;