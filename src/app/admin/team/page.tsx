"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, UserCircle, Trash2, Edit3, Loader2, X, Save, Quote } from 'lucide-react';
import { FaLinkedinIn } from 'react-icons/fa';
import ImageUpload from '@/components/ImageUpload';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type TeamMember = {
  id: string;
  name: string;
  role: string;
  department: string;
  photo_url: string | null;
  quote: string | null;
  linkedin_url: string | null;
  fun_fact: string | null;
  sort_order: number;
};

export default function TeamAdmin() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState<Partial<TeamMember> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchTeam = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (!error && data) setTeam(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember?.name || !editingMember?.role || !editingMember?.department) return;

    setSaving(true);
    const memberData = {
      name: editingMember.name,
      role: editingMember.role,
      department: editingMember.department,
      photo_url: editingMember.photo_url || '',
      quote: editingMember.quote || '',
      linkedin_url: editingMember.linkedin_url || '',
      fun_fact: editingMember.fun_fact || '',
      sort_order: editingMember.sort_order || 0
    };

    let error;
    if (editingMember.id) {
      ({ error } = await supabase
        .from('team_members')
        .update(memberData)
        .eq('id', editingMember.id));
    } else {
      ({ error } = await supabase
        .from('team_members')
        .insert([memberData]));
    }

    if (!error) {
      setIsModalOpen(false);
      setEditingMember(null);
      fetchTeam();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    const { error } = await supabase.from('team_members').delete().eq('id', id);
    if (!error) fetchTeam();
  };

  const getDeptColor = (dept: string) => {
    switch (dept) {
      case 'Leadership': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Creative': return 'bg-[#2EAB8C]/20 text-[#2EAB8C] border-[#2EAB8C]/30';
      case 'Digital': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-white/10 text-gray-400 border-white/5';
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Team Showcase</h1>
          <p className="text-gray-400 text-sm font-medium tracking-wide">Manage agency personnel and leadership profiles.</p>
        </div>
        <button 
          onClick={() => {
            setEditingMember({ name: '', role: '', department: 'Leadership', sort_order: 0 });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-[#2EAB8C] hover:bg-[#258f75] text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-[0_10px_20px_rgba(46,171,140,0.2)]"
        >
          <Plus size={18} />
          <span>Add Member</span>
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-[#2EAB8C]" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <motion.div
              layout
              key={member.id}
              className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 group hover:border-[#2EAB8C]/30 transition-all flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => {
                    setEditingMember(member);
                    setIsModalOpen(true);
                  }}
                  className="p-2 bg-[#121d36] hover:bg-[#2EAB8C] text-white rounded-lg transition-colors shadow-xl"
                >
                  <Edit3 size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(member.id)}
                  className="p-2 bg-[#121d36] hover:bg-red-500 text-white rounded-lg transition-colors shadow-xl"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="w-24 h-24 rounded-full border-2 border-[#2EAB8C] p-1 mb-6 relative overflow-hidden">
                {member.photo_url ? (
                  <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <div className="w-full h-full bg-white/5 rounded-full flex items-center justify-center text-gray-700">
                    <UserCircle size={48} />
                  </div>
                )}
              </div>

              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1">{member.name}</h3>
              <p className="text-[#2EAB8C] text-[10px] font-black uppercase tracking-[0.2em] mb-4">{member.role}</p>

              <span className={cn(
                "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border mb-6",
                getDeptColor(member.department)
              )}>
                {member.department}
              </span>

              {member.quote && (
                <div className="relative pt-6 border-t border-white/5 w-full">
                  <Quote size={16} className="text-[#2EAB8C] absolute top-[-8px] left-1/2 -translate-x-1/2 bg-[#0d1627] px-1" />
                  <p className="text-gray-400 text-xs italic leading-relaxed line-clamp-2">
                    &quot;{member.quote}&quot;
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0d1627] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#121d36]">
                <h2 className="text-2xl font-black uppercase tracking-tighter">
                  {editingMember?.id ? 'Edit Member' : 'Add New Member'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      value={editingMember?.name || ''}
                      onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2EAB8C] transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Position / Role</label>
                    <input 
                      type="text" 
                      value={editingMember?.role || ''}
                      onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2EAB8C] transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Department</label>
                    <select 
                      value={editingMember?.department || 'Leadership'}
                      onChange={(e) => setEditingMember({ ...editingMember, department: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2EAB8C] transition-all appearance-none"
                    >
                      <option value="Leadership">Leadership</option>
                      <option value="Creative">Creative</option>
                      <option value="Digital">Digital</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">LinkedIn URL</label>
                    <div className="relative">
                      <FaLinkedinIn className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                      <input 
                        type="url" 
                        value={editingMember?.linkedin_url || ''}
                        onChange={(e) => setEditingMember({ ...editingMember, linkedin_url: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#2EAB8C] transition-all"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                  </div>
                </div>

                <ImageUpload
                  value={editingMember?.photo_url || ''}
                  onChange={(url) => setEditingMember({ ...editingMember, photo_url: url })}
                  folder="team"
                  label="Photo"
                />

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Personal Quote</label>
                  <textarea 
                    value={editingMember?.quote || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, quote: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2EAB8C] transition-all min-h-[100px]"
                    placeholder="A short motto or quote..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Fun Fact</label>
                    <input 
                      type="text" 
                      value={editingMember?.fun_fact || ''}
                      onChange={(e) => setEditingMember({ ...editingMember, fun_fact: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2EAB8C] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Sort Order</label>
                    <input 
                      type="number" 
                      value={editingMember?.sort_order || 0}
                      onChange={(e) => setEditingMember({ ...editingMember, sort_order: parseInt(e.target.value) })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2EAB8C] transition-all"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-[#2EAB8C] hover:bg-[#258f75] disabled:opacity-50 text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
                  >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    <span>{editingMember?.id ? 'Update Member' : 'Add to Team'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
