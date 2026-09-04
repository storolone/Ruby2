"use client";

import { useEffect, useState } from "react";

const artists = [
  {
    id: "alper",
    name: "Alper Ünal",
    role: "Kurucu · Dövme Sanatçısı",
    portrait: "/artists/alper.jpeg",
    imageCount: 64,
    since: "2004'ten beri",
    specialties: ["Dotwork", "Mandala", "Embroidery", "Sketch", "Maori", "Geometrik", "Watercolor", "Old / New School"],
    bio: [
      "1984 Ankara doğumluyum. Kariyerime sanırım 6–7 yaşlarında, çocukluk ayıcığıma çizdiğim dövmelerle başlamış olabilirim. Yıllar içinde el sanatlarına olan ilgim artarak devam etti ve çeşitlendi.",
      "19 yaşımda üniversite eğitimim için geldiğim Balıkesir’de, elime geçen eski bir dövme makinesiyle bu meslekle gerçek anlamda tanıştım. Dövmenin kötü ve aşağı görüldüğü, Türkiye’de çok az kişinin profesyonel olarak bu işi yaptığı o yıllarda bu yeni dünya beni büyüledi. El sanatlarındaki detaycı yapım, bu alanda ilerlememe büyük katkı sağladı.",
      "2004 yılında Kuşadası’nda profesyonel kariyerime başladım. Ardından Antalya bölgesinde, Alanya ve Side’de dövme sanatçısı olarak çalıştım.",
      "2008 yılında Balıkesir’in ilk profesyonel dövme stüdyosu Ruby Tattoo’yu açtım. Daha önce çalıştığım yerlerdeki olumsuzluklardan uzak bir stüdyo oluşturma hayaline odaklandım ve yanımda yeni dövme sanatçıları yetiştirmeye karar verdim.",
      "Yaptığı işte uzman, kişisel egodan uzak ve samimi; hem kendi aralarında hem de stüdyomuzun kapısından giren herkesle doğru ilişki kurabilen insanlardan oluşan bir ekip yaratmak temel ilkem oldu. Bugün Ruby Tattoo bünyesinde çok sevdiğim sanatımı aynı prensiplerle sürdürmeye devam ediyorum.",
    ],
  },
  {
    id: "fatih",
    name: "Fatih Özgön",
    role: "Dövme Sanatçısı",
    portrait: "/artists/fatih.jpeg",
    imageCount: 32,
    since: "Ruby Tattoo Studio",
    specialties: [],
    bio: [
      "1992 yılında Balıkesir’de doğdum. Görsel sanatlarla olan ilişkim yaklaşık 7-8 yaşlarında her gördüğüm yeri kâğıtlara çizmemle başladı, sonrasında ilkokul yıllarımda ise artarak devam etti. Ortaokul yıllarında ufak tefek paralar karşılığında arkadaşlarımın sıralarına ya da kollarına tükenmez kalemle istedikleri görselleri çizerdim, tüm bunlar olurken ileride bir dövme sanatçısı olacağımı tabii ki bilmiyordum. Lise çağıma geldiğim zaman kendi isteğim ile güzel sanatlar lisesine gitmek istedim ve sınavlarına girdim, daha sonra Balıkesir Kadriye Kemal Gürel Güzel Sanatlar Lisesini kazanıp kariyer basamaklarına akademik eğitimi de eklemiş oldum. 2008 yılında açılan Ruby Tattoo’da 2009 yılında çalışmaya başlayarak emin adımlarla profesyonel dövme sanatçısı olma yolculuğuma çıkmış oldum. Lise yıllarında başlayan bu serüvene Marmara Güzel Sanatlar Fakültesini kazandıktan sonra bir süreliğine İstanbul’da devam ettim, orada Türkiye’nin ilk profesyonel dövme stüdyolarından birinde bir süre çalıştıktan sonra oradan ayrılıp bir stüdyonun işletmesini devraldım. Bir zaman sonra tekrar Balıkesir’e dönerek profesyonel dövme sanatçısı olarak Ruby Tattoo bünyesinde sanatımı icra etmeye başladım. Uzmanlaştığım ve kendimi daha rahat hissettiğim alanlar ise Realism, Fullcolor, Microrealism, Watercolor ve Portrait gibi detaylı gölge oyunlarıyla dolu modelleri örnek gösterebilirim. Bu yolculukta öğrenmekten ve gelişmekten asla bıkmadığım, her çıkan yeni işte dövme yaptırmak için beni tercih eden herkese kattığım yeni bir hatıra veya hikâyeden sonra yüzlerinde gördüğüm memnuniyetten dolayı işimi ve icra ettiğim sanatı her geçen gün daha çok seviyorum.",
    ],
  },
] as const;

// Yeni fotoğraf eklemek için dosyayı public/alper veya public/fatih klasörüne
// sıradaki numarayla koyun (ör. 65.jpg). Ardından ilgili imageCount değerini 1 artırın.
const portfolios = Object.fromEntries(
  artists.map((artist) => [
    artist.id,
    Array.from({ length: artist.imageCount }, (_, index) => ({
      no: String(index + 1).padStart(2, "0"),
      image: `/${artist.id}/${index + 1}.jpg`,
    })),
  ]),
) as Record<(typeof artists)[number]["id"], { no: string; image: string }[]>;

