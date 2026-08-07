import { services, site, type Service } from './site';

/** JSON-LD builders. Rendered via the <JsonLd /> component. */

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  // Both types, so the entity reads as an Organization and as a service provider.
  '@type': ['Organization', 'ProfessionalService'],
  '@id': `${site.url}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  slogan: site.tagline,
  description: site.description,
  email: site.email,
  telephone: site.phone,
  areaServed: 'Worldwide',
  founder: [
    { '@type': 'Person', name: 'Ayaan Shah' },
    { '@type': 'Person', name: 'Shahid Khan' },
  ],
  knowsAbout: [
    'Custom software development',
    'Mobile app development',
    'Web development',
    'AI assistants and agents',
    'Reputation management',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Reputera services',
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.title,
        description: service.summary,
        url: `${site.url}/services/${service.slug}`,
      },
    })),
  },
});

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  publisher: { '@id': `${site.url}/#organization` },
  inLanguage: 'en',
});

export const serviceSchema = (service: Service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${site.url}/services/${service.slug}#service`,
  name: service.heading,
  serviceType: service.title,
  description: service.metaDescription,
  url: `${site.url}/services/${service.slug}`,
  provider: { '@id': `${site.url}/#organization` },
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `${service.title} capabilities`,
    itemListElement: service.capabilities.map((capability) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: capability.title, description: capability.body },
    })),
  },
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
});

export const breadcrumbSchema = (crumbs: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: `${site.url}${crumb.path === '/' ? '' : crumb.path}`,
  })),
});

export const softwareApplicationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Reputera Reviews',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'A reputation management subscription that helps businesses collect, monitor and respond to Google reviews. Currently in development.',
  url: `${site.url}/reviews`,
  publisher: { '@id': `${site.url}/#organization` },
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/PreOrder',
    price: '0',
    priceCurrency: 'USD',
  },
});
