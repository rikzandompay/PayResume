# PRODUCT REQUIREMENTS DOCUMENT

## PayResume — AI Resume Builder & ATS Optimizer

**Version:** 1.1 MVP
**Status:** Draft
**Terakhir Diperbarui:** Juni 2025
**Author:** Product Team

---

## DAFTAR ISI

1. Overview Produk
2. Problem Statement & Validation
3. Product Goals & Success Metrics
4. Target Users & Persona
5. User Journey & Flow
6. Feature Specifications
7. AI Engine Specification
8. Non-Functional Requirements
9. Tech Stack & Architecture
10. Design System
11. Error Handling & Edge Cases
12. Security & Privacy
13. Deployment & Release Plan
14. Out of Scope
15. Glossary

---

## 1. PRODUCT OVERVIEW

### Nama Produk
**PayResume**

### Tagline
*"CV profesional dalam 5 menit — dibuat AI, dioptimasi untuk lolos ATS."*

### Deskripsi
PayResume adalah aplikasi web berbasis AI yang membantu pencari kerja Indonesia membuat CV profesional atau mengoptimalkan CV lama agar lolos sistem ATS (Applicant Tracking System) dan relevan dengan job description tertentu.

PayResume dirancang untuk dua segmen utama:

| Segmen | Target User | Kebutuhan Utama |
|---|---|---|
| Fresh Graduate | Mahasiswa & lulusan baru | Buat CV dari nol, format profesional |
| Professional | Karyawan aktif / jobseeker berpengalaman | Optimasi ATS, sesuaikan dengan JD spesifik |

### Nilai Utama (Core Value Proposition)
- **Cepat:** CV siap dalam < 5 menit
- **Cerdas:** AI yang memahami konteks lowongan kerja Indonesia
- **ATS-Ready:** Output teroptimasi untuk sistem perekrutan modern
- **Gratis & tanpa akun:** Tidak perlu registrasi untuk MVP

---

## 2. PROBLEM STATEMENT & VALIDATION

### Masalah yang Ditemukan

Pencari kerja di Indonesia menghadapi hambatan sistemik dalam proses melamar pekerjaan:

**Masalah 1 — Format CV yang tidak sesuai standar**
Mayoritas fresh graduate tidak tahu bahwa rekruter perusahaan besar menggunakan ATS yang menolak CV sebelum dibaca manusia. CV dengan tabel, kolom, dan grafik sering gagal diparsing ATS.

**Masalah 2 — CV tidak relevan dengan posisi yang dilamar**
Pencari kerja menggunakan satu CV untuk semua lowongan, tanpa menyesuaikan keyword dengan job description. Hal ini menurunkan ATS score secara signifikan.

**Masalah 3 — Tidak punya kemampuan desain**
Banyak jobseeker menghabiskan waktu berlebihan di Canva atau Word tanpa hasil yang profesional.

**Masalah 4 — Deskripsi pengalaman yang lemah**
Pencari kerja kesulitan mendeskripsikan pengalaman mereka dalam format STAR (Situation-Task-Action-Result) yang disukai rekruter.

### Hipotesis Solusi
Dengan memanfaatkan AI untuk:
1. Membuat struktur CV profesional dari input terstruktur
2. Menganalisis CV terhadap job description
3. Menyarankan keyword dan perbaikan bahasa secara otomatis

PayResume dapat membantu user meningkatkan peluang lolos ATS hingga 3x dibandingkan CV biasa.

---

## 3. PRODUCT GOALS & SUCCESS METRICS

### Goals MVP

| # | Goal | Indikator Keberhasilan |
|---|---|---|
| G1 | User bisa membuat CV profesional | CV ter-generate dalam < 5 menit dari form kosong |
| G2 | CV lolos ATS | ATS score ≥ 70 pada output default |
| G3 | Rebuild CV berfungsi optimal | Upload PDF → generate ulang → ATS score meningkat |
| G4 | PDF siap unduh | PDF A4 ter-download tanpa error |
| G5 | Performa stabil | Error rate < 5%, generate time < 10 detik |

### Key Metrics (KPI)

**Acquisition**
- Jumlah unique visitor per minggu
- Sumber traffic (SEO, sosmed, referral)

**Activation**
- % user yang memilih flow (Create CV vs Rebuild CV)
- % user yang menyelesaikan form multi-step
- % user yang men-generate CV

**Retention**
- % user yang kembali dalam 7 hari (tanpa login, diukur via localStorage/analytics)

**Value Delivery**
- % user yang berhasil download PDF
- Rata-rata ATS score output
- Waktu rata-rata dari landing → download PDF

