import React from 'react';

interface VRHeadsetSVGProps {
  modelId: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  isHovered?: boolean;
}

export const VRHeadsetSVG: React.FC<VRHeadsetSVGProps> = ({
  modelId,
  size = 'md',
  className = '',
  isHovered = false,
}) => {
  const getScale = () => {
    switch (size) {
      case 'sm':
        return 'w-24 h-24';
      case 'md':
        return 'w-36 h-36';
      case 'lg':
        return 'w-48 h-48';
      case 'hero':
        return 'w-full h-full max-w-[540px] max-h-[540px]';
      default:
        return 'w-36 h-36';
    }
  };

  if (modelId === 'model-1') {
    // Model 1: Isometric angled helmet with red/orange glowing visor band and audio side-cups
    return (
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${getScale()} ${className} transition-transform duration-500 ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}
      >
        <defs>
          {/* Main Visor Glow */}
          <filter id="visorGlow1" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glowRedOrange" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradients */}
          <linearGradient id="bodyGrad1" x1="50" y1="50" x2="350" y2="350" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2A2A2E" />
            <stop offset="40%" stopColor="#151518" />
            <stop offset="100%" stopColor="#08080A" />
          </linearGradient>

          <linearGradient id="visorMetal1" x1="100" y1="120" x2="300" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E1F24" />
            <stop offset="50%" stopColor="#0B0C0E" />
            <stop offset="100%" stopColor="#18191E" />
          </linearGradient>

          <linearGradient id="redOrangeBand" x1="120" y1="180" x2="310" y2="210" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF1E00" />
            <stop offset="50%" stopColor="#FF5B00" />
            <stop offset="100%" stopColor="#FF9000" />
          </linearGradient>

          <linearGradient id="glassHighlight" x1="140" y1="140" x2="280" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Ambient Backlight Glow */}
        <ellipse cx="200" cy="220" rx="140" ry="100" fill="#FF5B00" opacity="0.18" filter="url(#visorGlow1)" />

        {/* Main Headstrap (Rear / Top Arc) */}
        <path
          d="M 120 160 C 130 90, 270 90, 290 160 C 295 180, 280 200, 270 205 L 130 205 Z"
          fill="#111215"
          stroke="#33343A"
          strokeWidth="3"
        />

        {/* Top Cushion Strap */}
        <path
          d="M 150 115 C 180 100, 230 100, 260 115 C 265 125, 255 135, 245 135 C 220 125, 180 125, 160 135 Z"
          fill="#1A1C20"
          stroke="#444"
          strokeWidth="1.5"
        />

        {/* Left Earcup / Audio Strap Base */}
        <g id="earcup-left">
          <rect x="70" y="180" width="45" height="75" rx="20" fill="url(#bodyGrad1)" stroke="#3A3C44" strokeWidth="2" />
          <rect x="78" y="190" width="29" height="55" rx="14" fill="#0D0E10" />
          <circle cx="92.5" cy="217.5" r="12" fill="#FF3300" opacity="0.8" filter="url(#glowRedOrange)" />
          <circle cx="92.5" cy="217.5" r="6" fill="#111" />
        </g>

        {/* Right Earcup / Audio Pad */}
        <g id="earcup-right">
          <rect x="285" y="180" width="45" height="75" rx="20" fill="url(#bodyGrad1)" stroke="#3A3C44" strokeWidth="2" />
          <rect x="293" y="190" width="29" height="55" rx="14" fill="#0D0E10" />
          <circle cx="307.5" cy="217.5" r="12" fill="#FF3300" opacity="0.8" filter="url(#glowRedOrange)" />
          <circle cx="307.5" cy="217.5" r="6" fill="#111" />
        </g>

        {/* Main Visor Body Shell (3/4 Angled Isometric Look) */}
        <path
          d="M 100 160 C 100 145, 150 140, 200 140 C 250 140, 300 145, 300 160 L 315 220 C 318 245, 290 270, 250 280 C 200 290, 150 285, 110 265 C 90 250, 95 230, 100 160 Z"
          fill="url(#bodyGrad1)"
          stroke="#42444C"
          strokeWidth="3"
        />

        {/* Visor Lens Plate */}
        <path
          d="M 112 170 C 120 158, 180 152, 235 155 C 275 158, 292 165, 292 175 L 298 215 C 300 235, 275 255, 235 262 C 180 270, 130 258, 110 240 L 112 170 Z"
          fill="url(#visorMetal1)"
          stroke="#111"
          strokeWidth="2"
        />

        {/* Glossy Front Glass Reflection Layer */}
        <path
          d="M 115 172 C 150 160, 240 160, 288 178 L 294 210 C 290 230, 220 255, 120 232 Z"
          fill="url(#glassHighlight)"
        />

        {/* The Signature Glowing Red/Orange Visor LED Band */}
        <g id="led-band" filter="url(#glowRedOrange)">
          <path
            d="M 115 205 Q 195 228 292 195 L 294 207 Q 195 240 115 217 Z"
            fill="url(#redOrangeBand)"
          />
          {/* Intense Core Beam */}
          <path
            d="M 125 207 Q 195 227 282 199"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.9"
          />
        </g>

        {/* Top Metallic V-Accent Emblem */}
        <path
          d="M 180 148 L 200 162 L 220 148 L 210 145 L 200 153 L 190 145 Z"
          fill="#FF5B00"
          opacity="0.9"
        />

        {/* Side Vents & Details */}
        <line x1="120" y1="230" x2="135" y2="245" stroke="#FF5B00" strokeWidth="2" opacity="0.8" />
        <line x1="128" y1="234" x2="143" y2="249" stroke="#FF5B00" strokeWidth="2" opacity="0.8" />
        
        {/* Bottom Sensor Lenses */}
        <circle cx="160" cy="265" r="4" fill="#111" stroke="#FF5B00" strokeWidth="1.5" />
        <circle cx="240" cy="265" r="4" fill="#111" stroke="#FF5B00" strokeWidth="1.5" />
      </svg>
    );
  }

  if (modelId === 'model-2') {
    // Model 2: Frontal view visor with neon cyan and orange inverted V light pattern
    return (
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${getScale()} ${className} transition-transform duration-500 ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}
      >
        <defs>
          <filter id="glowCyanOrange" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="bodyGrad2" x1="200" y1="80" x2="200" y2="320" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1C1D22" />
            <stop offset="60%" stopColor="#101114" />
            <stop offset="100%" stopColor="#070709" />
          </linearGradient>

          <linearGradient id="visorGlass2" x1="100" y1="140" x2="300" y2="260" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0B131D" />
            <stop offset="50%" stopColor="#05090F" />
            <stop offset="100%" stopColor="#0A1520" />
          </linearGradient>

          <linearGradient id="cyanChevron" x1="140" y1="200" x2="260" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="50%" stopColor="#7000FF" />
            <stop offset="100%" stopColor="#00F0FF" />
          </linearGradient>
        </defs>

        {/* Ambient Backlight Glow */}
        <circle cx="200" cy="210" r="110" fill="#00F0FF" opacity="0.15" filter="url(#glowCyanOrange)" />

        {/* Rear Strap Assembly */}
        <path
          d="M 70 170 C 70 110, 330 110, 330 170 L 320 220 C 320 140, 80 140, 80 220 Z"
          fill="#131418"
          stroke="#2A2C34"
          strokeWidth="3"
        />

        {/* Side Audio Mounts */}
        <rect x="50" y="175" width="35" height="70" rx="12" fill="#18191E" stroke="#383A44" strokeWidth="2" />
        <rect x="315" y="175" width="35" height="70" rx="12" fill="#18191E" stroke="#383A44" strokeWidth="2" />

        {/* Main Visor Chassis (Symmetrical Frontal View) */}
        <path
          d="M 80 160 C 80 140, 130 130, 200 130 C 270 130, 320 140, 320 160 C 330 190, 325 240, 300 265 C 270 290, 240 295, 200 295 C 160 295, 130 290, 100 265 C 75 240, 70 190, 80 160 Z"
          fill="url(#bodyGrad2)"
          stroke="#00F0FF"
          strokeWidth="1.5"
        />

        {/* Inner Visor Screen */}
        <path
          d="M 95 165 C 95 150, 140 145, 200 145 C 260 145, 305 150, 305 165 C 312 190, 308 230, 288 250 C 260 275, 230 280, 200 280 C 170 280, 140 275, 112 250 C 92 230, 88 190, 95 165 Z"
          fill="url(#visorGlass2)"
          stroke="#111"
          strokeWidth="2"
        />

        {/* Inverted Chevron / V-Light Core (Neon Cyan / Orange Accent) */}
        <g id="neon-v-pattern" filter="url(#glowCyanOrange)">
          {/* Main Inverted V Light */}
          <path
            d="M 130 240 L 200 165 L 270 240 L 255 248 L 200 185 L 145 248 Z"
            fill="url(#cyanChevron)"
          />
          <path
            d="M 140 235 L 200 172 L 260 235"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Bottom Side Orange Indicator Lights */}
          <circle cx="120" cy="255" r="7" fill="#FF5B00" />
          <circle cx="280" cy="255" r="7" fill="#FF5B00" />
          <circle cx="120" cy="255" r="3" fill="#FFF" />
          <circle cx="280" cy="255" r="3" fill="#FFF" />
        </g>

        {/* Top Center Optical Sensor */}
        <rect x="185" y="138" width="30" height="10" rx="5" fill="#111" stroke="#00F0FF" strokeWidth="1" />
        <circle cx="200" cy="143" r="3" fill="#00F0FF" />

        {/* Subtle Glass Diagonal Reflection */}
        <path
          d="M 100 165 L 220 150 L 180 270 L 105 240 Z"
          fill="#FFFFFF"
          opacity="0.06"
        />
      </svg>
    );
  }

  // Model 3: Sleek cybernetic visor with cyan / magenta glowing border rim
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${getScale()} ${className} transition-transform duration-500 ${
        isHovered ? 'scale-105' : 'scale-100'
      }`}
    >
      <defs>
        <filter id="glowPinkCyan" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="9" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="bodyGrad3" x1="100" y1="100" x2="300" y2="300" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#221C26" />
          <stop offset="50%" stopColor="#120E16" />
          <stop offset="100%" stopColor="#08060A" />
        </linearGradient>

        <linearGradient id="neonRim3" x1="80" y1="180" x2="320" y2="220" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="50%" stopColor="#FF007A" />
          <stop offset="100%" stopColor="#00F0FF" />
        </linearGradient>

        <linearGradient id="visorGlass3" x1="120" y1="160" x2="280" y2="260" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1B0518" />
          <stop offset="50%" stopColor="#0A020F" />
          <stop offset="100%" stopColor="#030D14" />
        </linearGradient>
      </defs>

      {/* Backlight Aura */}
      <ellipse cx="200" cy="200" rx="130" ry="85" fill="#FF007A" opacity="0.18" filter="url(#glowPinkCyan)" />

      {/* Headstrap Structure */}
      <path
        d="M 80 150 C 80 90, 320 90, 320 150 L 305 210 C 305 130, 95 130, 95 210 Z"
        fill="#14101A"
        stroke="#332B3C"
        strokeWidth="3"
      />

      {/* Side Audio Modules */}
      <rect x="55" y="165" width="35" height="65" rx="10" fill="#1C1622" stroke="#FF007A" strokeWidth="1.5" />
      <rect x="310" y="165" width="35" height="65" rx="10" fill="#1C1622" stroke="#00F0FF" strokeWidth="1.5" />

      {/* Main Curved Helmet Outer Shell */}
      <path
        d="M 85 160 C 85 135, 135 125, 200 125 C 265 125, 315 135, 315 160 C 325 190, 320 235, 295 260 C 265 285, 235 290, 200 290 C 165 290, 135 285, 105 260 C 80 235, 75 190, 85 160 Z"
        fill="url(#bodyGrad3)"
        stroke="url(#neonRim3)"
        strokeWidth="2"
      />

      {/* Front Continuous Curved Prism Visor */}
      <path
        d="M 98 168 C 98 152, 142 142, 200 142 C 258 142, 302 152, 302 168 C 308 192, 302 228, 282 248 C 258 270, 228 275, 200 275 C 172 275, 142 270, 118 248 C 98 228, 92 192, 98 168 Z"
        fill="url(#visorGlass3)"
        stroke="#111"
        strokeWidth="2"
      />

      {/* Signature Glowing Cyber Rim Line */}
      <g id="cyber-rim" filter="url(#glowPinkCyan)">
        <path
          d="M 102 172 C 120 156, 155 148, 200 148 C 245 148, 280 156, 298 172 C 304 195, 298 225, 278 242 C 255 262, 225 268, 200 268 C 175 268, 145 262, 122 242 C 102 225, 96 195, 102 172 Z"
          fill="none"
          stroke="url(#neonRim3)"
          strokeWidth="3.5"
        />
        <path
          d="M 120 180 C 150 162, 250 162, 280 180"
          stroke="#FFFFFF"
          strokeWidth="2"
          opacity="0.8"
        />
      </g>

      {/* Inner HUD Reticle */}
      <circle cx="200" cy="205" r="28" fill="none" stroke="#FF007A" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      <circle cx="200" cy="205" r="8" fill="none" stroke="#00F0FF" strokeWidth="1.5" />
      <circle cx="200" cy="205" r="2" fill="#FFF" />
    </svg>
  );
};
