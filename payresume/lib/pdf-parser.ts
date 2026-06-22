// PDF parser wrapper — server-side only
// This file must only be imported in API routes / server components

import { PDFParse } from "pdf-parse";

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const parser = new PDFParse({ data: new Uint8Array(buffer) });
    const result = await parser.getText();
    const text = result.text || result.pages?.map(p => p.text).join("\n") || "";
    return text.trim();
  } catch (error: unknown) {
    const err = error as Error;
    if (err.message?.includes("password") || err.message?.includes("Password")) {
      throw new Error("PDF_PROTECTED");
    }
    throw new Error("PDF_PARSE_FAILED");
  }
}
