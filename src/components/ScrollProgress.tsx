"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#2EAB8C] via-[#496B88] to-[#2EAB8C] origin-left z-[100] drop-shadow-[0_0_10px_rgba(46,171,140,0.8)]"
      style={{ scaleX }}
    />
  );
}
