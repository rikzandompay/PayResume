export const metadata = {
  title: "Syarat & Ketentuan — PayResume",
  description: "Syarat dan ketentuan penggunaan layanan PayResume AI Resume Builder.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="brutal-badge bg-yellow mb-4">LEGAL</div>
        <h1 className="font-display font-bold text-4xl mb-6">Syarat & Ketentuan</h1>
        <p className="text-muted font-body text-sm mb-8">Terakhir diperbarui: Juni 2025</p>

        <div className="brutal-card space-y-6">
          <section>
            <h2 className="font-display font-bold text-xl mb-3">Layanan</h2>
            <p className="font-body text-muted leading-relaxed">PayResume adalah layanan pembuat CV berbasis AI yang diberikan secara &quot;as-is&quot; tanpa jaminan apapun. Kami berusaha memberikan layanan terbaik, namun tidak menjamin ketersediaan layanan 24/7 atau akurasi 100% dari output AI.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-3">Tidak Ada Jaminan Rekrutmen</h2>
            <p className="font-body text-muted leading-relaxed">PayResume <strong>tidak menjamin</strong> bahwa CV yang dihasilkan akan membuat Anda lolos seleksi rekrutmen. ATS Score yang ditampilkan adalah estimasi berdasarkan analisis AI dan bukan merupakan skor resmi dari sistem ATS manapun.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-3">Tanggung Jawab Pengguna</h2>
            <p className="font-body text-muted leading-relaxed">Pengguna bertanggung jawab penuh atas keakuratan data yang dimasukkan ke dalam CV. PayResume tidak bertanggung jawab atas informasi palsu atau menyesatkan yang dimasukkan oleh pengguna.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-3">Penggunaan yang Dilarang</h2>
            <ul className="font-body text-muted space-y-2 list-disc list-inside">
              <li>Menggunakan layanan untuk tujuan penipuan atau ilegal</li>
              <li>Mengupload file berbahaya atau malware</li>
              <li>Melakukan abuse terhadap API (spam request berlebihan)</li>
              <li>Menggunakan output untuk menyesatkan perekrut</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-3">Perubahan Ketentuan</h2>
            <p className="font-body text-muted leading-relaxed">Kami berhak mengubah syarat dan ketentuan ini kapan saja. Perubahan akan diumumkan di halaman ini dengan memperbarui tanggal &quot;Terakhir diperbarui&quot;.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-3">Kontak</h2>
            <p className="font-body text-muted leading-relaxed">Untuk pertanyaan terkait syarat dan ketentuan ini, hubungi kami di <strong>legal@payresume.app</strong>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
