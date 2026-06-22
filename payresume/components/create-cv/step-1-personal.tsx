"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, Step1FormData } from "@/lib/validations";
import { Step1Data } from "@/lib/types";
import { Link2, GitBranch, Sparkles } from "lucide-react";
import { useState } from "react";

interface Step1Props {
  data: Step1Data;
  onNext: (data: Step1Data) => void;
}

export function Step1Personal({ data, onNext }: Step1Props) {
  const [aiRingkasan, setAiRingkasan] = useState(data.aiRingkasan || false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: data,
    mode: "onBlur",
  });

  const onSubmit = (formData: Step1FormData) => {
    onNext({ ...formData, aiRingkasan });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 animate-fade-in">
      <div className="brutal-badge bg-yellow mb-4">DATA DIRI</div>
      <h2 className="font-display font-bold text-2xl">Data Diri</h2>

      {/* Nama Lengkap */}
      <div>
        <label className="block font-display font-medium text-sm mb-1 uppercase tracking-wide">
          Nama Lengkap *
        </label>
        <input
          {...register("namaLengkap")}
          className={`brutal-input ${errors.namaLengkap ? "error" : ""}`}
          placeholder="Budi Santoso"
          id="input-nama"
        />
        {errors.namaLengkap && (
          <p className="text-red text-sm mt-1 font-body">{errors.namaLengkap.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block font-display font-medium text-sm mb-1 uppercase tracking-wide">
          Email *
        </label>
        <input
          {...register("email")}
          type="email"
          className={`brutal-input ${errors.email ? "error" : ""}`}
          placeholder="budi@email.com"
          id="input-email"
        />
        {errors.email && (
          <p className="text-red text-sm mt-1 font-body">{errors.email.message}</p>
        )}
      </div>

      {/* Nomor HP */}
      <div>
        <label className="block font-display font-medium text-sm mb-1 uppercase tracking-wide">
          Nomor HP *
        </label>
        <input
          {...register("nomorHp")}
          type="tel"
          className={`brutal-input ${errors.nomorHp ? "error" : ""}`}
          placeholder="081234567890"
          id="input-hp"
        />
        {errors.nomorHp && (
          <p className="text-red text-sm mt-1 font-body">{errors.nomorHp.message}</p>
        )}
      </div>

      {/* Alamat */}
      <div>
        <label className="block font-display font-medium text-sm mb-1 uppercase tracking-wide">
          Alamat *
        </label>
        <input
          {...register("alamat")}
          className={`brutal-input ${errors.alamat ? "error" : ""}`}
          placeholder="Jl. Sudirman No. 123, Jakarta Selatan"
          id="input-alamat"
        />
        {errors.alamat && (
          <p className="text-red text-sm mt-1 font-body">{errors.alamat.message}</p>
        )}
      </div>

      {/* Kota */}
      <div>
        <label className="block font-display font-medium text-sm mb-1 uppercase tracking-wide">
          Kota *
        </label>
        <input
          {...register("kota")}
          className={`brutal-input ${errors.kota ? "error" : ""}`}
          placeholder="Jakarta"
          id="input-kota"
        />
        {errors.kota && (
          <p className="text-red text-sm mt-1 font-body">{errors.kota.message}</p>
        )}
      </div>

      {/* LinkedIn */}
      <div>
        <label className="block font-display font-medium text-sm mb-1 uppercase tracking-wide">
          LinkedIn
        </label>
        <div className="relative">
          <Link2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            {...register("linkedin")}
            className={`brutal-input pl-10 ${errors.linkedin ? "error" : ""}`}
            placeholder="https://linkedin.com/in/budi"
            id="input-linkedin"
          />
        </div>
        {errors.linkedin && (
          <p className="text-red text-sm mt-1 font-body">{errors.linkedin.message}</p>
        )}
      </div>

      {/* GitHub */}
      <div>
        <label className="block font-display font-medium text-sm mb-1 uppercase tracking-wide">
          GitHub
        </label>
        <div className="relative">
          <GitBranch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            {...register("github")}
            className={`brutal-input pl-10 ${errors.github ? "error" : ""}`}
            placeholder="https://github.com/budi"
            id="input-github"
          />
        </div>
        {errors.github && (
          <p className="text-red text-sm mt-1 font-body">{errors.github.message}</p>
        )}
      </div>

      {/* Portofolio */}
      <div>
        <label className="block font-display font-medium text-sm mb-1 uppercase tracking-wide">
          Website / Portofolio (Untuk QR Code)
        </label>
        <div className="relative">
          <Link2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            {...register("portofolio")}
            className={`brutal-input pl-10 ${errors.portofolio ? "error" : ""}`}
            placeholder="https://dribbble.com/budi"
            id="input-portofolio"
          />
        </div>
        {errors.portofolio && (
          <p className="text-red text-sm mt-1 font-body">{errors.portofolio.message}</p>
        )}
      </div>

      {/* Ringkasan Profil */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block font-display font-medium text-sm uppercase tracking-wide">
            Ringkasan Profil
          </label>
          <button
            type="button"
            onClick={() => setAiRingkasan(!aiRingkasan)}
            className={`text-xs font-display font-bold flex items-center gap-1 px-3 py-1 border-2 border-black transition-colors ${
              aiRingkasan ? "bg-blue text-white" : "bg-white text-black"
            }`}
            id="btn-ai-ringkasan"
          >
            <Sparkles size={12} />
            Biarkan AI yang buat
          </button>
        </div>
        <textarea
          {...register("ringkasanProfil")}
          className={`brutal-input min-h-[100px] resize-y ${
            aiRingkasan ? "opacity-50" : ""
          } ${errors.ringkasanProfil ? "error" : ""}`}
          placeholder="Ceritakan singkat tentang diri kamu (3-4 kalimat)..."
          disabled={aiRingkasan}
          id="input-ringkasan"
        />
        {errors.ringkasanProfil && (
          <p className="text-red text-sm mt-1 font-body">{errors.ringkasanProfil.message}</p>
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-4">
        <button type="submit" className="brutal-btn brutal-btn-primary" id="btn-next-step1">
          Lanjut →
        </button>
      </div>
    </form>
  );
}