**Error Tracking**
- % request AI yang gagal (timeout, API error)
- % upload PDF yang gagal parsing
- % user yang bounce di tengah form

---

## 4. TARGET USERS & PERSONA

### Persona 1 — "Dinda, Fresh Graduate"

**Demografi**
- Usia: 21–24 tahun
- Pendidikan: Mahasiswa tingkat akhir atau baru lulus
- Lokasi: Kota besar Indonesia (Jakarta, Bandung, Surabaya, Yogyakarta)
- Device: Smartphone (70%), Laptop (30%)

**Situasi**
Dinda baru wisuda dan hendak melamar 10+ posisi sekaligus. Ia belum pernah bekerja (atau hanya punya pengalaman magang satu kali). Ia tidak tahu struktur CV yang baik dan takut salah format.

**Kebutuhan**
- Panduan langkah demi langkah yang jelas
- Contoh atau placeholder untuk setiap field
- CV yang terlihat profesional meski minim pengalaman
- Download langsung tanpa ribet

**Pain Points**
- Bingung apa yang harus ditulis di bagian "pengalaman"
- Tidak tahu bedanya CV ATS dan CV biasa
- Takut salah format, overthinking layout

**Job-to-be-Done**
*"Saat saya ingin melamar pekerjaan pertama saya, bantu saya membuat CV yang terlihat profesional dan serius, sehingga saya percaya diri mengirimkan lamaran."*

---

### Persona 2 — "Rian, Mid-Level Professional"

**Demografi**
- Usia: 27–35 tahun
- Pendidikan: S1, sudah bekerja 3–7 tahun
- Posisi saat ini: Marketing / IT / Finance di perusahaan menengah
- Device: Laptop (80%), Smartphone (20%)

**Situasi**
Rian sudah punya CV tapi dibuat 3 tahun lalu dengan template Word. Ia melamar posisi baru di startup tech dan sadar CV-nya perlu disesuaikan dengan job description yang sangat spesifik.

**Kebutuhan**
- Upload CV lama dan "rebuild" langsung
- Melihat keyword apa yang hilang dari JD
- Output CV yang terasa modern dan relevan
- Bisa memilih gaya (ATS strict vs Modern Professional)

**Pain Points**
- Tidak punya waktu membuat CV dari nol lagi
- Ragu apakah CV-nya sudah ATS-friendly
- Tidak tahu keyword spesifik yang dicari perekrut

**Job-to-be-Done**
*"Saat saya hendak apply ke perusahaan impian, bantu saya menyesuaikan CV lama agar relevan dengan posisi itu, sehingga saya bisa melamar dengan percaya diri dan lolos screening awal."*

---

## 5. USER JOURNEY & FLOW

### Landing Page → Split Decision

```
User buka PayResume
        |
        v
    [Landing Page]
     Hero Section
        |
   _____|_____
   |         |
   v         v
[Buat CV   [Rebuild
  Baru]      CV]
```

---

### Flow A — Buat CV Baru (Fresh Graduate)

```
Landing Page
    |
    v
Step 1: Data Diri
(Nama, Email, HP, Alamat, LinkedIn, GitHub/Portfolio)
    |
    v
Step 2: Pendidikan
(Universitas, Jurusan, IPK, Tahun Masuk-Lulus)
    |
    v
Step 3: Pengalaman
(Magang / Organisasi / Volunteer — dinamis, bisa multiple entry)
    |
    v
Step 4: Skill & Sertifikasi
(Tag skill, nama sertifikat, penerbit, tahun)
    |
    v
Step 5: Opsional & Preferensi
(Pilih gaya CV, tambah ringkasan profil custom / biarkan AI buat)
    |
    v
[Generate CV dengan AI]
    |
    v
Halaman Result:
- Preview CV (A4)
- ATS Score Panel
- Saran perbaikan
    |
    v
[Download PDF]
```

**Catatan UX:**
- User bisa mundur ke step sebelumnya kapan saja
- Progress bar selalu tampil di atas
- Setiap step menyimpan data di state (tidak hilang jika user klik Back)
- Placeholder teks di setiap field memberi contoh konkret

---

### Flow B — Rebuild CV (Professional)

```
Landing Page
    |
    v
Upload CV (PDF, maks 5MB)
    |
    v
[Parsing PDF dengan AI]
    |
Berhasil? --[Tidak]--> Pesan error + saran (misal: "File terlindungi password")
    |
    v
Preview hasil parsing
(User bisa koreksi data yang salah terbaca)
    |
    v
Paste Job Description
(Textarea, maks 5000 karakter)
    |
    v
Pilih Output Style:
  [ATS Friendly] atau [Modern Professional]
    |
    v
[Rebuild CV dengan AI]
    |
    v
Halaman Result:
- Preview CV baru (A4)
- ATS Score (sebelum vs sesudah)
- Keyword Match Analysis
- Missing Keywords
- Saran perbaikan spesifik
    |
    v
[Download PDF]
```

