# How to Deploy Project to subdomain

### siapkan project termasuk dockerfile dan docker-compose projeknya

### install nginx. jika sudah ada maka tambahkan configurasi baru.

- Buat file konfigurasi baru:

  ```bash
  sudo nano /etc/nginx/sites-available/my-project-2
  ```

- Isi dengan konfigurasi berikut:

  ```bash
    server {
    server_name incube.fuadonetwo.my.id;

        location / {
            proxy_pass http://localhost:3001;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        location /api/auth/ {
            proxy_pass http://localhost:3001/api/auth/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        location /api/ {
            proxy_pass http://localhost:4001/api/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

    }
  ```

- Aktifkan konfigurasi:
  ```bash
  sudo ln -s /etc/nginx/sites-available/my-project-2 /etc/nginx/sites-enabled/
  sudo nginx -t
  sudo systemctl reload nginx
  ```

### Tambah record DNS

- Di panel domain, tambahkan A record:

```
Type: A
Name: incube
Value: IP VPS kamu
TTL: 3600
```

### Genereate SSL Certbot
