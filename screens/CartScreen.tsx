
import React from 'react';
import { ChevronLeft, Trash2, Plus, Minus, ShoppingBag, X } from 'lucide-react';
import { CartItem } from '../types';

interface CartScreenProps {
  items: CartItem[];
  onBack: () => void;
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onCheckout: () => void;
}

const CartScreen: React.FC<CartScreenProps> = ({ items, onBack, onRemove, onUpdateQty, onCheckout }) => {
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in fade-in h-[70vh]">
        <div className="absolute top-14 right-8">
          <button 
            onClick={onBack}
            className="w-12 h-12 rounded-full border border-[#F7E7CE]/30 flex items-center justify-center text-[#F7E7CE] bg-[#124C34]/40 backdrop-blur-md active:scale-90 transition-transform shadow-xl"
          >
            <X size={24} strokeWidth={2.5} />
          </button>
        </div>
        <div className="w-24 h-24 rounded-full bg-[#124C34] flex items-center justify-center mb-6 shadow-2xl border border-white/5">
          <ShoppingBag size={40} className="text-[#F7E7CE]/30" />
        </div>
        <h2 className="text-xl font-bold text-[#F7E7CE] serif mb-2 uppercase tracking-widest">Your Bag is Empty</h2>
        <p className="text-[#F7E7CE]/60 text-[10px] mb-8 uppercase tracking-[0.2em] italic">Discover perfection in our boutique.</p>
        <button onClick={onBack} className="btn-royal py-4 px-12 rounded-2xl text-[10px] font-black tracking-[0.2em]">Explore Shop</button>
      </div>
    );
  }

  return (
    <div className="animate-in slide-in-from-right-10 duration-500 pb-10">
      <div className="flex justify-between items-center mb-10 pt-4">
        <button onClick={onBack} className="flex items-center gap-2 text-[#F7E7CE]/60 hover:text-[#F7E7CE] transition-colors">
          <ChevronLeft size={20} /> <span className="text-[10px] uppercase tracking-[0.3em] font-black">Back to Studio</span>
        </button>
        <button 
          onClick={onBack}
          className="w-12 h-12 rounded-full border border-[#F7E7CE]/30 flex items-center justify-center text-[#F7E7CE] bg-[#124C34]/40 backdrop-blur-md active:scale-90 transition-transform hover:bg-[#F7E7CE] hover:text-[#0A2419] shadow-xl"
        >
          <X size={24} strokeWidth={2.5} />
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#F7E7CE] serif uppercase tracking-tight">Your Luxury Bag</h2>
        <div className="h-0.5 w-16 gold-gradient mt-2 rounded-full"></div>
      </div>

      <div className="space-y-4 mb-10">
        {items.map((item) => (
          <div key={item.id} className="glass-card p-5 rounded-[2.5rem] flex gap-5 border-white/5 glow-gold items-center">
            <div className="w-20 h-20 shrink-0 rounded-3xl overflow-hidden border border-white/10 shadow-lg">
              <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
            </div>
            <div className="flex-1 flex flex-col justify-between min-w-0">
              <div className="flex justify-between items-start">
                <div className="pr-2">
                  <h4 className="text-[11px] font-black text-white uppercase tracking-tight truncate leading-none">{item.name}</h4>
                  <p className="text-[8px] text-[#F7E7CE]/50 uppercase tracking-[0.1em] mt-1.5 font-bold">{item.type}</p>
                </div>
                <button onClick={() => onRemove(item.id)} className="text-red-400/40 hover:text-red-400 p-1 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[#F7E7CE] font-black text-xs">Rs. {item.price.toLocaleString()}</span>
                <div className="flex items-center bg-[#0A2419] rounded-2xl border border-white/5 p-1 gap-1">
                  <button onClick={() => onUpdateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-[#F7E7CE] bg-white/5 rounded-xl hover:bg-white/10"><Minus size={12} /></button>
                  <span className="text-[10px] font-black w-6 text-center text-white">{item.quantity}</span>
                  <button onClick={() => onUpdateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-[#F7E7CE] bg-white/5 rounded-xl hover:bg-white/10"><Plus size={12} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-8 rounded-[3rem] border-[#F7E7CE]/20 bg-gradient-to-br from-[#124C34] to-[#0A2419] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <ShoppingBag size={100} />
        </div>
        <div className="space-y-4 mb-8">
          <div className="flex justify-between text-[#F7E7CE]/40 text-[10px] font-black uppercase tracking-widest">
            <span>Selection Subtotal</span>
            <span>Rs. {total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[#F7E7CE]/40 text-[10px] font-black uppercase tracking-widest">
            <span>Luxury Handling</span>
            <span>Rs. 250</span>
          </div>
          <div className="flex justify-between text-[#F7E7CE] items-baseline pt-4 border-t border-white/5">
            <span className="serif text-sm font-bold uppercase tracking-widest">Grand Total</span>
            <span className="text-3xl font-bold">Rs. {(total + 250).toLocaleString()}</span>
          </div>
        </div>
        <button 
          onClick={onCheckout}
          className="w-full btn-royal py-5 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] text-[11px] font-black uppercase tracking-[0.3em] active:scale-95 transition-all"
        >
          Secure Luxury Checkout
        </button>
      </div>
    </div>
  );
};

export default CartScreen;
