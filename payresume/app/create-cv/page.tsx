"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { StepIndicator } from "@/components/create-cv/step-indicator";
import { Step1Personal } from "@/components/create-cv/step-1-personal";
import { Step2Education } from "@/components/create-cv/step-2-education";
import { Step3Experience } from "@/components/create-cv/step-3-experience";
import { Step4Skills } from "@/components/create-cv/step-4-skills";
import { Step5Preferences } from "@/components/create-cv/step-5-preferences";
import { Step1Data, Step2Data, Step3Data, Step4Data, Step5Data } from "@/lib/types";
import { track } from "@/lib/analytics";

const STORAGE_KEY = "payresume_create_cv_data";

const defaultStep1: Step1Data = { namaLengkap: "", email: "", nomorHp: "", alamat: "", kota: "", linkedin: "", github: "", ringkasanProfil: "" };
const defaultStep2: Step2Data = { pendidikan: [{ universitas: "", jurusan: "", jenjang: "S1", tahunMasuk: "", tahunLulus: "" }] };
const defaultStep3: Step3Data = { pengalaman: [] };
const defaultStep4: Step4Data = { skills: [], sertifikasi: [] };
const defaultStep5: Step5Data = { style: "ats", language: "id" };

export default function CreateCVPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [step1, setStep1] = useState<Step1Data>(defaultStep1);
  const [step2, setStep2] = useState<Step2Data>(defaultStep2);
  const [step3, setStep3] = useState<Step3Data>(defaultStep3);
  const [step4, setStep4] = useState<Step4Data>(defaultStep4);
  const [step5, setStep5] = useState<Step5Data>(defaultStep5);

  // Restore from sessionStorage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const d = JSON.parse(saved);
        if (d.step1) setStep1(d.step1);
        if (d.step2) setStep2(d.step2);
        if (d.step3) setStep3(d.step3);
        if (d.step4) setStep4(d.step4);
        if (d.step5) setStep5(d.step5);
        if (d.completedSteps) setCompletedSteps(d.completedSteps);
        if (d.step) setStep(d.step);
      }
    } catch { /* ignore */ }
    setIsLoaded(true);
  }, []);

  // Save to sessionStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step, step1, step2, step3, step4, step5, completedSteps }));
    } catch { /* ignore */ }
  }, [isLoaded, step, step1, step2, step3, step4, step5, completedSteps]);

  const markComplete = (s: number) => {
    if (!completedSteps.includes(s)) setCompletedSteps([...completedSteps, s]);
  };

  const handleGenerate = async (prefs: Step5Data) => {
    setStep5(prefs);
    markComplete(5);
    setIsLoading(true);
    setError(null);
    track("generate_cv_started");

    try {
      const res = await fetch("/api/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData: { step1, step2, step3, step4 },
          style: prefs.style,
          language: prefs.language,
        }),
      });

      if (!res.ok) {
        let errMessage = "Gagal generate CV (Sistem sibuk atau timeout).";
        try {
          const err = await res.json();
          errMessage = err.error || errMessage;
        } catch (jsonErr) {
          console.error("Non-JSON error response from server", jsonErr);
        }
        throw new Error(errMessage);
      }

      const result = await res.json();
      sessionStorage.setItem("payresume_result", JSON.stringify(result));
      sessionStorage.setItem("payresume_style", prefs.style);
      sessionStorage.setItem("payresume_source", "create-cv");
      track("generate_cv_success");
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
        <h1 className="font-display font-bold text-3xl md:text-4xl mb-2">Buat CV Baru</h1>
        <p className="text-muted font-body mb-6">Wizard untuk fresh graduate. Isi step-by-step, AI bantu sisanya.</p>

        <StepIndicator currentStep={step} completedSteps={completedSteps} />

        {error && (
          <div className="border-4 border-red bg-red/10 p-4 mb-6 animate-fade-in">
            <h3 className="font-bold text-lg mb-1">⚠ Terjadi Kesalahan</h3>
            <p className="text-muted text-sm mb-3">{error}</p>
            <button onClick={() => setError(null)} className="brutal-btn brutal-btn-primary text-sm">Coba Lagi</button>
          </div>
        )}

        {isLoaded ? (
          <div className="brutal-card">
            {step === 1 && <Step1Personal data={step1} onNext={(d) => { setStep1(d); markComplete(1); setStep(2); }} />}
            {step === 2 && <Step2Education data={step2} onNext={(d) => { setStep2(d); markComplete(2); setStep(3); }} onBack={() => setStep(1)} />}
            {step === 3 && <Step3Experience data={step3} onNext={(d) => { setStep3(d); markComplete(3); setStep(4); }} onBack={() => setStep(2)} />}
            {step === 4 && <Step4Skills data={step4} onNext={(d) => { setStep4(d); markComplete(4); setStep(5); }} onBack={() => setStep(3)} />}
            {step === 5 && <Step5Preferences data={step5} onSubmit={handleGenerate} onBack={() => setStep(4)} isLoading={isLoading} />}
          </div>
        ) : (
          <div className="brutal-card text-center py-10">
            <div className="w-8 h-8 border-4 border-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-display font-medium">Memuat data...</p>
          </div>
        )}
      </div>
    </div>
  );
}
