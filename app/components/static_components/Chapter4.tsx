import React, { useState, useRef, useEffect, useCallback } from 'react';

const mediaProperties = [
  { id: 'hillsquills', name: 'Hillsquills', image: './images/hillsQuills.jpeg', link: "https://www.hillsquills.com/" },
  { id: 'AxoNews', name: 'AxoNews', image: './images/axo.jpg', link: "https://www.instagram.com/axonews/" },
  { id: 'lawmedy', name: 'Lawmedy', image: './images/lawmeady.png', link: "https://www.youtube.com/@Lawmedy_yt" },
  { id: 'SpotlightWithShruti', name: 'Spotlight With Shruti', image: './images/sws.jpg', link: "https://www.instagram.com/spotlightwithshruti/" },
  { id: 'UttarakhandiBaudi', name: 'Uttarakhandi Baudi', image: './images/ukb.jpeg', link: "https://www.instagram.com/uttarakhandi_baudi/" },
  { id: 'KYP', name: 'Know Your Policy', image: './images/kyp.png', link: "https://www.instagram.com/kyp_uttarakhand/" },
  { id: 'india7live', name: 'India7Live', image: './images/india7.png', link: "https://india7live.com/" },
  { id: 'tehelkaindia', name: 'Tehelka India', image: './images/tehalka.png', link: "https://tehelkaindianews.com/" },
];

const Chapter5: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(0);

  const updateCinematicScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const viewportWidth = window.innerWidth;
    const viewportCenter = viewportWidth / 2;
    const maxDist = viewportWidth * 0.75;

    let closestIndex = 0;
    let minDistance = Infinity;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = cardCenter - viewportCenter;
      const absDistance = Math.abs(distance);

      if (absDistance < minDistance) {
        minDistance = absDistance;
        closestIndex = index;
      }

      const progress = Math.max(0, 1 - absDistance / maxDist);
      const rotateY = (distance / maxDist) * -40;
      const scale = 0.8 + (progress * 0.25); // Slightly tighter scale to prevent top/bottom clipping
      const blur = (1 - progress) * 8;
      const opacity = 0.15 + (progress * 0.85);

      card.style.transform = `perspective(1500px) rotateY(${rotateY}deg) scale(${scale})`;
      card.style.opacity = opacity.toString();
      card.style.filter = `blur(${blur}px)`;
      card.style.zIndex = Math.round(progress * 100).toString();

      const contentLayer = card.querySelector('.cinematic-content') as HTMLElement;
      if (contentLayer) {
        contentLayer.style.opacity = progress > 0.85 ? '1' : '0';
        // Changed to use REM instead of VW so it doesn't fly off the card on wide screens
        contentLayer.style.transform = `translateY(${(1 - progress) * 2}rem)`;
        contentLayer.style.pointerEvents = progress > 0.95 ? 'auto' : 'none';
      }
    });

    if (closestIndex !== activeIndexRef.current) {
      activeIndexRef.current = closestIndex;
      setActiveIndex(closestIndex);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateCinematicScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateCinematicScroll();
    container.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateCinematicScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateCinematicScroll);
    };
  }, [updateCinematicScroll]);

  return (
    // Enforced strict 100dvh height with overflow-hidden to prevent vertical scrolling
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center font-space overflow-hidden relative selection:bg-primary selection:text-white pt-24">

      <style>{`
        :root {
          /* THE MACBOOK AIR FIX:
            We calculate the height first. It will take up exactly 55% of the screen height,
            never shrinking below 320px, and never growing beyond 600px.
          */
          --card-height: clamp(320px, 55vh, 600px);
          
          /* The width is mathematically derived from the height to maintain a 3/4 aspect ratio */
          --card-width: calc(var(--card-height) * 0.75);
          
          /* Perfect horizontal centering */
          --track-padding: calc(50vw - (var(--card-width) / 2));
        }
        
        .fluid-card {
          width: var(--card-width);
          height: var(--card-height);
        }

        .fluid-track {
          padding-left: var(--track-padding);
          padding-right: var(--track-padding);
        }

        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Ambient Background */}
      <div className="absolute inset-0 z-0 transition-opacity duration-[1500ms] ease-in-out">
        {mediaProperties.map((property, idx) => (
          <div
            key={`bg-${property.id}`}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out will-change-[opacity] ${idx === activeIndex ? 'opacity-35' : 'opacity-0'}`}
            style={{ backgroundImage: `url("${property.image}")` }}
          />
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#F9FAFB_80%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-transparent to-gray-50"></div>
      </div>

      {/* Header - Margins mathematically balanced using vh to split vertical space */}
      <div className="relative z-20 w-full text-center pointer-events-none drop-shadow-2xl mb-[clamp(0.5rem,2vh,1.5rem)] shrink-0">
        <p className="text-primary font-mono text-[clamp(0.65rem,1.2vh,0.875rem)] tracking-[0.3em] uppercase mb-[clamp(0.25rem,1vh,0.5rem)] animate-pulse">
          Cinematic Explorer
        </p>
        <h1 className="text-[clamp(2.5rem,6vh,5rem)] font-work font-black tracking-tighter text-gray-900 uppercase leading-[0.9]">
          Our Media Universe
        </h1>
      </div>

      {/* Track - Flex-1 ensures it takes the remaining space, perfectly centering the cards vertically */}
      <div
        ref={scrollContainerRef}
        className="fluid-track relative z-30 w-full flex-1 overflow-x-auto snap-x snap-mandatory hide-scrollbar flex items-center outline-none will-change-scroll"
      >
        <div className="flex gap-[clamp(1rem,3vw,3rem)] w-max items-center h-full">
          {mediaProperties.map((property, index) => (
            <div
              key={property.id}
              ref={(el) => { cardRefs.current[index] = el; }}
              onClick={() => {
                cardRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
              }}
              className="fluid-card group relative shrink-0 snap-center rounded-[clamp(1.25rem,3vh,2.5rem)] bg-black/40 border border-white/10 flex flex-col justify-end p-[clamp(1.25rem,3vh,2.5rem)] cursor-pointer overflow-hidden transform-gpu transition-shadow hover:shadow-[0_0_80px_-20px_rgba(255,255,255,0.2)]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] ease-out group-hover:scale-[1.05]"
                style={{ backgroundImage: `url("${property.image}")` }}
              ></div>

              {/* Vignettes */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Content Layer */}
              <div className="cinematic-content relative z-10 transition-all duration-500 ease-out flex flex-col items-center text-center">

                <h3 className="text-[clamp(1.5rem,4vh,2.5rem)] font-black text-white tracking-tight mb-[clamp(0.75rem,2vh,1.5rem)] drop-shadow-lg leading-tight">
                  {property.name}
                </h3>

                <button
                  className="flex items-center gap-2 text-black text-[clamp(0.75rem,1.5vh,0.875rem)] font-bold bg-white px-[clamp(1.25rem,3vw,2rem)] py-[clamp(0.5rem,1.5vh,0.75rem)] rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(property.link, '_blank', 'noopener,noreferrer');
                  }}
                >
                  Explore
                  <svg className="w-[clamp(12px,1.5vh,16px)] h-[clamp(12px,1.5vh,16px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Chapter5;