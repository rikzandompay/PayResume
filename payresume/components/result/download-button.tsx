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
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const el = document.getElementById("cv-preview-container");
      if (!el) return;

      // A4 dimensions in points (jsPDF unit)
      const A4_W_PT = 595.28;
      const A4_H_PT = 841.89;
      // A4 in px at 96dpi = 794 x 1123 px
      const A4_W_PX = 794;

      // Clone element ke container offscreen dengan lebar A4 penuh
      const wrapper = document.createElement("div");
      wrapper.style.cssText = `
        position: fixed; top: -9999px; left: -9999px;
        width: ${A4_W_PX}px; background: #fff;
        z-index: -9999; overflow: visible;
      `;
      const clone = el.cloneNode(true) as HTMLElement;
      // Override width di root div agar mengisi A4 penuh
      const rootDiv = clone.querySelector("div") as HTMLElement | null;
      if (rootDiv) {
        rootDiv.style.width = `${A4_W_PX}px`;
        rootDiv.style.maxWidth = `${A4_W_PX}px`;
        rootDiv.style.boxSizing = "border-box";
      }
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      // Capture dengan html2canvas
      const canvas = await html2canvas(wrapper, {
        scale: 2,
        useCORS: true,
        width: A4_W_PX,
        windowWidth: A4_W_PX,
        backgroundColor: "#ffffff",
      });

      document.body.removeChild(wrapper);

      // Hitung berapa halaman yang dibutuhkan
      const canvasW = canvas.width;
      const canvasH = canvas.height;
      // Rasio px per pt
      const pxPerPt = canvasW / A4_W_PT;
      const pageHeightPx = A4_H_PT * pxPerPt;
      const totalPages = Math.ceil(canvasH / pageHeightPx);

      const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" });

      for (let i = 0; i < totalPages; i++) {
        if (i > 0) pdf.addPage();

        // Crop canvas per halaman
        const srcY = i * pageHeightPx;
        const srcH = Math.min(pageHeightPx, canvasH - srcY);

        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvasW;
        pageCanvas.height = srcH;
        const ctx = pageCanvas.getContext("2d")!;
        ctx.drawImage(canvas, 0, srcY, canvasW, srcH, 0, 0, canvasW, srcH);

        const pageImg = pageCanvas.toDataURL("image/jpeg", 0.98);
        const imgH = (srcH / pxPerPt); // pt
        pdf.addImage(pageImg, "JPEG", 0, 0, A4_W_PT, imgH);
      }

      const filename = `${namaUser.toLowerCase().replace(/\s+/g, "-")}-resume-payresume.pdf`;
      pdf.save(filename);

      track("pdf_downloaded");
    } catch (e) { console.error(e); } finally { setDownloading(false); }
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
