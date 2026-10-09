import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Mail, Sparkles, Brain, Award, MapPin, Upload, Linkedin, Camera } from 'lucide-react';
import { PERSONAL_INFO, resolveImageUrl } from '../data/portfolioData';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const configuredImageUrl = resolveImageUrl(PERSONAL_INFO.profileImage);
  const [hasCustomUpload, setHasCustomUpload] = useState<boolean>(false);

  // Portrait image source: defaults to her real configured image
  const [portraitSrc, setPortraitSrc] = useState<string>(() => {
    // Clean up any stale legacy image in localStorage to ensure the real photo always displays
    try {
      const saved = localStorage.getItem('ereny_user_portrait');
      if (saved && saved.startsWith('data:image')) {
        return saved;
      }
      localStorage.removeItem('ereny_user_portrait');
    } catch {
      // ignore
    }
    return configuredImageUrl;
  });

  // Keep portrait in sync if PERSONAL_INFO.profileImage changes
  useEffect(() => {
    setPortraitSrc(resolveImageUrl(PERSONAL_INFO.profileImage));
  }, [PERSONAL_INFO.profileImage]);

  // Track if custom image is stored in localStorage
  useEffect(() => {
    try {
      setHasCustomUpload(!!localStorage.getItem('ereny_user_portrait'));
    } catch {
      setHasCustomUpload(false);
    }
  }, [portraitSrc]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleImageError = () => {
    // Cascading fallback: WhatsApp image -> /ereny.png -> /portrait.jpg
    if (portraitSrc.includes('WhatsApp')) {
      setPortraitSrc('/ereny.png');
    } else if (portraitSrc !== '/portrait.jpg') {
      try {
        const encoded = encodeURI(portraitSrc);
        if (encoded !== portraitSrc) {
          setPortraitSrc(encoded);
          return;
        }
      } catch {
        // ignore
      }
      setPortraitSrc('/portrait.jpg');
    }
  };

  const handleManualUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          try {
            localStorage.setItem('ereny_user_portrait', base64);
            window.dispatchEvent(new CustomEvent('ereny_photo_updated', { detail: base64 }));
          } catch {
            // ignore storage quota error
          }
          setPortraitSrc(base64);
          setHasCustomUpload(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      localStorage.removeItem('ereny_user_portrait');
      window.dispatchEvent(new CustomEvent('ereny_photo_updated', { detail: null }));
    } catch {
      // ignore
    }
    setHasCustomUpload(false);
    setPortraitSrc(resolveImageUrl(PERSONAL_INFO.profileImage));
  };

  // Subtle golden and wine connected neural network nodes on warm beige canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: 'gold' | 'wine';
    }

    const particleCount = Math.min(Math.floor((width * height) / 24000), 30);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.6 + 0.8,
        alpha: Math.random() * 0.35 + 0.15,
        color: i % 3 === 0 ? 'wine' : 'gold',
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect nodes with delicate gold / warm wine lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120;

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.18;
            ctx.strokeStyle = `rgba(197, 160, 89, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Render nodes
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (p.color === 'wine') {
          ctx.fillStyle = `rgba(88, 17, 26, ${p.alpha})`;
        } else {
          ctx.fillStyle = `rgba(197, 160, 89, ${p.alpha})`;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#F9F6F0] text-[#2C221E]"
    >
      {/* Ambient background soft warm radial glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute top-1/4 -left-24 w-[500px] h-[500px] bg-[#C5A059]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-[480px] h-[480px] bg-[#58111A]/8 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-[420px] h-[420px] bg-[#DFB86C]/10 rounded-full blur-3xl" />
      </div>

      {/* Subtle warm architectural dot matrix */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `radial-gradient(rgba(197, 160, 89, 0.3) 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />

      {/* Interactive delicate particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* LEFT SIDE: Name, Title, Intro, CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 text-left space-y-6"
          >
            {/* Status / Availability Pill (Strictly no 'student') */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FFFDF9] border border-[#C5A059]/40 text-xs font-medium text-[#58111A] shadow-[0_2px_12px_rgba(88,17,26,0.06)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#58111A] opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#58111A]"></span>
              </span>
              <span className="tracking-wide font-sans font-semibold">Available for AI & Machine Learning Opportunities</span>
            </div>

            {/* Name & Title */}
            <div className="space-y-3">
              <h1
                id="hero-name"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#58111A] font-serif leading-[1.15]"
              >
                {PERSONAL_INFO.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                <p
                  id="hero-title"
                  className="text-lg sm:text-xl font-semibold tracking-wide text-[#2C221E] font-sans"
                >
                  {PERSONAL_INFO.title}
                </p>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-[#58111A]/5 text-[#58111A] border border-[#C5A059]/30">
                  DEPI Fellow
                </span>
              </div>
            </div>

            {/* Exact Short Professional Introduction */}
            <p
              id="hero-intro"
              className="text-base sm:text-lg text-[#6E5D54] leading-relaxed max-w-2xl font-normal"
            >
              {PERSONAL_INFO.introduction}
            </p>

            {/* Action Buttons: [View My Work], [Let's Connect] & [LinkedIn] */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                id="hero-btn-work"
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 text-sm font-semibold text-white bg-[#58111A] hover:bg-[#7A1828] border border-[#C5A059]/40 rounded-xl shadow-[0_8px_22px_rgba(88,17,26,0.22)] hover:shadow-[0_12px_28px_rgba(88,17,26,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowDown className="w-4 h-4 text-[#DFB86C]" />
              </button>

              <button
                id="hero-btn-connect"
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-[#58111A] hover:text-[#7A1828] bg-[#FFFDF9] hover:bg-[#F4ECE3] border border-[#58111A]/25 hover:border-[#C5A059] rounded-xl shadow-[0_2px_8px_rgba(88,17,26,0.06)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#58111A]" />
                <span>Let's Connect</span>
              </button>

              <a
                id="hero-btn-linkedin"
                href={PERSONAL_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="Open Ereny's LinkedIn Profile"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[#58111A] hover:text-white bg-[#FFFDF9] hover:bg-[#58111A] border border-[#E8DFD5] hover:border-[#58111A] rounded-xl shadow-[0_2px_8px_rgba(88,17,26,0.06)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Core Stack Highlights */}
            <div className="pt-5 border-t border-[#E8DFD5] flex flex-wrap items-center gap-2.5 text-xs text-[#6E5D54]">
              <span className="font-serif italic text-sm text-[#58111A] font-semibold">Specializations:</span>
              <span className="px-3 py-1 rounded-lg bg-[#FFFDF9] text-[#58111A] border border-[#E8DFD5] shadow-xs font-medium">Python</span>
              <span className="px-3 py-1 rounded-lg bg-[#FFFDF9] text-[#58111A] border border-[#E8DFD5] shadow-xs font-medium">NumPy</span>
              <span className="px-3 py-1 rounded-lg bg-[#FFFDF9] text-[#58111A] border border-[#E8DFD5] shadow-xs font-medium">Pandas</span>
              <span className="px-3 py-1 rounded-lg bg-[#FFFDF9] text-[#58111A] border border-[#E8DFD5] shadow-xs font-medium">Scikit-learn</span>
              <span className="px-3 py-1 rounded-lg bg-[#58111A]/5 text-[#58111A] border border-[#C5A059]/40 font-semibold">ML Pipelines</span>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Provided Portrait Image with Softly Curved Frame & Burgundy/Gold Border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer Subtle Burgundy & Luxury Gold Aura */}
              <div className="absolute -inset-2 rounded-[40px] bg-gradient-to-tr from-[#C5A059]/30 via-[#58111A]/20 to-[#DFB86C]/30 blur-2xl opacity-70" />

              {/* Decorative Subtle Corner Accents */}
              <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-[#C5A059] rounded-tr-[36px] pointer-events-none z-20 opacity-80" />
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-[#58111A] rounded-bl-[36px] pointer-events-none z-20 opacity-70" />

              {/* Sophisticated Rounded / Softly Curved Frame */}
              <div className="relative p-2.5 rounded-[36px] bg-gradient-to-b from-[#C5A059]/50 via-[#58111A]/30 to-[#C5A059]/60 shadow-[0_25px_60px_-15px_rgba(88,17,26,0.18)]">
                <div className="relative rounded-[30px] overflow-hidden bg-[#FFFDF9] border border-[#E8DFD5]">
                  
                  {/* Portrait Image Container (Natural portrait aspect ratio, zero awkward cropping) */}
                  <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-[#F4ECE3] group">
                    <img
                      id="hero-portrait-image"
                      src={portraitSrc || configuredImageUrl}
                      alt="Ereny Elkomos Hedra - AI & Data Science | Machine Learning Engineer"
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                      className="w-full h-full object-cover object-[center_16%] transition-transform duration-700 ease-out group-hover:scale-103"
                    />

                    {/* Change photo button */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-30">
                      <button
                        type="button"
                        id="btn-change-portrait"
                        onClick={() => fileInputRef.current?.click()}
                        title="اضغطي هنا لاختيار وتثبيت صورتكِ الحالية فوراً"
                        className="px-3 py-1.5 rounded-xl bg-[#FFFDF9]/95 hover:bg-[#58111A] text-[#58111A] hover:text-white border border-[#C5A059]/60 shadow-md transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                      >
                        <Camera className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>تثبيت صورتي (Upload Photo)</span>
                      </button>
                      {hasCustomUpload && (
                        <button
                          type="button"
                          id="btn-reset-portrait"
                          onClick={handleResetImage}
                          title="Reset to default image"
                          className="px-2 py-1.5 rounded-xl bg-[#58111A]/90 hover:bg-[#58111A] text-white text-[11px] font-medium shadow-md transition-all cursor-pointer"
                        >
                          Reset
                        </button>
                      )}
                    </div>

                    {/* Hidden file input for updating photo if desired */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleManualUpload}
                      className="hidden"
                    />

                    {/* Elegant subtle bottom vignette in warm wine tone */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#400B12]/85 via-[#400B12]/20 to-transparent pointer-events-none" />

                    {/* Floating Luxury Pill at Bottom of Portrait */}
                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-[#FFFDF9]/95 backdrop-blur-md border border-[#C5A059]/40 shadow-[0_10px_25px_-5px_rgba(88,17,26,0.15)] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#58111A] flex items-center justify-center text-[#DFB86C] shadow-xs">
                          <Brain className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#58111A] font-serif">Machine Learning & AI</p>
                          <p className="text-[11px] text-[#6E5D54]">Diagnostic & Predictive Systems</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-[#58111A] bg-[#58111A]/5 px-2.5 py-1 rounded-full border border-[#C5A059]/30">
                        <Sparkles className="w-3 h-3 text-[#C5A059]" />
                        <span>Assiut</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Meta Bar */}
                  <div className="px-5 py-3.5 bg-[#FFFDF9] border-t border-[#E8DFD5] flex items-center justify-between text-xs text-[#6E5D54]">
                    <span className="flex items-center gap-1.5 font-medium text-[#58111A]">
                      <Award className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>FCIS, Assiut University</span>
                    </span>
                    <span className="font-mono text-[11px] text-[#85736A]">AI Specialization</span>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
