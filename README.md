# Portal Pendaftaran Mahasiswa Sederhana

Ini adalah proyek aplikasi web full-stack sederhana yang dibangun untuk mensimulasikan proses pendaftaran mahasiswa baru. Proyek ini menampilkan halaman pendaftaran dengan desain yang terinspirasi dari gaya retro-modern, terhubung ke backend Node.js yang aman dan database MySQL untuk menyimpan data.

## Link Deploy frontend: https://naufalarifin565.github.io/Pendaftaran-Mahasiswa/

## Teknologi yang Digunakan
* **Frontend**:
    * HTML5
    * CSS3
    * Vanilla JavaScript (untuk `fetch` API)
* **Backend**:
    * Node.js
    * Express.js
* **Database**:
    * MySQL
* **Paket Node.js Utama**:
    * `express`: Framework untuk server
    * `mysql2`: Driver untuk menghubungkan Node.js ke MySQL
    * `bcryptjs`: Untuk enkripsi password
    * `dotenv`: Untuk mengelola environment variables
    * `cors`: Untuk mengizinkan komunikasi antara frontend dan backend

## Fitur Utama
* Formulir pendaftaran mahasiswa baru (Nama, Email, Password).
* Penyimpanan data pendaftar secara aman ke dalam database MySQL.
* Enkripsi password pengguna sebelum disimpan ke database menggunakan Bcrypt.
* Komunikasi antara frontend dan backend menggunakan REST API sederhana.

## Struktur Folder Proyek
```
proyek-pendaftaran/
├── backend/
│   ├── node_modules/   (Dibuat lokal, tidak di-upload)
│   ├── .env            (Dibuat lokal, tidak di-upload)
│   ├── .gitignore      (Penting untuk mengabaikan file)
│   ├── package.json
│   ├── package-lock.json
│   ├── schema.sql
│   └── server.js
│
└── frontend/
    ├── index.html
    ├── style.css
    └── script.js
```

---

## Penting: File `.gitignore`
Proyek ini menggunakan file `.gitignore` di dalam folder `backend/` untuk memberitahu Git agar mengabaikan file dan folder tertentu. Ini adalah praktik standar untuk menjaga repository tetap bersih, ringan, dan aman.

Pastikan Anda membuat file ini di dalam folder `backend/` dengan nama `.gitignore` dan isi sebagai berikut:
```
# Folder 'gudang' yang tidak perlu di-upload
node_modules

# File 'rahasia' yang berisi password dan info sensitif
.env
```

---

## Cara Menjalankan Proyek Secara Lokal

Berikut adalah panduan lengkap untuk menjalankan aplikasi ini di komputer Anda.

### **Prasyarat**
* **Node.js**: Pastikan sudah terinstal. (Download dari [nodejs.org](https://nodejs.org/))
* **XAMPP**: Digunakan untuk menjalankan server database MySQL.
* **Git**: Untuk men-clone repository ini.

### **Langkah 1: Clone Repository**
Buka terminal atau Git Bash, dan jalankan perintah berikut:
```bash
# Ganti <link-repo-github-anda> dengan URL repo Anda
git clone <link-repo-github-anda>

# Masuk ke folder proyek
cd nama-repo-anda
```

### **Langkah 2: Setup Database**
Aplikasi ini membutuhkan database untuk berjalan.
1.  Buka **XAMPP Control Panel** dan klik **Start** pada modul **MySQL**.
2.  Buka browser dan akses **phpMyAdmin** (biasanya melalui tombol `Admin` di XAMPP).
3.  Di phpMyAdmin, klik tab **SQL**.
4.  Buka file `backend/schema.sql`, salin seluruh isinya, lalu tempel ke dalam kotak SQL di phpMyAdmin.
5.  Klik **"Go"** atau **"Kirim"** untuk membuat database `pendaftaran_mahasiswa` beserta semua tabelnya.

### **Langkah 3: Setup Backend**
Server adalah otak dari aplikasi ini.
1.  Buka **Terminal/Command Prompt** baru.
2.  Masuk ke direktori `backend`:
    ```bash
    cd backend
    ```
3.  Buat file bernama `.env` di dalam folder `backend` dan isi dengan konfigurasi berikut (sesuaikan password jika perlu):
    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=pendaftaran_mahasiswa
    JWT_SECRET=kunci-rahasia-apa-saja
    ```
4.  **Install semua paket yang dibutuhkan dengan menjalankan:**
    ```bash
    npm install
    ```
    *(Perintah ini akan membaca `package.json` dan mengunduh semua paket yang dibutuhkan ke dalam folder `node_modules` yang akan dibuat secara lokal di komputer Anda. Inilah sebabnya kita tidak perlu meng-upload folder `node_modules` ke GitHub).*
5.  Setelah instalasi selesai, jalankan server:
    ```bash
    node server.js
    ```
6.  Jika berhasil, Anda akan melihat pesan: `>>> Server siap dan berjalan di port 3000`. **Biarkan terminal ini tetap berjalan.**

### **Langkah 4: Jalankan Frontend**
1.  Pastikan server backend dari Langkah 3 sudah dan **masih berjalan**.
2.  Buka File Explorer Anda.
3.  Masuk ke folder `frontend`.
4.  **Double-click** file `index.html`. Halaman web akan terbuka di browser Anda dan siap digunakan untuk mendaftar. Data yang Anda kirim akan tersimpan di database MySQL.

## Tampilan di MySQL ![image](https://github.com/user-attachments/assets/75d5c57a-5eab-4011-9441-b19ca2730b3d)

