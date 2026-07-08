import { Code2, Sparkles, Heart } from "lucide-react";

export const metadata = {
  title: "Tentang PayResume — AI Resume Builder",
  description: "Pelajari lebih lanjut tentang PayResume, misi kami, dan teknologi di balik AI Resume Builder terbaik Indonesia.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="brutal-badge bg-blue text-white mb-4">TENTANG KAMI</div>
        <h1 className="font-display font-bold text-4xl md:text-5xl mb-6">Tentang PayResume</h1>

        <div className="brutal-card mb-6">
          <div className="flex items-center gap-3 mb-4"><Heart size={24} className="text-red" /><h2 className="font-display font-bold text-xl">Misi Kami</h2></div>
          <p className="font-body text-muted leading-relaxed mb-4">PayResume di buat bagi orang yang ingin membuat CV profesional namun bingung dengan desain nya,dan cara penulisan nya. oleh karna itu pengembang terInspirasi membuat payresume ini agar semua orang bisa membuat CV profesional dalam hitungan menit, tanpa perlu skill desain, tanpa biaya, dan tanpa ribet. bagi pelamar kerja</p>
          <p className="font-body text-muted leading-relaxed">Kami membangun PayResume berniat memudahkan pelamar pekerjaan dalam membuat CV yang profesional, dengan memanfaatkan AI untuk bekerja.</p>
        </div>

        <div className="brutal-card mb-6">
          <div className="flex items-center gap-3 mb-4"><Code2 size={24} className="text-blue" /><h2 className="font-display font-bold text-xl">Teknologi</h2></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {["Next.js 15", "Tailwind CSS", "Google Gemini AI", "TypeScript", "React Hook Form", "html2pdf.js"].map(t => (
              <div key={t} className="brutal-badge bg-bg text-center py-2">{t}</div>
            ))}
          </div>
        </div>

        <div className="brutal-card">
          <div className="flex items-center gap-3 mb-4"><Sparkles size={24} className="text-yellow" /><h2 className="font-display font-bold text-xl">Filosofi</h2></div>
          <ul className="space-y-3 font-body text-muted">
            <li className="flex items-start gap-2"><span className="text-yellow font-bold">✦</span> Gratis dan tanpa akun — akses terbuka untuk semua orang</li>
            <li className="flex items-start gap-2"><span className="text-yellow font-bold">✦</span> Privasi utama — data tidak disimpan di server</li>
            <li className="flex items-start gap-2"><span className="text-yellow font-bold">✦</span> AI sebagai asisten, bukan pengganti — kamu tetap pemilik CV</li>
            <li className="flex items-start gap-2"><span className="text-yellow font-bold">✦</span> Desain bold dan transparan — seperti CV yang baik</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
