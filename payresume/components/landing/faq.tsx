"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Apakah PayResume gratis?",
    a: "Ya, PayResume sepenuhnya gratis untuk digunakan. Tidak ada biaya tersembunyi, tidak perlu akun, dan tidak perlu kartu kredit. Kami percaya akses ke CV profesional seharusnya terbuka untuk semua orang.",
  },
  {
    q: "Apakah data CV saya disimpan?",
    a: "Tidak. Data CV kamu hanya diproses saat generate dan langsung dihapus dari server. Kami tidak menyimpan data pribadi, file PDF, atau hasil CV di database manapun. Privasi kamu adalah prioritas kami.",
  },
  {
    q: "Apa itu ATS Score?",
    a: "ATS (Applicant Tracking System) Score adalah skor 0-100 yang menunjukkan seberapa baik CV kamu dapat dibaca oleh sistem perekrutan otomatis. Perusahaan besar seperti Shopee, Telkom, dan bank-bank besar menggunakan ATS untuk menyaring CV. Score di atas 70 dianggap baik.",
  },
  {
    q: "CV saya berbahasa Inggris, bisa dipakai?",
    a: "Tentu! PayResume mendukung CV dalam Bahasa Indonesia maupun Bahasa Inggris. Kamu bisa memilih bahasa output saat membuat CV baru, atau langsung upload CV berbahasa Inggris untuk di-rebuild.",
  },
  {
    q: "Berapa lama proses generate CV?",
    a: "Biasanya antara 5-10 detik. AI kami (Google Gemini) akan menganalisis data kamu dan menghasilkan CV yang sudah dioptimasi. Jika sedang ramai, mungkin memakan waktu sedikit lebih lama.",
  },
  {
    q: "Apakah CV hasil PayResume bisa diedit lagi?",
    a: "Saat ini, CV yang sudah di-generate dapat di-download sebagai PDF. Jika kamu ingin mengubah data, kamu bisa kembali ke form dan generate ulang. Fitur edit langsung di preview akan hadir di update mendatang.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 px-4" id="faq">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-4">
          Pertanyaan Umum
        </h2>
        <p className="text-center text-muted font-body mb-12">
          Hal-hal yang sering ditanyakan tentang PayResume.
        </p>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="brutal-card p-0 overflow-hidden"
              id={`faq-item-${i}`}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left font-display font-bold hover:bg-yellow/20 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 ml-4 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 pt-0 border-t-2 border-black/10 animate-fade-in">
                  <p className="font-body text-muted leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
