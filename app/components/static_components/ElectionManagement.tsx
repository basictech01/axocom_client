import React from 'react';
import { Link } from 'react-router';

const services = [
    {
        icon: 'query_stats',
        title: 'Voter Data Analytics & Profiling',
        desc: 'Demographic segmentation, voter behavior modeling, and predictive analytics powered by our AI Core. We turn raw data into winning booth-level strategies.',
        axoLink: 'Data Insights + Knowledge Graphs',
    },
    {
        icon: 'campaign',
        title: 'Political Campaign Strategy',
        desc: 'End-to-end campaign architecture spanning messaging frameworks, manifesto positioning, constituency-level micro-targeting, and opposition research.',
        axoLink: 'Strategy + Campaign Management',
    },
    {
        icon: 'monitoring',
        title: 'War Room & Real-Time Monitoring',
        desc: 'AI-driven command centers with live sentiment tracking, social listening dashboards, and rapid-response systems to control the narrative 24/7.',
        axoLink: 'AI Core + Sentiment Analysis',
    },
    {
        icon: 'share',
        title: 'Digital & Social Media Campaigns',
        desc: 'Multi-platform digital operations including targeted ad campaigns, viral content engineering, influencer mobilization, and real-time engagement optimization.',
        axoLink: 'Social Media Management + AI Content',
    },
    {
        icon: 'newspaper',
        title: 'Media Management & PR',
        desc: 'Press strategy, earned media placement, crisis communication, and narrative building across print, TV, digital, and our own media network of 8+ properties.',
        axoLink: 'PR Communication + Media Properties',
    },
    {
        icon: 'auto_awesome',
        title: 'AI-Powered Content at Scale',
        desc: 'Generative AI systems that produce localized, multilingual campaign content including speeches, ads, social posts, and video at unprecedented speed and volume.',
        axoLink: 'AI Generated Content + Creative Tools',
    },
    {
        icon: 'person_search',
        title: 'Candidate & Party Branding',
        desc: 'Building powerful political brands through visual identity, public perception engineering, and narrative consistency across every voter touchpoint.',
        axoLink: 'Brand Building + Creative Direction',
    },
    {
        icon: 'hub',
        title: 'Ground Intelligence Network',
        desc: 'Knowledge graph-powered mapping of political relationships, caste dynamics, regional alliances, and constituency-level ground intelligence for informed decision-making.',
        axoLink: 'Knowledge Graphs + Data Insights',
    },
];

const ElectionManagement: React.FC = () => {
    return (
        <div className="min-h-[100dvh] w-full bg-background-dark font-space py-16 md:py-24 px-4 md:px-10 lg:px-20 relative overflow-hidden">

            {/* Background effects */}
            <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[200px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[180px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative z-10 flex flex-col gap-14 md:gap-20">

                {/* Header */}
                <div className="flex flex-col items-center text-center gap-5">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight">
                        Engineering Election <br className="hidden md:block" />Victories
                    </h2>
                    <p className="text-gray-500 text-base md:text-lg max-w-3xl leading-relaxed">
                        AxoCom brings its full-stack technology and media arsenal to the political arena. Our AI Core, data infrastructure, media network, and four decades of political communication expertise converge to deliver <span className="text-gray-900 font-semibold">India's most technologically advanced election management</span>.
                    </p>
                </div>

                {/* The AxoCom Advantage */}
                <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 shadow-sm">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">bolt</span>
                        Why AxoCom for Elections
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                            <h4 className="text-gray-900 font-semibold text-base mb-2">AI-First Approach</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">While others rely on gut instinct, we run elections on data. Our proprietary AI Core processes news, social signals, and real-time data to give candidates an intelligence edge no traditional firm can match.</p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                            <h4 className="text-gray-900 font-semibold text-base mb-2">Media Network Firepower</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">With 8+ owned media entities spanning news platforms to regional content channels, we don't just create the campaign narrative. We have the distribution infrastructure to amplify it across millions.</p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                            <h4 className="text-gray-900 font-semibold text-base mb-2">Political Communication DNA</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">Led by Basant Rawat with four decades in Indian political media and journalism, our political instincts are battle-tested across grassroots campaigns and national-level strategic communication.</p>
                        </div>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="flex flex-col gap-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">What We Deliver</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {services.map((s, i) => (
                            <div
                                key={i}
                                className="group bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-4 hover:border-red-500/40 hover:shadow-md transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                                    <span className="material-symbols-outlined text-red-500 text-xl">{s.icon}</span>
                                </div>
                                <h4 className="text-gray-900 font-semibold text-base leading-snug">{s.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed flex-1">{s.desc}</p>
                                <div className="flex items-center gap-1.5 mt-auto pt-2 border-t border-gray-100">
                                    <span className="material-symbols-outlined text-primary text-xs">link</span>
                                    <span className="text-primary text-[11px] font-mono font-semibold">{s.axoLink}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col items-center gap-6 text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Ready to Win?</h3>
                    <p className="text-gray-600 max-w-xl text-base">
                        From Panchayat to Parliament. Our technology scales to every level of Indian democracy.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            to="/election-management"
                            className="px-10 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-red-500/30 inline-flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-xl">arrow_forward</span>
                            Explore Election Services
                        </Link>
                        <a
                            href="/election-management/dashboard"
                            className="px-10 py-4 bg-primary hover:bg-indigo-600 text-white font-semibold rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-primary/30 inline-flex items-center gap-2 group"
                        >
                            <span className="material-symbols-outlined text-xl group-hover:animate-pulse">dashboard</span>
                            Explore the Dashboard
                        </a>
                        <a
                            href="mailto:pranav.pandey@axocom.in?subject=Election%20Management%20Inquiry%20-%20AxoCom&body=Hello%20AxoCom%20Team%2C%0D%0A%0D%0AI%20am%20interested%20in%20your%20election%20management%20services.%0D%0A%0D%0AName%3A%20%0D%0AConstituency%2FRegion%3A%20%0D%0AElection%20Type%3A%20%0D%0APhone%3A%20%0D%0A%0D%0ABest%20regards"
                            className="px-10 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-lg transition-all border border-gray-200 hover:border-gray-300 inline-flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-xl">mail</span>
                            Get in Touch
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ElectionManagement;