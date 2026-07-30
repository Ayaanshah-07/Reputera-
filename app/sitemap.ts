import type { MetadataRoute } from 'next';
import { services, site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/get-a-demo', priority: 0.95, changeFrequency: 'monthly' },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/portfolio', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/reviews', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path === '/' ? '' : route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...services.map((service) => ({
      url: `${site.url}/services/${service.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: service.flagship ? 0.9 : 0.85,
    })),
  ];
}
