"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Inbox, 
  MapPin, 
  Users, 
  UserCircle, 
  TrendingUp, 
  ArrowRight,
  Loader2,
  Activity
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    contacts: 0,
    cities: 0,
    clients: 0,
    team: 0,
    unreadContacts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [
        { count: contactsCount },
        { count: unreadCount },
        { count: citiesCount },
        { count: clientsCount },
        { count: teamCount }
      ] = await Promise.all([
        supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).eq('is_read', false),
        supabase.from('presence_cities').select('*', { count: 'exact', head: true }),
        supabase.from('clients').select('*', { count: 'exact', head: true }),
        supabase.from('team_members').select('*', { count: 'exact', head: true })
      ]);

      setStats({
        contacts: contactsCount || 0,
        unreadContacts: unreadCount || 0,
        cities: citiesCount || 0,
        clients: clientsCount || 0,
        team: teamCount || 0
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  const statCards = [
    { name: 'Inquiries', value: stats.contacts, sub: `${stats.unreadContacts} unread`, icon: Inbox, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', shadow: 'shadow-[0_0_30px_rgba(96,165,250,0.1)]', href: '/admin/inbox' },
    { name: 'Presence', value: stats.cities, sub: 'Active locations', icon: MapPin, color: 'text-[#38BDF8]', bg: 'bg-[#38BDF8]/10', border: 'border-[#38BDF8]/20', shadow: 'shadow-[0_0_30px_rgba(56,189,248,0.1)]', href: '/admin/presence' },
    { name: 'Team', value: stats.team, sub: 'Key personnel', icon: UserCircle, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20', shadow: 'shadow-[0_0_30px_rgba(192,132,252,0.1)]', href: '/admin/team' },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <Loader2 className="animate-spin text-[#38BDF8] mb-4" size={40} />
        <span className="text-[#38BDF8] font-black uppercase tracking-widest text-xs">Compiling Metrics</span>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-1 bg-[#38BDF8] rounded-full" />
            <span className="text-[#38BDF8] font-black tracking-[0.3em] uppercase text-[10px]">Command Center</span>
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
            Overview
          </h1>
        </div>
        <div className="flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-full border border-white/10">
          <div className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest text-gray-300">System Online</span>
        </div>
      </div>

      {/* Stat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: 'spring', damping: 20 }}
              className={`relative bg-[#0a1120]/50 backdrop-blur-xl border ${stat.border} rounded-[2rem] p-8 hover:-translate-y-2 transition-all duration-300 group ${stat.shadow}`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-tr-[2rem] pointer-events-none" />
              
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl border border-white/5`}>
                  <Icon size={28} />
                </div>
                <div className="bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                  Live Data
                </div>
              </div>
              <h3 className="text-gray-400 text-[11px] font-black uppercase tracking-[0.2em] mb-2">{stat.name}</h3>
              <div className="flex items-end gap-3 mb-2">
                <p className="text-5xl font-black tracking-tighter">{stat.value}</p>
              </div>
              <p className="text-[#38BDF8] text-[10px] uppercase font-bold tracking-wider">{stat.sub}</p>
              
              <div className="mt-8 pt-6 border-t border-white/5">
                <Link 
                  href={stat.href}
                  className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors group/link"
                >
                  Manage Module 
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-[#38BDF8] transition-colors">
                    <ArrowRight size={10} className="group-hover/link:text-[#0a1120]" />
                  </div>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Activity Chart Mockup (Left Column) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-[#0a1120]/50 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 lg:p-10 relative overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#38BDF8]/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="flex justify-between items-center mb-10 relative z-10">
            <div className="flex items-center gap-3">
              <Activity className="text-[#496B88]" size={24} />
              <h2 className="text-xl font-black uppercase tracking-tight">System Activity</h2>
            </div>
            <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-300 outline-none">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>

          {/* CSS Mock Chart */}
          <div className="h-64 w-full flex items-end gap-2 md:gap-4 relative z-10">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full h-px bg-[#496B88] border-dashed border-b border-[#496B88]" />
              ))}
            </div>
            
            {/* Bars */}
            {[40, 70, 45, 90, 60, 100, 85].map((height, i) => (
              <div key={i} className="relative flex-1 group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 1, delay: 0.5 + (i * 0.1), type: 'spring' }}
                  className="w-full bg-gradient-to-t from-[#496B88]/20 to-[#38BDF8] rounded-t-lg relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase text-gray-500">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions (Right Column) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-[#38BDF8] to-[#1B2A4A] rounded-[2rem] p-8 text-white relative overflow-hidden shadow-[0_20px_40px_rgba(56,189,248,0.2)]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 blur-[50px] rounded-full pointer-events-none" />
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 leading-tight relative z-10">Deploy<br/>Updates</h2>
            <p className="text-white/80 text-xs leading-relaxed mb-8 relative z-10 font-medium">Keep the public frontend synchronized with the latest agency assets.</p>
            <Link 
              href="/admin/presence"
              className="relative z-10 inline-flex items-center gap-4 bg-white text-[#0a1120] px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 hover:bg-[#0a1120] hover:text-white border border-transparent hover:border-white transition-all duration-300"
            >
              Update Map <TrendingUp size={16} />
            </Link>
          </div>

          <div className="bg-[#0a1120]/50 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#496B88] mb-6">Quick Links</h2>
            <div className="space-y-3">
               {[
                 { name: 'Add New Client', href: '/admin/clients' },
                 { name: 'Onboard Team', href: '/admin/team' },
                 { name: 'System Settings', href: '/admin/settings' },
               ].map((action, i) => (
                 <Link 
                   key={action.name}
                   href={action.href}
                   className="group flex items-center justify-between w-full px-5 py-4 bg-white/5 hover:bg-[#38BDF8] border border-white/5 hover:border-[#38BDF8] rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300"
                 >
                   {action.name}
                   <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-[#0a1120]" />
                 </Link>
               ))}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
