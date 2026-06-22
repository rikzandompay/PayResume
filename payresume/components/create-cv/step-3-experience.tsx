"use client";

import { useState } from "react";
import { PengalamanData } from "@/lib/types";
import { Plus, X, Sparkles, Loader2 } from "lucide-react";

interface Step3Props {
  data: { pengalaman: PengalamanData[] };
  onNext: (data: { pengalaman: PengalamanData[] }) => void;
  onBack: () => void;
}

const tipeOptions = ["Magang", "Pekerjaan", "Organisasi", "Volunteer", "Freelance"] as const;

const emptyPengalaman: PengalamanData = {
  tipe: "Magang", namaOrg: "", posisi: "", tanggalMulai: "", tanggalSelesai: "", deskripsi: "", pencapaian: "",
};

export function Step3Experience({ data, onNext, onBack }: Step3Props) {
  const [items, setItems] = useState<PengalamanData[]>(data.pengalaman.length > 0 ? data.pengalaman : []);
  const [aiLoading, setAiLoading] = useState<number | null>(null);

  const addItem = () => { if (items.length < 5) setItems([...items, { ...emptyPengalaman }]); };
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i: number, field: keyof PengalamanData, value: string) => {
    const u = [...items]; u[i] = { ...u[i], [field]: value }; setItems(u);
  };

  const handleAIAssist = async (i: number) => {
    const item = items[i];
    if (!item.posisi || !item.namaOrg) return;
    setAiLoading(i);
    try {
      const res = await fetch("/api/ai-assist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ posisi: item.posisi, namaOrg: item.namaOrg, tipe: item.tipe }) });
      const d = await res.json();
      if (d.deskripsi) updateItem(i, "deskripsi", d.deskripsi);
    } catch { /* silent */ } finally { setAiLoading(null); }
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="brutal-badge bg-green text-white mb-4">PENGALAMAN</div>
      <h2 className="font-display font-bold text-2xl">Pengalaman</h2>

      {items.length === 0 && (
        <div className="brutal-card text-center py-10">
          <p className="text-4xl mb-3">🎓</p>
          <p className="font-display font-bold text-lg mb-2">Tidak ada pengalaman?</p>
          <p className="text-muted font-body text-sm mb-4">Tidak masalah! AI akan tetap buat CV yang bagus.</p>
          <button type="button" onClick={addItem} className="brutal-btn brutal-btn-primary text-sm"><Plus size={16} /> Tambah Pengalaman</button>
        </div>
      )}

      {items.map((item, i) => (
        <div key={i} className="brutal-card relative animate-fade-in">
          <button type="button" onClick={() => removeItem(i)} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center border-2 border-black bg-red text-white"><X size={16} /></button>
          <p className="font-display font-bold text-sm text-muted mb-4">Pengalaman #{i + 1}</p>
          <div className="mb-4"><label className="block font-display font-medium text-sm mb-2 uppercase">Tipe *</label><div className="flex flex-wrap gap-2">{tipeOptions.map(t => (<button key={t} type="button" onClick={() => updateItem(i, "tipe", t)} className={`px-3 py-1.5 border-2 border-black text-sm font-display font-bold ${item.tipe === t ? "bg-yellow" : "bg-white"}`}>{t}</button>))}</div></div>
          <div className="mb-4"><label className="block font-display font-medium text-sm mb-1 uppercase">Perusahaan / Organisasi *</label><input value={item.namaOrg} onChange={e => updateItem(i, "namaOrg", e.target.value)} className="brutal-input" placeholder="PT Tokopedia" /></div>
          <div className="mb-4"><label className="block font-display font-medium text-sm mb-1 uppercase">Posisi *</label><input value={item.posisi} onChange={e => updateItem(i, "posisi", e.target.value)} className="brutal-input" placeholder="Frontend Engineer" /></div>
          <div className="grid grid-cols-2 gap-3 mb-4"><div><label className="block font-display font-medium text-sm mb-1 uppercase">Mulai *</label><input value={item.tanggalMulai} onChange={e => updateItem(i, "tanggalMulai", e.target.value)} className="brutal-input" placeholder="01/2023" /></div><div><label className="block font-display font-medium text-sm mb-1 uppercase">Selesai</label><input value={item.tanggalSelesai} onChange={e => updateItem(i, "tanggalSelesai", e.target.value)} className="brutal-input" placeholder="Sekarang" /></div></div>
          <div className="mb-4"><div className="flex items-center justify-between mb-1"><label className="block font-display font-medium text-sm uppercase">Deskripsi</label><button type="button" onClick={() => handleAIAssist(i)} disabled={aiLoading === i || !item.posisi || !item.namaOrg} className="text-xs font-display font-bold flex items-center gap-1 px-3 py-1 border-2 border-black bg-blue text-white disabled:opacity-50">{aiLoading === i ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />} Bantu AI Tulis</button></div><textarea value={item.deskripsi} onChange={e => updateItem(i, "deskripsi", e.target.value)} className="brutal-input min-h-[80px] resize-y" placeholder="Jelaskan tugas kamu..." /><p className="text-right text-xs text-muted mt-1">{(item.deskripsi || "").length}/800</p></div>
          <div><label className="block font-display font-medium text-sm mb-1 uppercase">Pencapaian</label><textarea value={item.pencapaian} onChange={e => updateItem(i, "pencapaian", e.target.value)} className="brutal-input min-h-[60px] resize-y" placeholder="Pencapaian terbaik..." /><p className="text-right text-xs text-muted mt-1">{(item.pencapaian || "").length}/500</p></div>
        </div>
      ))}

      {items.length > 0 && items.length < 5 && (
        <button type="button" onClick={addItem} className="brutal-btn brutal-btn-secondary w-full"><Plus size={16} /> Tambah Pengalaman ({items.length}/5)</button>
      )}

      <div className="flex justify-between pt-4">
        <button type="button" onClick={onBack} className="brutal-btn brutal-btn-secondary">← Sebelumnya</button>
        <button type="button" onClick={() => onNext({ pengalaman: items })} className="brutal-btn brutal-btn-primary">Lanjut →</button>
      </div>
    </div>
  );
}
