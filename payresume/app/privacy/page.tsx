export const metadata = {
  title: "Kebijakan Privasi — PayResume",
  description: "Kebijakan privasi PayResume. Pelajari bagaimana kami menangani data pribadi Anda.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="brutal-badge bg-yellow mb-4">LEGAL</div>
        <h1 className="font-display font-bold text-4xl mb-6">Kebijakan Privasi</h1>
        <p className="text-muted font-body text-sm mb-8">Terakhir diperbarui: Juni 2025</p>

        <div className="brutal-card space-y-6">
          <section>
            <h2 className="font-display font-bold text-xl mb-3">Data yang Dikumpulkan</h2>
            <p className="font-body text-muted leading-relaxed">PayResume hanya mengumpulkan data analytics anonim (halaman yang dikunjungi, durasi sesi) untuk meningkatkan layanan. Kami <strong>tidak</strong> mengumpulkan data pribadi seperti nama, email, atau nomor telepon ke database kami.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-3">Penyimpanan Data CV</h2>
            <p className="font-body text-muted leading-relaxed">Data CV yang Anda masukkan <strong>tidak disimpan di server</strong> kami. Data hanya diproses saat Anda men-generate CV dan langsung dihapus setelah proses selesai. File PDF yang diupload untuk fitur Rebuild CV juga langsung dibuang setelah diekstrak teksnya.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-3">Penggunaan AI</h2>
            <p className="font-body text-muted leading-relaxed">Data CV Anda dikirim ke <strong>Google Gemini API</strong> untuk diproses oleh AI. Google memiliki kebijakan privasi tersendiri terkait data yang masuk ke API mereka. Kami menggunakan API ini secara transparan dan tidak menyimpan data yang dikirim atau diterima dari Gemini.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-3">Data Lokal</h2>
            <p className="font-body text-muted leading-relaxed">Data form sementara disimpan di browser Anda (sessionStorage) agar tidak hilang jika Anda merefresh halaman. Data ini otomatis terhapus saat Anda menutup tab browser.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-3">Kontak</h2>
            <p className="font-body text-muted leading-relaxed">Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami melalui email di <strong>privacy@payresume.app</strong>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
