Product Requirements Document (PRD)

Nama Produk: TypAI (AI-Powered Typing Tutor)
Kategori: Education: The Study Buddy
Status: Draft / Versi 2.0
Tanggal: 27 Mei 2026

1. Pendahuluan

1.1 Latar Belakang

Mengetik cepat dan akurat dengan 10 jari (touch typing) adalah keterampilan dasar yang esensial di era digital, baik untuk pelajar maupun profesional. Namun, aplikasi latihan mengetik konvensional seringkali terasa membosankan karena menggunakan teks yang repetitif dan statis. Selain itu, platform yang ada saat ini kurang ramah bagi mereka yang sedang belajar bahasa asing dengan sistem penulisan non-Latin (seperti Arab, Rusia, atau Korea).

1.2 Masalah yang Diselesaikan

Kebosanan (Repetitif): Aplikasi latihan mengetik konvensional seringkali menggunakan database teks yang statis dan terbatas, sehingga pengguna cepat bosan dan kehilangan motivasi.

Kurangnya Personalisasi: Kurangnya kemampuan untuk menyesuaikan tingkat kesulitan atau topik teks berdasarkan minat atau tingkat kemahiran pengguna.

Keterbatasan Bahasa, Tata Letak, & Hardware: Kebanyakan aplikasi hanya fokus pada abjad Latin. Pembelajar bahasa dengan skrip berbeda (RTL atau Non-Latin) sering kesulitan berlatih karena keyboard fisik mereka hanya menampilkan huruf QWERTY Latin. Mereka harus meraba-raba atau menggunakan stiker fisik untuk mengetahui letak huruf bahasa asing.

1.3 Solusi yang Ditawarkan (TypAI)

TypAI memberikan pengalaman belajar mengetik yang interaktif, personalized, dan inklusif. Sebagai "Study Buddy", TypAI menggunakan AI (Gemini API) untuk menghasilkan teks latihan yang selalu baru dan relevan berdasarkan pilihan bahasa dan tingkat kesulitan pengguna. TypAI secara otomatis menyesuaikan arah teks (Kiri-ke-Kanan atau Kanan-ke-Kiri) dan memandu pemula dengan Keyboard Virtual Interaktif di layar yang memetakan tombol fisik ke aksara bahasa yang sedang dipelajari - Feedback real-time:
     - Teks yang benar: Warna hijau.
     - Teks salah: Latar belakang/teks merah.
   - **Smart Mapping (Transliterasi)**: Fitur konversi otomatis input keyboard QWERTY menjadi karakter spesifik (Arab, Rusia, Korea) tanpa mengharuskan pengguna mengubah *layout* keyboard dari sistem operasi mereka. Mencegat `keydown` dan me-replace karakter secara real-time.

2. Target Audience

Pelajar/Mahasiswa: Yang ingin meningkatkan produktivitas dalam mengerjakan tugas atau makalah.

Pembelajar Bahasa (Language Learners): Individu yang sedang mempelajari bahasa baru (khususnya dengan aksara non-Latin) dan ingin membiasakan diri mengetik dalam bahasa tersebut tanpa melihat keyboard.

Pekerja Profesional (Programmer, Penulis, Admin): Yang perlu meningkatkan metrik kecepatan (Words Per Minute / WPM) dan efisiensi kerja.

3. Fungsionalitas & Fitur

3.1 Fitur Inti (Minimum Viable Product - MVP / V1)

1. Customizable Test Setup (Pengaturan Latihan):

Durasi (Time Limit): Pilihan durasi latihan (15 detik, 30 detik, 60 detik, 2 menit).

Pilihan Bahasa: Pengguna dapat memilih bahasa teks (misal: Indonesia, Inggris, Arab, Rusia, Korea, dll).

Sumber/Mode Teks: Pilihan tipe generasi teks (Kata acak, Kutipan inspiratif, atau Paragraf narasi).

Difficulty Levels (Tingkat Kesulitan): Opsi Easy, Medium, Hard yang akan menyesuaikan prompt yang dikirim ke AI.

