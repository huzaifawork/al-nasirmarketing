"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
}

const services: Service[] = [
  {
    id: "01",
    title: "Outdoor Billboard Advertising",
    description:
      "Strategic placement of static, backlit, and digital billboards across prime locations in major cities. Site selection, design production, and campaign monitoring included.",
    image: "/service-images/outdoor-billboard.png",
    color: "from-[#1B2A4A] to-[#121d36]",
  },
  {
    id: "02",
    title: "SMD / LED Digital Screens",
    description:
      "High-brightness LED and SMD screen networks for dynamic content delivery. Real-time content updates, dayparting scheduling, and audience targeting.",
    image: "/service-images/led-smd.png",
    color: "from-[#1a2c47] to-[#0a1120]",
  },
  {
    id: "03",
    title: "Social Media Marketing",
    description:
      "Paid and organic campaigns across Facebook, Instagram, TikTok, LinkedIn, and YouTube. Full funnel strategy from awareness to conversion.",
    image: "/service-images/social-media-marketing.png",
    color: "from-[#0f1f33] to-[#050a14]",
  },
  {
    id: "04",
    title: "Social Media Management",
    description:
      "End-to-end community management: content calendar, posting, engagement monitoring, reporting, and brand voice consistency.",
    image: "/service-images/social-media-management.png",
    color: "from-[#1B2A4A] to-[#121d36]",
  },
  {
    id: "05",
    title: "UGC Ads",
    description:
      "User-Generated Content ad production and deployment. Authentic creator-style ads that outperform traditional creative in cost-per-result.",
    image: "/service-images/ugc-ads.png",
    color: "from-[#1a2c47] to-[#0a1120]",
  },
  {
    id: "06",
    title: "SEO Optimization",
    description:
      "Technical SEO audits, on-page optimization, backlink building, local SEO for Pakistan markets, and monthly ranking reports.",
    image: "/service-images/SEO.avif",
    color: "from-[#0f1f33] to-[#050a14]",
  },
  {
    id: "07",
    title: "AI-Driven Marketing Strategies",
    description:
      "Leveraging AI tools for ad creative generation, audience segmentation, predictive analytics, chatbot automation, and performance optimization.",
    image: "/service-images/ai-driven.jpg",
    color: "from-[#1B2A4A] to-[#121d36]",
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden border-y border-white/10 group"
      style={{
        top: `calc(80px + ${index * 20}px)`,
        zIndex: index + 1,
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-95`} />

      <div className={`relative z-10 flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
        {/* Image first on mobile */}
        <div className="w-full md:w-1/2 relative h-52 sm:h-64 md:min-h-[420px] overflow-hidden order-first md:order-none">
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-l from-transparent via-transparent to-[#121d36]/60 z-10 pointer-events-none" />
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-all duration-1000 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
            quality={75}
          />
        </div>
        {/* Content */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <span className="text-[#38BDF8] text-lg md:text-2xl font-bold mb-3 opacity-60 tracking-widest">
            {service.id}.
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight uppercase">
            {service.title}
          </h3>
          <p className="text-gray-300 text-sm md:text-lg font-normal leading-relaxed mb-6">
            {service.description}
          </p>
          <button className="group/btn flex items-center gap-3 text-white font-bold text-xs uppercase tracking-[0.15em] hover:text-[#38BDF8] transition-colors w-fit">
            Discover More
            <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative bg-[#0a1120] py-32 pb-48"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 md:w-12 h-[2px] bg-[#38BDF8]" />
            <span className="text-[#38BDF8] text-xs md:text-sm font-black uppercase tracking-[0.4em]">
              Our Expertise
            </span>
            <span className="w-8 md:w-12 h-[2px] bg-[#38BDF8]" />
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tighter uppercase">
            ENGINEERED FOR{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#496B88]">
              IMPACT
            </span>
          </h2>
        </motion.div>
      </div>

      <div className="relative">
        {/* Stacked Cards */}
        <div className="flex flex-col gap-12 md:gap-24 relative z-10">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
