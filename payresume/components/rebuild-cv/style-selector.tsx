"use client";

import { FileText, Layout } from "lucide-react";

interface StyleSelectorProps {
  value: "ats" | "modern" | null;
  onChange: (v: "ats" | "modern") => void;
}

export function StyleSelector({ value, onChange }: StyleSelectorProps) {
  return (
    <div>
      <label className="block font-display font-bold text-sm mb-2 uppercase tracking-wide">Pilih Template</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button type="button" onClick={() => onChange("ats")} className={`brutal-card text-left cursor-pointer transition-all ${value === "ats" ? "border-yellow bg-yellow/10 shadow-brutal-lg" : "hover:bg-yellow/5"}`}>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-5 h-5 rounded-full border-3 border-black flex items-center justify-center ${value === "ats" ? "bg-black" : "bg-white"}`}>
              {value === "ats" && <div className="w-2 h-2 rounded-full bg-yellow" />}
            </div>
            <FileText size={20} />
            <span className="font-display font-bold">ATS FRIENDLY</span>
          </div>
          <p className="text-sm text-muted font-body">Format standar ATS yang aman untuk sistem rekrutmen.</p>
        </button>
        <button type="button" onClick={() => onChange("modern")} className={`brutal-card text-left cursor-pointer transition-all ${value === "modern" ? "border-blue bg-blue/10 shadow-brutal-lg" : "hover:bg-blue/5"}`}>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-5 h-5 rounded-full border-3 border-black flex items-center justify-center ${value === "modern" ? "bg-black" : "bg-white"}`}>
              {value === "modern" && <div className="w-2 h-2 rounded-full bg-blue" />}
            </div>
            <Layout size={20} />
            <span className="font-display font-bold">MODERN PROFESSIONAL</span>
          </div>
          <p className="text-sm text-muted font-body">Tampilan modern dan profesional dengan gaya storytelling.</p>
        </button>
      </div>
    </div>
  );
}
