
import React from 'react';
import { ChevronLeft, ShoppingBag, ShieldCheck, Sparkles, Droplets } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailScreenProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ product, onBack, onAddToCart }) => {
  return (
    <div className="animate-in slide-in-from-right-10 duration-500 pb-10">
      <button onClick={onBack} className="flex items-center gap-2 text-[#F7E7CE]/60 mb-6 hover:text-[#F7E7CE] transition-colors">
        <ChevronLeft size={20} /> <span className="text-[10px] uppercase tracking-widest font-bold">Back to Luxury Items</span>
      </button>

      <div className="rounded-[3rem] overflow-hidden mb-8 shadow-2xl relative aspect-square border border-white/5 glow-gold">
        <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2419]/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-8 left-8">
           <span className="bg-[#F7E7CE] text-[#0A2419] px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-3 inline-block shadow-lg">
             {product.category} Elite
           </span>
           <h2 className="text-3xl font-bold text-white serif uppercase tracking-tight leading-tight">{product.name}</h2>
        </div>
      </div>

      <div className="glass-card rounded-[2.5rem] p-8 mb-8 border-white/5">
        <div className="flex justify-between items-end mb-8">
           <div className="flex flex-col">
              <span className="text-[10px] text-[#F7E7CE]/60 uppercase tracking-[0.3em] mb-1 font-black">Investment</span>
              <div className="text-3xl font-bold text-[#F7E7CE] serif">Rs. {product.price.toLocaleString()}</div>
           </div>
           <div className="bg-[#124C34] px-4 py-2 rounded-2xl border border-white/5 text-[9px] text-[#F7E7CE] font-bold uppercase tracking-widest">
             Limited Edition
           </div>
        </div>

        <div className="space-y-6 mb-10">
          <p className="text-xs text-[#F3F3F3]/70 leading-relaxed italic border-l-2 border-[#F7E7CE]/30 pl-5">
            {product.description}
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
              <ShieldCheck size={18} className="text-[#F7E7CE]" />
              <span className="text-[9px] text-white/60 font-black uppercase tracking-widest">100% Organic</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
              <Sparkles size={18} className="text-[#F7E7CE]" />
              <span className="text-[9px] text-white/60 font-black uppercase tracking-widest">Master Finish</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
              <Droplets size={18} className="text-[#F7E7CE]" />
              <span className="text-[9px] text-white/60 font-black uppercase tracking-widest">Silk Base</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
              <ShoppingBag size={18} className="text-[#F7E7CE]" />
              <span className="text-[9px] text-white/60 font-black uppercase tracking-widest">Global Ship</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => {
            onAddToCart(product);
            onBack();
          }}
          className="w-full btn-royal py-5 rounded-2xl flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.4)] active:scale-95 transition-all text-[11px] font-black uppercase tracking-[0.3em]"
        >
          Add to Luxury Bag <ShoppingBag size={18} />
        </button>
      </div>
      
      <div className="p-6 text-center">
         <p className="text-[9px] text-white/30 uppercase tracking-[0.4em]">Every stroke of our product is curated for excellence.</p>
      </div>
    </div>
  );
};

export default ProductDetailScreen;
