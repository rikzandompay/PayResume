"use client";

import { useState } from "react";
import { Step5Data } from "@/lib/types";
import { FileText, Layout, Sparkles } from "lucide-react";

interface Step5Props {
  data: Step5Data;
  onSubmit: (data: Step5Data) => void;
  onBack: () => void;
  isLoading: boolean;
}

export function Step5Preferences({ data, onSubmit, onBack, isLoading }: Step5Props) {
  const [style, setStyle] = useState<"ats" | "modern">(data.style || "ats");
  const [language, setLanguage] = useState<"id" | "en">(data.language || "id");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="brutal-badge bg-blue text-white mb-4">PREFERENSI</div>
      <h2 className="font-display font-bold text-2xl">Preferensi Output</h2>

      {/* Gaya CV */}
      <div>
        <label className="block font-display font-bold text-lg mb-3">Gaya CV</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button type="button" onClick={() => setStyle("ats")} className={`brutal-card text-left cursor-pointer transition-all ${style === "ats" ? "border-yellow bg-yellow/10 shadow-brutal-lg" : "hover:bg-yellow/5"}`}>
            <div className="flex items-center gap-3 mb-2">
              <FileText size={24} className={style === "ats" ? "text-yellow" : "text-muted"} />
              <span className="font-display font-bold text-lg">ATS Friendly</span>
            </div>
            <p className="text-sm text-muted font-body">1 kolom, format standar. Cocok untuk: BUMN, korporat, bank.</p>
          </button>
          <button type="button" onClick={() => setStyle("modern")} className={`brutal-card text-left cursor-pointer transition-all ${style === "modern" ? "border-blue bg-blue/10 shadow-brutal-lg" : "hover:bg-blue/5"}`}>
            <div className="flex items-center gap-3 mb-2">
              <Layout size={24} className={style === "modern" ? "text-blue" : "text-muted"} />
              <span className="font-display font-bold text-lg">Modern Professional</span>
            </div>
            <p className="text-sm text-muted font-body">2 kolom, desain bersih. Cocok untuk: startup, tech company.</p>
          </button>
        </div>
      </div>

      {/* Bahasa */}
      <div>
        <label className="block font-display font-bold text-lg mb-3">Bahasa CV</label>
        <div className="flex gap-4">
          <button type="button" onClick={() => setLanguage("id")} className={`brutal-btn ${language === "id" ? "brutal-btn-dark" : "brutal-btn-secondary"}`}>🇮🇩 Bahasa Indonesia</button>
          <button type="button" onClick={() => setLanguage("en")} className={`brutal-btn ${language === "en" ? "brutal-btn-dark" : "brutal-btn-secondary"}`}>🇬🇧 English</button>
        </div>
      </div>

      {/* Generate */}
      <button type="button" onClick={() => onSubmit({ style, language })} disabled={isLoading} className="brutal-btn brutal-btn-dark w-full text-xl py-5 mt-4">
        {isLoading ? (
          <><div className="w-5 h-5 border-3 border-yellow border-t-transparent rounded-full animate-spin" /> AI sedang membuat CV...</>
        ) : (
          <><Sparkles size={22} /> Generate CV Saya ✨</>
        )}
      </button>

      {isLoading && (
        <div className="text-center animate-fade-in">
          <p className="text-muted text-sm font-body">Biasanya selesai dalam 5–10 detik</p>
        </div>
      )}

      <div className="flex justify-start pt-2">
        <button type="button" onClick={onBack} disabled={isLoading} className="brutal-btn brutal-btn-secondary">← Sebelumnya</button>
      </div>
    </div>
  );
}
