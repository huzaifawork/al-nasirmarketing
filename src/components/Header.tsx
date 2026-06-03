"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import MagneticButton from "./MagneticButton";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  {
    name: "Services",
    href: "#services",
    dropdown: [
      { name: "Outdoor Billboards", href: "#services" },
      { name: "SMD / LED Screens", href: "#services" },
      { name: "Social Media Marketing", href: "#services" },
      { name: "Social Media Management", href: "#services" },
      { name: "UGC Ads", href: "#services" },
      { name: "SEO Optimization", href: "#services" },
      { name: "AI Strategies", href: "#services" },
    ],
  },
  { name: "Clients", href: "#clients" },
  { name: "Presence", href: "#presence" },
  { name: "Team", href: "#team" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const allIds = [...navLinks.map((l) => l.href.replace("#", "")), "contact"];

    const onScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3;
      let current = "home";
      for (const id of allIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      const link = navLinks.find((l) => l.href === `#${current}`);
      setActiveLink(link ? link.name : current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500",
          isScrolled
            ? "bg-[#0a1120]/80 backdrop-blur-2xl border-b border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            : "bg-transparent py-8 border-b border-transparent",
        )}
      >
        <div className="max-w-[90rem] mx-auto px-4 md:px-12 flex justify-between items-center relative">
          {/* Custom Logotype */}
          <div className="flex-1 flex justify-start">
            <Link
              href="/"
              className="flex items-center gap-4 group shrink-0 relative w-36 h-12 md:w-72 md:h-24 lg:w-80 lg:h-28"
              onClick={() => setActiveLink("Home")}
            >
              <Image
                src="/logo.png"
                alt="Al-Nasir Logo"
                fill
                className="object-contain object-left transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden xl:flex absolute left-1/2 -translate-x-1/2">
            <nav className="flex items-center gap-1 bg-transparent p-1.5 rounded-full">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => link.dropdown && setServicesOpen(true)}
                  onMouseLeave={() => link.dropdown && setServicesOpen(false)}
                >
                  <Link
                    href={link.href}
                    onClick={() => setActiveLink(link.name)}
                    className={cn(
                      "flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 px-5 py-2.5 rounded-full relative z-10 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2EAB8C]",
                      activeLink === link.name
                        ? "text-[#0a1120]"
                        : "text-gray-300 hover:text-white",
                    )}
                  >
                    {link.name}
                    {link.dropdown && (
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform duration-300",
                          servicesOpen && "rotate-180",
                        )}
                      />
                    )}
                  </Link>

                  {activeLink === link.name && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 bg-gradient-to-r from-[#2EAB8C] to-[#496B88] rounded-full shadow-[0_0_15px_rgba(46,171,140,0.5)]"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}

                  {link.dropdown && (
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                          }}
                          className="absolute top-[140%] left-1/2 -translate-x-1/2 w-[400px] bg-[#0f172a]/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.6)] p-6 overflow-hidden"
                        >
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2EAB8C] via-white to-[#496B88]" />
                          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#2EAB8C]/10 rounded-full blur-3xl pointer-events-none" />

                          <div className="grid grid-cols-2 gap-2 relative z-10">
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="group/item relative flex items-center p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300"
                              >
                                <div className="absolute left-0 w-1 h-0 bg-[#2EAB8C] group-hover/item:h-1/2 top-1/2 -translate-y-1/2 transition-all duration-300 rounded-full opacity-0 group-hover/item:opacity-100" />
                                <span className="text-[10px] font-black text-gray-400 group-hover/item:text-white group-hover/item:pl-2 transition-all duration-300 uppercase tracking-[0.1em]">
                                  {item.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="flex-1 flex justify-end items-center gap-4">
            {/* Contact Button Desktop */}
            <div className="hidden xl:block">
              <MagneticButton
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView()
                }
                className={cn(
                  "group relative inline-flex items-center justify-center px-8 py-3.5 font-black text-white text-xs uppercase tracking-[0.2em] transition-all duration-500 border rounded-full overflow-hidden",
                  activeLink === "contact"
                    ? "bg-[#2EAB8C] border-[#2EAB8C] shadow-[0_0_15px_rgba(46,171,140,0.5)]"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30"
                )}
              >
                <span className="relative z-10">Contact Us</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#2EAB8C]/20 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              </MagneticButton>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="xl:hidden text-white p-2 z-[60] relative group"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              {mobileMenuOpen ? (
                <X size={32} className="text-[#2EAB8C] relative z-10" />
              ) : (
                <Menu size={32} className="relative z-10" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Slide-in Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-0 z-[55] bg-[#0a1120]/95 backdrop-blur-3xl flex flex-col justify-center items-center px-6"
          >
            {/* Decoration */}
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#2EAB8C] rounded-full blur-[100px] opacity-20 pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-[#2EAB8C] border border-white/10 rounded-full text-white transition-all duration-300 z-10"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col gap-6 w-full max-w-md relative z-10">
              {[...navLinks, { name: "Contact Us", href: "#contact" }].map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.05, type: "spring" }}
                >
                  <Link
                    href={link.href}
                    className="text-3xl font-black tracking-tighter text-white hover:text-[#2EAB8C] transition-colors uppercase block text-center py-2 focus:outline-none focus:text-[#2EAB8C]"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setActiveLink(link.name);
                    }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
