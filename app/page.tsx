"use client";

import { useEffect, useState } from "react";

const works = [
  { no: "01", title: "Blackwork", meta: "Özgün kompozisyon · İstanbul", className: "ink-a" },
  { no: "02", title: "Fine Line", meta: "İnce çizgi · Kişiye özel", className: "ink-b" },
  { no: "03", title: "Realism", meta: "Siyah & gri · Portre", className: "ink-c" },
  { no: "04", title: "Lettering", meta: "Custom tipografi · Freehand", className: "ink-d" },
];

const faqs = [
  ["Randevu süreci nasıl işliyor?", "Formu doldurduktan sonra ekibimiz 24 saat içinde size ulaşır. Tasarım fikri, ölçü, bölge ve uygun sanatçı birlikte netleştirilir."],
  ["Fiyatlandırma nasıl yapılıyor?", "Her çalışma; boyut, detay, yerleşim ve seans süresine göre ayrı fiyatlandırılır. Net teklif ücretsiz ön görüşmeden sonra paylaşılır."],
  ["Kişiye özel tasarım yapıyor musunuz?", "Evet. Her tasarım yalnızca size özel hazırlanır; referanslarınız sanatçının özgün diliyle yeniden yorumlanır."],
  ["İlk dövmem için ne önerirsiniz?", "Kararınızı aceleye getirmeyin. Ekibimiz yerleşim, ölçü, stil ve bakım süreci konusunda sizi yönlendirir."],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Ruby Tattoo Studio ana sayfa">RUBY<small>TATTOO STUDIO · 2008</small></a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Ana menü">
          <a href="#work" onClick={() => setMenuOpen(false)}>Çalışmalar</a>
          <a href="#studio" onClick={() => setMenuOpen(false)}>Stüdyo</a>
          <a href="#artists" onClick={() => setMenuOpen(false)}>Sanatçılar</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>SSS</a>
        </nav>
        <a className="header-cta" href="#booking">Randevu al <span>↗</span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Menüyü aç veya kapat">{menuOpen ? "KAPAT" : "MENÜ"}</button>
      </header>

      <section className="hero" id="top">
        <div className="hero-noise" />
        <div className="hero-topline"><span>İstanbul, TR</span><span>Bağımsız dövme stüdyosu</span><span>Est. 2008</span></div>
        <div className="hero-copy">
          <p className="eyebrow">TENİNİZDEKİ HİKÂYE, BİZİM İMZAMIZ.</p>
          <h1>İz bırakmak<br/><em>sanattır.</em></h1>
        </div>
        <img className="hero-logo" src="/ruby-logo.png" alt="Ruby Tattoo Studio logosu" />
        <a className="circle-link" href="#work" aria-label="Çalışmaları keşfet"><span>KEŞFET</span><b>↓</b></a>
        <div className="hero-footer"><span>BLACKWORK</span><span>FINE LINE</span><span>REALISM</span><span>LETTERING</span></div>
      </section>

      <section className="manifesto" id="studio">
        <p className="section-label">01 — STÜDYO</p>
        <div>
          <h2>Dövme, yalnızca<br/>bir görüntü değil.</h2>
          <p>Ruby Tattoo Studio, 2008’den beri kişisel hikâyeleri zamansız tasarımlara dönüştürüyor. Her çizgi; fikrinize, teninize ve size özel.</p>
          <a className="text-link" href="#booking">Hikâyeni anlat <span>→</span></a>
        </div>
        <div className="seal" aria-hidden="true"><span>R</span><small>RUBY · TATTOO · STUDIO</small></div>
      </section>

      <section className="works" id="work">
        <div className="section-head">
          <p className="section-label">02 — SEÇİLİ İŞLER</p>
          <h2>Portfolyo</h2>
          <p>Her beden farklı bir tuval.<br/>Her iş, tek ve tekrarsız.</p>
        </div>
        <div className="work-grid">
          {works.map((work) => (
            <article className="work-card" key={work.no}>
              <div className={`work-art ${work.className}`}><span>R</span></div>
              <div className="work-info"><small>{work.no}</small><h3>{work.title}</h3><p>{work.meta}</p><span>↗</span></div>
            </article>
          ))}
        </div>
        <a className="outline-button" href="#booking">Projen için görüşelim <span>↗</span></a>
      </section>

      <section className="artists" id="artists">
        <p className="section-label">03 — SANATÇILAR</p>
        <div className="artist-intro"><h2>Tek stüdyo.<br/><em>Farklı imzalar.</em></h2><p>Fikriniz için doğru stil, doğru el ve doğru yaklaşım. Sanatçılarımızı tanıyın.</p></div>
        <div className="artist-list">
          {["Blackwork & ornamental", "Fine line & botanical", "Realism & portrait"].map((style, i) => (
            <div className="artist-row" key={style}><span>0{i + 1}</span><h3>RUBY ARTIST {i + 1}</h3><p>{style}</p><b>↗</b></div>
          ))}
        </div>
      </section>

      <section className="quote">
        <span className="quote-mark">“</span>
        <blockquote>Tasarımdan uygulamaya kadar kendimi çok güvende hissettim. Sonuç, hayal ettiğimden daha güçlü ve tamamen bana ait.</blockquote>
        <p>— STÜDYO MİSAFİRİ · İSTANBUL</p>
        <div className="quote-nav"><span>01 / 03</span><button aria-label="Önceki yorum">←</button><button aria-label="Sonraki yorum">→</button></div>
      </section>

      <section className="faq" id="faq">
        <div><p className="section-label">04 — MERAK EDİLENLER</p><h2>Sormadan<br/>önce.</h2></div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <div className={activeFaq === index ? "faq-item active" : "faq-item"} key={question}>
              <button onClick={() => setActiveFaq(activeFaq === index ? -1 : index)} aria-expanded={activeFaq === index}><span>0{index + 1}</span>{question}<b>{activeFaq === index ? "−" : "+"}</b></button>
              <div><p>{answer}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="booking" id="booking">
        <div className="booking-title"><p className="section-label">05 — RANDEVU</p><h2>Fikrini<br/><em>hayata geçirelim.</em></h2><p>Formu doldur, ekibimiz 24 saat içinde sana ulaşsın.</p></div>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>AD SOYAD<input type="text" placeholder="Adınız Soyadınız" required /></label>
          <label>TELEFON<input type="tel" placeholder="05__ ___ __ __" required /></label>
          <label>İLGİLENDİĞİNİZ STİL<select defaultValue=""><option value="" disabled>Bir stil seçin</option><option>Blackwork</option><option>Fine Line</option><option>Realism</option><option>Lettering</option><option>Kararsızım</option></select></label>
          <label>FİKRİNİZ<textarea placeholder="Boyut, bölge ve fikrinizden kısaca bahsedin..." rows={3} /></label>
          <button type="submit">Randevu talebi gönder <span>↗</span></button>
          <small>Göndererek kişisel verilerinizin randevu amacıyla işlenmesini kabul edersiniz.</small>
        </form>
      </section>

      <footer>
        <div className="footer-logo">RUBY<span>TATTOO STUDIO · 2008</span></div>
        <div><p>İSTANBUL, TÜRKİYE</p><a href="#booking">Adres bilgisi eklenecek</a></div>
        <div><p>İLETİŞİM</p><a href="#booking">Telefon bilgisi eklenecek</a><a href="#booking">Instagram hesabı eklenecek</a></div>
        <div className="footer-bottom"><span>© 2026 RUBY TATTOO STUDIO</span><span>SADECE RANDEVU İLE</span><a href="#top">YUKARI ↑</a></div>
      </footer>
    </main>
  );
}