const piercings = [
  { no: "01", title: "Conch", meta: "Kulak Piercingi → İç Kıkırdak", image: "/piercing/1.jpg" },
  { no: "02", title: "Helix", meta: "Kulak Piercingi → Dış/Orta Kıkırdak", image: "/piercing/2.jpg" },
  { no: "03", title: "Conch", meta: "Kulak Piercingi → İç Kıkırdak", image: "/piercing/3.jpg" },
  { no: "04", title: "Microdermal", meta: "Yüzey Piercingi → Cilt Altı", image: "/piercing/4.jpg" },
  { no: "05", title: "Medusa", meta: "Yüz Piercingi → Ağız ve Dudak", image: "/piercing/5.jpg" },
  { no: "06", title: "Helix", meta: "Kulak Piercingi → Dış/Orta Kıkırdak", image: "/piercing/6.jpg" },
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
          <img className="brand-logo" src="/ruby-studio-logo.png" alt="Ruby Tattoo Studio" />
        </a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Ana menü">
          <a href="#artists" onClick={() => setMenuOpen(false)}>Çalışmalar</a>
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
              <a className="secondary-action" href="#artists">Sanatçıları tanı <span>↓</span></a>
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
          <p>Baıkesir'in ilk profesyonel dövme stüdyosu olma özelliğini taşıyan stüdyomuz 2008 yılından bu yana faaliyet göstermektedir. Uzun yıllardır aynı sanatçı kadrosuyla çalışan ve standartlarını açıldığı günden bu yana koruyan bir yapıya sahiptir. Farklı tarzlarda, alanında uzun yıllardır çalışan dövme sanatçılarımız sayesinde farklı beğenilere sahip dövme severlere hitap edebilecek geniş bir işçilik alanına sahiptir. Keyifli ve rahat çalışma alışkanlıklarını profesyonelleşirken kaybetmeyerek dövme yaptırmak için gelen misafirlerine de rahat bir ortam sağlamasıyla tanınmıştır.
            Hem dövme hem piercing alanında uzman ve donanımlı kadrosu, stüdyonun kalanından ayrılmış dövme çalışma alanları, piercing odaları ile hemen karşısında bulunan ve misafirlerimizi ağırladığımız cafemiz "Ruby Coffeeshop"ıyla her yönden tam donanımlı bir dövme stüdyosudur. Bunun yanında Türkiye çapında en kapsamlı piercing modeli çeşitliliği olan nadir stüdyolardan olduğunu rahatlıkla söyleyebiliriz.
          </p>
          <a className="text-link" href="#booking">Hikâyeni anlat <span>→</span></a>
        </div>
        <div aria-hidden="true" />
      </section>

      <section className="works artists-section" id="artists">
        <div className="section-head">
          <p className="section-label">02 — SANATÇILAR</p>
          <div>
            <h2>Sanatçılarımız</h2>
            <p className="section-intro">Her sanatçının hikâyesini ve seçili işlerini kendi profilinde keşfedin.</p>
          </div>
        </div>
        <div className="portfolio-artist-list">
          {artists.map((artist, index) => (
            <details className="portfolio-artist artist-profile" key={artist.id}>
              <summary>
                <div className="artist-portrait">
                  <img src={artist.portrait} alt={`${artist.name}, Ruby Tattoo dövme sanatçısı`} />
                </div>
                <div className="artist-card-copy">
                  <span>0{index + 1} · {artist.since}</span>
                  <h3>{artist.name}</h3>
                  <p>{artist.role}</p>
                  <div className="artist-card-action">
                    Profili ve çalışmaları gör
                    <span className="artist-card-toggle" aria-hidden="true" />
                  </div>
                </div>
              </summary>
              <div className="artist-profile-content">
                <div className="artist-about">
                  <p className="section-label">HAKKINDA</p>
                  <div className="artist-bio">
                    {artist.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  {artist.specialties.length > 0 && (
                    <div className="artist-specialties">
                      <p className="section-label">ÇALIŞMAYI SEVDİĞİ ALANLAR</p>
                      <div>{artist.specialties.map((specialty) => <span key={specialty}>{specialty}</span>)}</div>
                    </div>
                  )}
                </div>
                <div className="artist-work-heading" id={`${artist.id}-works`}>
                  <p className="section-label">SEÇİLİ İŞLER</p>
                  <h4>{artist.name} portfolyosu</h4>
                  <span>{artist.imageCount} çalışma</span>
                </div>
                <div className="work-grid artist-inline-gallery">
                  {portfolios[artist.id].map((work) => (
                    <article className="work-card" key={`${artist.id}-${work.no}`}>
                      <div className="work-art">
                        <img src={work.image} alt={`${artist.name} dövme çalışması ${work.no}`} loading="lazy" />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </details>
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
