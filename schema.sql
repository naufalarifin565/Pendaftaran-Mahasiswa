-- Buat database baru (opsional, jika belum ada)
CREATE DATABASE IF NOT EXISTS pendaftaran_mahasiswa;

-- Gunakan database tersebut
USE pendaftaran_mahasiswa;

-- 1. Tabel untuk akun calon mahasiswa
CREATE TABLE IF NOT EXISTS calon_mahasiswa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_lengkap VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    no_telepon VARCHAR(20),
    status_pembayaran ENUM('Belum Bayar', 'Menunggu Konfirmasi', 'Lunas') DEFAULT 'Belum Bayar',
    status_pendaftaran ENUM('Menunggu Pembayaran', 'Menunggu Kelengkapan Data', 'Data Lengkap', 'Lolos Seleksi', 'Tidak Lolos') DEFAULT 'Menunggu Pembayaran',
    tanggal_registrasi TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Tabel untuk detail biodata pendaftar
CREATE TABLE IF NOT EXISTS detail_pendaftar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mahasiswa_id INT UNIQUE,
    tempat_lahir VARCHAR(100),
    tanggal_lahir DATE,
    jenis_kelamin ENUM('Laki-laki', 'Perempuan'),
    alamat TEXT,
    asal_sekolah VARCHAR(255),
    nilai_rata_rata DECIMAL(5,2),
    FOREIGN KEY (mahasiswa_id) REFERENCES calon_mahasiswa(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3. Tabel untuk daftar program studi yang tersedia
CREATE TABLE IF NOT EXISTS program_studi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_prodi VARCHAR(255) NOT NULL,
    fakultas VARCHAR(255),
    kuota INT
);

-- 4. Tabel untuk pilihan program studi yang diambil calon mahasiswa
CREATE TABLE IF NOT EXISTS pilihan_prodi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mahasiswa_id INT,
    prodi_pilihan_1_id INT,
    prodi_pilihan_2_id INT,
    FOREIGN KEY (mahasiswa_id) REFERENCES calon_mahasiswa(id) ON DELETE CASCADE,
    FOREIGN KEY (prodi_pilihan_1_id) REFERENCES program_studi(id),
    FOREIGN KEY (prodi_pilihan_2_id) REFERENCES program_studi(id)
) ENGINE=InnoDB;

-- 5. Tabel untuk menyimpan path dokumen yang diunggah
CREATE TABLE IF NOT EXISTS dokumen_pendaftar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mahasiswa_id INT,
    jenis_dokumen VARCHAR(100),
    file_path VARCHAR(255) NOT NULL,
    tanggal_unggah TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (mahasiswa_id) REFERENCES calon_mahasiswa(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Contoh data untuk program studi (opsional, untuk testing)
INSERT INTO program_studi (nama_prodi, fakultas, kuota) VALUES
('Teknik Informatika', 'Fakultas Teknologi Industri', 100),
('Sistem Informasi', 'Fakultas Teknologi Industri', 120),
('Desain Komunikasi Visual', 'Fakultas Industri Kreatif', 80),
('Manajemen', 'Fakultas Ekonomi dan Bisnis', 150)
ON DUPLICATE KEY UPDATE nama_prodi=nama_prodi;