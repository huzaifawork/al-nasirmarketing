"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa";
import { supabase } from "@/lib/supabase";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  department: string;
  photo_url: string | null;
  quote: string | null;
  linkedin_url: string | null;
  fun_fact: string | null;
};

const MOCK_TEAM: TeamMember[] = [
  {
    id: "1",
    name: "Ahmad Nasir",
    role: "Chief Executive Officer",
    department: "Leadership",
    photo_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    quote: "Vision without execution is just hallucination. We execute flawlessly.",
    linkedin_url: "https://linkedin.com",
    fun_fact: "Started the agency from a single desk in 1994.",
  },
  {
    id: "2",
    name: "Sarah Khan",
    role: "Creative Director",
    department: "Creative",
    photo_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    quote: "Design is the silent ambassador of your brand.",
    linkedin_url: "https://linkedin.com",
    fun_fact: "Has an unhealthy obsession with typography and coffee.",
  },
  {
    id: "3",
    name: "Usman Ali",
    role: "Head of Digital",
    department: "Digital",
    photo_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
    quote: "Data beats opinions. Let the metrics guide the creative.",
    linkedin_url: "https://linkedin.com",
    fun_fact: "Reads API documentation for fun.",
  },
];

const deptColor: Record<string, string> = {
  Leadership: "bg-[#2EAB8C]/20 text-[#2EAB8C] border-[#2EAB8C]/30",
  Creative: "bg-[#496B88]/20 text-[#496B88] border-[#496B88]/30",
  Digital: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  default: "bg-white/10 text-gray-300 border-white/20",
};

const deptAccent: Record<string, string> = {
  Leadership: "#2EAB8C",
  Creative: "#496B88",
  Digital: "#a855f7",
  default: "#ffffff",
};

export default function Team() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeam() {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("sort_order", { ascending: true });
      if (!error && data && data.length > 0) setMembers(data);
      setLoading(false);
    }
    fetchTeam();
  }, []);

  const displayMembers = members.length > 0 ? members : MOCK_TEAM;

  return (
    <section id="team" className="py-16 md:py-32 bg-[#050A15] relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(46,171,140,0.06),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <span className="w-8 md:w-12 h-[2px] bg-[#2EAB8C]" />
            <span className="text-[#2EAB8C] text-xs md:text-sm font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">Our People</span>
            <span className="w-8 md:w-12 h-[2px] bg-[#2EAB8C]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 md:mb-6">
            Meet The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2EAB8C] to-[#496B88]">Team</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl font-light">
            A collective of visionaries, strategists, and creatives dedicated to pushing the boundaries of marketing.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {displayMembers.map((member, i) => {
            const colorClass = deptColor[member.department] || deptColor.default;
            const accent = deptAccent[member.department] || deptAccent.default;

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="group relative bg-[#0d1627] border border-white/8 rounded-2xl md:rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              >
                {/* Top accent line */}
                <div className="h-[3px] w-full" style={{ background: `linear-gradient(to right, ${accent}, transparent)` }} />

                {/* Photo area */}
                <div className="relative h-48 md:h-64 overflow-hidden bg-[#0a1120]">
                  <Image
                    src={member.photo_url || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop"}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1627] via-[#0d1627]/20 to-transparent" />

                  {/* Dept badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border ${colorClass}`}>
                      {member.department}
                    </span>
                  </div>

                  {/* LinkedIn */}
                  {member.linkedin_url && (
                    <Link
                      href={member.linkedin_url}
                      target="_blank"
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#0077b5] hover:border-[#0077b5] transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                    >
                      <FaLinkedinIn size={13} />
                    </Link>
                  )}
                </div>

                {/* Info */}
                <div className="p-7">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight leading-none mb-1">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] mb-5" style={{ color: accent }}>
                    {member.role}
                  </p>

                  {member.quote && (
                    <p className="text-gray-400 text-sm leading-relaxed font-light italic border-l-2 pl-4 mb-5" style={{ borderColor: accent + "60" }}>
                      &ldquo;{member.quote}&rdquo;
                    </p>
                  )}

                  {member.fun_fact && (
                    <div className="pt-5 border-t border-white/5">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600 block mb-1">Fun Fact</span>
                      <p className="text-gray-300 text-xs leading-relaxed">{member.fun_fact}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
