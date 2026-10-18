
import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, PlayCircle, Crown, MessageSquare, Bell, Quote } from 'lucide-react';
import { Service, Feedback } from '../types';
import { requestNotificationPermission } from '../services/notificationService';

interface HomeScreenProps {
  setActiveTab: (tab: string) => void;
  onBook: (service: Service) => void;
  featuredServices: Service[];
  onOpenFeedback?: () => void;
  feedbacks?: Feedback[];
}

const HomeScreen: React.FC<HomeScreenProps> = ({ setActiveTab, onBook, featuredServices, onOpenFeedback, feedbacks = [] }) => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Show prompt if permission is not determined yet
    if ('Notification' in window && Notification.permission === 'default') {
      const timer = setTimeout(() => setShowPrompt(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      setShowPrompt(false);
    }
  };

  const visibleFeedbacks = feedbacks.filter(f => f.approved !== false);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
      {showPrompt && (
        <div className="mb-6 glass-card p-5 rounded-[2rem] border-[#F7E7CE]/20 glow-gold flex items-center justify-between animate-in slide-in-from-top-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-[#0A2419]">
                <Bell size={18} />
             </div>
             <div>
               <p className="text-[10px] font-bold text-white uppercase tracking-wider">Stay Perfected</p>
               <p className="text-[8px] text-[#F7E7CE]/60 uppercase tracking-widest mt-0.5">Enable appointment reminders</p>
             </div>
          </div>
          <button 
            onClick={handleEnableNotifications}
            className="bg-[#F7E7CE] text-[#0A2419] px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest active:scale-95 transition-transform"
          >
            Enable
          </button>
        </div>
      )}

      {/* Hero Section with Professional Masterpiece Image */}
      <section className="mb-10 relative rounded-[2.5rem] overflow-hidden h-[460px] group shadow-[0_25px_60px_rgba(0,0,0,0.6)] glow-gold">
        <img 
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop" 
          alt="Editorial Bridal Transformation" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.6] group-hover:scale-105 transition-transform duration-[5s]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2419] via-transparent to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="mb-4">
            <span className="bg-[#F7E7CE] text-[#0A2419] text-[9px] font-extrabold px-5 py-2 rounded-full uppercase tracking-[0.3em] flex items-center gap-2 w-fit shadow-xl">
              <Crown size={12} /> Master Artist Studio
            </span>
          </div>
          <h2 className="text-4xl font-bold leading-none tracking-tight text-white serif uppercase">ANEELA'S <br/><span className="text-[#F7E7CE]">MAKEOVER</span></h2>
          <p className="text-[10px] text-[#F7E7CE]/70 mt-4 font-light tracking-[0.3em] italic uppercase">A Legacy of Eternal Beauty</p>
          <div className="flex gap-4 mt-8">
            <button onClick={() => setActiveTab('services')} className="btn-royal py-3.5 px-8 rounded-2xl text-[10px] flex items-center gap-2 shadow-2xl">Book Session</button>
            <button onClick={() => setActiveTab('viral')} className="bg-white/5 backdrop-blur-xl text-white font-bold py-3.5 px-6 rounded-2xl text-[10px] flex items-center gap-2 border border-white/10 uppercase tracking-widest">Cinematic</button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-8 px-1">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-[#F7E7CE] uppercase tracking-[0.2em] serif">Signature Portfolio</h3>
            <div className="h-0.5 w-12 gold-gradient mt-2 rounded-full"></div>
          </div>
          <button onClick={() => setActiveTab('services')} className="text-[9px] text-[#F7E7CE]/60 uppercase font-extrabold tracking-[0.3em]">Examine All</button>
        </div>
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-6 -mx-1 px-1">
          {featuredServices.slice(0, 5).map((s) => (
            <div key={s.id} onClick={() => onBook(s)} className="min-w-[200px] glass-card rounded-[2.2rem] p-4 flex flex-col glow-gold cursor-pointer transform hover:-translate-y-2 transition-all">
              <div className="w-full aspect-[4/5] rounded-[1.8rem] overflow-hidden mb-5">
                <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-bold text-[#F3F3F3] leading-tight uppercase tracking-tight mb-2">{s.name}</span>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#F7E7CE]">Rs. {s.price.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="relative rounded-[2.5rem] p-10 overflow-hidden border border-[#F7E7CE]/20 bg-[#124C34]/30 glow-gold mb-10 group">
        <Crown className="absolute -top-10 -right-10 text-[#F7E7CE]/5 group-hover:scale-125 transition-transform duration-[2s]" size={200} fill="currentColor" />
        <div className="relative z-10">
          <span className="text-[10px] font-bold text-[#F7E7CE]/60 uppercase tracking-[0.4em] block mb-3">Academic Excellence</span>
          <h4 className="text-3xl font-bold text-white mb-4 serif">THE ARTISTRY SCHOOL</h4>
          <p className="text-xs text-[#F7E7CE]/70 mb-8 leading-relaxed max-w-[220px] italic">Master the secrets of the world's most coveted transformations.</p>
          <button onClick={() => setActiveTab('store')} className="bg-transparent border border-[#F7E7CE] text-[#F7E7CE] px-10 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#F7E7CE] hover:text-[#0A2419] transition-all">Apply for Mastery</button>
        </div>
      </div>

      {/* Customer Feedback Section */}
      {visibleFeedbacks && visibleFeedbacks.length > 0 && (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center justify-center gap-3 mb-8">
             <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#F7E7CE]/40"></div>
             <h3 className="text-sm font-black text-[#F7E7CE] uppercase tracking-[0.3em] serif">Whispers of Perfection</h3>
             <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#F7E7CE]/40"></div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto no-scrollbar px-2 pb-4 -mx-2 snap-x snap-mandatory">
            {visibleFeedbacks.map((fb, idx) => (
               <div 
                 key={fb.id} 
                 className="min-w-[280px] glass-card p-6 rounded-[2rem] border-white/5 glow-gold snap-center flex flex-col relative group"
                 style={{ animationDelay: `${idx * 100}ms` }}
               >
                  <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity">
                    <Quote size={40} className="text-[#F7E7CE]" />
                  </div>
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} fill={i < fb.rating ? "#F7E7CE" : "transparent"} className={i < fb.rating ? "text-[#F7E7CE]" : "text-white/10"} />
                    ))}
                  </div>
                  
                  <p className="text-[11px] text-white/80 leading-relaxed italic mb-6 line-clamp-4 relative z-10">
                    "{fb.message}"
                  </p>
                  
                  <div className="mt-auto flex items-center gap-3 pt-4 border-t border-white/5">
                     <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F7E7CE] to-[#C9A23A] flex items-center justify-center text-[#0A2419] font-black text-[10px] shadow-lg">
                        {fb.userName.charAt(0)}
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-[#F7E7CE] uppercase tracking-wider">{fb.userName}</p>
                        <p className="text-[8px] text-white/30 uppercase tracking-widest">{fb.date.split(',')[0]}</p>
                     </div>
                  </div>
               </div>
            ))}
          </div>
        </section>
      )}

      <div className="glass-card p-8 rounded-[2.5rem] border-[#F7E7CE]/10 flex items-center justify-between mb-10 glow-gold">
        <div>
           <h4 className="text-sm font-bold text-white uppercase tracking-widest serif">Your Opinion Matters</h4>
           <p className="text-[9px] text-[#F7E7CE]/60 uppercase tracking-widest mt-1">Help us curate excellence</p>
        </div>
        <button 
          onClick={onOpenFeedback}
          className="w-12 h-12 rounded-2xl bg-[#F7E7CE]/10 border border-[#F7E7CE]/20 flex items-center justify-center text-[#F7E7CE] hover:bg-[#F7E7CE] hover:text-[#0A2419] transition-all"
        >
          <MessageSquare size={20} />
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
