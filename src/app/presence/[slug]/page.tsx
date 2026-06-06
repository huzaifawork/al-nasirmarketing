"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, MapPin, Camera, Loader2, X, Calendar, Ruler, Navigation, Tag, Banknote } from "lucide-react";
import { supabase } from "@/lib/supabase";

type City = {
  id: string;
  name: string;
  slug: string;
  cover_image_url: string | null;
};

type PresenceImage = {
  id: string;
  image_url: string;
  caption: string | null;
  availability_from: string | null;
  availability_to: string | null;
  size: string | null;
  price: number | null;
  site_id: string | null;
  location: string | null;
  direction: string | null;
  sort_order: number | null;
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function formatDateShort(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function CityPresencePage() {
  const params = useParams();
  const slug = params.slug as string;

  const [city, setCity] = useState<City | null>(null);
  const [images, setImages] = useState<PresenceImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<PresenceImage | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const { data: cityData } = await supabase
        .from("presence_cities").select("*").eq("slug", slug).single();
      if (!cityData) { setLoading(false); return; }
      setCity(cityData);
      const { data: imgData } = await supabase
        .from("presence_images").select("*").eq("city_id", cityData.id)
        .order("sort_order", { ascending: true });
      if (imgData) setImages(imgData);
      setLoading(false);
    }
    fetchData();
  }, [slug]);

  if (loading) return (
    <main className="min-h-screen bg-[#0a1120] flex items-center justify-center">
      <Loader2 className="animate-spin text-[#38BDF8]" size={40} />
    </main>
  );

  if (!city) return (
    <main className="min-h-screen bg-[#0a1120] flex flex-col items-center justify-center gap-6 text-white">
      <MapPin size={48} className="text-[#38BDF8]/40" />
      <h1 className="text-3xl font-black uppercase tracking-tighter">City Not Found</h1>
      <Link href="/#presence" className="text-[#38BDF8] font-bold uppercase tracking-widest text-sm hover:underline flex items-center gap-2">
        <ArrowLeft size={16} /> Back to Presence
      </Link>
    </main>
  );

  return (
    <main className="min-h-screen bg-[#0a1120] text-white">

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {city.cover_image_url ? (
            <Image src={city.cover_image_url} alt={city.name} fill className="object-cover brightness-50" priority sizes="100vw" quality={85} />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1B2A4A] to-[#0a1120]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120] via-[#0a1120]/50 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 lg:px-24 w-full pb-12 md:pb-16">
          <Link href="/#presence" className="inline-flex items-center gap-2 text-[#38BDF8] font-bold text-xs uppercase tracking-[0.2em] mb-8 hover:gap-4 transition-all duration-300">
            <ArrowLeft size={16} /> Back to Presence
          </Link>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#38BDF8]" />
              <span className="text-[#38BDF8] text-[10px] font-black uppercase tracking-[0.3em]">Operational Hub</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-3">{city.name}</h1>
            <p className="text-gray-400 text-sm md:text-base">{images.length} placement{images.length !== 1 ? "s" : ""} in our inventory</p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-12 lg:px-24">
        {images.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-white/10 rounded-3xl">
            <Camera size={40} className="text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No media added yet</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.07]">
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/30">Available Media</span>
              <span className="text-xs text-white/30">{images.length} listing{images.length !== 1 ? "s" : ""}</span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.07] rounded-2xl overflow-hidden">
              {images.map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  onClick={() => setActive(img)}
                  className="bg-[#0d1627] hover:bg-[#111d35] transition-colors duration-200 cursor-pointer group"
                >
                  {/* Image */}
                  <div className="relative h-[148px] overflow-hidden">
                    {img.image_url ? (
                      <img
                        src={img.image_url}
                        alt={img.caption || ""}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#1a2a40]" />
                    )}

                    {/* Site ID */}
                    {img.site_id && (
                      <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-sm text-[#38BDF8] px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-wider border border-[#38BDF8]/20">
                        {img.site_id}
                      </div>
                    )}

                    {/* Availability pill */}
                    {(img.availability_from || img.availability_to) && (
                      <div className="absolute bottom-2.5 right-2.5 bg-[#0d1627]/90 backdrop-blur-sm border border-emerald-500/40 text-emerald-300 px-2.5 py-1 rounded-full text-[9px] font-medium tracking-wide">
                        {img.availability_from && formatDateShort(img.availability_from)}
                        {img.availability_from && img.availability_to && " – "}
                        {img.availability_to && formatDateShort(img.availability_to)}
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-3.5">
                    {img.caption && (
                      <p className="text-white font-bold text-[13px] mb-3 truncate">{img.caption}</p>
                    )}

                    <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 mb-3">
                      {[
                        { label: "Location", value: img.location },
                        { label: "Size", value: img.size },
                        { label: "Direction", value: img.direction },
                      ].map(({ label, value }) => value ? (
                        <div key={label}>
                          <div className="text-[8px] uppercase tracking-[0.12em] text-white/20 mb-0.5">{label}</div>
                          <div className="text-[11.5px] text-white/60 font-light truncate">{value}</div>
                        </div>
                      ) : null)}
                    </div>

                    {img.price && (
                      <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.06]">
                        <span className="text-[8px] uppercase tracking-[0.12em] text-white/20">Monthly</span>
                        <span className="text-[13px] font-bold text-[#38BDF8]">
                          Rs. {img.price.toLocaleString()}
                          <span className="text-[10px] text-white/30 ml-1">/mo</span>
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* CTA */}
      <section className="pb-16 md:pb-24 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#1B2A4A] to-[#0a1120] rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#38BDF8]/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-3">Book a Campaign in {city.name}</h2>
            <p className="text-gray-400 text-sm font-light max-w-lg">Secure premium advertising real estate in {city.name}&apos;s most high-traffic locations.</p>
          </div>
          <Link href="/#contact" className="relative z-10 shrink-0 inline-flex items-center gap-3 bg-[#38BDF8] hover:bg-white text-white hover:text-[#0a1120] px-6 md:px-8 py-3.5 md:py-4 rounded-full font-black uppercase tracking-widest text-xs md:text-sm transition-all duration-300">
            Request Inventory <ArrowLeft size={16} className="rotate-180" />
          </Link>
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#0d1627] border border-white/10 rounded-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal image */}
              <div className="relative h-48 sm:h-64 shrink-0">
                {active.image_url ? (
                  <img src={active.image_url} alt={active.caption || ""} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#1a2a40]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1627] via-transparent to-transparent" />

                {/* Close button */}
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/60 hover:bg-[#38BDF8] backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center text-white transition-colors"
                >
                  <X size={16} />
                </button>

                {/* Site ID on image */}
                {active.site_id && (
                  <div className="absolute bottom-3 left-3 bg-[#38BDF8] text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider">
                    {active.site_id}
                  </div>
                )}
              </div>

              {/* Modal body */}
              <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-5" data-lenis-prevent>
                {/* Title */}
                {active.caption && (
                  <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">{active.caption}</h2>
                )}

                {/* Fields grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {active.location && (
                    <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3.5 flex gap-3 items-start">
                      <MapPin size={15} className="text-[#38BDF8] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[8px] uppercase tracking-[0.15em] text-white/25 mb-1">Location</div>
                        <div className="text-sm text-white/80 font-light leading-snug">{active.location}</div>
                      </div>
                    </div>
                  )}
                  {active.size && (
                    <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3.5 flex gap-3 items-start">
                      <Ruler size={15} className="text-[#38BDF8] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[8px] uppercase tracking-[0.15em] text-white/25 mb-1">Size</div>
                        <div className="text-sm text-white/80 font-light">{active.size}</div>
                      </div>
                    </div>
                  )}
                  {active.direction && (
                    <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3.5 flex gap-3 items-start">
                      <Navigation size={15} className="text-[#38BDF8] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[8px] uppercase tracking-[0.15em] text-white/25 mb-1">Direction</div>
                        <div className="text-sm text-white/80 font-light">{active.direction}</div>
                      </div>
                    </div>
                  )}
                  {(active.availability_from || active.availability_to) && (
                    <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-xl p-3.5 flex gap-3 items-start">
                      <Calendar size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[8px] uppercase tracking-[0.15em] text-emerald-400/60 mb-1">Availability</div>
                        <div className="text-sm text-emerald-300 font-light">
                          {active.availability_from && formatDate(active.availability_from)}
                          {active.availability_from && active.availability_to && " → "}
                          {active.availability_to && formatDate(active.availability_to)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Price */}
                {active.price && (
                  <div className="bg-[#38BDF8]/10 border border-[#38BDF8]/20 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Banknote size={18} className="text-[#38BDF8]" />
                      <div>
                        <div className="text-[8px] uppercase tracking-[0.15em] text-[#38BDF8]/60 mb-0.5">Monthly Rate</div>
                        <div className="text-2xl font-black text-[#38BDF8]">
                          Rs. {active.price.toLocaleString()}
                          <span className="text-sm text-white/30 ml-1 font-normal">/mo</span>
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/#contact"
                      onClick={() => setActive(null)}
                      className="shrink-0 bg-[#38BDF8] hover:bg-white text-white hover:text-[#0a1120] px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all"
                    >
                      Book Now
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
