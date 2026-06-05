"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, CheckCircle2, ArrowRight } from "lucide-react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

const services = [
  "Billboard Ads",
  "SMD / LED Screens",
  "Social Media",
  "UGC Ads",
  "SEO Optimization",
  "Full Digital Strategy",
];

const contactInfo = [
  {
    icon: MapPin,
    title: "Head Office",
    lines: ["Flat#17, Cantonment Plaza, Abbottabad"],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+92 317 7272777"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["alnasirmarketing@gmail.com"],
  },
];

const socials = [
  { icon: FaFacebookF, href: "https://www.facebook.com/share/14iK4EaoQR4/?mibextid=wwXIfr", label: "Facebook" },
  { icon: FaInstagram, href: "https://www.instagram.com/alnasiradvertising?igsh=MWRuYTUwcjJ5eTd6MQ%3D%3D&utm_source=qr", label: "Instagram" },
];

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service_interest: "Billboard Ads",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    try {
      // Save to Supabase
      const { error } = await supabase.from("contact_submissions").insert([{
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        service_interest: formData.service_interest,
        message: formData.message,
      }]);
      if (error) throw error;

      // Send email via Resend
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setFormState("success");
      setFormData({ name: "", company: "", email: "", phone: "", service_interest: "Billboard Ads", message: "" });
      setTimeout(() => setFormState("idle"), 4000);
    } catch {
      setFormState("idle");
      alert("Failed to send. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative bg-[#050A15] border-t border-white/5 overflow-hidden">

      {/* ── TOP BANNER ── */}
      <div className="w-full bg-gradient-to-r from-[#38BDF8] via-[#1d8a70] to-[#496B88] py-5 px-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
        <span className="text-white font-black uppercase tracking-[0.2em] text-sm">Ready to dominate your market?</span>
        <span className="hidden sm:block text-white/50">—</span>
        <span className="text-white/80 text-sm font-medium">Let&apos;s build your next campaign together.</span>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="flex flex-col lg:flex-row">

        {/* ── LEFT PANEL ── */}
        <div className="relative w-full lg:w-[42%] bg-[#0a1120] flex flex-col justify-between px-5 sm:px-8 md:px-10 py-8 lg:py-12 overflow-hidden">
          {/* bg decor */}
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#38BDF8]/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#496B88]/8 rounded-full blur-[100px] pointer-events-none" />
          {/* dot grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

          <div className="relative z-10">
            {/* Label */}
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-[2px] bg-[#38BDF8]" />
              <span className="text-[#38BDF8] text-xs font-black uppercase tracking-[0.4em]">Get In Touch</span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.4rem] font-black text-white uppercase tracking-tighter leading-[1.05] mb-3 md:mb-4">
              Let&apos;s Build<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#496B88]">
                Something Great
              </span>
            </h2>
            <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed mb-5 md:mb-8 max-w-sm">
              Whether it&apos;s a billboard on a highway or a viral social campaign — we make brands impossible to ignore.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 md:space-y-5 mb-5 md:mb-8">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-5 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center shrink-0 group-hover:bg-[#38BDF8]/20 transition-colors duration-300">
                    <item.icon size={16} className="text-[#38BDF8]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500 mb-1">{item.title}</p>
                    {item.lines.map((line, j) => (
                      item.title === "Email Us"
                        ? <a key={j} href="https://mail.google.com/mail/?view=cm&to=alnasirmarketing@gmail.com" target="_blank" rel="noopener noreferrer" className="text-white font-medium text-sm leading-relaxed hover:text-[#38BDF8] transition-colors">{line}</a>
                        : item.title === "Call Us"
                          ? <a key={j} href="https://wa.me/923177272777" target="_blank" rel="noopener noreferrer" className="text-white font-medium text-sm leading-relaxed hover:text-[#38BDF8] transition-colors">{line}</a>
                          : <p key={j} className="text-white font-medium text-sm leading-relaxed">{line}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Socials */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500 mb-4">Follow Us</p>
              <div className="flex gap-3 flex-wrap">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={href.startsWith('mailto') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#38BDF8] hover:text-white hover:border-[#38BDF8] hover:scale-110 transition-all duration-300"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom tagline */}
          <div className="relative z-10 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/5">
            <p className="text-gray-600 text-xs uppercase tracking-[0.2em] font-bold">Al-Nasir Advertising · Est. 1994</p>
          </div>
        </div>

        {/* ── RIGHT PANEL (FORM) ── */}
        <div className="w-full lg:w-[58%] bg-[#050A15] flex items-center justify-center px-5 sm:px-8 md:px-10 lg:px-14 py-8 lg:py-12 relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#38BDF8]/5 rounded-full blur-[150px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-2xl relative z-10"
          >
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-1">Project Inquiry</h3>
            <p className="text-gray-500 text-xs mb-4 md:mb-6">Fill in the details below and we&apos;ll get back to you within 24 hours.</p>

            {formState === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-24 gap-6 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-[#38BDF8]/20 border border-[#38BDF8]/40 flex items-center justify-center">
                  <CheckCircle2 size={40} className="text-[#38BDF8]" />
                </div>
                <h4 className="text-2xl font-black text-white uppercase tracking-tight">Message Sent!</h4>
                <p className="text-gray-400 max-w-sm">We&apos;ve received your inquiry and will be in touch within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Full Name *</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#38BDF8] focus:bg-white/[0.07] transition-all placeholder:text-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Your brand / company"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#38BDF8] focus:bg-white/[0.07] transition-all placeholder:text-gray-600"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Email Address *</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#38BDF8] focus:bg-white/[0.07] transition-all placeholder:text-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 300 0000000"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#38BDF8] focus:bg-white/[0.07] transition-all placeholder:text-gray-600"
                    />
                  </div>
                </div>

                {/* Service selector */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">I&apos;m Interested In</label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setFormData({ ...formData, service_interest: s })}
                        className={cn(
                          "px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all duration-200",
                          formData.service_interest === s
                            ? "bg-[#38BDF8] border-[#38BDF8] text-white shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                            : "bg-white/[0.04] border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project, goals, and timeline..."
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#38BDF8] focus:bg-white/[0.07] transition-all resize-none placeholder:text-gray-600"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="w-full group relative flex items-center justify-center gap-3 bg-[#38BDF8] hover:bg-[#258f75] disabled:opacity-60 text-white font-black uppercase tracking-[0.2em] text-sm py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_10px_30px_rgba(56,189,248,0.4)] hover:-translate-y-0.5 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  {formState === "submitting" ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                      <span className="relative z-10">Send Message</span>
                      <ArrowRight size={16} className="relative z-10 opacity-60" />
                    </>
                  )}
                </button>

                <p className="text-center text-gray-600 text-xs">
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
