import { X, Check } from "lucide-react";

const rows = [
  {
    feature: "Waktu pembuatan",
    biasa: "2–3 jam",
    payresume: "< 5 menit",
  },
  {
    feature: "ATS Score rata-rata",
    biasa: "30–45",
    payresume: "70–90",
  },
  {
    feature: "Optimasi keyword",
    biasa: "Manual",
    payresume: "Otomatis",
  },
  {
    feature: "Format profesional",
    biasa: "Tidak pasti",
    payresume: "Terjamin",
  },
];

export function ComparisonTable() {
  return (
    <section className="py-16 md:py-24 px-4 bg-white border-y-4 border-black">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
          CV Biasa vs CV PayResume
        </h2>

        <div className="brutal-card overflow-x-auto p-0">
          <table className="w-full text-left min-w-[500px]">
            <thead>
              <tr className="border-b-4 border-black bg-bg">
                <th className="p-4 font-display font-bold text-sm uppercase tracking-wider">
                  Fitur
                </th>
                <th className="p-4 font-display font-bold text-sm uppercase tracking-wider text-center">
                  <span className="flex items-center justify-center gap-1">
                    <X size={16} className="text-red" />
                    CV Biasa
                  </span>
                </th>
                <th className="p-4 font-display font-bold text-sm uppercase tracking-wider text-center bg-yellow/30">
                  <span className="flex items-center justify-center gap-1">
                    <Check size={16} className="text-green" />
                    PayResume
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={`border-b-2 border-black/10 ${
                    i % 2 === 0 ? "" : "bg-bg/50"
                  }`}
                >
                  <td className="p-4 font-body font-medium">{row.feature}</td>
                  <td className="p-4 text-center font-body text-muted">
                    {row.biasa}
                  </td>
                  <td className="p-4 text-center font-body font-bold bg-yellow/10">
                    {row.payresume}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
