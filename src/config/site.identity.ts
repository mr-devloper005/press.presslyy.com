export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'en6d8k1bae',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Press Presslyy',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Independent media updates',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A media-distribution newsroom for announcements, coverage, and press updates on Press Presslyy.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'press.presslyy.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://press.presslyy.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || '',
} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const
