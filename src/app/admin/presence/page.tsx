"use client";
import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, MapPin, Trash2, Edit3, ExternalLink, Loader2, X, Save, Image as ImageIcon, ChevronDown, ChevronUp } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type City = {
  id: string;
  name: string;
  slug: string;
  cover_image_url: string | null;
  sort_order: number;
};

type PresenceImage = {
  id: string;
  city_id: string;
  image_url: string;
  caption: string | null;
  availability_from: string | null;
  availability_to: string | null;
  size: string | null;
  price: number | null;
  site_id: string | null;
  location: string | null;
  direction: string | null;
  sort_order: number;
};

export default function PresenceAdmin() {
  const [cities, setCities] = useState<City[]>([]);
  const [images, setImages] = useState<Record<string, PresenceImage[]>>({});
  const [loading, setLoading] = useState(true);
  const [expandedCity, setExpandedCity] = useState<string | null>(null);
  const [cityModal, setCityModal] = useState<Partial<City> | null>(null);
  const [imageModal, setImageModal] = useState<{ cityId: string; cityName: string } | null>(null);
  const [imageForm, setImageForm] = useState({ 
    image_url: "", 
    caption: "", 
    availability_from: "", 
    availability_to: "", 
    size: "", 
    price: "", 
    site_id: "", 
    location: "", 
    direction: "", 
    sort_order: 0 
  });
  const [saving, setSaving] = useState(false);

  const fetchCities = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("presence_cities").select("*").order("sort_order", { ascending: true });
    if (data) setCities(data as City[]);
    setLoading(false);
  }, []);

  const fetchImages = useCallback(async (cityId: string) => {
    const { data } = await supabase.from("presence_images").select("*").eq("city_id", cityId).order("sort_order", { ascending: true }).order("created_at", { ascending: true });
    if (data) setImages((prev) => ({ ...prev, [cityId]: data as PresenceImage[] }));
  }, []);

  useEffect(() => { fetchCities(); }, [fetchCities]);

  const handleToggleCity = (cityId: string) => {
    if (expandedCity === cityId) { setExpandedCity(null); return; }
    setExpandedCity(cityId);
    fetchImages(cityId);
  };

  const handleSaveCity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityModal?.name || !cityModal?.slug) return;
    setSaving(true);
    const payload = { name: cityModal.name, slug: cityModal.slug, cover_image_url: cityModal.cover_image_url || null, sort_order: cityModal.sort_order || 0 };
    if (cityModal.id) {
      await supabase.from("presence_cities").update(payload).eq("id", cityModal.id);
    } else {
      await supabase.from("presence_cities").insert([payload]);
    }
    setCityModal(null);
    fetchCities();
    setSaving(false);
  };

  const handleDeleteCity = async (id: string) => {
    if (!confirm("Delete this city and all its images?")) return;
    await supabase.from("presence_cities").delete().eq("id", id);
    fetchCities();
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageModal || !imageForm.image_url) return;
    setSaving(true);
    await supabase.from("presence_images").insert([{ 
      city_id: imageModal.cityId, 
      image_url: imageForm.image_url, 
      caption: imageForm.caption || null, 
      availability_from: imageForm.availability_from || null,
      availability_to: imageForm.availability_to || null,
      size: imageForm.size || null,
      price: imageForm.price ? parseFloat(imageForm.price) : null,
      site_id: imageForm.site_id || null,
      location: imageForm.location || null,
      direction: imageForm.direction || null,
      sort_order: imageForm.sort_order 
    }]);
    setImageModal(null);
    setImageForm({ 
      image_url: "", 
      caption: "", 
      availability_from: "", 
      availability_to: "", 
      size: "", 
      price: "", 
      site_id: "", 
      location: "", 
      direction: "", 
      sort_order: 0 
    });
    fetchImages(imageModal.cityId);
    setSaving(false);
  };

  const handleDeleteImage = async (id: string, cityId: string) => {
    if (!confirm("Remove this image?")) return;
    await supabase.from("presence_images").delete().eq("id", id);
    fetchImages(cityId);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Presence Manager</h1>
          <p className="text-gray-400 text-sm font-medium tracking-wide">Manage cities and their billboard gallery images.</p>
        </div>
        <button
          onClick={() => setCityModal({ name: "", slug: "", sort_order: 0 })}
          className="flex items-center gap-2 bg-[#38BDF8] hover:bg-[#258f75] text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-[0_10px_20px_rgba(56,189,248,0.2)]"
        >
          <Plus size={18} /> Add New City
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-[#38BDF8]" size={32} />
        </div>
      ) : cities.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border border-dashed border-white/10 rounded-3xl gap-4">
          <MapPin size={40} className="text-gray-600" />
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">No cities yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cities.map((city) => (
            <motion.div layout key={city.id} className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all">
              {/* City Row */}
              <div className="flex flex-wrap items-center gap-4 p-5">
                {/* Cover thumb */}
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white/5 border border-white/10">
                  {city.cover_image_url ? (
                    <img src={city.cover_image_url} alt={city.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <MapPin size={20} className="text-gray-600" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-black uppercase tracking-tight text-lg">{city.name}</h3>
                  <p className="text-[#38BDF8] text-[10px] font-bold uppercase tracking-widest">/presence/{city.slug}</p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Link href={`/presence/${city.slug}`} target="_blank" className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-[#38BDF8] transition-all" title="View Page">
                    <ExternalLink size={16} />
                  </Link>
                  <button onClick={() => setCityModal(city)} className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all" title="Edit">
                    <Edit3 size={16} />
                  </button>
                  <button onClick={() => handleDeleteCity(city.id)} className="p-2.5 bg-white/5 hover:bg-red-500/20 rounded-xl text-gray-400 hover:text-red-500 transition-all" title="Delete">
                    <Trash2 size={16} />
                  </button>
                  <button
                    onClick={() => handleToggleCity(city.id)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#38BDF8]/10 hover:bg-[#38BDF8]/20 border border-[#38BDF8]/20 rounded-xl text-[#38BDF8] text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    Images {expandedCity === city.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              </div>

              {/* Images Panel */}
              <AnimatePresence>
                {expandedCity === city.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-white/5"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                          {images[city.id]?.length || 0} Images
                        </span>
                        <button
                          onClick={() => setImageModal({ cityId: city.id, cityName: city.name })}
                          className="flex items-center gap-2 bg-white/5 hover:bg-[#38BDF8] border border-white/10 hover:border-[#38BDF8] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                          <Plus size={14} /> Add Image
                        </button>
                      </div>

                      {!images[city.id] ? (
                        <div className="flex justify-center py-8"><Loader2 className="animate-spin text-[#38BDF8]" size={24} /></div>
                      ) : images[city.id].length === 0 ? (
                        <div className="text-center py-8 text-gray-600 text-sm font-bold uppercase tracking-widest">No images yet</div>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                          {images[city.id].map((img) => (
                            <div key={img.id} className="group relative aspect-video rounded-xl overflow-hidden border border-white/10">
                              <img src={img.image_url} alt={img.caption || ""} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button onClick={() => handleDeleteImage(img.id, city.id)} className="p-2 bg-red-500/80 hover:bg-red-500 rounded-lg text-white transition-colors">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                              {img.caption && (
                                <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1">
                                  <p className="text-white text-[9px] truncate">{img.caption}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}

      {/* City Modal */}
      <AnimatePresence>
        {cityModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCityModal(null)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-lg bg-[#0d1627] border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#121d36]">
                <h2 className="text-2xl font-black uppercase tracking-tighter">{cityModal.id ? "Edit City" : "Add New City"}</h2>
                <button onClick={() => setCityModal(null)} className="text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
              </div>
              <form onSubmit={handleSaveCity} className="p-8 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">City Name</label>
                    <input type="text" value={cityModal.name || ""} onChange={(e) => setCityModal({ ...cityModal, name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#38BDF8] transition-all" placeholder="e.g. Lahore" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Slug</label>
                    <input type="text" value={cityModal.slug || ""} onChange={(e) => setCityModal({ ...cityModal, slug: e.target.value.toLowerCase().replace(/ /g, "-") })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#38BDF8] transition-all" placeholder="e.g. lahore" required />
                  </div>
                </div>
                <ImageUpload
                  value={cityModal.cover_image_url || ''}
                  onChange={(url) => setCityModal({ ...cityModal, cover_image_url: url })}
                  folder="presence"
                  label="Cover Image"
                />
                <div className="space-y-2 w-32">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Sort Order</label>
                  <input type="number" value={cityModal.sort_order || 0} onChange={(e) => setCityModal({ ...cityModal, sort_order: parseInt(e.target.value) || 0 })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#38BDF8] transition-all" />
                </div>
                <button type="submit" disabled={saving} className="w-full bg-[#38BDF8] hover:bg-[#258f75] disabled:opacity-50 text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all flex items-center justify-center gap-2">
                  {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  {cityModal.id ? "Update City" : "Create City"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <AnimatePresence>
        {imageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setImageModal(null)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-2xl bg-[#0d1627] border border-white/10 rounded-3xl shadow-2xl max-h-[90vh] flex flex-col">
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#121d36] rounded-t-3xl shrink-0">
                <h2 className="text-2xl font-black uppercase tracking-tighter">Add Media — {imageModal.cityName}</h2>
                <button type="button" onClick={() => setImageModal(null)} className="text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
              </div>
              <div className="overflow-y-auto flex-1" data-lenis-prevent>
                <form onSubmit={handleAddImage} className="p-8 space-y-5">
                  <ImageUpload
                    value={imageForm.image_url}
                    onChange={(url) => setImageForm({ ...imageForm, image_url: url })}
                    folder="presence"
                    label="Site Image"
                  />
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Caption / Description</label>
                    <input type="text" value={imageForm.caption} onChange={(e) => setImageForm({ ...imageForm, caption: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#38BDF8] transition-all" placeholder="e.g. Liberty Roundabout Billboard" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Available From</label>
                      <input
                        type="date"
                        value={imageForm.availability_from}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setImageForm({
                          ...imageForm,
                          availability_from: e.target.value,
                          availability_to: imageForm.availability_to && imageForm.availability_to <= e.target.value ? '' : imageForm.availability_to
                        })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#38BDF8] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Available To</label>
                      <input
                        type="date"
                        value={imageForm.availability_to}
                        min={imageForm.availability_from ? (() => { const d = new Date(imageForm.availability_from); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; })() : new Date().toISOString().split('T')[0]}
                        onChange={(e) => setImageForm({ ...imageForm, availability_to: e.target.value })}
                        disabled={!imageForm.availability_from}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#38BDF8] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      />
                      {!imageForm.availability_from && (
                        <p className="text-[10px] text-gray-500 mt-1">Set &quot;Available From&quot; first</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Size</label>
                      <input type="text" value={imageForm.size} onChange={(e) => setImageForm({ ...imageForm, size: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#38BDF8] transition-all" placeholder="e.g. 20x40 ft" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Price</label>
                      <input type="number" step="0.01" value={imageForm.price} onChange={(e) => setImageForm({ ...imageForm, price: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#38BDF8] transition-all" placeholder="e.g. 150000" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Site ID</label>
                    <input type="text" value={imageForm.site_id} onChange={(e) => setImageForm({ ...imageForm, site_id: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#38BDF8] transition-all" placeholder="e.g. LHR-001" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Location</label>
                    <textarea value={imageForm.location} onChange={(e) => setImageForm({ ...imageForm, location: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#38BDF8] transition-all resize-none" rows={2} placeholder="e.g. M.M Alam Road" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Direction</label>
                    <textarea value={imageForm.direction} onChange={(e) => setImageForm({ ...imageForm, direction: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#38BDF8] transition-all resize-none" rows={2} placeholder="e.g. North, East-bound, etc." />
                  </div>

                  <div className="space-y-2 w-32">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Sort Order</label>
                    <input type="number" value={imageForm.sort_order} onChange={(e) => setImageForm({ ...imageForm, sort_order: parseInt(e.target.value) || 0 })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#38BDF8] transition-all" />
                  </div>
                  <button type="submit" disabled={saving} className="w-full bg-[#38BDF8] hover:bg-[#258f75] disabled:opacity-50 text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all flex items-center justify-center gap-2">
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <ImageIcon size={18} />}
                    Add Media
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
