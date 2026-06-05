"use client";
import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Loader2, X, Save, Image as ImageIcon } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import { motion, AnimatePresence } from "framer-motion";

type MediaItem = {
  id: string;
  image_url: string;
  caption: string | null;
  sort_order: number;
};

export default function MediaAdmin() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ image_url: "", caption: "", sort_order: 0 });

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("media_showcase")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error && data) setItems(data as MediaItem[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image_url) return;
    setSaving(true);
    const { error } = await supabase.from("media_showcase").insert([{
      image_url: form.image_url,
      caption: form.caption || null,
      sort_order: form.sort_order,
    }]);
    if (!error) {
      setIsModalOpen(false);
      setForm({ image_url: "", caption: "", sort_order: 0 });
      fetchItems();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this image from the media showcase?")) return;
    const { error } = await supabase.from("media_showcase").delete().eq("id", id);
    if (!error) fetchItems();
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Media Showcase</h1>
          <p className="text-gray-400 text-sm font-medium tracking-wide">
            Manage the scrolling image strip shown after the Services section.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#38BDF8] hover:bg-[#258f75] text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-[0_10px_20px_rgba(56,189,248,0.2)]"
        >
          <Plus size={18} />
          <span>Add Image</span>
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-[#38BDF8]" size={32} />
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border border-dashed border-white/10 rounded-3xl gap-4">
          <ImageIcon size={40} className="text-gray-600" />
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">No images yet</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-[#38BDF8] text-xs font-black uppercase tracking-widest hover:underline"
          >
            Add your first image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <motion.div
              layout
              key={item.id}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-[#38BDF8]/30 transition-all"
            >
              <div className="relative aspect-video">
                <img
                  src={item.image_url}
                  alt={item.caption || "Media"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-3 bg-red-500/80 hover:bg-red-500 rounded-xl text-white transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between gap-2">
                <span className="text-xs text-gray-400 truncate font-medium">
                  {item.caption || "No caption"}
                </span>
                <span className="text-[10px] text-[#38BDF8] font-black shrink-0">#{item.sort_order}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Modal */}
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
                <h2 className="text-2xl font-black uppercase tracking-tighter">Add Media Image</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-8 space-y-6">
                <ImageUpload
                  value={form.image_url}
                  onChange={(url) => setForm({ ...form, image_url: url })}
                  folder="media"
                  label="Image"
                />

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">
                    Caption (Optional)
                  </label>
                  <input
                    type="text"
                    value={form.caption}
                    onChange={(e) => setForm({ ...form, caption: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#38BDF8] transition-all"
                    placeholder="e.g. Lahore Billboard Campaign"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#38BDF8] transition-all"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-[#38BDF8] hover:bg-[#258f75] disabled:opacity-50 text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
                  >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    <span>Add to Showcase</span>
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
