
import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import { Crown } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 1: Fade in logo (0.5s)
    const t1 = setTimeout(() => setStage(1), 500);
    // Stage 2: Reveal tagline (1.5s)
    const t2 = setTimeout(() => setStage(2), 1500);
    // Stage 3: Start exit transition (3.0s)
    const t3 = setTimeout(() => setStage(3), 3000);
    // Finish: Remove component (3.5s)
    const t4 = setTimeout(() => onFinish(), 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 z-[200] bg-[#0A2419] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${stage === 3 ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'}`}>
      
      {/* Background Luxury Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#F7E7CE]/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#F7E7CE]/5 rounded-full blur-[120px] animate-pulse delay-700"></div>
        
        {/* Subtle Shimmer Pattern */}
        <div className="absolute inset-0 opacity-[0.03] shimmer-bg"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with Soft Glow */}
        <div className={`transition-all duration-1000 ease-out transform ${stage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="relative">
             {/* Glow Behind Logo */}
             <div className="absolute inset-0 bg-[#F7E7CE]/20 blur-[40px] rounded-full animate-pulse"></div>
             <Logo size="xl" />
          </div>
        </div>

        {/* App Name & Tagline */}
        <div className={`mt-8 text-center transition-all duration-1000 delay-300 transform ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#F7E7CE]/30"></div>
            <Crown size={14} className="text-[#F7E7CE] animate-bounce duration-[3000ms]" />
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#F7E7CE]/30"></div>
          </div>
          <p className="text-[11px] text-[#F7E7CE] font-bold uppercase tracking-[0.6em] shimmer-text">
            Your Beauty, Our Passion
          </p>
        </div>
      </div>

      {/* Loading Bar at bottom */}
      <div className="absolute bottom-20 w-48 h-0.5 bg-white/5 rounded-full overflow-hidden">
        <div 
          className="h-full gold-gradient transition-all duration-[3000ms] ease-linear"
          style={{ width: stage >= 3 ? '100%' : '0%' }}
        ></div>
      </div>

      <style>{`
        .shimmer-text {
          background: linear-gradient(90deg, #F7E7CE 0%, #FFFFFF 50%, #F7E7CE 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-anim 4s linear infinite;
        }
        @keyframes shimmer-anim {
          to { background-position: 200% center; }
        }
        .shimmer-bg {
          background-image: radial-gradient(circle at 2px 2px, rgba(247, 231, 206, 0.1) 1px, transparent 0);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