Easy: Kata-kata pendek, tanpa huruf kapital, tanpa tanda baca kompleks.

Medium: Teks standar, dengan huruf kapital dan tanda baca dasar (titik, koma).

Hard: Teks dengan kosa kata kompleks, angka, dan berbagai jenis tanda baca.

1. AI Text Generation (Integrasi Gemini API):

Sistem akan mengirimkan prompt dinamis ke Gemini API berdasarkan pengaturan di atas. (Contoh: "Buatkan 50 kata acak tingkat kesulitan 'Hard' (termasuk angka dan tanda baca) dalam bahasa Spanyol" atau "Buatkan satu paragraf pendek 'Easy' tentang hewan peliharaan dalam bahasa Indonesia tanpa tanda baca kompleks").

Teks yang dihasilkan bersifat dinamis dan tidak pernah sama di setiap sesi.

1. Smart Interactive Typing Interface & Responsive Design:

Responsive UI: Antarmuka dirancang untuk beradaptasi dengan mulus dari ukuran layar Desktop, Tablet, hingga Mobile (menggunakan breakpoint Tailwind). Di layar mobile, area teks diposisikan agar nyaman disentuh/diketik menggunakan on-screen keyboard bawaan OS pengguna.

Auto-Direction (LTR/RTL Support): Antarmuka secara cerdas beradaptasi berdasarkan pilihan bahasa.

Latin/Cyrillic: Teks sejajar kiri (LTR), kursor bergerak ke kanan.

Arabic/Hebrew: Teks sejajar kanan (RTL), kursor bergerak ke kiri.

Real-time Dynamic Virtual Keyboard: Menampilkan overlay keyboard di layar yang tata letak karakternya otomatis berubah mengikuti bahasa yang dipilih (misal: QWERTY berubah menjadi layout Mac/PC Arabic). Keyboard ini memberikan feedback visual real-time saat pengguna menekan tombol.

Catatan Responsivitas: Fitur Virtual Keyboard ini tidak akan tersedia/disembunyikan (hidden) ketika diakses dari perangkat Mobile, untuk mencegah tabrakan dengan on-screen keyboard bawaan smartphone.

Toggle Visibility Keyboard (Desktop/Tablet): Opsi untuk menyembunyikan atau menampilkan Virtual Keyboard agar antarmuka tidak mengganggu fokus pengguna yang sudah mahir.

Live Text Feedback & Separated Input Field: Teks target akan ditampilkan di area tersendiri dan berubah warna secara real-time. Pengguna mengetik melalui *input field* atau *textarea* terpisah yang posisinya berada di bawah teks target. Input field ini di-disable sebelum teks digenerate, dan baru aktif setelah teks siap.

Toast Notification: Menampilkan notifikasi "Sesi Dimulai" (Toast) sesaat setelah pengguna mengetikkan karakter pertama, memberikan feedback visual bahwa timer telah berjalan.

1. Real-time Metrics (Metrik Pengukuran):

WPM (Words Per Minute): Kecepatan mengetik kotor dan bersih.

Accuracy (Akurasi): Persentase ketepatan penekanan tombol (%).

Error Count: Jumlah kesalahan pengetikan karakter.

3.2 Fitur Masa Depan (V2 / Nice-to-Have)

User Accounts & Progress Tracking: Login pengguna untuk menyimpan riwayat skor, grafik perkembangan WPM, dan pencapaian (badges).

Custom Prompt Input: Pengguna bisa menginput topik spesifik (misal: "Buatkan teks tentang sejarah Romawi kuno") agar latihan lebih personal dan menyenangkan.

Multiplayer/Leaderboard: Bersaing kecepatan dengan pengguna lain secara real-time.

1. User Flow (Alur Pengguna)

Halaman Utama (Konfigurasi Langsung): Saat aplikasi dibuka, pengguna langsung dihadapkan pada antarmuka utama. Di panel atas (yang menyesuaikan tata letak pada layar mobile), mereka langsung menyesuaikan parameter latihan: Waktu (60s), Bahasa (Arab), Mode (Kata Acak), dan Tingkat Kesulitan (Medium).

