import React, { useState } from 'react';
import Navbar from '../components/static_components/Navbar';
import DelegatesSlider from "../components/ai_summit/DelegatesSlider";
import { buildSeoLinks, buildSeoMeta, eventSchema, organizationSchema, structuredData, webPageSchema } from "~/lib/seo";

const seo = {
  title: "DevBhoomi AI Summit 2026",
  description: "An invitation-only policy and innovation summit in Dehradun bringing together government, industry, academia, and AI leaders to shape Uttarakhand's AI future.",
  path: "/DevbhoomiAISummit",
  image: "/images/summit.png",
  imageAlt: "DevBhoomi AI Summit by AxoCom",
  keywords: [
    "DevBhoomi AI Summit",
    "Uttarakhand AI summit",
    "AI governance India",
    "Dehradun AI event",
    "AxoCom",
  ],
};

export const meta = () => buildSeoMeta(seo);
export const links = () => buildSeoLinks(seo);

const delegates = [
  {
    name: "Shri Pushkar Singh Dhami",
    role: "Chief Minister, Govt. of Uttarakhand",
    image: "/images/summitDeligate/1.jpg",
  },
  {
    name: "Shri Pradeep Batra",
    role: "IT Minister, Govt. of Uttarakhand",
    image: "/images/summitDeligate/2.jpg",
  },
  {
    name: "Shri Nitesh Kumar Jha (IAS)",
    role: "Secretary, Information Technology, Govt. of Uttarakhand",
    image: "/images/summitDeligate/3.jpg",
  },
  {
    name: "Shri Alok Kumar Pandey (IAS)",
    role: "Director, ITDA, Govt. of Uttarakhand",
    image: "/images/summitDeligate/4.jpg",
  },
  {
    name: "Shri Abhishek Singh",
    role: "DG, NIC & Additional Secretary, MeitY, Govt. of India",
    image: "/images/summitDeligate/5.jpg",
  },
  {
    name: "Aditya Maheshwari",
    role: "Associate Professor & Consortium Member, BharatGen, IIM Indore",
    image: "/images/summitDeligate/6.jpg",
  },
  {
    name: "Dr. Amar Patnaik",
    role: "Founding Partner, A&N Legal Solutions",
    image: "/images/summitDeligate/7.jpg",
  },
  {
    name: "Ayush Gupta",
    role: "Partner, KPMG India",
    image: "/images/summitDeligate/8.jpg",
  },
  {
    name: "Dr. Sushil Meher",
    role: "CIO, AIIMS",
    image: "/images/summitDeligate/9.jpg",
  },
  {
    name: "Jaspreet Singh",
    role: "Partner - Cyber Advisory, Grant Thornton Bharat",
    image: "/images/summitDeligate/10.jpg",
  },
  {
    name: "Prof. Niladri Chatterjee",
    role: "Soumitra Dutta Chair Professor of Artificial Intelligence, IIT Delhi",
    image: "/images/summitDeligate/11.jpg",
  },
  {
    name: "Dr. V. K. Paul",
    role: "Member, NITI Aayog",
    image: "/images/summitDeligate/12.jpg",
  },
  {
    name: "Harnath Babu",
    role: "CIO, KPMG",
    image: "/images/summitDeligate/13.jpg",
  },
  {
    name: "Nakul Jain",
    role: "CEO, Wadhwani AI Global",
    image: "/images/summitDeligate/14.jpg",
  },
  {
    name: "Tarun Anand",
    role: "Chairman & Founder, Universal AI University",
    image: "/images/summitDeligate/15.jpg",
  },
  {
    name: "Amit Pradhan",
    role: "VP - IT & CIO, Dixon Technologies",
    image: "/images/summitDeligate/16.jpg",
  },
  {
    name: "Achin K Sharma",
    role: "VP - IT, Movin India",
    image: "/images/summitDeligate/17.jpg",
  },
  {
    name: "Golok Kumar Simli",
    role: "President - Technology & Innovation, BLS International",
    image: "/images/summitDeligate/18.jpg",
  },
  {
    name: "Vinay Kumar",
    role: "Head - IT, Tim Hortons Middle East",
    image: "/images/summitDeligate/19.jpg",
  },
  {
    name: "Kapil Mahajan",
    role: "Global Chief Information & Technology Officer, Allcargo Logistic",
    image: "/images/summitDeligate/20.jpg",
  },
];

