import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-4 border-black bg-black text-white mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Logo & Tagline */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-blue border-2 border-white flex items-center justify-center font-display font-bold text-white text-sm">
                P
              </div>
              <span className="font-display font-bold text-lg">PAYRESUME</span>
            </div>
            <p className="text-white/60 text-sm max-w-xs font-body">
              CV profesional dalam 5 menit — dibuat AI, dioptimasi untuk lolos ATS.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-10">
            <div>
              <h4 className="font-display font-bold text-yellow mb-3 text-sm uppercase tracking-wider">
                Produk
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <Link href="/create-cv" className="hover:text-yellow transition-colors">
                    Buat CV Baru
                  </Link>
                </li>
                <li>
                  <Link href="/rebuild-cv" className="hover:text-yellow transition-colors">
                    Rebuild CV
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-yellow mb-3 text-sm uppercase tracking-wider">
                Info
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <Link href="/about" className="hover:text-yellow transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-yellow transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-yellow transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/20 text-center text-sm text-white/50">
          © 2025 PayResume — Built with AI, Love &amp; Sharp Corners.
        </div>
      </div>
    </footer>
  );
}
