import React from 'react';
import { ABOUT_CONTENT } from '../data/portfolioData';
import { Brain, Cpu, Database, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#F4ECE3]/50 border-y border-[#E8DFD5] relative overflow-hidden text-[#2C221E]">
      {/* Ambient background soft warmth */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#C5A059]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#58111A]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative bg-[#FFFDF9] rounded-[32px] border border-[#E8DFD5] shadow-[0_20px_50px_-15px_rgba(88,17,26,0.06)] p-8 sm:p-12 lg:p-14 overflow-hidden"
        >
          {/* Subtle luxury top gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#58111A] via-[#C5A059] to-[#58111A]" />

          {/* Section Header */}
          <div className="mb-10 pb-6 border-b border-[#E8DFD5] flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#58111A]/5 text-[#58111A] text-xs font-semibold tracking-wider uppercase font-sans mb-3 border border-[#C5A059]/40">
                <Brain className="w-3.5 h-3.5 text-[#58111A]" />
                <span>Profile & Focus</span>
              </div>
              <h2
                id="about-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-[#58111A] font-serif"
              >
                {ABOUT_CONTENT.title}
              </h2>
              <div className="w-14 h-1 bg-[#C5A059] rounded-full mt-3" />
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-[#58111A] bg-[#F4ECE3] px-3.5 py-1.5 rounded-lg border border-[#E8DFD5]">
              <span className="w-2 h-2 rounded-full bg-[#58111A]" />
              <span>AI & Data Science • Machine Learning</span>
            </div>
          </div>

          {/* Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Exact About Text */}
            <div className="lg:col-span-8 space-y-6">
              <p
                id="about-text"
                className="text-[#6E5D54] text-base sm:text-lg leading-relaxed font-normal"
              >
                {ABOUT_CONTENT.text}
              </p>

              {/* Core Pillars */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#F9F6F0] border border-[#E8DFD5] hover:border-[#C5A059]/60 transition-colors">
                  <div className="flex items-center gap-2.5 text-[#58111A] text-sm font-bold mb-1.5 font-serif">
                    <Database className="w-4 h-4 text-[#C5A059]" />
                    <span>Data & Exploration</span>
                  </div>
                  <p className="text-xs text-[#6E5D54] leading-relaxed">
                    Data preprocessing, visualization, and exploratory analysis with NumPy and Pandas.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#F9F6F0] border border-[#E8DFD5] hover:border-[#C5A059]/60 transition-colors">
                  <div className="flex items-center gap-2.5 text-[#58111A] text-sm font-bold mb-1.5 font-serif">
                    <Cpu className="w-4 h-4 text-[#C5A059]" />
                    <span>Machine Learning</span>
                  </div>
                  <p className="text-xs text-[#6E5D54] leading-relaxed">
                    Practical model development, evaluation, and tuning utilizing Scikit-learn.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-[#F4ECE3]/70 border border-[#E8DFD5] space-y-4">
              <h3 className="text-xs font-bold text-[#58111A] uppercase tracking-wider flex items-center gap-2 font-sans">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>Specialization Areas</span>
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFFDF9] border border-[#E8DFD5] text-[#2C221E] shadow-xs">
                  <span className="font-medium">Machine Learning</span>
                  <span className="text-[#58111A] font-mono font-semibold">Scikit-learn</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFFDF9] border border-[#E8DFD5] text-[#2C221E] shadow-xs">
                  <span className="font-medium">Data Preprocessing</span>
                  <span className="text-[#58111A] font-mono font-semibold">NumPy & Pandas</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFFDF9] border border-[#E8DFD5] text-[#2C221E] shadow-xs">
                  <span className="font-medium">Data Visualization</span>
                  <span className="text-[#58111A] font-mono font-semibold">Matplotlib & Seaborn</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFFDF9] border border-[#E8DFD5] text-[#2C221E] shadow-xs">
                  <span className="font-medium">AI & Cloud Learning</span>
                  <span className="text-[#C5A059] font-mono font-semibold">Azure AI & MLOps</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
