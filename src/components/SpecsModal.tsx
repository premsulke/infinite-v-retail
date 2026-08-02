import React from 'react';
import { X, CheckCircle2, ShieldAlert, Cpu, Eye, Wifi, Gauge } from 'lucide-react';
import { VRHeadset } from '../types';
import { VRHeadsetSVG } from './VRHeadsetSVG';

interface SpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
  headsets: VRHeadset[];
  selectedHeadset: VRHeadset;
  onSelectHeadset: (h: VRHeadset) => void;
  onAddToCart: (h: VRHeadset) => void;
}

export const SpecsModal: React.FC<SpecsModalProps> = ({
  isOpen,
  onClose,
  headsets,
  selectedHeadset,
  onSelectHeadset,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0d10] border border-[#FF5B00]/40 rounded-2xl overflow-y-auto p-6 md:p-8 shadow-[0_0_50px_rgba(255,91,0,0.2)] text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
          <div>
            <div className="text-xs font-chakra font-bold text-[#FF5B00] tracking-widest uppercase mb-1">
              {selectedHeadset.code}
            </div>
            <h2 className="font-orbitron font-extrabold text-2xl md:text-3xl text-white">
              {selectedHeadset.name}
            </h2>
            <p className="text-gray-400 text-sm mt-1">{selectedHeadset.subtitle}</p>
          </div>

          {/* Model Switcher Tabs */}
          <div className="flex items-center space-x-2 bg-black/50 p-1.5 rounded-xl border border-white/10">
            {headsets.map((h) => (
              <button
                key={h.id}
                onClick={() => onSelectHeadset(h)}
                className={`px-3 py-1.5 rounded-lg text-xs font-chakra font-semibold transition-all ${
                  selectedHeadset.id === h.id
                    ? 'bg-[#FF5B00] text-black shadow-[0_0_15px_#FF5B00]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {h.code.replace('V.RETAIL-', 'X')}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column: Headset Graphic & Highlights */}
          <div className="flex flex-col items-center justify-center bg-radial from-[#FF5B00]/15 via-black/40 to-transparent p-6 rounded-2xl border border-white/5">
            <VRHeadsetSVG modelId={selectedHeadset.id} size="lg" />
            <div className="mt-4 text-center">
              <span className="font-orbitron text-2xl font-bold text-white">
                ${selectedHeadset.price}
              </span>
              <span className="text-xs text-gray-400 block mt-0.5">
                Includes 2x Controllers & Quantum Station
              </span>
            </div>
          </div>

          {/* Right Column: Specs Table */}
          <div className="space-y-4">
            <h3 className="font-orbitron font-bold text-lg text-white border-b border-white/10 pb-2">
              Hardware Specifications
            </h3>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex items-center space-x-3">
                <Eye className="w-5 h-5 text-[#FF5B00]" />
                <div>
                  <span className="text-xs text-gray-400 block">Optics</span>
                  <span className="font-semibold">{selectedHeadset.display}</span>
                </div>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex items-center space-x-3">
                <Gauge className="w-5 h-5 text-[#FF5B00]" />
                <div>
                  <span className="text-xs text-gray-400 block">Field of View</span>
                  <span className="font-semibold">{selectedHeadset.fov}</span>
                </div>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex items-center space-x-3">
                <Cpu className="w-5 h-5 text-[#FF5B00]" />
                <div>
                  <span className="text-xs text-gray-400 block">Refresh Rate</span>
                  <span className="font-semibold">{selectedHeadset.refreshRate}</span>
                </div>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex items-center space-x-3">
                <Wifi className="w-5 h-5 text-[#FF5B00]" />
                <div>
                  <span className="text-xs text-gray-400 block">Chassis Weight</span>
                  <span className="font-semibold">{selectedHeadset.weight}</span>
                </div>
              </div>
            </div>

            {/* Key Features List */}
            <div className="pt-2">
              <h4 className="font-chakra font-semibold text-sm text-gray-300 mb-2">
                Included Features:
              </h4>
              <ul className="space-y-2 text-xs md:text-sm">
                {selectedHeadset.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-[#FF5B00] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <ShieldAlert className="w-4 h-4 text-[#FF5B00]" />
            <span>2-Year Full International Manufacturer Warranty included.</span>
          </div>

          <button
            onClick={() => {
              onAddToCart(selectedHeadset);
              onClose();
            }}
            className="w-full sm:w-auto clip-chamfer-cta bg-[#FF5B00] hover:bg-[#FF6E00] text-black font-chakra font-bold text-base px-8 py-3 transition-all cursor-pointer shadow-[0_0_20px_#FF5B00]"
          >
            Add {selectedHeadset.code} to Cart - ${selectedHeadset.price}
          </button>
        </div>
      </div>
    </div>
  );
};
