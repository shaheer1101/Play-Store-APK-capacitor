import React, { useState } from 'react';
import { Download, Share, PlusSquare, X, Smartphone } from 'lucide-react';
import { usePWAInstall } from './usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full gold-gradient text-[#0A2419] text-xs font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all"
        title="Install Aneela's App"
      >
        <Download size={14} strokeWidth={2.5} />
        <span className="tracking-wider uppercase text-[10px]">Install App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#F7E7CE]/40 bg-[#124C34]/60 text-[#F7E7CE] text-xs font-medium hover:bg-[#F7E7CE] hover:text-[#0A2419] active:scale-95 transition-all"
        >
          <Smartphone size={13} />
          <span className="text-[10px] tracking-wider uppercase">Install</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in">
            <div className="w-full max-w-sm rounded-3xl bg-[#0A2419] border border-[#F7E7CE]/30 p-6 shadow-2xl relative text-center">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 text-[#F7E7CE]/60 hover:text-white p-1"
              >
                <X size={20} />
              </button>

              <div className="w-14 h-14 mx-auto rounded-2xl overflow-hidden border border-[#F7E7CE]/30 mb-4 shadow-lg">
                <img src="/pwa-192x192.png" alt="Aneela's MakeOver" className="w-full h-full object-cover" />
              </div>

              <h3 className="text-lg font-bold serif text-[#F7E7CE] mb-2">Install Aneela's MakeOver</h3>
              <p className="text-xs text-white/80 leading-relaxed mb-6">
                Install this app on your iPhone for the full fullscreen salon experience:
              </p>

              <div className="flex flex-col gap-3 text-left text-xs bg-white/5 rounded-2xl p-4 border border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#E1B84F]/20 text-[#E1B84F] flex items-center justify-center shrink-0">
                    <Share size={14} />
                  </div>
                  <span>1. Tap the <strong>Share</strong> icon in the Safari bar.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#E1B84F]/20 text-[#E1B84F] flex items-center justify-center shrink-0">
                    <PlusSquare size={14} />
                  </div>
                  <span>2. Scroll down &amp; tap <strong>Add to Home Screen</strong>.</span>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-3 rounded-xl gold-gradient text-[#0A2419] text-xs font-bold uppercase tracking-wider shadow-lg active:scale-95 transition-all"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
