import { Upload, Cpu, Download } from "lucide-react";

const steps = [
  {
    num: "1",
    title: "Isi atau Upload",
    desc: "Isi form data diri atau upload CV PDF kamu yang sudah ada.",
    icon: Upload,
    color: "bg-yellow",
  },
  {
    num: "2",
    title: "AI Analisis",
    desc: "Gemini AI mengoptimalkan CV sesuai job description target kamu.",
    icon: Cpu,
    color: "bg-blue",
  },
  {
    num: "3",
    title: "Download PDF",
    desc: "CV siap unduh dalam format A4 yang profesional dan ATS-friendly.",
    icon: Download,
    color: "bg-green",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 px-4" id="how-it-works">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-4">
          Cara Kerja
        </h2>
        <p className="text-center text-muted font-body mb-12 max-w-xl mx-auto">
          Tiga langkah sederhana menuju CV yang lolos ATS dan menarik perhatian rekruter.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="brutal-card group hover:-translate-y-1 transition-transform duration-200"
            >
              <div
                className={`w-14 h-14 ${step.color} border-3 border-black flex items-center justify-center font-display font-bold text-2xl mb-4 shadow-brutal group-hover:shadow-brutal-hover group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all`}
              >
                {step.num}
              </div>
              <step.icon
                size={28}
                className="mb-3 text-muted"
                strokeWidth={2.5}
              />
              <h3 className="font-display font-bold text-xl mb-2">
                {step.title}
              </h3>
              <p className="text-muted font-body text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
