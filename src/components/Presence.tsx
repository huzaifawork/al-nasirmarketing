"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type City = {
  id: string;
  name: string;
  slug: string;
  cover_image_url: string | null;
  sort_order: number | null;
};

const INITIAL_COUNT = 9;

export default function Presence() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      const { data, error } = await supabase
        .from("presence_cities")
        .select("*")
        .order("sort_order", { ascending: true });
      if (!error && data) setCities(data);
      setLoading(false);
    }
    fetchCities();
  }, []);

  const displayed = showAll ? cities : cities.slice(0, INITIAL_COUNT);
  const hasMore = cities.length > INITIAL_COUNT;

  return (
    <section id="presence" className="relative py-16 md:py-32 bg-[#0a1120] border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#496B88]/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#38BDF8]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-20">
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <span className="w-8 md:w-12 h-[2px] bg-[#38BDF8]" />
            <span className="text-[#38BDF8] text-xs md:text-sm font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">Our Network</span>
            <span className="w-8 md:w-12 h-[2px] bg-[#38BDF8]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 md:mb-6 uppercase tracking-tighter">
            National Presence
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl font-light px-2">
            Dominating the skyline across major cities. Click a city to explore our premium billboard locations and digital installations.
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-2xl md:rounded-[2rem] bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : cities.length === 0 ? (
          <div className="text-center py-16 text-gray-500 font-bold uppercase tracking-widest text-sm">
            No cities added yet
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {displayed.map((city, i) => (
                <motion.div
                  key={city.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % INITIAL_COUNT) * 0.06, duration: 0.4, ease: "easeOut" }}
                >
                  <Link
                    href={`/presence/${city.slug}`}
                    className="group block relative aspect-[4/3] rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:border-[#38BDF8]/40 transition-all duration-500"
                  >
                    {city.cover_image_url ? (
                      <Image
                        src={city.cover_image_url}
                        alt={city.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                        quality={80}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1B2A4A] to-[#0a1120] flex items-center justify-center">
                        <MapPin size={32} className="text-[#38BDF8]/30" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120] via-[#0a1120]/20 to-transparent" />

                    <div className="absolute inset-0 p-3 md:p-7 flex flex-col justify-between">
                      <div className="flex justify-end">
                        <span className="bg-black/50 backdrop-blur-md border border-white/10 text-[#38BDF8] text-[8px] md:text-[9px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] px-2 md:px-3 py-1 md:py-1.5 rounded-full">
                          Gallery
                        </span>
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="flex items-center gap-1 md:gap-2 mb-0.5 md:mb-1">
                            <MapPin size={10} className="text-[#38BDF8] md:hidden" />
                            <MapPin size={14} className="text-[#38BDF8] hidden md:block" />
                            <span className="text-[#38BDF8] text-[8px] md:text-[10px] font-black uppercase tracking-[0.15em]">Pakistan</span>
                          </div>
                          <h3 className="text-white font-black uppercase tracking-tight text-base md:text-2xl leading-none">{city.name}</h3>
                        </div>
                        <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-[#38BDF8]/20 border border-[#38BDF8]/30 flex items-center justify-center opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          <ArrowRight size={12} className="text-[#38BDF8] md:hidden" />
                          <ArrowRight size={16} className="text-[#38BDF8] hidden md:block" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-10 md:mt-14">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="group flex items-center gap-3 px-7 md:px-10 py-3.5 md:py-4 bg-white/5 hover:bg-[#38BDF8]/10 border border-white/10 hover:border-[#38BDF8]/40 rounded-full text-white font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
                >
                  {showAll ? (
                    <>Show Less <ChevronDown size={14} className="rotate-180 transition-transform duration-300" /></>
                  ) : (
                    <>View All {cities.length} Cities <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform duration-300" /></>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
