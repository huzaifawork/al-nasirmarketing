"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Save, 
  Loader2, 
  Settings, 
  Image as ImageIcon, 
  Type,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function SettingsAdmin() {
  const [settings, setSettings] = useState<any>({
    tagline: 'Pioneering Visual Dominance',
    hero_slides: [],
    about_text: '',
    mission_text: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (!error && data) {
        const settingsMap: any = {};
        data.forEach(s => settingsMap[s.key] = s.value);
        setSettings((prev: any) => ({ ...prev, ...settingsMap }));
      }
      setLoading(false);
    }
    fetchSettings();
  }, []);

  const handleSave = async (key: string, value: any) => {
    setSaving(true);
    const { error } = await supabase
      .from('site_settings')
      .upsert({ key, value }, { onConflict: 'key' });
    
    if (!error) {
       // Optional toast notification
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-[#38BDF8]" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      <div>
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Global Settings</h1>
        <p className="text-gray-400 text-sm font-medium tracking-wide">Manage core site content and hero configurations.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Branding & Tagline */}
        <section className="bg-white/[0.03] border border-white/10 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-8">
             <div className="p-2 bg-[#38BDF8]/10 text-[#38BDF8] rounded-lg">
               <Type size={20} />
             </div>
             <h2 className="text-xl font-black uppercase tracking-tight">Core Branding</h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Hero Primary Tagline</label>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#38BDF8] transition-all"
                />
                <button 
                  onClick={() => handleSave('tagline', settings.tagline)}
                  className="bg-[#38BDF8] hover:bg-[#258f75] text-white px-6 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section Text */}
        <section className="bg-white/[0.03] border border-white/10 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-8">
             <div className="p-2 bg-[#38BDF8]/10 text-[#38BDF8] rounded-lg">
               <Info size={20} />
             </div>
             <h2 className="text-xl font-black uppercase tracking-tight">About Agency Content</h2>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Company Story</label>
              <textarea 
                value={settings.about_text}
                onChange={(e) => setSettings({ ...settings, about_text: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#38BDF8] transition-all min-h-[150px] text-sm leading-relaxed"
                placeholder="Tell the agency story..."
              />
              <div className="flex justify-end">
                <button 
                  onClick={() => handleSave('about_text', settings.about_text)}
                  className="bg-[#38BDF8] hover:bg-[#258f75] text-white px-8 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all"
                >
                  Save Story
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Core Mission</label>
              <textarea 
                value={settings.mission_text}
                onChange={(e) => setSettings({ ...settings, mission_text: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#38BDF8] transition-all min-h-[100px] text-sm leading-relaxed"
                placeholder="Define the agency mission..."
              />
              <div className="flex justify-end">
                <button 
                  onClick={() => handleSave('mission_text', settings.mission_text)}
                  className="bg-[#38BDF8] hover:bg-[#258f75] text-white px-8 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all"
                >
                  Save Mission
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Slides Info */}
        <section className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 border-dashed">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-gray-600 mb-4">
               <ImageIcon size={32} />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-tight text-gray-400">Media Management</h3>
            <p className="text-gray-500 text-xs mt-2 max-w-sm">Hero carousel image uploads and inventory asset management are currently being linked to the Supabase Storage bucket.</p>
          </div>
        </section>
      </div>
      
      {saving && (
        <div className="fixed bottom-10 right-10 bg-[#38BDF8] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-bounce">
          <Loader2 className="animate-spin" size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest">Saving Changes...</span>
        </div>
      )}
    </div>
  );
}
