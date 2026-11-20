import { sections } from './sections';

export const piercings = [
  {
    "title": "Kulak",
    "slug": "kulak",
    "order": [2, 5, 10, 11, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 26, 27, 28, 1, 3, 4, 6, 7, 8, 9, 12, 20, 25],
    "count": 28
  },
  {
    "title": "Burun",
    "slug": "burun",
    "order": [2, 5, 1, 3, 4],
    "count": 5
  },
  {
    "title": "Kaş",
    "slug": "kas",
    "order": [3, 1, 2],
    "count": 3
  },
  {
    "title": "Dudak-Ağız içi",
    "slug": "dudak",
    "order": [1, 2, 5, 6, 7, 3, 4],
    "count": 7
  },
  {
    "title": "Dermal",
    "slug": "dermal",
    "order": [1, 2],
    "count": 2
  },
  {
    "title": "Vücut",
    "slug": "vucut",
    "order": [1, 2, 3, 4, 5, 6],
    "count": 6
  }
];

export type VenuePhoto = { src: string; alt: string };
// Yeni çekimleri public/studio ve public/cafe klasörlerine ekleyip bu listeleri güncelleyin.
export const studioPhotos: VenuePhoto[] = [
  { src: `/studio/dsc09013.webp`, alt: "Stüdyonun genel görünümü" },
  { src: `/studio/dsc09017.webp`, alt: "Stüdyo girişi ve iç mekân" },
  { src: `/studio/kapak.webp`, alt: "Ruby Tattoo dış cephe ve tabelası" },
  { src: `/studio/dsc08987.webp`, alt: "Stüdyonun dövme uygulama alanı" },
  { src: `/studio/dsc08962.webp`, alt: "Piercing koleksiyonu vitrinleri" },
  { src: `/studio/dsc08968.webp`, alt: "Takı vitrini detayı" },
  { src: `/studio/dsc08971.webp`, alt: "Stüdyonun ahşap dekorasyonu" },
  { src: `/studio/dsc08977.webp`, alt: "Stüdyo aynası ve vitrin detayı" },
  { src: `/studio/dsc08998.webp`, alt: "Stüdyodaki heykel detayı" },
  { src: `/studio/dsc09002.webp`, alt: "Stüdyonun oturma alanı" },
  { src: `/studio/dsc09008.webp`, alt: "Ruby coffe" },
];
export const cafePhotos: VenuePhoto[] = [
  { src: `/cafe/rubycafe.webp`, alt: "Ruby Coffeeshop kahve ve şömine detayı" },
  { src: `/cafe/ruby-sign.webp`, alt: "Ruby Coffeeshop tabelası" },
];
export const scalpGroups = [[1,2], [3,4,5,6], [7,8,9], [10,11,12], [13,14]];

export const assetSlots = [
  {section: 'studio', path: '/studio/hero-v2.png', title: 'Ana sayfa kapak fotoğrafı'},
  {section: 'studio', path: '/studio/about-sign.webp', title: 'Hakkımızda fotoğrafı'},
  ...studioPhotos.map(({src, alt}) => ({section: 'studio', path: src, title: alt})),
  ...cafePhotos.map(({src, alt}) => ({section: 'cafe', path: src, title: alt})),
  ...['alper', 'fatih'].flatMap(artist => [
    {section: artist, path: `/artists/${artist}.jpeg`, title: 'Sanatçı portresi'},
    ...Array.from({length: 15}, (_, i) => ({
      section: artist, path: `/${artist}/oct-2026/${i + 1}.webp`, title: `Portfolyo fotoğrafı ${i + 1}`,
    })),
  ]),
  {section: 'alper', path: '/artists/alper-bear.jpeg', title: 'Hakkında · Ayıcık'},
  ...piercings.flatMap(({slug, order}) => [
    {section: `piercing-${slug}`, path: `/piercing/albums/${slug}/cover.webp`, title: 'Kategori kapağı'},
    ...order.map((n, i) => ({
      section: `piercing-${slug}`, path: `/piercing/albums/${slug}/${n}.webp`, title: `Albüm fotoğrafı ${i + 1}`,
    })),
  ]),
  ...scalpGroups.flatMap((group, i) => group.map((n, j) => ({
    section: 'scalp',
    path: `/scalp/${String(n).padStart(2, '0')}.webp`,
    title: `Uygulama ${i + 1} · ${j === 0 ? 'Öncesi' : j === 1 ? 'Sonrası' : `Diğer açı ${j - 1}`}`,
  }))),
].map(slot => ({
  ...slot,
  id: 'ruby-slot' + slot.path.replace(/[/.]/g, '-'),
}));

export const gallerySections = sections.map(([id, title]) => ({
  id,
  title,
  slots: assetSlots.filter(slot => slot.section === id),
}));
