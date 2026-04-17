import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/static_components/Navbar';

const phases = [
    {
        phase: 'Phase 1',
        title: 'Intelligence & Research',
        icon: 'search',
        items: [
            { name: 'Constituency Mapping', desc: 'Deep demographic analysis covering caste, community, religion, income, education, and voting history mapped at booth level using our Knowledge Graph infrastructure.' },
            { name: 'Voter Sentiment Analysis', desc: 'AI Core-powered processing of news, social media, and on-ground signals to gauge real-time public mood and issue salience across every constituency.' },
            { name: 'Opposition Research', desc: 'Comprehensive intelligence on rival candidates including track records, vulnerabilities, funding patterns, coalition dynamics, and media footprint analysis.' },
            { name: 'Issue Identification', desc: 'Data-driven identification of hyper-local issues that matter most to voters, from water supply in a ward to unemployment in a district.' },
        ],
    },
    {
        phase: 'Phase 2',
        title: 'Strategy & Planning',
        icon: 'strategy',
        items: [
            { name: 'Campaign Architecture', desc: 'End-to-end campaign blueprint covering phases, milestones, messaging frameworks, resource allocation, and contingency planning for every scenario.' },
            { name: 'Candidate Positioning', desc: 'Crafting the candidate\'s public persona, narrative arc, and differentiation strategy to dominate the political discourse in the constituency.' },
            { name: 'Coalition & Alliance Strategy', desc: 'Relationship mapping through Knowledge Graphs to identify alliance opportunities, negotiation leverage points, and seat-sharing optimization.' },
            { name: 'Budget & Resource Planning', desc: 'Optimized resource allocation across digital, ground operations, media, and events. Maximizing impact per rupee spent with data-backed decisions.' },
        ],
    },
    {
        phase: 'Phase 3',
        title: 'Content & Creative War Machine',
        icon: 'auto_awesome',
        items: [
            { name: 'AI Content Factory', desc: 'Generative AI systems producing localized, multilingual campaign content at scale. Manifesto materials, social posts, speeches, short films, and targeted ads in multiple Indian languages.' },
            { name: 'Political Branding', desc: 'Complete visual and narrative identity including logos, color systems, slogans, jingles, and consistent brand language across all voter touchpoints.' },
            { name: 'Video & Photo Production', desc: 'Professional-grade campaign films, rally documentation, candidate profiles, issue-based documentaries, and rapid-response video turnaround.' },
            { name: 'Speech & Manifesto Writing', desc: 'Data-informed speechwriting that hits the right notes by incorporating sentiment data, regional language nuances, and issue-specific messaging.' },
        ],
    },
    {
        phase: 'Phase 4',
        title: 'Digital Campaign Operations',
        icon: 'phone_android',
        items: [
            { name: 'Social Media Warfare', desc: 'Multi-platform campaign management across Facebook, Instagram, X, YouTube, WhatsApp, and regional platforms with targeted content strategies and paid amplification.' },
            { name: 'Micro-Targeting & Ad Tech', desc: 'Precision-targeted digital advertising using voter profiling data. The right message to the right voter at the right time, across every digital channel.' },
            { name: 'Online Reputation Management', desc: 'Real-time monitoring and management of the candidate\'s digital reputation. Countering misinformation, amplifying positive narratives, and controlling search results.' },
            { name: 'WhatsApp & Grassroots Digital', desc: 'Structured WhatsApp broadcast strategies, volunteer coordination apps, and digital grassroots mobilization tools for booth-level engagement.' },
        ],
    },
    {
        phase: 'Phase 5',
        title: 'Media & PR Operations',
        icon: 'newspaper',
        items: [
            { name: 'Press Strategy & Media Relations', desc: 'Strategic media engagement including press conferences, editorial placements, TV panel coordination, and relationship management with journalists across print, TV, and digital media.' },
            { name: 'Crisis Communication', desc: 'Rapid-response crisis management with predefined playbooks, real-time monitoring, and instant narrative correction when controversies arise during the campaign.' },
            { name: 'Owned Media Amplification', desc: 'Leveraging AxoCom\'s network of 8+ media properties including Hillsquills, India7Live, Tehelka India News, AxoNews, and others for organic narrative amplification.' },
            { name: 'Earned Media Engineering', desc: 'Creating newsworthy campaign events and moments that generate organic press coverage, turning campaign spending into earned media value.' },
        ],
    },
    {
        phase: 'Phase 6',
        title: 'War Room & Command Center',
        icon: 'monitoring',
        items: [
            { name: 'AI-Powered War Room', desc: 'A technology command center running on our AI Core with live dashboards tracking sentiment, social media trends, news coverage, and competitor movements across every constituency.' },
            { name: 'Real-Time Sentiment Dashboards', desc: 'Continuous sentiment analysis processing thousands of data points per hour, giving campaign leadership actionable intelligence to pivot strategy in real time.' },
            { name: 'Rapid Response Unit', desc: 'A dedicated team with pre-approved messaging frameworks for instant response to opposition attacks, controversies, and breaking developments.' },
            { name: 'Performance Analytics', desc: 'Campaign performance dashboards tracking reach, engagement, sentiment shifts, ground coverage, media hits, and projected outcomes with continuous optimization.' },
        ],
    },
    {
        phase: 'Phase 7',
        title: 'Ground Operations & Mobilization',
        icon: 'groups',
        items: [
            { name: 'Booth-Level Strategy', desc: 'Data-driven booth management that identifies strong and weak booths, deploys targeted resources, and optimizes volunteer allocation for maximum voter outreach.' },
            { name: 'Rally & Event Management', desc: 'End-to-end event production for rallies, roadshows, town halls, and public meetings covering logistics, crowd management, media coverage, and live streaming.' },
            { name: 'Volunteer Network Coordination', desc: 'Technology-enabled volunteer management including training, task allocation, real-time coordination, and performance tracking for thousands of ground workers.' },
            { name: 'GOTV (Get Out The Vote)', desc: 'Election day mobilization strategy covering voter reminders, transportation coordination, polling booth monitoring, and real-time voter turnout tracking.' },
        ],
    },
];

