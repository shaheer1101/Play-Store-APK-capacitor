import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  light?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', light = false }) => {
  const sizeClasses = {
    sm: { container: 'gap-1', main: 'text-lg', sub: 'text-[7px]' },
    md: { container: 'gap-1.5', main: 'text-2xl', sub: 'text-[9px]' },
    lg: { container: 'gap-2', main: 'text-4xl', sub: 'text-[11px]' },
    xl: { container: 'gap-3', main: 'text-6xl', sub: 'text-[14px]' },
  };

  return (
    <div className={`flex flex-col leading-none select-none text-center ${sizeClasses[size].container}`}>
      <div className="flex items-baseline justify-center gap-1">
        <span className={`serif font-bold tracking-tighter ${light ? 'text-white' : 'text-[#F7E7CE]'}`}>
          Aneela's
        </span>
      </div>
      <span className={`font-bold uppercase tracking-[0.5em] ${light ? 'text-white/80' : 'text-[#F7E7CE]'} ${sizeClasses[size].sub}`}>
        MakeOver
      </span>
    </div>
  );
};

export default Logo;