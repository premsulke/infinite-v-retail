import React from 'react';
import { VRHeadset } from '../types';
import { VRHeadsetSVG } from './VRHeadsetSVG';

interface ProductSelectorProps {
  headsets: VRHeadset[];
  selectedHeadset: VRHeadset;
  onSelectHeadset: (headset: VRHeadset) => void;
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({
  headsets,
  selectedHeadset,
  onSelectHeadset,
}) => {
  return (
    <div className="relative z-30 pt-8 lg:pt-12">
      {/* Connecting horizontal line */}
      <div className="absolute top-[50%] left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#FF5B00]/60 via-[#FF5B00]/30 to-transparent -z-10 pointer-events-none" />

      <div className="flex items-center space-x-4 sm:space-x-6">
        {headsets.map((headset) => {
          const isSelected = selectedHeadset.id === headset.id;

          return (
            <div
              key={headset.id}
              onClick={() => onSelectHeadset(headset)}
              className={`relative group cursor-pointer clip-chamfer-card p-1 transition-all duration-300 ${
                isSelected
                  ? 'bg-[#FF5B00]'
                  : 'bg-[#402e20] hover:bg-[#FF5B00]/60'
              }`}
            >
              {/* Inner Card Content */}
              <div
                className={`clip-chamfer-card w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 bg-gradient-to-b from-[#241911] via-[#120d09] to-[#070605] flex flex-col items-center justify-between p-2 sm:p-3 relative overflow-hidden transition-all duration-300 ${
                  isSelected ? 'shadow-[0_0_25px_rgba(255,91,0,0.3)]' : ''
                }`}
              >
                {/* Background Ambient Glow */}
                <div
                  className={`absolute inset-0 bg-radial from-[#FF5B00]/20 to-transparent transition-opacity duration-300 ${
                    isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
                  }`}
                />

                {/* Headset Graphic */}
                <div className="flex-1 flex items-center justify-center w-full z-10">
                  <VRHeadsetSVG
                    modelId={headset.id}
                    size="sm"
                    isHovered={isSelected}
                  />
                </div>

                {/* Selected Tag or Model Name */}
                {isSelected ? (
                  <div className="z-10 w-full text-center py-1">
                    <span className="font-orbitron font-bold text-xs sm:text-sm text-white tracking-wider block drop-shadow-[0_0_8px_#FF5B00]">
                      Selected
                    </span>
                  </div>
                ) : (
                  <div className="z-10 w-full text-center py-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className="font-chakra font-medium text-[11px] text-gray-400 block tracking-wider">
                      {headset.code}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
