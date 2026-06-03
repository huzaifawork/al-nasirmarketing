"use client";
import React, { useRef, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { uploadImage } from "@/lib/uploadImage";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

export default function ImageUpload({ value, onChange, folder = "general", label = "Image" }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) { setError("Only image files allowed"); return; }
    setError(null);
    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{label}</label>

      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-video">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-red-500 rounded-lg text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="relative border-2 border-dashed border-white/10 hover:border-[#2EAB8C]/50 rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all group"
        >
          {uploading ? (
            <Loader2 size={28} className="text-[#2EAB8C] animate-spin" />
          ) : (
            <Upload size={28} className="text-gray-600 group-hover:text-[#2EAB8C] transition-colors" />
          )}
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
            {uploading ? "Uploading..." : "Click or drag to upload"}
          </p>
          <p className="text-[10px] text-gray-600">PNG, JPG, WEBP supported</p>
        </div>
      )}

      {error && <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />
    </div>
  );
}
