import React, { useState } from 'react';
import { ChevronLeft, MessageSquare, Star, Send, CheckCircle } from 'lucide-react';
import { Feedback } from '../types';

interface FeedbackScreenProps {
  onBack: () => void;
  onSubmit: (feedback: Feedback) => void;
}

const FeedbackScreen: React.FC<FeedbackScreenProps> = ({ onBack, onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (name && message) {
      const feedback: Feedback = {
        id: Date.now().toString(),
        userName: name,
        userPhone: phone,
        message: message,
        date: new Date().toLocaleString(),
        rating: rating
      };
      onSubmit(feedback);
      setSubmitted(true);
      setTimeout(onBack, 3000);
    } else {
      alert("Please share your name and thoughts with us.");
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center animate-in zoom-in-95">
        <div className="w-24 h-24 rounded-full bg-[#F7E7CE]/10 border border-[#F7E7CE]/20 flex items-center justify-center mb-8">
          <CheckCircle size={56} className="text-[#F7E7CE]" />
        </div>
        <h2 className="text-2xl font-bold text-[#F7E7CE] mb-3 serif uppercase">Gratitude!</h2>
        <p className="text-[#F7E7CE]/60 text-xs italic tracking-widest max-w-[220px]">Your voice is the melody to our perfection.</p>
      </div>
    );
  }

  return (
    <div className="animate-in slide-in-from-bottom-10 duration-700 pb-10">
      <button onClick={onBack} className="flex items-center gap-2 text-[#F7E7CE]/50 mb-8 hover:text-[#F7E7CE] transition-colors">
        <ChevronLeft size={20} /> <span className="text-[10px] font-bold uppercase tracking-widest">Return Home</span>
      </button>

      <div className="glass-card rounded-[3rem] p-8 glow-gold border-white/5 relative">
        <div className="flex flex-col items-center mb-10 text-center">
           <div className="w-16 h-16 rounded-full bg-[#F7E7CE]/10 flex items-center justify-center mb-4 border border-[#F7E7CE]/20">
             <MessageSquare className="text-[#F7E7CE]" size={28} />
           </div>
           <h2 className="text-2xl font-bold text-white serif uppercase tracking-widest">Share Your Experience</h2>
           <p className="text-[10px] text-[#F7E7CE]/50 uppercase tracking-[0.3em] mt-2 italic">Refining Perfection through Your Vision</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-[9px] font-black text-[#F7E7CE]/60 uppercase tracking-[0.2em] mb-2.5 block">Your Name</label>
            <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Full Name" className="w-full bg-[#0A2419] border border-white/5 rounded-2xl py-4 px-6 text-xs text-white outline-none focus:border-[#F7E7CE]/40" />
          </div>

          <div>
            <label className="text-[9px] font-black text-[#F7E7CE]/60 uppercase tracking-[0.2em] mb-2.5 block">Mobile No. (Optional)</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="03xx-xxxxxxx" className="w-full bg-[#0A2419] border border-white/5 rounded-2xl py-4 px-6 text-xs text-white outline-none focus:border-[#F7E7CE]/40" />
          </div>

          <div>
            <label className="text-[9px] font-black text-[#F7E7CE]/60 uppercase tracking-[0.2em] mb-4 block">Satisfaction Level</label>
            <div className="flex gap-4 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)} className="transition-transform active:scale-125">
                  <Star size={24} fill={star <= rating ? "#F7E7CE" : "transparent"} className={star <= rating ? "text-[#F7E7CE]" : "text-white/10"} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[9px] font-black text-[#F7E7CE]/60 uppercase tracking-[0.2em] mb-2.5 block">Your Message</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell us about your transformation..." className="w-full bg-[#0A2419] border border-white/5 rounded-2xl py-4 px-6 text-xs text-white outline-none focus:border-[#F7E7CE]/40 h-32 resize-none" />
          </div>
        </div>

        <button 
          onClick={handleSubmit}
          className="w-full mt-10 btn-royal py-5 rounded-2xl flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all text-[11px] font-black uppercase tracking-[0.3em]"
        >
          Submit Feedback <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default FeedbackScreen;