import React from 'react';
import { ShoppingCart, Radio, User as UserIcon, Download } from 'lucide-react';
import { User } from '../utils/authApi';

interface NavbarProps {
  activeTab: 'home' | 'specs' | 'models' | 'gateway' | 'auth';
  setActiveTab: (tab: 'home' | 'specs' | 'models' | 'gateway' | 'auth') => void;
  cartCount: number;
  onOpenCart: () => void;
  currentUser: User | null;
  onOpenExporter: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  currentUser,
  onOpenExporter,
}) => {
  return (
    <header className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between z-50 relative">
      {/* Brand Logo */}
      <div 
        onClick={() => setActiveTab('home')}
        className="flex items-center space-x-1 cursor-pointer select-none group"
      >
        <span className="font-orbitron font-extrabold text-xl lg:text-2xl tracking-tight text-white group-hover:text-gray-200 transition-colors">
          INFINITE
        </span>
        <span className="font-orbitron font-black text-xl lg:text-2xl text-[#FF5B00] px-0.5">
          V.
        </span>
        <span className="font-chakra font-bold text-lg lg:text-xl tracking-[0.2em] text-white/90">
          RETAIL
        </span>
      </div>

      {/* Navigation Links & Actions */}
      <div className="flex items-center space-x-4 lg:space-x-8">
        <nav className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6 text-sm lg:text-base font-medium">
          {/* Home Link */}
          <button
            onClick={() => setActiveTab('home')}
            className={`relative px-3 py-1.5 transition-all duration-300 cursor-pointer ${
              activeTab === 'home'
                ? 'text-[#FF7700] font-semibold'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {activeTab === 'home' && (
              <span className="absolute inset-0 bg-[#FF5B00]/10 border border-[#FF5B00]/30 rounded-full blur-[2px] shadow-[0_0_20px_rgba(255,91,0,0.4)]" />
            )}
            <span className="relative z-10">Home</span>
          </button>

          {/* Specs Link */}
          <button
            onClick={() => setActiveTab('specs')}
            className={`relative px-3 py-1.5 transition-all duration-300 cursor-pointer ${
              activeTab === 'specs'
                ? 'text-[#FF7700] font-semibold'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {activeTab === 'specs' && (
              <span className="absolute inset-0 bg-[#FF5B00]/10 border border-[#FF5B00]/30 rounded-full blur-[2px] shadow-[0_0_20px_rgba(255,91,0,0.4)]" />
            )}
            <span className="relative z-10">Specs</span>
          </button>

          {/* Models Link */}
          <button
            onClick={() => setActiveTab('models')}
            className={`relative px-3 py-1.5 transition-all duration-300 cursor-pointer ${
              activeTab === 'models'
                ? 'text-[#FF7700] font-semibold'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {activeTab === 'models' && (
              <span className="absolute inset-0 bg-[#FF5B00]/10 border border-[#FF5B00]/30 rounded-full blur-[2px] shadow-[0_0_20px_rgba(255,91,0,0.4)]" />
            )}
            <span className="relative z-10">Models</span>
          </button>

          {/* Gateway Link */}
          <button
            onClick={() => setActiveTab('gateway')}
            className={`relative px-3 py-1.5 transition-all duration-300 cursor-pointer flex items-center space-x-1 ${
              activeTab === 'gateway'
                ? 'text-[#FF7700] font-semibold'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {activeTab === 'gateway' && (
              <span className="absolute inset-0 bg-[#FF5B00]/10 border border-[#FF5B00]/30 rounded-full blur-[2px] shadow-[0_0_20px_rgba(255,91,0,0.4)]" />
            )}
            <span className="relative z-10">Gateway</span>
            <Radio className="w-3.5 h-3.5 text-[#FF5B00] animate-pulse relative z-10" />
          </button>

          {/* Login / Auth Portal Link */}
          <button
            onClick={() => setActiveTab('auth')}
            className={`relative px-3 py-1.5 transition-all duration-300 cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'auth'
                ? 'text-[#FF7700] font-semibold'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {activeTab === 'auth' && (
              <span className="absolute inset-0 bg-[#FF5B00]/10 border border-[#FF5B00]/30 rounded-full blur-[2px] shadow-[0_0_20px_rgba(255,91,0,0.4)]" />
            )}
            <UserIcon className="w-3.5 h-3.5 text-[#FF5B00] relative z-10" />
            <span className="relative z-10">
              {currentUser ? currentUser.fullName.split(' ')[0] : 'Sign In'}
            </span>
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2.5">
          {/* Source Code & Deploy Button */}
          <button
            onClick={onOpenExporter}
            title="View & Download Source Code for GitHub & Vercel"
            className="clip-chamfer-cart border border-[#FF5B00]/60 hover:border-[#FF5B00] bg-[#FF5B00]/10 hover:bg-[#FF5B00] text-white hover:text-black font-chakra font-bold text-xs px-3.5 py-2.5 flex items-center space-x-1.5 transition-all cursor-pointer shadow-[0_0_12px_rgba(255,91,0,0.2)]"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Source & Deploy</span>
          </button>

          {/* Add to Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative clip-chamfer-cart border border-white/90 hover:border-[#FF5B00] bg-transparent hover:bg-white/10 text-white font-chakra font-semibold text-xs lg:text-sm px-4 py-2.5 flex items-center space-x-2 transition-all duration-300 group cursor-pointer active:scale-95"
          >
            <span>Cart</span>
            <ShoppingCart className="w-4 h-4 text-white group-hover:text-[#FF5B00] transition-colors" />
            
            {/* Cart Badge */}
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF5B00] text-black font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-[0_0_10px_#FF5B00]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
