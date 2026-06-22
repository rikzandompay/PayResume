import { z } from "zod";

export const step1Schema = z.object({
  namaLengkap: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  nomorHp: z
    .string()
    .regex(
      /^(\+62|08)[0-9]{8,11}$/,
      "Format HP tidak valid. Contoh: 081234567890"
    ),
  alamat: z.string().min(5, "Alamat minimal 5 karakter").max(200, "Alamat maksimal 200 karakter"),
  kota: z.string().min(2, "Kota minimal 2 karakter"),
  linkedin: z.string().url("Format URL tidak valid").optional().or(z.literal("")),
  github: z.string().url("Format URL tidak valid").optional().or(z.literal("")),
  portofolio: z.string().url("Format URL tidak valid").optional().or(z.literal("")),
  ringkasanProfil: z.string().max(500, "Maksimal 500 karakter").optional().or(z.literal("")),
  aiRingkasan: z.boolean().optional(),
});

export const step2Schema = z.object({
  universitas: z.string().min(3, "Nama universitas minimal 3 karakter"),
  jurusan: z.string().min(3, "Nama jurusan minimal 3 karakter"),
  jenjang: z.enum(["S1", "S2", "S3", "D3", "D4"], "Pilih jenjang pendidikan"),
  ipk: z
    .union([z.number().min(0, "IPK minimal 0").max(4, "IPK maksimal 4"), z.nan(), z.undefined()])
    .optional(),
  tahunMasuk: z
    .number({ error: "Tahun masuk harus berupa angka" })
    .min(1990, "Tahun masuk minimal 1990")
    .max(new Date().getFullYear(), `Tahun masuk maksimal ${new Date().getFullYear()}`),
  tahunLulus: z
    .union([
      z.number().min(1990).max(new Date().getFullYear() + 10),
      z.literal("Sekarang"),
      z.undefined(),
    ])
    .optional(),
  masihKuliah: z.boolean().optional(),
});

export const pengalamanSchema = z.object({
  tipe: z.enum(["Magang", "Pekerjaan", "Organisasi", "Volunteer", "Freelance"], "Pilih tipe pengalaman"),
  namaOrg: z.string().min(2, "Nama organisasi minimal 2 karakter"),
  posisi: z.string().min(2, "Posisi minimal 2 karakter"),
  tanggalMulai: z.string().min(1, "Tanggal mulai wajib diisi"),
  tanggalSelesai: z.union([z.string().min(1), z.literal("Sekarang")]),
  deskripsi: z.string().max(800, "Maksimal 800 karakter").optional().or(z.literal("")),
  pencapaian: z.string().max(500, "Maksimal 500 karakter").optional().or(z.literal("")),
});

export const step3Schema = z.object({
  pengalaman: z.array(pengalamanSchema),
});

export const sertifikasiSchema = z.object({
  nama: z.string().min(3, "Nama sertifikat minimal 3 karakter"),
  penerbit: z.string().min(2, "Penerbit minimal 2 karakter"),
  tahun: z
    .number({ error: "Tahun harus berupa angka" })
    .min(2000, "Tahun minimal 2000")
    .max(new Date().getFullYear(), `Tahun maksimal ${new Date().getFullYear()}`),
  url: z.string().url("Format URL tidak valid").optional().or(z.literal("")),
});

export const step4Schema = z.object({
  skills: z.array(z.string()).max(20, "Maksimal 20 skill"),
  sertifikasi: z.array(sertifikasiSchema),
});

export const step5Schema = z.object({
  style: z.enum(["ats", "modern"]),
  language: z.enum(["id", "en"]),
});

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type Step3FormData = z.infer<typeof step3Schema>;
export type Step4FormData = z.infer<typeof step4Schema>;
export type Step5FormData = z.infer<typeof step5Schema>;
