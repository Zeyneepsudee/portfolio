# Zeynep Sude Bayram — Portfolyo

Bu proje, Zeynep Sude Bayram için geliştirilmiş, sevimli bir kişisel portfolyo web sitesidir. Kullanıcı odaklı bir tasarım ve yönetim paneli sunar.

[Canlı Demo](DEPLOY_LINKI_BURAYA)

<img width="1470" height="802" alt="Ekran Resmi 2026-08-19 22 17 42" src="https://github.com/user-attachments/assets/50881a15-304b-4eb1-a707-81f86fe41564" />
<img width="1470" height="802" alt="Ekran Resmi 2026-08-19 22 18 01" src="https://github.com/user-attachments/assets/b8f12cad-2aa3-436a-a5d4-d043b1a5350e" />
<img width="1470" height="802" alt="Ekran Resmi 2026-08-19 22 18 33" src="https://github.com/user-attachments/assets/7ae3dca6-5f76-4fc7-97d9-833716bc76e5" />



## 🛠️ Teknolojiler
- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4
- React Router 7
- Framer Motion
- Lenis

## ✨ Özellikler
- **Kapsamlı Admin Paneli:** Proje, profil ve iletişim bilgileri eklenebilir, düzenlenebilir ve silinebilir (CRUD).
- **LocalStorage Kalıcılığı:** Backend gerektirmez, tüm veriler tarayıcının `localStorage`'ında saklanır.
- **Brute-force Korumalı Giriş:** Admin girişi başarısız denemelerde kilitlenerek basit saldırıları yavaşlatır.
- **Pixel-Window Arayüzü:** Özgün, renkli ve modern bir estetik.

## 🚀 Kurulum

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. `.env` dosyasını oluşturun ve `VITE_ADMIN_HASH` değişkenini ayarlayın. (Bkz: `.env.example`):
   ```bash
   cp .env.example .env
   ```

3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

## 📁 Proje Yapısı

```
src/
├── components/
│   ├── layout/      # Navbar vb. genel yerleşimler
│   ├── sections/    # Beni Tanıyın, Projeler, İletişim gibi anasayfa bölümleri
│   └── ui/          # Butonlar, animasyonlar, özel arayüz bileşenleri
├── context/         # React Context yöneticileri (Auth, Project, Site)
├── data/            # LocalStorage boşken kullanılacak varsayılan veriler
├── hooks/           # Kendi yazdığımız hook'lar (useSite, useAuth vb.)
├── interfaces/      # TypeScript tip tanımlamaları
├── pages/           # Anasayfa, Login ve Admin paneli rotaları
└── utils/           # Kimlik doğrulama, depolama gibi yardımcı fonksiyonlar
```

## ⚠️ Güvenlik Notu
Admin girişi yalnızca demo amaçlıdır. Bu proje frontend-only (sadece önyüz) olduğu için şifre hash'i derlenen JavaScript paketine gömülür ve tarayıcıdan görülebilir; gerçek bir kimlik doğrulama katmanı değildir. Üretim ortamında sunucu tarafında JWT veya session tabanlı doğrulama gerekir.
