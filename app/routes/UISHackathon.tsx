import React, { useState } from 'react';
import Navbar from '../components/static_components/Navbar';
import DelegatesSlider from "../components/ai_summit/DelegatesSlider";
import { buildSeoLinks, buildSeoMeta, eventSchema, organizationSchema, structuredData, webPageSchema } from "~/lib/seo";

const seo = {
    title: "Uttarakhand Innovation & Solutions Hackathon",
    description: "A state-wide innovation series by AxoCom for students, developers, and professionals building practical solutions for Uttarakhand through online and on-ground hackathon rounds.",
    path: "/UISHackathon",
    image: "/images/hacka2.png",
    imageAlt: "Uttarakhand Innovation and Solutions Hackathon",
    keywords: [
        "Uttarakhand hackathon",
        "innovation challenge Uttarakhand",
        "student hackathon",
        "AxoCom hackathon",
        "UI Solutions Hackathon",
    ],
};

export const meta = () => buildSeoMeta(seo);
export const links = () => buildSeoLinks(seo);

const speakers = [
  { name: "Rohan Pant", role: "Program Manager, Amazon" },
  { name: "Virendra Pal", role: "Operations Manager, Amazon" },
  { name: "Kevin Patel", role: "Software Engineer, Google" },
  { name: "Anmol Dixit", role: "Senior Software Engineer, Rubrik" },
  { name: "Ayush Gupta", role: "Data Engineer, Zeta" },
  { name: "Sagar Singh", role: "Software Developer, Scapia" },
];

