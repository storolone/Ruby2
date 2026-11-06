"use client";

import { useEffect, useState, useRef, type ChangeEvent, type FormEvent } from "react";

const artists = [
  {
    id: "alper",
    name: "Alper Ünal",
    role: "Kurucu · Dövme Sanatçısı · Piercer",
    portrait: "/artists/alper.jpeg",
    images: Array.from({ length: 15 }, (_, i) => i + 1),
    specialties: ["Dotwork", "Mandala", "Embroidery", "Sketch", "Maori", "Geometrik", "Watercolor", "Old / New School", "Fine Line", "Minimal", "Japanese (Irezumi)", "Trash Polka", "Anime", "Saç Simülasyonu"],
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
    images: Array.from({ length: 15 }, (_, i) => i + 1),
    specialties: ["Black and gray realism", "Colored realism", "Micro realism", "Portrait", "Animal realism", "Black work", "Illustrative", "Cover-up", "Custom tattoo", "Trash polka", "Watercolor"],
    bio: [
      "1992 yılında Balıkesir’de doğdum. Görsel sanatlarla olan ilişkim yaklaşık 7-8 yaşlarında her gördüğüm yeri kâğıtlara çizmemle başladı, sonrasında ilkokul yıllarımda ise artarak devam etti. Ortaokul yıllarında ufak tefek paralar karşılığında arkadaşlarımın sıralarına ya da kollarına tükenmez kalemle istedikleri görselleri çizerdim, tüm bunlar olurken ileride bir dövme sanatçısı olacağımı tabii ki bilmiyordum.",
      "Lise çağıma geldiğim zaman kendi isteğim ile güzel sanatlar lisesine gitmek istedim ve sınavlarına girdim, daha sonra Balıkesir Kadriye Kemal Gürel Güzel Sanatlar Lisesini kazanıp kariyer basamaklarına akademik eğitimi de eklemiş oldum.",
      "2008 yılında açılan Ruby Tattoo’da 2009 yılında çalışmaya başlayarak emin adımlarla profesyonel dövme sanatçısı olma yolculuğuma çıkmış oldum. Lise yıllarında başlayan bu serüvene Marmara Güzel Sanatlar Fakültesini kazandıktan sonra bir süreliğine İstanbul’da devam ettim, orada Türkiye’nin ilk profesyonel dövme stüdyolarından birinde bir süre çalıştıktan sonra oradan ayrılıp bir stüdyonun işletmesini devraldım.",
      "Bir zaman sonra tekrar Balıkesir’e dönerek profesyonel dövme sanatçısı olarak Ruby Tattoo bünyesinde sanatımı icra etmeye başladım.",
      "Uzmanlaştığım ve kendimi daha rahat hissettiğim alanlar ise Realism, Fullcolor, Microrealism, Watercolor ve Portrait gibi detaylı gölge oyunlarıyla dolu modelleri örnek gösterebilirim.",
      "Bu yolculukta öğrenmekten ve gelişmekten asla bıkmadığım, her çıkan yeni işte dövme yaptırmak için beni tercih eden herkese kattığım yeni bir hatıra veya hikâyeden sonra yüzlerinde gördüğüm memnuniyetten dolayı işimi ve icra ettiğim sanatı her geçen gün daha çok seviyorum.",
    ],
  },
] as const;

// Portfolyo görselleri sanatçının images listesinden seçilir.
const portfolios = Object.fromEntries(
  artists.map((artist) => [
    artist.id,
    artist.images.map((image, index) => ({
      no: String(index + 1).padStart(2, "0"),
      image: `/${artist.id}/oct-2026/${image}.webp`,
    })),
  ]),
) as Record<(typeof artists)[number]["id"], { no: string; image: string }[]>;

const piercings = [
  {
    "title": "Kulak",
    "slug": "kulak",
    "count": 28
  },
  {
    "title": "Burun",
    "slug": "burun",
    "count": 5
  },
  {
    "title": "Kaş",
    "slug": "kas",
    "count": 3
  },
  {
    "title": "Dudak-Ağız içi",
    "slug": "dudak",
    "count": 7
  },
  {
    "title": "Dermal",
    "slug": "dermal",
    "count": 2
  },
  {
    "title": "Vücut",
    "slug": "vucut",
    "count": 6
  }
];

