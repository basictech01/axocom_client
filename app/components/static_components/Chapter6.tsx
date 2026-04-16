import React from 'react';

interface LeaderProps {
  name: string;
  role: string;
  description: string;
  image: string;
  alt: string;
}

const LeaderCard: React.FC<LeaderProps> = ({ name, role, description, image, alt }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div
      className="group relative flex flex-col justify-end overflow-hidden rounded-2xl aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] bg-cover bg-center transition-transform duration-500 hover:scale-[1.02] cursor-pointer"
      style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.2) 60%, rgba(0,0,0,0) 100%), url("${image}")` }}
      role="img"
      aria-label={alt}
      onClick={() => setIsExpanded(!isExpanded)}
      onMouseEnter={() => window.innerWidth >= 1024 && setIsExpanded(true)}
      onMouseLeave={() => window.innerWidth >= 1024 && setIsExpanded(false)}
    >
      <div className="relative z-10 p-4 sm:p-5 md:p-6 lg:p-8 transition-all duration-500">
        {/* Description - Hidden below, slides up on hover */}
        <div className={`mb-3 sm:mb-4 transition-all duration-500 ${isExpanded ? 'opacity-100 max-h-48 translate-y-0' : 'opacity-0 max-h-0 translate-y-8 lg:group-hover:opacity-100 lg:group-hover:max-h-48 lg:group-hover:translate-y-0'}`}>
          <p className="font-sans text-gray-300 text-xs sm:text-sm leading-relaxed">
            {description}
          </p>
          <div className="h-0.5 w-full bg-primary mt-3 sm:mt-4"></div>
        </div>

        {/* Name and Role - Always visible, pushed up on hover */}
        <div className="transition-all duration-500">
          <h3 className="font-sans text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-white mb-1">{name}</h3>
          <p className="font text-white text-xs font-bold uppercase tracking-widest">{role}</p>
        </div>
      </div>
    </div>
  );
};

const Chapter2: React.FC = () => {
  const leaders: LeaderProps[] = [
    {
      name: "Basant Rawat",
      role: "Media Strategy, Political Communication, Editorial Excellence",
      description: "A respected figure in Indian new media with four decades of experience, ex-Senior Journalist at The Telegraph and political commentator.",
      image: "images/basantrawat.png",
      alt: "Portrait of Basant Rawat"
    },
    {
      name: "Parantap Bhatt",
      role: "Creative Direction, Brand Building, Advertising Strategy",
      description: "Associate Creative Director at Sideways, who has crafted brand and communication strategies for major clients like Pidilite, Sleepwell, and Borosil",
      image: "images/paramtapbhatt.png",
      alt: "Portrait of Parantap Bhatt"
    },
    {
      name: "Pranav Pandey",
      role: "AI/ML Engineering, Data Systems, Technical Innovation",
      description: "Senior Software Engineer at LinkedIn, specializing in the technical architecture and development of AI and data-driven systems",
      image: "images/pranavpandey.png",
      alt: "Portrait of Pranav Pandey"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-background-dark pt-24 pb-6 px-4 md:px-10 lg:px-20 xl:px-40 flex flex-col justify-start">
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="flex flex-col gap-4 text-center mb-10 md:mb-16 items-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-work font-black leading-tight tracking-tighter uppercase drop-shadow-2xl">
            The Team
          </h1>
          <p className="font-sans text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Meet the visionaries who ignited the spark and continue to fuel the fire of innovation at AxoCom.
            Each a master in their own right, together they form the core of our narrative.
          </p>
        </div>

        {/* 
          Grid Response Strategy:
          - Mobile: 1 col
          - Tablet/Small Laptop (sm/md/lg): 2 cols for readability
          - Large Desktop (xl): 4 cols
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {leaders.map((leader) => (
            <LeaderCard
              key={leader.name}
              name={leader.name}
              role={leader.role}
              description={leader.description}
              image={leader.image}
              alt={leader.alt}
            />
          ))}
        </div>

        {/* Instruction for users */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base">info</span>
            <span className="hidden lg:inline">Hover over any card to learn more about our visionaries</span>
            <span className="lg:hidden">Tap any card to learn more about our visionaries</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chapter2;