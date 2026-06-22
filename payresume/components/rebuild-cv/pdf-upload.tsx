"use client";

import { useState, useCallback, DragEvent } from "react";
import { Upload, X, FileText } from "lucide-react";

interface PDFUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  error: string | null;
}

export function PDFUpload({ file, onFileChange, error }: PDFUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const validate = useCallback((f: File): string | null => {
    if (f.type !== "application/pdf") return "Hanya file PDF yang diterima. Silakan upload ulang.";
    if (f.size > 5 * 1024 * 1024) return "Ukuran file terlalu besar. Maksimal 5MB.";
    return null;
  }, []);

  const handleFile = useCallback((f: File) => {
    const err = validate(f);
    if (err) { onFileChange(null); alert(err); return; }
    onFileChange(f);
  }, [validate, onFileChange]);

  const handleDrop = (e: DragEvent) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); };
  const handleDragOver = (e: DragEvent) => { e.preventDefault(); setIsDragging(true); };

  return (
    <div>
      {!file ? (
        <label onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={() => setIsDragging(false)} className={`brutal-card flex flex-col items-center justify-center py-12 cursor-pointer border-dashed transition-colors ${isDragging ? "bg-yellow/20 border-yellow" : "hover:bg-bg"}`}>
          <Upload size={48} className="text-muted mb-4" />
          <p className="font-display font-bold text-lg mb-1">Drag CV PDF kamu ke sini atau klik untuk pilih</p>
          <p className="text-muted text-sm font-body">Format: PDF · Maks 5MB</p>
          <div className="flex gap-2 mt-3">
            <span className="brutal-badge bg-blue text-white text-xs">PDF ONLY</span>
            <span className="brutal-badge bg-green text-white text-xs">MAX 5MB</span>
          </div>
          <input type="file" accept=".pdf,application/pdf" onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} className="hidden" />
        </label>
      ) : (
        <div className="brutal-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText size={28} className="text-blue" />
            <div>
              <p className="font-display font-bold text-sm">{file.name}</p>
              <p className="text-muted text-xs">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
          <button onClick={() => onFileChange(null)} className="w-8 h-8 flex items-center justify-center border-2 border-black bg-red text-white"><X size={16} /></button>
        </div>
      )}
      {error && <p className="text-red text-sm mt-2 font-body">{error}</p>}
    </div>
  );
}
