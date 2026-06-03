"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, MapPin, Camera, Loader2 } from "lucide-react";
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
  sort_order: number | null;
};

export default function CityPresencePage() {
  const params = useParams();
  const slug = params.slug as string;

  const [city, setCity] = useState<City | null>(null);
  const [images, setImages] = useState<PresenceImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: cityData } = await supabase
        .from("presence_cities")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!cityData) { setLoading(false); return; }
      setCity(cityData);

      const { data: imgData } = await supabase
        .from("presence_images")
        .select("*")
        .eq("city_id", cityData.id)
        .order("sort_order", { ascending: true });

      if (imgData) setImages(imgData);
      setLoading(false);
    }
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a1120] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#2EAB8C]" size={40} />
      </main>
    );
  }

  if (!city) {
    return (
      <main className="min-h-screen bg-[#0a1120] flex flex-col items-center justify-center gap-6 text-white">
        <MapPin size={48} className="text-[#2EAB8C]/40" />
        <h1 className="text-3xl font-black uppercase tracking-tighter">City Not Found</h1>
        <Link href="/#presence" className="text-[#2EAB8C] font-bold uppercase tracking-widest text-sm hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Presence
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a1120] text-white">
      {/* Hero */}
      <section className="relative h-[65vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {city.cover_image_url ? (
            <Image
              src={city.cover_image_url}
              alt={city.name}
              fill
              className="object-cover brightness-75"
              priority
              sizes="100vw"
              quality={85}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1B2A4A] to-[#0a1120]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120] via-[#0a1120]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1120]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full pb-16">
          <Link
            href="/#presence"
            className="inline-flex items-center gap-2 text-[#2EAB8C] font-bold text-xs uppercase tracking-[0.2em] mb-10 hover:gap-4 transition-all duration-300"
          >
            <ArrowLeft size={16} /> Back to Presence
          </Link>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-[#2EAB8C]" />
              <span className="text-[#2EAB8C] text-xs font-black uppercase tracking-[0.3em]">Operational Hub</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
              {city.name}
            </h1>
            <p className="text-gray-400 font-light text-lg">
              {images.length} placement{images.length !== 1 ? "s" : ""} in our inventory
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {images.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-white/10 rounded-3xl">
            <Camera size={40} className="text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No images added yet</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-2xl font-black uppercase tracking-tight text-white">Campaign Gallery</h2>
              <div className="h-px bg-white/10 flex-grow" />
              <span className="text-gray-500 text-sm font-medium">{images.length} placements</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 hover:border-[#2EAB8C]/30 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                >
                  <Image
                    src={img.image_url}
                    alt={img.caption || `${city.name} placement ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120] via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-2 mb-1 text-[#2EAB8C]">
                      <Camera size={12} />
                      <span className="text-[9px] font-black uppercase tracking-[0.2em]">Placement View</span>
                    </div>
                    {img.caption && (
                      <p className="text-white font-bold text-sm leading-tight">{img.caption}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* CTA */}
      <section className="pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#1B2A4A] to-[#0a1120] rounded-[3rem] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2EAB8C]/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-3">
              Book a Campaign in {city.name}
            </h2>
            <p className="text-gray-400 font-light max-w-lg">
              Secure premium advertising real estate in {city.name}&apos;s most high-traffic locations.
            </p>
          </div>
          <Link
            href="/#contact"
            className="relative z-10 shrink-0 inline-flex items-center gap-3 bg-[#2EAB8C] hover:bg-white text-white hover:text-[#0a1120] px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all duration-300 hover:scale-105"
          >
            Request Inventory <ArrowLeft size={16} className="rotate-180" />
          </Link>
        </div>
      </section>
    </main>
  );
}
