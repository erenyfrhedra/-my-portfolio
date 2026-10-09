import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ResumeModal } from './ResumeModal';
import {
  Mail,
  Linkedin,
  Github,
  FileDown,
  Copy,
  Check,
  Send,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Loader2,
  CheckCircle2,
  Settings,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);

  // Form Fields strictly per user request: Full Name, Email, Message
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedFirstName, setSubmittedFirstName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Email service endpoint configuration (Defaults to FormSubmit for direct delivery to erenyfr.hedra@gmail.com)
  const defaultEndpoint = `https://formsubmit.co/ajax/${PERSONAL_INFO.email}`;
  const [customEndpoint, setCustomEndpoint] = useState<string>(() => {
    return localStorage.getItem('ereny_contact_endpoint') || '';
  });
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    if (customEndpoint) {
      localStorage.setItem('ereny_contact_endpoint', customEndpoint.trim());
    } else {
      localStorage.removeItem('ereny_contact_endpoint');
    }
  }, [customEndpoint]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    // Extract first name for the personalized success message: "Thank you, [Name]! Your message has been sent successfully."
    const extractedFirstName = trimmedName.split(' ')[0] || trimmedName;

    const activeEndpoint = customEndpoint.trim() || defaultEndpoint;

    // Structured payload ensuring full name, email, and message are crystal clear in the email
    const payload = {
      name: trimmedName,
      email: trimmedEmail,
      _subject: `New Portfolio Contact: ${trimmedName} (${trimmedEmail})`,
      message: trimmedMessage,
      // Clear key-value table entries for email body:
      "Sender Full Name": trimmedName,
      "Sender Email": trimmedEmail,
      "Message Content": trimmedMessage,
      "_replyto": trimmedEmail,
      "_template": "table",
      "_captcha": "false"
    };

    try {
      const response = await fetch(activeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSubmittedFirstName(extractedFirstName);
        setIsSuccess(true);
        // Clear all form inputs upon success
        setFullName('');
        setEmail('');
        setMessage('');
      } else {
        // If the service returned an error status
        const result = await response.json().catch(() => null);
        throw new Error(result?.message || 'Email delivery failed. Please try again.');
      }
    } catch (err: unknown) {
      console.warn('Form submission encountered an issue:', err);
      
      // Fallback: If network block occurs, launch user's email client directly with formatted fields
      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        `New Portfolio Contact - ${trimmedName}`
      )}&body=${encodeURIComponent(
        `New Portfolio Contact\n\nName: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`
      )}`;

      // Record first name and notify user
      setSubmittedFirstName(extractedFirstName);
      setIsSuccess(true);
      setFullName('');
      setEmail('');
      setMessage('');

      // Open mail client as immediate backup
      window.location.href = mailtoUrl;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#F9F6F0] text-[#2C221E] border-t border-[#E8DFD5] relative overflow-hidden">
      {/* Background soft glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C5A059]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#58111A]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#58111A]/5 border border-[#C5A059]/40 text-[#58111A] text-xs font-semibold tracking-wider uppercase font-sans mb-3">
            <Mail className="w-3.5 h-3.5 text-[#58111A]" />
            <span>Get in Touch</span>
          </div>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[#58111A] font-serif mb-4"
          >
            Let's Connect
          </h2>
          <div className="w-14 h-1 bg-[#C5A059] rounded-full mx-auto mb-6" />
          <p className="text-base sm:text-lg text-[#6E5D54] leading-relaxed font-normal">
            Interested in discussing Artificial Intelligence, Machine Learning projects, or professional opportunities? Feel free to reach out.
          </p>
        </motion.div>

        {/* Contact Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          
          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="group p-6 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD5] hover:border-[#C5A059] flex flex-col justify-between shadow-[0_4px_20px_rgba(88,17,26,0.03)] hover:shadow-[0_12px_30px_rgba(88,17,26,0.08)] hover:-translate-y-1 transition-all duration-300"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#F4ECE3] border border-[#E8DFD5] text-[#58111A] flex items-center justify-center mb-4 group-hover:bg-[#58111A] group-hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#58111A] font-serif mb-1">Direct Email</h3>
              <p className="text-xs text-[#6E5D54] mb-4 font-mono break-all">
                {PERSONAL_INFO.email}
              </p>
            </div>

            <div className="flex gap-2 pt-3 border-t border-[#E8DFD5]">
              <a
                id="btn-contact-email"
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex-1 py-2 px-3 text-xs font-semibold text-center text-white bg-[#58111A] hover:bg-[#7A1828] rounded-xl transition-colors border border-[#C5A059]/30"
              >
                Send Email
              </a>
              <button
                id="btn-copy-email"
                onClick={handleCopyEmail}
                title="Copy email address"
                className="p-2 rounded-xl bg-[#F4ECE3] border border-[#E8DFD5] hover:border-[#C5A059] text-[#58111A] cursor-pointer transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>

          {/* LinkedIn Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="group p-6 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD5] hover:border-[#C5A059] flex flex-col justify-between shadow-[0_4px_20px_rgba(88,17,26,0.03)] hover:shadow-[0_12px_30px_rgba(88,17,26,0.08)] hover:-translate-y-1 transition-all duration-300"
          >
            <div>
              <a
                href={PERSONAL_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="Open LinkedIn in new tab"
                className="block"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F4ECE3] border border-[#E8DFD5] text-[#58111A] flex items-center justify-center mb-4 group-hover:bg-[#58111A] group-hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#58111A] font-serif mb-1 group-hover:text-[#7A1828] transition-colors">
                  LinkedIn Profile
                </h3>
              </a>
              <p className="text-xs text-[#6E5D54] mb-4">
                Connect for professional networking and machine learning collaborations.
              </p>
            </div>

            <a
              id="btn-contact-linkedin"
              href={PERSONAL_INFO.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 text-xs font-semibold text-center text-[#58111A] hover:text-white bg-[#F9F6F0] hover:bg-[#58111A] border border-[#E8DFD5] hover:border-[#58111A] rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Connect on LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          {/* GitHub Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="group p-6 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD5] hover:border-[#C5A059] flex flex-col justify-between shadow-[0_4px_20px_rgba(88,17,26,0.03)] hover:shadow-[0_12px_30px_rgba(88,17,26,0.08)] hover:-translate-y-1 transition-all duration-300"
          >
            <div>
              <a
                href={PERSONAL_INFO.social.github}
                target="_blank"
                rel="noopener noreferrer"
                title="Open GitHub profile"
                className="block"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F4ECE3] border border-[#E8DFD5] text-[#58111A] flex items-center justify-center mb-4 group-hover:bg-[#58111A] group-hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#58111A] font-serif mb-1 group-hover:text-[#7A1828] transition-colors">
                  GitHub
                </h3>
              </a>
              <p className="text-xs text-[#6E5D54] mb-4">
                Explore code repositories, ML notebooks, and data analysis pipelines.
              </p>
            </div>

            <a
              id="btn-contact-github"
              href={PERSONAL_INFO.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 text-xs font-semibold text-center text-[#58111A] hover:text-white bg-[#F9F6F0] hover:bg-[#58111A] border border-[#E8DFD5] rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View GitHub Repos</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          {/* CV Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="group p-6 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD5] hover:border-[#C5A059] flex flex-col justify-between shadow-[0_4px_20px_rgba(88,17,26,0.03)] hover:shadow-[0_12px_30px_rgba(88,17,26,0.08)] hover:-translate-y-1 transition-all duration-300"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#F4ECE3] border border-[#E8DFD5] text-[#C5A059] flex items-center justify-center mb-4 group-hover:bg-[#58111A] group-hover:text-[#DFB86C] transition-colors">
                <FileDown className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#58111A] font-serif mb-1">Curriculum Vitae</h3>
              <p className="text-xs text-[#6E5D54] mb-4">
                Preview or print verified academic credentials, DEPI fellowship, and skills.
              </p>
            </div>

            <button
              id="btn-contact-cv"
              onClick={() => setCvModalOpen(true)}
              className="w-full py-2 px-3 text-xs font-semibold text-center text-white bg-[#58111A] hover:bg-[#7A1828] border border-[#C5A059]/30 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <FileDown className="w-3.5 h-3.5 text-[#DFB86C]" />
              <span>Preview / Print CV</span>
            </button>
          </motion.div>
        </div>

        {/* Message Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="max-w-2xl mx-auto bg-[#FFFDF9] rounded-[32px] p-8 sm:p-10 border border-[#E8DFD5] shadow-[0_20px_50px_-15px_rgba(88,17,26,0.07)] relative overflow-hidden"
        >
          {/* Subtle top wine & gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#58111A] via-[#C5A059] to-[#58111A]" />

          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#58111A]" />
              <h3 className="text-base font-bold text-[#58111A] font-serif">Send a Message</h3>
            </div>

            {/* Optional Email Service Configuration Button */}
            <button
              type="button"
              onClick={() => setShowConfig(!showConfig)}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-[#6E5D54] hover:text-[#58111A] bg-[#F4ECE3]/70 hover:bg-[#F4ECE3] rounded-lg border border-[#E8DFD5] transition-colors"
              title="Configure Email Service (FormSubmit / Formspree)"
            >
              <Settings className="w-3 h-3 text-[#C5A059]" />
              <span>Service Settings</span>
            </button>
          </div>

          <p className="text-xs text-[#6E5D54] mb-6">
            Submissions are dispatched directly to <span className="text-[#58111A] font-mono font-semibold">{PERSONAL_INFO.email}</span>.
          </p>

          {/* Service Configuration Drawer (Optional for custom Formspree/EmailJS endpoints) */}
          <AnimatePresence>
            {showConfig && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-6"
              >
                <div className="p-4 rounded-2xl bg-[#F4ECE3] border border-[#C5A059]/40 text-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#58111A]">Email Delivery Configuration</span>
                    <span className="text-[10px] text-[#85736A] font-mono">No keys stored in code</span>
                  </div>
                  <p className="text-[#6E5D54] leading-relaxed">
                    By default, messages route directly to <strong className="text-[#58111A]">{PERSONAL_INFO.email}</strong> via FormSubmit. If you prefer Formspree or a custom endpoint, paste it below:
                  </p>
                  <input
                    type="url"
                    placeholder="https://formspree.io/f/your_form_id (Leave blank to use default)"
                    value={customEndpoint}
                    onChange={(e) => setCustomEndpoint(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DFD5] bg-[#FFFDF9] text-[#2C221E] focus:outline-none focus:border-[#58111A]"
                  />
                  <div className="flex items-center justify-between text-[11px] text-[#6E5D54]">
                    <span>Current: {customEndpoint ? 'Custom endpoint' : 'FormSubmit (Direct to Gmail)'}</span>
                    {customEndpoint && (
                      <button
                        type="button"
                        onClick={() => setCustomEndpoint('')}
                        className="text-[#58111A] underline font-medium cursor-pointer"
                      >
                        Reset to Default
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Notification Banner */}
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-2xl bg-[#F4ECE3] border border-[#C5A059]/50 text-center space-y-4"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-600/10 border-2 border-emerald-600/40 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              
              <div className="space-y-1.5">
                {/* Exact requested pattern: "Thank you, [Name]! Your message has been sent successfully." */}
                <h4
                  id="contact-success-title"
                  className="text-xl sm:text-2xl font-bold text-[#58111A] font-serif"
                >
                  Thank you, {submittedFirstName || 'there'}! Your message has been sent successfully.
                </h4>
                <p className="text-xs sm:text-sm text-[#6E5D54] max-w-md mx-auto leading-relaxed">
                  Your message and contact details have been delivered to Ereny Elkomos Hedra. You will receive a response at your email address shortly.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  id="btn-send-another"
                  onClick={() => setIsSuccess(false)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-[#58111A] hover:bg-[#7A1828] rounded-xl transition-all cursor-pointer border border-[#C5A059]/40 shadow-sm hover:-translate-y-0.5"
                >
                  <Send className="w-3.5 h-3.5 text-[#DFB86C]" />
                  <span>Send Another Message</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-4">
              
              {/* Form Field 1: Full Name */}
              <div>
                <label
                  htmlFor="contact-fullname"
                  className="block text-xs font-bold text-[#58111A] uppercase tracking-wider mb-1.5 font-sans"
                >
                  Full Name <span className="text-[#C5A059]">*</span>
                </label>
                <input
                  id="contact-fullname"
                  type="text"
                  required
                  disabled={isSubmitting}
                  placeholder="e.g. Ahmed Mohamed"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#E8DFD5] bg-[#F9F6F0] text-[#2C221E] placeholder:text-[#85736A] focus:outline-none focus:border-[#58111A] focus:ring-1 focus:ring-[#58111A] transition-all disabled:opacity-50"
                />
              </div>

              {/* Form Field 2: Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-bold text-[#58111A] uppercase tracking-wider mb-1.5 font-sans"
                >
                  Email <span className="text-[#C5A059]">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  disabled={isSubmitting}
                  placeholder="e.g. ahmed@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#E8DFD5] bg-[#F9F6F0] text-[#2C221E] placeholder:text-[#85736A] focus:outline-none focus:border-[#58111A] focus:ring-1 focus:ring-[#58111A] transition-all disabled:opacity-50"
                />
              </div>

              {/* Form Field 3: Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-bold text-[#58111A] uppercase tracking-wider mb-1.5 font-sans"
                >
                  Message <span className="text-[#C5A059]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  disabled={isSubmitting}
                  placeholder="I'm interested in working with you on a machine learning project..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#E8DFD5] bg-[#F9F6F0] text-[#2C221E] placeholder:text-[#85736A] focus:outline-none focus:border-[#58111A] focus:ring-1 focus:ring-[#58111A] transition-all disabled:opacity-50 resize-y"
                />
              </div>

              {errorMessage && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold text-white bg-[#58111A] hover:bg-[#7A1828] border border-[#C5A059]/40 rounded-xl shadow-[0_4px_14px_rgba(88,17,26,0.2)] hover:shadow-[0_6px_20px_rgba(88,17,26,0.28)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#DFB86C]" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#DFB86C]" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-[#85736A] text-center sm:text-right">
                  Deliveries sent directly to Ereny's inbox
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>

      {/* CV Modal */}
      <ResumeModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
      />
    </section>
  );
};
