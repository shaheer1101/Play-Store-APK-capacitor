import React, { useState } from 'react';
import { Eye, Crown, X, ArrowLeftRight } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryScreenProps {
  gallery: GalleryItem[];
}

const GalleryScreen: React.FC<GalleryScreenProps> = ({ gallery }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const closeModal = () => setSelectedItem(null);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
           <Crown size={24} className="text-[#F7E7CE]" />
           <h2 className="text-2xl font-bold text-[#F7E7CE] serif uppercase tracking-widest">The Gallery of Souls</h2>
        </div>
        <p className="text-xs text-[#F7E7CE]/60 uppercase tracking-widest ml-9">A curated collection of perfection</p>
      </div>

      <div className="columns-2 gap-5 space-y-5">
        {gallery.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setSelectedItem(item)}
            className="break-inside-avoid relative group glow-gold rounded-[1.8rem] overflow-hidden cursor-pointer active:scale-95 hover:scale-[1.03] transition-all duration-500 ease-out shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          >
            <div className="relative overflow-hidden shadow-2xl">
              <img src={item.after} alt={item.title} className="w-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <div className="flex flex-col items-center">
                   <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 border border-white/30 shadow-lg">
                     <Eye className="text-white" size={24} />
                   </div>
                   <span className="text-[9px] text-white font-black uppercase tracking-[0.3em] bg-black/40 px-3 py-1 rounded-full">Explore Art</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#124C34]/40">
              <h4 className="text-[10px] font-bold text-white uppercase tracking-widest serif">{item.title}</h4>
              <p className="text-[8px] text-[#F7E7CE]/40 uppercase mt-1 tracking-widest">Masterpiece by Aneela</p>
            </div>
          </div>
        ))}
      </div>

      {/* Luxury Transformation Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0A2419]/90 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={closeModal}
        >
          <div 
            className="relative w-full max-w-lg glass-card rounded-[3rem] border-[#F7E7CE]/20 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white active:scale-90 transition-transform"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              <div className="text-center mb-8">
                <span className="text-[10px] text-[#F7E7CE]/60 uppercase tracking-[0.4em] font-black">Transformation Reveal</span>
                <h3 className="text-2xl font-bold text-white serif mt-2 uppercase tracking-widest">{selectedItem.title}</h3>
              </div>

              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative group overflow-hidden rounded-3xl border border-white/5 shadow-xl aspect-[3/4]">
                    <img src={selectedItem.before} alt="Before" className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-black/60 backdrop-blur-md text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-white/10">Before</span>
                    </div>
                  </div>
                  <div className="relative group overflow-hidden rounded-3xl border border-[#F7E7CE]/30 shadow-xl aspect-[3/4]">
                    <img src={selectedItem.after} alt="After" className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4">
                      <span className="bg-[#F7E7CE] text-[#0A2419] text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Perfection</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#F7E7CE]/20"></div>
                  <ArrowLeftRight className="text-[#F7E7CE]/40" size={16} />
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#F7E7CE]/20"></div>
                </div>

                <div className="mt-4 p-6 bg-white/5 rounded-3xl border border-white/5 text-center">
                  <p className="text-[11px] text-[#F7E7CE]/60 italic leading-relaxed">
                    "This transformation highlights the seamless integration of luxury skin prep and master artistry, creating an ethereal glow that lasts from sunrise to sunset."
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <Crown size={12} className="text-[#F7E7CE]" />
                    <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Aneela's Signature Stroke</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={closeModal}
                className="w-full mt-8 btn-royal py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-transform"
              >
                Close Gallery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryScreen;