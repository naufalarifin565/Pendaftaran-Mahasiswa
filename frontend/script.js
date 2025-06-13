// Pastikan skrip berjalan setelah seluruh halaman HTML dimuat
document.addEventListener('DOMContentLoaded', () => {
    
    // Temukan form pendaftaran berdasarkan ID-nya
    const registrationForm = document.getElementById('registrationForm'); 

    if (registrationForm) {
        registrationForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Mencegah form me-refresh halaman

            // Ambil elemen untuk menampilkan status
            const statusMessage = document.getElementById('statusMessage');
            statusMessage.textContent = 'Mengirim data...';
            statusMessage.style.color = '#000'; // Warna default

            // Kumpulkan data dari form
            const formData = new FormData(registrationForm);
            const data = Object.fromEntries(formData.entries());

            try {
                // Kirim data ke API backend
                // Pastikan server backend Anda berjalan
                const response = await fetch('http://localhost:3000/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (response.ok) {
                    statusMessage.textContent = `Registrasi Berhasil! User ID Anda: ${result.userId}`;
                    statusMessage.style.color = 'green';
                    registrationForm.reset();
                } else {
                    // Tampilkan pesan error dari server
                    statusMessage.textContent = `Error: ${result.message}`;
                    statusMessage.style.color = 'red';
                }
            } catch (error) {
                console.error('Tidak dapat terhubung ke server:', error);
                statusMessage.textContent = 'Gagal terhubung ke server. Pastikan server backend sudah berjalan.';
                statusMessage.style.color = 'red';
            }
        });
    }
});