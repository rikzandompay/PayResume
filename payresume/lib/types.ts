// ============================================
// PayResume — TypeScript Interfaces
// ============================================

export interface KontakData {
  email: string;
  hp: string;
  linkedin?: string;
  github?: string;
  portofolio?: string;
  kota: string;
}

export interface PendidikanData {
  universitas: string;
  jurusan: string;
  jenjang: "SMA/SMK" | "D3" | "D4" | "S1" | "S2" | "S3" | string;
  ipk?: number | string;
  tahunMasuk: number | string;
  tahunLulus: number | string | "Sekarang";
  masihKuliah?: boolean;
}

export interface PengalamanData {
  tipe: "Magang" | "Pekerjaan" | "Organisasi" | "Volunteer" | "Freelance";
  namaOrg: string;
  posisi: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  deskripsi?: string;
  pencapaian?: string;
}

export interface SertifikasiData {
  nama: string;
  penerbit: string;
  tahun: number | string;
  url?: string;
}

export interface Step1Data {
  namaLengkap: string;
  email: string;
  nomorHp: string;
  alamat: string;
  kota: string;
  linkedin?: string;
  github?: string;
  portofolio?: string;
  ringkasanProfil?: string;
  aiRingkasan?: boolean;
}

export interface Step2Data {
  pendidikan: PendidikanData[];
}

export interface Step3Data {
  pengalaman: PengalamanData[];
}

export interface Step4Data {
  skills: string[];
  sertifikasi: SertifikasiData[];
}

export interface Step5Data {
  style: "ats" | "modern";
  language: "id" | "en";
}

export interface FormData {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data;
  step5: Step5Data;
}

export interface CVPengalaman {
  tipe: string;
  posisi: string;
  namaOrg: string;
  periode: string;
  deskripsi: string[];
}

export interface CVSertifikasi {
  nama: string;
  penerbit: string;
  tahun: string | number;
}

export interface CVPendidikan {
  universitas: string;
  jurusan: string;
  jenjang: string;
  ipk: string;
  tahunMasuk: string | number;
  tahunLulus: string | number;
}

export interface CVResult {
  namaLengkap: string;
  kontak: KontakData;
  ringkasanProfil: string;
  pendidikan: CVPendidikan[];
  pengalaman: CVPengalaman[];
  skillTeknis: string[];
  skillSoft: string[];
  sertifikasi: CVSertifikasi[];
  atsScore: number;
  keywordMatch: string[];
  missingKeywords: string[];
  saranPerbaikan: string[];
  // For rebuild flow
  originalAtsScore?: number;
  improvement?: number;
}

export interface GenerateCVRequest {
  formData: Omit<FormData, "step5">;
  style: "ats" | "modern";
  language: "id" | "en";
}

export interface RebuildCVRequest {
  pdf: File;
  jobDescription: string;
  style: "ats" | "modern";
}

export interface AIAssistRequest {
  posisi: string;
  namaOrg: string;
  tipe: string;
}

export interface AIAssistResponse {
  deskripsi: string;
}
