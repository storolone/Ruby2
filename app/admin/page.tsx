import './admin.css';

export default function Admin() {
  const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL;
  const studioReady = studioUrl && /^https:\/\/[a-z0-9-]+\.sanity\.studio\/?$/i.test(studioUrl);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  return <main className="ruby-admin">
    <header>
      <div><p>RUBY TATTOO</p><h1>Görsel yönetimi</h1></div>
      <a href={`${basePath}/`}>Siteye dön</a>
    </header>
    <section className="admin-card">
      {studioReady
        ? <><p>Studio’da yeni fotoğraf oluşturun, bölümü seçin ve yayınlayın.</p>
          <a className="admin-open" href={studioUrl}>Görsel panelini aç →</a></>
        : <p>Görsel paneli, Sanity Studio bağlantısı kurulduğunda burada açılacak.</p>}
    </section>
  </main>;
}