---

### Halaman Result — State Machine

```
[Loading / Generating]
        |
   Berhasil? -[Tidak]-> Error State (dengan tombol Coba Lagi)
        |
        v
[Result Page — Sukses]
- Preview CV
- ATS Score
- Keyword Analysis
- Download PDF
- [Opsi: Edit & Generate Ulang]
```

---

## 6. FEATURE SPECIFICATIONS

### Feature 1 — Landing Page

**Tujuan:** Meyakinkan user untuk mencoba PayResume dan mengarahkan ke flow yang tepat.

**Komponen & Spesifikasi:**

| Komponen | Spesifikasi |
|---|---|
| Navbar | Logo, link ke About/FAQ, tombol CTA "Mulai Gratis" |
| Hero Section | Headline, subheadline, 2 tombol CTA (Buat CV Baru / Rebuild CV) |
| Social Proof | Jumlah CV dibuat (counter dinamis dari localStorage aggregate), rating bintang |
| How It Works | 3 langkah visual: Upload/Isi → AI Analisis → Download PDF |
| Perbandingan | Tabel: CV biasa vs CV PayResume (ATS score, waktu, kualitas) |
| FAQ | Accordion, minimal 6 pertanyaan umum |
| Footer | Link Privacy, Terms, About, Copyright |

**Acceptance Criteria:**
- [ ] Landing page load time < 2 detik (LCP)
- [ ] Tombol CTA utama terlihat jelas tanpa scroll (above the fold)
- [ ] FAQ bisa di-expand/collapse tanpa page reload
- [ ] Responsive di mobile (375px), tablet (768px), desktop (1280px)

---

### Feature 2 — Create CV (Multi-Step Form)

**Komponen per Step:**

#### Step 1 — Data Diri

| Field | Tipe | Validasi | Wajib? |
|---|---|---|---|
| Nama Lengkap | Text | Min 2 karakter, hanya huruf & spasi | Ya |
| Email | Email | Format email valid | Ya |
| Nomor HP | Tel | Format Indonesia (+62 / 08xx) | Ya |
| Alamat | Textarea | Max 200 karakter | Ya |
| Kota | Text | Min 2 karakter | Ya |
| LinkedIn URL | URL | Format linkedin.com/in/... | Tidak |
| GitHub / Portfolio URL | URL | Format URL valid | Tidak |
| Ringkasan Profil | Textarea | Max 500 karakter | Tidak (AI bisa generate) |

#### Step 2 — Pendidikan

| Field | Tipe | Validasi | Wajib? |
|---|---|---|---|
| Nama Universitas | Text | Min 3 karakter | Ya |
| Jurusan | Text | Min 3 karakter | Ya |
| Jenjang | Select | S1, S2, S3, D3, D4 | Ya |
| IPK | Number | 0.00 – 4.00 | Tidak |
| Tahun Masuk | Year | 1990 – tahun ini | Ya |
| Tahun Lulus | Year | ≥ Tahun Masuk | Tidak (bisa "Sekarang") |

#### Step 3 — Pengalaman (Dinamis)

Tipe pengalaman: Magang, Pekerjaan, Organisasi, Volunteer, Freelance

| Field | Tipe | Validasi | Wajib? |
|---|---|---|---|
| Tipe Pengalaman | Select | Pilihan di atas | Ya |
| Nama Perusahaan / Org | Text | Min 2 karakter | Ya |
| Posisi / Jabatan | Text | Min 2 karakter | Ya |
| Tanggal Mulai | Month/Year | Valid date | Ya |
| Tanggal Selesai | Month/Year | ≥ Mulai, atau "Sekarang" | Ya |
| Deskripsi Tugas | Textarea | Max 800 karakter | Tidak (AI enhance) |
| Pencapaian Utama | Textarea | Max 500 karakter, format bullet | Tidak |

**Catatan:** User bisa tambah multiple entry. Minimal 0 entry (untuk fresh graduate murni).

**AI Assist:** Tombol "Bantu AI Tulis" di field Deskripsi — AI akan generate deskripsi berdasarkan posisi + nama perusahaan.

#### Step 4 — Skill & Sertifikasi

**Skill:**
- Input tipe tag (ketik → Enter untuk tambah)
- Autocomplete dari daftar skill populer (hardcoded: Python, JavaScript, SQL, Excel, dll.)
- Max 20 skill

**Sertifikasi:**