type VenuePhoto = { src: string; alt: string };
// Yeni çekimleri public/studio ve public/cafe klasörlerine ekleyip bu listeleri güncelleyin.
const studioPhotos: VenuePhoto[] = [
  { src: "/studio/dsc09013.webp", alt: "Stüdyonun genel görünümü" },
  { src: "/studio/dsc09017.webp", alt: "Stüdyo girişi ve iç mekân" },
  { src: "/studio/kapak.webp", alt: "Ruby Tattoo dış cephe ve tabelası" },
  { src: "/studio/dsc08987.webp", alt: "Stüdyonun dövme uygulama alanı" },
  { src: "/studio/dsc08962.webp", alt: "Piercing koleksiyonu vitrinleri" },
  { src: "/studio/dsc08968.webp", alt: "Takı vitrini detayı" },
  { src: "/studio/dsc08971.webp", alt: "Stüdyonun ahşap dekorasyonu" },
  { src: "/studio/dsc08977.webp", alt: "Stüdyo aynası ve vitrin detayı" },
  { src: "/studio/dsc08998.webp", alt: "Stüdyodaki heykel detayı" },
  { src: "/studio/dsc09002.webp", alt: "Stüdyonun oturma alanı" },
  { src: "/studio/dsc09008.webp", alt: "Ruby coffe" },
];
const cafePhotos: VenuePhoto[] = [
  { src: "/cafe/rubycafe.webp", alt: "Ruby Coffeeshop kahve ve şömine detayı" },
  { src: "/cafe/ruby-sign.webp", alt: "Ruby Coffeeshop tabelası" },
];
const scalpGroups = [[1,2], [3,4,5,6], [7,8,9], [10,11,12], [13,14]];



function PiercingAlbums() {
  const [album, setAlbum] = useState(piercings[0]);
  const [photo, setPhoto] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const step = (delta: number) => {
    const rail = track.current;
    if (!rail) return;
    const next = (Math.round(rail.scrollLeft / rail.clientWidth) + delta + album.count) % album.count;
    rail.scrollTo({ left: next * rail.clientWidth, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return <>
    <div className="album-picker" aria-label="Piercing albümleri">
      {piercings.map(item => <button key={item.slug} type="button" className="album-cover"
        aria-pressed={album.slug === item.slug} aria-controls="piercing-view" onClick={() => { if (album.slug !== item.slug) { setAlbum(item); setPhoto(0); } }}>
        <img src={`/piercing/albums/${item.slug}/cover.webp`} alt="" loading="lazy" />
        <span>{item.title}</span>
      </button>)}
    </div>
    <div className="album-view" id="piercing-view">
      <div><p className="section-label">UYGULAMA ALBÜMÜ</p><h3>{album.title} piercing</h3>
        <div className="album-nav"><button type="button" aria-label="Önceki piercing fotoğrafı" onClick={() => step(-1)}>←</button>
          <span aria-live="polite" aria-atomic="true">{album.title} · {photo + 1} / {album.count}</span>
          <button type="button" aria-label="Sonraki piercing fotoğrafı" onClick={() => step(1)}>→</button></div>
      </div>
      <div className="piercing-viewer">
      <div className="piercing-slides" ref={track} key={album.slug} role="region" aria-label={`${album.title} fotoğraf slaytları`} tabIndex={0}
        onKeyDown={e => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); step(e.key === "ArrowRight" ? 1 : -1); } }}
        onScroll={e => { const rail = e.currentTarget; setPhoto(Math.min(album.count - 1, Math.max(0, Math.round(rail.scrollLeft / rail.clientWidth)))); }}>
        {Array.from({length: album.count}, (_, i) => <div className="piercing-slide" key={i}>
          <img src={`/piercing/albums/${album.slug}/${i + 1}.webp`} alt={`${album.title} piercing örneği ${i + 1}`} loading="lazy" />
        </div>)}
      </div>
        <div className="piercing-previews" role="group" aria-label="Fotoğraf önizlemeleri">
          {(album.count === 2 ? [0, 1] : [-1, 0, 1]).map(offset => {
            const n = (photo + offset + album.count) % album.count + 1;
            const label = offset < 0 ? "Önceki" : offset > 0 ? "Sonraki" : "Seçili";
            return <button type="button" key={offset} aria-label={`${label} fotoğraf: ${n}`}
              aria-current={offset === 0 ? "true" : undefined} onClick={() => offset && step(offset)}>
              <img src={`/piercing/albums/${album.slug}/${n}.webp`} alt="" />
            </button>;
          })}
        </div>
      </div>
    </div>
  </>;
}

