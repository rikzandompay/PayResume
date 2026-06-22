"use client";

import { useState } from "react";
import { Download, Eye } from "lucide-react";
import { track } from "@/lib/analytics";

interface DownloadButtonProps {
  namaUser: string;
}

export function DownloadButton({ namaUser }: DownloadButtonProps) {
  const [downloading, setDownloading] = useState(false);

  const handlePreview = () => {
    const el = document.getElementById("cv-preview-container");
    if (!el) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="id">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Preview CV - ${namaUser}</title>
          <style>
            * { box-sizing: border-box; }
            body {
              margin: 0;
              min-height: 100vh;
              background: #525659;
              display: flex;
              justify-content: center;
              padding: 32px 0;
            }
            #preview-root {
              width: 595px;
              min-height: 842px;
              background: #fff;
              box-shadow: 0 4px 8px rgba(0,0,0,0.2);
              padding: 0;
            }
            @media print {
              body { background: #fff; padding: 0; display: block; }
              #preview-root { box-shadow: none; margin: 0; width: 100%; height: auto; }
            }
            @media (max-width: 640px) {
              #preview-root {
                transform: scale(0.6);
                transform-origin: top center;
                margin-bottom: -330px;
              }
            }
          </style>
        </head>
        <body>
          <main id="preview-root">${el.innerHTML}</main>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    
    const previewWindow = window.open(url, "_blank");
    if (!previewWindow) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      previewWindow.focus();
      // Revoke the object URL after a short delay to allow the new window to load it
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    track("cv_preview_opened");
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const el = document.getElementById("cv-preview-container");
      if (!el) return;

      // Sementara hapus overflow dari parent agar html2pdf bisa capture semua konten
      const parent = el.parentElement;
      const prevOverflow = parent?.style.overflow || "";
      const prevMaxHeight = parent?.style.maxHeight || "";
      if (parent) {
        parent.style.overflow = "visible";
        parent.style.maxHeight = "none";
      }

      const filename = `${namaUser.toLowerCase().replace(/\s+/g, "-")}-resume-payresume.pdf`;
      await html2pdf().set({
        margin: [8, 0, 8, 0],
        filename,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      }).from(el).save();

      // Kembalikan style semula
      if (parent) {
        parent.style.overflow = prevOverflow;
        parent.style.maxHeight = prevMaxHeight;
      }

      track("pdf_downloaded");
    } catch { /* silent */ } finally { setDownloading(false); }
  };

  return (
    <div className="flex gap-3">
      <button onClick={handlePreview} className="brutal-btn brutal-btn-secondary text-sm">
        <Eye size={16} /> Preview CV
      </button>
      <button onClick={handleDownload} disabled={downloading} className="brutal-btn brutal-btn-primary text-sm">
        {downloading ? <><div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> Downloading...</> : <><Download size={16} /> Download PDF</>}
      </button>
    </div>
  );
}
