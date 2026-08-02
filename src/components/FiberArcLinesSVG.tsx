import React from 'react';

export const FiberArcLinesSVG: React.FC = () => {
  return (
    <div className="absolute inset-x-0 bottom-0 top-12 flex justify-center pointer-events-none overflow-hidden z-0">
      <svg
        viewBox="0 0 1200 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-6xl h-full opacity-90"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          {/* Orange Glow Filter */}
          <filter id="arcGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="arcGrad1" x1="0" y1="400" x2="1200" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF5B00" stopOpacity="0.1" />
            <stop offset="25%" stopColor="#FF7700" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFA000" stopOpacity="1" />
            <stop offset="75%" stopColor="#FF7700" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FF5B00" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="arcGrad2" x1="100" y1="400" x2="1100" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF3300" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#FF9000" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FF3300" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Ambient Radial Core Glow behind the arcs */}
        <ellipse cx="600" cy="360" rx="450" ry="120" fill="#FF5B00" opacity="0.22" filter="blur(60px)" />

        {/* Curved Laser Fiber Lines */}
        <g filter="url(#arcGlow)">
          {/* Outer Arcs */}
          <path d="M 50 400 C 150 180, 450 120, 600 220 C 750 120, 1050 180, 1150 400" stroke="url(#arcGrad1)" strokeWidth="1.8" fill="none" />
          <path d="M 100 400 C 200 200, 480 140, 600 230 C 720 140, 1000 200, 1100 400" stroke="url(#arcGrad2)" strokeWidth="1.5" fill="none" />
          
          {/* Mid Arcs */}
          <path d="M 180 400 C 260 220, 500 160, 600 240 C 700 160, 940 220, 1020 400" stroke="url(#arcGrad1)" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
          <path d="M 240 400 C 310 240, 520 170, 600 250 C 680 170, 890 240, 960 400" stroke="url(#arcGrad2)" strokeWidth="1.8" fill="none" />

          {/* Inner Arcs */}
          <path d="M 320 400 C 380 260, 540 180, 600 260 C 660 180, 820 260, 880 400" stroke="url(#arcGrad1)" strokeWidth="1.2" fill="none" />
          <path d="M 390 400 C 430 280, 550 200, 600 270 C 650 200, 770 280, 810 400" stroke="url(#arcGrad2)" strokeWidth="1.5" strokeDasharray="8 4" fill="none" />
          <path d="M 460 400 C 480 300, 570 220, 600 280 C 630 220, 720 300, 740 400" stroke="url(#arcGrad1)" strokeWidth="2" fill="none" />
        </g>

        {/* Emitting Particle Node Points at arc peaks */}
        <circle cx="600" cy="220" r="3" fill="#FFF" filter="url(#arcGlow)" />
        <circle cx="500" cy="160" r="2.5" fill="#FF5B00" filter="url(#arcGlow)" />
        <circle cx="700" cy="160" r="2.5" fill="#FF5B00" filter="url(#arcGlow)" />
        <circle cx="450" cy="120" r="2" fill="#FF9000" />
        <circle cx="750" cy="120" r="2" fill="#FF9000" />
      </svg>
    </div>
  );
};
