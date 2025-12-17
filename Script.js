document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.complex-grid');
    const nav = document.querySelector('.navbar');

    // 1. FUNGSI RENDER CARD (Otomatisasi Konten)
    const renderDestinasi = (data) => {
        container.innerHTML = data.map(item => `
            <div class="info-card" data-aos="fade-up">
                <div class="card-header">
                    <img src="${item.img}" alt="${item.nama}">
                    <div class="price-tag">Mulai Rp ${item.harga.toLocaleString('id-ID')}</div>
                </div>
                <div class="card-body">
                    <div class="meta">
                        <span class="location">📍 ${item.lokasi}</span>
                        <span class="rating">⭐ ${item.rating}</span>
                    </div>
                    <h3>${item.nama}</h3>
                    <p>${item.deskripsi}</p>
                    
                    <div class="features-list">
                        ${item.fasilitas.map(f => `<span>${f}</span>`).join('')}
                    </div>
                    
                    <div class="data-table">
                        <div class="row"><span>Waktu Terbaik</span><strong>${item.waktu}</strong></div>
                        <div class="row"><span>Kategori</span><strong>${item.kategori}</strong></div>
                        <div class="row"><span>Suhu Rata-rata</span><strong>${item.suhu}</strong></div>
                    </div>
                    <button class="btn-detail" onclick="showEstimator(${item.harga})">Hitung Estimasi Biaya</button>
                </div>
            </div>
        `).join('');
    };

    // 2. STICKY NAVBAR & SCROLL ANIMATION
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = "rgba(255, 255, 255, 0.95)";
            nav.style.padding = "10px 0";
            nav.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
        } else {
            nav.style.background = "rgba(255, 255, 255, 0.8)";
            nav.style.padding = "20px 0";
            nav.style.boxShadow = "none";
        }
    });

    // 3. FITUR ESTIMASI BIAYA (Interactive Alert)
    window.showEstimator = (hargaDasar) => {
        const jumlahOrang = prompt("Masukkan jumlah peserta:");
        if (jumlahOrang && !isNaN(jumlahOrang)) {
            const total = hargaDasar * jumlahOrang;
            alert(`
                Estimasi Biaya Perjalanan:
                ---------------------------
                Destinasi: Rp ${hargaDasar.toLocaleString('id-ID')}
                Peserta: ${jumlahOrang} orang
                Total Estimasi: Rp ${total.toLocaleString('id-ID')}
                
                *Biaya belum termasuk transportasi dari kota asal.
            `);
        }
    };

    // 4. SMOOTH SCROLLING UNTUK NAVIGASI
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Inisialisasi Render Pertama
    renderDestinasi(destinasiData);
});
