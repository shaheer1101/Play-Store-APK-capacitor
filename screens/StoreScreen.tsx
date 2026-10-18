
import React, { useState } from 'react';
import { Package, GraduationCap, Plus, Eye } from 'lucide-react';
import { Product, Course } from '../types';

interface StoreScreenProps {
  products: Product[];
  courses: Course[];
  onAddToCart: (item: any) => void;
  onViewProduct: (product: Product) => void;
  onViewCourse: (course: Course) => void;
}

const StoreScreen: React.FC<StoreScreenProps> = ({ products, courses, onAddToCart, onViewProduct, onViewCourse }) => {
  const [tab, setTab] = useState<'products' | 'courses'>('products');

  return (
    <div className="animate-in fade-in duration-700 pb-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#F7E7CE] serif uppercase tracking-widest">Luxury Items</h2>
        <p className="text-xs text-[#F7E7CE]/60 uppercase tracking-widest mt-1">Exquisite Selection of Artifacts</p>
      </div>

      <div className="flex gap-2 mb-10 bg-[#124C34]/30 p-2 rounded-[2rem] border border-white/5 glow-gold">
        <button 
          onClick={() => setTab('products')}
          className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[1.5rem] text-[10px] font-bold uppercase tracking-widest transition-all ${
            tab === 'products' ? 'bg-[#F7E7CE] text-[#0A2419] shadow-xl' : 'text-[#F7E7CE]/60'
          }`}
        >
          <Package size={16} /> Cosmetics
        </button>
        <button 
          onClick={() => setTab('courses')}
          className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[1.5rem] text-[10px] font-bold uppercase tracking-widest transition-all ${
            tab === 'courses' ? 'bg-[#F7E7CE] text-[#0A2419] shadow-xl' : 'text-[#F7E7CE]/60'
          }`}
        >
          <GraduationCap size={16} /> Academy
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {tab === 'products' ? (
          products.map((prod) => (
            <div key={prod.id} onClick={() => onViewProduct(prod)} className="glass-card rounded-[2rem] overflow-hidden p-4 border-white/5 flex flex-col group glow-gold cursor-pointer transform hover:-translate-y-1 transition-all">
              <div className="relative aspect-square overflow-hidden rounded-[1.5rem] mb-5">
                <img src={prod.image} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" alt="" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Eye size={24} className="text-white" />
                </div>
              </div>
              <h4 className="text-[11px] font-bold text-[#F3F3F3] line-clamp-1 mb-1 uppercase tracking-tighter">{prod.name}</h4>
              <p className="text-[9px] text-[#F7E7CE]/60 mb-4 line-clamp-1 italic">{prod.description}</p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-sm font-bold text-[#F7E7CE]">Rs. {prod.price}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(prod);
                  }} 
                  className="w-9 h-9 rounded-full gold-gradient text-[#0A2419] flex items-center justify-center active:scale-90 shadow-lg"
                >
                  <Plus size={16} strokeWidth={3} />
                </button>
              </div>
            </div>
          ))
        ) : (
          courses.map((course) => (
            <div key={course.id} onClick={() => onViewCourse(course)} className="col-span-2 glass-card rounded-[2.5rem] overflow-hidden p-5 border-white/5 flex gap-6 glow-gold transition-all hover:border-[#F7E7CE]/40 cursor-pointer">
              <div className="w-32 h-32 shrink-0 overflow-hidden rounded-[1.8rem] relative">
                <img src={course.image} className="w-full h-full object-cover" alt="" />
                <div className="absolute top-2 left-2 bg-[#F7E7CE] text-[#0A2419] text-[7px] font-black px-2 py-1 rounded-full uppercase tracking-tighter">
                  {course.level}
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h4 className="text-lg font-bold text-[#F3F3F3] serif mb-1">{course.title}</h4>
                  <p className="text-[10px] text-[#F7E7CE]/60 mb-3 line-clamp-2 italic">{course.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-md font-bold text-[#F7E7CE]">Rs. {course.price.toLocaleString()}</span>
                  <div className="bg-[#F7E7CE] text-[#0A2419] px-5 py-2.5 rounded-2xl text-[8px] font-black uppercase tracking-widest shadow-xl">Profile</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StoreScreen;
