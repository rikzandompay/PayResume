import { CVResult } from "@/lib/types";

export function generateATSTemplate(data: CVResult): string {
  const qrData = data.kontak.portofolio;
  const qrUrl = qrData ? `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(qrData)}` : null;

  const pendidikanHTML = data.pendidikan
    .map(
      (p) => `
    <div style="margin-bottom:10px;page-break-inside:avoid;break-inside:avoid;">
      <div style="font-weight:700;font-size:9.6pt;color:#111827;margin-bottom:2px;overflow-wrap:anywhere;">${p.universitas}</div>
      <div style="font-size:9pt;color:#374151;overflow-wrap:anywhere;">${p.jenjang} • ${p.jurusan}${p.ipk ? ` • IPK ${p.ipk}` : ""}</div>
    </div>
  `
    )
    .join("");

  const pengalamanHTML = data.pengalaman
    .map(
      (p) => `
    <div style="margin-bottom:13px;page-break-inside:avoid;break-inside:avoid;">
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:baseline;margin-bottom:2px;">
        <strong style="font-size:9.8pt;color:#111827;overflow-wrap:anywhere;">${p.posisi}</strong>
        <span style="font-size:8.8pt;color:#4b5563;white-space:nowrap;">${p.periode}</span>
      </div>
      <div style="color:#4b5563;margin-bottom:5px;font-size:9pt;text-transform:uppercase;letter-spacing:.2px;overflow-wrap:anywhere;">${p.namaOrg}${p.tipe ? ` • ${p.tipe}` : ""}</div>
      <p style="margin:0;font-size:9.1pt;color:#374151;line-height:1.45;text-align:left;overflow-wrap:anywhere;">
        ${p.deskripsi.join(" ")}
      </p>
    </div>
  `
    )
    .join("");

  const sertifikasiHTML = data.sertifikasi
    .map(
      (s) => `
    <div style="margin-bottom:10px;page-break-inside:avoid;break-inside:avoid;">
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:baseline;margin-bottom:2px;">
        <strong style="font-size:9.6pt;color:#111827;overflow-wrap:anywhere;">${s.nama}</strong>
        <span style="font-size:8.8pt;color:#4b5563;white-space:nowrap;">${s.tahun}</span>
      </div>
      <div style="font-size:9pt;color:#4b5563;overflow-wrap:anywhere;">${s.penerbit}</div>
    </div>
  `
    )
    .join("");

  const skillTeknis = data.skillTeknis && data.skillTeknis.length > 0 ? data.skillTeknis.join(", ") : "";
  const skillSoft = data.skillSoft && data.skillSoft.length > 0 ? data.skillSoft.join(", ") : "";

  return `
    <div style="font-family:Arial, Helvetica, sans-serif;font-size:9.4pt;color:#111827;padding:34px 38px;line-height:1.42;width:595px;max-width:595px;box-sizing:border-box;background:#fff;margin:0 auto;text-align:left;overflow:visible;overflow-wrap:anywhere;word-break:normal;">
      
      <!-- HEADER -->
      <div style="display:flex;justify-content:space-between;gap:18px;align-items:flex-start;margin-bottom:20px;min-width:0;">
        <div style="flex:1;min-width:0;padding-right:10px;">
          <h1 style="font-size:18pt;line-height:1.1;font-weight:800;margin:0 0 9px 0;text-transform:uppercase;color:#111827;letter-spacing:0.2px;overflow-wrap:anywhere;">
            ${data.namaLengkap}
          </h1>
          <div style="font-size:8.8pt;color:#374151;margin-bottom:12px;font-weight:500;line-height:1.45;overflow-wrap:anywhere;">
            ${data.kontak.kota ? `${data.kontak.kota} | ` : ""}${data.kontak.email} | ${data.kontak.hp}
            ${data.kontak.linkedin ? `<br/>${data.kontak.linkedin}` : ""}
            ${data.kontak.github ? ` | ${data.kontak.github}` : ""}
          </div>
          ${
            data.ringkasanProfil
              ? `
            <p style="margin:0;font-size:9pt;color:#4b5563;line-height:1.45;text-align:left;overflow-wrap:anywhere;">
              ${data.ringkasanProfil}
            </p>
          `
              : ""
          }
        </div>
        ${
          qrUrl
            ? `
        <div style="text-align:center;flex-shrink:0;width:72px;">
          <div style="font-size:7.5pt;color:#6b7280;margin-bottom:5px;">Scan Profile</div>
          <img src="${qrUrl}" alt="QR Code" style="width:72px;height:72px;display:block;margin:0 auto;" />
        </div>
        `
            : ""
        }
      </div>

      <!-- PENGALAMAN -->
      ${
        data.pengalaman.length > 0
          ? `
        <div style="margin-bottom:18px;page-break-inside:avoid;break-inside:avoid;">
          <h2 style="font-size:10.5pt;font-weight:800;color:#111827;border-bottom:1px solid #d1d5db;padding-bottom:5px;margin:0 0 12px 0;letter-spacing:.4px;text-transform:uppercase;">Pengalaman</h2>
          ${pengalamanHTML}
        </div>
      `
          : ""
      }

      <!-- PENDIDIKAN -->
      ${
        data.pendidikan.length > 0
          ? `
        <div style="margin-bottom:18px;page-break-inside:avoid;break-inside:avoid;">
          <h2 style="font-size:10.5pt;font-weight:800;color:#111827;border-bottom:1px solid #d1d5db;padding-bottom:5px;margin:0 0 12px 0;letter-spacing:.4px;text-transform:uppercase;">Pendidikan</h2>
          ${pendidikanHTML}
        </div>
      `
          : ""
      }

      <!-- LISENSI DAN SERTIFIKASI -->
      ${
        data.sertifikasi.length > 0
          ? `
        <div style="margin-bottom:18px;page-break-inside:avoid;break-inside:avoid;">
          <h2 style="font-size:10.5pt;font-weight:800;color:#111827;border-bottom:1px solid #d1d5db;padding-bottom:5px;margin:0 0 12px 0;letter-spacing:.4px;text-transform:uppercase;">Lisensi dan Sertifikasi</h2>
          ${sertifikasiHTML}
        </div>
      `
          : ""
      }

      <!-- KEAHLIAN -->
      ${
        (skillTeknis || skillSoft)
          ? `
        <div style="margin-bottom:18px;page-break-inside:avoid;break-inside:avoid;">
          <h2 style="font-size:10.5pt;font-weight:800;color:#111827;border-bottom:1px solid #d1d5db;padding-bottom:5px;margin:0 0 12px 0;letter-spacing:.4px;text-transform:uppercase;">Keahlian</h2>
          ${skillTeknis ? `<div style="margin-bottom:7px;font-size:9pt;color:#4b5563;overflow-wrap:anywhere;"><span style="color:#111827;font-weight:700;">Hard Skills:</span> ${skillTeknis}</div>` : ""}
          ${skillSoft ? `<div style="margin-bottom:7px;font-size:9pt;color:#4b5563;overflow-wrap:anywhere;"><span style="color:#111827;font-weight:700;">Soft Skills:</span> ${skillSoft}</div>` : ""}
        </div>
      `
          : ""
      }

    </div>
  `;
}

