// File: backend/server.js - VERSI PERBAIKAN

// Memuat variabel dari file .env
require('dotenv').config();
console.log("Mencoba memuat variabel dari .env...");

const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Cek apakah variabel .env terbaca
console.log("Host DB:", process.env.DB_HOST, "| User DB:", process.env.DB_USER);

// Konfigurasi koneksi database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Tes koneksi database
console.log("Mencoba terhubung ke database MySQL...");
db.connect(err => {
    if (err) {
        // Jika ada error saat koneksi, tampilkan dengan jelas dan hentikan
        console.error('!!! KESALAHAN KONEKSI DATABASE !!!');
        console.error('Error:', err.code);
        console.error('Pesan:', err.message);
        console.error("Pastikan XAMPP MySQL sudah berjalan dan konfigurasi di file .env sudah benar.");
        return; 
    }
    
    // Jika berhasil, tampilkan pesan sukses
    console.log('>>> Koneksi ke database MySQL BERHASIL.');

    // === PINDAHKAN BAGIAN INI KE DALAM SETELAH KONEKSI BERHASIL ===
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`>>> Server siap dan berjalan di port ${PORT}`);
    });
    // =============================================================
});


// === API ENDPOINTS TETAP SAMA ===

// 1. Endpoint untuk registrasi calon mahasiswa baru
app.post('/api/register', async (req, res) => {
    const { nama_lengkap, email, password } = req.body;

    if (!nama_lengkap || !email || !password) {
        return res.status(400).json({ message: 'Nama lengkap, email, dan password wajib diisi.' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);
        const newUser = { nama_lengkap, email, password_hash };
        const sql = 'INSERT INTO calon_mahasiswa SET ?';
        db.query(sql, newUser, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'Email sudah terdaftar.' });
                }
                return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
            }
            res.status(201).json({ message: 'Registrasi berhasil!', userId: result.insertId });
        });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
});

// 2. Endpoint untuk login (jika diperlukan nanti)
app.post('/api/login', (req, res) => {
    // ... (logika login tetap sama)
});