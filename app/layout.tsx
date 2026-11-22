import type { Metadata } from "next";
import "./globals.css";
import { MediaProvider } from "./cms/provider";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = "https://rubytattoo.com.tr";
const ogImage = `${siteUrl}/og.png`;
const description = "Balıkesir’in ilk profesyonel dövme stüdyosu. 2008’den beri kişiye özel dövme, piercing ve saç simülasyonu. Ruby Coffeeshop.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: "Ruby Tattoo Studio | Balıkesir",
  description,
  icons: { icon: `${basePath}/ruby-logo.png` },
  openGraph: { title: "Ruby Tattoo Studio", description, type: "website", url: siteUrl, siteName: "Ruby Tattoo Studio", locale: "tr_TR", images: [{ url: ogImage, width: 1200, height: 630, alt: "Ruby Tattoo Studio" }] },
  twitter: { card: "summary_large_image", title: "Ruby Tattoo Studio", description, images: [ogImage] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body><MediaProvider>{children}</MediaProvider></body></html>;
}
