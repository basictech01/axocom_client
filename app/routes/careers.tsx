import React, { useState } from 'react';
import Navbar from '../components/static_components/Navbar';

interface CardProps {
  title: string;
  image: string;
  description: string;
  idealCandidates: string;
}

const Card: React.FC<CardProps> = ({ title, image, description, idealCandidates }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div
        className="group relative rounded-2xl overflow-hidden aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-2"
        onClick={() => setShowDetails(true)}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url("${image}")` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white leading-tight group-hover:text-primary transition-colors">{title}</h3>
          <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs sm:text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
            <span>Learn More</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showDetails && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="bg-white border border-gray-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="h-48 bg-cover bg-center relative"
              style={{ backgroundImage: `url("${image}")` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
              <button
                onClick={() => setShowDetails(false)}
                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">{title}</h3>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                {description}
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h4 className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Ideal Candidates</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {idealCandidates}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Careers: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-background-dark font-space">
      <Navbar />

      {/* Main Content */}
      <div className="pt-32 pb-20 px-4 md:px-10 lg:px-20">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-16">

          {/* Hero Header */}
          <div className="relative rounded-3xl overflow-hidden min-h-[300px] md:min-h-[350px] flex flex-col justify-center items-center text-center p-6 md:p-8 border border-gray-200 shadow-2xl shadow-indigo-500/10"
            style={{
              background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 30%, #C7D2FE 60%, #A5B4FC 100%)'
            }}
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-400/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-violet-400/15 rounded-full blur-[80px] pointer-events-none"></div>
            <h1 className="relative z-10 text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight">
              The Internship That Changes Everything
            </h1>
            <p className="relative z-10 text-gray-600 text-base md:text-lg max-w-2xl leading-relaxed">
              We're opening our doors to the next generation. Learn from journalists, engineers, PR experts, and creative directors. Build real campaigns. Use real AI tools.
            </p>
          </div>

          {/* Roles Grid */}
          <div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 px-2 border-l-4 border-primary pl-4">
              Find Your Path
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              <Card
                title="Strategy & Research Analyst"
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuDMhe5JsMzjBOcDNctqc-o8gh7VHHmlGdJcDl4poN1MjOC5HpmD52q5u9sMcmmj7WcVBZ-6ESegaZPiPdoLl1o4kzkBJbkTfVJPN0q1ERzp5l_LwHSxTeH5z0YwE-mHuFQAxNr6HG6ZUetW_LCDGe4RutlcxzF624yt3jYuFB1rLSv0lJXvibk32QBr7Gef9Giv4b8eAy2RgMJ9IoxHH2f8qccItoerUgNOM2THQig9P3YSxnFjYgLew7lA4jPBDcOdLesrE0h0aJgJ"
                description="Interns in this technical role will work directly with client brands, conducting deep-dive market research, identifying upcoming trends, and developing sophisticated, data-driven communication strategies. A core component involves working with our engineering teams to build data pipelines and contribute to our proprietary knowledge graph."
                idealCandidates="Students studying Mass Communication, Law (LLB), Political Science, History, or Sociology, or related analytical fields."
              />
              <Card
                title="Creative & Generative Production"
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuAEUg5IiwvNwZs_3LUwyI1DaauQl_ReN38dn33VYyvPKE-BTYc2ZYJUqoRcI0jMpJTGq5CtJtRYnd_cs-WYSuY98x_nLETLIVmxHTskI_T1-BsQynYlyDl1eezYMVSkhRX55LDaRH79F1gE60kaf--1f6BqsPGzDkzubzmMfktdqdnua5Xmvtbq9pGmWQt1Ex8EZHAlucm2BudO_fIa4mhh7Ido-ckG4y9qVfCXLnWVllTflcCH_wiHEy_ZGsdRq947ENrpTfrL3DdE"
                description="This role focuses on conceptualizing and materializing ideas into high-quality creative assets using our advanced production tools. Responsibilities include creating dynamic assets like digital artwork, short films, articles, and comprehensive video/photo content that fuel our brand campaigns and media entities."
                idealCandidates="Students studying Visual Communication, Bachelor of Fine Arts (BFA), Graphic Designing, Video Editing, and Photo Editing."
              />
              <Card
                title="Client Service & Account Management"
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuCLkBLL1pweRHOMDWqM1TrxQxcEcWA98XwRecgAJr72BnsROGMVkhxHhDj7gC_9zBt_ER-qhDMVoojxS1lOTllziWrz8PHAlLksD8pyOGug7MkY9KGvTAJDwTALRTHPyd1_uXJzm5IyEP2d51_9bY43anHkk6Fsf6M-qLEkW-4fGVmyGRCJL8xGswg245RbJKxpQ7lZdedfFYDFmV65zsfCMf0zomF15oSIIMUsWv9es1KuzUhwPfWw_y6u9U9QvoJuSUZIrIu35sOR"
                description="These interns will serve as the primary relationship managers for individual clients and media entities. They oversee strategic planning, project execution, and ensure client goals are met through the effective deployment of our technology and services."
                idealCandidates="Students studying Digital Marketing, MBA (Sales & Marketing), or those who possess exceptional communication and leadership skills."
              />
            </div>

            {/* Instruction for users */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-base">info</span>
                <span>Click on any card to learn more about the role and ideal candidate profile</span>
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 md:p-12 text-center border border-gray-200">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Shape the Future?
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Submit your application and join a team that's redefining media, technology, and communication.
            </p>
            <a
              href="https://forms.gle/UHYhSjUmgqnTf4py6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-primary hover:bg-indigo-600 text-white font-semibold rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-primary/30"
            >
              Apply Now
            </a>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-10 px-6 border-t border-gray-200 bg-gray-50 text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Top Section: Branding and Social Links */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start">
              <h2 className=" text-2xl text-gray-900 mb-1" style={{ fontFamily: 'HelloParis' }}>AXOCOM</h2>
              <span className="text-xs uppercase tracking-widest text-gray-500">Axolotl Emprise LLP</span>
            </div>

            <div className="flex gap-6">
              <a href="https://www.youtube.com/@AxoComTechXMedia" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
              </a>
              <a href="https://www.instagram.com/axocommedia/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </a>
              <a href="https://www.linkedin.com/company/axocom-tech-x-media/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
            </div>
          </div>

          {/* Middle Section: Media Entities */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-gray-900 text-sm font-bold uppercase tracking-wider">Our Media Entities</h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="https://www.hillsquills.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Hillsquills</a>
              <span className="text-gray-600">•</span>
              <a href="https://india7live.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">India7Live</a>
              <span className="text-gray-600">•</span>
              <a href="https://tehelkaindianews.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Tehelka India News</a>
              <span className="text-gray-600">•</span>
              <a href="https://www.youtube.com/@Lawmedy_yt" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Lawmedy</a>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400">Cyber Youth India</span>
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

export default Careers;