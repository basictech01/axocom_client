import React from 'react';
import Prologue from '../components/static_components/Prologue';
import Chapter1 from '../components/static_components/Chapter1';
import Chapter2 from '../components/static_components/Chapter2';
import Chapter5 from '../components/static_components/Chapter5';
import Chapter3 from '../components/static_components/Chapter3';
import Chapter4 from '../components/static_components/Chapter4';
import Chapter6 from '../components/static_components/Chapter6';
import Finale from '../components/static_components/Finale';
import Navbar from '../components/static_components/Navbar';
import '../app.css';

const App: React.FC = () => {
    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="landing-page bg-background-dark min-h-screen w-full relative">

            <Navbar />

            {/* Main Content Sections */}
            <main>
                <section id="prologue" className="min-h-screen relative">
                    <Prologue onNext={() => scrollTo('chapter1')} />
                </section>

                <section id="chapter1" className="min-h-screen relative">
                    <Chapter1 onNext={() => scrollTo('chapter2')} />
                </section>

                <section id="chapter2" className="min-h-screen relative">
                    <Chapter2 />
                </section>

                <section id="chapter3" className="min-h-screen relative">
                    <Chapter3 onNext={() => scrollTo('chapter4')} />
                </section>

                <section id="chapter4" className="min-h-screen relative">
                    <Chapter4 />
                </section>

                <section id="chapter5" className="min-h-screen relative">
                    <Chapter5 />
                </section>

                <section id="chapter6" className="min-h-screen relative">
                    <Chapter6 onPrev={() => scrollTo('chapter5')} onNext={() => scrollTo('finale')} />
                </section>

                <section id="finale" className="min-h-screen relative">
                    <Finale />
                </section>
            </main>

        </div>
    );
};

export default App;