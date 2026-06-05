"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface MediaStripProps {
  direction?: "left" | "right";
  speed?: number;
  fallbackImages?: string[];
}

export default function MediaStrip({
  direction = "left",
  speed = 30,
  fallbackImages = [],
}: MediaStripProps) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function fetchMedia() {
      const { data, error } = await supabase
        .from("media_showcase")
        .select("image_url")
        .order("sort_order", { ascending: true });
      if (!error && data && data.length > 0) {
        setImages(data.map((d) => d.image_url));
      } else {
        setImages(fallbackImages);
      }
    }
    fetchMedia();
  }, []);

  if (images.length === 0) return null;

  const duplicated = [...images, ...images, ...images];

  return (
    <div className="w-full overflow-hidden bg-[#0a1120] py-12 flex relative group">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a1120] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a1120] to-transparent z-10 pointer-events-none" />

      <div
        className="flex gap-4 w-max group-hover:[animation-play-state:paused]"
        style={{
          animation: `mediastrip-marquee ${speed}s linear infinite${direction === "right" ? " reverse" : ""}`,
          willChange: "transform",
        }}
      >
        {duplicated.map((src, i) => (
          <div
            key={i}
            className="relative w-[300px] h-[200px] shrink-0 rounded-xl overflow-hidden shadow-lg border border-white/5 transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]"
          >
            <Image
              src={src}
              alt={`Media showcase ${i}`}
              fill
              className="object-cover"
              sizes="300px"
              loading="lazy"
              quality={75}
            />
            <div className="absolute inset-0 bg-[#0a1120]/20 hover:bg-transparent transition-colors duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
