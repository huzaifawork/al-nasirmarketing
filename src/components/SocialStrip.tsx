"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import Link from 'next/link';

export default function SocialStrip() {
  const socials = [
    { icon: FaFacebookF, href: "https://www.facebook.com/share/14iK4EaoQR4/?mibextid=wwXIfr", label: "Facebook" },
    { icon: FaInstagram, href: "https://www.instagram.com/alnasiradvertising?igsh=MWRuYTUwcjJ5eTd6MQ%3D%3D&utm_source=qr", label: "Instagram" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-10 pr-8"
    >
      <div className="flex flex-col gap-8">
        {socials.map((social, i) => (
          <Link 
            key={i} 
            href={social.href}
            aria-label={social.label}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-[#38BDF8] transition-all duration-500 hover:scale-150 transform-gpu group relative"
          >
            <social.icon size={18} />
            <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-1 bg-[#38BDF8] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
          </Link>
        ))}
      </div>

      <div className="flex flex-col items-center gap-6 group cursor-default">
        <div className="w-[1px] h-20 bg-gradient-to-b from-[#38BDF8]/50 via-white/10 to-transparent transition-all duration-700 group-hover:h-24 group-hover:from-[#38BDF8]" />
        <span 
          className="text-white/20 group-hover:text-white/60 transition-colors duration-500 text-[11px] font-black uppercase tracking-[0.6em] [writing-mode:vertical-lr] whitespace-nowrap py-4"
        >
          Follow Us
        </span>
      </div>
    </motion.div>

  );
}
