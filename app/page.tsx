"use client";

import { useEffect, useState } from "react";

const works = [
  { no: "01", title: "Fine line", meta: "İnce çizgi", image: "/works/1.jpg" },
  { no: "02", title: "Blackwork", meta: "Özgün kompozisyon", image: "/works/2.jpg" },
  { no: "03", title: "Realism", meta: "Gerçekçi detaylar", image: "/works/3.jpg" },
  { no: "04", title: "Dotwork", meta: "Nokta sanatı", image: "/works/4.jpg" },
  { no: "05", title: "Micro Realism", meta: "Küçük detaylar", image: "/works/5.jpg" },
  { no: "06", title: "Traditional", meta: "Geleneksel", image: "/works/6.jpg" },
  { no: "07", title: "Old School", meta: "Klasik dokunuş", image: "/works/7.jpg" },
  { no: "08", title: "Minimalist", meta: "Sade & Zarif", image: "/works/8.jpg" },
  { no: "09", title: "Color", meta: "Canlı renkler", image: "/works/9.jpg" },
];

const piercings = [
  { no: "01", title: "Helix", meta: "Renkli taş yerleşimi", image: "/piercing/1.jpg" },
  { no: "02", title: "Stretched Lobe", meta: "Özgün kulak kompozisyonu", image: "/piercing/2.jpg" },
  { no: "03", title: "Curated Ear", meta: "Altın detaylı seçki", image: "/piercing/3.jpg" },
  { no: "04", title: "Navel", meta: "Zarif göbek piercingi", image: "/piercing/4.jpg" },
  { no: "05", title: "Monroe", meta: "Minimal yüz piercingi", image: "/piercing/5.jpg" },
  { no: "06", title: "Curated Ear", meta: "Katmanlı taş yerleşimi", image: "/piercing/6.jpg" },
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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Ruby Tattoo Studio ana sayfa">
          <strong>RUBY</strong>
          <small>TATTOO STUDIO · 2008</small>
        </a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Ana menü">
          <a href="#work" onClick={() => setMenuOpen(false)}>Çalışmalar</a>
          <a href="#piercing" onClick={() => setMenuOpen(false)}>Piercing</a>
          <a href="#studio" onClick={() => setMenuOpen(false)}>Stüdyo</a>
          <a href="#artists" onClick={() => setMenuOpen(false)}>Sanatçılar</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>SSS</a>
        </nav>
        <a className="header-cta" href="#booking">Randevu al <span>→</span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Menüyü aç veya kapat">{menuOpen ? "KAPAT" : "MENÜ"}</button>
      </header>

      <section className="hero" id="top">
        <div className="hero-left">
          <div className="hero-topline">
          </div>
          <div className="hero-copy fade-in-section">
            <h1>Hikâyeni<br /><em>tarzına</em><br />yansıt.</h1>
            <p className="hero-lead">Özgün tasarım. Zamansız işçilik. Sadece sana ait temiz ve ince bir iz.</p>
            <div className="hero-actions">
              <a className="primary-action" href="#booking">Randevu al <span>→</span></a>
              <a className="secondary-action" href="#work">Çalışmaları gör <span>↓</span></a>
            </div>
          </div>
          <div className="hero-stats fade-in-section">
            <div>
              <strong>15+</strong>
              <span>Yıl deneyim</span>
            </div>
            <div>
              <strong>10+</strong>
              <span>Uzmanlık alanı</span>
            </div>
            <div>
              <strong>∞</strong>
              <span>Özgün tasarım</span>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-image fade-in-section" />
        </div>
      </section>

      <section className="manifesto fade-in-section" id="studio">
        <p className="section-label">01 — STÜDYO</p>
        <div>
          <h2>Dövme, yalnızca bir görüntü değil.</h2>
          <p>Ruby Tattoo Studio, 2008’den beri kişisel hikâyeleri zamansız, ince ve modern tasarımlara dönüştürüyor. Her çizgi; fikrinize, teninize ve size özel.</p>
          <a className="text-link" href="#booking">Hikâyeni anlat <span>→</span></a>
        </div>
        <div aria-hidden="true" />
      </section>

      <section className="works fade-in-section" id="work">
        <div className="section-head">
          <p className="section-label">02 — SEÇİLİ İŞLER</p>
          <div>
            <h2>Portfolyo</h2>
          </div>
        </div>
        <div className="work-grid">
          {works.map((work) => (
            <article className="work-card fade-in-section" key={work.no}>
              <div className="work-art" style={{ backgroundImage: `url(${work.image})` }} />
              <div className="work-info">
                <div>
                  <h3>{work.title}</h3>
                  <p>{work.meta}</p>
                </div>
                <span>→</span>
              </div>
            </article>
          ))}
        </div>

      </section>

      <section className="piercing fade-in-section" id="piercing">
        <div className="section-head piercing-head">
          <p className="section-label">03 — PIERCING</p>
          <div>
            <h2>Piercing</h2>
            <p>Stiline ve anatomine uygun, hijyenik ve özenli uygulamalar.</p>
          </div>
        </div>
        <div className="piercing-grid">
          {piercings.map((piercing) => (
            <article className="piercing-card fade-in-section" key={piercing.no}>
              <div className="piercing-art">
                <img src={piercing.image} alt={`${piercing.title} piercing uygulaması`} loading="lazy" />
              </div>
              <div className="work-info">
                <div>
                  <h3>{piercing.title}</h3>
                  <p>{piercing.meta}</p>
                </div>
                <span>→</span>
              </div>
            </article>
          ))}
        </div>
        <a className="outline-button" href="#booking">Piercing randevusu al →</a>
      </section>

      <section className="artists fade-in-section" id="artists">
        <p className="section-label">04 — SANATÇILAR</p>
        <div className="artist-intro">
          <h2>Private dövme stüdyosu</h2>
          <p>Fikriniz için doğru stil, doğru el ve doğru yaklaşım. Temiz, steril ve güvende hissedebileceğiniz bir deneyim için sanatçılarımızı tanıyın.</p>
        </div>
        <div className="artist-list">
          {["Fine line & botanical", "Minimalism & geometric", "Blackwork & dotwork"].map((style, i) => (
            <div className="artist-row fade-in-section" key={style}>
              <span>0{i + 1}</span>
              <h3>RUBY ARTIST {i + 1}</h3>
              <p>{style}</p>
              <div className="artist-photo-placeholder" />
              <b>→</b>
            </div>
          ))}
        </div>
      </section>

      <section className="quote fade-in-section">
        <blockquote>Tasarımdan uygulamaya kadar kendimi çok güvende hissettim. Sonuç, hayal ettiğimden daha zarif ve tamamen bana ait.</blockquote>
        <p>— STÜDYO MİSAFİRİ · BALIKESİR</p>
        <div className="quote-nav">
          <span>01 / 03</span>
          <button aria-label="Önceki yorum">←</button>
          <button aria-label="Sonraki yorum">→</button>
        </div>
      </section>

      <section className="faq fade-in-section" id="faq">
        <div>
          <p className="section-label">05 — MERAK EDİLENLER</p>
          <h2>Sormadan önce.</h2>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <div className={activeFaq === index ? "faq-item active" : "faq-item"} key={question}>
              <button onClick={() => setActiveFaq(activeFaq === index ? -1 : index)} aria-expanded={activeFaq === index}>
                <span>0{index + 1}</span>
                {question}
                <b>{activeFaq === index ? "−" : "+"}</b>
              </button>
              <div><p>{answer}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="booking fade-in-section" id="booking">
        <div className="booking-title">
          <p className="section-label">06 — RANDEVU</p>
          <h2>Tarzına uygun <em>dövme için</em> randevu oluştur.</h2>
          <p>Formu doldur, ekibimiz 24 saat içinde sana ulaşsın.</p>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>AD SOYAD<input type="text" placeholder="Adınız Soyadınız" required /></label>
          <label>TELEFON<input type="tel" placeholder="05__ ___ __ __" required /></label>
          <label>İLGİLENDİĞİNİZ STİL
            <select defaultValue="">
              <option value="" disabled>Bir stil seçin</option>
              <option>Fine line</option>
              <option>Blackwork</option>
              <option>Realism</option>
              <option>Dotwork</option>
              <option>Micro Realism</option>
              <option>Traditional</option>
              <option>Old School</option>
              <option>Minimalist</option>
              <option>Color</option>
              <option>Piercing</option>
              <option>Kararsızım</option>
            </select>
          </label>
          <label>FİKRİNİZ<textarea placeholder="Boyut, bölge ve fikrinizden kısaca bahsedin..." rows={3} /></label>
          <button type="submit">Randevu talebi gönder <span>→</span></button>
          <small>Göndererek kişisel verilerinizin randevu amacıyla işlenmesini kabul edersiniz.</small>
        </form>
      </section>

      <footer className="fade-in-section">
        <div className="footer-logo">
          <strong>RUBY</strong>
          <span>TATTOO STUDIO · 2008</span>
        </div>
        <div>
          <p>BALIKESİR, TÜRKİYE</p>
        </div>
        <div>
          <p>İLETİŞİM</p>
          <a href="tel:+905555555555">+90 555 555 55 55</a>
          <a href="https://instagram.com/rubytattoo" target="_blank" rel="noreferrer">@rubytattoo</a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 RUBY TATTOO STUDIO</span>

          <a href="#top">YUKARI ↑</a>
        </div>
      </footer>
    </main>
  );
}
