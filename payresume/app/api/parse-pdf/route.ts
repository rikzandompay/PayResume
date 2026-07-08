import { NextRequest, NextResponse } from "next/server";
import { extractTextFromPDF } from "@/lib/pdf-parser";

export const maxDuration = 60; // 60 seconds limit for Vercel

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const pdfFile = formData.get("pdf") as File | null;

    if (!pdfFile) {
      return NextResponse.json({ error: "File PDF diperlukan" }, { status: 400 });
    }

    if (pdfFile.type !== "application/pdf") {
      return NextResponse.json({ error: "Hanya file PDF yang diterima." }, { status: 400 });
    }

    if (pdfFile.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Ukuran file terlalu besar. Maksimal 5MB." }, { status: 400 });
    }

    const buffer = Buffer.from(await pdfFile.arrayBuffer());
    const text = await extractTextFromPDF(buffer);

    if (!text || text.length < 20) {
      return NextResponse.json({ error: "PDF tidak mengandung teks yang bisa dibaca." }, { status: 400 });
    }

    return NextResponse.json({ text });
  } catch (error: unknown) {
    console.error("Parse PDF error:", error);
    const e = error as Error;
    if (e.message === "PDF_PROTECTED") {
      return NextResponse.json({ error: "PDF dilindungi password." }, { status: 400 });
    }
    return NextResponse.json({ error: "Gagal membaca PDF." }, { status: 500 });
  }
}
