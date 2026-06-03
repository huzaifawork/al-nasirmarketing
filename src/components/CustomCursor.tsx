"use client";
import React, { useEffect, useRef, useCallback } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const circlePos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Don't render cursor on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      if (dotRef.current) dotRef.current.style.display = 'none';
      if (circleRef.current) circleRef.current.style.display = 'none';
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hovering =
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        !!target.closest('a') ||
        !!target.closest('button') ||
        target.classList.contains('cursor-pointer');
      
      if (hovering !== isHoveringRef.current) {
        isHoveringRef.current = hovering;
        if (dotRef.current) {
          dotRef.current.style.transform = `translate(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px) scale(${hovering ? 0 : 1})`;
        }
        if (circleRef.current) {
          circleRef.current.style.transform = `translate(${circlePos.current.x - 20}px, ${circlePos.current.y - 20}px) scale(${hovering ? 1.5 : 1})`;
          circleRef.current.style.backgroundColor = hovering ? 'rgba(46, 171, 140, 0.2)' : 'rgba(46, 171, 140, 0.05)';
        }
      }
    };

    // Use rAF loop for smooth cursor following (replaces framer-motion spring)
    function animate() {
      const dot = dotRef.current;
      const circle = circleRef.current;
      
      if (dot) {
        dot.style.transform = `translate(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px) scale(${isHoveringRef.current ? 0 : 1})`;
      }
      
      if (circle) {
        // Smooth lerp for the trailing circle
        circlePos.current.x += (mousePos.current.x - circlePos.current.x) * 0.15;
        circlePos.current.y += (mousePos.current.y - circlePos.current.y) * 0.15;
        circle.style.transform = `translate(${circlePos.current.x - 20}px, ${circlePos.current.y - 20}px) scale(${isHoveringRef.current ? 1.5 : 1})`;
      }
      
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);
    
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Small dot that exactly follows the cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[#2EAB8C] rounded-full pointer-events-none z-[999999]"
        style={{ willChange: 'transform' }}
      />
      
      {/* Larger trailing circle */}
      <div
        ref={circleRef}
        className="fixed top-0 left-0 w-10 h-10 border border-[#2EAB8C]/50 rounded-full pointer-events-none z-[999998] bg-[#2EAB8C]/5"
        style={{ willChange: 'transform', transition: 'background-color 0.3s' }}
      />
    </>
  );
}
