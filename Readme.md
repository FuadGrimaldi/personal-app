# 🌐 Web Showcase Portofolio

Ini adalah proyek web showcase untuk menampilkan portofolio pribadi/profesional, dibangun menggunakan stack modern dengan **Next.js** untuk frontend, **Express.js** untuk backend, dan **MySQL** sebagai database. Proyek ini juga telah didockerisasi dan menggunakan **GitHub Actions** untuk _CI/CD_.

---

## 🚀 Tech Stack

| Layer     | Technology     |
| --------- | -------------- |
| Frontend  | Next.js        |
| Backend   | Express.js     |
| Database  | MySQL          |
| CI/CD     | GitHub Actions |
| Container | Docker         |

---

## 📁 Project Structure

│
├── docker/volume/mysql
├── src/ # Express.js backend
│ ├── frontend/ # Next.js frontend
│ ├── Dockerfile
│ └── ...
│ ├── backend/ # Express.js backend
│ │ ├── Dockerfile
│ └── ...
├── docker-compose.yml # Docker orchestration
└── README.md
