## Genereate SSL Certbot (Gratis)

- Masuk ke https://certbot.eff.org/
- Sesuaikan OS
  os = Linux (Snap)
  software = NGINX
- sudo snap install --classic certbot
- sudo ln -s /snap/bin/certbot /usr/bin/certbot
- sudo certbot --nginx
- jika semua domain akan memakai ssl, klik Enter, jika salah satu pilih berdasarkan number.
- Masukan email yang akan di daftarkan
- Selesai
