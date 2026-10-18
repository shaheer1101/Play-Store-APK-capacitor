
import React from 'react';
import { Home, Scissors, ShoppingBag, Zap, Image, Sparkles } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: <Home size={22} />, label: 'Home' },
    { id: 'services', icon: <Scissors size={22} />, label: 'Salon' },
    { id: 'store', icon: <ShoppingBag size={22} />, label: 'Store' },
    { id: 'viral', icon: <Zap size={22} />, label: 'Viral' },
    { id: 'ai', icon: <Sparkles size={22} />, label: 'AI' },
    { id: 'gallery', icon: <Image size={22} />, label: 'Gallery' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0E3F2A] border-t border-[rgba(255,215,120,0.15)] px-1 py-3 z-50 flex justify-around items-center">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center transition-all duration-300 ${
            activeTab === tab.id ? 'text-[#E1B84F] scale-110' : 'text-[#B7C1BC]'
          }`}
        >
          {tab.icon}
          <span className="text-[9px] mt-1 font-medium tracking-wide uppercase">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
