# 💒 Undangan Digital Premium

Undangan pernikahan digital dengan tiga template premium: **Aurum Elegant** (terang dan romantis), **Noir Minimal** (dark luxury), dan **Blush Garden** (pastel botanical).

## 🎭 Template Tersedia

### ✨ Aurum Elegant (default)
- Palet warna elegan: Champagne, Ivory, Dusty Rose, Sage Green dengan aksen Gold
- Typography: Cormorant Garamond, Montserrat, Great Vibes
- Motif dekoratif: batik-inspired patterns, ornamental borders
- Animasi halus: fade, slide, parallax, reveal on scroll

### 🖤 Noir Minimal
- Palet warna dark luxury: Midnight, Obsidian, Rose Gold, Gold, Platinum
- Typography: Playfair Display, Inter, Allura
- Signature: glassmorphism, aurora background, diamond motifs
- Preloader dan motion premium

### 🌸 Blush Garden
- Palet warna pastel botanical: Rosewater, Warm Gold, Sage, Ivory
- Typography: Marcellus, Manrope, Parisienne
- Signature: petal rain, soft watercolor layers, scroll progress
- Nuansa garden yang lembut dan airy

## ✨ Fitur Utama (Semua Template)

### 📱 Fully Responsive
- Mobile-first design
- Sempurna di semua perangkat (mobile, tablet, desktop)
- Touch-friendly dengan swipe support

### 🎭 Sections Lengkap
1. **Cover Page** - Hero fullscreen dengan nama mempelai & tanggal
2. **Bismillah** - Ayat Al-Quran dengan terjemahan
3. **Couple Profile** - Foto & informasi mempelai
4. **Countdown Timer** - Hitung mundur hari-H
5. **Event Details** - Jadwal Akad & Resepsi dengan lokasi
6. **Photo Gallery** - Grid foto dengan lightbox viewer
7. **Love Story** - Timeline perjalanan cinta
8. **RSVP Form** - Formulir konfirmasi kehadiran
9. **Digital Envelope** - Amplop digital dengan nomor rekening
10. **Closing** - Pesan penutup & ucapan terima kasih

### 🎵 Music Player
- Auto-play background music (browser-safe)
- Play/Pause control dengan visualizer
- Floating music button

### 🖼️ Gallery Lightbox
- Lightbox dengan navigasi next/prev
- Swipe support untuk mobile
- Keyboard navigation (arrow keys, ESC)

### ⚡ Performance
- Lazy loading untuk gambar
- Smooth scroll & optimized animations
- Fast loading dengan Vite

## 🚀 Instalasi & Pengembangan

### Clone & Setup Lokal
```bash
# Clone dari GitHub
git clone https://github.com/<username>/undangan-digital.git
cd undangan-digital

# Install dependencies
npm install

# Jalankan development server (tema default: aurum-elegant)
npm run dev

# Jalankan tema tertentu
TEMPLATE_NAME=aurum-elegant npm run dev
TEMPLATE_NAME=noir-minimal npm run dev
TEMPLATE_NAME=blush-garden npm run dev
```
Server Vite akan berjalan di `http://localhost:5173` (lihat terminal).  
Jika repo sudah ada di laptop dan ingin update dari GitHub: `git pull origin main`.

### Build untuk Production

```bash
# Build untuk production (tema default)
npm run build

# Build tema tertentu
TEMPLATE_NAME=aurum-elegant npm run build
TEMPLATE_NAME=noir-minimal npm run build
TEMPLATE_NAME=blush-garden npm run build

# Preview production build
npm run preview
```

File hasil build akan ada di folder `dist/<nama-tema>/`

## ☁️ Deploy

### Netlify
1. Push kode ke GitHub.
2. Di Netlify, pilih **Add new site > Import an existing project**.
3. Hubungkan repo ini, lalu set:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy. Netlify akan otomatis build tiap ada push.

### Vercel
1. Push kode ke GitHub.
2. Di Vercel, **New Project** > import repo.
3. Konfigurasi:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy. Vercel akan auto-redeploy setiap push.

## 📂 Struktur Project

```
undangan-digital/
├── package.json           # NPM configuration
├── vite.config.js         # Vite configuration
└── README.md              # Dokumentasi
└── templates/
    ├── aurum-elegant/     # Tema wedding invitation (default)
    │   ├── index.html
    │   ├── styles/
    │   │   └── main.css
    │   ├── scripts/
    │   │   └── main.js
    │   └── assets/
    │       ├── images/
    │       └── music/
    ├── noir-minimal/      # Tema dark luxury wedding invitation
        ├── index.html
        ├── styles/
        │   ├── main.css
        │   └── enhancements.css
        ├── scripts/
        │   └── main.js
        └── assets/
            ├── images/
            └── music/
    └── blush-garden/      # Tema pastel botanical wedding invitation
        ├── index.html
        ├── styles/
        │   ├── main.css
        │   └── enhancements.css
        ├── scripts/
        │   └── main.js
        └── assets/
            ├── images/
            └── music/
```

## 🎨 Kustomisasi Konten

### Pilih Template
- Set `TEMPLATE_NAME` ke `aurum-elegant`, `noir-minimal`, atau `blush-garden` saat dev/build.