const DevbhoomiAISummit: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Government official',
        experience: 'Exploring AI for governance',
        interest: '',
    });

    const closeModal = () => setIsModalOpen(false);

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const subject = encodeURIComponent('DevBhoomi AI Summit invite request');
        const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\nRole: ${formData.role}\nFocus: ${formData.experience}\n\nWhat I hope to bring or learn: ${formData.interest}`
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
                            name: "DevBhoomi AI Summit 2026",
                            description: seo.description,
                            path: seo.path,
                            image: seo.image,
                            startDate: "2026-06-12",
                            endDate: "2026-06-14",
                            locationName: "Dehradun Convention Centre",
                            locationAddress: "Dehradun, Uttarakhand, India",
                        }),
                    ]),
                }}
            />
            <Navbar />

            <main className="pt-28 pb-16 px-4 md:px-10 lg:px-20">
                <div className="max-w-[1400px] mx-auto space-y-16">
                    <section className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white/90 backdrop-blur-xl shadow-2xl shadow-slate-900/5">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(125,211,252,0.14),transparent_30%)] pointer-events-none" />
                        <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] px-6 py-16 sm:px-10 lg:px-14">
                            <div className="space-y-8">
                                <div className="space-y-4 max-w-3xl">
                                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-600">DevBhoomi AI Summit</p>
                                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">Governing with Intelligence: AI as the Backbone of a New Uttarakhand</h1>
                                    <p className="text-lg leading-8 text-slate-600">
                                        A closed-door policy and innovation summit bringing together leaders from government, industry, and academia to shape Uttarakhand’s AI future.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                                        Book your spot
                                    </button>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-3">
                                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                        <p className="text-sm text-slate-500 uppercase tracking-[0.2em]">When</p>
                                        <p className="mt-3 text-2xl font-semibold text-slate-900">June 12–14, 2026</p>
                                    </div>
                                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                        <p className="text-sm text-slate-500 uppercase tracking-[0.2em]">Where</p>
                                        <p className="mt-3 text-2xl font-semibold text-slate-900">Dehradun Convention Centre</p>
                                    </div>
                                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                        <p className="text-sm text-slate-500 uppercase tracking-[0.2em]">Format</p>
                                        <p className="mt-3 text-2xl font-semibold text-slate-900">Invitation-only summit</p>
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

                            <div className="relative ">
                                <div className="absolute inset-0 rounded-[2rem] bg-slate-900/5" />
                                <div className="relative grid gap-4">
                                    <div className="rounded-3xl overflow-hidden bg-slate-900 h-full">
                                        <video
                                            className="w-full h-full object-contain bg-black"
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            controls
                                        >
                                            <source src="/videos/summitV.mp4" type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr]">
                        <div className="space-y-8">
                            <div className="rounded-[2rem] border border-gray-200 bg-white p-10 shadow-xl shadow-slate-900/5">
                                <h2 className="text-3xl font-bold text-slate-900">Why this summit exists</h2>
                                <p className="mt-6 text-lg leading-8 text-slate-600">
                                    Uttarakhand is more than a state it is a region of immense potential, talent, and resilience. Yet, many challenges remain unaddressed from disaster response to healthcare access to migration.
                                </p>
                                <p className="mt-4 text-lg leading-8 text-slate-600">
                                    We believe technology especially AI can change this.
                                </p>
                                <p className="mt-4 text-lg leading-8 text-slate-600">
                                    DevBhoomi AI Summit is an effort to bring the right people together to think, build, and act for Uttarakhand.
                                </p>
                            </div>

                            <div className="rounded-[2rem] border border-gray-200 bg-white p-10 shadow-xl shadow-slate-900/5">
                                <h2 className="text-3xl font-bold text-slate-900">What this summit is</h2>
                                <p className="mt-6 text-lg leading-8 text-slate-600">
                                    This is not a conference. This is a working platform.
                                </p>
                                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                    {[
                                        'Ideas turn into action',
                                        'Policy meets technology',
                                        'Discussions lead to commitments',
                                    ].map((item) => (
                                        <div key={item} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                            <p className="font-semibold text-slate-900">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[2rem] border border-gray-200 bg-white p-10 shadow-xl shadow-slate-900/5">
                                <h2 className="text-3xl font-bold text-slate-900">Who this is for</h2>
                                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                    {[
                                        'Senior government officials',
                                        'Policy makers and advisors',
                                        'Leaders from global consulting and technology firms',
                                        'Researchers and academicians from top institutions',
                                        'AI practitioners and system builders',
                                    ].map((profile) => (
                                        <div key={profile} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                                            <p className="text-slate-700">{profile}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[2rem] border border-gray-200 bg-white p-10 shadow-xl shadow-slate-900/5">
                                <div className="flex flex-col items-center gap-6">
                                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-cyan-500/30">
                                        <img src="/images/ITMinister.jpeg" alt="Minister of Uttarakhand" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="text-center space-y-4">
                                        <p className="text-lg font-semibold text-slate-900">Shri Pradeep Batra <br/>Hon’ble Cabinet Minister <br/>Information Technology and Good Governance	</p>
                                        <p className="text-base leading-7 text-slate-600">
                                            Uttarakhand is not just a state of mountains and tradition it is a state of immense talent, innovation, and untapped potential. Our people are capable, creative, and ambitious.
                                        </p>
                                        <p className="text-base leading-7 text-slate-600">
                                            We need their ideas. We need their perspectives. We need leaders, builders, and thinkers to reimagine Uttarakhand through technology.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="rounded-[2rem] border border-gray-200 bg-white p-10 shadow-xl shadow-slate-900/5">
                                <h2 className="text-3xl font-bold text-slate-900">Participation</h2>
                                <p className="mt-6 text-lg leading-8 text-slate-600">
                                    The summit is being shaped with participation from leaders and experts associated with institutions such as national-level policy bodies, leading technology and consulting firms, top academic and research institutions, and healthcare and public system organizations.
                                </p>
                                <p className="mt-4 text-lg leading-8 text-slate-600 text-slate-500">
                                    Including individuals associated with organizations like these will be reflected through trusted partners and advisory presence.
                                </p>
                            </div>

                            <div className="rounded-[2rem] border border-gray-200 bg-slate-950/5 p-10 shadow-xl shadow-slate-900/5">
                                <h2 className="text-3xl font-bold text-slate-900">Uttarakhand AI Action Charter</h2>
                                <p className="mt-6 text-lg leading-8 text-slate-600">
                                    The outcome of the summit will be a structured set of actionable commitments across key domains that are designed for implementation not ideas.
                                </p>
                                <ul className="mt-8 space-y-3 text-slate-600">
                                    {['Disaster management', 'Agriculture', 'Governance systems', 'Healthcare', 'Tourism', 'Education & skilling'].map((item) => (
                                        <li key={item} className="flex items-center gap-3">
                                            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-cyan-500" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="rounded-[2rem] border border-gray-200 bg-white p-10 shadow-xl shadow-slate-900/5">
                                <h2 className="text-3xl font-bold text-slate-900">Our commitment to Uttarakhand</h2>
                                <p className="mt-6 text-lg leading-8 text-slate-600">
                                    At Axolotl Emprise, our vision is rooted in Uttarakhand. We believe the state has untapped talent, real problems worth solving, and a future that can be shaped with the right systems.
                                </p>
                                <p className="mt-4 text-lg leading-8 text-slate-600">
                                    This summit is our step towards building that future by connecting people who can make it happen.
                                </p>
                            </div>

                            <div className="rounded-[2rem] border border-gray-200 bg-slate-50 p-10 shadow-xl shadow-slate-900/5">
                                <h2 className="text-3xl font-bold text-slate-900">Partnership</h2>
                                <p className="mt-6 text-lg leading-8 text-slate-600">
                                    In collaboration with Information Technology Development Agency (ITDA), Uttarakhand.
                                </p>
                                <p className="mt-6 text-sm uppercase tracking-[0.28em] text-slate-500">Government-trust aligned</p>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-[2rem] border border-gray-200 bg-white p-10 shadow-xl shadow-slate-900/5">
                        <div className="grid gap-6 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900">This is a curated, limited participation summit.</h2>
                                <p className="mt-4 text-lg leading-8 text-slate-600">
                                    If you are interested in being a part of this initiative, request an invite and stay updated as the summit takes shape.
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <button onClick={() => setIsModalOpen(true)} className="inline-flex min-w-[170px] items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                                    Book your spot
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
                                <p className="text-sm uppercase tracking-[0.32em] text-cyan-600">Summit registration</p>
                                <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-900">Book your spot</h2>
                                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                                    Share your details and interest so we can send an invite request to <span className="font-semibold text-slate-900">info@axocom.in</span>.
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
                                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
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
                                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                                        placeholder="you@example.com"
                                    />
                                </label>
                            </div>

                            <div className="grid gap-6 lg:grid-cols-2">
                                <label className="space-y-2 text-sm text-slate-700">
                                    <span className="font-medium text-slate-900">Role</span>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => handleChange('role', e.target.value)}
                                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                                    >
                                        <option value="Government official">Government official</option>
                                        <option value="Industry leader">Industry leader</option>
                                        <option value="Academic / researcher">Academic / researcher</option>
                                        <option value="AI practitioner">AI practitioner</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </label>
                                <label className="space-y-2 text-sm text-slate-700">
                                    <span className="font-medium text-slate-900">Focus</span>
                                    <select
                                        value={formData.experience}
                                        onChange={(e) => handleChange('experience', e.target.value)}
                                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                                    >
                                        <option value="Exploring AI for governance">Exploring AI for governance</option>
                                        <option value="Policy and public systems">Policy and public systems</option>
                                        <option value="Healthcare and disaster response">Healthcare and disaster response</option>
                                        <option value="Education and skilling">Education and skilling</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </label>
                            </div>

                            <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-sm font-medium text-slate-900">What I hope to bring or learn</span>
                                    <span className="text-xs uppercase tracking-[0.24em] text-slate-400">Optional</span>
                                </div>
                                <textarea
                                    value={formData.interest}
                                    onChange={(e) => handleChange('interest', e.target.value)}
                                    maxLength={150}
                                    rows={5}
                                    className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                                    placeholder="Tell us what you want to contribute or learn at the summit"
                                />
                                <p className="text-xs text-slate-500">A short note helps us tailor the invite.</p>
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
                                    className="inline-flex min-w-[140px] items-center justify-center rounded-full bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
                                >
                                    Send invite request
                                </button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            )}

            <section className="rounded-[2rem] border border-gray-200 bg-white p-10 shadow-xl shadow-slate-900/5">
                <h2 className="text-3xl font-bold text-slate-900">
                    Delegates & Dignitaries
                </h2>

                <p className="mt-4 text-lg text-slate-600">
                    Leaders and innovators attending the summit.
                </p>

                <div className="mt-8">
                    <DelegatesSlider delegates={delegates} />
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

export default DevbhoomiAISummit;
