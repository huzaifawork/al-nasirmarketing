"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const duration = 1200; // 1.2 seconds loading time (reduced from 2s)
    const interval = 20; // update every 20ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        // Add a slight delay after hitting 100% before removing preloader
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[10000] bg-[#050A15] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#38BDF8] rounded-full blur-[120px] opacity-10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#496B88] rounded-full blur-[150px] opacity-5 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo Reveal */}
            <div className="overflow-hidden mb-8 relative w-48 h-48 md:w-64 md:h-64">
              <motion.div 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                className="w-full h-full relative"
              >
                <Image src="/logo.png" alt="Al-Nasir Logo" fill className="object-contain" priority />
              </motion.div>
            </div>
            
            <div className="overflow-hidden mb-12">
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="text-[#38BDF8] text-xs md:text-sm font-bold uppercase tracking-[0.4em]"
              >
                Pioneering Visual Dominance
              </motion.p>
            </div>

            {/* Progress Counter & Bar */}
            <div className="w-64 flex flex-col items-center gap-4">
              <motion.div 
                className="text-white/50 text-sm font-black tracking-widest tabular-nums"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {progress}%
              </motion.div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#38BDF8] to-[#496B88]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
