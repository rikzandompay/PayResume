"use client";

interface JDInputProps {
  value: string;
  onChange: (v: string) => void;
}

export function JDInput({ value, onChange }: JDInputProps) {
  const len = value.length;

  return (
    <div>
      <label className="block font-display font-bold text-sm mb-1 uppercase tracking-wide">
        Target Lowongan
      </label>
      <p className="text-muted text-xs font-body mb-2">Job Description posisi yang ingin dilamar</p>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={6}
        className="brutal-input min-h-[150px] resize-y"
        placeholder="Opsional: paste deskripsi pekerjaan dari LinkedIn, Glints, Jobstreet, dll..."
      />
      <div className="flex justify-between mt-1">
        <p className="text-xs text-muted font-body">Opsional — isi jika ingin optimasi CV lebih sesuai lowongan tertentu</p>
        <p className="text-xs font-bold text-muted">
          {len} karakter
        </p>
      </div>
    </div>
  );
}