| Field | Tipe | Validasi | Wajib? |
|---|---|---|---|
| Nama Sertifikat | Text | Min 3 karakter | Ya |
| Penerbit | Text | Min 2 karakter | Ya |
| Tahun | Year | 2000 – tahun ini | Ya |
| URL Sertifikat | URL | Format URL valid | Tidak |

#### Step 5 — Preferensi Output

| Opsi | Pilihan |
|---|---|
| Gaya CV | ATS Friendly / Modern Professional |
| Bahasa CV | Bahasa Indonesia / English |
| Tambahkan Foto? | Ya / Tidak (default: Tidak, karena ATS) |

**Acceptance Criteria — Create CV:**
- [ ] Validasi real-time (Zod + React Hook Form) sebelum lanjut ke step berikutnya
- [ ] State tersimpan jika user navigasi antar step
- [ ] Error message bahasa Indonesia yang deskriptif ("Nomor HP tidak valid. Contoh: 081234567890")
- [ ] Placeholder contoh ada di setiap field
- [ ] Tombol "Tambah Pengalaman" di Step 3 berfungsi (dynamic field array)
- [ ] Progress indicator menunjukkan step aktif dari 5 total step

---

### Feature 3 — Rebuild CV

#### Upload PDF

| Spesifikasi | Detail |
|---|---|
| Format yang diterima | PDF saja |
| Ukuran maksimal | 5 MB |
| Cara upload | Drag & drop + tombol "Pilih File" |
| Feedback loading | Spinner + teks "Membaca CV Anda..." |
| Error handling | File bukan PDF, ukuran > 5MB, PDF terenkripsi |

#### Preview Hasil Parsing

Setelah PDF berhasil di-parse, user melihat data terstruktur yang diekstrak:
- Nama, Email, HP
- Riwayat Pendidikan
- Pengalaman Kerja
- Skill

User bisa **mengedit manual** data yang salah terbaca sebelum lanjut.

#### Input Job Description

| Spesifikasi | Detail |
|---|---|
| Tipe input | Textarea |
| Batas karakter | Minimum 100 karakter, maksimum 5000 karakter |
| Placeholder | "Paste deskripsi pekerjaan dari lowongan yang ingin kamu lamar..." |
| Karakter counter | Tampil real-time |

#### Pilih Gaya Output

| Gaya | Deskripsi | Best For |
|---|---|---|
| ATS Friendly | Layout 1 kolom, tanpa grafik/ikon, font standar, heading jelas | Perusahaan besar, BUMN, korporat |
| Modern Professional | Layout clean 2 kolom, aksen warna, visual lebih menarik | Startup, agency kreatif, tech company |

**Acceptance Criteria — Rebuild CV:**
- [ ] File yang bukan PDF ditolak dengan pesan error yang jelas
- [ ] File > 5MB ditolak sebelum upload dimulai
- [ ] Preview parsing tampil dalam < 5 detik
- [ ] User bisa edit hasil parsing sebelum generate
- [ ] Job Description textarea menghitung karakter secara real-time
- [ ] Tombol Rebuild dinonaktifkan jika JD < 100 karakter

---

### Feature 4 — AI Resume Generator

**Input yang diterima AI:**
- Data form terstruktur (JSON) ATAU teks CV hasil parsing PDF
- Job description (teks)
- Pilihan gaya output (ATS / Modern)
- Bahasa output (ID / EN)

**Prompt Engineering Guidelines:**

AI diminta menghasilkan output dalam format JSON terstruktur dengan keys berikut:

```json
{
  "nama": "",
  "kontak": { "email": "", "hp": "", "linkedin": "", "github": "" },
  "ringkasan_profil": "",
  "pendidikan": [...],
  "pengalaman": [
    {
      "posisi": "",
      "perusahaan": "",
      "periode": "",
      "deskripsi": ["bullet 1", "bullet 2", "bullet 3"]
    }
  ],
  "skill": { "teknis": [...], "soft_skill": [...] },
  "sertifikasi": [...],
  "ats_score": 0,
  "keyword_match": [...],
  "missing_keywords": [...],
  "saran_perbaikan": [...]
}
```

**Behavior AI:**
- Deskripsi pengalaman ditulis dalam format STAR (Situation-Task-Action-Result) yang ringkas
- Menggunakan action verb kuat di awal setiap bullet (Mengembangkan, Memimpin, Mengoptimalkan, Meningkatkan)
- Keyword dari JD dimasukkan secara natural ke dalam deskripsi dan ringkasan profil
- Tidak mengarang fakta — hanya merephrasing dan mengoptimalkan data yang ada
- Bahasa konsisten (full Indonesia atau full English, tidak campur)

