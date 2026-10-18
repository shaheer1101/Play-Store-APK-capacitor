import React from 'react';
import { ChevronLeft, GraduationCap, Award, BookOpen, Clock, CheckCircle2 } from 'lucide-react';
import { Course } from '../types';

interface CourseDetailScreenProps {
  course: Course;
  onBack: () => void;
  onEnroll: (course: Course) => void;
}

const CourseDetailScreen: React.FC<CourseDetailScreenProps> = ({ course, onBack, onEnroll }) => {
  const highlights = course.highlights || [
    "Personalized Mentorship by Aneela",
    "Hands-on Practical Workshops",
    "International Product Access",
    "Professional Portfolio Shoot",
    "Industry-Recognized Certificate"
  ];

  return (
    <div className="animate-in slide-in-from-right-10 duration-500 pb-10">
      <button onClick={onBack} className="flex items-center gap-2 text-[#F7E7CE]/60 mb-6 hover:text-[#F7E7CE] transition-colors">
        <ChevronLeft size={20} /> <span className="text-[10px] uppercase tracking-widest font-bold">Back to Academy</span>
      </button>

      <div className="rounded-[3rem] overflow-hidden mb-8 shadow-2xl relative h-[350px] border border-white/5 glow-gold">
        <img src={course.image} className="w-full h-full object-cover" alt={course.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2419] via-transparent to-transparent"></div>
        <div className="absolute top-6 left-6">
           <span className="bg-[#F7E7CE] text-[#0A2419] px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">
             {course.level} Excellence
           </span>
        </div>
        <div className="absolute bottom-8 left-8 right-8">
           <h2 className="text-3xl font-bold text-white serif uppercase leading-tight mb-2">{course.title}</h2>
           <div className="flex items-center gap-4 text-[10px] text-[#F7E7CE]/80 font-black uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Clock size={14} /> {course.duration}</span>
              <span className="flex items-center gap-1.5"><Award size={14} /> Certified</span>
           </div>
        </div>
      </div>

      <div className="glass-card rounded-[2.5rem] p-8 mb-8 border-white/5">
        <section className="mb-10">
          <h3 className="text-sm font-black text-[#F7E7CE] uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
             <BookOpen size={16} /> The Curriculum
          </h3>
          <p className="text-xs text-[#F3F3F3]/70 leading-relaxed italic mb-8 border-l-2 border-[#F7E7CE]/30 pl-5">
            {course.description}
          </p>
        </section>

        <section className="mb-12">
          <h3 className="text-sm font-black text-[#F7E7CE] uppercase tracking-[0.4em] mb-6">Excellence Highlights</h3>
          <div className="space-y-4">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <CheckCircle2 size={18} className="text-[#F7E7CE] group-hover:scale-110 transition-transform" />
                <span className="text-xs text-white/80 font-medium">{h}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="pt-8 border-t border-white/10 flex flex-col items-center">
          <div className="flex justify-between w-full items-center mb-8">
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Program Investment</span>
            <span className="text-2xl font-bold text-[#F7E7CE] serif">Rs. {course.price.toLocaleString()}</span>
          </div>
          
          <button 
            onClick={() => {
              onEnroll(course);
              onBack();
            }}
            className="w-full btn-royal py-5 rounded-2xl flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all text-[11px] font-black uppercase tracking-[0.3em]"
          >
            Apply for Mastery <GraduationCap size={18} />
          </button>
        </div>
      </div>

      <div className="glass-card p-6 rounded-[2rem] border-white/5 bg-gradient-to-r from-[#F7E7CE]/10 to-transparent">
        <p className="text-[10px] text-[#F7E7CE]/80 font-bold uppercase tracking-widest mb-2">Need Financial Aid?</p>
        <p className="text-[11px] text-white/40 leading-relaxed italic">Merit-based scholarships are available for promising artists. Connect with our academy dean for more information.</p>
      </div>
    </div>
  );
};

export default CourseDetailScreen;