const trackRecord = [
    { metric: '8+', label: 'Media Properties', desc: 'Owned distribution network' },
    { metric: '40+', label: 'Years Political Expertise', desc: 'In Indian media & politics' },
    { metric: 'AI', label: 'Proprietary Technology', desc: 'The AI Core, built in-house' },
    { metric: '360°', label: 'Full-Stack Capability', desc: 'Strategy to execution, end-to-end' },
];

const ElectionPage: React.FC = () => {
    const [activePhase, setActivePhase] = useState(0);
    const heroCanvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = heroCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;
        let time = 0;

        // Deterministic pseudo-random for consistent pattern
        const mkRng = (s: number) => () => { s = Math.sin(s + 1) * 10000; return s - Math.floor(s); };
        const rng = mkRng(42);

        // Generate constellation nodes (normalised 0-1)
        const nodes = Array.from({ length: 80 }, () => ({
            x: rng(), y: rng(),
            r: 1.2 + rng() * 1.8,
            phase: rng() * Math.PI * 2,
            speed: 0.3 + rng() * 0.4,
        }));

        // Edges between nearby nodes
        const edges: [number, number][] = [];
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
                if (Math.sqrt(dx * dx + dy * dy) < 0.11) edges.push([i, j]);
            }
        }

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const parent = canvas.parentElement!;
            const rect = parent.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = rect.width + 'px';
            canvas.style.height = rect.height + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const draw = () => {
            const rect = canvas.parentElement!.getBoundingClientRect();
            const cw = rect.width, ch = rect.height;
            ctx.clearRect(0, 0, cw, ch);

            // Layer 1 — Hexagonal "constituency" grid
            const hexR = 48;
            const hexW = hexR * Math.sqrt(3);
            const hexH = hexR * 1.5;
            ctx.strokeStyle = 'rgba(79, 70, 229, 0.035)';
            ctx.lineWidth = 0.5;
            for (let row = -1; row < ch / hexH + 2; row++) {
                for (let col = -1; col < cw / hexW + 2; col++) {
                    const cx = col * hexW + (row % 2 ? hexW / 2 : 0);
                    const cy = row * hexH;
                    ctx.beginPath();
                    for (let k = 0; k < 6; k++) {
                        const a = Math.PI / 3 * k - Math.PI / 6;
                        const hx = cx + hexR * Math.cos(a), hy = cy + hexR * Math.sin(a);
                        k === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
                    }
                    ctx.closePath();
                    ctx.stroke();
                }
            }

            // Layer 2 — Network edges
            ctx.lineWidth = 0.7;
            for (const [a, b] of edges) {
                const pulse = 0.5 + 0.5 * Math.sin(time * 0.6 + nodes[a].phase);
                ctx.strokeStyle = `rgba(79, 70, 229, ${0.04 + 0.025 * pulse})`;
                ctx.beginPath();
                ctx.moveTo(nodes[a].x * cw, nodes[a].y * ch);
                ctx.lineTo(nodes[b].x * cw, nodes[b].y * ch);
                ctx.stroke();
            }

            // Layer 3 — Network nodes
            for (const node of nodes) {
                const p = 0.5 + 0.5 * Math.sin(time * node.speed + node.phase);
                ctx.fillStyle = `rgba(79, 70, 229, ${0.06 + 0.06 * p})`;
                ctx.beginPath();
                ctx.arc(node.x * cw, node.y * ch, node.r * (0.8 + 0.4 * p), 0, Math.PI * 2);
                ctx.fill();
            }

            // Layer 4 — "Monitored constituency" accent rings
            for (let i = 0; i < 6; i++) {
                const n = nodes[i * 12 % nodes.length];
                const p = 0.5 + 0.5 * Math.sin(time * 0.4 + n.phase);
                ctx.strokeStyle = `rgba(220, 38, 38, ${0.04 + 0.035 * p})`;
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.arc(n.x * cw, n.y * ch, 10 + 6 * p, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Layer 5 — Subtle checkmark accents
            ctx.strokeStyle = 'rgba(79, 70, 229, 0.04)';
            ctx.lineWidth = 1.2;
            ctx.lineCap = 'round';
            for (let i = 0; i < 4; i++) {
                const n = nodes[i * 19 % nodes.length];
                const x = n.x * cw, y = n.y * ch, s = 5;
                ctx.beginPath();
                ctx.moveTo(x - s, y);
                ctx.lineTo(x - s * 0.3, y + s * 0.7);
                ctx.lineTo(x + s, y - s * 0.5);
                ctx.stroke();
            }

            time += 0.016;
            animId = requestAnimationFrame(draw);
        };

        resize();
        draw();
        window.addEventListener('resize', resize);
        return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId); };
    }, []);

    return (
        <div className="min-h-screen w-full bg-background-dark font-space">
            <Navbar />

            <div className="pt-32 pb-20 px-4 md:px-10 lg:px-20">
                <div className="max-w-6xl mx-auto flex flex-col gap-20">

                    {/* Hero */}
                    <div className="relative rounded-3xl overflow-hidden min-h-[400px] md:min-h-[450px] flex flex-col justify-center items-center text-center p-8 md:p-12 border border-gray-200 bg-gradient-to-br from-white via-indigo-50/40 to-white">
                        {/* Canvas artwork — constituency hex grid + data network */}
                        <canvas ref={heroCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

                        <h1 className="relative z-10 text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-5 leading-tight tracking-tight">
                            India's Most Technologically<br className="hidden md:block" /> Advanced Election Management
                        </h1>
                        <p className="relative z-10 text-gray-600 text-base md:text-lg max-w-3xl leading-relaxed mb-8">
                            AxoCom combines proprietary AI technology, a network of 8+ media properties, decades of political communication expertise, and full-stack campaign capabilities to deliver election victories from Panchayat to Parliament.
                        </p>
                        <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="dashboard"
                                className="px-10 py-4 bg-primary text-white font-semibold rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-primary/25 inline-flex items-center gap-2 group"
                            >
                                <span className="material-symbols-outlined text-xl group-hover:animate-pulse">dashboard</span>
                                Explore the Dashboard
                            </a>
                            <a
                                href="mailto:pranav.pandey@axocom.in?subject=Election%20Management%20Inquiry&body=Hello%20AxoCom%20Team%2C%0D%0A%0D%0AI%20am%20interested%20in%20your%20election%20management%20services.%0D%0A%0D%0ACandidate%2FParty%20Name%3A%20%0D%0AConstituency%2FRegion%3A%20%0D%0AElection%20Type%20(Panchayat%2FMunicipal%2FState%2FNational)%3A%20%0D%0APhone%3A%20%0D%0A%0D%0ABest%20regards"
                                className="px-10 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-red-500/25 inline-flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined">handshake</span>
                                Start a Conversation
                            </a>
                        </div>
                    </div>

                    {/* Track Record Numbers */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {trackRecord.map((t, i) => (
                            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 text-center flex flex-col gap-2">
                                <span className="text-3xl md:text-4xl font-black text-red-500">{t.metric}</span>
                                <span className="text-gray-900 font-bold text-sm">{t.label}</span>
                                <span className="text-gray-500 text-xs">{t.desc}</span>
                            </div>
                        ))}
                    </div>

                    {/* Why AxoCom for Elections */}
                    <div className="flex flex-col gap-8">
                        <div className="text-center flex flex-col gap-3">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The AxoCom Difference</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto text-base">
                                Most election management firms are either tech companies pretending to understand politics, or political consultants pretending to understand technology. AxoCom is both, natively.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 flex gap-4">
                                <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">memory</span>
                                </div>
                                <div>
                                    <h4 className="text-gray-900 font-bold mb-1">Proprietary AI Core</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">Not GPT wrappers. A purpose-built intelligence engine that processes news feeds, social media signals, and real-time data through knowledge graphs, sentiment analysis, and campaign-specific ML models.</p>
                                </div>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 flex gap-4">
                                <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">cell_tower</span>
                                </div>
                                <div>
                                    <h4 className="text-gray-900 font-bold mb-1">Owned Media Network</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">8+ media entities including Hillsquills, India7Live, Tehelka India News, AxoNews, Spotlight With Shruti, and regional channels. We don't rent media. We own the distribution.</p>
                                </div>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 flex gap-4">
                                <div className="shrink-0 w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-red-400">military_tech</span>
                                </div>
                                <div>
                                    <h4 className="text-gray-900 font-bold mb-1">Battle-Tested Political Instincts</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">Basant Rawat brings 4 decades of Indian political media experience as ex-Senior Journalist at The Telegraph and political commentator. We understand the pulse of Indian democracy.</p>
                                </div>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 flex gap-4">
                                <div className="shrink-0 w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-green-400">all_inclusive</span>
                                </div>
                                <div>
                                    <h4 className="text-gray-900 font-bold mb-1">Full-Stack, In-House</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">Strategy, data, creative, content, media, digital, PR, ground ops. All under one roof. No subcontractors, no information leaks. One team, one mission, complete operational security.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Campaign Phases — Interactive */}
                    <div className="flex flex-col gap-8">
                        <div className="text-center flex flex-col gap-3">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our 7-Phase Campaign Framework</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto text-base">
                                A battle-tested methodology that takes a campaign from day zero to victory day.
                            </p>
                        </div>

                        {/* Phase Selector */}
                        <div className="flex flex-wrap justify-center gap-2">
                            {phases.map((p, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActivePhase(i)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activePhase === i
                                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 border border-gray-200'
                                        }`}
                                >
                                    {p.phase}
                                </button>
                            ))}
                        </div>

                        {/* Active Phase Content */}
                        <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-red-400">{phases[activePhase].icon}</span>
                                </div>
                                <div>
                                    <span className="text-red-400 text-xs font-mono font-bold uppercase tracking-wider">{phases[activePhase].phase}</span>
                                    <h3 className="text-gray-900 font-bold text-xl">{phases[activePhase].title}</h3>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {phases[activePhase].items.map((item, j) => (
                                    <div key={j} className="bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:border-red-500/20 transition-all">
                                        <h4 className="text-gray-900 font-bold text-base mb-2">{item.name}</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Election Levels */}
                    <div className="flex flex-col gap-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">We Operate at Every Level</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { level: 'Panchayat', icon: 'home', desc: 'Hyperlocal campaigns with booth-level micro-targeting and community-focused messaging.' },
                                { level: 'Municipal', icon: 'location_city', desc: 'City-level campaigns balancing urban development narratives with ward-specific outreach.' },
                                { level: 'State Assembly', icon: 'account_balance', desc: 'Constituency-level warfare with full war room operations, media management, and digital campaigns.' },
                                { level: 'Parliamentary', icon: 'flag', desc: 'National-scale operations with multi-constituency coordination, party-level branding, and national media strategy.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 text-center flex flex-col items-center gap-3 hover:border-red-500/20 transition-all group">
                                    <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                                        <span className="material-symbols-outlined text-red-400 text-2xl">{item.icon}</span>
                                    </div>
                                    <h4 className="text-gray-900 font-bold text-lg">{item.level}</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="bg-gradient-to-br from-red-500/10 to-primary/10 rounded-3xl p-8 md:p-12 text-center border border-gray-200">
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
                            The Next Election Is Closer Than You Think.
                        </h2>
                        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                            Whether you're a first-time candidate or a seasoned political party, AxoCom's technology and expertise scales to your ambition. Let's build your victory.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="mailto:pranav.pandey@axocom.in?subject=Election%20Management%20-%20Consultation%20Request&body=Hello%20AxoCom%20Team%2C%0D%0A%0D%0AI%20would%20like%20to%20schedule%20a%20consultation%20for%20election%20management%20services.%0D%0A%0D%0ACandidate%2FParty%20Name%3A%20%0D%0AConstituency%2FRegion%3A%20%0D%0AElection%20Type%3A%20%0D%0ATimeline%3A%20%0D%0APhone%3A%20%0D%0A%0D%0ABest%20regards"
                                className="px-10 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-red-500/30 inline-flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined">calendar_today</span>
                                Schedule a Consultation
                            </a>
                            <a
                                href="tel:+916399905916"
                                className="px-10 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-lg transition-all border border-gray-200 hover:border-gray-300 inline-flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined">call</span>
                                +91 63999 05916 / 06916
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <footer className="w-full py-10 px-6 border-t border-gray-200 bg-gray-50 text-gray-500">
                <div className="max-w-7xl mx-auto flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex flex-col items-center md:items-start">
                            <h2 className="text-2xl text-gray-900 mb-1" style={{ fontFamily: 'HelloParis' }}>AxoCom</h2>
                            <span className="text-xs uppercase tracking-widest text-gray-500">Axolotl Emprise LLP</span>
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
                    <div className="text-center text-sm text-gray-600">
                        © 2026 AxoCom · Axolotl Emprise LLP. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ElectionPage;