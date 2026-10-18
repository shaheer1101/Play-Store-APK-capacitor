import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronLeft, CheckCircle, X } from 'lucide-react';
import { Service, Appointment } from '../types';
import confetti from 'canvas-confetti';

interface BookingScreenProps {
  service: Service;
  onBack: () => void;
  onConfirm: (appointment: Appointment) => void;
}

const BookingScreen: React.FC<BookingScreenProps> = ({ service, onBack, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const slots = ['10:00 AM', '11:30 AM', '01:00 PM', '03:00 PM', '05:00 PM', '07:30 PM'];

  useEffect(() => {
    if (isSuccess) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F7E7CE', '#E1B84F', '#0A2419']
      });
    }
  }, [isSuccess]);

  const handleConfirm = () => {
    if (selectedDate && selectedSlot && clientName && phone) {
      const newBooking: Appointment = {
        id: Date.now().toString(),
        serviceName: service.name,
        clientName,
        phone,
        date: selectedDate,
        time: selectedSlot,
        status: 'Pending',
        price: service.price
      };
      
      onConfirm(newBooking);
      setIsSuccess(true);
      setTimeout(onBack, 3000);
    } else {
      alert("Please fill all luxury details to proceed.");
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center animate-in zoom-in-95">
        <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-8">
          <CheckCircle size={56} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-[#F7E7CE] mb-3 serif">Reservation Captured!</h2>
        <p className="text-[#F7E7CE]/60 text-xs italic tracking-widest">Our curator will contact you shortly.</p>
      </div>
    );
  }

  return (
    <div className="animate-in slide-in-from-bottom-10 duration-700 pb-10 relative">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-[#F7E7CE]/50 hover:text-[#F7E7CE] transition-colors">
          <ChevronLeft size={20} /> <span className="text-[10px] font-bold uppercase tracking-widest">Return to Menu</span>
        </button>
        <button 
          onClick={onBack} 
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F7E7CE]/40 hover:text-[#F7E7CE] active:scale-90 transition-all"
          aria-label="Close booking"
        >
          <X size={20} />
        </button>
      </div>

      <div className="glass-card rounded-[3rem] p-8 mb-10 border-[#F7E7CE]/10 glow-gold shadow-2xl relative">
        <h2 className="text-2xl font-bold mb-8 text-white serif border-b border-white/5 pb-6 text-center uppercase tracking-widest">Request a Session</h2>
        
        <div className="flex items-center gap-5 p-5 bg-[#0E3F2A] rounded-3xl border border-white/10 mb-10 shadow-inner">
          <img src={service.image} className="w-20 h-20 rounded-2xl object-cover shadow-lg" alt="" />
          <div>
            <p className="text-sm font-bold serif text-white">{service.name}</p>
            <p className="text-[#F7E7CE] font-bold text-xs mt-1 tracking-wider uppercase">Rs. {service.price.toLocaleString()}</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="text-[9px] font-black text-[#F7E7CE]/60 uppercase tracking-[0.2em] mb-2.5 block">Full Name</label>
               <input value={clientName} onChange={e => setClientName(e.target.value)} type="text" placeholder="Your Name" className="w-full bg-[#0A2419] border border-white/5 rounded-2xl py-4 px-5 text-xs text-white outline-none focus:border-[#F7E7CE]/40" />
             </div>
             <div>
               <label className="text-[9px] font-black text-[#F7E7CE]/60 uppercase tracking-[0.2em] mb-2.5 block">Mobile No.</label>
               <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="03xx-xxxxxxx" className="w-full bg-[#0A2419] border border-white/5 rounded-2xl py-4 px-5 text-xs text-white outline-none focus:border-[#F7E7CE]/40" />
             </div>
          </div>

          <div>
            <label className="text-[9px] font-black text-[#F7E7CE]/60 uppercase tracking-[0.2em] mb-3 block">Desired Date</label>
            <div className="relative">
              <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-[#F7E7CE]/40" size={18} />
              <input 
                type="date" 
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-[#0A2419] border border-white/5 rounded-2xl py-4 pl-14 pr-5 text-xs focus:border-[#F7E7CE]/40 outline-none transition-all text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-[9px] font-black text-[#F7E7CE]/60 uppercase tracking-[0.2em] mb-4 block">Available Time Slots</label>
            <div className="grid grid-cols-3 gap-3">
              {slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-4 rounded-2xl text-[9px] font-black transition-all border ${
                    selectedSlot === slot 
                      ? 'bg-[#F7E7CE] text-[#0A2419] border-[#F7E7CE] shadow-2xl scale-105' 
                      : 'bg-[#0A2419] text-[#F7E7CE]/40 border-white/5 hover:border-[#F7E7CE]/20'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={handleConfirm}
          className="w-full mt-12 btn-royal py-5 rounded-2xl shadow-2xl active:scale-95 transition-all text-[11px] font-black uppercase tracking-[0.3em]"
        >
          Secure Session
        </button>
      </div>
    </div>
  );
};

export default BookingScreen;