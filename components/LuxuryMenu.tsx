import React, { useState, useMemo } from 'react';
import { X, Home, Scissors, ShoppingBag, Zap, Image, Sparkles, Crown, Search, ArrowRight } from 'lucide-react';
import { Service, Product } from '../types';

interface LuxuryMenuProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  services: Service[];
  products: Product[];
  onServiceSelect: (s: Service) => void;
  onProductSelect: (p: Product) => void;
}

const LuxuryMenu: React.FC<LuxuryMenuProps> = ({ 
  activeTab, 
  setActiveTab, 
  isOpen, 
  setIsOpen, 
  services, 
  products,
  onServiceSelect,
  onProductSelect
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = useMemo(() => [
    { id: 'home', icon: <Home size={22} />, label: 'Home Studio' },
    { id: 'services', icon: <Scissors size={22} />, label: 'Master Salon' },
    { id: 'store', icon: <ShoppingBag size={22} />, label: 'Luxury Items' },
    { id: 'viral', icon: <Zap size={22} />, label: 'Viral Studio' },
    { id: 'ai', icon: <Sparkles size={22} />, label: 'AI Concierge' },
    { id: 'gallery', icon: <Image size={22} />, label: 'The Gallery' },
  ], []);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return { services: [], products: [], menu: menuItems };
    
    return {
      services: services.filter(s => 
        s.name.toLowerCase().includes(query) || 
        s.category.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query)
      ).slice(0, 5),
      products: products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
      ).slice(0, 5),
      menu: menuItems.filter(m => m.label.toLowerCase().includes(query))
    };
  }, [searchQuery, services, products, menuItems]);

  const handleSelect = (id: string) => {
    setActiveTab(id);
    setSearchQuery('');
    setIsOpen(false);
  };

  const handleResultClick = (item: any, type: 'service' | 'product') => {
    if (type === 'service') onServiceSelect(item);
    else onProductSelect(item);
    setSearchQuery('');
    setIsOpen(false);
  };

  const handleClose = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className={`fixed inset-0 z-[120] transition-opacity duration-200 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      {/* Blurred Backdrop - Click to Close */}
      <div 
        className="absolute inset-0 bg-[#0A2419]/98 backdrop-blur-3xl" 
        onClick={() => handleClose()}
      ></div>
      
      {/* Luxury Patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        <Crown size={400} className="absolute -top-20 -right-20 text-[#F7E7CE]" />
        <Crown size={300} className="absolute -bottom-20 -left-20 text-[#F7E7CE]" />
      </div>

      {/* Close Button - Optimized positioning for visibility and reach */}
      <div className="absolute top-12 right-6 z-[130]">
        <button 
          onClick={handleClose}
          className="w-12 h-12 rounded-full border border-[#F7E7CE]/40 flex items-center justify-center text-[#F7E7CE] bg-[#124C34]/80 backdrop-blur-xl active:scale-90 transition-all hover:bg-[#F7E7CE] hover:text-[#0A2419] shadow-2xl border-2"
        >
          <X size={24} strokeWidth={2.5} />
        </button>
      </div>

      <div className="relative h-full flex flex-col items-center justify-start px-8 z-[125] pt-28">
        {/* Search Bar inside Menu */}
        <div className={`w-full max-w-xs mb-8 transition-transform duration-200 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
          <div className="relative group">
            <Search className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${searchQuery ? 'text-[#F7E7CE]' : 'text-[#F7E7CE]/40'}`} size={20} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search perfection..." 
              className="w-full bg-white/5 border border-white/20 rounded-2xl py-5 pl-14 pr-12 text-sm text-white placeholder:text-[#F7E7CE]/20 outline-none focus:border-[#F7E7CE]/50 transition-all shadow-inner focus:bg-white/[0.08]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#F7E7CE]/40 hover:text-[#F7E7CE] transition-colors p-2"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="w-full max-w-xs overflow-y-auto no-scrollbar max-h-[65vh] py-2 flex flex-col gap-6 pb-20">
          
          {/* Search Content Results */}
          {searchQuery.trim() && (searchResults.services.length > 0 || searchResults.products.length > 0) && (
            <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
               <h4 className="text-[10px] font-black text-[#F7E7CE]/60 uppercase tracking-[0.4em] pl-2 mb-1">Matches</h4>
               
               {/* Service Results */}
               {searchResults.services.map(s => (
                 <button 
                   key={s.id} 
                   onClick={() => handleResultClick(s, 'service')}
                   className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10 hover:border-[#F7E7CE]/50 transition-all text-left group/item active:scale-[0.98]"
                 >
                   <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 shrink-0">
                    <img src={s.image} className="w-full h-full object-cover" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-[11px] font-bold text-white truncate uppercase tracking-tight">{s.name}</p>
                     <p className="text-[8px] text-[#F7E7CE]/60 font-medium uppercase tracking-widest mt-0.5">Salon</p>
                   </div>
                   <ArrowRight size={14} className="text-[#F7E7CE]/30 group-hover/item:translate-x-1 transition-all" />
                 </button>
               ))}

               {/* Product Results */}
               {searchResults.products.map(p => (
                 <button 
                   key={p.id} 
                   onClick={() => handleResultClick(p, 'product')}
                   className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10 hover:border-[#F7E7CE]/50 transition-all text-left group/item active:scale-[0.98]"
                 >
                   <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 shrink-0">
                    <img src={p.image} className="w-full h-full object-cover" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-[11px] font-bold text-white truncate uppercase tracking-tight">{p.name}</p>
                     <p className="text-[8px] text-[#F7E7CE]/60 font-medium uppercase tracking-widest mt-0.5">Luxury Items</p>
                   </div>
                   <ArrowRight size={14} className="text-[#F7E7CE]/30 group-hover/item:translate-x-1 transition-all" />
                 </button>
               ))}
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex flex-col items-center gap-4 w-full">
            {searchQuery.trim() && searchResults.menu.length === 0 && searchResults.services.length === 0 && searchResults.products.length === 0 && (
              <div className="py-10 text-center animate-in fade-in duration-200">
                <p className="text-[10px] text-white/30 tracking-[0.2em] uppercase">No results found</p>
                <button onClick={() => setSearchQuery('')} className="mt-4 text-[9px] text-[#F7E7CE]/60 font-black uppercase underline tracking-[0.3em]">Clear Search</button>
              </div>
            )}

            {!searchQuery.trim() && <h4 className="text-[9px] font-black text-[#F7E7CE]/40 uppercase tracking-[0.4em] mb-1 w-full text-center">Navigation</h4>}

            {searchResults.menu.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`flex items-center gap-6 w-full group transition-all duration-200 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${activeTab === item.id ? 'gold-gradient text-[#0A2419] shadow-xl scale-110' : 'bg-white/5 text-[#F7E7CE]/40 group-hover:text-[#F7E7CE] group-hover:bg-white/10 shadow-md'}`}>
                  {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
                </div>
                <div className="text-left">
                  <h3 className={`text-xl font-bold serif transition-colors ${activeTab === item.id ? 'text-[#F7E7CE]' : 'text-white/80 group-hover:text-[#F7E7CE]'}`}>
                    {item.label}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Branding Footer */}
      <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none opacity-20">
        <p className="text-[10px] text-[#F7E7CE] uppercase tracking-[0.5em] font-black">
          Aneela's MakeOver
        </p>
      </div>
    </div>
  );
};

export default LuxuryMenu;