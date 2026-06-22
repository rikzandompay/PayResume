"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CVResult } from "@/lib/types";
import { CVPreview } from "@/components/result/cv-preview";
import { ATSPanel } from "@/components/result/ats-panel";
import { DownloadButton } from "@/components/result/download-button";
import { RefreshCw, ArrowLeft } from "lucide-react";

export default function ResultPage() {
  const router = useRouter();
  const [data, setData] = useState<CVResult | null>(null);
  const [style, setStyle] = useState<"ats" | "modern">("ats");
  const [source, setSource] = useState<"create-cv" | "rebuild-cv">("create-cv");

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("payresume_result");
      const savedStyle = sessionStorage.getItem("payresume_style");
      const savedSource = sessionStorage.getItem("payresume_source");
      if (saved) setData(JSON.parse(saved));
      if (savedStyle === "ats" || savedStyle === "modern") setStyle(savedStyle);
      if (savedSource === "create-cv" || savedSource === "rebuild-cv") setSource(savedSource);
    } catch { /* ignore */ }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 py-20 px-4">
        <div className="brutal-card text-center max-w-md">
          <p className="text-4xl mb-3">📄</p>
          <h2 className="font-display font-bold text-xl mb-2">Belum ada CV yang digenerate</h2>
          <p className="text-muted font-body text-sm mb-4">Silakan buat CV baru atau rebuild CV lama terlebih dahulu.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => router.push("/create-cv")} className="brutal-btn brutal-btn-primary text-sm">Buat CV Baru</button>
            <button onClick={() => router.push("/rebuild-cv")} className="brutal-btn brutal-btn-secondary text-sm">Rebuild CV</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="brutal-badge bg-green text-white mb-2">CV BERHASIL DIGENERATE</div>
            <h1 className="font-display font-bold text-2xl md:text-3xl">AI telah mengoptimalkan CV Anda</h1>
          </div>
          <div className="flex gap-3">
            <DownloadButton namaUser={data.namaLengkap} />
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <button onClick={() => { 
            sessionStorage.removeItem("payresume_result"); 
            sessionStorage.removeItem("payresume_create_cv_data");
            window.location.href = `/${source}`; 
          }} className="brutal-btn brutal-btn-secondary text-sm">
            <RefreshCw size={14} /> Generate Ulang
          </button>
          <button onClick={() => {
            // Set step ke 5 agar langsung ke halaman Preferensi
            try {
              const saved = sessionStorage.getItem("payresume_create_cv_data");
              if (saved) {
                const d = JSON.parse(saved);
                d.step = 5;
                sessionStorage.setItem("payresume_create_cv_data", JSON.stringify(d));
              }
            } catch { /* ignore */ }
            // Gunakan window.location.href untuk bypass cache router Next.js
            window.location.href = `/${source}`;
          }} className="brutal-btn brutal-btn-secondary text-sm">
            <ArrowLeft size={14} /> Kembali Edit
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* CV Preview */}
          <div className="lg:col-span-3 overflow-x-auto">
            <CVPreview data={data} style={style} />
          </div>

          {/* ATS Panel */}
          <div className="lg:col-span-2">
            <ATSPanel data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
