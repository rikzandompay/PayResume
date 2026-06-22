"use client";

import { CVResult } from "@/lib/types";
import { CheckCircle, XCircle, Lightbulb, TrendingUp } from "lucide-react";

interface ATSPanelProps {
  data: CVResult;
}

function getScoreColor(score: number) {
  if (score >= 81) return { ring: "#2E9E2E", bg: "#D4F5D4", label: "Sangat Baik" };
  if (score >= 61) return { ring: "#6BCB77", bg: "#EAFBEC", label: "Baik" };
  if (score >= 41) return { ring: "#FFD93D", bg: "#FFF8D6", label: "Cukup" };
  return { ring: "#FF6B6B", bg: "#FFEBEB", label: "Perlu Perbaikan" };
}

export function ATSPanel({ data }: ATSPanelProps) {
  const score = data.atsScore || 0;
  const { ring, label } = getScoreColor(score);
  const circumference = 2 * Math.PI * 50;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="space-y-4">
      {/* ATS Score */}
      <div className="brutal-card text-center">
        <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-4">ATS Score</h3>
        <div className="ats-ring mx-auto mb-3">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e5e5" strokeWidth="8" />
            <circle cx="60" cy="60" r="50" fill="none" stroke={ring} strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s ease" }} />
          </svg>
          <div className="ats-ring-value" style={{ color: ring }}>{score}</div>
        </div>
        <p className="font-display font-bold" style={{ color: ring }}>{label}</p>
      </div>

      {/* Before/After for rebuild */}
      {data.originalAtsScore !== undefined && (
        <div className="brutal-card bg-green/10 border-green">
          <div className="flex items-center gap-2 mb-2"><TrendingUp size={18} className="text-green" /><span className="font-display font-bold text-sm">Improvement</span></div>
          <div className="flex items-center justify-between font-display">
            <span className="text-muted">CV Lama: <strong>{data.originalAtsScore}</strong>/100</span>
            <span className="text-2xl">→</span>
            <span className="text-green font-bold">CV Baru: <strong>{data.atsScore}</strong>/100</span>
          </div>
          {data.improvement && <p className="text-green font-bold text-center mt-1">(+{data.improvement} poin)</p>}
        </div>
      )}

      {/* Keyword Match */}
      {data.keywordMatch?.length > 0 && (
        <div className="brutal-card">
          <div className="flex items-center gap-2 mb-3"><CheckCircle size={18} className="text-green" /><span className="font-display font-bold text-sm">Kata Kunci Ditemukan</span></div>
          <div className="flex flex-wrap gap-2">
            {data.keywordMatch.map((k, i) => (<span key={i} className="brutal-badge bg-green/20 border-green text-xs">{k}</span>))}
          </div>
        </div>
      )}

      {/* Missing Keywords */}
      {data.missingKeywords?.length > 0 && (
        <div className="brutal-card">
          <div className="flex items-center gap-2 mb-3"><XCircle size={18} className="text-red" /><span className="font-display font-bold text-sm">Kata Kunci Kurang</span></div>
          <div className="flex flex-wrap gap-2 mb-3">
            {data.missingKeywords.map((k, i) => (<span key={i} className="brutal-badge bg-red/20 border-red text-xs">{k}</span>))}
          </div>
          <p className="text-xs text-muted font-body">Pertimbang menambahkan skill ini jika relevan dengan pengalaman Anda.</p>
        </div>
      )}

      {/* Saran */}
      {data.saranPerbaikan?.length > 0 && (
        <div className="brutal-card">
          <div className="flex items-center gap-2 mb-3"><Lightbulb size={18} className="text-yellow" /><span className="font-display font-bold text-sm">Rekomendasi AI</span></div>
          <div className="space-y-3">
            {data.saranPerbaikan.map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow border-2 border-black flex items-center justify-center font-display font-bold text-xs shrink-0">{i + 1}</div>
                <p className="text-sm font-body text-muted leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
