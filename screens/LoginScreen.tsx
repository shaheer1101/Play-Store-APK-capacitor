
import React, { useState } from 'react';
import { Mail, Lock, User, Crown, Sparkles, ChevronLeft } from 'lucide-react';
import Logo from '../components/Logo';

interface LoginScreenProps {
  onLogin: (userData: any) => void;
  onBack: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onBack }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      name: isSignUp ? name : 'Guest Member',
      email: email,
      tier: 'Diamond Member'
    });
  };

  return (
    <div className="fixed inset-0 z-[150] bg-[#0A2419] flex flex-col items-center justify-start overflow-y-auto no-scrollbar">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#124C34] to-transparent opacity-40"></div>
      
      <div className="relative w-full max-w-md px-8 pt-12 pb-20 flex flex-col min-h-full">
        <button onClick={onBack} className="flex items-center gap-2 text-[#F7E7CE]/60 hover:text-[#F7E7CE] transition-colors mb-12">
          <ChevronLeft size={20} /> <span className="text-[10px] uppercase tracking-[0.3em] font-black">Return</span>
        </button>

        <div className="text-center mb-12">
          <Logo size="lg" />
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#F7E7CE]/10">
            <Crown size={12} className="text-[#F7E7CE]" />
            <span className="text-[8px] font-black text-[#F7E7CE] uppercase tracking-[0.3em]">The Member's Lounge</span>
          </div>
        </div>

        <div className="glass-card p-10 rounded-[3rem] border-[#F7E7CE]/20 shadow-2xl">
          <h2 className="text-2xl font-bold text-white serif text-center mb-2 uppercase tracking-widest">
            {isSignUp ? 'Join the Elite' : 'Welcome Back'}
          </h2>
          <p className="text-[9px] text-[#F7E7CE]/40 text-center uppercase tracking-[0.3em] mb-10 italic">
            {isSignUp ? 'Start your journey to perfection' : 'Access your curated beauty profile'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-[#F7E7CE]/40" size={18} />
                <input 
                  type="text" 
                  placeholder="Your Full Name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-xs text-white outline-none focus:border-[#F7E7CE]/40"
                  required
                />
              </div>
            )}

            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#F7E7CE]/40" size={18} />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-xs text-white outline-none focus:border-[#F7E7CE]/40"
                required
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#F7E7CE]/40" size={18} />
              <input 
                type="password" 
                placeholder="Secure Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-xs text-white outline-none focus:border-[#F7E7CE]/40"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full btn-royal py-5 rounded-2xl shadow-2xl active:scale-95 transition-all text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3"
            >
              {isSignUp ? 'Create Membership' : 'Authorize Access'} <Sparkles size={16} />
            </button>
          </form>

          <div className="mt-12 text-center">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[10px] text-white/60 hover:text-[#F7E7CE] transition-colors"
            >
              {isSignUp ? 'ALREADY A MEMBER? ' : 'NOT A MEMBER YET? '}
              <span className="font-black border-b border-[#F7E7CE]/40 pb-0.5 ml-1">
                {isSignUp ? 'SIGN IN' : 'JOIN THE ELITE'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
