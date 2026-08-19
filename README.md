# Zeynep Sude Bayram — Portfolyo

Bu proje, bilgisayar mühendisliği öğrencisi olan Zeynep Sude Bayram için geliştirilmiş, performanslı ve modern bir kişisel portfolyo web sitesidir. Kullanıcı odaklı bir tasarım ve yönetim paneli sunar.

[Canlı Demo](DEPLOY_LINKI_BURAYA)

![Ana sayfa](docs/screenshot.png)

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
