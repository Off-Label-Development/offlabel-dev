export const siteConfig = {
  name: 'offlabel-dev',
  title: 'Off-Label Development — Practical AI for Small Business',
  description: 'We help small businesses harness AI in practical, human-centered ways. No jargon, no hype — just real solutions that fit your workflow.',
  url: 'https://offlabel.dev',
  ogImage: '/og-image.svg',
  author: {
    name: 'Nicholas Dana',
    url: 'https://offlabel.dev/about',
  },
  social: {
    github: 'https://github.com/NichD',
    linkedin: 'https://www.linkedin.com/in/nicholas-dana/',
    twitter: 'https://x.com/nicholasdana',
  },
  contact: {
    email: 'hello@offlabel.dev',
    formspreeId: import.meta.env.FORMSPREE_ID || '',
  },
  analytics: {
    cfEnabled: import.meta.env.PUBLIC_CF_ANALYTICS === 'true',
  },
  turnstile: {
    siteKey: import.meta.env.TURNSTILE_SITE_KEY || '',
  },
} as const;

export type SiteConfig = typeof siteConfig;