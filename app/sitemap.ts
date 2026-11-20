import type { MetadataRoute } from 'next';
import { publicadas } from '@/content/charlas';
import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/'), changeFrequency: 'monthly', priority: 1 },
    { url: absoluteUrl('/charlas/'), changeFrequency: 'weekly', priority: 0.8 },
    ...publicadas().map((c) => ({ url: absoluteUrl(`/charlas/${c.slug}/`), changeFrequency: 'yearly' as const, priority: 0.7 })),
  ];
}
