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
import { buildSeoLinks, buildSeoMeta, organizationSchema, structuredData, webPageSchema } from "~/lib/seo";
import '../app.css';

const seo = {
    title: "AxoCom - Tech x Media",
    description: "AxoCom is a tech x media company building AI-powered communication, owned media networks, campaign systems, PR strategy, and election intelligence for modern India.",
    path: "/",
    image: "/images/logo2.png",
    imageAlt: "AxoCom tech x media services",
    keywords: [
        "AxoCom",
        "tech x media",
        "AI media company",
        "PR technology",
        "campaign intelligence",
    ],
};

export const meta = () => buildSeoMeta(seo);
export const links = () => buildSeoLinks(seo);

const App: React.FC = () => {
    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="landing-page bg-background-dark min-h-screen w-full relative">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: structuredData([
                        organizationSchema,
                        webPageSchema(seo),
                    ]),
                }}
            />

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
