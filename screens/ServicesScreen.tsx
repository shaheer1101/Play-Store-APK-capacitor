import React, { useState } from 'react';
import { Clock, Eye } from 'lucide-react';
import { Service } from '../types';

interface ServicesScreenProps {
  services: Service[];
  onBook: (service: Service) => void;
  onViewDetails: (service: Service) => void;
}

const ServicesScreen: React.FC<ServicesScreenProps> = ({ services, onBook, onViewDetails }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Makeup', 'Hair', 'Skin'];
  const filteredServices = filter === 'All' 
    ? services 
    : services.filter(s => s.category === filter);

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#F7E7CE] serif uppercase tracking-widest animate-in slide-in-from-left-4 duration-700">Salon Catalog</h2>
        <p className="text-xs text-[#F7E7CE]/60 uppercase tracking-widest mt-1 animate-in slide-in-from-left-6 duration-700 delay-100">Exclusive Portfolio of Artistry</p>
      </div>

      <div className="flex gap-2 mb-10 overflow-x-auto no-scrollbar py-2 animate-in slide-in-from-bottom-4 duration-700 delay-200">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-8 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 transform active:scale-95 ${
              filter === cat 
                ? 'gold-gradient text-[#0A2419] shadow-[0_10px_20px_rgba(247,231,206,0.3)] scale-105' 
                : 'bg-[#124C34]/40 text-[#F7E7CE]/60 border border-white/5 hover:border-[#F7E7CE]/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-12">
        {filteredServices.map((service, index) => (
          <div 
            key={service.id} 
            className="glass-card rounded-[2.8rem] overflow-hidden flex flex-col glow-gold group hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 animate-in fade-in slide-in-from-bottom-10"
            style={{ 
              animationDelay: `${index * 150}ms`,
              animationFillMode: 'both'
            }}
          >
            <div className="h-72 relative overflow-hidden">
              <img 
                src={service.image} 
                alt={service.name} 
                className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" 
              />
              {/* Luxury Shine Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#F7E7CE]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2419] via-[#0A2419]/20 to-transparent opacity-60"></div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                 <button 
                   onClick={() => onViewDetails(service)}
                   className="bg-white/10 backdrop-blur-md p-6 rounded-full border border-white/20 shadow-2xl hover:bg-white/20 transition-all"
                 >
                   <Eye className="text-white" size={28} />
                 </button>
              </div>

              <div className="absolute bottom-6 left-8 right-8">
                 <span className="bg-[#F7E7CE]/20 backdrop-blur-md text-[#F7E7CE] text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] border border-[#F7E7CE]/20 inline-block mb-3">
                   {service.category} Artistry
                 </span>
                 <h4 className="text-3xl font-bold text-white serif drop-shadow-lg">{service.name}</h4>
              </div>
            </div>

            <div className="p-8 pt-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-[10px] text-[#F7E7CE]/80 font-black uppercase tracking-widest">
                  <Clock size={16} className="text-[#F7E7CE]" /> {service.duration} Session
                </div>
                <p className="text-[#F7E7CE] font-bold text-xl tracking-tight">Rs. {service.price.toLocaleString()}</p>
              </div>
              
              <p className="text-xs text-[#F7E7CE]/50 leading-relaxed mb-10 font-light italic border-l border-[#F7E7CE]/20 pl-4 py-1">
                {service.description}
              </p>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => onViewDetails(service)} 
                  className="flex-1 bg-white/5 border border-[#F7E7CE]/20 text-[#F7E7CE] text-[10px] font-black px-6 py-4 rounded-2xl uppercase tracking-widest hover:bg-[#F7E7CE]/10 transition-all"
                >
                  Explore
                </button>
                <button 
                  onClick={() => onBook(service)} 
                  className="flex-[2] bg-[#F7E7CE] text-[#0A2419] text-[10px] font-black px-8 py-4 rounded-2xl shadow-[0_15px_30px_rgba(247,231,206,0.2)] flex items-center justify-center gap-2 uppercase tracking-widest hover:shadow-[0_20px_40px_rgba(247,231,206,0.4)] transform transition-all active:scale-95"
                >
                  Reserve Experience
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="py-20 text-center animate-in fade-in duration-700">
           <p className="text-[#F7E7CE]/30 italic text-sm tracking-widest uppercase">No masterpieces found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ServicesScreen;