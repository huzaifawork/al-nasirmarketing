"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1120] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#2EAB8C]/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#496B88]/10 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-10">
            <div className="relative w-40 h-14 mx-auto mb-6">
              <Image src="/logo.png" alt="Al-Nasir Advertising" fill className="object-contain" priority />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tighter uppercase mb-2">Admin Portal</h1>
            <p className="text-gray-400 text-sm">Secure access for Al-Nasir Agency management.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 px-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@al-nasir.com"
                  required
                  className="w-full bg-white/[0.05] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#2EAB8C] focus:ring-1 focus:ring-[#2EAB8C] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 px-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/[0.05] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#2EAB8C] focus:ring-1 focus:ring-[#2EAB8C] transition-all"
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold py-3 px-4 rounded-lg text-center uppercase tracking-wider"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2EAB8C] hover:bg-[#258f75] disabled:opacity-50 disabled:cursor-not-allowed text-white font-black uppercase tracking-[0.2em] py-4 rounded-xl transition-all shadow-[0_10px_20px_rgba(46,171,140,0.2)] hover:shadow-[0_15px_30px_rgba(46,171,140,0.3)] hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Verifying...</span>
                </>
              ) : (
                <span>Login to Dashboard</span>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-500 text-[10px] uppercase tracking-widest mt-8">
          &copy; {new Date().getFullYear()} AL-NASIR ADVERTISING • SECURE SYSTEMS
        </p>
      </motion.div>
    </div>
  );
}
