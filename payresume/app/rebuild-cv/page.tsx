"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PDFUpload } from "@/components/rebuild-cv/pdf-upload";
import { JDInput } from "@/components/rebuild-cv/jd-input";
import { StyleSelector } from "@/components/rebuild-cv/style-selector";
import { Sparkles, ArrowLeft } from "lucide-react";
import { track } from "@/lib/analytics";

export default function RebuildCVPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [jd, setJD] = useState("");
  const [style, setStyle] = useState<"ats" | "modern" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Restore state from sessionStorage
  useEffect(() => {
    try {
      const savedJD = sessionStorage.getItem("payresume_rebuild_jd");
      const savedStyle = sessionStorage.getItem("payresume_rebuild_style");
      if (savedJD) setJD(savedJD);
      if (savedStyle === "ats" || savedStyle === "modern") setStyle(savedStyle);
    } catch { /* ignore */ }
    setIsLoaded(true);
  }, []);

  // Save state to sessionStorage when it changes
  useEffect(() => {
    try {
      if (jd) sessionStorage.setItem("payresume_rebuild_jd", jd);
      if (style) sessionStorage.setItem("payresume_rebuild_style", style);
    } catch { /* ignore */ }
  }, [jd, style]);

  const canSubmit = file && style && !isLoading;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setIsLoading(true);
    setError(null);
    track("rebuild_cv_started");

    try {
      const formData = new FormData();
      formData.append("pdf", file);
      formData.append("jobDescription", jd);
      formData.append("style", style);

      const res = await fetch("/api/rebuild-cv", { method: "POST", body: formData });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Gagal rebuild CV");
      }

      const result = await res.json();
      sessionStorage.setItem("payresume_result", JSON.stringify(result));
      sessionStorage.setItem("payresume_style", style);
      sessionStorage.setItem("payresume_source", "rebuild-cv");
      track("rebuild_cv_success");
      router.push("/result");
    } catch (e: unknown) {
      const err = e as Error;
      setError(err.message || "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="mx-auto max-w-2xl">
        <div className="brutal-badge bg-blue text-white mb-4">UNTUK PROFESIONAL</div>
        <h1 className="font-display font-bold text-3xl md:text-4xl mb-2">Optimalkan CV Lama Anda</h1>
        <p className="text-muted font-body mb-8">Upload CV PDF Anda, tempel deskripsi lowongan, dan AI akan menyesuaikannya secara otomatis.</p>

        {error && (
          <div className="border-4 border-red bg-red/10 p-4 mb-6 animate-fade-in">
            <h3 className="font-bold text-lg mb-1">⚠ Terjadi Kesalahan</h3>
            <p className="text-muted text-sm mb-3">{error}</p>
            <button onClick={() => setError(null)} className="brutal-btn brutal-btn-primary text-sm">Coba Lagi</button>
          </div>
        )}

        <div className="space-y-6">
          <PDFUpload file={file} onFileChange={setFile} error={fileError} />
          <JDInput value={jd} onChange={setJD} />
          <StyleSelector value={style} onChange={setStyle} />

          <button onClick={handleSubmit} disabled={!canSubmit} className="brutal-btn brutal-btn-dark w-full text-xl py-5">
            {isLoading ? (
              <><div className="w-5 h-5 border-3 border-yellow border-t-transparent rounded-full animate-spin" /> AI sedang mengoptimalkan CV...</>
            ) : (
              <><Sparkles size={22} /> Rebuild CV Saya ✨</>
            )}
          </button>

          {isLoading && <p className="text-center text-muted text-sm font-body animate-fade-in">Biasanya selesai dalam 5–10 detik</p>}

          <Link href="/" className="flex items-center justify-center gap-2 text-muted font-display font-medium text-sm hover:text-black transition-colors">
            <ArrowLeft size={16} /> Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
