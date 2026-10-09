import React from 'react';
import { X, Printer, Mail, MapPin, GraduationCap, Linkedin, Github, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO, ABOUT_CONTENT, SKILL_CATEGORIES, PROJECTS, EDUCATION_DATA, TRAINING_DATA, resolveImageUrl } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [resumeAvatar, setResumeAvatar] = React.useState<string>(() => {
    try {
      const saved = localStorage.getItem('ereny_user_portrait');
      if (saved && saved.startsWith('data:image')) return saved;
    } catch {
      // ignore
    }
    return resolveImageUrl(PERSONAL_INFO.profileImage);
  });

  React.useEffect(() => {
    const handlePhotoUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<string | null>;
      if (customEvent.detail) {
        setResumeAvatar(customEvent.detail);
      } else {
        setResumeAvatar(resolveImageUrl(PERSONAL_INFO.profileImage));
      }
    };

    window.addEventListener('ereny_photo_updated', handlePhotoUpdate);
    return () => window.removeEventListener('ereny_photo_updated', handlePhotoUpdate);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        id="resume-viewer-modal"
        className="bg-[#FFFDF9] w-full max-w-3xl rounded-[28px] shadow-2xl border border-[#C5A059]/40 overflow-hidden flex flex-col max-h-[92vh] text-[#2C221E]"
      >
        {/* Modal Controls Bar */}
        <div className="px-6 py-4 border-b border-[#E8DFD5] flex items-center justify-between bg-[#F4ECE3]">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#58111A]" />
            <span className="text-xs font-bold text-[#58111A] uppercase tracking-wider font-sans">
              Curriculum Vitae Preview • {PERSONAL_INFO.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#58111A] hover:bg-[#7A1828] rounded-xl cursor-pointer transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-[#DFB86C]" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#6E5D54] hover:text-[#58111A] hover:bg-[#E8DFD5] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div className="p-8 sm:p-10 overflow-y-auto space-y-6 text-[#2C221E] bg-[#FFFDF9] font-sans text-sm">
          {/* Header */}
          <div className="border-b border-[#E8DFD5] pb-5 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#58111A] font-serif mb-1">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-base font-semibold text-[#58111A] mb-2 font-sans">
                {PERSONAL_INFO.title}
              </p>
              <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs text-[#6E5D54]">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#58111A]" />
                  {PERSONAL_INFO.email}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                  {PERSONAL_INFO.location}
                </span>
                <a
                  href={PERSONAL_INFO.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-[#58111A] hover:underline"
                >
                  <Github className="w-3.5 h-3.5 text-[#58111A]" />
                  <span>github.com/erenyfrhedra</span>
                </a>
                <a
                  href={PERSONAL_INFO.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-[#58111A] hover:underline"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#58111A]" />
                  <span>linkedin.com/in/ereny-elkomos-hedra</span>
                </a>
              </div>
            </div>
            <img
              src={resumeAvatar}
              alt={PERSONAL_INFO.name}
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src.includes('WhatsApp')) {
                  target.src = '/ereny.png';
                } else if (!target.src.includes('portrait.jpg')) {
                  target.src = '/portrait.jpg';
                }
              }}
              className="w-20 h-24 object-cover object-[center_16%] rounded-xl border border-[#C5A059]/60 shadow-xs hidden sm:block shrink-0"
            />
          </div>

          {/* Profile Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#58111A] border-b border-[#E8DFD5] pb-1 mb-2 font-sans">
              Professional Profile
            </h2>
            <p className="text-xs leading-relaxed text-[#6E5D54]">
              {ABOUT_CONTENT.text}
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#58111A] border-b border-[#E8DFD5] pb-1 mb-2 font-sans">
              Education
            </h2>
            <div className="flex justify-between items-start text-xs">
              <div>
                <p className="font-bold text-[#58111A] font-serif">{EDUCATION_DATA.university}</p>
                <p className="text-[#58111A] font-medium">{EDUCATION_DATA.degree} — Major: {EDUCATION_DATA.major}</p>
                <p className="text-[#85736A]">{EDUCATION_DATA.location}</p>
                <p className="text-[11px] text-[#6E5D54] pt-1">
                  <strong>Coursework:</strong> {EDUCATION_DATA.coursework.join(' • ')}
                </p>
              </div>
              <span className="text-[#85736A] font-medium">{EDUCATION_DATA.date}</span>
            </div>
          </div>

          {/* Professional Training */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#58111A] border-b border-[#E8DFD5] pb-1 mb-2 font-sans">
              Professional Training & Programs
            </h2>
            <div className="text-xs space-y-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-[#58111A] font-serif">{TRAINING_DATA.organization}</p>
                  <p className="text-[#58111A] font-medium">{TRAINING_DATA.program}</p>
                </div>
                <span className="text-[#85736A] font-medium">{TRAINING_DATA.date} ({TRAINING_DATA.format})</span>
              </div>
              <p className="text-[11px] text-[#6E5D54] pt-1">
                <strong>Curriculum:</strong> {TRAINING_DATA.topics.join(' • ')}
              </p>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#58111A] border-b border-[#E8DFD5] pb-1 mb-2 font-sans">
              Technical Skills
            </h2>
            <div className="space-y-1.5 text-xs text-[#2C221E]">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.id} className="grid grid-cols-4 gap-2">
                  <span className="font-bold text-[#58111A] col-span-1">{cat.name}:</span>
                  <span className="col-span-3 text-[#6E5D54]">{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#58111A] border-b border-[#E8DFD5] pb-1 mb-2 font-sans">
              Projects
            </h2>
            <div className="space-y-3 text-xs">
              {PROJECTS.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-[#58111A] font-serif">{proj.title}</h3>
                    <span className="text-[11px] font-sans font-semibold text-[#C5A059]">Python</span>
                  </div>
                  <p className="text-[11px] text-[#85736A] mb-1">
                    Tech: {proj.technologies.join(', ')}
                  </p>
                  <p className="text-[#6E5D54] leading-relaxed text-[11px]">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#F4ECE3] border-t border-[#E8DFD5] flex items-center justify-between text-xs text-[#6E5D54]">
          <span>Formatted for standard A4 printing and applicant review</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#FFFDF9] border border-[#E8DFD5] text-[#58111A] hover:bg-[#58111A] hover:text-white text-xs font-semibold cursor-pointer transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
