import React from 'react';
import { ChevronLeft, Clock, ArrowRight } from 'lucide-react';
import { Service } from '../types';

interface ServiceDetailScreenProps {
  service: Service;
  onBack: () => void;
  onBook: (service: Service) => void;
}

const ServiceDetailScreen: React.FC<ServiceDetailScreenProps> = ({ service, onBack, onBook }) => {
  return (
    <div className="animate-in slide-in-from-right-10 duration-500 pb-10">
      <button onClick={onBack} className="flex items-center gap-2 text-[#F7E7CE]/60 mb-6 hover:text-[#F7E7CE] transition-colors">
        <ChevronLeft size={20} /> <span className="text-xs uppercase tracking-widest font-bold">Back to Services</span>
      </button>

      <div className="rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl relative h-[300px]">
        <img src={service.image} className="w-full h-full object-cover" alt={service.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2419] via-transparent to-transparent"></div>
        <div className="absolute bottom-6 left-6">
           <span className="bg-[#F7E7CE] text-[#0A2419] px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest mb-2 inline-block">
             {service.category}
           </span>
           <h2 className="text-3xl font-bold text-white serif">{service.name}</h2>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6 mb-8 border-white/5">
        <div className="flex justify-between items-center mb-6">
           <div className="flex flex-col">
              <span className="text-[10px] text-[#F7E7CE]/60 uppercase tracking-widest mb-1">Duration</span>
              <div className="flex items-center gap-2 text-[#F7E7CE] font-bold">
                 <Clock size={16} /> {service.duration}
              </div>
           </div>
           <div className="flex flex-col text-right">
              <span className="text-[10px] text-[#F7E7CE]/60 uppercase tracking-widest mb-1">Starting Price</span>
              <div className="text-xl font-bold text-[#F7E7CE]">Rs. {service.price.toLocaleString()}</div>
           </div>
        </div>

        <p className="text-sm text-[#F3F3F3]/80 leading-relaxed italic mb-8 border-l-2 border-[#F7E7CE]/30 pl-4">
          {service.description}
        </p>

        <button 
          onClick={() => onBook(service)}
          className="w-full btn-royal py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl"
        >
          Reserve This Experience <ArrowRight size={18} />
        </button>
      </div>

      {service.transformations && service.transformations.length > 0 && (
        <section className="mb-10">
          <h3 className="text-lg font-bold text-[#F7E7CE] serif mb-6 flex items-center gap-2">
            <div className="h-px w-8 bg-[#F7E7CE]/30"></div> 
            The Transformation
          </h3>
          <div className="space-y-6">
            {service.transformations.map((trans, idx) => (
              <div key={idx} className="glass-card p-3 rounded-[2rem] border-white/5">
                <div className="flex gap-2 h-64">
                   <div className="flex-1 relative rounded-2xl overflow-hidden">
                      <img src={trans.before} className="w-full h-full object-cover" alt="Before" />
                      <span className="absolute top-3 left-3 bg-black/60 px-2 py-1 rounded text-[8px] font-bold uppercase tracking-widest text-white">Before</span>
                   </div>
                   <div className="flex-1 relative rounded-2xl overflow-hidden">
                      <img src={trans.after} className="w-full h-full object-cover" alt="After" />
                      <span className="absolute top-3 right-3 bg-[#F7E7CE] text-[#0A2419] px-2 py-1 rounded text-[8px] font-bold uppercase tracking-widest">After</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ServiceDetailScreen;