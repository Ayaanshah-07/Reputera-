/**
 * Case studies, shown by industry rather than client name.
 *
 * Only real, approved work belongs in this list — the portfolio page and the
 * homepage both render straight from it.
 */

export type CaseStudy = {
  slug: string;
  /** Industry the work sits in. Shown instead of the client's name. */
  niche: string;
  title: string;
  copy: string;
  tags: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'footwear-manufacturing',
    niche: 'Footwear manufacturing',
    title: 'ERP system + AI-powered feature',
    copy: 'Documented and extended a full ERP system for a footwear manufacturer, including an AI image-matching feature that matches product photos to the right catalog entries.',
    tags: ['Software', 'AI', 'ERP'],
  },
  {
    slug: 'construction-fit-out',
    niche: 'Construction & fit-out',
    title: 'Site snagging application',
    copy: 'A field-ready app for tracking construction defects on site, with photo upload and AI-generated issue descriptions that speed up reporting.',
    tags: ['App', 'AI'],
  },
];
