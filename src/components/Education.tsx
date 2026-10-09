import React from 'react';
import { EDUCATION_DATA } from '../data/portfolioData';
import { GraduationCap, Calendar, MapPin, BookOpen, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 bg-[#F4ECE3]/50 border-b border-[#E8DFD5] relative text-[#2C221E] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#58111A]/5 border border-[#C5A059]/40 text-[#58111A] text-xs font-semibold tracking-wider uppercase font-sans mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-[#58111A]" />
            <span>Academic Background</span>
          </div>
          <h2
            id="education-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[#58111A] font-serif"
          >
            Education
          </h2>
          <div className="w-14 h-1 bg-[#C5A059] rounded-full mt-3" />
        </motion.div>

        {/* Timeline Layout */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#C5A059]/40 space-y-12">
          {/* Node marker */}
          <div className="relative">
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-[#FFFDF9] border-2 border-[#58111A] flex items-center justify-center shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059]" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              id="education-card-fcis"
              className="group bg-[#FFFDF9] rounded-[28px] border border-[#E8DFD5] hover:border-[#C5A059] shadow-[0_10px_35px_-10px_rgba(88,17,26,0.06)] p-7 sm:p-9 transition-all duration-300"
            >
              {/* Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5 pb-5 border-b border-[#E8DFD5]">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-[#58111A]/5 text-[#58111A] border border-[#C5A059]/40 font-sans">
                  Major: {EDUCATION_DATA.major}
                </span>

                <div className="flex items-center gap-4 text-xs text-[#6E5D54]">
                  <span className="flex items-center gap-1.5 bg-[#F9F6F0] px-2.5 py-1 rounded-md border border-[#E8DFD5]">
                    <Calendar className="w-3.5 h-3.5 text-[#58111A]" />
                    {EDUCATION_DATA.date}
                  </span>
                  <span className="flex items-center gap-1.5 bg-[#F9F6F0] px-2.5 py-1 rounded-md border border-[#E8DFD5]">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                    {EDUCATION_DATA.location}
                  </span>
                </div>
              </div>

              {/* Degree & University */}
              <div className="space-y-1.5 mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-[#58111A] font-serif group-hover:text-[#7A1828] transition-colors">
                  {EDUCATION_DATA.degree}
                </h3>
                <p className="text-sm sm:text-base font-semibold text-[#6E5D54]">
                  {EDUCATION_DATA.university}
                </p>
              </div>

              {/* Relevant Coursework */}
              <div className="pt-6 border-t border-[#E8DFD5]">
                <div className="flex items-center gap-2 mb-3.5">
                  <BookOpen className="w-4 h-4 text-[#C5A059]" />
                  <h4 className="text-xs font-bold text-[#58111A] uppercase tracking-wider font-sans">
                    Relevant Coursework
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#2C221E]">
                  {EDUCATION_DATA.coursework.map((course) => (
                    <div
                      key={course}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F9F6F0] border border-[#E8DFD5] hover:border-[#C5A059] transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#58111A] shrink-0" />
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
