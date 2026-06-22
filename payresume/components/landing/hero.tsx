"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-yellow border-b-4 border-black relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-blue border-4 border-black rotate-12 hidden md:block" />
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-green border-4 border-black -rotate-6 hidden md:block" />
      <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-red border-3 border-black rounded-full hidden lg:block" />

      <div className="mx-auto max-w-5xl px-4 py-16 md:py-24 relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 brutal-badge bg-white mb-6 animate-fade-in">
          <Sparkles size={14} />
          <span>Gratis · Tanpa Akun · Pakai AI</span>
        </div>

        {/* Headline */}
        <h1
          className="font-display font-[800] text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6 animate-slide-up"
          id="hero-headline"
        >
          CV Profesional
          <br />
          <span className="relative">
            Dalam 5 Menit.
            <svg
              className="absolute -bottom-2 left-0 w-full"
              height="12"
              viewBox="0 0 400 12"
              fill="none"
            >
              <path
                d="M2 8C100 2 300 2 398 8"
                stroke="#4D96FF"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl max-w-2xl mb-8 text-text/80 font-body leading-relaxed animate-slide-up">
          Buat CV dari nol atau optimalkan CV lama kamu agar lolos ATS — ditenagai AI.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up">
          <Link
            href="/create-cv"
            className="brutal-btn brutal-btn-dark text-lg px-8 py-4"
            id="cta-create-cv"
          >
            Buat CV Baru
            <ArrowRight size={20} />
          </Link>
          <Link
            href="/rebuild-cv"
            className="brutal-btn brutal-btn-secondary text-lg px-8 py-4"
            id="cta-rebuild-cv"
          >
            Rebuild CV Lama
          </Link>
        </div>

        {/* Micro Stats */}
        <div className="flex flex-wrap gap-6 text-sm font-body text-text/60 animate-fade-in">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green rounded-full" />
            <span>
              <strong className="text-text">12.483</strong> CV dibuat
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue rounded-full" />
            <span>
              Rata-rata ATS Score <strong className="text-text">78/100</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
