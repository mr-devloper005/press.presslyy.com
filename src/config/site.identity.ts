export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'en6d8k1bae',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Presslyy',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'The press release platform for modern brands',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Presslyy helps businesses, agencies, and PR teams publish and distribute professional press releases to journalists, media outlets, and search engines worldwide.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'press.presslyy.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://press.presslyy.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || '',
} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const
