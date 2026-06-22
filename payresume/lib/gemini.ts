import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export function getGeminiModel() {
  return genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });
}

export async function generateWithGemini(prompt: string): Promise<string> {
  try {
    const model = getGeminiModel();
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error: any) {
    console.error("Gemini API Error Detail:", error?.message || error);
    throw new Error(`Gemini API Error: ${error?.message || "Terjadi kesalahan internal AI"}`);
  }
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/```/g, "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .trim();
}

export function parseAIResponse<T>(text: string): T {
  // Remove markdown code blocks if present
  let cleaned = text
    .replace(/```json\s*/g, "")
    .replace(/```\s*/g, "")
    .trim();

  // Try to find JSON object in the response
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    cleaned = jsonMatch[0];
  }

  return JSON.parse(cleaned) as T;
}
