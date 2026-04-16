import React, { useRef, useState } from 'react';
import Navbar from '../components/static_components/Navbar';

const NPRWeek2026: React.FC = () => {
    const [name, setName] = useState('');
    const [generating, setGenerating] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const schedule = [
        {
            date: 'April 16',
            title: 'Powering Public Trust',
            topic: 'Crisis Communication and Reputation Management in the Energy Sector',
            speaker: 'Mr. Vimal Dabral',
            designation: 'Public Relations Officer',
            org: 'Uttarakhand Jal Vidyut Nigam Limited',
            college: "Tula's",
        },
        {
            date: 'April 17',
            title: 'Labour Welfare Strategies',
            topic: 'Labour Welfare Strategies for Worker Empowerment',
            speaker: 'Ms. Durga Chamoli',
            designation: 'Senior IT Expert',
            org: 'UKBOCW',
            college: 'IMS',
        },
        {
            date: 'April 18',
            title: 'STEM for Society',
            topic: 'Leveraging Experiential Learning and Strategic PR to Build Scientific Temperament',
            speaker: 'Dr. O.P. Nautiyal',
            designation: 'Senior Scientist',
            org: 'UCOST, Uttarakhand Council of Science',
            college: null,
        },
        {
            date: 'April 19',
            title: 'From Awareness to Action',
            topic: 'Public Relations in Advancing HPV Vaccination for Adolescents',
            speaker: 'Dr. Kuldeep Martolia',
            designation: 'IEC Officer',
            org: 'State Medical Health and Family Welfare Directorate',
            college: 'SLC',
        },
        {
            date: 'April 20',
            title: 'Building Industrial Reputation',
            topic: 'Strategic Public Relations in Attracting Investment & Managing Stakeholder Perception',
            speaker: 'Ms. Shivangi Singh',
            designation: 'Public Relations Officer',
            org: 'SIDCUL',
            college: 'GRD',
        },
        {
            date: 'April 21',
            title: 'Science for Society',
            topic: 'Strategic PR Campaigns to Foster Scientific Thinking',
            speaker: 'Mr. Amit Pokhriyal',
            designation: 'Public Relations Officer',
            org: 'UCOST, Uttarakhand Council of Science',
            college: 'DBIT',
        },
    ];

    const generateCertificate = () => {
        const trimmed = name.trim();
        if (!trimmed) return;

        setGenerating(true);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const W = 1400;
        const H = 990;
        canvas.width = W;
        canvas.height = H;

        // Background
        ctx.fillStyle = '#0B0B0F';
        ctx.fillRect(0, 0, W, H);

        // Border
        ctx.strokeStyle = '#F5B800';
        ctx.lineWidth = 4;
        ctx.strokeRect(40, 40, W - 80, H - 80);

        // Inner border
        ctx.strokeStyle = 'rgba(245, 184, 0, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(55, 55, W - 110, H - 110);

        // Decorative corner accents
        const cornerSize = 30;
        ctx.strokeStyle = '#4A90E2';
        ctx.lineWidth = 3;
        // Top-left
        ctx.beginPath(); ctx.moveTo(40, 40 + cornerSize); ctx.lineTo(40, 40); ctx.lineTo(40 + cornerSize, 40); ctx.stroke();
        // Top-right
        ctx.beginPath(); ctx.moveTo(W - 40 - cornerSize, 40); ctx.lineTo(W - 40, 40); ctx.lineTo(W - 40, 40 + cornerSize); ctx.stroke();
        // Bottom-left
        ctx.beginPath(); ctx.moveTo(40, H - 40 - cornerSize); ctx.lineTo(40, H - 40); ctx.lineTo(40 + cornerSize, H - 40); ctx.stroke();
        // Bottom-right
        ctx.beginPath(); ctx.moveTo(W - 40 - cornerSize, H - 40); ctx.lineTo(W - 40, H - 40); ctx.lineTo(W - 40, H - 40 - cornerSize); ctx.stroke();

        // Top label
        ctx.fillStyle = 'rgba(245, 184, 0, 0.7)';
        ctx.font = '600 13px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.letterSpacing = '6px';
        ctx.fillText('NATIONAL PR WEEK 2026  •  APRIL 16–21', W / 2, 110);

        // Title
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '800 52px "Work Sans", sans-serif';
        ctx.fillText('Certificate of Participation', W / 2, 195);

        // Divider
        const divY = 225;
        const gradient = ctx.createLinearGradient(W / 2 - 200, divY, W / 2 + 200, divY);
        gradient.addColorStop(0, 'rgba(74, 144, 226, 0)');
        gradient.addColorStop(0.5, '#4A90E2');
        gradient.addColorStop(1, 'rgba(74, 144, 226, 0)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(W / 2 - 200, divY); ctx.lineTo(W / 2 + 200, divY); ctx.stroke();

        // "This is to certify that"
        ctx.fillStyle = '#9CA3AF';
        ctx.font = '400 18px "Space Grotesk", sans-serif';
        ctx.fillText('This is to certify that', W / 2, 290);

        // Name
        ctx.fillStyle = '#F5B800';
        ctx.font = '700 48px "Work Sans", sans-serif';
        ctx.fillText(trimmed, W / 2, 360);

        // Name underline
        const nameWidth = ctx.measureText(trimmed).width;
        ctx.strokeStyle = 'rgba(245, 184, 0, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(W / 2 - nameWidth / 2 - 20, 375); ctx.lineTo(W / 2 + nameWidth / 2 + 20, 375); ctx.stroke();

        // Description
        ctx.fillStyle = '#D1D5DB';
        ctx.font = '400 17px "Space Grotesk", sans-serif';
        const lines = [
            'has successfully participated in the National PR Week 2026,',
            'held from April 16 to April 21, 2026, celebrating National PR Day in India.',
            '',
            'Organized by AxoCom in collaboration with Saffron Hill Studio and Holy Sin Cafe.',
        ];
        lines.forEach((line, i) => {
            ctx.fillText(line, W / 2, 420 + i * 30);
        });

        // Collaboration logos area
        const collabY = 570;
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        ctx.beginPath();
        ctx.roundRect(W / 2 - 320, collabY - 10, 640, 70, 12);
        ctx.fill();

        ctx.fillStyle = '#6B7280';
        ctx.font = '600 11px "Space Grotesk", sans-serif';
        ctx.fillText('IN COLLABORATION WITH', W / 2, collabY + 12);

        ctx.font = '700 20px "Space Grotesk", sans-serif';
        ctx.fillStyle = '#F5B800';
        ctx.fillText('AxoCom', W / 2 - 180, collabY + 45);
        ctx.fillStyle = '#6B7280';
        ctx.fillText('×', W / 2 - 95, collabY + 45);
        ctx.fillStyle = '#4A90E2';
        ctx.fillText('Saffron Hill Studio', W / 2 + 20, collabY + 45);
        ctx.fillStyle = '#6B7280';
        ctx.fillText('×', W / 2 + 175, collabY + 45);
        ctx.fillStyle = '#A78BFA';
        ctx.fillText('Holy Sin Cafe', W / 2 + 265, collabY + 45);

        // Signature lines
        const sigY = 720;
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 1;
        // Left sig
        ctx.beginPath(); ctx.moveTo(180, sigY); ctx.lineTo(430, sigY); ctx.stroke();
        ctx.fillStyle = '#9CA3AF';
        ctx.font = '400 13px "Space Grotesk", sans-serif';
        ctx.fillText('Organizer', 305, sigY + 22);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '600 15px "Space Grotesk", sans-serif';
        ctx.fillText('AxoCom', 305, sigY + 44);

        // Right sig
        ctx.beginPath(); ctx.moveTo(W - 430, sigY); ctx.lineTo(W - 180, sigY); ctx.stroke();
        ctx.fillStyle = '#9CA3AF';
        ctx.font = '400 13px "Space Grotesk", sans-serif';
        ctx.fillText('Co-organizers', W - 305, sigY + 22);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '600 15px "Space Grotesk", sans-serif';
        ctx.fillText('Saffron Hill Studio & Holy Sin Cafe', W - 305, sigY + 44);

        // Date
        ctx.fillStyle = '#6B7280';
        ctx.font = '400 14px "Space Grotesk", sans-serif';
        ctx.fillText('April 21, 2026  •  National PR Day, India', W / 2, H - 80);

        // Bottom decorative line
        const botGrad = ctx.createLinearGradient(W / 2 - 300, H - 60, W / 2 + 300, H - 60);
        botGrad.addColorStop(0, 'rgba(245, 184, 0, 0)');
        botGrad.addColorStop(0.5, 'rgba(245, 184, 0, 0.5)');
        botGrad.addColorStop(1, 'rgba(245, 184, 0, 0)');
        ctx.strokeStyle = botGrad;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(W / 2 - 300, H - 55); ctx.lineTo(W / 2 + 300, H - 55); ctx.stroke();

        setGenerating(false);
    };

    const downloadCertificate = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement('a');
        link.download = `NPR_Week_2026_Certificate_${name.trim().replace(/\s+/g, '_')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    return (
        <div className="min-h-screen w-full bg-background-dark font-space">
            <Navbar />

            {/* Hero */}
            <div className="pt-32 pb-16 px-4 md:px-10 lg:px-20">
                <div className="max-w-5xl mx-auto flex flex-col gap-16">

                    {/* Header */}
                    <div className="text-center flex flex-col items-center gap-5">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight">
                            National PR Week 2026
                        </h1>
                        <p className="text-gray-600 text-base md:text-lg max-w-2xl leading-relaxed">
                            Celebrating the power of Public Relations in India. Organized by <span className="text-gray-900 font-semibold">AxoCom</span> in collaboration with <span className="text-gray-900 font-semibold">Saffron Hill Studio</span> and <span className="text-gray-900 font-semibold">Holy Sin Cafe</span>.
                        </p>
                    </div>

                    {/* Schedule */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">Event Schedule</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {schedule.map((item, i) => (
                                <div
                                    key={i}
                                    className={`group flex flex-col gap-3 bg-white border border-gray-200 rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all`}
                                >
                                    <div className="flex items-center justify-between gap-3 flex-wrap">
                                        <div className="shrink-0 bg-primary/10 text-primary font-mono font-bold text-sm px-4 py-2 rounded-lg border border-primary/20 w-fit">
                                            {item.date}
                                        </div>
                                        {item.college && (
                                            <span className="text-xs text-gray-500 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full font-medium">
                                                {item.college}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-gray-900 font-bold text-lg group-hover:text-primary transition-colors leading-snug">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed italic">"{item.topic}"</p>
                                    <div className="flex flex-col gap-0.5 pt-1 border-t border-gray-100">
                                        <span className="text-gray-900 font-semibold text-sm">{item.speaker}</span>
                                        <span className="text-gray-500 text-xs">{item.designation}, {item.org}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Collaborators */}
                    <div className="flex flex-col items-center gap-6 bg-white border border-gray-200 rounded-3xl p-8 md:p-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Organized By</h2>
                        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                                    <span className="text-2xl md:text-3xl font-bold text-primary">AC</span>
                                </div>
                                <span className="text-gray-900 font-bold text-sm md:text-base">AxoCom</span>
                            </div>
                            <span className="text-gray-600 text-2xl font-light hidden md:block">×</span>
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                                    <span className="text-2xl md:text-3xl font-black text-primary">SH</span>
                                </div>
                                <span className="text-gray-900 font-bold text-sm md:text-base">Saffron Hill Studio</span>
                            </div>
                            <span className="text-gray-600 text-2xl font-light hidden md:block">×</span>
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                                    <span className="text-2xl md:text-3xl font-bold text-primary/70">HS</span>
                                </div>
                                <span className="text-gray-900 font-bold text-sm md:text-base">Holy Sin Cafe</span>
                            </div>
                        </div>
                    </div>

                    {/* Government & Knowledge Partners */}
                    <div className="flex flex-col items-center gap-8 bg-white border border-gray-200 rounded-3xl p-8 md:p-12">
                        <div className="text-center flex flex-col gap-2">
                            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Knowledge Partners</span>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Government Organisations</h2>
                            <p className="text-gray-500 text-sm max-w-xl mx-auto">
                                This event was made possible in collaboration with leading government bodies and institutional experts.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                            {[
                                { abbr: 'UKJVNL', full: 'Uttarakhand Jal Vidyut Nigam Limited', icon: 'electric_bolt', color: 'text-blue-600 bg-blue-50 border-blue-100' },
                                { abbr: 'UKBOCW', full: 'Uttarakhand Building & Construction Workers Board', icon: 'construction', color: 'text-amber-600 bg-amber-50 border-amber-100' },
                                { abbr: 'UCOST', full: 'Uttarakhand Council of Science & Technology', icon: 'science', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
                                { abbr: 'SMHFW', full: 'State Medical Health & Family Welfare Directorate', icon: 'health_and_safety', color: 'text-red-600 bg-red-50 border-red-100' },
                                { abbr: 'SIDCUL', full: 'State Infrastructure & Industrial Development Corporation', icon: 'factory', color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
                            ].map(({ abbr, full, icon, color }) => (
                                <div key={abbr} className={`flex items-center gap-4 border rounded-2xl p-5 ${color}`}>
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-white border ${color.split(' ').find(c => c.startsWith('border')) ?? ''}`}>
                                        <span className={`material-symbols-outlined text-xl ${color.split(' ')[0]}`}>{icon}</span>
                                    </div>
                                    <div>
                                        <p className={`font-bold text-sm ${color.split(' ')[0]}`}>{abbr}</p>
                                        <p className="text-gray-600 text-xs leading-snug mt-0.5">{full}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Certificate Download Section */}
                    <div id="certificate" className="flex flex-col items-center gap-8 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-3xl p-8 md:p-12">
                        <div className="text-center flex flex-col gap-3">
                            <span className="material-symbols-outlined text-primary text-5xl">workspace_premium</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Download Your Certificate</h2>
                            <p className="text-gray-600 text-base max-w-xl">
                                Enter your full name as registered during the event to generate and download your participation certificate.
                            </p>
                        </div>

                        {/* <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && generateCertificate()}
                                placeholder="Enter your full name"
                                className="flex-1 px-5 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 text-base transition-all"
                            />
                            <button
                                onClick={generateCertificate}
                                disabled={!name.trim() || generating}
                                className="px-8 py-4 bg-primary hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-base transition-all transform hover:scale-105 shadow-lg shadow-primary/30 whitespace-nowrap"
                            >
                                {generating ? 'Generating...' : 'Generate'}
                            </button>
                        </div> */}
                        <p className="text-primary font-semibold text-lg text-center">
                            Available after 21st April
                        </p>

                        {/* Hidden Canvas */}
                        <canvas ref={canvasRef} className="hidden" />

                        {/* Certificate Preview */}
                        {canvasRef.current && canvasRef.current.width > 0 && name.trim() && (
                            <div className="w-full flex flex-col items-center gap-6 animate-fade-in">
                                <div className="w-full max-w-4xl rounded-2xl overflow-hidden border border-gray-200 shadow-2xl">
                                    <canvas
                                        ref={canvasRef}
                                        className="!block w-full h-auto"
                                    />
                                </div>
                                <button
                                    onClick={downloadCertificate}
                                    className="flex items-center gap-3 px-10 py-4 bg-primary hover:bg-indigo-600 text-white font-semibold rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-primary/30"
                                >
                                    <span className="material-symbols-outlined">download</span>
                                    Download Certificate
                                </button>
                            </div>
                        )}
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
                            <a href="https://www.instagram.com/axocommediaxtech" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                            </a>
                            <a href="https://www.linkedin.com/in/axolotl-communications-8ba5a8393/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="LinkedIn">
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

export default NPRWeek2026;