import React, { useState, useEffect } from 'react';
import { ChevronLeft, CheckCircle, CreditCard, Wallet, Truck, X } from 'lucide-react';
import { CartItem, Order } from '../types';
import confetti from 'canvas-confetti';

interface CheckoutScreenProps {
  item: CartItem[];
  onBack: () => void;
  onComplete: (order: Order) => void;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ item, onBack, onComplete }) => {
  const [method, setMethod] = useState<'EasyPaisa' | 'JazzCash' | 'Stripe'>('EasyPaisa');
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isPlaced, setIsPlaced] = useState(false);

  const total = item.reduce((acc, i) => acc + (i.price * i.quantity), 0) + 250;

  useEffect(() => {
    if (isPlaced) {
      confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.7 },
        colors: ['#F7E7CE', '#E1B84F', '#0A2419']
      });
    }
  }, [isPlaced]);

  const handlePlaceOrder = () => {
    if (clientName && phone && address) {
      const newOrder: Order = {
        id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        items: item,
        clientName,
        phone,
        address,
        total,
        paymentMethod: method,
        status: 'Pending',
        date: new Date().toLocaleDateString()
      };
      
      onComplete(newOrder);
      setIsPlaced(true);
      setTimeout(onBack, 3000);
    } else {
      alert("Please provide all shipment details.");
    }
  };

  if (isPlaced) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center animate-in zoom-in-95">
        <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-8">
          <CheckCircle size={56} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-[#F7E7CE] mb-3 serif uppercase">Order Secured!</h2>
        <p className="text-[#F7E7CE]/60 text-xs italic tracking-widest max-w-[200px]">Your treasures are being prepared with perfection.</p>
      </div>
    );
  }

  return (
    <div className="animate-in slide-in-from-right-10 duration-700 pb-10 relative">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-[#F7E7CE]/50 hover:text-[#F7E7CE] transition-colors">
          <ChevronLeft size={20} /> <span className="text-[10px] font-bold uppercase tracking-widest">Back to Bag</span>
        </button>
        <button 
          onClick={onBack} 
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F7E7CE]/40 hover:text-[#F7E7CE] active:scale-90 transition-all"
          aria-label="Exit checkout"
        >
          <X size={20} />
        </button>
      </div>

      <h2 className="text-2xl font-bold text-white mb-8 serif uppercase tracking-widest">Secure Shipment</h2>

      <div className="glass-card rounded-[3rem] p-8 border-white/5 space-y-10 glow-gold">
        <div className="space-y-4 max-h-[200px] overflow-y-auto no-scrollbar">
          {item.map((it, idx) => (
             <div key={idx} className="flex gap-4 p-4 bg-[#0E3F2A] rounded-2xl border border-white/5 items-center">
              <img src={it.image} className="w-14 h-14 rounded-xl object-cover shadow-lg" alt="" />
              <div className="flex-1">
                <h4 className="text-[10px] font-bold text-white uppercase tracking-tight">{it.quantity}x {it.name}</h4>
                <p className="text-[#F7E7CE] font-bold text-[10px] mt-0.5">Rs. {(it.price * it.quantity).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-5">
          <h4 className="text-[10px] font-black text-[#F7E7CE] uppercase tracking-[0.3em] mb-2 border-l-2 border-[#F7E7CE] pl-3">Receiver Credentials</h4>
          <input value={clientName} onChange={e => setClientName(e.target.value)} type="text" placeholder="Full Name" className="w-full bg-[#0A2419] border border-white/5 rounded-2xl py-4 px-6 text-xs text-white outline-none focus:border-[#F7E7CE]/40 transition-all" />
          <input value={phone} onChange={e => setPhone(e.target.value)} type="text" placeholder="Phone Number" className="w-full bg-[#0A2419] border border-white/5 rounded-2xl py-4 px-6 text-xs text-white outline-none focus:border-[#F7E7CE]/40 transition-all" />
          <textarea value={address} onChange={e => setAddress(e.target.value)} placeholder="Full Delivery Address" className="w-full bg-[#0A2419] border border-white/5 rounded-2xl py-4 px-6 text-xs text-white outline-none focus:border-[#F7E7CE]/40 h-24 transition-all resize-none" />
        </div>

        <div className="space-y-5">
          <h4 className="text-[10px] font-black text-[#F7E7CE] uppercase tracking-[0.3em] mb-2 border-l-2 border-[#F7E7CE] pl-3">Payment Gateway</h4>
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: 'EasyPaisa', icon: <Wallet size={18} /> },
              { id: 'JazzCash', icon: <Wallet size={18} /> },
              { id: 'Stripe', icon: <CreditCard size={18} /> }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id as any)}
                className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
                  method === m.id ? 'border-[#F7E7CE] bg-[#F7E7CE]/5 shadow-xl' : 'border-white/5 bg-[#0A2419]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`${method === m.id ? 'text-[#F7E7CE]' : 'text-white/40'}`}>
                    {m.icon}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-widest ${method === m.id ? 'text-[#F7E7CE]' : 'text-white/60'}`}>{m.id}</span>
                </div>
                {method === m.id && <CheckCircle size={16} className="text-[#F7E7CE]" />}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex justify-between items-center mb-8">
            <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">Grand Investment</span>
            <span className="text-2xl font-bold text-[#F7E7CE] serif">Rs. {total.toLocaleString()}</span>
          </div>
          <button onClick={handlePlaceOrder} className="w-full btn-royal py-5 rounded-2xl shadow-2xl active:scale-95 transition-all text-[11px] font-black uppercase tracking-[0.3em]">
            Authorize Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;