function StudioSpiral() {
  const [active, setActive] = useState(0);
  const startX = useRef<number | null>(null);
  const suppressClick = useRef(false);
  const move = (step: number) => setActive(value => (value + step + studioPhotos.length) % studioPhotos.length);
  return <div className="studio-spiral" role="region" aria-label="Stüdyo fotoğraf galerisi" aria-roledescription="karusel">
    <div className="spiral-stage" onTouchStart={event => { startX.current = event.touches[0].clientX; suppressClick.current = false; }} onTouchEnd={event => {
      if (startX.current !== null) { const delta = event.changedTouches[0].clientX - startX.current; if (Math.abs(delta) > 45) { move(delta < 0 ? 1 : -1); suppressClick.current = true; } }
      startX.current = null;
    }} onClickCapture={event => { if (suppressClick.current) { event.preventDefault(); suppressClick.current = false; } }}>
      {studioPhotos.map((photo, index) => {
        let offset = (index - active + studioPhotos.length) % studioPhotos.length;
        if (offset > studioPhotos.length / 2) offset -= studioPhotos.length;
        return <a key={photo.src} className="spiral-photo" data-offset={offset} href={photo.src} target="_blank" rel="noreferrer" tabIndex={offset === 0 ? 0 : -1} aria-hidden={offset !== 0} aria-label={`${photo.alt}, büyük aç`}>
          <img src={photo.src} alt={photo.alt} loading="lazy" draggable="false" />
        </a>;
      })}
    </div>
    <div className="spiral-controls">
      <button type="button" onClick={() => move(-1)} aria-label="Önceki stüdyo fotoğrafı">←</button>
      <p aria-live="polite" aria-atomic="true"><span>{String(active + 1).padStart(2, "0")} / {String(studioPhotos.length).padStart(2, "0")}</span>{studioPhotos[active].alt}</p>
      <button type="button" onClick={() => move(1)} aria-label="Sonraki stüdyo fotoğrafı">→</button>
    </div>
  </div>;
}

