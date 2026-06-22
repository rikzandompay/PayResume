import { NextRequest, NextResponse } from "next/server";
import { generateWithGemini, sanitizeInput } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { posisi, namaOrg, tipe } = await req.json();

    if (!posisi || !namaOrg) {
      return NextResponse.json({ error: "Posisi dan nama organisasi diperlukan" }, { status: 400 });
    }

    const prompt = `
Kamu adalah asisten penulisan CV profesional Indonesia.

Tugas: Buatkan deskripsi pekerjaan singkat (2-3 bullet point) untuk posisi tertentu.

POSISI: ${sanitizeInput(posisi)}
ORGANISASI/PERUSAHAAN: ${sanitizeInput(namaOrg)}
TIPE: ${sanitizeInput(tipe || "Pekerjaan")}

INSTRUKSI:
1. Buat 2-3 bullet point deskripsi tugas/tanggung jawab yang relevan
2. Gunakan action verb kuat di awal setiap bullet (Mengembangkan, Memimpin, Mengoptimalkan, dll.)
3. Sertakan angka/metrik jika memungkinkan
4. Sesuaikan bahasa dengan konteks Indonesia

Response dalam format teks biasa, setiap bullet dimulai dengan "• " (tanpa JSON, tanpa markdown).
`;

    const response = await generateWithGemini(prompt);
    return NextResponse.json({ deskripsi: response.trim() });
  } catch (error: unknown) {
    console.error("AI Assist error:", error);
    return NextResponse.json({ error: "Gagal generate deskripsi" }, { status: 500 });
  }
}