### Ganti Foto
- Ganti file di `templates/<nama-tema>/assets/images/`:
  - `groom.jpg` - foto mempelai pria
  - `bride.jpg` - foto mempelai wanita
  - `gallery-1.jpg` s/d `gallery-6.jpg` - foto galeri
  - `qris-logo.png` - logo QRIS (khusus Noir Minimal)
- Pastikan ukuran gambar cukup besar (min 1200px) agar tetap tajam.

### Ganti Musik
1. Siapkan file MP3 (instrumen/lagu pilihan).
2. Simpan di `templates/<nama-tema>/assets/music/` dan sesuaikan nama file di `templates/<nama-tema>/index.html` bagian `<audio id="bgMusic">`:
   ```html
   <source src="assets/music/namafile-anda.mp3" type="audio/mpeg">
   ```
3. Pastikan ukuran file tidak terlalu besar (<5MB) agar loading cepat.

### Ubah Caption / Teks
- Ubah nama mempelai, judul, dan teks lain langsung di `templates/<nama-tema>/index.html` pada setiap section:
  - Cover & nama: blok cover dan section **Couple**.
  - Orang tua: teks di section **Couple**.
  - Jadwal & lokasi: section **Event**.
  - Ucapan penutup: section **Closing**.
- Ubah tanggal countdown di `templates/<nama-tema>/scripts/main.js`:
  ```javascript
  weddingDate: new Date(2025, 1, 14, 8, 0, 0)
  // Format: (Year, Month[0-11], Day, Hour, Minute, Second)
  ```
- Warna/typography bisa diubah via variabel di awal `templates/<nama-tema>/styles/main.css`.

**Sumber gratis untuk musik/foto:**
- Musik: [Pixabay Music](https://pixabay.com/music/), [Free Music Archive](https://freemusicarchive.org/), [Bensound](https://www.bensound.com/)
- Foto: [Unsplash](https://unsplash.com/), [Pexels](https://www.pexels.com/)

## 🧭 Menambah Tema Baru
1. Duplikasi folder `templates/aurum-elegant` atau `templates/noir-minimal` menjadi nama tema baru, misal `templates/ayu-budi`.
2. Ubah konten (foto, musik, teks, warna) di folder baru tersebut.
3. Jalankan/deploy dengan mengatur environment variable `TEMPLATE_NAME`, contoh:
   - Dev: `TEMPLATE_NAME=ayu-budi npm run dev`
   - Build: `TEMPLATE_NAME=ayu-budi npm run build`
4. Output build akan muncul di `dist/ayu-budi/`.

## 🎨 Design System

### Aurum Elegant
- **Champagne**: `#F7E7CE` - Primary background
- **Ivory**: `#FFFFF0` - Card backgrounds
- **Dusty Rose**: `#DCAE96` - Accent color
- **Sage Green**: `#9CAF88` - Secondary accent
- **Gold**: `#D4AF37` - Highlights & buttons
- **Deep Brown**: `#3E2723` - Primary text

**Typography**
- **Display**: Cormorant Garamond (romantic serif)
- **Body**: Montserrat (clean sans-serif)
- **Script**: Great Vibes (decorative script)

### Noir Minimal
- **Midnight**: `#0A0E27` - Primary background
- **Obsidian**: `#151A2E` - Card/background layer
- **Rose Gold**: `#E8B4B8` - Accent highlight
- **Gold**: `#D4AF37` - Highlights & buttons
- **Platinum**: `#E5E5E7` - Soft metallic accent

**Typography**
- **Display**: Playfair Display / DM Serif Display
- **Body**: Inter / Sora
- **Script**: Allura

### Blush Garden
- **Rosewater**: `#F9EAE1` - Primary background
- **Warm Gold**: `#C9A66B` - Accents & ornaments
- **Sage**: `#A6B6A0` - Secondary accents
- **Ivory**: `#FFFDF9` - Card backgrounds
- **Warm Brown**: `#4A2E2A` - Primary text

**Typography**
- **Display**: Marcellus
- **Body**: Manrope
- **Script**: Parisienne

## 🌟 Premium Features

### Aurum Elegant
✅ Batik-inspired decorative patterns  
✅ Ornamental section dividers  
✅ Corner decorative elements  
✅ Premium border treatments  
✅ Smooth micro-animations  
✅ Parallax floating elements  
✅ Intersection Observer reveal animations  
✅ Touch-optimized interactions  

### Noir Minimal
✅ Glassmorphism cards and panels  
✅ Midnight aurora background  
✅ Diamond corner ornaments  
✅ Floating diamond particles  
✅ Premium preloader experience  
✅ Elegant reveal animations  
✅ Glow and gradient accents  

### Blush Garden
✅ Petal rain animation  
✅ Soft watercolor layers  
✅ Botanical halo background  
✅ Scroll progress indicator  
✅ Airy card elevation  
✅ Pastel glow accents  

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS custom properties
- **Vanilla JavaScript** - No framework dependencies
- **Vite** - Fast development & build tool

## 📄 License

MIT License - Bebas digunakan untuk keperluan pribadi maupun komersial.

## 💝 Credits

Designed & Developed with ❤️ by **AnoTechHub**  
Premium wedding invitation template - 2025

---

**Selamat Menikah! 💒✨**
