import React, { useState, useRef, useEffect } from 'react';
import { Heart, Disc, Volume2, VolumeX, ShoppingBag } from 'lucide-react';
import { VideoItem } from '../types';

interface ViralScreenProps {
  videos: VideoItem[];
  onBook: (serviceId: string) => void;
}

const ViralScreen: React.FC<ViralScreenProps> = ({ videos, onBook }) => {
  const [muted, setMuted] = useState(true);
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());
  const [showHeartBurst, setShowHeartBurst] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggleLike = (id: string) => {
    setLikedVideos(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else {
        next.add(id);
        setShowHeartBurst(id);
        setTimeout(() => setShowHeartBurst(null), 800);
      }
      return next;
    });
  };

  const handleDoubleTap = (id: string) => {
    if (!likedVideos.has(id)) {
      handleToggleLike(id);
    } else {
      setShowHeartBurst(id);
      setTimeout(() => setShowHeartBurst(null), 800);
    }
  };

  return (
    <div 
      ref={containerRef}
      // Changed h-full to h-screen to force it to take full screen height regardless of parent padding
      className="relative w-full h-screen snap-y snap-mandatory overflow-y-scroll no-scrollbar bg-black"
    >
      {videos.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center text-[#F7E7CE]/40 italic uppercase tracking-widest text-[10px]">
          Aneela is curating new masterpieces...
        </div>
      )}

      {videos.map((vid) => (
        <div key={vid.id} className="relative w-full h-full snap-start bg-black overflow-hidden flex flex-col justify-end">
          {/* Video Element */}
          <div 
            className="absolute inset-0 z-0"
            onClick={(e) => {
              if (e.detail === 2) handleDoubleTap(vid.id);
              else setMuted(!muted);
            }}
          >
            {vid.url ? (
              <video 
                src={vid.url}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted={muted}
                playsInline
              />
            ) : (
              <img src={vid.thumbnail} className="w-full h-full object-cover brightness-50" alt="" />
            )}
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2419]/90 via-transparent to-transparent pointer-events-none"></div>

            {/* Mute Indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 animate-pulse">
               {muted ? <VolumeX className="text-white/50" size={60} /> : <Volume2 className="text-white/50" size={60} />}
            </div>
          </div>

          {/* Heart Burst Animation */}
          {showHeartBurst === vid.id && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
              <Heart 
                size={120} 
                className="text-[#F7E7CE] animate-[ping_0.8s_ease-out_forwards] fill-[#F7E7CE] drop-shadow-[0_0_20px_rgba(247,231,206,0.6)]" 
              />
            </div>
          )}

          {/* Video Information Overlay */}
          <div className="relative p-6 z-10 w-full">
            <div className="flex flex-col mb-4">
               <h4 className="text-xl font-bold text-white serif tracking-wide drop-shadow-md mb-1">{vid.title}</h4>
               <p className="text-[11px] text-[#F7E7CE] leading-relaxed mb-3 line-clamp-2 italic drop-shadow-sm">
                 {vid.description || "Witness the perfection of every stroke."}
               </p>
               
               {/* Music Ticker */}
               <div className="flex items-center gap-2 overflow-hidden w-[200px]">
                 <Disc size={12} className="text-[#F7E7CE] animate-spin shrink-0" />
                 <div className="whitespace-nowrap animate-[marquee_10s_linear_infinite] text-[9px] text-[#F7E7CE]/80 font-medium uppercase tracking-[0.2em]">
                   {vid.musicTrack || "Original Sound - Aneelas Viral Studio"} &bull; {vid.musicTrack || "Original Sound - Aneelas Viral Studio"}
                 </div>
               </div>
            </div>

            <div className="flex items-center gap-3">
              {vid.linkedServiceId && (
                <button 
                  onClick={() => onBook(vid.linkedServiceId!)}
                  className="bg-[#E1B84F] text-[#0A2419] px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl flex items-center gap-2 active:scale-95 transition-all"
                >
                  Book This Look <ShoppingBag size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 h-0.5 bg-white/10 w-full z-30">
             <div className="h-full bg-[#E1B84F] shadow-[0_0_10px_#E1B84F] animate-[progress_15s_linear_infinite]"></div>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default ViralScreen;