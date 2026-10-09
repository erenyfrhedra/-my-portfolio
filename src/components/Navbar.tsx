import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Linkedin } from 'lucide-react';
import { PERSONAL_INFO, resolveImageUrl } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [avatarSrc, setAvatarSrc] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('ereny_user_portrait');
      if (saved && saved.startsWith('data:image')) return saved;
    } catch {
      // ignore
    }
    return resolveImageUrl(PERSONAL_INFO.profileImage);
  });

  useEffect(() => {
    const handlePhotoUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<string | null>;
      if (customEvent.detail) {
        setAvatarSrc(customEvent.detail);
      } else {
        setAvatarSrc(resolveImageUrl(PERSONAL_INFO.profileImage));
      }
    };

    window.addEventListener('ereny_photo_updated', handlePhotoUpdate);
    return () => window.removeEventListener('ereny_photo_updated', handlePhotoUpdate);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'skills', 'training', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 140;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Training', href: '#training' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F9F6F0]/95 backdrop-blur-md border-b border-[#E8DFD5] shadow-[0_4px_25px_-5px_rgba(88,17,26,0.06)]'
          : 'bg-[#F9F6F0]/80 backdrop-blur-sm border-b border-[#E8DFD5]/60'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo: ERENY with photo avatar */}
        <a
          id="nav-logo"
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 rounded-lg p-1"
        >
          <img
            src={avatarSrc}
            alt="Ereny Elkomos Hedra"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.includes('WhatsApp')) {
                target.src = '/ereny.png';
              } else if (!target.src.includes('portrait.jpg')) {
                target.src = '/portrait.jpg';
              }
            }}
            className="w-8 h-8 rounded-full object-cover object-[center_16%] border border-[#C5A059]/60 shadow-xs group-hover:scale-105 transition-transform"
          />
          <span className="text-xl sm:text-2xl font-bold tracking-wider text-[#58111A] font-serif group-hover:text-[#7A1828] transition-colors">
            ERENY<span className="text-[#C5A059] group-hover:text-[#DFB86C] transition-colors">.</span>
          </span>
          <span className="hidden sm:inline-block text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#58111A]/5 text-[#58111A] border border-[#C5A059]/40 font-medium">
            AI & ML
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-1 lg:gap-1.5">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                id={`nav-link-${item.label.toLowerCase()}`}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'text-[#58111A] font-semibold'
                    : 'text-[#6E5D54] hover:text-[#58111A] hover:bg-[#F4ECE3]/60'
                }`}
              >
                <span>{item.label}</span>
                {/* Active Indicator bar */}
                <span
                  className={`absolute bottom-0.5 left-3.5 right-3.5 h-[2px] rounded-full bg-gradient-to-r from-[#58111A] to-[#C5A059] transition-all duration-300 ${
                    isActive
                      ? 'opacity-100 scale-x-100'
                      : 'opacity-0 scale-x-50 group-hover:opacity-70 group-hover:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button & Social */}
        <div className="hidden md:flex items-center gap-2.5">
          <a
            id="nav-linkedin-btn"
            href={PERSONAL_INFO.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile: https://www.linkedin.com/in/ereny-elkomos-hedra/"
            className="p-2 rounded-xl bg-[#FFFDF9] hover:bg-[#58111A] text-[#58111A] hover:text-white border border-[#E8DFD5] hover:border-[#58111A] transition-all duration-200 shadow-xs flex items-center justify-center cursor-pointer"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            id="nav-cta-btn"
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="group relative inline-flex items-center justify-center gap-1.5 px-4.5 py-2 text-xs font-semibold text-white bg-[#58111A] hover:bg-[#7A1828] border border-[#C5A059]/40 rounded-xl shadow-[0_4px_14px_rgba(88,17,26,0.18)] hover:shadow-[0_6px_20px_rgba(88,17,26,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
          >
            <span>Let's Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#DFB86C] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center">
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-lg text-[#58111A] hover:bg-[#F4ECE3] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden bg-[#F9F6F0]/98 backdrop-blur-xl border-b border-[#E8DFD5] px-4 pt-2 pb-6 space-y-1.5 shadow-xl"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                id={`mobile-nav-link-${item.label.toLowerCase()}`}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'text-[#58111A] bg-[#F4ECE3] border border-[#C5A059]/40 font-semibold'
                    : 'text-[#6E5D54] hover:text-[#58111A] hover:bg-[#F4ECE3]/60'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <div className="pt-3 space-y-2">
            <a
              id="mobile-nav-linkedin-btn"
              href={PERSONAL_INFO.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-semibold text-[#58111A] bg-[#FFFDF9] hover:bg-[#F4ECE3] border border-[#E8DFD5] rounded-xl shadow-xs"
            >
              <Linkedin className="w-4 h-4 text-[#58111A]" />
              <span>LinkedIn Profile</span>
            </a>

            <a
              id="mobile-nav-cta-btn"
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold text-white bg-[#58111A] hover:bg-[#7A1828] border border-[#C5A059]/40 rounded-xl shadow-md"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-4 h-4 text-[#DFB86C]" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