**Acceptance Criteria:**
- [ ] AI response diterima dalam < 10 detik (p95)
- [ ] Output JSON valid dan bisa di-parse tanpa error
- [ ] Ringkasan profil ≥ 3 kalimat
- [ ] Setiap pengalaman kerja punya minimal 2 bullet deskripsi
- [ ] ATS score antara 0–100 (integer)
- [ ] Missing keywords berupa array (boleh kosong jika sudah optimal)

---

### Feature 5 — ATS Analysis Panel

**Komponen yang ditampilkan:**

| Komponen | Deskripsi |
|---|---|
| ATS Score | Angka 0–100 dengan ring/gauge visual, label (Rendah/Sedang/Baik/Sangat Baik) |
| Keyword Match | List keyword dari JD yang berhasil ditemukan di CV |
| Missing Keywords | List keyword penting yang belum ada di CV |
| Improvement Suggestions | Maksimal 5 saran spesifik dengan ikon prioritas |
| Before/After Score | Khusus Rebuild CV: tampilkan skor CV lama vs CV baru |

**Skala ATS Score:**

| Range | Label | Warna |
|---|---|---|
| 0–40 | Perlu Perbaikan Besar | Merah |
| 41–60 | Cukup | Kuning |
| 61–80 | Baik | Hijau Muda |
| 81–100 | Sangat Baik | Hijau Tua |

**Acceptance Criteria:**
- [ ] ATS Score tampil dengan visualisasi yang jelas
- [ ] Keyword match ditampilkan sebagai badge/chip (bukan plain text)
- [ ] Missing keywords bisa di-klik → langsung highlight area terkait di preview CV
- [ ] Saran perbaikan ditulis dalam bahasa yang mudah dipahami, bukan teknikal
- [ ] Panel ATS tidak menggeser atau menutupi preview CV di desktop

---

### Feature 6 — Preview & Download CV

**Preview CV:**

| Spesifikasi | Detail |
|---|---|
| Ukuran tampilan | A4 (210×297mm), scale sesuai viewport |
| Rendering | HTML/CSS dirender di dalam div → screenshot PDF |
| Scroll | Preview bisa di-scroll jika lebih dari 1 halaman |
| Template ATS | 1 kolom, font Arial/Calibri-like, heading uppercase bold |
| Template Modern | 2 kolom, sidebar warna, foto opsional |
| Real-time | Tidak real-time di MVP (generate sekali saat form submit) |

**Download PDF:**

| Spesifikasi | Detail |
|---|---|
| Library | html2pdf.js |
| Format | PDF A4, orientasi Portrait |
| Kualitas | Minimum 150dpi |
| Nama file | `[nama]-resume-payresume.pdf` (lowercase, spasi → dash) |
| Tombol | "Download PDF" — loading state saat generate |

**Copy Text:**
- Tombol "Salin Teks CV" → menyalin plain text seluruh CV ke clipboard
- Berguna untuk paste ke form lamar kerja online yang butuh plain text

**Acceptance Criteria:**
- [ ] PDF ter-download dalam < 5 detik setelah tombol diklik
- [ ] PDF tidak terpotong / overflow di halaman
- [ ] Nama file sesuai format `[nama]-resume-payresume.pdf`
- [ ] Copy text berfungsi dan menampilkan notifikasi "Tersalin!" setelah berhasil
- [ ] Preview tampil dengan benar di Chrome, Firefox, Safari

---

## 7. AI ENGINE SPECIFICATION

### Model
Google Gemini 1.5 Flash (via API)

### Alasan Pemilihan
- Cost-effective untuk MVP
- Context window besar (cocok untuk CV panjang + JD panjang)
- Response time cepat

### Endpoint yang Digunakan
- Generate CV dari form data → 1 API call
- Rebuild CV dari PDF → 1 API call (PDF parsed dulu, baru generate)
- AI Assist "Bantu Tulis" di Step 3 → 1 API call per klik

### Rate Limiting & Error Handling

| Kondisi | Handling |
|---|---|
| API timeout (> 15 detik) | Tampil pesan error + tombol "Coba Lagi" |
| API rate limit | Antrian dengan estimasi waktu tunggu |
| Response tidak valid JSON | Retry otomatis 1x, jika gagal tampil error |
| Konten tidak sesuai (safety filter) | Pesan spesifik + saran manual |

### Prompt Versioning
Semua prompt disimpan dalam file terpisah (`/prompts/generate-cv.txt`, dll.) untuk memudahkan iterasi tanpa deploy ulang komponen.

---

## 8. NON-FUNCTIONAL REQUIREMENTS

### Performa

