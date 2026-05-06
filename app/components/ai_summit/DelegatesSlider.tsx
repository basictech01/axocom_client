import React from "react";

interface Delegate {
  name: string;
  role: string;
}

interface Props {
  delegates: Delegate[];
}

const DelegatesSlider: React.FC<Props> = ({ delegates }) => {
  const mid = Math.ceil(delegates.length / 2);
  const firstRow = delegates.slice(0, mid);
  const secondRow = delegates.slice(mid);

  const SliderRow = ({
    data,
    reverse = false,
  }: {
    data: Delegate[];
    reverse?: boolean;
  }) => (
    <div className="w-full overflow-hidden">
      <div
        className={`flex w-max gap-6 py-4 ${
          reverse ? "animate-scroll-reverse" : "animate-scroll"
        }`}
      >
        {[...data, ...data].map((person, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[260px] bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >
            {/* Initials Avatar */}
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700     font-semibold mb-3">
              {person.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>

            {/* Name */}
            <p className="font-semibold text-slate-900 text-sm leading-snug">
              {person.name}
            </p>

            {/* Role */}
            <p className="mt-2 text-xs text-slate-500">
              {person.role.split(",")[0]},{" "}
              <span className="font-semibold text-violet-600">
                {person.role.split(",")[1]}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <style>
        {`
          .animate-scroll {
            animation: scroll 40s linear infinite;
          }

          .animate-scroll-reverse {
            animation: scrollReverse 40s linear infinite;
          }

          .animate-scroll:hover,
          .animate-scroll-reverse:hover {
            animation-play-state: paused;
          }

          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          @keyframes scrollReverse {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}
      </style>

      <div className="space-y-4">
        <SliderRow data={firstRow} />
        <SliderRow data={secondRow} reverse />
      </div>
    </>
  );
};

export default DelegatesSlider;