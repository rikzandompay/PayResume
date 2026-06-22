"use client";

import { CVResult } from "@/lib/types";
import { generateATSTemplate, generateModernTemplate } from "@/lib/cv-templates";

interface CVPreviewProps {
  data: CVResult;
  style: "ats" | "modern";
}

export function CVPreview({ data, style }: CVPreviewProps) {
  const html = style === "ats" ? generateATSTemplate(data) : generateModernTemplate(data);

  return (
    <div className="a4-preview border-4 border-black shadow-brutal-lg overflow-y-auto" style={{ maxHeight: "80vh" }}>
      {/* Inner div tanpa height constraint — ini yang di-capture html2pdf */}
      <div id="cv-preview-container">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
