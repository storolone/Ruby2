# Ruby görsel paneli

GitHub Pages siteyi yayınlar. Sanity Studio, ekip girişini ve görsel yüklemeyi yönetir.
Sitedeki /Ruby2/admin/ adresi Studio’yu açar. Sadece yayınlanan görseller galerilere eklenir.

1. Ruby için Sanity projesi ve `production` adlı herkese açık dataset oluşturun.
2. `studio/.env.local` dosyasına `SANITY_STUDIO_PROJECT_ID` ve
   `SANITY_STUDIO_DATASET=production` yazın. Studio klasöründe `npm ci`,
   `npx sanity login`, ardından `npm run deploy` çalıştırın.
3. Sanity Manage > API > CORS Origins kısmına `https://storolone.github.io`
   (veya sitenin özel alan adının origin’i) ekleyin. Site sadece herkese açık
   görselleri okuduğu için bu origin’de kimlik bilgilerine izin vermeyin.
4. GitHub > Settings > Secrets and variables > Actions > Variables bölümünde
   `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` ve
   `NEXT_PUBLIC_SANITY_STUDIO_URL` (Studio’nun tam HTTPS adresi) ayarlayın.
   Bu ayarlardan sonra GitHub Pages işini bir kez çalıştırın.
5. Panelde galeriyi seçin. Mevcut bir fotoğrafı değiştirmek için listeden
   fotoğrafın yerini açın, yeni dosyayı yükleyin ve Yayınla düğmesine basın.
   Eklenenleri düzenlemek veya yeni fotoğraf eklemek için galeriye ait
   “Yeni fotoğraf ekle / eklenenleri düzenle” listesini açın. Saç simülasyonunda öncesi ve sonrasını birlikte yükleyin.
   Yeni görseller bir sonraki galeri sorgusunda görünür. Ziyaretçiler sayfayı
   yenileyebilir. Sonraki yüklemeler için siteyi yeniden yayınlamak gerekmez.

Free planda yazma yetkisi Administrator rolüyle gelir. Bu rolü yalnızca proje
ayarlarına da erişmesi uygun kişilere verin. Ayrı Editor rolü gerekiyorsa
Sanity’nin plan seçeneklerini değerlendirin. Siteye yazma anahtarı eklemeyin.
