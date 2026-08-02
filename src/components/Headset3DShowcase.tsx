import React, { useState, useRef } from 'react';
import { VRHeadset } from '../types';
import { VRHeadsetSVG } from './VRHeadsetSVG';
import { Sparkles, Eye, Zap, ShieldCheck } from 'lucide-react';

interface Headset3DShowcaseProps {
  selectedHeadset: VRHeadset;
}

export const Headset3DShowcase: React.FC<Headset3DShowcaseProps> = ({
  selectedHeadset,
}) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Subtle 3D rotation calculation
    setRotate({
      x: -(y / rect.height) * 16,
      y: (x / rect.width) * 16,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[380px] sm:h-[480px] lg:h-[560px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
    >
      {/* Ambient Lighting & Particles Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Soft Radial Core Glow */}
        <div
          className="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[480px] lg:h-[480px] rounded-full blur-[80px] opacity-40 transition-colors duration-700"
          style={{
            backgroundColor: selectedHeadset.accentColor,
          }}
        />
        
        {/* Grid Ring circles */}
        <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full border border-white/5 animate-[spin_40s_linear_infinite]" />
        <div className="absolute w-[240px] h-[240px] sm:w-[340px] sm:h-[340px] rounded-full border border-[#FF5B00]/10 border-dashed animate-[spin_25s_linear_infinite_reverse]" />
      </div>

      {/* Interactive 3D Card Container */}
      <div
        className="relative z-20 w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        {/* Main Headset SVG */}
        <VRHeadsetSVG
          modelId={selectedHeadset.id}
          size="hero"
          className="drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
        />

        {/* Floating HUD Specs Tags */}
        {/* Tag 1: Top Right - Display */}
        <div className="absolute top-6 sm:top-12 right-2 sm:right-6 bg-black/70 backdrop-blur-md border border-[#FF5B00]/40 rounded-lg px-3 py-1.5 flex items-center space-x-2 text-xs sm:text-sm shadow-lg transform translate-z-10 animate-pulse">
          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF5B00]" />
          <span className="font-chakra font-medium text-gray-200">
            {selectedHeadset.display}
          </span>
        </div>

        {/* Tag 2: Bottom Left - FOV */}
        <div className="absolute bottom-12 sm:bottom-16 left-2 sm:left-6 bg-black/70 backdrop-blur-md border border-[#FF5B00]/40 rounded-lg px-3 py-1.5 flex items-center space-x-2 text-xs sm:text-sm shadow-lg transform translate-z-10">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF5B00]" />
          <span className="font-chakra font-medium text-gray-200">
            {selectedHeadset.fov}
          </span>
        </div>

        {/* Tag 3: Top Left - Price Tag Badge */}
        <div className="absolute top-6 sm:top-12 left-2 sm:left-6 bg-[#120e0a]/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 flex items-center space-x-2 text-xs sm:text-sm shadow-xl">
          <Zap className="w-3.5 h-3.5 text-[#FF5B00]" />
          <span className="font-orbitron font-bold text-white">
            ${selectedHeadset.price}
          </span>
        </div>

        {/* Tag 4: Bottom Right - Latency / Refresh */}
        <div className="absolute bottom-12 sm:bottom-16 right-2 sm:right-6 bg-black/70 backdrop-blur-md border border-white/10 rounded-lg px-3 py-1.5 flex items-center space-x-2 text-xs sm:text-sm shadow-lg">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-chakra font-medium text-gray-300">
            {selectedHeadset.refreshRate}
          </span>
        </div>
      </div>
    </div>
  );
};
