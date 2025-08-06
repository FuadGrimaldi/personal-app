# 🌐 Web Portofolio

Ini adalah proyek web showcase untuk menampilkan portofolio pribadi/profesional, dibangun menggunakan stack modern dengan **Next.js** untuk frontend, **Express.js** untuk backend, dan **MySQL** sebagai database. Proyek ini juga telah didockerisasi dan menggunakan **GitHub Actions** untuk _CI/CD_.

![Next.js](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

---

## 🚀 Fitur Utama

- **Frontend Responsif**: Dibangun dengan Next.js untuk pengalaman pengguna yang cepat dan SEO-friendly di semua perangkat.
- **Backend Kuat**: API RESTful yang andal menggunakan Express.js untuk mengelola data proyek, kontak, atau konten dinamis lainnya.
- **Database Relasional**: Menggunakan MySQL untuk penyimpanan data yang terstruktur dan persisten.
- **Lingkungan Terisolasi**: Sepenuhnya di-container-kan dengan Docker, memastikan konsistensi lingkungan dari pengembangan hingga produksi.
- **Otomatisasi CI/CD**: Alur kerja GitHub Actions terintegrasi untuk build, test, dan deployment otomatis pada backend (`ci-be.yml`) dan frontend (`ci-fe.yml`).

---

## 📁 Struktur Proyek

Berikut adalah gambaran umum struktur folder dan file penting dalam proyek ini:

```bash
├── .github/workflows/        # Konfigurasi GitHub Actions CI/CD
│   ├── ci-be.yml             # Alur kerja untuk backend
│   └── ci-fe.yml             # Alur kerja untuk frontend
│
├── .ssh/                     # Kunci SSH untuk deployment (jika diperlukan oleh CI/CD)
│   ├── id_rsa
│   └── id_rsa.pub
│
├── docker/volumes/mysql/     # Volume Docker untuk persistensi data MySQL
│
├── documentation/            # Dokumentasi tambahan proyek
│
├── src/                      # Folder kode sumber utama
│   ├── my-porto/             # Aplikasi Frontend (Next.js)
│   └── server/               # Aplikasi Backend (Express.js)
│
├── .dockerignore             # File yang diabaikan oleh Docker
├── .env                      # File variabel lingkungan (local)
├── .gitignore                # File yang diabaikan oleh Git
├── docker-compose-example.yml# Contoh konfigurasi Docker Compose
├── docker-compose.yml        # Konfigurasi utama Docker Compose
├── porto.sql                 # Skema awal dan data untuk database MySQL
└── Readme.md                 # Anda sedang membacanya

```

## Alur Kerja CI/CD

Proyek ini menggunakan GitHub Actions untuk otomatisasi.

.github/workflows/ci-fe.yml: Terpicu saat ada push ke branch utama, alur kerja ini akan membangun, menguji, dan mendeploy aplikasi frontend.

.github/workflows/ci-be.yml: Terpicu saat ada push ke branch utama, alur kerja ini akan membangun, menguji, dan mendeploy aplikasi backend.