| Metrik | Target |
|---|---|
| First Contentful Paint (FCP) | < 1.5 detik |
| Largest Contentful Paint (LCP) | < 2.5 detik |
| Time to Interactive (TTI) | < 3 detik |
| AI Generate Time (p50) | < 7 detik |
| AI Generate Time (p95) | < 15 detik |
| PDF Download Time | < 5 detik |

### Responsiveness

| Breakpoint | Perilaku |
|---|---|
| Mobile (< 640px) | Single column, tombol full-width, form full-width |
| Tablet (640–1024px) | 2 kolom untuk form, preview di bawah |
| Desktop (> 1024px) | Form + preview side-by-side di result page |

### Aksesibilitas (WCAG 2.1 AA)

- Keyboard navigasi penuh (tab order, focus visible)
- Semua gambar punya alt text
- Kontras warna minimum 4.5:1
- Error message dikaitkan ke field via `aria-describedby`
- Loading state diumumkan via `aria-live`

### Browser Support

| Browser | Versi Minimum |
|---|---|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Samsung Internet | 14+ |

### SEO (Landing Page)
- Meta title dan description optimal
- Open Graph tags untuk share sosmed
- Schema.org markup untuk Web Application
- Sitemap.xml dan robots.txt

---

## 9. TECH STACK & ARCHITECTURE

### Frontend
```
Next.js 15 (App Router)
Tailwind CSS
shadcn/ui
React Hook Form + Zod (validasi)
Lucide React (ikon)
```

### AI & Parsing
```
Google Gemini 1.5 Flash API
pdf-parse (ekstraksi teks PDF di server-side)
```

### PDF Generation
```
html2pdf.js (client-side PDF generation)
```

### Deployment
```
Vercel (hosting + serverless functions)
```

### State Management
```
React useState / useReducer (lokal, no Redux)
localStorage (simpan progress form sementara)
```

### Arsitektur Alur Data

```
[Client Browser]
     |
     | (Form data / PDF file)
     v
[Next.js API Route: /api/generate-cv]
     |
     | (Structured prompt)
     v
[Google Gemini API]
     |
     | (JSON response)
     v
[Next.js API Route: parse & validate response]
     |
     | (Clean JSON)
     v
[Client: Render preview + ATS panel + PDF]
```

**Catatan:** PDF parsing (`pdf-parse`) hanya berjalan di server-side (API Route) karena tidak kompatibel di browser.

---

## 10. DESIGN SYSTEM

### Style: Neobrutalism

Neobrutalism dipilih untuk mencerminkan kepribadian PayResume yang bold, jujur, dan tidak berpretensi — mirip dengan kesan CV yang baik: langsung ke intinya.

### Prinsip Visual
- Border tebal: `4px solid #000000`
- Box shadow kasar: `4px 4px 0px #000000`
- Warna kontras tinggi, tidak ada gradien
- Typography bold dan tegas
- Corner radius minimal (0–4px)

### Color Palette

| Token | Hex | Penggunaan |
|---|---|---|
| `--color-primary` | `#FFD93D` | CTA utama, highlight |
| `--color-secondary` | `#4D96FF` | Informasi, link, ATS metric |
| `--color-success` | `#6BCB77` | ATS score tinggi, success state |
| `--color-danger` | `#FF6B6B` | Error, ATS score rendah, warning |
| `--color-black` | `#000000` | Border, teks, shadow |
| `--color-white` | `#FFFFFF` | Background card |
| `--color-background` | `#FFF8E7` | Background page |
| `--color-text` | `#1A1A1A` | Body text |
| `--color-muted` | `#666666` | Placeholder, label sekunder |

### Typography

| Peran | Font | Weight | Size |
|---|---|---|---|
| Heading H1 | Space Grotesk | 800 | 3rem |
| Heading H2 | Space Grotesk | 700 | 2rem |
| Heading H3 | Space Grotesk | 600 | 1.5rem |
| Body | Inter | 400 | 1rem |
| Label | Inter | 500 | 0.875rem |
| Button | Space Grotesk | 700 | 1rem |
| Code/mono | JetBrains Mono | 400 | 0.875rem |

### Komponen UI Kunci

**Button Primary**
```css
background: #FFD93D;
border: 4px solid #000;
box-shadow: 4px 4px 0 #000;
color: #000;
font-weight: 700;
transition: transform 0.1s, box-shadow 0.1s;
/* Hover: transform: translate(2px, 2px); box-shadow: 2px 2px 0 #000; */
```

**Button Secondary**
```css
background: #fff;
border: 4px solid #000;
box-shadow: 4px 4px 0 #000;
color: #000;
```

