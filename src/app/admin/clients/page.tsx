"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Users, Trash2, Edit3, Loader2, X, Save, Star } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type Client = {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
  is_featured: boolean;
  sort_order: number;
};

export default function ClientAdmin() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingClient, setEditingClient] = useState<Partial<Client> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (!error && data) setClients(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClient?.name || !editingClient?.logo_url) return;

    setSaving(true);
    const clientData = {
      name: editingClient.name,
      logo_url: editingClient.logo_url,
      website_url: editingClient.website_url || '',
      is_featured: editingClient.is_featured || false,
      sort_order: editingClient.sort_order || 0
    };

    let error;
    if (editingClient.id) {
      ({ error } = await supabase
        .from('clients')
        .update(clientData)
        .eq('id', editingClient.id));
    } else {
      ({ error } = await supabase
        .from('clients')
        .insert([clientData]));
    }

    if (!error) {
      setIsModalOpen(false);
      setEditingClient(null);
      fetchClients();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this client?')) return;
    const { error } = await supabase.from('clients').delete().eq('id', id);
    if (!error) fetchClients();
  };

  const toggleFeatured = async (client: Client) => {
    const { error } = await supabase
      .from('clients')
      .update({ is_featured: !client.is_featured })
      .eq('id', client.id);
    if (!error) fetchClients();
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Client Portfolio</h1>
          <p className="text-gray-400 text-sm font-medium tracking-wide">Manage brand logos and featured partnerships.</p>
        </div>
        <button 
          onClick={() => {
            setEditingClient({ name: '', logo_url: '', is_featured: false, sort_order: 0 });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-[#38BDF8] hover:bg-[#258f75] text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-[0_10px_20px_rgba(56,189,248,0.2)]"
        >
          <Plus size={18} />
          <span>Add New Client</span>
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-[#38BDF8]" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {clients.map((client) => (
            <motion.div
              layout
              key={client.id}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 group hover:border-[#38BDF8]/30 transition-all flex flex-col items-center text-center"
            >
              <div className="relative w-full aspect-square bg-white/[0.02] rounded-xl flex items-center justify-center mb-4 p-4">
                <img src={client.logo_url} alt={client.name} className="max-w-full max-h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                <button 
                  onClick={() => toggleFeatured(client)}
                  className={cn(
                    "absolute top-2 right-2 p-1.5 rounded-lg transition-colors",
                    client.is_featured ? "bg-[#38BDF8]/20 text-[#38BDF8]" : "bg-white/5 text-gray-600 hover:text-white"
                  )}
                  title={client.is_featured ? "Featured" : "Mark as Featured"}
                >
                  <Star size={14} fill={client.is_featured ? "currentColor" : "none"} />
                </button>
              </div>

              <h3 className="text-sm font-black text-white uppercase tracking-tighter mb-4">{client.name}</h3>

              <div className="flex gap-2 w-full">
                <button 
                  onClick={() => {
                    setEditingClient(client);
                    setIsModalOpen(true);
                  }}
                  className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(client.id)}
                  className="p-2 bg-white/5 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-500 transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
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
              className="relative w-full max-w-lg bg-[#0d1627] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#121d36]">
                <h2 className="text-2xl font-black uppercase tracking-tighter">
                  {editingClient?.id ? 'Edit Client' : 'Add New Client'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Brand Name</label>
                  <input 
                    type="text" 
                    value={editingClient?.name || ''}
                    onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#38BDF8] transition-all"
                    placeholder="e.g. Coca-Cola"
                    required
                  />
                </div>

                <ImageUpload
                  value={editingClient?.logo_url || ''}
                  onChange={(url) => setEditingClient({ ...editingClient, logo_url: url })}
                  folder="clients"
                  label="Logo"
                />

                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Website (Optional)</label>
                    <input 
                      type="url" 
                      value={editingClient?.website_url || ''}
                      onChange={(e) => setEditingClient({ ...editingClient, website_url: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#38BDF8] transition-all"
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Sort Order</label>
                    <input 
                      type="number" 
                      value={editingClient?.sort_order || 0}
                      onChange={(e) => setEditingClient({ ...editingClient, sort_order: parseInt(e.target.value) })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#38BDF8] transition-all"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-3 cursor-pointer group">
                   <div className={cn(
                     "w-10 h-6 rounded-full transition-colors relative flex items-center px-1",
                     editingClient?.is_featured ? "bg-[#38BDF8]" : "bg-white/10"
                   )}>
                     <motion.div 
                        animate={{ x: editingClient?.is_featured ? 16 : 0 }}
                        className="w-4 h-4 bg-white rounded-full shadow-sm"
                     />
                   </div>
                   <input 
                    type="checkbox" 
                    checked={editingClient?.is_featured || false}
                    onChange={(e) => setEditingClient({ ...editingClient, is_featured: e.target.checked })}
                    className="hidden"
                   />
                   <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">Featured Client</span>
                </label>

                <div className="pt-4 flex gap-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-[#38BDF8] hover:bg-[#258f75] disabled:opacity-50 text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
                  >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    <span>{editingClient?.id ? 'Update Client' : 'Add Client'}</span>
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