const UISHackathon: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'student',
        experience: 'want to learn',
        idea: '',
    });

    const closeModal = () => setIsModalOpen(false);

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const subject = encodeURIComponent('Uttarakhand Innovation & Solutions Hackathon registration');
        const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\nRole: ${formData.role}\nExperience: ${formData.experience}\n\nIdea (optional): ${formData.idea}`
        );

        const mailtoLink = `mailto:info@axocom.in?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-space text-slate-900">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: structuredData([
                        organizationSchema,
                        webPageSchema(seo),
                        eventSchema({
                            name: seo.title,
                            description: seo.description,
                            path: seo.path,
                            image: seo.image,
                            startDate: "2026-06-01",
                            endDate: "2026-08-31",
                            locationName: "Uttarakhand Innovation Series",
                            locationAddress: "Rudrapur, Roorkee, and Dehradun, Uttarakhand, India",
                        }),
                    ]),
                }}
            />
            <Navbar />

            <main className="pt-28 pb-16 px-4 md:px-10 lg:px-20">
                <div className="max-w-[1400px] mx-auto space-y-16">
                    <section className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white/90 backdrop-blur-xl shadow-2xl shadow-slate-900/5">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,69,19,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(196,181,253,0.14),transparent_30%)] pointer-events-none" />
                        <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] px-6 py-16 sm:px-10 lg:px-14">
                            <div className="space-y-8">
                                <div className="space-y-4 max-w-3xl">
                                    <p className="text-sm uppercase tracking-[0.3em] text-violet-600">Uttarakhand Innovation & Solutions Hackathon</p>
                                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">A State-Wide Innovation Series</h1>
                                    <p className="text-lg leading-8 text-slate-600">
                                        Not just a hackathon. A journey bringing together builders from across Uttarakhand to solve real-world problems through a multi-stage innovation series.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                                        Register Now
                                    </button>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-3">
                                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                        <p className="text-sm text-slate-500 uppercase tracking-[0.2em]">Phase 1</p>
                                        <p className="mt-3 text-2xl font-semibold text-slate-900">Online Hackathon</p>
                                        <p className="mt-2 text-sm text-slate-600">Currently Live</p>
                                    </div>
                                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                        <p className="text-sm text-slate-500 uppercase tracking-[0.2em]">Cities</p>
                                        <p className="mt-3 text-2xl font-semibold text-slate-900">Dehradun, Roorkee, Rudrapur</p>
                                    </div>
                                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                        <p className="text-sm text-slate-500 uppercase tracking-[0.2em]">Focus</p>
                                        <p className="mt-3 text-2xl font-semibold text-slate-900">Real products, real problems</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
                                        In Association With
                                    </p>

                                    <div className="grid gap-4 sm:grid-cols-3">
                                        
                                        {/* ANI */}
                                        <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center">
                                        <img
                                            src="/images/ani.jpeg"
                                            alt="ANI"
                                            className="h-12 object-contain"
                                        />

                                        <p className="mt-4 text-sm font-semibold text-slate-900">
                                            Asian News International
                                        </p>

                                        <p className="mt-1 text-xs text-slate-500">
                                            ANI
                                        </p>
                                        </div>

                                        {/* PTI */}
                                        <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center">
                                        <img
                                            src="/images/pti.jpeg"
                                            alt="PTI"
                                            className="h-12 object-contain"
                                        />

                                        <p className="mt-4 text-sm font-semibold text-slate-900">
                                            Press Trust of India
                                        </p>

                                        <p className="mt-1 text-xs text-slate-500">
                                            PTI
                                        </p>
                                        </div>

                                        {/* ET */}
                                        <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center">
                                        <img
                                            src="/images/et.jpeg"
                                            alt="Economic Times"
                                            className="h-12 object-contain"
                                        />

                                        <p className="mt-4 text-sm font-semibold text-slate-900">
                                            The Economic Times
                                        </p>

                                        <p className="mt-1 text-xs text-slate-500">
                                            ET
                                        </p>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="relative shadow-sm">
                                <div className="relative">
                                    <div className="rounded-3xl overflow-hidden bg-slate-900 h-full">
                                        <video
                                            className="w-full h-full object-contain bg-black"
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            controls
                                        >
                                            <source src="/videos/hackaV.mp4" type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-[1rem] border border-gray-200 bg-white p-5 shadow-xl shadow-slate-900/5">
                        <div className="grid gap-6 md:grid-cols-3">
                            <img src="/images/hacka2.png" alt="Hackathon photo" className="w-full h-48 object-cover rounded-3xl" />
                            <img src="/images/hacha1.png" alt="Hackathon photo" className="w-full h-48 object-cover rounded-3xl" />
                            <img src="/images/hacka.webp" alt="Hackathon secondary visual" className="w-full h-48 object-cover rounded-3xl" />
                        </div>
                    </section>

                    <section className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr]">
                        <div className="space-y-8">
                            <div className="rounded-[2rem] border border-gray-200 bg-white p-10 shadow-xl shadow-slate-900/5">
                                <h2 className="text-3xl font-bold text-slate-900">Not just a hackathon. A journey.</h2>
                                <p className="mt-6 text-lg leading-8 text-slate-600">
                                    The Uttarakhand Innovation & Solutions Hackathon is designed as a multi-stage innovation series, bringing together builders from across the state to solve real-world problems.
                                </p>
                                <p className="mt-4 text-lg leading-8 text-slate-600">
                                    It begins online and evolves into on-ground hackathons across key cities of Uttarakhand.
                                </p>
                            </div>

                            <div className="rounded-[2rem] border border-gray-200 bg-white p-10 shadow-xl shadow-slate-900/5">
                                <h2 className="text-3xl font-bold text-slate-900">Phase 1: Online Hackathon (Currently Live)</h2>
                                <p className="mt-6 text-lg leading-8 text-slate-600">
                                    This is where ideas begin. Open to students, developers, and professionals. Participants start building immediately after registration.
                                </p>
                                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                    {[
                                        'Exploration',
                                        'Ideation',
                                        'Early product building',
                                    ].map((item) => (
                                        <div key={item} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                            <p className="font-semibold text-slate-900">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[2rem] border border-gray-200 bg-white p-10 shadow-xl shadow-slate-900/5">
                                <h2 className="text-3xl font-bold text-slate-900">Phase 2: Evaluation & Shortlisting</h2>
                                <p className="mt-6 text-lg leading-8 text-slate-600">
                                    Final submissions are evaluated on problem relevance, practicality of solution, and execution approach. Selected participants move forward in the journey.
                                </p>
                            </div>
                            
                            <div className="rounded-[2rem] border border-gray-200 bg-white p-10 shadow-xl shadow-slate-900/5">
                                <h2 className="text-3xl font-bold text-slate-900">
                                Phase 3: On-Ground Hackathons
                                </h2>

                                <p className="mt-6 text-lg leading-8 text-slate-600">
                                The hackathon evolves into a three-city offline journey across Uttarakhand, bringing participants closer to real-world problem solving and collaboration.
                                </p>

                                {/* Timeline Grid */}
                                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                {[
                                    {
                                    month: "June",
                                    city: "Rudrapur",
                                    desc: "Kickoff offline hackathon",
                                    },
                                    {
                                    month: "July",
                                    city: "Roorkee",
                                    desc: "Second phase of on-ground builds",
                                    },
                                    {
                                    month: "August",
                                    city: "Dehradun",
                                    desc: "Final hackathon & culmination",
                                    },
                                ].map((item) => (
                                    <div
                                    key={item.city}
                                    className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center"
                                    >
                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                        {item.month}
                                    </p>

                                    <p className="mt-2 text-lg font-semibold text-slate-900">
                                        {item.city}
                                    </p>

                                    <p className="mt-2 text-sm text-slate-600">
                                        {item.desc}
                                    </p>
                                    </div>
                                ))}
                                </div>

                                <p className="mt-6 text-sm text-slate-500 text-center">
                                Exact dates and venues will be announced soon.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="rounded-[2rem] border border-gray-200 bg-white p-10 shadow-xl shadow-slate-900/5">
                                <h2 className="text-3xl font-bold text-slate-900">What happens in offline rounds</h2>
                                <ul className="mt-6 space-y-4 text-slate-600">
                                    <li className="flex items-start gap-3">
                                        <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-violet-500" />
                                        Deeper problem solving
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-violet-500" />
                                        Mentorship from experts
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-violet-500" />
                                        Real-world validation of ideas
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-violet-500" />
                                        Collaboration with other builders
                                    </li>
                                </ul>
                                <p className="mt-6 text-lg leading-8 text-slate-600">
                                    This is where ideas become stronger, more refined, and closer to real implementation.
                                </p>
                            </div>

                            <div className="rounded-[2rem] border border-gray-200 bg-slate-950/5 p-10 shadow-xl shadow-slate-900/5">
                                <h2 className="text-3xl font-bold text-slate-900">Final goal</h2>
                                <p className="mt-6 text-lg leading-8 text-slate-600">
                                    This is not about winning a competition. This is about building real products, solving real problems in Uttarakhand, and creating solutions that can be developed further, supported, and taken towards real-world implementation.
                                </p>
                            </div>

                            <div className="rounded-[2rem] border border-gray-200 bg-white p-10 shadow-xl shadow-slate-900/5">
                                <h2 className="text-3xl font-bold text-slate-900">Beyond the hackathon</h2>
                                <p className="mt-6 text-lg leading-8 text-slate-600">
                                    Selected ideas from the series may be supported and guided by Axolotl Emprise LLP, refined into real products (apps/platforms), and explored for potential presentation to relevant stakeholders.
                                </p>
                            </div>

                            <div className="rounded-[2rem] border border-gray-200 bg-slate-50 p-10 shadow-xl shadow-slate-900/5">
                                <h2 className="text-3xl font-bold text-slate-900">Why this matters</h2>
                                <p className="mt-6 text-lg leading-8 text-slate-600">
                                    Uttarakhand has real challenges, untapped talent, and builders who want to create impact. This hackathon series is designed to bring all of that together.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-[2rem] border border-gray-200 bg-white p-10 shadow-xl shadow-slate-900/5">
                        <div className="grid gap-6 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900">Join the journey</h2>
                                <p className="mt-4 text-lg leading-8 text-slate-600">
                                    Whether you are a student, a developer, or a working professional if you want to build something meaningful, this is where it starts.
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <button onClick={() => setIsModalOpen(true)} className="inline-flex min-w-[170px] items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                                    Register Now
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 px-2 py-4 sm:px-4 sm:py-8">
                    <div className="relative w-full max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-2xl overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-900/30">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900 text-xl sm:text-2xl"
                            aria-label="Close registration form"
                        >
                            ×
                        </button>
                        <div className="bg-slate-950/5 px-6 py-6 sm:px-8 sm:py-7 pr-16 sm:pr-8">
                            <div>
                                <p className="text-sm uppercase tracking-[0.32em] text-violet-600">Hackathon registration</p>
                                <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-900">Register your interest</h2>
                                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                                    Share your profile, experience and the idea you want to build. We will prepare an email to <span className="font-semibold text-slate-900">info@axocom.in</span>.
                                </p>
                            </div>
                        </div>
                        <div className="max-h-[70vh] overflow-y-auto">
                        <form onSubmit={handleSubmit} className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
                            <div className="grid gap-6 lg:grid-cols-2">
                                <label className="space-y-2 text-sm text-slate-700">
                                    <span className="font-medium text-slate-900">Name</span>
                                    <input
                                        required
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                        placeholder="Your full name"
                                    />
                                </label>
                                <label className="space-y-2 text-sm text-slate-700">
                                    <span className="font-medium text-slate-900">Email</span>
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                        placeholder="you@example.com"
                                    />
                                </label>
                            </div>

                            <div className="grid gap-6 lg:grid-cols-2">
                                <label className="space-y-2 text-sm text-slate-700">
                                    <span className="font-medium text-slate-900">I am a</span>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => handleChange('role', e.target.value)}
                                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                    >
                                        <option value="student">Student</option>
                                        <option value="working professional">Working professional</option>
                                        <option value="tech geek">Tech geek</option>
                                    </select>
                                </label>
                                <label className="space-y-2 text-sm text-slate-700">
                                    <span className="font-medium text-slate-900">Experience level</span>
                                    <select
                                        value={formData.experience}
                                        onChange={(e) => handleChange('experience', e.target.value)}
                                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                    >
                                        <option value="want to learn">Want to learn</option>
                                        <option value="beginner">Beginner</option>
                                        <option value="good knowledge">Good knowledge</option>
                                        <option value="pro in web and app development">Pro in web and app development</option>
                                    </select>
                                </label>
                            </div>

                            <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-sm font-medium text-slate-900">What do you want to build?</span>
                                    <span className="text-xs uppercase tracking-[0.24em] text-slate-400">Optional but preferred</span>
                                </div>
                                <textarea
                                    value={formData.idea}
                                    onChange={(e) => handleChange('idea', e.target.value)}
                                    maxLength={100}
                                    rows={5}
                                    className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                    placeholder="Describe your idea in 100 words or less"
                                />
                                <p className="text-xs text-slate-500">Keep it concise: what problem are you solving, and what do you want to build?</p>
                            </div>


                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="inline-flex min-w-[140px] items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex min-w-[140px] items-center justify-center rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                                >
                                    Submit registration
                                </button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            )}

            <section className="rounded-[2rem] border border-gray-200 bg-white p-10 shadow-xl shadow-slate-900/5 overflow-hidden">
            <h2 className="text-3xl font-bold text-slate-900">
                Mentors & Speakers
            </h2>

            <p className="mt-4 text-lg text-slate-600">
                Learn from engineers and leaders working at top tech companies.
            </p>

            <div className="mt-8 relative">
                <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <DelegatesSlider delegates={speakers} />
            </div>
            </section>

            {/* Footer */}
            <footer className="w-full py-10 px-6 border-t border-gray-200 bg-gray-50 text-gray-500">
                <div className="max-w-7xl mx-auto flex flex-col gap-8">
                    {/* Top Section: Branding and Social Links */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex flex-col items-center md:items-start">
                            <img src="/images/logo2.png" alt="AxoCom" className="h-12 mb-2" />
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


                    {/* Bottom Section: Copyright */}
                    <div className="text-center pt-4 border-t border-gray-100">
                        <p className="text-sm">© 2024 AxoCom. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default UISHackathon;
