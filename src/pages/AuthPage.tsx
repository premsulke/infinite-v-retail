import React, { useState, useEffect } from 'react';
import { User, apiLogin, apiSignUp, apiLogout } from '../utils/authApi';
import { 
  User as UserIcon, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  ArrowLeft,
  KeyRound,
  CreditCard,
  Zap,
  ShoppingBag,
  Download
} from 'lucide-react';

interface AuthPageProps {
  currentUser: User | null;
  onUserChange: (user: User | null) => void;
  onBackToHome: () => void;
  onOpenExporter?: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  currentUser,
  onUserChange,
  onBackToHome,
  onOpenExporter,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(true);

  // Status State
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Password strength logic
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: 'bg-gray-700' };
    if (pass.length < 6) return { score: 1, label: 'Weak (Min 6 chars)', color: 'bg-red-500' };
    if (pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass)) {
      return { score: 3, label: 'Strong & Quantum Encrypted', color: 'bg-emerald-400' };
    }
    return { score: 2, label: 'Medium Strength', color: 'bg-amber-400' };
  };

  const passStrength = getPasswordStrength(password);

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    const res = await apiLogin('alex@infinite.vr', 'cyberpunk2099');
    setIsLoading(false);
    if (res.user) {
      onUserChange(res.user);
      setSuccessMsg('Logged in as Demo User Alex Mercer!');
    } else {
      setErrorMsg(res.error || 'Failed to connect');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (mode === 'signup') {
      if (!fullName.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }
      if (!acceptTerms) {
        setErrorMsg('Please accept the Terms of Service to continue.');
        return;
      }

      setIsLoading(true);
      const res = await apiSignUp(fullName, email, password);
      setIsLoading(false);

      if (res.error) {
        setErrorMsg(res.error);
      } else if (res.user) {
        onUserChange(res.user);
        setSuccessMsg(res.message || 'Account created successfully!');
      }
    } else {
      // Login
      setIsLoading(true);
      const res = await apiLogin(email, password);
      setIsLoading(false);

      if (res.error) {
        setErrorMsg(res.error);
      } else if (res.user) {
        onUserChange(res.user);
        setSuccessMsg('Logged in successfully!');
      }
    }
  };

  const handleLogout = async () => {
    await apiLogout();
    onUserChange(null);
    setSuccessMsg('You have been logged out.');
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <button
            onClick={onBackToHome}
            className="flex items-center space-x-2 text-xs font-chakra text-[#FF5B00] hover:text-white mb-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <h1 className="font-orbitron font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            User <span className="text-[#FF5B00]">Portal</span> & Account System
          </h1>
        </div>

        {onOpenExporter && (
          <button
            onClick={onOpenExporter}
            className="clip-chamfer-cta bg-white/10 hover:bg-[#FF5B00] hover:text-black text-white border border-[#FF5B00]/50 font-chakra font-bold text-xs sm:text-sm px-4 py-2.5 flex items-center space-x-2 transition-all cursor-pointer self-start sm:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Export Code (PC / Vercel / GitHub)</span>
          </button>
        )}
      </div>

      {/* Main Container */}
      {currentUser ? (
        /* Logged In User Profile Dashboard */
        <div className="bg-[#0a0b0e]/90 backdrop-blur-xl border border-[#FF5B00]/40 rounded-2xl p-6 sm:p-10 shadow-[0_0_50px_rgba(255,91,0,0.15)] space-y-8">
          {/* User Profile Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/5 border border-white/10 p-6 rounded-2xl">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={currentUser.fullName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#FF5B00] shadow-[0_0_20px_#FF5B00]"
                />
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-400 border-2 border-black rounded-full" />
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="font-orbitron font-extrabold text-xl text-white">
                    {currentUser.fullName}
                  </h2>
                  <span className="text-[10px] font-chakra font-bold text-black bg-[#FF5B00] px-2 py-0.5 rounded uppercase">
                    {currentUser.role}
                  </span>
                </div>
                <p className="font-chakra text-gray-400 text-sm mt-0.5">
                  {currentUser.email}
                </p>
                <span className="text-[11px] font-chakra text-gray-500 block mt-1">
                  Member ID: <code className="text-gray-300">{currentUser.id}</code>
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="clip-chamfer-cta bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-black border border-red-500/40 font-chakra font-bold text-sm px-5 py-2.5 flex items-center space-x-2 transition-all cursor-pointer self-start md:self-auto"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Account Details & Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-gray-400 text-xs font-chakra">
                <span>VR Credits Balance</span>
                <CreditCard className="w-4 h-4 text-[#FF5B00]" />
              </div>
              <div className="font-orbitron font-extrabold text-3xl text-white">
                ${currentUser.credits}
              </div>
              <span className="text-[11px] text-emerald-400 font-chakra font-semibold block">
                + $1,000 Welcome Bonus Active
              </span>
            </div>

            <div className="bg-white/5 p-5 rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-gray-400 text-xs font-chakra">
                <span>Security Protocol</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="font-orbitron font-bold text-lg text-emerald-400">
                Quantum Encrypted
              </div>
              <span className="text-[11px] text-gray-400 font-chakra block">
                Express REST API & Local DB Synced
              </span>
            </div>

            <div className="bg-white/5 p-5 rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-gray-400 text-xs font-chakra">
                <span>Joined Platform</span>
                <Zap className="w-4 h-4 text-[#FF5B00]" />
              </div>
              <div className="font-orbitron font-bold text-base text-white">
                {new Date(currentUser.createdAt).toLocaleDateString()}
              </div>
              <span className="text-[11px] text-gray-400 font-chakra block">
                Database Verified Account
              </span>
            </div>
          </div>

          {/* Simulated Active Virtual Purchases */}
          <div className="bg-black/40 border border-white/10 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-orbitron font-bold text-base text-white flex items-center space-x-2">
                <ShoppingBag className="w-4 h-4 text-[#FF5B00]" />
                <span>Account Order History</span>
              </h3>
              <span className="text-xs font-chakra text-[#FF5B00]">1 Active Pre-order</span>
            </div>

            <div className="flex items-center justify-between bg-white/5 p-4 rounded-lg text-xs font-chakra">
              <div>
                <span className="font-bold text-white block text-sm">VR-9000 Infinite Apex</span>
                <span className="text-gray-400">Pre-Order #VR-88201 • Quantum Micro-OLED</span>
              </div>
              <div className="text-right">
                <span className="font-orbitron font-bold text-emerald-400 text-sm block">$1,499</span>
                <span className="text-[10px] text-gray-400">Processing Priority Shipping</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Sign In / Sign Up Form Card */
        <div className="max-w-xl mx-auto bg-[#0a0b0e]/90 backdrop-blur-xl border border-[#FF5B00]/40 rounded-2xl p-6 sm:p-10 shadow-[0_0_60px_rgba(255,91,0,0.15)] space-y-6">
          
          {/* Form Tabs: Login vs Register */}
          <div className="flex items-center bg-black/60 p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => { setMode('login'); setErrorMsg(null); }}
              className={`flex-1 py-3 rounded-lg font-chakra font-bold text-sm transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-[#FF5B00] text-black shadow-[0_0_15px_#FF5B00]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>

            <button
              onClick={() => { setMode('signup'); setErrorMsg(null); }}
              className={`flex-1 py-3 rounded-lg font-chakra font-bold text-sm transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-[#FF5B00] text-black shadow-[0_0_15px_#FF5B00]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Quick Demo Login Option */}
          <div className="bg-[#12141a] border border-[#FF5B00]/30 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="font-chakra font-bold text-xs text-white block">
                ⚡ Test Mode: 1-Click Demo Login
              </span>
              <span className="text-[11px] text-gray-400 font-chakra">
                Log in instantly with sample VIP account
              </span>
            </div>

            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="clip-chamfer-cta bg-[#FF5B00]/20 hover:bg-[#FF5B00] text-[#FF5B00] hover:text-black border border-[#FF5B00]/50 font-chakra font-bold text-xs px-3.5 py-2 transition-all cursor-pointer"
            >
              Demo Login
            </button>
          </div>

          {/* Alert Messages */}
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/50 p-3.5 rounded-xl text-red-400 text-xs font-chakra flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-500/10 border border-emerald-500/50 p-3.5 rounded-xl text-emerald-400 text-xs font-chakra flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name field for Sign Up */}
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-xs font-chakra font-semibold text-gray-300 block uppercase">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Mercer"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B00] transition-colors font-chakra"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-chakra font-semibold text-gray-300 block uppercase">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B00] transition-colors font-chakra"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-chakra font-semibold text-gray-300 block uppercase">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B00] transition-colors font-chakra"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Indicator for Signup */}
              {mode === 'signup' && password.length > 0 && (
                <div className="space-y-1 pt-1">
                  <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${passStrength.color}`}
                      style={{ width: `${(passStrength.score / 3) * 100}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-chakra text-gray-400 block">
                    {passStrength.label}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password field for Signup */}
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-xs font-chakra font-semibold text-gray-300 block uppercase">
                  Confirm Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5B00] transition-colors font-chakra"
                  />
                </div>
              </div>
            )}

            {/* Remember Me & Terms Checkbox */}
            <div className="pt-2 flex items-center justify-between text-xs font-chakra text-gray-400">
              {mode === 'login' ? (
                <>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded accent-[#FF5B00]"
                    />
                    <span>Remember session</span>
                  </label>
                  <a href="#" className="text-[#FF5B00] hover:underline" onClick={(e) => { e.preventDefault(); alert('Password reset link dispatched via quantum channel.'); }}>
                    Forgot password?
                  </a>
                </>
              ) : (
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="rounded accent-[#FF5B00]"
                  />
                  <span>I accept the Quantum Terms of Service</span>
                </label>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full clip-chamfer-cta bg-[#FF5B00] hover:bg-[#FF6E00] text-black font-chakra font-bold text-base py-3.5 transition-all cursor-pointer shadow-[0_0_20px_#FF5B00] mt-4 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Connecting to Express Database...</span>
              ) : (
                <span>{mode === 'login' ? 'Sign In to Portal' : 'Create Quantum Account'}</span>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
