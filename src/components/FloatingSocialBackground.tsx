"use client";

import { useEffect, useState, useMemo } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
  FaSnapchatGhost,
  FaPinterestP,
} from "react-icons/fa";

const ICONS = [
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
  FaSnapchatGhost,
  FaPinterestP,
];

// Generate deterministic random values based on index
const random = (min: number, max: number, seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return min + (x - Math.floor(x)) * (max - min);
};

export default function FloatingSocialBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reduced from 40 to 15 particles for much better performance
  const particles = useMemo(() => Array.from({ length: 15 }).map((_, i) => {
    const startX = random(0, 100, i + 1);
    const startY = random(0, 100, i + 2);
    const tx = random(-30, 30, i + 3);
    const ty = random(-30, 30, i + 4);
    const z = random(0.3, 1, i + 5);
    const opacity = z * 0.3;
    const duration = random(40, 70, i + 6);
    const delay = random(0, -20, i + 7);
    const startRot = random(0, 360, i + 8);
    const endRot = startRot + random(360, 720, i + 11) * (i % 2 === 0 ? 1 : -1);
    const size = Math.round(24 * (1 + z));

    return {
      id: i,
      iconIndex: i % ICONS.length,
      startX,
      startY,
      tx,
      ty,
      opacity,
      duration,
      delay,
      startRot,
      endRot,
      size,
    };
  }), []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] bg-gradient-to-b from-[#0a1120] via-[#0f172a] to-[#0a1120]">
      {/* Dynamic Grid / Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      {/* Radial Glow in center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[#38BDF8] opacity-10 blur-[100px] rounded-full"></div>
      </div>

      {/* CSS-animated particles instead of framer-motion */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-particle {
          0% { transform: translate(0, 0) rotate(var(--start-rot)); opacity: 0; }
          10% { opacity: var(--max-opacity); }
          90% { opacity: var(--max-opacity); }
          100% { transform: translate(var(--tx), var(--ty)) rotate(var(--end-rot)); opacity: 0; }
        }
        .float-particle {
          animation: float-particle var(--duration) linear infinite;
          animation-delay: var(--delay);
          will-change: transform, opacity;
        }
      `}} />

      <div className="absolute inset-0">
        {particles.map((p) => {
          const Icon = ICONS[p.iconIndex];
          return (
            <div
              key={p.id}
              className="absolute text-[#38BDF8] float-particle"
              style={{
                left: `${p.startX}vw`,
                top: `${p.startY}vh`,
                fontSize: `${p.size}px`,
                '--start-rot': `${p.startRot}deg`,
                '--end-rot': `${p.endRot}deg`,
                '--tx': `${p.tx}vw`,
                '--ty': `${p.ty}vh`,
                '--max-opacity': p.opacity,
                '--duration': `${p.duration}s`,
                '--delay': `${p.delay}s`,
                opacity: 0,
              } as React.CSSProperties}
            >
              <Icon />
            </div>
          );
        })}
      </div>
    </div>
  );
}
