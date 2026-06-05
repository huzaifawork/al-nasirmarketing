"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Crown } from "lucide-react";

type Client = {
  id: string;
  name: string;
  logo_url: string;
  is_featured: boolean;
};

const FEATURED_CLIENTS = [
  {
    id: "f1",
    name: "Coca-Cola",
    logo_url: "/featured-items-logos/coca-cola-seeklogo.png",
    is_featured: true,
  },
  {
    id: "f2",
    name: "Huawei",
    logo_url: "/featured-items-logos/huawei-logo-png-6990.png",
    is_featured: true,
  },
  {
    id: "f3",
    name: "Pakistan Army",
    logo_url: "/featured-items-logos/Pakistan_Army_Emblem.png",
    is_featured: true,
  },
  {
    id: "f4",
    name: "Shell",
    logo_url: "/featured-items-logos/shell-logo.png",
    is_featured: true,
  },
  {
    id: "f5",
    name: "Ufone",
    logo_url: "/featured-items-logos/Ufone-5G-Logo.png",
    is_featured: true,
  },
];

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClients() {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("sort_order", { ascending: true });

      if (!error && data && data.length > 0) {
        const formattedData: Client[] = data.map((c) => ({
          id: c.id,
          name: c.name,
          logo_url: c.logo_url,
          is_featured: !!c.is_featured,
        }));
        setClients(formattedData);
      }
      setLoading(false);
    }
    fetchClients();
  }, []);

  const BRAND_LOGOS = [
    "beaconhouse-school-system-removebg-preview.png",
    "BRITANNIA-removebg-preview.png",
    "caltex-removebg-preview.png",
    "comsats-university-islamabad-removebg-preview.png",
    "dalda-logo.png",
    "Diners_idWYKHgr3H_0.png",
    "ECS.png",
    "HBL_idUO-qYYT-_1.png",
    "honda-silver-removebg-preview.png",
    "J..png",
    "KNORR.png",
    "MEZAN.png",
    "national-foods-logo.png",
    "nestle-9-logo-png-transparent.png",
    "OREO.png",
    "QARSHI-removebg-preview.png",
    "SERVIS-removebg-preview.png",
    "SHAN.png",
    "SHANGRILA.png",
    "stylo-removebg-preview.png",
    "SUFI-LOGOS.png",
    "telenor-seeklogo.png",
    "the-city-school-removebg-preview.png",
    "the-educators-removebg-preview.png",
    "unilever-removebg-preview.png",
    "zong-seeklogo.png",
  ].map((filename, index) => ({
    id: `brand-${index}`,
    name: filename.replace(/\.(png|jpg|jpeg|svg)$/i, "").replace(/[-_]/g, " "),
    logo_url: `/BRANDS-LOGOS/${filename}`,
    is_featured: false,
  }));

  const featuredClients = FEATURED_CLIENTS;
  const marqueeClients = BRAND_LOGOS;
  const useMock = false;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring" as const, bounce: 0.5 },
    },
  };

  const half = Math.ceil(marqueeClients.length / 2);
  const topLogos = marqueeClients.slice(0, half);
  const bottomLogos = marqueeClients.slice(half);

  const doubleMarqueeTop = [
    ...topLogos,
    ...topLogos,
    ...topLogos,
    ...topLogos,
    ...topLogos,
    ...topLogos,
  ];

  const doubleMarqueeBottom = [
    ...bottomLogos,
    ...bottomLogos,
    ...bottomLogos,
    ...bottomLogos,
    ...bottomLogos,
    ...bottomLogos,
  ];

  return (
    <section
      id="clients"
      className="py-32 bg-[#0a1120] relative overflow-hidden border-y border-white/5"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1B2A4A]/20 via-[#0a1120] to-[#0a1120] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="w-12 h-[2px] bg-[#38BDF8]" />
            <span className="text-[#38BDF8] text-xs font-black uppercase tracking-[0.4em]">
              Our Partners
            </span>
            <span className="w-12 h-[2px] bg-[#38BDF8]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase mb-0"
          >
            Brands That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#496B88]">
              Trust Us
            </span>
          </motion.h2>
        </div>

        {/* Row 1: Featured Grid */}
        {featuredClients.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8 mb-24"
          >
            {featuredClients.map((client: any) => (
              <motion.div
                key={client.id}
                variants={itemVariants}
                className="flex flex-col items-center justify-center group h-28 relative last:col-span-2 last:max-w-[50%] last:mx-auto last:w-full md:last:col-span-1 md:last:max-w-none"
              >
                <div className="relative w-full h-full flex items-center justify-center transition-all duration-500 transform group-hover:scale-110">
                  <Image
                    src={client.logo_url}
                    alt={client.name}
                    fill
                    className="object-contain p-2"
                    sizes="200px"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                  <span className="text-[10px] font-black text-[#38BDF8] uppercase tracking-widest text-center">
                    {client.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Row 2 & 3: Infinite Multi-Lane Marquee */}
      {marqueeClients.length > 0 && (
        <div className="relative w-full py-16 bg-[#0a1120] border-y border-white/5 group overflow-hidden flex flex-col gap-12">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a1120] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a1120] to-transparent z-10 pointer-events-none" />

          <style
            dangerouslySetInnerHTML={{
              __html: `
            .marquee-container-fast {
              animation: marquee-fast 80s linear infinite;
            }
            .marquee-container-reverse {
              animation: marquee-reverse 85s linear infinite;
            }
            @keyframes marquee-fast {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            @keyframes marquee-reverse {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0%); }
            }
          `,
            }}
          />

          {/* Forward Lane */}
          <div className="flex gap-20 marquee-container-fast w-max hover:[animation-play-state:paused] items-center">
            {doubleMarqueeTop.map((client: any, index) => (
              <div
                key={`fwd-${client.id}-${index}`}
                className="flex items-center gap-6 shrink-0 group/logo cursor-pointer px-4"
              >
                <div className="relative w-24 h-24 flex items-center justify-center transition-all duration-500 transform group-hover/logo:scale-125 group-hover/logo:rotate-12">
                  <Image
                    src={client.logo_url}
                    alt={client.name}
                    fill
                    className="object-contain"
                    sizes="96px"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Reverse Lane */}
          <div className="flex gap-20 marquee-container-reverse w-max hover:[animation-play-state:paused] items-center ml-[-15%]">
            {doubleMarqueeBottom.map((client: any, index) => (
              <div
                key={`rev-${client.id}-${index}`}
                className="flex items-center gap-6 shrink-0 group/logo cursor-pointer px-4"
              >
                <div className="relative w-24 h-24 flex items-center justify-center transition-all duration-500 transform group-hover/logo:scale-125 group-hover/logo:-rotate-12">
                  <Image
                    src={client.logo_url}
                    alt={client.name}
                    fill
                    className="object-contain"
                    sizes="96px"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
