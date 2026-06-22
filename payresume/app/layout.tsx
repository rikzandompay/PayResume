import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PayResume — AI Resume Builder & ATS Optimizer",
  description:
    "Buat CV profesional dalam 5 menit. Ditenagai AI, dioptimasi untuk lolos ATS. Gratis, tanpa akun.",
  keywords: [
    "resume builder",
    "CV maker",
    "ATS optimizer",
    "AI resume",
    "buat CV",
    "resume Indonesia",
  ],
  openGraph: {
    title: "PayResume — CV Profesional Dalam 5 Menit",
    description:
      "Buat CV dari nol atau optimalkan CV lama kamu agar lolos ATS — ditenagai AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
