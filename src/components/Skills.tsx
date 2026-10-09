import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import {
  Code2,
  Database,
  LineChart,
  Brain,
  Boxes,
  Wrench,
  Globe,
  Palette,
  Languages,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  programming: <Code2 className="w-5 h-5 text-[#58111A]" />,
  'data-science': <Database className="w-5 h-5 text-[#58111A]" />,
  'data-visualization': <LineChart className="w-5 h-5 text-[#58111A]" />,
  'ai-algorithms': <Brain className="w-5 h-5 text-[#58111A]" />,
  'programming-concepts': <Boxes className="w-5 h-5 text-[#58111A]" />,
  tools: <Wrench className="w-5 h-5 text-[#58111A]" />,
  'web-technologies': <Globe className="w-5 h-5 text-[#58111A]" />,
  'presentations-design': <Palette className="w-5 h-5 text-[#58111A]" />,
  languages: <Languages className="w-5 h-5 text-[#58111A]" />
};

export const Skills: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredCategories =
    selectedFilter === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === selectedFilter);

  return (
    <section id="skills" className="py-24 bg-[#F9F6F0] border-b border-[#E8DFD5] relative text-[#2C221E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#58111A]/5 border border-[#C5A059]/40 text-[#58111A] text-xs font-semibold tracking-wider uppercase font-sans mb-3">
              <Code2 className="w-3.5 h-3.5 text-[#58111A]" />
              <span>Competencies & Stack</span>
            </div>
            <h2
              id="skills-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-[#58111A] font-serif"
            >
              Technical Skills
            </h2>
            <div className="w-14 h-1 bg-[#C5A059] rounded-full mt-3" />
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-[#58111A] text-white shadow-[0_4px_14px_rgba(88,17,26,0.2)] border border-[#C5A059]/40'
                  : 'bg-[#FFFDF9] text-[#6E5D54] hover:text-[#58111A] border border-[#E8DFD5] hover:border-[#C5A059]/50'
              }`}
            >
              All Skills
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  selectedFilter === cat.id
                    ? 'bg-[#58111A] text-white shadow-[0_4px_14px_rgba(88,17,26,0.2)] border border-[#C5A059]/40'
                    : 'bg-[#FFFDF9] text-[#6E5D54] hover:text-[#58111A] border border-[#E8DFD5] hover:border-[#C5A059]/50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCategories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              id={`skills-card-${category.id}`}
              className="group p-6 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD5] hover:border-[#C5A059] shadow-[0_4px_20px_rgba(88,17,26,0.03)] hover:shadow-[0_12px_30px_rgba(88,17,26,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#E8DFD5]">
                  <div className="w-10 h-10 rounded-xl bg-[#F4ECE3] border border-[#E8DFD5] flex items-center justify-center">
                    {CATEGORY_ICONS[category.id] || <Code2 className="w-5 h-5 text-[#58111A]" />}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#58111A] font-serif group-hover:text-[#7A1828] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-[11px] font-sans text-[#85736A]">
                      {category.skills.length} item{category.skills.length > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Skills Pill Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#2C221E] bg-[#F9F6F0] border border-[#E8DFD5] hover:border-[#C5A059] hover:bg-[#FFFDF9] transition-all font-sans"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
