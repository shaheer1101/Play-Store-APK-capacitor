
import React from 'react';
import { MOCK_COURSES } from '../constants';
import { GraduationCap, Award, BookOpen, ExternalLink } from 'lucide-react';

const AcademyScreen: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-500 pb-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#E1B84F]">Beauty Academy</h2>
        <p className="text-sm text-[#B7C1BC]">Learn the art of perfection from the best.</p>
      </div>

      <div className="grid gap-6">
        {MOCK_COURSES.map((course) => (
          <div key={course.id} className="glass-card rounded-2xl overflow-hidden flex flex-col shadow-xl">
            <div className="h-44 relative">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E3F2A] to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-[#E1B84F] text-[#0E3F2A] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {course.level}
                </span>
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-xs text-[#B7C1BC] mb-4 line-clamp-2">{course.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-[10px] text-[#E6E6E6]">
                  <GraduationCap size={16} className="text-[#E1B84F]" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[#E6E6E6]">
                  <Award size={16} className="text-[#E1B84F]" />
                  <span>Certified Program</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[#E6E6E6]">
                  <BookOpen size={16} className="text-[#E1B84F]" />
                  <span>Live Sessions</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#B7C1BC] uppercase">Investment</span>
                  <span className="text-lg font-bold text-[#E1B84F]">Rs. {course.price.toLocaleString()}</span>
                </div>
                <button className="flex items-center gap-2 bg-[#124C34] border border-[#E1B84F]/50 text-[#E1B84F] px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#E1B84F] hover:text-[#0E3F2A] transition-all">
                  Enroll Now <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-[#E1B84F]/10 to-transparent p-6 rounded-2xl border border-[#E1B84F]/20">
        <h4 className="text-lg font-bold text-[#E1B84F] mb-1">Scholarships Available</h4>
        <p className="text-sm text-[#B7C1BC] mb-4">We support talented artists. Apply for our merit-based financial aid program.</p>
        <button className="text-xs font-bold text-[#E1B84F] underline">Apply Now</button>
      </div>
    </div>
  );
};

export default AcademyScreen;
