import React, { useState } from 'react';
import { Bell, ShoppingBag, Menu as MenuIcon } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  onAdminTrigger?: () => void;
  cartCount: number;
  onCartClick: () => void;
  onMenuOpen: () => void;
  onProfileClick?: () => void;
  user?: any;
}

const Header: React.FC<HeaderProps> = ({ onAdminTrigger, cartCount, onCartClick, onMenuOpen }) => {
  const [tapCount, setTapCount] = useState(0);

  const handleLogoTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);
    if (newCount === 6) {
      onAdminTrigger?.();
      setTapCount(0);
    }
    setTimeout(() => setTapCount(0), 3000);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#0A2419]/95 backdrop-blur-2xl z-[60] flex items-center justify-between px-6 border-b border-[#F7E7CE]/10 shadow-lg">
      <div className="flex items-center gap-3 cursor-pointer group active:scale-95 transition-transform" onClick={handleLogoTap}>
        <div className="flex flex-col items-start">
          <Logo size="sm" />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={onCartClick}
          className="text-[#F3F3F3] hover:text-[#F7E7CE] transition-all active:scale-90 relative p-2"
        >
          <ShoppingBag size={22} strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#F7E7CE] text-[#0A2419] rounded-full text-[9px] font-bold flex items-center justify-center border border-[#0A2419]">
              {cartCount}
            </span>
          )}
        </button>
        
        <button 
          onClick={onMenuOpen}
          className="w-10 h-10 rounded-full gold-gradient text-[#0A2419] flex items-center justify-center shadow-lg active:scale-90 transition-transform"
        >
          <MenuIcon size={20} strokeWidth={2.5} />
        </button>
      </div>
    </header>
  );
};

export default Header;