**Card**
```css
background: #ffffff;
border: 4px solid #000;
box-shadow: 6px 6px 0 #000;
border-radius: 4px;
padding: 24px;
```

**Input Field**
```css
border: 3px solid #000;
border-radius: 4px;
padding: 12px 16px;
font-size: 1rem;
/* Focus: box-shadow: 4px 4px 0 #FFD93D; */
```

**ATS Score Badge**

| Score | Background | Border | Text |
|---|---|---|---|
| 0–40 | `#FFEBEB` | `#FF6B6B` | "Perlu Perbaikan" |
| 41–60 | `#FFF8D6` | `#FFD93D` | "Cukup" |
| 61–80 | `#EAFBEC` | `#6BCB77` | "Baik" |
| 81–100 | `#D4F5D4` | `#2E9E2E` | "Sangat Baik" |

---

## 11. ERROR HANDLING & EDGE CASES

### Form Validation Errors

| Kondisi | Pesan |
|---|---|
| Field wajib kosong | "Field ini wajib diisi" |
| Email tidak valid | "Masukkan format email yang benar. Contoh: nama@email.com" |
| Nomor HP tidak valid | "Masukkan nomor HP Indonesia. Contoh: 081234567890" |
| IPK di luar range | "IPK harus antara 0.00 dan 4.00" |
| Tahun lulus < tahun masuk | "Tahun lulus tidak bisa lebih awal dari tahun masuk" |
| Terlalu banyak karakter | "Maksimal [X] karakter (sekarang [Y])" |

### Upload Errors

| Kondisi | Pesan |
|---|---|
| File bukan PDF | "Hanya file PDF yang diterima. Silakan upload ulang." |
| File > 5MB | "Ukuran file terlalu besar. Maksimal 5MB." |
| PDF terproteksi password | "PDF ini dilindungi password dan tidak bisa dibaca. Coba hapus password dulu." |
| PDF tidak mengandung teks (gambar scan) | "CV ini sepertinya hasil scan dan tidak mengandung teks yang bisa dibaca. Coba gunakan CV versi digital." |

### AI Generation Errors

| Kondisi | Pesan | Aksi |
|---|---|---|
| Timeout > 15 detik | "Pembuatan CV memakan waktu lebih lama dari biasanya. Coba lagi?" | Tombol "Coba Lagi" |
| API error / server down | "Layanan AI sedang sibuk. Silakan coba beberapa saat lagi." | Tombol "Coba Lagi" + link ke status page |
| Response tidak valid | "Terjadi kesalahan teknis. Kami sedang memperbaikinya." | Tombol "Laporkan Masalah" |

### PDF Download Errors

| Kondisi | Pesan | Aksi |
|---|---|---|
| Download gagal | "Gagal membuat PDF. Coba refresh halaman dan generate ulang." | Tombol "Refresh" |
| Popup blocker aktif | "Sepertinya browser Anda memblokir download. Izinkan popup untuk melanjutkan." | Link panduan izinkan popup |

### Edge Cases Khusus

| Kasus | Handling |
|---|---|
| User belum isi pengalaman sama sekali (fresh grad murni) | AI generate CV tetap berjalan, bagian pengalaman diisi dengan "Belum Ada" atau skip section |
| JD sangat pendek (< 100 karakter) | Tombol "Rebuild" dinonaktifkan + pesan hint |
| JD sangat panjang (> 5000 karakter) | Character count merah + truncate dengan warning |
| Koneksi internet putus saat generate | Error state dengan pesan "Koneksi terputus" + tombol coba lagi |
| User klik generate berkali-kali | Tombol disabled saat loading, hanya 1 request yang dikirim |

---

## 12. SECURITY & PRIVACY

### Data Handling

Karena MVP tidak menggunakan database atau akun pengguna:
- Data form tersimpan hanya di **client-side** (React state + localStorage sementara)
- Data dikirim ke server **hanya saat generate** (tidak disimpan permanen)
- PDF yang diupload diproses di server-side dan **langsung dibuang** setelah parsing
- Tidak ada logging user data di server

### API Key Security
- Google Gemini API key **hanya** di server-side (Next.js API Routes / environment variable)
- Tidak pernah terekspos ke client/browser
- `.env.local` untuk development, Vercel Environment Variables untuk production

### Input Sanitization
- Semua input dari user di-sanitize sebelum dikirim ke AI prompt
- Karakter khusus yang bisa merusak prompt diescaping
- File upload divalidasi MIME type dan ukuran di server-side (bukan hanya client-side)

### Privacy Policy
- Halaman `/privacy` menjelaskan secara jelas data apa yang dikumpulkan (analytics saja)
- Tidak ada data personal yang disimpan di server
- Compliance dengan UU PDP Indonesia (Undang-Undang Perlindungan Data Pribadi)

