import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const ogImage = `${protocol}://${host}/og.png`;
  const description = "2008'den beri özgün dövme tasarımları. Blackwork, fine line, realism ve lettering.";

  return {
    title: "Ruby Tattoo Studio | İstanbul",
    description,
    icons: { icon: "/ruby-logo.png" },
    openGraph: { title: "Ruby Tattoo Studio", description, type: "website", locale: "tr_TR", images: [{ url: ogImage, width: 1200, height: 630, alt: "Ruby Tattoo Studio" }] },
    twitter: { card: "summary_large_image", title: "Ruby Tattoo Studio", description, images: [ogImage] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body>{children}</body></html>;
}
