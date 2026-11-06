import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { SOCIAL_LINKS } from '../../data/navigation';
import { Mail, Copy, Check, Terminal, Send, ArrowUp, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [msgSent, setMsgSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const copyEmail = () => {
    navigator.clipboard.writeText(SOCIAL_LINKS.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setMsgSent(true);
    setTimeout(() => {
      setMsgSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative pt-24 sm:pt-32 pb-12 border-t border-white/10 bg-[#08090D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-build-target="contact-heading" data-build-status="unbuilt">
          <SectionHeading
            number="06"
            category="INITIATE PROTOCOL"
            title="HAVE SOMETHING"
            titleAccent="INTERESTING TO BUILD?"
            subtitle="I'm always interested in exploring ambitious ideas, experimenting with emerging technologies, and building meaningful software."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Direct channels & Quick Connect */}
          <div
            data-build-target="contact-channels"
            data-build-status="unbuilt"
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#101116]/80 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-6 font-mono text-xs text-[#FF414D]">
                <Terminal className="w-4 h-4" />
                <span>DIRECT_TRANSMISSION_CHANNELS</span>
              </div>

              {/* Email Card with functional mailto */}
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] mb-3">
                <span className="font-mono text-[10px] text-white/40 uppercase block mb-1">
                  OFFICIAL CONTACT INBOX
                </span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${SOCIAL_LINKS.email}`}
                    className="font-mono text-sm sm:text-base text-[#F3F3F5] hover:text-[#FF414D] transition-colors truncate"
                  >
                    {SOCIAL_LINKS.email}
                  </a>
                  <button
                    onClick={copyEmail}
                    className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-[#FF414D] hover:border-[#FF414D] hover:text-white transition-all text-[#92939F] cursor-pointer"
                    title="Copy Email"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-[#00FF88]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Phone Card with functional tel */}
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] mb-6">
                <span className="font-mono text-[10px] text-white/40 uppercase block mb-1">
                  DIRECT PHONE LINE
                </span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`tel:${SOCIAL_LINKS.phone}`}
                    className="flex items-center gap-2 font-mono text-sm sm:text-base text-[#F3F3F5] hover:text-[#00FF88] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#00FF88]" />
                    <span>{SOCIAL_LINKS.phoneFormatted}</span>
                  </a>
                  <span className="text-[10px] font-mono text-white/40">VOICE / CELL</span>
                </div>
              </div>

              {/* Social Link Buttons */}
              <div className="space-y-3">
                <span className="font-mono text-[10px] text-white/40 uppercase block">
                  VERIFIED NETWORKS
                </span>

                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-[#FF414D]/40 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <GithubIcon className="w-4 h-4 text-[#FF414D]" />
                    <span className="font-mono text-xs text-[#F3F3F5]">GITHUB</span>
                  </div>
                  <span className="font-mono text-[10px] text-white/40 group-hover:text-white">
                    @Rishi-Dev-pro ↗
                  </span>
                </a>

                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-[#00F0FF]/40 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <LinkedinIcon className="w-4 h-4 text-[#00F0FF]" />
                    <span className="font-mono text-xs text-[#F3F3F5]">LINKEDIN</span>
                  </div>
                  <span className="font-mono text-[10px] text-white/40 group-hover:text-white">
                    in/rishi-shaw ↗
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Transmission Form */}
          <div
            data-build-target="contact-form"
            data-build-status="unbuilt"
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#101116]/80 backdrop-blur-md relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <span className="font-mono text-xs text-white/70">
                  DISPATCH_FORM // DIRECT_COMMUNICATION
                </span>
                <span className="font-mono text-[10px] text-[#00FF88] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
                  GATEWAY READY
                </span>
              </div>

              {msgSent ? (
                <div className="p-8 text-center space-y-3 bg-[#00FF88]/5 border border-[#00FF88]/20 rounded-xl animate-in fade-in duration-300">
                  <Check className="w-8 h-8 text-[#00FF88] mx-auto" />
                  <h4 className="font-display font-bold text-lg text-white">
                    TRANSMISSION DISPATCHED
                  </h4>
                  <p className="font-mono text-xs text-white/60">
                    Your message packet has been routed. I will review and reply promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[10px] text-white/50 uppercase mb-1">
                        YOUR NAME / CALLSIGN
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Mercer"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-black/40 text-sm font-sans text-white focus:border-[#FF414D] focus:outline-none focus:ring-1 focus:ring-[#FF414D] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] text-white/50 uppercase mb-1">
                        RETURN ADDRESS / EMAIL
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-black/40 text-sm font-sans text-white focus:border-[#FF414D] focus:outline-none focus:ring-1 focus:ring-[#FF414D] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] text-white/50 uppercase mb-1">
                      MESSAGE SPECIFICATION
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Outline the architecture, collaboration, or system concept you would like to discuss..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-black/40 text-sm font-sans text-white focus:border-[#FF414D] focus:outline-none focus:ring-1 focus:ring-[#FF414D] transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-white/30">
                      STATUS: BUFFER_READY
                    </span>
                    <Button type="submit" variant="primary" size="md">
                      TRANSMIT MESSAGE
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Master Footer Terminal Metadata */}
        <div
          data-build-target="contact-footer"
          data-build-status="unbuilt"
          className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#92939F]"
        >
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="text-[#F3F3F5] font-semibold">
              DESIGNED & ENGINEERED BY RISHI KUMAR SHAW.
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FF88] shadow-[0_0_8px_#00FF88]" />
              <span className="text-[#00FF88]">SYSTEM STATUS: ONLINE.</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] text-white/40">LOC: INDIA // 2026</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg border border-white/10 hover:border-white/30 text-white transition-colors cursor-pointer"
              title="Return to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
