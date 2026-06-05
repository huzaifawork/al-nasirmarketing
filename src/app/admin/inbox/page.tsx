"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Inbox, 
  Trash2, 
  CheckCircle2, 
  Mail, 
  Phone, 
  Building2, 
  Clock,
  Loader2,
  X,
  Search,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type Submission = {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  service_interest: string | null;
  message: string | null;
  is_read: boolean;
  created_at: string;
};

export default function InboxAdmin() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
    
    if (filter === 'unread') query = query.eq('is_read', false);
    if (filter === 'read') query = query.eq('is_read', true);

    const { data, error } = await query;
    if (!error && data) setSubmissions(data as Submission[]);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ is_read: true })
      .eq('id', id);
    if (!error) fetchSubmissions();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this submission?')) return;
    const { error } = await supabase.from('contact_submissions').delete().eq('id', id);
    if (!error) {
      setSelectedSubmission(null);
      fetchSubmissions();
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Inquiry Inbox</h1>
          <p className="text-gray-400 text-sm font-medium tracking-wide">Manage incoming leads and agency project requests.</p>
        </div>
        
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          {(['all', 'unread', 'read'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                filter === f ? "bg-[#38BDF8] text-white" : "text-gray-500 hover:text-white"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-[#38BDF8]" size={32} />
        </div>
      ) : submissions.length === 0 ? (
        <div className="bg-white/[0.02] border border-dashed border-white/10 rounded-3xl p-20 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-gray-700 mb-6">
             <Inbox size={32} />
          </div>
          <h3 className="text-xl font-bold uppercase tracking-tight text-gray-500">Inbox is Clear</h3>
          <p className="text-gray-600 text-sm mt-2">No {filter !== 'all' ? filter : ''} submissions found.</p>
        </div>
      ) : (
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
          {/* List */}
          <div className={cn(
            "lg:col-span-1 space-y-4 lg:max-h-[600px] overflow-y-auto pr-2 custom-scrollbar",
            selectedSubmission ? "hidden lg:block" : "block"
          )}>
            {submissions.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubmission(sub)}
                className={cn(
                  "w-full text-left p-6 rounded-2xl border transition-all relative group",
                  selectedSubmission?.id === sub.id 
                    ? "bg-[#121d36] border-[#38BDF8]/50" 
                    : "bg-white/[0.03] border-white/5 hover:border-white/10"
                )}
              >
                {!sub.is_read && (
                  <div className="absolute top-6 right-6 w-2 h-2 bg-[#38BDF8] rounded-full shadow-[0_0_8px_#38BDF8]" />
                )}
                <h4 className="font-bold text-white uppercase tracking-tight mb-1 truncate pr-6">{sub.name}</h4>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-3">{sub.company || 'Private Individual'}</p>
                <div className="flex items-center gap-2 text-gray-600 text-[10px] font-medium">
                  <Clock size={12} />
                  {new Date(sub.created_at).toLocaleDateString()}
                </div>
              </button>
            ))}
          </div>

          {/* Details View */}
          <div className={cn(
            "lg:col-span-2",
            selectedSubmission ? "block" : "hidden lg:block"
          )}>
            <AnimatePresence mode="wait">
              {selectedSubmission ? (
                <motion.div
                  key={selectedSubmission.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10 flex flex-col"
                >
                  <div className="flex justify-between items-start mb-8 pb-8 border-b border-white/5">
                    <div className="flex-1 min-w-0">
                      <button
                        onClick={() => setSelectedSubmission(null)}
                        className="lg:hidden flex items-center gap-1 text-[#38BDF8] text-[10px] font-black uppercase tracking-widest mb-4"
                      >
                        ← Back
                      </button>
                      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 truncate">{selectedSubmission.name}</h2>
                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Building2 size={16} className="text-[#38BDF8]" />
                          {selectedSubmission.company || 'N/A'}
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Mail size={16} className="text-[#38BDF8]" />
                          {selectedSubmission.email}
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Phone size={16} className="text-[#38BDF8]" />
                          {selectedSubmission.phone || 'N/A'}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0 ml-4">
                      {!selectedSubmission.is_read && (
                        <button 
                          onClick={() => markAsRead(selectedSubmission.id)}
                          className="flex items-center gap-2 bg-[#38BDF8] hover:bg-[#258f75] text-white px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all whitespace-nowrap"
                        >
                          <CheckCircle2 size={14} />
                          <span className="hidden sm:inline">Mark Read</span>
                        </button>
                      )}
                      <button 
                         onClick={() => handleDelete(selectedSubmission.id)}
                         className="p-2 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-500 rounded-xl transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 space-y-8">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#38BDF8] mb-4">Service Interest</h4>
                      <div className="inline-block px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-sm font-bold text-white uppercase tracking-wider">
                        {selectedSubmission.service_interest || 'General Inquiry'}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#38BDF8] mb-4">Message Body</h4>
                      <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl text-gray-300 leading-relaxed text-lg italic font-serif">
                        &quot;{selectedSubmission.message || 'No message provided.'}&quot;
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-10 border-t border-white/5 text-[10px] text-gray-600 uppercase tracking-widest font-bold">
                    Submitted on {new Date(selectedSubmission.created_at).toLocaleString()}
                  </div>
                </motion.div>
              ) : (
                <div className="h-full bg-white/[0.01] border border-dashed border-white/5 rounded-3xl flex items-center justify-center text-gray-700 uppercase font-black tracking-widest text-sm">
                  Select a submission to view details
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