function ArtistDeck({ artist }: { artist: (typeof artists)[number] }) {
  const photos = portfolios[artist.id].map(work => ({ src: work.image, alt: `${artist.name} dövme çalışması ${work.no}` }));
  const [active, setActive] = useState(0);
  const startX = useRef<number | null>(null);
  const suppressClick = useRef(false);
  const move = (step: number) => setActive(value => (value + step + photos.length) % photos.length);
  return <div className="artist-deck" role="region" aria-label={`${artist.name} portfolyo galerisi`} aria-roledescription="karusel">
    <div className="deck-stage" onTouchStart={event => { startX.current = event.touches[0].clientX; suppressClick.current = false; }} onTouchEnd={event => {
      if (startX.current !== null) { const delta = event.changedTouches[0].clientX - startX.current; if (Math.abs(delta) > 45) { move(delta < 0 ? 1 : -1); suppressClick.current = true; } }
      startX.current = null;
    }} onClickCapture={event => { if (suppressClick.current) { event.preventDefault(); suppressClick.current = false; } }}>
      {photos.map((photo, index) => {
        let offset = (index - active + photos.length) % photos.length;
        if (offset > photos.length / 2) offset -= photos.length;
        return <a key={photo.src} className="deck-photo" data-offset={offset} href={photo.src} target="_blank" rel="noreferrer" tabIndex={offset === 0 ? 0 : -1} aria-hidden={offset !== 0} aria-label={`${photo.alt}, büyük aç`}>
          <img src={photo.src} alt={photo.alt} loading="lazy" draggable="false" />
        </a>;
      })}
    </div>
    <div className="spiral-controls">
      <button type="button" onClick={() => move(-1)} aria-label={`${artist.name} önceki çalışma`}>←</button>
      <p aria-live="polite" aria-atomic="true"><span>{String(active + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span>{photos[active].alt}</p>
      <button type="button" onClick={() => move(1)} aria-label={`${artist.name} sonraki çalışma`}>→</button>
    </div>
  </div>;
}

function VenueGallery({ images, label }: { images: VenuePhoto[]; label: string }) {
  if (!images.length) return <p className="gallery-note">{label} fotoğrafları yakında burada.</p>;
  return <div className="venue-gallery">
    {images.map((photo, index) => <figure key={photo.src}>
      <a href={photo.src} target="_blank" rel="noreferrer" aria-label={`${label} fotoğrafı ${index + 1}, tam boy aç`}>
        <img src={photo.src} alt={photo.alt} loading="lazy" />
      </a>
      <figcaption>{String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")} · {label}</figcaption>
    </figure>)}
  </div>;
}

const faqs = [
  ["Randevu süreci nasıl işliyor?", "Formu doldurduktan sonra ekibimiz 24 saat içinde size ulaşır. Tasarım fikri, ölçü, bölge ve uygun sanatçı birlikte netleştirilir."],
  ["Fiyatlandırma nasıl yapılıyor?", "Her çalışma; boyut, detay, yerleşim ve seans süresine göre ayrı fiyatlandırılır. Net teklif ücretsiz ön görüşmeden sonra paylaşılır."],
  ["Kişiye özel tasarım yapıyor musunuz?", "Evet. Her tasarım yalnızca size özel hazırlanır; referanslarınız sanatçının özgün diliyle yeniden yorumlanır."],
  ["İlk dövmem için ne önerirsiniz?", "Kararınızı aceleye getirmeyin. Ekibimiz yerleşim, ölçü, stil ve bakım süreci konusunda sizi yönlendirir."],
];

export default function Home() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".site-header");
    if (!header) return;
    const updateHeight = () => document.documentElement.style.setProperty("--site-header-height", `${header.getBoundingClientRect().height}px`);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);
    return () => { observer.disconnect(); document.documentElement.style.removeProperty("--site-header-height"); };
  }, []);

  const [reference, setReference] = useState<File | null>(null);
  const [referencePreview, setReferencePreview] = useState("");
  const [fileError, setFileError] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");

  useEffect(() => () => {
    if (referencePreview) URL.revokeObjectURL(referencePreview);
  }, [referencePreview]);

  const handleReferenceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileError("");
    setBookingStatus("");
    setReference(null);
    setReferencePreview("");
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 10 * 1024 * 1024) {
      setFileError("Lütfen en fazla 10 MB boyutunda JPG, PNG veya WebP fotoğraf seçin.");
      event.target.value = "";
      return;
    }
    setReference(file);
    setReferencePreview(URL.createObjectURL(file));
  };
  const [activeFaq, setActiveFaq] = useState(0);

  const handleBookingSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get("fullName") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const idea = String(formData.get("idea") ?? "").trim();
    const message = [
      "Merhaba Ruby Tattoo Studio, randevu talebi oluşturmak istiyorum.",
      "",
      `Ad Soyad: ${fullName}`,
      `Telefon: ${phone}`,
      ...(reference ? [`Dövme referansım: ${reference.name}`] : []),
      `Fikrim: ${idea || "Henüz belirtmedim."}`,
    ].join("\n");

    if (reference && navigator.canShare?.({ files: [reference] })) {
      try {
        await navigator.share({ files: [reference], text: message, title: "Ruby Tattoo · Dövme randevusu" });
        setBookingStatus("Paylaşım ekranı kapandı. Randevu talebinizin Ruby Tattoo’ya gönderildiğini seçtiğiniz uygulamadan kontrol edin.");
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
      }
    }
    setBookingStatus(reference
      ? "WhatsApp’ta mesajınızı gönderirken seçtiğiniz fotoğrafı ataç / + düğmesiyle ayrıca ekleyin. Fotoğraf otomatik aktarılmadı."
      : "WhatsApp’ta açılan mesajı kontrol edip gönderin.");
    window.open(`https://wa.me/905363312002?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

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
        <nav className="nav" aria-label="Ana menü">
          <a href="#studio">Stüdyo</a>
          <a href="#about">Hakkımızda</a>
          <a href="#artists">Sanatçılar</a>
          <a href="#piercing">Piercing</a>
          <a href="#scalp">Saç simülasyonu</a>
          <a href="#cafe">Kafe</a>
          <a href="#faq">SSS</a>
        </nav>
        <a className="header-cta" href="#booking">Randevu Al <span>→</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-left">
          <div className="hero-copy">
            <h1>Ruby <em>Tattoo</em></h1>
            <p className="hero-lead">Balıkesir’in ilk profesyonel dövme stüdyosu</p>
            <div className="hero-actions">
              <a className="primary-action" href="#booking">Randevu Al <span>→</span></a>
              <a className="secondary-action" href="#artists">Sanatçıları tanı <span>↓</span></a>
            </div>
          </div>
          <ul className="hero-stats" aria-label="Ruby Tattoo hizmetleri">
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9 M12 7v5l3 2 M17 3v6 M14 6h6" /></svg><span>20+ yıl deneyim</span></li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20l4-1L20 7l-3-3L5 16l-1 4 M14 7l3 3 M3 8h6 M6 5v6" /></svg><span>Alanında uzmanlaşmış dövme sanatçıları</span></li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20h16 M5 15l10-10 4 4L9 19H5v-4 M13 7l4 4" /></svg><span>Kişiye özel tasarım</span></li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 17c0-3-4-3-4-7a8 8 0 0 1 16 0c0 4-3 4-4 7-1 5-8 5-8 0 M9 10a3 3 0 0 1 6 0c0 2-3 2-3 4" /></svg><span>Profesyonel piercer kadrosu</span></li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4l7 7 M8 5l3-3 5 5-3 3 M14 14l6 6 M17 12h4 M12 17v4 M4 20l5-5" /></svg><span>Lazer dövme silme</span></li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 5c0 17 16 17 16 0 M7 5c0 12 10 12 10 0 M10 18l2 3 2-3" /></svg><span>Aksesuar</span></li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5a8 8 0 1 0 8 0 M8 3v4 M16 3v4" /></svg><span>Yüksek sayıda piercing modeli</span></li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 9h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9 M16 10h2a3 3 0 0 1 0 6h-2 M7 3v3 M11 2v4 M3 22h16" /></svg><span>Ruby Coffeeshop</span></li>
          </ul>
        </div>
        <div className="hero-right">
          <div className="hero-image" />
        </div>
      </section>

      <section className="venue-section fade-in-section" id="studio">
        <div className="section-head">
          <p className="section-label">01 — STÜDYO</p>
          <div><h2>Stüdyomuz</h2><p className="section-intro">Ruby Tattoo’dan kareler.</p></div>
        </div>
        <StudioSpiral />
      </section>

      <section className="manifesto fade-in-section" id="about">
        <p className="section-label">02 — HAKKIMIZDA</p>
        <div>
          <h2>Hakkımızda</h2>
          <p>Balıkesir’in ilk profesyonel dövme stüdyosu olma özelliğini taşıyan stüdyomuz 2008 yılından bu yana faaliyet göstermektedir. Uzun yıllardır aynı sanatçı kadrosuyla çalışan ve standartlarını açıldığı günden bu yana koruyan bir yapıya sahiptir. Farklı tarzlarda, alanında uzun yıllardır çalışan dövme sanatçılarımız sayesinde farklı beğenilere sahip dövme severlere hitap edebilecek geniş bir işçilik alanına sahiptir. Keyifli ve rahat çalışma alışkanlıklarını profesyonelleşirken kaybetmeyerek dövme yaptırmak için gelen misafirlerine de rahat bir ortam sağlamasıyla tanınmıştır.
          </p>
          <p>Hem dövme hem piercing alanında uzman ve donanımlı kadrosu, stüdyonun kalanından ayrılmış dövme çalışma alanları, piercing odaları ile hemen karşısında bulunan ve misafirlerimizi ağırladığımız kafemiz Ruby Coffeeshop’ıyla her yönden tam donanımlı bir dövme stüdyosudur. Bunun yanında Türkiye çapında en kapsamlı piercing modeli çeşitliliği olan nadir stüdyolardan olduğunu rahatlıkla söyleyebiliriz.
          </p>
        </div>
        <figure className="about-photo"><img src="/studio/about-sign.webp" alt="Ruby Tattoo neon tabelası" loading="lazy" /></figure>
      </section>

      <section className="works artists-section" id="artists">
        <div className="section-head">
          <p className="section-label">03 — SANATÇILAR</p>
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
                  <span>0{index + 1}</span>
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
                  <div className="artist-about-aside"><p className="section-label">HAKKINDA</p>{artist.id === "alper" && <img className="artist-bear" src="/artists/alper-bear.jpeg" alt="Alper’in ayıcığı" loading="lazy" />}</div>
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
                  <span>{artist.images.length} çalışma</span>
                </div>
                <ArtistDeck artist={artist} />
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="piercing fade-in-section" id="piercing">
        <div className="section-head piercing-head">
          <p className="section-label">04 — PIERCING</p>
          <div>
            <h2>Piercing</h2>
            <p>Tarzınıza ve anatominize uygun hijyenik ve özenli uygulamalar</p>
          </div>
        </div>
        <PiercingAlbums />
        <p className="walk-in-note">Dermal piercing dışındaki piercing delimleri için 12:00 - 20:00 saatleri arasında randevu almadan gelebilirsiniz.</p>
      </section>

      <section className="service-section fade-in-section" id="scalp">
        <p className="section-label">05 — SAÇ SİMÜLASYONU</p>
        <div>
          <h2>Saç simülasyonu</h2>
          <p>Saç simülasyonu uygulamalarımız hakkında bilgi almak ve beklentilerinizi Alper Ünal ile konuşmak için bize ulaşın.</p>
          <a className="text-link" href="https://wa.me/905363312002?text=Merhaba%2C%20sa%C3%A7%20sim%C3%BClasyonu%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noreferrer">Bilgi al <span>→</span></a>
        </div>
        <div className="case-list">
          {scalpGroups.map(([before, after, ...details], i) => {
            const src = (n: number) => `/scalp/${String(n).padStart(2, "0")}.webp`;
            return <article className="case-study" key={before}>
              <h3>Uygulama {String(i + 1).padStart(2, "0")}</h3>
              <div className="case-pair">{[before, after].map((n, j) => {
                const label = j === 0 ? "Öncesi" : "Sonrası";
                return <figure key={n}><figcaption>{label}</figcaption>
                  <a href={src(n)} target="_blank" rel="noreferrer"><img src={src(n)} alt={`Uygulama ${i + 1} — ${label}`} loading="lazy" /></a>
                </figure>;
              })}</div>
              {details.length > 0 && <div className="case-details"><span>Diğer açılar</span>{details.map((n, j) =>
                <a key={n} href={src(n)} target="_blank" rel="noreferrer"><img src={src(n)} alt={`Uygulama ${i + 1}, diğer açı ${j + 1}`} loading="lazy" /></a>
              )}</div>}
            </article>;
          })}
        </div>
      </section>

      <section className="venue-section cafe-section fade-in-section" id="cafe">
        <div className="section-head">
          <p className="section-label">06 — KAFE</p>
          <div><h2>Ruby Coffeeshop</h2><p className="section-intro">Stüdyomuzun hemen karşısında bir kahve molası.</p></div>
        </div>
        <VenueGallery images={cafePhotos} label="Ruby Coffeeshop" />
      </section>

      <section className="faq fade-in-section" id="faq">
        <div>
          <p className="section-label">07 — MERAK EDİLENLER</p>
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
          <p className="section-label">08 — RANDEVU</p>
          <h2>Tarzına uygun <em>dövme için</em> randevu oluştur.</h2>
          <p>Formu doldur, ekibimiz 24 saat içinde sana ulaşsın.</p>
        </div>
        <form onSubmit={handleBookingSubmit}>
          <label>AD SOYAD<input type="text" name="fullName" autoComplete="name" placeholder="Adınız Soyadınız" required /></label>
          <label>TELEFON<input type="tel" name="phone" autoComplete="tel" placeholder="05__ ___ __ __" required /></label>
          <label htmlFor="tattoo-reference">YAPTIRMAK İSTEDİĞİNİZ DÖVME
            <input id="tattoo-reference" type="file" name="reference" accept="image/jpeg,image/png,image/webp" onChange={handleReferenceChange} aria-describedby="reference-help reference-error" />
          </label>
          <small id="reference-help">Dosya yükleyin</small>
          <p id="reference-error" className="form-error" role="alert">{fileError}</p>
          {reference && <div className="reference-preview">
            {referencePreview && <img src={referencePreview} alt="Seçtiğiniz dövme referansı" />}
            <span>{reference.name}</span>
            <button type="button" onClick={() => {
              setReference(null);
              setReferencePreview("");
              setBookingStatus("");
              const input = document.getElementById("tattoo-reference") as HTMLInputElement | null;
              if (input) input.value = "";
            }}>Fotoğrafı kaldır</button>
          </div>}
          <label>FİKRİNİZ<textarea name="idea" placeholder="Boyut, bölge ve fikrinizden kısaca bahsedin..." rows={3} /></label>
          <button type="submit">Randevu Al <span>→</span></button>
          <p className="booking-status" role="status">{bookingStatus}</p>
        </form>
      </section>

      <footer className="fade-in-section">
        <div className="footer-logo">
          <span className="footer-logo-frame">
            <img src="/ruby-studio-logo.png" alt="Ruby Tattoo Studio" />
          </span>
        </div>
        <div className="footer-location">
          <p>KONUM</p>
          <iframe
            className="footer-map"
            title="Ruby Tattoo Dövme Stüdyosu konumu"
            src="https://www.google.com/maps?q=Ruby%20Tattoo%20D%C3%B6vme%20St%C3%BCdyosu%2C%20Eski%20Kuyumcular%2C%2013003%20Sokak%20No%3A4%2FC%2C%2010010%20Karesi%2FBal%C4%B1kesir&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            className="footer-address"
            href="https://www.google.com/maps/search/?api=1&query=Ruby%20Tattoo%20D%C3%B6vme%20St%C3%BCdyosu%2C%20Eski%20Kuyumcular%2C%2013003%20Sokak%20No%3A4%2FC%2C%2010010%20Karesi%2FBal%C4%B1kesir"
            target="_blank"
            rel="noreferrer"
          >
            Eski Kuyumcular, 13003 Sokak No:4/C, 10010 Karesi/Balıkesir <span>↗</span>
          </a>
        </div>
        <div>
          <p>İLETİŞİM</p>
          <a href="https://wa.me/905363312002" target="_blank" rel="noreferrer">Wp: 0536 331 20 02</a>
          <a href="tel:+902662432001">Sabit Hat: 0266 243 20 01</a>
          <a href="https://www.instagram.com/ruby_tattoostudio/" target="_blank" rel="noreferrer">@ruby_tattoostudio</a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 RUBY TATTOO STUDIO</span>

          <a href="#top">YUKARI ↑</a>
        </div>
      </footer>
    </main>
  );
}
