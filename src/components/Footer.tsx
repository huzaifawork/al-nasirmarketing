"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Phone } from 'lucide-react';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#050A15] border-t border-white/10 pt-14 md:pt-24 pb-8 md:pb-10 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-px bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#38BDF8] blur-[150px] opacity-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-8 mb-12 md:mb-20">
          
          {/* Col 1: Logo — full width on mobile */}
          <div className="col-span-2 md:col-span-2 lg:col-span-4 flex flex-col pr-0 md:pr-8">
            <Link href="/" className="mb-6 inline-block">
              <div className="relative w-40 md:w-48 h-14 md:h-16">
                <Image src="/logo.png" alt="Al-Nasir Advertising" fill className="object-contain object-left" />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-loose mb-6 font-light max-w-xs">
              Pioneering visual dominance since 1994. Pakistan&apos;s leading premium outdoor and digital agency.
            </p>
            <div className="flex gap-3">
              {[{Icon: FaFacebookF, label: 'Facebook', href: 'https://www.facebook.com/share/14iK4EaoQR4/?mibextid=wwXIfr'}, {Icon: FaInstagram, label: 'Instagram', href: 'https://www.instagram.com/alnasiradvertising?igsh=MWRuYTUwcjJ5eTd6MQ%3D%3D&utm_source=qr'}, {Icon: Mail, label: 'Email', href: 'https://mail.google.com/mail/?view=cm&to=alnasirmarketing@gmail.com'}].map(({ Icon, label, href }, i) => (
                <a key={i} href={href} aria-label={label} target={href.startsWith('mailto') ? '_self' : '_blank'} rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#38BDF8] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-white font-black tracking-widest text-xs uppercase mb-5 md:mb-8">Navigation</h4>
            <ul className="space-y-3 md:space-y-4">
              {['Home', 'About Us', 'Clients', 'Presence', 'Team'].map((link) => (
                <li key={link}>
                  <Link href={`#${link.toLowerCase().replace(' ', '')}`} className="text-gray-400 text-sm hover:text-[#38BDF8] transition-colors flex items-center group font-medium">
                    <span className="w-0 group-hover:w-3 h-[2px] bg-[#38BDF8] transition-all mr-0 group-hover:mr-2" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="col-span-1 lg:col-span-3">
            <h4 className="text-white font-black tracking-widest text-xs uppercase mb-5 md:mb-8">Expertise</h4>
            <ul className="space-y-3 md:space-y-4">
              {['Billboard Ads', 'SMD / LED Screens', 'Social Media', 'UGC Content', 'AI Strategy'].map((service) => (
                <li key={service}>
                  <Link href="#services" className="text-gray-400 text-sm hover:text-[#38BDF8] transition-colors flex items-center group font-medium">
                    <span className="w-0 group-hover:w-3 h-[2px] bg-[#38BDF8] transition-all mr-0 group-hover:mr-2" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact — full width on mobile */}
          <div className="col-span-2 md:col-span-2 lg:col-span-3">
            <h4 className="text-white font-black tracking-widest text-xs uppercase mb-5 md:mb-8">Connect</h4>
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start gap-3">
                <MapPin className="text-[#38BDF8] shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="text-white text-xs font-bold uppercase tracking-wider mb-0.5">HQ — Abbottabad</p>
                  <p className="text-gray-400 text-xs">Flat#17, Cantonment Plaza, Abbottabad</p>
                </div>
              </div>
              <a href="https://wa.me/923177272777" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                <Phone className="text-[#38BDF8] shrink-0 mt-0.5 group-hover:text-white transition-colors" size={16} />
                <div>
                  <p className="text-white text-xs font-bold uppercase tracking-wider mb-0.5">Phone</p>
                  <span className="text-gray-400 text-xs group-hover:text-white transition-colors">+92 317 7272777</span>
                </div>
              </a>
              <a href="https://mail.google.com/mail/?view=cm&to=alnasirmarketing@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                <Mail className="text-[#38BDF8] shrink-0 mt-0.5 group-hover:text-white transition-colors" size={16} />
                <div>
                  <p className="text-white text-xs font-bold uppercase tracking-wider mb-0.5">Email</p>
                  <span className="text-gray-400 text-xs group-hover:text-white transition-colors">alnasirmarketing@gmail.com</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 md:pt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] text-center sm:text-left">
            &copy; AL-NASIR ADVERTISING. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-500 hover:text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-gray-500 hover:text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
