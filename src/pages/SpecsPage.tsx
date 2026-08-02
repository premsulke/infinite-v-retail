import React, { useState } from 'react';
import { VRHeadset } from '../types';
import { VRHeadsetSVG } from '../components/VRHeadsetSVG';
import { Eye, Gauge, Cpu, Wifi, ShieldCheck, Check, Sparkles, ShoppingBag, ArrowLeft } from 'lucide-react';

interface SpecsPageProps {
  headsets: VRHeadset[];
  selectedHeadset: VRHeadset;
  onSelectHeadset: (h: VRHeadset) => void;
  onPreOrder: (h: VRHeadset) => void;
  onBackToHome: () => void;
}

export const SpecsPage: React.FC<SpecsPageProps> = ({
  headsets,
  selectedHeadset,
  onSelectHeadset,
  onPreOrder,
  onBackToHome,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'matrix'>('overview');

  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-8 space-y-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8">
        <div>
          <button
            onClick={onBackToHome}
            className="flex items-center space-x-2 text-xs font-chakra text-[#FF5B00] hover:text-white mb-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <h1 className="font-orbitron font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Hardware <span className="text-[#FF5B00]">Specifications</span>
          </h1>
          <p className="font-chakra text-gray-300 text-base mt-2">
            Engineered with military-grade optics, sub-millisecond neural tracking, and quantum micro-OLED displays.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-2 bg-white/5 p-1.5 rounded-xl border border-white/10 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg font-chakra font-semibold text-xs sm:text-sm transition-all ${
              activeTab === 'overview'
                ? 'bg-[#FF5B00] text-black shadow-[0_0_15px_#FF5B00]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Deep Dive
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-4 py-2 rounded-lg font-chakra font-semibold text-xs sm:text-sm transition-all ${
              activeTab === 'matrix'
                ? 'bg-[#FF5B00] text-black shadow-[0_0_15px_#FF5B00]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Comparison Matrix
          </button>
        </div>
      </div>

      {activeTab === 'overview' ? (
        <>
          {/* Headset Selector Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {headsets.map((headset) => {
              const isSelected = selectedHeadset.id === headset.id;
              return (
                <button
                  key={headset.id}
                  onClick={() => onSelectHeadset(headset)}
                  className={`clip-chamfer-cta px-6 py-3 border font-chakra font-bold text-sm sm:text-base transition-all cursor-pointer flex items-center space-x-3 ${
                    isSelected
                      ? 'bg-[#FF5B00] text-black border-[#FF5B00] shadow-[0_0_20px_#FF5B00]'
                      : 'bg-black/60 text-gray-300 border-white/10 hover:border-[#FF5B00]/50'
                  }`}
                >
                  <span>{headset.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${isSelected ? 'bg-black text-[#FF5B00]' : 'bg-white/10 text-gray-400'}`}>
                    ${headset.price}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detailed Specs Showcase Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#090a0d]/90 backdrop-blur-xl border border-[#FF5B00]/40 rounded-2xl p-6 sm:p-10 shadow-[0_0_50px_rgba(255,91,0,0.15)]">
            
            {/* Left 3D View */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-radial from-[#FF5B00]/20 via-black/50 to-transparent rounded-2xl border border-white/5 relative">
              <VRHeadsetSVG modelId={selectedHeadset.id} size="hero" />
              <div className="mt-4 text-center">
                <span className="font-orbitron font-extrabold text-3xl text-white block">
                  ${selectedHeadset.price}
                </span>
                <span className="text-xs font-chakra text-[#FF5B00] block mt-1 uppercase tracking-wider">
                  {selectedHeadset.code}
                </span>
              </div>
            </div>

            {/* Right Specifications Details */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="font-orbitron font-bold text-2xl text-white">
                  {selectedHeadset.name}
                </h3>
                <p className="font-chakra text-gray-300 text-sm mt-1">
                  {selectedHeadset.subtitle}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed">
                  {selectedHeadset.description}
                </p>
              </div>

              {/* Hardware Spec Badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center space-x-3">
                  <div className="p-2.5 rounded-lg bg-[#FF5B00]/20 border border-[#FF5B00]/40">
                    <Eye className="w-5 h-5 text-[#FF5B00]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-chakra text-gray-400 uppercase block">Display Tech</span>
                    <span className="font-orbitron font-semibold text-sm text-white">{selectedHeadset.display}</span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center space-x-3">
                  <div className="p-2.5 rounded-lg bg-[#FF5B00]/20 border border-[#FF5B00]/40">
                    <Gauge className="w-5 h-5 text-[#FF5B00]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-chakra text-gray-400 uppercase block">Field of View</span>
                    <span className="font-orbitron font-semibold text-sm text-white">{selectedHeadset.fov}</span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center space-x-3">
                  <div className="p-2.5 rounded-lg bg-[#FF5B00]/20 border border-[#FF5B00]/40">
                    <Cpu className="w-5 h-5 text-[#FF5B00]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-chakra text-gray-400 uppercase block">Refresh Rate</span>
                    <span className="font-orbitron font-semibold text-sm text-white">{selectedHeadset.refreshRate}</span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center space-x-3">
                  <div className="p-2.5 rounded-lg bg-[#FF5B00]/20 border border-[#FF5B00]/40">
                    <Wifi className="w-5 h-5 text-[#FF5B00]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-chakra text-gray-400 uppercase block">Weight & Ergonomics</span>
                    <span className="font-orbitron font-semibold text-sm text-white">{selectedHeadset.weight}</span>
                  </div>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="pt-2">
                <h4 className="font-chakra font-bold text-sm text-white uppercase tracking-wider mb-3">
                  Engineered Capabilities:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                  {selectedHeadset.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-gray-300">
                      <Check className="w-4 h-4 text-[#FF5B00] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 flex items-center space-x-4">
                <button
                  onClick={() => onPreOrder(selectedHeadset)}
                  className="clip-chamfer-cta bg-[#FF5B00] hover:bg-[#FF6E00] text-black font-chakra font-bold text-base px-8 py-3.5 flex items-center space-x-2 transition-all cursor-pointer shadow-[0_0_25px_#FF5B00]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Pre-order {selectedHeadset.code}</span>
                </button>
              </div>
            </div>

          </div>
        </>
      ) : (
        /* Comparison Matrix Table */
        <div className="bg-[#090a0d]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-x-auto p-6">
          <table className="w-full text-left text-sm font-chakra">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 px-4 font-orbitron font-bold text-white text-base">Specifications</th>
                {headsets.map((h) => (
                  <th key={h.id} className="py-4 px-4 font-orbitron font-bold text-[#FF5B00] text-base min-w-[200px]">
                    {h.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              <tr>
                <td className="py-4 px-4 font-bold text-white">Retail Price</td>
                {headsets.map((h) => (
                  <td key={h.id} className="py-4 px-4 font-bold text-lg text-white">${h.price}</td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-white">Display Resolution</td>
                {headsets.map((h) => (
                  <td key={h.id} className="py-4 px-4">{h.display}</td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-white">Field of View (FOV)</td>
                {headsets.map((h) => (
                  <td key={h.id} className="py-4 px-4">{h.fov}</td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-white">Refresh Rate</td>
                {headsets.map((h) => (
                  <td key={h.id} className="py-4 px-4">{h.refreshRate}</td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-white">Weight</td>
                {headsets.map((h) => (
                  <td key={h.id} className="py-4 px-4">{h.weight}</td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-white">Key Innovation</td>
                {headsets.map((h) => (
                  <td key={h.id} className="py-4 px-4 text-xs leading-relaxed">{h.subtitle}</td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-white">Action</td>
                {headsets.map((h) => (
                  <td key={h.id} className="py-4 px-4">
                    <button
                      onClick={() => onPreOrder(h)}
                      className="clip-chamfer-cta bg-[#FF5B00] hover:bg-[#FF6E00] text-black font-bold text-xs px-4 py-2 transition-all cursor-pointer shadow-[0_0_10px_#FF5B00]"
                    >
                      Pre-order ${h.price}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
