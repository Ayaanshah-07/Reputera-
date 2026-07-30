import type { Metadata } from 'next';
import { site } from './site';

type PageMetaInput = {
  title: string;
  description: string;
  /** Path with leading slash, e.g. "/services/app-development". */
  path: string;
  /** Set false for thin/duplicate pages. */
  index?: boolean;
};

/**
 * Builds per-page metadata with a canonical URL and matching OG/Twitter cards.
 * `title` is used verbatim (no template suffix) so each page controls its own
 * full SERP title.
 */
export function pageMetadata({ title, description, path, index = true }: PageMetaInput): Metadata {
  const url = `${site.url}${path === '/' ? '' : path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } }
      : { index: false, follow: true },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: site.locale,
      url,
      title,
      description,
      images: [{ url: `${site.url}/opengraph-image`, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${site.url}/opengraph-image`],
    },
  };
}
