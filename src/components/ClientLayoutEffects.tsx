"use client";
import dynamic from "next/dynamic";

// Lazy-load heavy client-only layout effects (ssr: false allowed in client components)
const FloatingSocialBackground = dynamic(() => import("@/components/FloatingSocialBackground"), { ssr: false });
const Preloader = dynamic(() => import("@/components/Preloader"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });

export function LayoutEffects() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <FloatingSocialBackground />
    </>
  );
}

export function SmoothScrollWrapper({ children }: { children: React.ReactNode }) {
  return <SmoothScroll>{children}</SmoothScroll>;
}