---

## 13. PAGE STRUCTURE & ROUTING

| Route | Halaman | Deskripsi |
|---|---|---|
| `/` | Landing Page | Halaman utama dengan 2 CTA |
| `/create-cv` | Buat CV Baru | Multi-step form (Step 1–5) |
| `/rebuild-cv` | Rebuild CV | Upload + JD + pilih style |
| `/result` | Hasil CV | Preview + ATS score + download |
| `/about` | Tentang PayResume | Info produk & team |
| `/privacy` | Kebijakan Privasi | Legal page |
| `/terms` | Syarat & Ketentuan | Legal page |

**API Routes (Next.js):**

| Endpoint | Method | Fungsi |
|---|---|---|
| `/api/generate-cv` | POST | Generate CV dari form data |
| `/api/rebuild-cv` | POST | Upload PDF + generate ulang CV |
| `/api/parse-pdf` | POST | Extract teks dari PDF (internal) |
| `/api/ai-assist` | POST | AI assist untuk field deskripsi pengalaman |

---

## 14. DEPLOYMENT & RELEASE PLAN

### Environment

| Environment | URL | Tujuan |
|---|---|---|
| Development | localhost:3000 | Development lokal |
| Staging | staging.payresume.app | Testing & QA |
| Production | payresume.app | Live |

### Release Criteria MVP

Sebelum launch production, semua checklist berikut harus terpenuhi:

**Functional**
- [ ] Flow A (Create CV) berjalan end-to-end tanpa error
- [ ] Flow B (Rebuild CV) berjalan end-to-end tanpa error
- [ ] PDF ter-download dengan benar (test di Chrome, Firefox, Safari)
- [ ] ATS score tampil
- [ ] Semua error state memiliki pesan yang informatif

**Non-Functional**
- [ ] LCP < 2.5 detik (diukur via Lighthouse)
- [ ] Mobile responsive (375px, 768px)
- [ ] Tidak ada console error di production
- [ ] API key tidak terekspos di client

**Content**
- [ ] FAQ terisi minimal 6 pertanyaan
- [ ] Halaman Privacy Policy selesai
- [ ] Halaman Terms of Service selesai

---

## 15. OUT OF SCOPE (MVP)

Fitur berikut **tidak** termasuk dalam MVP dan akan dipertimbangkan di versi berikutnya:

| Fitur | Alasan Ditunda |
|---|---|
| Login / Register | Menambah friction di MVP; fokus pada value delivery cepat |
| Database & riwayat CV | Bergantung pada sistem auth |
| Subscription & payment | Post-validation monetisasi |
| Cover Letter Generator | Feature tambahan, bukan inti |
| Multi-language UI | Fokus pasar Indonesia dulu |
| Admin dashboard | Tidak dibutuhkan di MVP |
| CV template tambahan (> 2) | Cukup 2 style untuk validasi |
| Export ke Word (.docx) | PDF sudah cukup untuk MVP |
| Share CV via link | Perlu storage, post-MVP |
| AI interview preparation | Feature terpisah, roadmap v2 |

---

## 16. GLOSSARY

| Term | Definisi |
|---|---|
| ATS | Applicant Tracking System — software yang digunakan perusahaan untuk mengelola dan menyaring lamaran kerja secara otomatis |
| ATS Score | Skor 0–100 yang mengindikasikan seberapa baik sebuah CV dapat dibaca dan diproses oleh ATS |
| JD / Job Description | Deskripsi pekerjaan yang mencantumkan kualifikasi, tanggung jawab, dan keyword posisi yang dilamar |
| STAR Format | Situation-Task-Action-Result — format penulisan pengalaman yang diterima luas oleh rekruter |
| pdf-parse | Library Node.js untuk mengekstrak teks dari file PDF di server-side |
| html2pdf.js | Library JavaScript untuk mengonversi HTML/CSS menjadi file PDF di sisi klien |
| Fresh Graduate | Lulusan baru yang belum memiliki pengalaman kerja penuh waktu |
| Keyword Match | Kata kunci dari job description yang berhasil ditemukan di CV |
| Neobrutalism | Gaya desain UI yang menggunakan border tebal, shadow kasar, warna kontras, tanpa gradien |

---

*Dokumen ini adalah living document. Setiap perubahan harus didiskusikan bersama tim dan dicatat dalam version history.*

**Version History:**

| Versi | Tanggal | Perubahan |
|---|---|---|
| 1.0 | Mei 2025 | Draft awal |
| 1.1 | Juni 2025 | Penambahan acceptance criteria, error handling, security, API routes, deployment plan |