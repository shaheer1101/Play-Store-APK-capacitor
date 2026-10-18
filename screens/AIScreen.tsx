
import React, { useState, useRef } from 'react';
import { getMakeupAdvice } from '../services/geminiService';
import { Camera, Sparkles, Send, User, Bot, Loader2 } from 'lucide-react';

const AIScreen: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [history, setHistory] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "Hello Gorgeous! I'm your AI Beauty Consultant at Aneela's MakeOver. Tell me about an event or style you're interested in, or share a photo for personalized advice!" }
  ]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if (!prompt.trim()) return;
    
    const userMsg = prompt;
    setPrompt('');
    setHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const advice = await getMakeupAdvice(userMsg);
    setHistory(prev => [...prev, { role: 'bot', text: advice }]);
    setLoading(false);
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For demo, we'll just acknowledge the upload
      setHistory(prev => [...prev, { role: 'user', text: "[Photo Uploaded]" }]);
      setHistory(prev => [...prev, { role: 'bot', text: "That's a lovely photo! Based on your features, I recommend a warm-toned palette with a hint of gold shimmer on the eyelids to accentuate your natural glow." }]);
    }
  };

  return (
    <div className="h-full flex flex-col animate-in zoom-in-95 duration-500">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold text-[#E1B84F] flex items-center justify-center gap-2">
          <Sparkles className="text-[#E1B84F]" /> AI Beauty Concierge
        </h2>
        <p className="text-xs text-[#B7C1BC]">Personalized style suggestions by Gemini</p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-4 p-2 no-scrollbar min-h-[400px]">
        {history.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 flex gap-3 ${
              msg.role === 'user' 
                ? 'bg-[#E1B84F] text-[#0E3F2A] rounded-tr-none' 
                : 'bg-[#124C34] text-[#E6E6E6] border border-white/5 rounded-tl-none'
            }`}>
              <div className="shrink-0 mt-1">
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} className="text-[#E1B84F]" />}
              </div>
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#124C34] rounded-2xl p-4 flex gap-2 rounded-tl-none border border-white/5">
              <Loader2 size={16} className="animate-spin text-[#E1B84F]" />
              <span className="text-xs italic text-[#B7C1BC]">Aneela is thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="mt-6 flex gap-2 items-center bg-[#124C34] p-3 rounded-2xl border border-white/10 shadow-inner">
        <input 
          type="file" 
          hidden 
          ref={fileInputRef} 
          accept="image/*"
          onChange={handleFileChange}
        />
        <button 
          onClick={handlePhotoClick}
          className="p-3 bg-[#0E3F2A] text-[#E1B84F] rounded-xl hover:scale-105 active:scale-95 transition-all"
        >
          <Camera size={20} />
        </button>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask for style tips..."
          className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-white placeholder:text-white/30"
        />
        <button 
          onClick={handleSend}
          disabled={loading || !prompt.trim()}
          className={`p-3 rounded-xl transition-all ${
            loading || !prompt.trim() 
              ? 'bg-gray-600 text-gray-400' 
              : 'bg-[#E1B84F] text-[#0E3F2A] hover:scale-105 active:scale-95'
          }`}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default AIScreen;
