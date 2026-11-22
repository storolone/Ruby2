import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return {
    rules: { userAgent: '*', allow: '/', disallow: [`${basePath}/admin`, `${basePath}/admin/`] },
    sitemap: 'https://rubytattoo.com.tr/sitemap.xml',
  };
}
