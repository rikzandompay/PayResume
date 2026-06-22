import { NextRequest, NextResponse } from "next/server";
import { generateWithGemini, sanitizeInput, parseAIResponse } from "@/lib/gemini";
import { CVResult } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formData, style, language } = body;

    if (!formData) {
      return NextResponse.json({ error: "Data form diperlukan" }, { status: 400 });
    }

    const languageLabel = language === "id" ? "Bahasa Indonesia" : "English";
    const styleLabel = style === "ats" ? "ATS Friendly (1 kolom, tanpa grafik)" : "Modern Professional (2 kolom)";

    const prompt = `
Kamu adalah ahli HR dan resume writer profesional Indonesia.

Tugas: Buat CV profesional berdasarkan data berikut.

DATA USER:
${sanitizeInput(JSON.stringify(formData, null, 2))}

INSTRUKSI:
1. Buat ringkasan profil yang kuat (3-4 kalimat, gunakan angka jika ada).
2. Tulis ulang deskripsi pengalaman dalam format STAR dengan action verb kuat. JANGAN mengarang pengalaman yang tidak ada.
3. Susun skill secara strategis (teknis dulu, lalu soft skill).
4. Hitung ATS score berdasarkan kelengkapan dan kualitas data (0-100).
5. Berikan maksimal 5 saran perbaikan spesifik.
6. Gunakan bahasa: ${languageLabel}
7. Gaya output: ${styleLabel}
8. PENTING: Analisis JURUSAN/Pendidikan user jika data pengalaman/skill kosong. JANGAN otomatis membuat profil bidang IT (seperti Web Developer) untuk orang non-IT. Sesuaikan ringkasan profil, skill, dan contoh proyek dengan bidang studi user (misal: Pertambangan, Bisnis, Kesehatan, dll).

WAJIB response dalam JSON valid dengan struktur berikut:
{
  "namaLengkap": "",
  "kontak": { "email": "", "hp": "", "linkedin": "", "github": "", "portofolio": "", "kota": "" },
  "ringkasanProfil": "",
  "pendidikan": [{ "universitas": "", "jurusan": "", "jenjang": "", "ipk": "", "tahunMasuk": "", "tahunLulus": "" }],
  "pengalaman": [{ "tipe": "", "posisi": "", "namaOrg": "", "periode": "", "deskripsi": ["bullet 1", "bullet 2"] }],
  "skillTeknis": [],
  "skillSoft": [],
  "sertifikasi": [{ "nama": "", "penerbit": "", "tahun": "" }],
  "atsScore": 0,
  "keywordMatch": [],
  "missingKeywords": [],
  "saranPerbaikan": ["saran 1", "saran 2"]
}

Jangan sertakan markdown, backtick, atau teks apapun di luar JSON.
`;

    const response = await generateWithGemini(prompt);
    const result = parseAIResponse<CVResult>(response);

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Generate CV error:", error);
    const message = error instanceof Error ? error.message : "Gagal generate CV";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
