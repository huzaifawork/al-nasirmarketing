"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import MagneticButton from "./MagneticButton";

const defaultSlides = [
  {
    image: "/hero-section-images/fawarachowk carousel.png",
    label: "MARKETING REDEFINED",
    title: "AL-NASIR ADVERTISING",
    subtitle: "Since 1994",
  },
  {
    image: "/hero-section-images/mehranimagecarousel.png",
    label: "PRIME OUTDOOR LOCATIONS",
    title: "OWN THE STREETS",
    subtitle: "Billboard Placements That Stop Traffic",
  },
  {
    image: "/hero-section-images/night_image1.png",
    label: "24/7 BRAND VISIBILITY",
    title: "LIGHT UP THE CITY",
    subtitle: "High-Impact SMD Screens, Day & Night",
  },
  {
    image: "/hero-section-images/night-image2.png",
    label: "NATIONWIDE REACH",
    title: "BEYOND THE HORIZON",
    subtitle: "The North Specialist",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [settings, setSettings] = useState<any>({ tagline: "" });

  useEffect(() => {
    async function fetchSettings() {
      const { data, error } = await supabase.from("site_settings").select("*");
      if (!error && data) {
        const settingsMap: any = {};
        data.forEach((s) => (settingsMap[s.key] = s.value));
        setSettings(settingsMap);
      }
    }
    fetchSettings();

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % defaultSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full h-screen overflow-hidden bg-[#0a1120]"
    >
      {/* Background Carousel */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.2, ease: "easeInOut" },
              scale: { duration: 8, ease: "linear" },
            }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/20 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a1120]/90 via-[#0a1120]/40 to-transparent z-10 w-2/3" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120]/60 via-transparent to-transparent z-10" />

            <Image
              src={defaultSlides[currentSlide].image}
              alt={defaultSlides[currentSlide].title}
              fill
              className="object-cover brightness-110 contrast-105"
              priority
              sizes="100vw"
              quality={90}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Background Icons removed */}

      {/* Content */}
      <div className="relative z-20 h-full max-w-[90rem] mx-auto px-5 md:px-12 flex items-center">
        <div className="w-full pt-24 md:pt-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="flex flex-col items-start gap-3 md:gap-5"
            >
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                className="flex items-center gap-3"
              >
                <span className="w-6 md:w-16 h-[2px] bg-[#38BDF8]" />
                <span className="text-[#38BDF8] text-[10px] md:text-sm font-bold uppercase tracking-[0.25em] md:tracking-[0.3em]">
                  {defaultSlides[currentSlide].label}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                className="text-[2.2rem] sm:text-5xl md:text-6xl lg:text-[76px] font-bold text-white leading-[1.05] uppercase drop-shadow-2xl tracking-tight"
              >
                {currentSlide === 0 && settings.tagline
                  ? settings.tagline
                  : defaultSlides[currentSlide].title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-sm sm:text-lg md:text-2xl text-gray-300 font-light tracking-wide mt-1"
              >
                {defaultSlides[currentSlide].subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="mt-5 md:mt-10"
              >
                <MagneticButton
                  onClick={() =>
                    document.getElementById("services")?.scrollIntoView()
                  }
                  className="group relative inline-flex flex-nowrap items-center justify-center gap-3 px-6 md:px-8 py-3.5 md:py-4 font-bold text-white transition-all duration-500 bg-[#38BDF8] rounded-[2rem] overflow-hidden hover:scale-105 whitespace-nowrap text-sm"
                >
                  <span className="tracking-[0.15em] uppercase text-xs sm:text-sm relative z-10 whitespace-nowrap">
                    Explore Our Work
                  </span>
                  <ArrowRight
                    size={16}
                    className="relative z-10 shrink-0 group-hover:translate-x-2 transition-transform duration-300"
                  />
                </MagneticButton>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-3 md:gap-6 z-30">
        {defaultSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="group relative h-1 md:h-1.5 w-14 md:w-24 bg-white/10 overflow-hidden rounded-full cursor-pointer"
          >
            {currentSlide === index && (
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="absolute inset-0 bg-[#38BDF8] shadow-[0_0_10px_rgba(56,189,248,0.8)]"
              />
            )}
            <div className="absolute inset-0 bg-[#38BDF8]/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>
    </section>
  );
}
