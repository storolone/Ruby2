import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl =
  process.env.SITE_URL ??
  (process.env.GITHUB_PAGES === "true"
    ? "https://storolone.github.io"
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000");
const ogImage = `${siteUrl}${basePath}/og.png`;
const description = "Balıkesir’in ilk profesyonel dövme stüdyosu. 2008’den beri kişiye özel dövme, piercing ve saç simülasyonu. Ruby Coffeeshop.";

export const metadata: Metadata = {
  title: "Ruby Tattoo Studio | Balıkesir",
  description,
  icons: { icon: `${basePath}/ruby-logo.png` },
  openGraph: { title: "Ruby Tattoo Studio", description, type: "website", locale: "tr_TR", images: [{ url: ogImage, width: 1200, height: 630, alt: "Ruby Tattoo Studio" }] },
  twitter: { card: "summary_large_image", title: "Ruby Tattoo Studio", description, images: [ogImage] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body>{children}</body></html>;
}
