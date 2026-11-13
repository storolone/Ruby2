import type { NextConfig } from "next";

// GITHUB_PAGES=true ile derlenince site statik olarak /Ruby2 altına çıkarılır (GitHub Pages).
// Vercel derlemesi bu ayardan etkilenmez.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/Ruby2" : "";

const nextConfig: NextConfig = {
  typescript: {
    tsconfigPath: "tsconfig.next.json",
  },
  turbopack: {
    root: process.cwd(),
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isGithubPages
    ? { output: "export", basePath, trailingSlash: true, images: { unoptimized: true } }
    : {}),
};

export default nextConfig;
