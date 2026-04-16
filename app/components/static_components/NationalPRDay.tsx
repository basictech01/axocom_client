import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const NationalPRDay: React.FC = () => {
    const eventEnd = new Date('2026-04-21T23:59:59');

    const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(eventEnd));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeLeft(eventEnd));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    function getTimeLeft(target: Date) {
        const now = new Date();
        const diff = target.getTime() - now.getTime();
        if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
            ended: false,
        };
    }

    const schedule = [
        { date: 'April 16', title: 'Opening Ceremony', desc: 'Kickoff of National PR Week with an evening of storytelling, networking, and industry insights.' },
        { date: 'April 17–20', title: 'PR Masterclasses & Panels', desc: 'Workshops on crisis comms, digital PR, media relations, and brand narrative led by top practitioners.' },
        { date: 'April 21', title: 'National PR Day Celebration', desc: 'The grand finale. Celebrating the power of Public Relations in India with awards, talks, and a community gathering.' },
    ];

    return (
        <div className="min-h-[100dvh] w-full bg-background-dark font-space py-16 md:py-24 px-4 md:px-10 lg:px-20 flex flex-col items-center justify-center relative overflow-hidden">

            {/* Decorative gradient blurs */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-5xl w-full mx-auto relative z-10 flex flex-col gap-12 md:gap-16">

                {/* Badge */}
                <div className="flex flex-col items-center text-center gap-5">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight">
                        National PR Day
                    </h2>
                    <p className="text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed">
                        Celebrating the power of Public Relations in India. Join us from <span className="text-gray-900 font-semibold">April 16–21, 2026</span> as we honor the craft that shapes perception and drives narratives.
                    </p>
                </div>

                {/* Countdown */}
                {!timeLeft.ended ? (
                    <div className="flex justify-center gap-4 md:gap-6">
                        {[
                            { value: timeLeft.days, label: 'Days' },
                            { value: timeLeft.hours, label: 'Hours' },
                            { value: timeLeft.minutes, label: 'Mins' },
                            { value: timeLeft.seconds, label: 'Secs' },
                        ].map((item) => (
                            <div key={item.label} className="flex flex-col items-center bg-white border border-gray-200 rounded-2xl px-5 py-4 md:px-8 md:py-6 min-w-[70px] md:min-w-[100px] shadow-sm">
                                <span className="text-3xl md:text-5xl font-black text-gray-900 tabular-nums">
                                    {String(item.value).padStart(2, '0')}
                                </span>
                                <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mt-1 font-semibold">{item.label}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center">
                        <span className="text-primary text-xl md:text-2xl font-bold animate-pulse">🎉 The event is live! Happy National PR Day!</span>
                    </div>
                )}

                {/* Collaboration */}
                <div className="flex flex-col items-center gap-6 bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm">
                    <h3 className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-gray-500">In Collaboration With</h3>
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-center group-hover:border-primary/60 transition-colors">
                                <span className="text-2xl md:text-3xl font-bold text-primary">AC</span>
                            </div>
                            <span className="text-gray-900 font-semibold text-sm md:text-base">AxoCom</span>
                            <span className="text-gray-400 text-[10px] uppercase tracking-wider">Host</span>
                        </div>
                        <span className="text-gray-300 text-2xl font-light hidden md:block">×</span>
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-center group-hover:border-primary/60 transition-colors">
                                <span className="text-2xl md:text-3xl font-bold text-primary">SH</span>
                            </div>
                            <span className="text-gray-900 font-semibold text-sm md:text-base">Saffron Hill Studio</span>
                            <span className="text-gray-400 text-[10px] uppercase tracking-wider">Partner</span>
                        </div>
                        <span className="text-gray-300 text-2xl font-light hidden md:block">×</span>
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-center group-hover:border-primary/40 transition-colors">
                                <span className="text-2xl md:text-3xl font-bold text-primary/70">HS</span>
                            </div>
                            <span className="text-gray-900 font-semibold text-sm md:text-base">Holy Sin Cafe</span>
                            <span className="text-gray-400 text-[10px] uppercase tracking-wider">Partner</span>
                        </div>
                    </div>
                </div>

                {/* Schedule Timeline */}
                <div className="flex flex-col gap-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">Event Schedule</h3>
                    <div className="flex flex-col gap-4">
                        {schedule.map((item, i) => (
                            <div
                                key={i}
                                className="group flex flex-col md:flex-row md:items-start gap-3 md:gap-6 bg-white border border-gray-200 rounded-2xl p-6 hover:border-primary/40 hover:shadow-md transition-all"
                            >
                                <div className="shrink-0 bg-primary/10 text-primary font-mono font-semibold text-sm px-4 py-2 rounded-lg border border-primary/20 text-center md:min-w-[130px]">
                                    {item.date}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h4 className="text-gray-900 font-semibold text-lg group-hover:text-primary transition-colors">{item.title}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <a
                        href="mailto:pranav.pandey@axocom.in?subject=National%20PR%20Day%20-%20RSVP&body=Hello%20AxoCom%20Team%2C%0D%0A%0D%0AI%20would%20like%20to%20attend%20the%20National%20PR%20Day%20event%20(April%2016-21%2C%202026).%0D%0A%0D%0AName%3A%20%0D%0AOrganization%3A%20%0D%0AEmail%3A%20%0D%0APhone%3A%20%0D%0A%0D%0ABest%20regards"
                        className="px-10 py-4 bg-primary hover:bg-indigo-600 text-white font-semibold rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-primary/30 inline-block text-center"
                    >
                        RSVP for the Event
                    </a>
                    <Link
                        to="/nprweek2026"
                        className="px-10 py-4 border border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-xl text-lg transition-all transform hover:scale-105 inline-flex items-center gap-2 text-center"
                    >
                        <span className="material-symbols-outlined text-xl">workspace_premium</span>
                        Get Your Certificate (Available after 21st April)
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default NationalPRDay;