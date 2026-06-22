import { NextRequest, NextResponse } from "next/server";
import { generateWithGemini, sanitizeInput, parseAIResponse } from "@/lib/gemini";
import { extractTextFromPDF } from "@/lib/pdf-parser";
import { CVResult } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const pdfFile = formData.get("pdf") as File | null;
    const jobDescription = formData.get("jobDescription") as string;
    const style = formData.get("style") as string;

    if (!pdfFile) {
      return NextResponse.json({ error: "File PDF diperlukan" }, { status: 400 });
    }

    // Validate MIME type server-side
    if (pdfFile.type !== "application/pdf") {
      return NextResponse.json({ error: "Hanya file PDF yang diterima. Silakan upload ulang." }, { status: 400 });
    }

    if (pdfFile.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Ukuran file terlalu besar. Maksimal 5MB." }, { status: 400 });
    }

    const safeJobDescription = jobDescription?.trim() || "Tidak ada job description spesifik. Optimalkan CV secara umum agar lebih profesional dan ATS-friendly.";

    // Parse PDF
    const buffer = Buffer.from(await pdfFile.arrayBuffer());
    let extractedText: string;

    try {
      extractedText = await extractTextFromPDF(buffer);
    } catch (err: unknown) {
      const e = err as Error;
      if (e.message === "PDF_PROTECTED") {
        return NextResponse.json({ error: "PDF ini dilindungi password dan tidak bisa dibaca. Coba hapus password dulu." }, { status: 400 });
      }

      // Beberapa PDF valid tetap bisa gagal dibaca otomatis karena format encoding,
      // hasil export dari aplikasi tertentu, atau struktur PDF yang tidak standar.
      // Jangan blokir user: lanjutkan rebuild dengan konteks minimal.
      extractedText = `CV lama diupload sebagai file: ${pdfFile.name}. Parser otomatis tidak berhasil mengekstrak teks dari PDF ini. Gunakan job description dan konteks umum untuk membuat CV profesional yang ATS-friendly.`;
    }

    if (!extractedText || extractedText.length < 20) {
      return NextResponse.json({ error: "CV ini tampaknya hasil scan dan tidak mengandung teks yang bisa dibaca. Coba gunakan CV versi digital." }, { status: 400 });
    }

    const styleLabel = style === "ats" ? "ATS Friendly (1 kolom, tanpa grafik)" : "Modern Professional (2 kolom)";

    const prompt = `
Kamu adalah seorang Konsultan Karir dan Ahli Pembuat CV berstandar ATS (Applicant Tracking System).
Tugasmu adalah merombak dan meracik ulang "CV Lama/Data Mentah" milik pengguna agar sangat relevan dengan "Job Description" (Lowongan Kerja) yang mereka tuju.

CV LAMA (hasil ekstraksi):
${sanitizeInput(extractedText)}

JOB DESCRIPTION TARGET:
${sanitizeInput(safeJobDescription)}

GAYA OUTPUT: ${styleLabel}

ATURAN KERJA:
1. Analisis Job Description yang diberikan, ekstrak kata kunci (keywords) utamanya.
2. Tulis ulang pengalaman dan keahlian pengguna dengan menonjolkan kata kunci dari Job Description tersebut.
3. Buang informasi dari CV Lama yang sama sekali tidak relevan dengan Job Description dari deskripsi, tapi JANGAN hapus data faktual.
4. JANGAN gunakan gaya bahasa yang kaku seperti robot. Gunakan bahasa Indonesia yang profesional, aktif, dan menjual.
5. JANGAN memberikan kalimat pembuka atau penutup. Langsung isi JSON-nya saja.
6. JANGAN mengubah data faktual: nama, kontak, nama perusahaan, jabatan, tahun kerja, universitas, IPK, nama sertifikasi. HANYA boleh menulis ulang kalimat deskripsi dan ringkasan profil.

WAJIB response dalam JSON valid berikut (JANGAN ada teks apapun di luar JSON):
{
  "namaLengkap": "Salin persis dari CV lama",
  "kontak": {
    "email": "Salin persis dari CV lama",
    "hp": "Salin persis dari CV lama",
    "linkedin": "Salin persis jika ada, atau kosong",
    "github": "Salin persis jika ada, atau kosong",
    "portofolio": "Salin persis link portofolio jika ada, atau kosong",
    "kota": "Salin persis dari CV lama"
  },
  "ringkasanProfil": "Tulis 4-5 kalimat ringkasan profesional yang kuat: gabungkan identitas/pengalaman pengguna dengan kebutuhan Job Description. Bahasa aktif dan menjual.",
  "pendidikan": [{ "universitas": "Salin persis dari CV lama", "jurusan": "Salin persis dari CV lama", "jenjang": "Salin persis dari CV lama", "ipk": "Salin persis jika ada", "tahunMasuk": "Salin persis", "tahunLulus": "Salin persis" }],
  "pengalaman": [{ "tipe": "Salin tipe kerja persis dari CV lama", "posisi": "Salin persis nama jabatan dari CV lama", "namaOrg": "Salin persis nama perusahaan dari CV lama", "periode": "Salin persis periode dari CV lama", "deskripsi": ["Tulis ulang seluruh deskripsi dalam SATU paragraf padat. Gunakan kata kerja aktif dan sematkan keyword dari JD secara natural. Fakta tidak boleh berubah."] }],
  "skillTeknis": ["Hard skill relevan dengan JD, ambil dari CV lama + keyword JD yang cocok"],
  "skillSoft": ["Soft skill yang relevan dari CV lama"],
  "sertifikasi": [{ "nama": "Salin persis dari CV lama", "penerbit": "Salin persis + link/ID jika ada", "tahun": "Salin persis" }],
  "atsScore": 85,
  "originalAtsScore": 55,
  "improvement": 30,
  "keywordMatch": ["keyword dari JD yang berhasil dimasukkan ke CV"],
  "missingKeywords": ["keyword dari JD yang belum ada di CV"],
  "saranPerbaikan": ["Saran 1 spesifik", "Saran 2 spesifik", "Saran 3 spesifik", "Saran 4 spesifik", "Saran 5 spesifik"]
}

Jangan sertakan markdown, backtick, atau teks apapun di luar JSON.
`;

    const response = await generateWithGemini(prompt);
    const result = parseAIResponse<CVResult>(response);

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Rebuild CV error:", error);
    const message = error instanceof Error ? error.message : "Gagal rebuild CV";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
