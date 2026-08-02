import React from 'react';
import { VRHeadset } from '../types';
import { VRHeadsetSVG } from '../components/VRHeadsetSVG';
import { ShoppingBag, ArrowLeft, CheckCircle2, Star, Sparkles } from 'lucide-react';

interface ModelsPageProps {
  headsets: VRHeadset[];
  onSelectHeadset: (h: VRHeadset) => void;
  onPreOrder: (h: VRHeadset) => void;
  onBackToHome: () => void;
}

export const ModelsPage: React.FC<ModelsPageProps> = ({
  headsets,
  onSelectHeadset,
  onPreOrder,
  onBackToHome,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-8 space-y-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="border-b border-white/10 pb-8">
        <button
          onClick={onBackToHome}
          className="flex items-center space-x-2 text-xs font-chakra text-[#FF5B00] hover:text-white mb-3 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <h1 className="font-orbitron font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
          VR Headset <span className="text-[#FF5B00]">Catalog</span>
        </h1>
        <p className="font-chakra text-gray-300 text-base mt-2 max-w-2xl">
          Explore our complete lineup of state-of-the-art virtual reality hardware. Built for limitless immersion and zero latency.
        </p>
      </div>

      {/* Grid of 3 Models */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {headsets.map((headset) => (
          <div
            key={headset.id}
            className="group relative clip-chamfer-card bg-gradient-to-b from-[#14151a] via-[#0b0c0f] to-[#050608] border border-white/10 hover:border-[#FF5B00]/80 p-6 flex flex-col justify-between space-y-6 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_40px_rgba(255,91,0,0.3)]"
          >
            {/* Top Badge & Rating */}
            <div className="flex items-center justify-between">
              <span className="font-chakra font-bold text-xs text-[#FF5B00] uppercase tracking-widest px-2.5 py-1 bg-[#FF5B00]/10 border border-[#FF5B00]/30 rounded">
                {headset.code}
              </span>

              <div className="flex items-center space-x-1 text-amber-400 text-xs font-bold font-chakra">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{headset.rating} / 5.0</span>
              </div>
            </div>

            {/* Headset 3D Graphic */}
            <div className="flex items-center justify-center py-6 bg-radial from-[#FF5B00]/15 to-transparent rounded-xl">
              <VRHeadsetSVG modelId={headset.id} size="lg" isHovered />
            </div>

            {/* Details */}
            <div className="space-y-3">
              <h3 className="font-orbitron font-extrabold text-xl text-white group-hover:text-[#FF5B00] transition-colors">
                {headset.name}
              </h3>

              <p className="text-xs font-chakra text-gray-300 font-medium">
                {headset.subtitle}
              </p>

              <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                {headset.description}
              </p>
            </div>

            {/* Spec Highlights Pill */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-chakra py-2 border-y border-white/10">
              <div className="bg-white/5 p-2 rounded text-gray-300">
                <span className="text-gray-500 block">Display</span>
                <span className="font-semibold text-white">{headset.display}</span>
              </div>

              <div className="bg-white/5 p-2 rounded text-gray-300">
                <span className="text-gray-500 block">FOV</span>
                <span className="font-semibold text-white">{headset.fov}</span>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-1.5 text-xs text-gray-300">
              {headset.features.slice(0, 3).map((feat, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5B00] shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>

            {/* Price & Action */}
            <div className="pt-2 flex items-center justify-between border-t border-white/10">
              <div>
                <span className="text-[10px] text-gray-400 block uppercase">Retail MSRP</span>
                <span className="font-orbitron font-extrabold text-2xl text-white">
                  ${headset.price}
                </span>
              </div>

              <button
                onClick={() => {
                  onSelectHeadset(headset);
                  onPreOrder(headset);
                }}
                className="clip-chamfer-cta bg-[#FF5B00] hover:bg-[#FF6E00] text-black font-chakra font-bold text-sm px-5 py-2.5 flex items-center space-x-2 transition-all cursor-pointer shadow-[0_0_15px_#FF5B00]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Pre-order</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
