import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { VRHeadset } from '../types';

interface HeroContentProps {
  selectedHeadset: VRHeadset;
  onPreOrder: (headset: VRHeadset) => void;
  onGetStarted: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  selectedHeadset,
  onPreOrder,
  onGetStarted,
}) => {
  return (
    <div className="flex flex-col items-start justify-center text-left space-y-6 lg:space-y-8 z-20 max-w-2xl">
      {/* Main Headline */}
      <h1 className="font-orbitron font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[72px] tracking-tight leading-[1.08] select-none">
        {/* Line 1 */}
        <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4">
          <span className="text-white">Your</span>
          <span className="text-stroke-white tracking-wider">portal</span>
          <span className="text-white">to</span>
        </div>
        {/* Line 2 */}
        <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 mt-1 sm:mt-2">
          <span className="text-white">virtual</span>
          <span className="text-[#FF5B00] drop-shadow-[0_0_25px_rgba(255,91,0,0.4)]">
            adventures
          </span>
        </div>
      </h1>

      {/* Subtitle / Paragraph */}
      <p className="text-gray-300/90 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-xl">
        Dive headfirst into a universe of potential. State-of-the-art VR, made for limitless immersion.
      </p>

      {/* CTA Buttons */}
      <div className="pt-2 flex flex-wrap items-center gap-4">
        <button
          onClick={() => onPreOrder(selectedHeadset)}
          className="relative group clip-chamfer-cta bg-[#FF5B00] hover:bg-[#FF6E00] text-black font-chakra font-bold text-lg sm:text-xl px-8 py-4 flex items-center space-x-3 transition-all duration-300 shadow-[0_0_30px_rgba(255,91,0,0.5)] hover:shadow-[0_0_45px_rgba(255,91,0,0.8)] cursor-pointer active:scale-98"
        >
          <span className="tracking-wide">Pre-order now</span>
          <div className="border border-black/80 rounded p-1 group-hover:scale-110 transition-transform">
            <ShoppingBag className="w-5 h-5 text-black stroke-[2.2]" />
          </div>
        </button>

        <button
          onClick={onGetStarted}
          className="relative group clip-chamfer-cta bg-black/60 hover:bg-white/10 text-white border border-[#FF5B00]/60 hover:border-[#FF5B00] font-chakra font-bold text-lg sm:text-xl px-8 py-4 flex items-center space-x-3 transition-all duration-300 shadow-[0_0_20px_rgba(255,91,0,0.2)] cursor-pointer active:scale-98"
        >
          <span className="tracking-wide">Get Started</span>
          <ArrowRight className="w-5 h-5 text-[#FF5B00] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
