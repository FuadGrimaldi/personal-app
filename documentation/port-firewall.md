## Hanya buka port 22 (ssh), 80 (HTTP), 443 (HTTPS)

Bisa dilakukan dengan

- untuk cek status

```bash
sudo ufw status
```

- untuk mengaktifkan

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

- cek lagi dan jika hasilnya seperti ini berarti berhasil

```bash
22 ALLOW
80 ALLOW
443 ALLOW
```

## Proxy

karena nginx saya berada dalam host bukan di dalam docker jadi untuk ports di docker-compose akan menggunakan localhost contohnya - "3000:3000" --> - "127.0.0.1:3000:3000".
