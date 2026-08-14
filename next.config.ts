import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    tsconfigPath: "tsconfig.next.json",
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
