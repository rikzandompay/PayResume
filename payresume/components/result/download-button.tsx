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

    let pdfRoot: HTMLDivElement | null = null;
    let styleTag: HTMLStyleElement | null = null;

    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const el = document.getElementById("cv-preview-container");
      if (!el) return;

      const filename = `${namaUser.toLowerCase().replace(/\s+/g, "-")}-resume-payresume.pdf`;

      // Render PDF dari clone khusus supaya ukuran kertas tidak ikut style preview
      // seperti border, shadow, max-height, overflow, atau zoom dari halaman.
      pdfRoot = document.createElement("div");
      pdfRoot.id = "pdf-render-root";
      pdfRoot.setAttribute("aria-hidden", "true");
      pdfRoot.style.position = "fixed";
      pdfRoot.style.left = "-10000px";
      pdfRoot.style.top = "0";
      pdfRoot.style.width = "595px";
      pdfRoot.style.minHeight = "842px";
      pdfRoot.style.margin = "0";
      pdfRoot.style.padding = "0";
      pdfRoot.style.background = "#ffffff";
      pdfRoot.style.overflow = "visible";

      const clonedCv = el.cloneNode(true) as HTMLElement;
      clonedCv.id = "pdf-cv-container";
      clonedCv.style.width = "595px";
      clonedCv.style.minHeight = "842px";
      clonedCv.style.margin = "0";
      clonedCv.style.padding = "0";
      clonedCv.style.background = "#ffffff";
      clonedCv.style.overflow = "visible";

      pdfRoot.appendChild(clonedCv);
      document.body.appendChild(pdfRoot);

      // Style khusus PDF: full A4, tanpa margin browser, dan page break seperlunya.
      styleTag = document.createElement("style");
      styleTag.id = "pdf-temp-style";
      styleTag.textContent = `
        @page { size: A4; margin: 0; }
        #pdf-render-root,
        #pdf-cv-container {
          width: 595px !important;
          min-height: 842px !important;
          margin: 0 !important;
          padding: 0 !important;
          background: #ffffff !important;
          box-sizing: border-box !important;
          overflow: visible !important;
        }
        #pdf-cv-container > div,
        #pdf-cv-container > div > div {
          width: 595px !important;
          max-width: 595px !important;
          margin: 0 !important;
          box-sizing: border-box !important;
        }
        #pdf-cv-container h1,
        #pdf-cv-container h2,
        #pdf-cv-container h3 {
          page-break-after: avoid !important;
          break-after: avoid !important;
        }
        #pdf-cv-container section,
        #pdf-cv-container ul,
        #pdf-cv-container li {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
      `;
      document.head.appendChild(styleTag);

      // A4 dalam point: 595.28 × 841.89. Width clone disamakan 595px
      // supaya html2pdf tidak mengecilkan layout dan hasilnya memenuhi halaman.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await html2pdf().set({
        margin: 0,
        filename,
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          scrollX: 0,
          scrollY: 0,
          width: 595,
          windowWidth: 595,
        },
        jsPDF: { unit: "pt", format: [595.28, 841.89], orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"], avoid: ["section", "ul", "li"] },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any).from(clonedCv).save();

      track("pdf_downloaded");
    } catch { /* silent */ } finally {
      styleTag?.remove();
      pdfRoot?.remove();
      setDownloading(false);
    }
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
