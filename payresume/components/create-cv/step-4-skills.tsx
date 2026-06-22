"use client";

import { useState, KeyboardEvent } from "react";
import { Step4Data, SertifikasiData } from "@/lib/types";
import { X, Plus } from "lucide-react";

interface Step4Props {
  data: Step4Data;
  onNext: (data: Step4Data) => void;
  onBack: () => void;
}

const suggestedSkills = ["JavaScript","TypeScript","Python","SQL","React","Node.js","Figma","Excel","PowerPoint","Photoshop","SEO","Google Analytics","Java","Go","PHP","Laravel","Next.js","Vue.js","Angular","Docker","AWS","Git","Tailwind CSS","MongoDB","PostgreSQL","MySQL","Firebase","Flutter","Kotlin","Swift"];

const emptyCert: SertifikasiData = { nama: "", penerbit: "", tahun: new Date().getFullYear(), url: "" };

export function Step4Skills({ data, onNext, onBack }: Step4Props) {
  const [skills, setSkills] = useState<string[]>(data.skills || []);
  const [inputVal, setInputVal] = useState("");
  const [certs, setCerts] = useState<SertifikasiData[]>(data.sertifikasi || []);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addSkill = (skill: string) => {
    const s = skill.trim();
    if (s && !skills.includes(s) && skills.length < 20) {
      setSkills([...skills, s]);
      setInputVal("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(inputVal);
    }
  };

  const filtered = suggestedSkills.filter(s => s.toLowerCase().includes(inputVal.toLowerCase()) && !skills.includes(s));

  const updateCert = (i: number, field: keyof SertifikasiData, val: string | number) => {
    const u = [...certs]; u[i] = { ...u[i], [field]: val }; setCerts(u);
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="brutal-badge bg-red text-white mb-4">SKILL & SERTIFIKASI</div>
      <h2 className="font-display font-bold text-2xl">Skill & Sertifikasi</h2>

      {/* Skills */}
      <div>
        <label className="block font-display font-medium text-sm mb-2 uppercase tracking-wide">Skills</label>
        <div className="brutal-card p-3">
          <div className="flex flex-wrap gap-2 mb-3">
            {skills.map((s, i) => (
              <span key={i} className="inline-flex items-center gap-1 bg-yellow border-2 border-black px-3 py-1 font-display font-bold text-sm">
                {s}
                <button type="button" onClick={() => setSkills(skills.filter((_, idx) => idx !== i))} className="hover:text-red"><X size={14} /></button>
              </span>
            ))}
          </div>
          <div className="relative">
            <input value={inputVal} onChange={e => { setInputVal(e.target.value); setShowSuggestions(true); }} onKeyDown={handleKeyDown} onFocus={() => setShowSuggestions(true)} onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} className="brutal-input" placeholder="Ketik skill & tekan Enter..." disabled={skills.length >= 20} />
            {showSuggestions && inputVal && filtered.length > 0 && (
              <div className="absolute z-10 top-full left-0 right-0 bg-white border-3 border-black mt-1 max-h-40 overflow-y-auto">
                {filtered.slice(0, 8).map(s => (
                  <button key={s} type="button" onMouseDown={() => addSkill(s)} className="w-full text-left px-3 py-2 hover:bg-yellow/30 font-body text-sm border-b border-black/10">{s}</button>
                ))}
              </div>
            )}
          </div>
          <p className="text-right text-xs text-muted mt-1">{skills.length}/20 skill</p>
        </div>
      </div>

      {/* Sertifikasi */}
      <div>
        <h3 className="font-display font-bold text-xl mb-3">Sertifikasi</h3>
        {certs.map((c, i) => (
          <div key={i} className="brutal-card mb-3 relative">
            <button type="button" onClick={() => setCerts(certs.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center border-2 border-black bg-red text-white"><X size={12} /></button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div><label className="block font-display font-medium text-xs mb-1 uppercase">Nama Sertifikat</label><input value={c.nama} onChange={e => updateCert(i, "nama", e.target.value)} className="brutal-input text-sm" placeholder="AWS Certified" /></div>
              <div><label className="block font-display font-medium text-xs mb-1 uppercase">Penerbit</label><input value={c.penerbit} onChange={e => updateCert(i, "penerbit", e.target.value)} className="brutal-input text-sm" placeholder="Amazon" /></div>
              <div><label className="block font-display font-medium text-xs mb-1 uppercase">Tahun</label><input type="number" value={c.tahun} onChange={e => updateCert(i, "tahun", parseInt(e.target.value) || 0)} className="brutal-input text-sm" placeholder="2024" /></div>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setCerts([...certs, { ...emptyCert }])} className="brutal-btn brutal-btn-secondary text-sm w-full"><Plus size={14} /> Tambah Sertifikasi</button>
      </div>

      <div className="flex justify-between pt-4">
        <button type="button" onClick={onBack} className="brutal-btn brutal-btn-secondary">← Sebelumnya</button>
        <button type="button" onClick={() => onNext({ skills, sertifikasi: certs })} className="brutal-btn brutal-btn-primary">Lanjut →</button>
      </div>
    </div>
  );
}
