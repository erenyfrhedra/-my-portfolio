import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#F4ECE3] border-t border-[#E8DFD5] py-12 text-[#6E5D54]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <p className="text-lg font-bold text-[#58111A] font-serif tracking-wide">
            {PERSONAL_INFO.name}
          </p>
          <p className="text-xs text-[#58111A] font-sans font-medium">
            {PERSONAL_INFO.title} • {PERSONAL_INFO.location}
          </p>
          <p className="text-xs text-[#85736A]">
            Faculty of Computers and Artificial Intelligence, Assiut University
          </p>
        </div>

        {/* Social Icons & Back to Top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#FFFDF9] border border-[#E8DFD5] text-[#58111A] hover:bg-[#58111A] hover:text-white hover:border-[#58111A] transition-colors shadow-xs"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              id="footer-linkedin-link"
              href={PERSONAL_INFO.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn Profile: https://www.linkedin.com/in/ereny-elkomos-hedra/"
              className="p-2.5 rounded-xl bg-[#FFFDF9] border border-[#E8DFD5] text-[#58111A] hover:bg-[#58111A] hover:text-white hover:border-[#58111A] transition-colors shadow-xs"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2.5 rounded-xl bg-[#FFFDF9] border border-[#E8DFD5] text-[#58111A] hover:bg-[#58111A] hover:text-white hover:border-[#58111A] transition-colors shadow-xs"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#58111A] hover:text-white bg-[#FFFDF9] hover:bg-[#58111A] border border-[#E8DFD5] hover:border-[#58111A] rounded-xl transition-all duration-200 cursor-pointer shadow-xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#C5A059]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
