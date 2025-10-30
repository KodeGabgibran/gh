// Simulasi "database" user yang sudah terdaftar
// Di aplikasi nyata, ini akan berinteraksi dengan backend (server)
const registeredUsers = {};

document.addEventListener('DOMContentLoaded', () => {
    // --- Elemen Modal ---
    const signupBtn = document.getElementById('signup-btn');
    const loginBtn = document.getElementById('login-btn');
    const modal = document.getElementById('auth-modal');
    const closeModal = document.querySelector('.modal-content .close-btn');
    const authForm = document.getElementById('auth-form');
    const modalTitle = document.getElementById('modal-title');
    const authSubmitBtn = document.getElementById('auth-submit-btn');
    const authEmailInput = document.getElementById('auth-email');
    const authPasswordInput = document.getElementById('auth-password');
    const toggleAuth = document.getElementById('toggle-auth');

    // Pastikan elemen-elemen ini ada sebelum menambahkan event listener
    // Ini penting agar script tidak error jika dijalankan di acoustic.html atau electric.html
    if (signupBtn && loginBtn && modal) {
        let isSignUp = true;

        const showModal = (mode) => {
            isSignUp = (mode === 'signup');
            if (isSignUp) {
                modalTitle.textContent = 'Daftar Akun Baru';
                authSubmitBtn.textContent = 'Daftar';
                toggleAuth.innerHTML = 'Sudah punya akun? <a href="#" id="show-login">Login</a>';
            } else {
                modalTitle.textContent = 'Masuk ke Akun Anda';
                authSubmitBtn.textContent = 'Masuk';
                toggleAuth.innerHTML = 'Belum punya akun? <a href="#" id="show-signup">Daftar</a>';
            }
            modal.style.display = 'block';
            authEmailInput.value = '';
            authPasswordInput.value = '';
            
            // Pasang ulang event listener untuk link dinamis di dalam toggle-auth
            document.getElementById('show-login')?.addEventListener('click', (e) => { e.preventDefault(); showModal('login'); });
            document.getElementById('show-signup')?.addEventListener('click', (e) => { e.preventDefault(); showModal('signup'); });
        };

        // --- Event Listeners untuk Tombol Utama ---
        signupBtn.addEventListener('click', () => showModal('signup'));
        loginBtn.addEventListener('click', () => showModal('login'));
        closeModal.addEventListener('click', () => modal.style.display = 'none');
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        // --- Fungsionalitas Sign Up dan Login ---
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = authEmailInput.value;
            const password = authPasswordInput.value;
            
            if (isSignUp) {
                // Fungsionalitas Sign Up: Mendaftarkan Akun
                if (registeredUsers[email]) {
                    alert('Pendaftaran gagal. Email sudah terdaftar.');
                } else {
                    registeredUsers[email] = password;
                    alert('Pendaftaran berhasil! Silakan Masuk.');
                    console.log('Registered Users:', registeredUsers);
                    showModal('login'); // Langsung alihkan ke mode Login
                }
            } else {
                // Fungsionalitas Login: Memeriksa Akun
                if (registeredUsers[email] && registeredUsers[email] === password) {
                    alert('Login berhasil! Selamat datang kembali.');
                    modal.style.display = 'none';
                    // TODO: Tambahkan logika untuk mengubah tampilan tombol login/signup menjadi 'Welcome [Nama User]'
                } else {
                    alert('Login gagal. Email atau kata sandi salah, atau akun belum terdaftar (silakan Sign Up).');
                }
            }
        });
        
        // Pasang listener awal untuk link login di modal default (signup)
        document.getElementById('show-login')?.addEventListener('click', (e) => { e.preventDefault(); showModal('login'); });
    }
});