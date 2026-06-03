"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { Crown, Gem, Shield, Star, Trophy, Zap, Globe, Target } from 'lucide-react';

type Client = {
  id: string;
  name: string;
  logo_url: string;
  is_featured: boolean;
};

const MOCK_CLIENTS = [
  { id: 'm1', name: 'Empire Corp', icon: Crown, is_featured: true },
  { id: 'm2', name: 'Nexus Tech', icon: Zap, is_featured: true },
  { id: 'm3', name: 'Aegis Security', icon: Shield, is_featured: true },
  { id: 'm4', name: 'Stellar Group', icon: Star, is_featured: true },
  { id: 'm5', name: 'Apex Pinnacle', icon: Trophy, is_featured: true },
  { id: 'm6', name: 'Global Media', icon: Globe, is_featured: false },
  { id: 'm7', name: 'Precision Ads', icon: Target, is_featured: false },
  { id: 'm8', name: 'Gemstone', icon: Gem, is_featured: false },
];

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClients() {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (!error && data && data.length > 0) {
        const formattedData: Client[] = data.map(c => ({
          id: c.id,
          name: c.name,
          logo_url: c.logo_url,
          is_featured: !!c.is_featured
        }));
        setClients(formattedData);
      }
      setLoading(false);
    }
    fetchClients();
  }, []);

  const useMock = clients.length === 0;
  
  const featuredClients = useMock 
    ? MOCK_CLIENTS.filter(c => c.is_featured) 
    : clients.filter(c => c.is_featured);
    
  const marqueeClients = useMock ? MOCK_CLIENTS : clients;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, bounce: 0.5 } }
  };

  const doubleMarquee = [...marqueeClients, ...marqueeClients, ...marqueeClients, ...marqueeClients];

  return (
    <section id="clients" className="py-32 bg-[#0a1120] relative overflow-hidden border-y border-white/5">
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
            <span className="w-12 h-[2px] bg-[#2EAB8C]" />
            <span className="text-[#2EAB8C] text-xs font-black uppercase tracking-[0.4em]">Our Partners</span>
            <span className="w-12 h-[2px] bg-[#2EAB8C]" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase mb-0"
          >
            Brands That <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2EAB8C] to-[#496B88]">Trust Us</span>
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
                className="flex flex-col items-center justify-center p-8 bg-[#121d36]/50 backdrop-blur-sm rounded-3xl border border-white/10 group transition-all duration-500 hover:shadow-[0_0_30px_rgba(46,171,140,0.15)] hover:-translate-y-2 hover:border-[#2EAB8C]/50 h-40 relative overflow-hidden"
              >
                <div className="relative w-full h-full flex items-center justify-center filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-125">
                  {useMock ? (
                    <client.icon size={48} className="text-white group-hover:text-[#2EAB8C] transition-colors" />
                  ) : (
                    <Image 
                      src={client.logo_url} 
                      alt={client.name}
                      fill
                      className="object-contain p-2"
                      sizes="200px"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                  <span className="text-[10px] font-black text-[#2EAB8C] uppercase tracking-widest text-center">
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
          
          <style dangerouslySetInnerHTML={{__html: `
            .marquee-container-fast {
              animation: marquee-fast 40s linear infinite;
            }
            .marquee-container-reverse {
              animation: marquee-reverse 45s linear infinite;
            }
            @keyframes marquee-fast {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            @keyframes marquee-reverse {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0%); }
            }
          `}} />

          {/* Forward Lane */}
          <div className="flex gap-20 marquee-container-fast w-max hover:[animation-play-state:paused] items-center">
            {doubleMarquee.map((client: any, index) => (
              <div 
                key={`fwd-${client.id}-${index}`} 
                className="flex items-center gap-6 shrink-0 group/logo cursor-pointer px-4"
              >
                <div className="relative w-16 h-16 flex items-center justify-center grayscale opacity-30 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 transition-all duration-500 transform group-hover/logo:scale-125 group-hover/logo:rotate-12">
                  {useMock ? (
                    <client.icon size={40} className="text-white" />
                  ) : (
                    <Image 
                      src={client.logo_url} 
                      alt={client.name}
                      fill
                      className="object-contain"
                      sizes="64px"
                      loading="lazy"
                    />
                  )}
                </div>
                <span className="text-3xl font-black text-white uppercase tracking-tighter opacity-10 group-hover/logo:opacity-100 transition-all duration-500 transform translate-x-[-10px] group-hover/logo:translate-x-0 group-hover/logo:text-[#2EAB8C]">
                  {client.name}
                </span>
              </div>
            ))}
          </div>

          {/* Reverse Lane */}
          <div className="flex gap-20 marquee-container-reverse w-max hover:[animation-play-state:paused] items-center ml-[-15%]">
            {doubleMarquee.map((client: any, index) => (
              <div 
                key={`rev-${client.id}-${index}`} 
                className="flex items-center gap-6 shrink-0 group/logo cursor-pointer px-4"
              >
                <span className="text-3xl font-black text-white uppercase tracking-tighter opacity-10 group-hover/logo:opacity-100 transition-all duration-500 transform translate-x-[10px] group-hover/logo:translate-x-0 group-hover/logo:text-[#496B88]">
                  {client.name}
                </span>
                <div className="relative w-16 h-16 flex items-center justify-center grayscale opacity-30 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 transition-all duration-500 transform group-hover/logo:scale-125 group-hover/logo:-rotate-12">
                  {useMock ? (
                    <client.icon size={40} className="text-white" />
                  ) : (
                    <Image 
                      src={client.logo_url} 
                      alt={client.name}
                      fill
                      className="object-contain"
                      sizes="64px"
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
