import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne, DM_Sans } from "next/font/google";
import "./globals.css";

import SiteShell from "@/components/SiteShell";
import {
  LayoutEffects,
  SmoothScrollWrapper,
} from "@/components/ClientLayoutEffects";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Al-Nasir Advertising | Premium Outdoor & Digital Marketing Agency",
  description:
    "Established since 1994, Al-Nasir Advertising provides premium billboard and digital marketing services across Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${dmSans.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#0a1120] text-gray-100 selection:bg-[#38BDF8]/30 selection:text-white relative z-0 md:cursor-none">
        <SiteShell />
        <LayoutEffects />
        <main className="flex-grow">
          <SmoothScrollWrapper>{children}</SmoothScrollWrapper>
        </main>
      </body>
    </html>
  );
}
