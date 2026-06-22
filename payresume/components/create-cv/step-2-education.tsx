"use client";

import { useState } from "react";
import { PendidikanData, Step2Data } from "@/lib/types";
import { Plus, X } from "lucide-react";

interface Step2Props {
  data: Step2Data;
  onNext: (data: Step2Data) => void;
  onBack: () => void;
}

const jenjangOptions = ["SMA/SMK", "D3", "D4", "S1", "S2", "S3"] as const;

const emptyPendidikan: PendidikanData = {
  universitas: "", jurusan: "", jenjang: "S1", tahunMasuk: "", tahunLulus: "",
};

export function Step2Education({ data, onNext, onBack }: Step2Props) {
  const [items, setItems] = useState<PendidikanData[]>(
    data.pendidikan && data.pendidikan.length > 0 ? data.pendidikan : [{ ...emptyPendidikan }]
  );

  const addItem = () => { if (items.length < 3) setItems([...items, { ...emptyPendidikan }]); };
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i: number, field: keyof PendidikanData, value: string | number | boolean) => {
    const u = [...items];
    u[i] = { ...u[i], [field]: value };
    setItems(u);
  };

  const handleMasihKuliahToggle = (i: number) => {
    const newVal = !items[i].masihKuliah;
    const u = [...items];
    u[i] = { ...u[i], masihKuliah: newVal, tahunLulus: newVal ? "Sekarang" : "" };
    setItems(u);
  };

  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi tahun lulus >= tahun masuk
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item.masihKuliah && item.tahunMasuk && item.tahunLulus && item.tahunLulus !== "Sekarang") {
        if (Number(item.tahunLulus) < Number(item.tahunMasuk)) {
          setError(`Pendidikan #${i + 1}: Tahun lulus tidak boleh lebih kecil dari tahun masuk!`);
          return;
        }
      }
    }

    setError(null);
    onNext({ pendidikan: items });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5 animate-fade-in">
      <div className="brutal-badge bg-blue text-white mb-4">PENDIDIKAN</div>
      <h2 className="font-display font-bold text-2xl">Riwayat Pendidikan</h2>

      {error && (
        <div className="border-4 border-red bg-red/10 p-4 mb-4 animate-fade-in">
          <p className="font-display font-bold text-red text-sm">⚠ {error}</p>
        </div>
      )}

      {items.map((item, i) => (
        <div key={i} className="brutal-card relative animate-fade-in">
          {items.length > 1 && (
            <button type="button" onClick={() => removeItem(i)} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center border-2 border-black bg-red text-white">
              <X size={16} />
            </button>
          )}
          
          <p className="font-display font-bold text-sm text-muted mb-4">Pendidikan #{i + 1}</p>

          <div className="mb-4">
            <label className="block font-display font-medium text-sm mb-1 uppercase tracking-wide">Nama Institusi / Universitas *</label>
            <input required value={item.universitas} onChange={e => updateItem(i, "universitas", e.target.value)} className="brutal-input" placeholder="Universitas Indonesia" />
          </div>

          <div className="mb-4">
            <label className="block font-display font-medium text-sm mb-1 uppercase tracking-wide">Jurusan *</label>
            <input required value={item.jurusan} onChange={e => updateItem(i, "jurusan", e.target.value)} className="brutal-input" placeholder="Teknik Informatika" />
          </div>

          <div className="mb-4">
            <label className="block font-display font-medium text-sm mb-2 uppercase tracking-wide">Jenjang *</label>
            <div className="flex flex-wrap gap-2">
              {jenjangOptions.map(t => (
                <button key={t} type="button" onClick={() => updateItem(i, "jenjang", t)} className={`px-4 py-2 border-3 border-black text-sm font-display font-bold transition-all ${item.jenjang === t ? "bg-yellow shadow-brutal" : "bg-white hover:bg-yellow/20"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-display font-medium text-sm mb-1 uppercase tracking-wide">IPK / Nilai Akhir</label>
            <input type="number" step="0.01" value={item.ipk || ""} onChange={e => updateItem(i, "ipk", e.target.value)} className="brutal-input max-w-[200px]" placeholder="3.75" />
            <p className="text-muted text-xs mt-1 font-body">Kosongkan jika tidak ingin ditampilkan</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-display font-medium text-sm mb-1 uppercase tracking-wide">Tahun Masuk *</label>
              <input required type="number" value={item.tahunMasuk} onChange={e => updateItem(i, "tahunMasuk", e.target.value)} className="brutal-input" placeholder="2020" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-display font-medium text-sm uppercase tracking-wide">Tahun Lulus *</label>
                <button type="button" onClick={() => handleMasihKuliahToggle(i)} className={`text-xs font-display font-bold flex items-center gap-1 px-3 py-1 border-2 border-black transition-colors ${item.masihKuliah ? "bg-green text-white" : "bg-white text-black"}`}>
                  Masih Kuliah
                </button>
              </div>
              
              {!item.masihKuliah ? (
                <input required type="number" min={item.tahunMasuk || 1990} value={item.tahunLulus === "Sekarang" ? "" : item.tahunLulus} onChange={e => updateItem(i, "tahunLulus", e.target.value)} className="brutal-input" placeholder="2024" />
              ) : (
                <div className="brutal-badge bg-green text-white w-full text-center">Sekarang (Masih Kuliah)</div>
              )}
            </div>
          </div>
        </div>
      ))}

      {items.length < 3 && (
        <button type="button" onClick={addItem} className="brutal-btn brutal-btn-secondary w-full">
          <Plus size={16} /> Tambah Pendidikan ({items.length}/3)
        </button>
      )}

      <div className="flex justify-between pt-4">
        <button type="button" onClick={onBack} className="brutal-btn brutal-btn-secondary">← Sebelumnya</button>
        <button type="submit" className="brutal-btn brutal-btn-primary">Lanjut →</button>
      </div>
    </form>
  );
}
