import React from 'react';
import { TRAINING_DATA } from '../data/portfolioData';
import { Award, Calendar, Building2, Terminal, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const Training: React.FC = () => {
  return (
    <section id="training" className="py-24 bg-[#F4ECE3]/50 border-b border-[#E8DFD5] relative text-[#2C221E] overflow-hidden">
      {/* Background soft lighting */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#58111A]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#58111A]/5 border border-[#C5A059]/40 text-[#58111A] text-xs font-semibold tracking-wider uppercase font-sans mb-3">
            <Award className="w-3.5 h-3.5 text-[#58111A]" />
            <span>Professional Specialization</span>
          </div>
          <h2
            id="training-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[#58111A] font-serif"
          >
            Training & Experience
          </h2>
          <div className="w-14 h-1 bg-[#C5A059] rounded-full mt-3" />
        </motion.div>

        {/* Training Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          id="training-card-depi"
          className="group relative bg-[#FFFDF9] rounded-[32px] p-7 sm:p-10 border border-[#E8DFD5] shadow-[0_15px_45px_-10px_rgba(88,17,26,0.06)] hover:border-[#C5A059] transition-all duration-300 overflow-hidden"
        >
          {/* Subtle top accent gradient */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#58111A] via-[#C5A059] to-[#58111A]" />

          <div className="relative z-10">
            {/* Header info bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-[#E8DFD5]">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-[#58111A] text-[#FFFDF9] font-bold text-xs font-sans tracking-wide">
                  DEPI – MCIT
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#58111A] flex items-center gap-1.5 font-serif">
                  <Building2 className="w-4 h-4 text-[#C5A059]" />
                  {TRAINING_DATA.organization}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-[#6E5D54]">
                <span className="flex items-center gap-1.5 bg-[#F9F6F0] px-3 py-1.5 rounded-lg border border-[#E8DFD5] font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#58111A]" />
                  {TRAINING_DATA.date}
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#58111A]/5 text-[#58111A] border border-[#C5A059]/30 font-medium">
                  {TRAINING_DATA.format}
                </span>
              </div>
            </div>

            {/* Program Title & Exact Description */}
            <div className="mb-8 space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-[#58111A] font-serif group-hover:text-[#7A1828] transition-colors">
                {TRAINING_DATA.program}
              </h3>
              <p className="text-[#6E5D54] text-sm sm:text-base leading-relaxed max-w-4xl font-normal">
                {TRAINING_DATA.description}
              </p>
            </div>

            {/* Training Topics */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-4 h-4 text-[#C5A059]" />
                <h4 className="text-xs font-bold text-[#58111A] uppercase tracking-wider font-sans">
                  Training Topics ({TRAINING_DATA.topics.length} Areas)
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {TRAINING_DATA.topics.map((topic, index) => (
                  <div
                    key={topic}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F9F6F0] border border-[#E8DFD5] hover:border-[#C5A059] text-xs text-[#2C221E] font-medium transition-all"
                  >
                    <span className="w-5 h-5 rounded-md bg-[#FFFDF9] border border-[#E8DFD5] text-[#58111A] font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <span className="truncate">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
