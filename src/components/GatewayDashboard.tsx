import React, { useState } from 'react';
import { FiberArcLinesSVG } from './FiberArcLinesSVG';
import { 
  Bell, 
  Settings, 
  User, 
  Plus, 
  Sparkles, 
  Sliders, 
  Wifi, 
  BatteryCharging, 
  Eye, 
  ShieldCheck, 
  ArrowRight,
  Headphones,
  Globe,
  Radio
} from 'lucide-react';
import { VRHeadset } from '../types';

interface GatewayDashboardProps {
  onPreOrder: (headset: VRHeadset) => void;
  selectedHeadset: VRHeadset;
}

export const GatewayDashboard: React.FC<GatewayDashboardProps> = ({
  onPreOrder,
  selectedHeadset,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'store' | 'telemetry' | 'matrix' | 'help'>('dashboard');
  const [balance, setBalance] = useState<number>(2450);
  const [selectedPreset, setSelectedPreset] = useState<string>('cyberpunk');
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const presets = [
    { id: 'cyberpunk', name: 'Cyber City 2099', fov: '140°', latency: '1.8ms', haptics: 'Ultra' },
    { id: 'space', name: 'Orbital Retail Station', fov: '150°', latency: '2.0ms', haptics: 'Extreme' },
    { id: 'martian', name: 'Martian Bio-Dome', fov: '160°', latency: '1.5ms', haptics: 'Neural' },
  ];

  const handleAddBalance = () => {
    setBalance((prev) => prev + 500);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <section id="gateway-section" className="relative w-full py-16 lg:py-24 flex flex-col items-center justify-center z-10 text-center">
      {/* 1. Header Typography */}
      <div className="max-w-4xl px-6 space-y-4 z-20">
        <h2 className="font-orbitron font-extrabold text-3xl sm:text-5xl lg:text-[56px] tracking-tight leading-[1.15] text-white">
          <span>Your Gateway to the </span>
          <span className="text-[#FF5B00] drop-shadow-[0_0_25px_rgba(255,91,0,0.5)] block sm:inline">
            Future of Commerce
          </span>
        </h2>

        <p className="font-chakra text-gray-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
          Join the Leading VR Platform for Secure, Seamless and Rewarding Virtual Retail Experiences
        </p>

        {/* Centered "Get Started" CTA Button */}
        <div className="pt-4 flex items-center justify-center">
          <button
            onClick={() => onPreOrder(selectedHeadset)}
            className="group clip-chamfer-cta bg-[#FF5B00] hover:bg-[#FF6E00] text-black font-chakra font-bold text-lg px-9 py-3.5 flex items-center space-x-2.5 transition-all duration-300 shadow-[0_0_30px_rgba(255,91,0,0.6)] hover:shadow-[0_0_50px_rgba(255,91,0,0.9)] cursor-pointer active:scale-95"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* 2. Background Glowing Fiber Optic Arc Lines */}
      <div className="relative w-full max-w-6xl mt-12 px-4 sm:px-6">
        <FiberArcLinesSVG />

        {/* 3. Interactive VR Retail Command Center Dashboard */}
        <div className="relative z-10 w-full bg-[#0a0b0e]/90 backdrop-blur-xl border border-[#FF5B00]/40 rounded-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.95),0_0_40px_rgba(255,91,0,0.15)] text-left">
          
          {/* Top Dashboard Header */}
          <div className="px-6 py-4 bg-[#111217]/90 border-b border-white/10 flex items-center justify-between flex-wrap gap-4">
            {/* Brand/Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-[#FF5B00] rounded-md flex items-center justify-center font-orbitron font-black text-black text-xs shadow-[0_0_12px_#FF5B00]">
                V
              </div>
              <span className="font-orbitron font-bold text-base text-white tracking-wider">
                INFINITE<span className="text-[#FF5B00]">.</span>RETAIL
              </span>
            </div>

            {/* Nav Tabs */}
            <div className="flex items-center space-x-1 sm:space-x-4 text-xs sm:text-sm font-chakra font-semibold text-gray-400">
              {(['dashboard', 'store', 'telemetry', 'matrix', 'help'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg transition-all capitalize ${
                    activeTab === tab
                      ? 'text-white bg-white/10 border-b-2 border-[#FF5B00]'
                      : 'hover:text-gray-200'
                  }`}
                >
                  {tab === 'store' ? 'Virtual Store' : tab}
                </button>
              ))}
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowNotification(!showNotification)}
                className="relative p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg transition-colors cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF5B00] rounded-full animate-ping" />
              </button>
              
              <button className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg transition-colors">
                <Settings className="w-4 h-4" />
              </button>

              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF5B00] to-amber-500 p-0.5 cursor-pointer">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Sub-Header Bar */}
          <div className="px-6 py-3 bg-black/40 border-b border-white/5 flex items-center justify-between flex-wrap gap-4 text-xs font-chakra">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleAddBalance}
                className="clip-chamfer-cart bg-[#FF5B00] hover:bg-[#FF6E00] text-black font-bold px-4 py-1.5 flex items-center space-x-1.5 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Credits (${balance})</span>
              </button>

              <span className="text-gray-400 hidden sm:inline">Favorites: <strong className="text-white">8 Virtual Hubs</strong></span>
            </div>

            {/* Notification Toast inside dashboard */}
            {showNotification && (
              <span className="text-emerald-400 font-semibold animate-fade-in">
                + $500 VR Credits Added Successfully!
              </span>
            )}

            <div className="flex items-center space-x-2 text-gray-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Neural Channels Online</span>
            </div>
          </div>

          {/* Main Dashboard Content Area */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Column 1: Live Hardware Telemetry */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-orbitron font-bold text-xs uppercase tracking-wider text-[#FF5B00]">
                  Headset Telemetry
                </span>
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              </div>

              <div className="space-y-3 text-xs font-chakra">
                <div className="flex justify-between items-center text-gray-300">
                  <span className="flex items-center space-x-1.5">
                    <BatteryCharging className="w-4 h-4 text-emerald-400" />
                    <span>Battery Status</span>
                  </span>
                  <span className="font-bold text-white">98% (Ultra Fast Charge)</span>
                </div>

                <div className="flex justify-between items-center text-gray-300">
                  <span className="flex items-center space-x-1.5">
                    <Wifi className="w-4 h-4 text-[#FF5B00]" />
                    <span>Wireless Bandwidth</span>
                  </span>
                  <span className="font-bold text-white">2.4 Gbps Zero-Lag</span>
                </div>

                <div className="flex justify-between items-center text-gray-300">
                  <span className="flex items-center space-x-1.5">
                    <Eye className="w-4 h-4 text-[#FF5B00]" />
                    <span>Optic Resolution</span>
                  </span>
                  <span className="font-bold text-white">{selectedHeadset.display}</span>
                </div>

                <div className="flex justify-between items-center text-gray-300">
                  <span className="flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Security Protocol</span>
                  </span>
                  <span className="font-bold text-emerald-400">Quantum Encrypted</span>
                </div>
              </div>
            </div>

            {/* Column 2: Metaverse Environment Selector */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-orbitron font-bold text-xs uppercase tracking-wider text-[#FF5B00]">
                  Active Dimension
                </span>
                <Globe className="w-4 h-4 text-[#FF5B00]" />
              </div>

              <div className="space-y-2">
                {presets.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPreset(p.id)}
                    className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between text-xs font-chakra transition-all ${
                      selectedPreset === p.id
                        ? 'bg-[#FF5B00]/20 border-[#FF5B00] text-white shadow-[0_0_12px_rgba(255,91,0,0.3)]'
                        : 'bg-black/30 border-white/5 text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-white">{p.name}</div>
                      <span className="text-[10px] text-gray-400">
                        FOV {p.fov} • {p.latency} Latency
                      </span>
                    </div>

                    {selectedPreset === p.id && (
                      <Sparkles className="w-4 h-4 text-[#FF5B00]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Column 3: Active Unit & Quick Pre-Order */}
            <div className="bg-gradient-to-b from-[#1c120c] to-[#0a0806] border border-[#FF5B00]/30 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-chakra text-gray-400 mb-1">
                  <span>Selected Model</span>
                  <span className="text-[#FF5B00] font-bold">{selectedHeadset.code}</span>
                </div>

                <h4 className="font-orbitron font-bold text-base text-white">
                  {selectedHeadset.name}
                </h4>

                <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                  {selectedHeadset.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase block">Retail MSRP</span>
                  <span className="font-orbitron font-bold text-lg text-white">
                    ${selectedHeadset.price}
                  </span>
                </div>

                <button
                  onClick={() => onPreOrder(selectedHeadset)}
                  className="clip-chamfer-cta bg-[#FF5B00] hover:bg-[#FF6E00] text-black font-chakra font-bold text-xs px-4 py-2 transition-all cursor-pointer shadow-[0_0_15px_#FF5B00]"
                >
                  Pre-order
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
