import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEventsOpen, setIsEventsOpen] = useState(false);
    const [isMobileEventsOpen, setIsMobileEventsOpen] = useState(false);
    const eventsRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (eventsRef.current && !eventsRef.current.contains(e.target as Node)) {
                setIsEventsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handlePartnerUp = () => {
        setIsMenuOpen(false);
        if (window.location.pathname === '/') {
            const el = document.getElementById('finale');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/#finale');
        }
    };

    return (
        <>
            <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-5 py-3 bg-white/90 backdrop-blur-xl rounded-full shadow-xl shadow-black/10 border border-gray-200/80 transition-all duration-300 w-[calc(100%-2rem)] max-w-4xl">
                {/* Logo */}
                <Link to="/" className="flex items-center cursor-pointer group select-none">
                    <img src="/images/logo2.png" alt="AxoCom" className="h-12 group-hover:opacity-75 transition-opacity" />
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden lg:flex items-center gap-1">
                    <Link
                        to="/election-management"
                        className="px-4 py-2 text-sm font-medium transition-all rounded-full text-gray-600 hover:text-red-500 hover:bg-red-50"
                    >
                        Elections
                    </Link>
                    <div className="relative" ref={eventsRef}>
                        <button
                            onClick={() => setIsEventsOpen(!isEventsOpen)}
                            className="px-4 py-2 text-sm font-medium transition-all rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 flex items-center gap-1"
                        >
                            Events
                            <span className={`material-symbols-outlined text-base transition-transform duration-200 ${isEventsOpen ? 'rotate-180' : ''}`}>expand_more</span>
                        </button>
                        {isEventsOpen && (
                            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/10 border border-gray-200/80 py-2 min-w-[200px] z-50">
                                <Link
                                    to="/nprweek2026"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 transition-all"
                                >
                                    <span className="material-symbols-outlined text-lg">celebration</span>
                                    NPR Week 2026
                                </Link>
                            </div>
                        )}
                    </div>
                    <Link
                        to="/careers"
                        className="px-4 py-2 text-sm font-medium transition-all rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    >
                        Careers
                    </Link>
                </div>

                {/* CTA */}
                <div className="hidden lg:flex items-center gap-2">
                    <button
                        onClick={handlePartnerUp}
                        className="bg-primary hover:bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md shadow-primary/25"
                    >
                        Partner Up
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="lg:hidden text-gray-600 p-1.5" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span className="material-symbols-outlined text-2xl">{isMenuOpen ? 'close' : 'menu'}</span>
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-40 bg-white transition-transform duration-300 lg:hidden flex flex-col pt-24 px-8 gap-6 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <Link
                    to="/election-management"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-semibold text-left text-red-400 hover:text-red-600 border-b border-gray-100 pb-4"
                >
                    Elections
                </Link>
                <div className="border-b border-gray-100 pb-4">
                    <button
                        onClick={() => setIsMobileEventsOpen(!isMobileEventsOpen)}
                        className="text-2xl font-semibold text-left text-gray-400 hover:text-gray-900 w-full flex items-center justify-between"
                    >
                        Events
                        <span className={`material-symbols-outlined text-2xl transition-transform duration-200 ${isMobileEventsOpen ? 'rotate-180' : ''}`}>expand_more</span>
                    </button>
                    {isMobileEventsOpen && (
                        <div className="mt-3 ml-4 flex flex-col gap-3">
                            <Link
                                to="/nprweek2026"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-lg text-gray-500 hover:text-primary transition-colors flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-xl">celebration</span>
                                NPR Week 2026
                            </Link>
                        </div>
                    )}
                </div>
                <Link
                    to="/careers"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-semibold text-left text-gray-400 hover:text-gray-900 border-b border-gray-100 pb-4"
                >
                    Careers
                </Link>
                <button
                    onClick={handlePartnerUp}
                    className="mt-4 bg-primary text-white py-4 rounded-full text-xl font-semibold shadow-lg shadow-primary/30 text-center"
                >
                    Partner Up
                </button>
            </div>
        </>
    );
};

export default Navbar;