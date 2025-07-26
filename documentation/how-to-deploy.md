# 🚀 How to Deploy Project (Frontend + Backend + MySQL + phpMyAdmin)

Dokumen ini menjelaskan langkah-langkah untuk melakukan deployment proyek yang terdiri dari:

- **Frontend (Next.js)** — berada di `src/my-porto`
- **Backend (Laravel)** — berada di `src/server`
- **Database** — menggunakan MySQL + phpMyAdmin
- **Web Server** — menggunakan Nginx
- **Dockerized** — semua layanan menggunakan Docker dan Docker Compose

---

## 🧰 Persiapan VPS

### 1. Update & Install Dependencies

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install nginx git docker.io docker-compose -y

```

### 2. Buat Dockerfile & .dockerignore

#### Backend (`src/server`)

**Dockerfile**
**.dockerignore**

#### Frontend (`src/my-porto`)

**Dockerfile**
**.dockerignore**

### 3. Buat `docker-compose.yml` di root project

### Tambahkan file `.env`:

- **root:** `.env`
- **Backend:** `src/server/.env`
- **Frontend:** `src/my-porto/.env`

## 🚢 Jalankan Docker Compose

### 5. Build & Run

```bash
sudo git clone git@github.com:yourusername/yourproject.git my-project
cd my-project

sudo sudo nano .env
cd src/my-porto
sudo nano .env
cd ../..
cd src/server
sudo nano .env
sudo ../..

sudo docker-compose up -d --build
```

## 🌐 Konfigurasi Nginx

### 6. Setup Nginx untuk Next.js

- Buat file konfigurasi baru:
  ```bash
  sudo nano /etc/nginx/sites-available/my-project
  ```
- Isi dengan konfigurasi berikut:

  ```
  server {
      listen 80;
      server_name your_domain_or_ip;

      location / {
          proxy_pass http://localhost:3000;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
      }
  }
  ```

- Aktifkan konfigurasi:
  ```bash
  sudo ln -s /etc/nginx/sites-available/my-project /etc/nginx/sites-enabled/
  sudo nginx -t
  sudo systemctl reload nginx
  ```

---

## ✅ Deployment Selesai

Akses:

- Frontend: `http://your_domain_or_ip`
- Backend API: `http://your_domain_or_ip/api`
- phpMyAdmin: `http://your_domain_or_ip:8080`

```

```