Generasi Teks (Loading singkat): Setelah pengaturan selesai, pengguna menekan tombol "Generate" atau sistem memanggil Gemini API secara otomatis. Layar memuat teks dengan transisi masuk yang mulus.

Adaptasi UI & Opsi Keyboard:

Di Desktop/Tablet: Virtual Keyboard instan berubah tata letaknya. Pengguna bisa mengatur opsi toggle tampil/sembunyi.

Di Mobile: Virtual Keyboard milik TypAI tidak ditampilkan agar layar tetap bersih untuk on-screen keyboard bawaan OS.

Sesi Mengetik (Start): Pengguna menekan tombol "Start" (atau area teks untuk memunculkan keyboard mobile).

Timer mulai berjalan mundur saat ketukan pertama.

(Khusus Desktop/Tablet) Tombol Virtual Keyboard berkedip sesuai input.

Metrik WPM dan Akurasi diperbarui setiap detik.

Sesi Selesai (Result): Waktu habis. Area teks digantikan oleh ringkasan hasil latihan: WPM akhir, Akurasi, dan karakter mana saja yang paling sering salah ketik.

Call to Action: Pengguna dapat mengulangi dengan teks yang sama atau me-request teks baru.

1. Kebutuhan Teknis & Arsitektur

Arsitektur (Monolith Pendekatan Modern): Menggunakan pola Single Codebase (Monorepo/Monolith) untuk mempercepat pengembangan MVP.

Package Manager: Bun. Digunakan untuk resolusi dependency yang sangat cepat, mempercepat proses instalasi, dan meningkatkan performa build time / runtime pada Nuxt.

Framework Utama (Fullstack): Nuxt.js (berbasis Vue 3).

Frontend: Digunakan untuk merender antarmuka (UI) menggunakan Vue 3 (Composition API).

Global State Management: Menggunakan Pinia sebagai repositori tunggal (single source of truth) untuk menangani status reaktif di seluruh aplikasi (seperti Config Store dan Typing Session Store).

Data Fetching: Menggunakan Axios sebagai HTTP client utama untuk melakukan pemanggilan API (dari client-side ke Server Routes internal Nuxt).

Backend / Server-Side: Menggunakan fitur Server Routes atau API Routes (/server/api) bawaan dari mesin Nitro di Nuxt.js. Ini bertindak sebagai perantara aman yang memanggil API pihak ketiga dari sisi server.

UI Components, Styling, & Animation:

UI Component Library: Menggunakan shadcn-vue (berbasis Radix Vue / Base UI) untuk menciptakan antarmuka yang modern, accessible, dan adaptif.

CSS Framework: Menggunakan Tailwind CSS untuk menangani Responsive Design secara efisien (menggunakan utilitas seperti md:hidden untuk menyembunyikan Virtual Keyboard di mobile), beserta properti logis CSS untuk dukungan RTL/LTR.

Animation Library: Menggunakan @vueuse/motion (sebagai alternatif fungsional setara Framer Motion untuk ekosistem Vue/Nuxt). Digunakan untuk menangani micro-interactions dan transisi antarmuka yang sangat mulus (misal: fade-in teks saat digenerate, animasi toggle Virtual Keyboard, atau efek pop pada panel hasil/metrik).

AI Service: Google Gemini API untuk Natural Language Generation.

Keyboard Layout Mapping: Membutuhkan library atau pemetaan array manual di dalam state aplikasi.

1. Kriteria Sukses (Success Metrics)

System Latency: Teks dari Gemini API dapat di-generate dan dimuat dalam waktu kurang dari 2 detik.

Input Responsiveness: Tidak ada delay (kurang dari 16ms) antara penekanan tombol fisik, perubahan warna teks, dan nyala lampu pada Virtual Keyboard.

User Engagement: Pengguna rata-rata melakukan lebih dari 3 sesi latihan per kunjungan.

Error-Free RTL/LTR & Responsiveness: Perubahan arah teks berjalan mulus dan tampilan UI tidak "pecah" di berbagai ukuran perangkat, dengan penyembunyian Virtual Keyboard yang konsisten di layar mobile.