export function generateModernTemplate(data: CVResult): string {
  const qrData = data.kontak.portofolio;
  // Use a dark background QR code to match the dark header, or just standard
  const qrUrl = qrData ? `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(qrData)}` : null;

  const skillHTML = data.skillTeknis && data.skillTeknis.length > 0 ? data.skillTeknis.join(", ") : "";
  const softSkillHTML = data.skillSoft && data.skillSoft.length > 0 ? data.skillSoft.join(", ") : "";

  const sertifikasiHTML = data.sertifikasi
    .map(
      (s) =>
        `<div style="margin-bottom:10px;">
          <div style="font-weight:600;font-size:10.5pt;color:#0f172a;">${s.nama}</div>
          <div style="font-size:9.5pt;color:#64748b;">${s.penerbit} • ${s.tahun}</div>
        </div>`
    )
    .join("");

  const pendidikanHTML = data.pendidikan
    .map(
      (p) => `
    <div style="margin-bottom:14px;">
      <div style="font-weight:700;font-size:11pt;color:#0f172a;">${p.universitas}</div>
      <div style="font-size:10pt;color:#334155;margin-top:2px;">${p.jenjang} ${p.jurusan}</div>
      <div style="font-size:9.5pt;color:#64748b;margin-top:2px;">${p.tahunMasuk} - ${p.tahunLulus}${p.ipk ? ` • IPK: ${p.ipk}` : ""}</div>
    </div>
  `
    )
    .join("");

  const pengalamanHTML = data.pengalaman
    .map(
      (p) => `
    <div style="margin-bottom:15px;padding-left:12px;border-left:2px solid #0ea5e9;page-break-inside:avoid;break-inside:avoid;">
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:baseline;margin-bottom:2px;">
        <div style="font-weight:700;font-size:9.8pt;color:#111827;overflow-wrap:anywhere;">${p.posisi}</div>
        <div style="font-size:8.4pt;color:#64748b;font-weight:600;white-space:nowrap;">${p.periode}</div>
      </div>
      <div style="font-size:9pt;color:#0284c7;font-weight:700;margin-bottom:5px;overflow-wrap:anywhere;">${p.namaOrg}${p.tipe ? ` • ${p.tipe}` : ""}</div>
      <ul style="margin:5px 0 0 15px;padding:0;font-size:8.8pt;color:#334155;line-height:1.45;">
        ${p.deskripsi.map((d) => `<li style="margin-bottom:3px;overflow-wrap:anywhere;">${d}</li>`).join("")}
      </ul>
    </div>
  `
    )
    .join("");

  return `
    <div style="font-family:Arial, Helvetica, sans-serif;width:595px;max-width:595px;background:#fff;margin:0 auto;text-align:left;overflow:visible;overflow-wrap:anywhere;color:#111827;">
      
      <!-- TOP HEADER -->
      <div style="background:#111827;color:#f8fafc;padding:34px 38px;display:flex;justify-content:space-between;gap:18px;align-items:flex-start;min-width:0;">
        <div style="flex:1;min-width:0;padding-right:8px;">
          <h1 style="font-size:21pt;line-height:1.1;font-weight:800;margin:0 0 7px 0;letter-spacing:0.1px;color:#fff;overflow-wrap:anywhere;">${data.namaLengkap}</h1>
          ${data.pengalaman[0]?.posisi ? `<div style="font-size:10.2pt;color:#38bdf8;font-weight:700;margin-bottom:12px;text-transform:uppercase;letter-spacing:.8px;overflow-wrap:anywhere;">${data.pengalaman[0].posisi}</div>` : ""}
          <div style="font-size:8.4pt;color:#cbd5e1;line-height:1.55;overflow-wrap:anywhere;">
            <span style="display:inline-block;margin-right:9px;margin-bottom:3px;">📍 ${data.kontak.kota}</span>
            <span style="display:inline-block;margin-right:9px;margin-bottom:3px;">📧 ${data.kontak.email}</span>
            <span style="display:inline-block;margin-right:9px;margin-bottom:3px;">📱 ${data.kontak.hp}</span>
            <br/>
            ${data.kontak.linkedin ? `<span style="display:inline-block;margin-right:9px;margin-bottom:3px;max-width:100%;">🔗 ${data.kontak.linkedin}</span>` : ""}
            ${data.kontak.github ? `<span style="display:inline-block;margin-bottom:3px;max-width:100%;">💻 ${data.kontak.github}</span>` : ""}
          </div>
        </div>
        ${qrUrl ? `
        <div style="text-align:center;flex-shrink:0;background:#fff;padding:6px;border-radius:6px;width:74px;">
          <img src="${qrUrl}" alt="QR Code" style="width:62px;height:62px;display:block;" />
          <div style="font-size:6.8pt;color:#0f172a;margin-top:3px;font-weight:800;">SCAN</div>
        </div>
        ` : ""}
      </div>

      <!-- MAIN CONTENT -->
      <div style="padding:30px 38px;font-size:9pt;line-height:1.45;">
        
        ${data.ringkasanProfil ? `
          <div style="margin-bottom:22px;page-break-inside:avoid;break-inside:avoid;">
            <h2 style="font-size:10.4pt;font-weight:800;text-transform:uppercase;letter-spacing:.8px;color:#111827;border-bottom:1px solid #e5e7eb;padding-bottom:5px;margin:0 0 10px 0;">Profil Profesional</h2>
            <p style="font-size:9pt;line-height:1.45;color:#334155;margin:0;text-align:left;overflow-wrap:anywhere;">${data.ringkasanProfil}</p>
          </div>
        ` : ""}

        ${data.pengalaman.length > 0 ? `
          <div style="margin-bottom:24px;page-break-inside:avoid;break-inside:avoid;">
            <h2 style="font-size:10.4pt;font-weight:800;text-transform:uppercase;letter-spacing:.8px;color:#111827;border-bottom:1px solid #e5e7eb;padding-bottom:5px;margin:0 0 14px 0;">Pengalaman Kerja</h2>
            ${pengalamanHTML}
          </div>
        ` : ""}

        ${data.pendidikan.length > 0 ? `
          <div style="margin-bottom:22px;page-break-inside:avoid;break-inside:avoid;">
            <h2 style="font-size:10.4pt;font-weight:800;text-transform:uppercase;letter-spacing:.8px;color:#111827;border-bottom:1px solid #e5e7eb;padding-bottom:5px;margin:0 0 12px 0;">Pendidikan</h2>
            ${pendidikanHTML}
          </div>
        ` : ""}

        ${(skillHTML || softSkillHTML) ? `
          <div style="margin-bottom:22px;page-break-inside:avoid;break-inside:avoid;">
            <h2 style="font-size:10.4pt;font-weight:800;text-transform:uppercase;letter-spacing:.8px;color:#111827;border-bottom:1px solid #e5e7eb;padding-bottom:5px;margin:0 0 10px 0;">Keahlian</h2>
            ${skillHTML ? `<p style="font-size:8.9pt;line-height:1.45;color:#334155;margin:0 0 6px 0;overflow-wrap:anywhere;"><strong style="color:#111827;">Hard Skills:</strong> ${skillHTML}</p>` : ""}
            ${softSkillHTML ? `<p style="font-size:8.9pt;line-height:1.45;color:#334155;margin:0;overflow-wrap:anywhere;"><strong style="color:#111827;">Soft Skills:</strong> ${softSkillHTML}</p>` : ""}
          </div>
        ` : ""}
        
        ${data.sertifikasi.length > 0 ? `
          <div style="margin-bottom:22px;page-break-inside:avoid;break-inside:avoid;">
            <h2 style="font-size:10.4pt;font-weight:800;text-transform:uppercase;letter-spacing:.8px;color:#111827;border-bottom:1px solid #e5e7eb;padding-bottom:5px;margin:0 0 12px 0;">Sertifikasi</h2>
            ${sertifikasiHTML}
          </div>
        ` : ""}

      </div>
    </div>
  `;
}
