import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { HeartPredictorModal } from './HeartPredictorModal';
import { TicTacToeModal } from './TicTacToeModal';
import { PuzzleSolverModal } from './PuzzleSolverModal';
import {
  FolderGit2,
  ExternalLink,
  Github,
  Sparkles,
  Activity,
  Cpu,
  Brain,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

export const Projects: React.FC = () => {
  const [heartModalOpen, setHeartModalOpen] = useState(false);
  const [ticTacToeModalOpen, setTicTacToeModalOpen] = useState(false);
  const [puzzleModalOpen, setPuzzleModalOpen] = useState(false);

  const featuredProject = PROJECTS.find((p) => p.featured);
  const otherProjects = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 bg-[#F9F6F0] border-b border-[#E8DFD5] relative text-[#2C221E] overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#58111A]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#58111A]/5 border border-[#C5A059]/40 text-[#58111A] text-xs font-semibold tracking-wider uppercase font-sans mb-3">
              <FolderGit2 className="w-3.5 h-3.5 text-[#58111A]" />
              <span>Applied Portfolio</span>
            </div>
            <h2
              id="projects-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-[#58111A] font-serif"
            >
              Featured Projects
            </h2>
            <div className="w-14 h-1 bg-[#C5A059] rounded-full mt-3" />
          </div>
          <p className="text-sm text-[#6E5D54] max-w-md leading-relaxed">
            Hands-on machine learning implementations, search algorithms, and intelligent interactive systems.
          </p>
        </motion.div>

        {/* FEATURED PROJECT: Heart Disease Prediction & AI Diagnostic System */}
        {featuredProject && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            id="featured-project-card"
            className="mb-16 relative bg-[#FFFDF9] rounded-[32px] border-2 border-[#C5A059]/40 hover:border-[#C5A059] shadow-[0_20px_50px_-15px_rgba(88,17,26,0.08)] p-7 sm:p-10 lg:p-12 transition-all duration-300 overflow-hidden group"
          >
            {/* Elegant Burgundy & Gold Top Bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#58111A] via-[#C5A059] to-[#58111A]" />

            {/* Featured Badge & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-[#E8DFD5]">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#58111A]/5 border border-[#C5A059]/40 text-[#58111A] text-xs font-bold uppercase tracking-wider font-sans shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Featured Project • Primary ML Pipeline</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setHeartModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#58111A] hover:bg-[#7A1828] text-white text-xs font-semibold flex items-center gap-2 shadow-[0_4px_14px_rgba(88,17,26,0.2)] border border-[#C5A059]/40 transition-all cursor-pointer"
                >
                  <Activity className="w-4 h-4 text-[#DFB86C]" />
                  <span>Interactive Predictor Demo</span>
                </button>
                <a
                  href={featuredProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#F4ECE3] hover:bg-[#E8DFD5] text-[#58111A] border border-[#E8DFD5] transition-colors"
                  aria-label="GitHub Repository"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#58111A] font-serif group-hover:text-[#7A1828] transition-colors">
                    {featuredProject.title}
                  </h3>
                  <p className="mt-3 text-[#6E5D54] text-sm sm:text-base leading-relaxed font-normal">
                    {featuredProject.description}
                  </p>
                </div>

                {/* Bullets */}
                <div className="space-y-2.5 pt-1">
                  {featuredProject.details?.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C221E]">
                      <CheckCircle2 className="w-4 h-4 text-[#58111A] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="pt-2">
                  <p className="text-xs font-sans font-bold text-[#85736A] uppercase tracking-wider mb-2.5">
                    Technologies Used
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {featuredProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg text-xs font-sans font-medium text-[#58111A] bg-[#F9F6F0] border border-[#E8DFD5]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Empirical Benchmark Results */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#F4ECE3]/80 border border-[#E8DFD5] space-y-4">
                <div className="flex items-center justify-between border-b border-[#E8DFD5] pb-3">
                  <span className="text-xs font-bold font-sans text-[#58111A] uppercase tracking-wider flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#C5A059]" />
                    Empirical Benchmark Results
                  </span>
                  <span className="text-[11px] font-mono font-semibold text-[#58111A] bg-[#FFFDF9] px-2 py-0.5 rounded-md border border-[#E8DFD5]">
                    Random Forest
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {featuredProject.metrics && (
                    <>
                      <div className="p-3.5 rounded-xl bg-[#FFFDF9] border border-[#E8DFD5] text-center shadow-xs">
                        <p className="text-xs text-[#85736A] font-sans">Accuracy</p>
                        <p className="text-2xl font-bold text-[#58111A] font-serif mt-1">
                          {featuredProject.metrics.accuracy}
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#FFFDF9] border border-[#E8DFD5] text-center shadow-xs">
                        <p className="text-xs text-[#85736A] font-sans">Precision</p>
                        <p className="text-2xl font-bold text-[#58111A] font-serif mt-1">
                          {featuredProject.metrics.precision}
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#FFFDF9] border border-[#E8DFD5] text-center shadow-xs">
                        <p className="text-xs text-[#85736A] font-sans">Recall</p>
                        <p className="text-2xl font-bold text-[#58111A] font-serif mt-1">
                          {featuredProject.metrics.recall}
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#FFFDF9] border border-[#E8DFD5] text-center shadow-xs">
                        <p className="text-xs text-[#85736A] font-sans">F1-Score</p>
                        <p className="text-2xl font-bold text-[#C5A059] font-serif mt-1">
                          {featuredProject.metrics.f1Score}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <p className="text-[11px] text-[#6E5D54] text-center font-sans pt-1">
                  Evaluated across 5 models with 4 metrics on 303 clinical records
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* SECONDARY PROJECTS: Grid of Project 2 and Project 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {otherProjects.map((project, index) => {
            const isTicTacToe = project.id === 'tic-tac-toe';
            const isPuzzle = project.id === 'puzzle-solver';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                id={`project-card-${project.id}`}
                className="group relative bg-[#FFFDF9] rounded-[28px] border border-[#E8DFD5] hover:border-[#C5A059] shadow-[0_4px_20px_rgba(88,17,26,0.04)] hover:shadow-[0_15px_35px_rgba(88,17,26,0.08)] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Top Bar with Icon & Actions */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F4ECE3] border border-[#E8DFD5] flex items-center justify-center">
                      {isTicTacToe ? (
                        <Cpu className="w-5 h-5 text-[#58111A]" />
                      ) : (
                        <Brain className="w-5 h-5 text-[#58111A]" />
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (isTicTacToe) setTicTacToeModalOpen(true);
                          if (isPuzzle) setPuzzleModalOpen(true);
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-[#58111A] hover:bg-[#7A1828] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-[#C5A059]/30"
                      >
                        <span>View Interactive Demo</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#DFB86C]" />
                      </button>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-[#F4ECE3] hover:bg-[#E8DFD5] text-[#58111A] border border-[#E8DFD5] transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-[#58111A] font-serif group-hover:text-[#7A1828] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[#6E5D54] text-sm mt-2.5 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Features List */}
                  {project.features && (
                    <div className="mt-5 space-y-2">
                      <p className="text-[11px] font-sans font-bold text-[#85736A] uppercase tracking-wider">
                        Key Features & Capabilities:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {project.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs text-[#2C221E]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Comparison Points for Puzzle Solver */}
                  {project.comparison && (
                    <div className="mt-4 p-3.5 rounded-xl bg-[#F9F6F0] border border-[#E8DFD5] text-xs text-[#6E5D54] space-y-1">
                      <p className="text-[#58111A] font-semibold mb-1 font-serif">Empirical Comparison:</p>
                      {project.comparison.map((comp, cIdx) => (
                        <p key={cIdx}>• {comp}</p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tech Tags */}
                <div className="mt-6 pt-4 border-t border-[#E8DFD5]">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-xs font-sans font-medium text-[#58111A] bg-[#F9F6F0] border border-[#E8DFD5]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Modals */}
      <HeartPredictorModal isOpen={heartModalOpen} onClose={() => setHeartModalOpen(false)} />
      <TicTacToeModal isOpen={ticTacToeModalOpen} onClose={() => setTicTacToeModalOpen(false)} />
      <PuzzleSolverModal isOpen={puzzleModalOpen} onClose={() => setPuzzleModalOpen(false)} />
    </section>
  );
};
