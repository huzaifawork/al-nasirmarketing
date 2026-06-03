"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  MapPin, 
  Users, 
  UserCircle, 
  Inbox, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  Images
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (!session && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050a15] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#2EAB8C] rounded-full blur-[150px] opacity-20 animate-pulse" />
        <div className="relative z-10 w-16 h-16 border-4 border-white/10 border-t-[#2EAB8C] rounded-full animate-spin" />
        <span className="mt-8 text-[#2EAB8C] font-black uppercase tracking-[0.3em] text-xs">Authenticating</span>
      </div>
    );
  }

  if (pathname === '/admin/login') return <>{children}</>;

  const menuItems = [
    { name: 'Overview', icon: LayoutDashboard, href: '/admin' },
    { name: 'Presence', icon: MapPin, href: '/admin/presence' },
    { name: 'Media', icon: Images, href: '/admin/media' },
    { name: 'Clients', icon: Users, href: '/admin/clients' },
    { name: 'Team', icon: UserCircle, href: '/admin/team' },
    { name: 'Inbox', icon: Inbox, href: '/admin/inbox' },
    { name: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#050a15] flex text-white relative overflow-hidden">
      {/* Global Admin Background Decor */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#496B88]/10 via-transparent to-transparent pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#2EAB8C]/10 via-transparent to-transparent pointer-events-none" />

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 w-72 bg-[#0a1120]/80 backdrop-blur-3xl border-r border-white/5 transition-all duration-500 ease-in-out transform lg:translate-x-0 shadow-[20px_0_50px_rgba(0,0,0,0.5)]",
          !sidebarOpen && "-translate-x-full lg:w-24"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <div className={cn("flex items-center gap-4 transition-opacity", !sidebarOpen && "lg:opacity-0 lg:w-0 lg:overflow-hidden")}>
              <div className="w-10 h-10 bg-gradient-to-br from-[#2EAB8C] to-[#496B88] rounded-xl rotate-45 flex items-center justify-center shadow-[0_0_20px_rgba(46,171,140,0.3)]">
                <div className="w-4 h-4 bg-white rounded-sm -rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="font-black tracking-tighter uppercase text-xl leading-none">Al-Nasir</span>
                <span className="text-[9px] text-[#2EAB8C] font-bold uppercase tracking-[0.2em] mt-1">Workspace</span>
              </div>
            </div>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:flex hidden p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all border border-white/5"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-8 space-y-3 overflow-y-auto custom-scrollbar">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                    isActive 
                      ? "bg-gradient-to-r from-[#2EAB8C] to-[#496B88] text-white shadow-[0_10px_30px_rgba(46,171,140,0.3)] border border-white/10" 
                      : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                  )}
                >
                  <Icon size={20} className={cn("shrink-0 relative z-10", isActive ? "text-white" : "group-hover:text-[#2EAB8C] transition-colors")} />
                  <span className={cn("text-xs font-black tracking-[0.15em] uppercase whitespace-nowrap transition-opacity relative z-10", !sidebarOpen && "lg:opacity-0 lg:hidden")}>
                    {item.name}
                  </span>
                  {isActive && sidebarOpen && (
                    <ChevronRight size={16} className="ml-auto opacity-50 relative z-10" />
                  )}
                  {!isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2EAB8C] opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User / Logout */}
          <div className="p-6 border-t border-white/5 bg-gradient-to-t from-[#0a1120] to-transparent">
            <button 
              onClick={() => supabase.auth.signOut()}
              className="w-full flex items-center justify-center gap-4 px-4 py-4 rounded-2xl text-gray-400 hover:text-white bg-white/5 hover:bg-red-500 hover:shadow-[0_10px_30px_rgba(239,68,68,0.3)] transition-all group border border-white/5 hover:border-red-400/50"
            >
              <LogOut size={18} className="shrink-0 group-hover:-translate-x-1 transition-transform" />
              <span className={cn("text-xs font-black tracking-widest uppercase transition-opacity", !sidebarOpen && "lg:opacity-0 lg:hidden")}>
                Disconnect
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col overflow-hidden relative z-10">
        {/* Header (Mobile Toggle) */}
        <header className="lg:hidden p-4 border-b border-white/5 flex items-center justify-between bg-[#0a1120]/80 backdrop-blur-xl z-20">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#2EAB8C] to-[#496B88] rounded-lg rotate-45 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm -rotate-45" />
              </div>
              <span className="font-black tracking-tighter uppercase text-lg text-white">Workspace</span>
            </div>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-gray-400 bg-white/5 rounded-lg border border-white/10"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-16 custom-scrollbar">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-[#050a15]/80 backdrop-blur-md z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
