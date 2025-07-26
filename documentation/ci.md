# 🚀 GitHub Actions - Deploy Frontend ke VPS via SSH

Workflow ini secara otomatis melakukan proses build, push, dan deploy Docker image frontend (`src/my-porto`) dan backend (`src/server`) ke VPS setiap kali ada perubahan pada branch `main`.

## 📦 Struktur Proyek

```
project-root/
├── src/
│   └── my-porto/      # Folder frontend
│   └── server/      # Folder server
├── .github/
│   └── workflows/
│       └── deploy-fe.yml  # File GitHub Actions ini
│       └── deploy-be.yml  # File GitHub Actions ini
```

## 🔁 Alur Workflow

Workflow ini berjalan otomatis setiap kali ada perubahan pada file dalam direktori `src/my-porto/` atau `src/server/` di branch `main`.

### Contoh Alur CI FE (BE sama saja)

### 1. Checkout Source Code

Menarik seluruh isi repository ke environment runner GitHub.

```yaml
- name: Checkout code
  uses: actions/checkout@v2
```

### 2. Login ke Docker Hub

Autentikasi ke Docker Hub menggunakan `secrets` yang telah dikonfigurasi sebelumnya.

```yaml
- name: Login to Docker Hub
  run: echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin
```

### 3. Build & Push Docker Image

Masuk ke folder `src/my-porto`, membangun image Docker, lalu mengirimnya ke Docker Hub (`fuadgrimaldi/porto-frontend:latest`).

```yaml
- name: Build & Push Docker image
  working-directory: ./src/my-porto
  run: |
    docker build -t fuadgrimaldi/porto-frontend:latest .
    docker push fuadgrimaldi/porto-frontend:latest
```

### 4. Deploy ke VPS via SSH

Mengakses VPS via SSH, menghentikan container lama, menghapus image lama, menarik image terbaru, dan menjalankan ulang container frontend. Diakhiri dengan me-reload nginx untuk memastikan perubahan diterapkan.

```yaml
- name: Deploy to VPS via SSH
  uses: appleboy/ssh-action@v1.0.3
  with:
    host: ${{ secrets.SSH_HOST }}
    username: ${{ secrets.SSH_USER }}
    key: ${{ secrets.SSH_PRIVATE_KEY }}
    script: |
      echo "🔁 Ganti ke direktori project..."
      cd ~/personal-app

      echo "🛑 Stop container FE..."
      sudo docker-compose stop fe || true
      sudo docker-compose rm -f fe || true

      echo "🧼 Hapus image lama..."
      sudo docker rmi fuadgrimaldi/porto-frontend:latest

      echo "📥 Pull image terbaru dari Docker Hub..."
      sudo docker pull fuadgrimaldi/porto-frontend:latest

      echo "🚀 Jalankan container FE..."
      sudo docker-compose up -d fe

      echo "✅ Reload nginx..."
      sudo nginx -t && sudo systemctl reload nginx
```

## 🔐 Secrets yang Dibutuhkan

Pastikan secret berikut sudah ditambahkan ke repo GitHub:

| Secret Name       | Keterangan                         |
| ----------------- | ---------------------------------- |
| `DOCKER_USERNAME` | Username Docker Hub                |
| `DOCKER_PASSWORD` | Password Docker Hub                |
| `SSH_HOST`        | IP address atau domain VPS         |
| `SSH_USER`        | Username SSH VPS                   |
| `SSH_PRIVATE_KEY` | Private key SSH (tanpa passphrase) |

## 📌 Catatan

- Pastikan server VPS memiliki `docker`, `docker-compose`, dan `nginx` yang sudah terinstal.
- Port dan konfigurasi nginx harus mengarah ke container FE dengan benar.
- Image lama akan dihapus secara otomatis agar tidak menumpuk di VPS.

## ✅ Hasil Akhir

Setiap push ke branch `main` (khusus di folder frontend) akan memicu deploy otomatis ke VPS dan membuat layanan frontend terbaru langsung aktif tanpa perlu proses manual lagi.

```
Frontend: fuadgrimaldi/porto-frontend:latest
```
