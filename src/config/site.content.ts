import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Press release distribution platform',
  },
  footer: {
    tagline: 'Get your story in front of the journalists who matter.',
  },
  hero: {
    badge: 'Press Release Distribution',
    title: ['Publish. Distribute. Get Covered.'],
    description:
      'Presslyy is the fastest way to write, publish, and distribute professional press releases to thousands of journalists, newsrooms, and media outlets — all from one dashboard.',
    primaryCta: {
      label: 'Publish Your First Release',
      href: '/register',
    },
    secondaryCta: {
      label: 'See how it works',
      href: '/about',
    },
    searchPlaceholder: 'Search press releases…',
    focusLabel: 'Latest',
    featureCardBadge: 'Newswire',
    featureCardTitle: 'Structured releases built for media pickup.',
    featureCardDescription:
      'Every release on Presslyy is formatted to editorial standards — making it easy for journalists to scan, quote, and publish your story.',
  },
  home: {
    metadata: {
      title: 'Press Release Distribution & Media Coverage | Presslyy',
      description:
        'Publish and distribute press releases to top journalists, newsrooms, and media outlets worldwide. Presslyy makes professional PR accessible to every business.',
      openGraphTitle: 'Press Release Distribution & Media Coverage | Presslyy',
      openGraphDescription:
        'Write, publish, and distribute press releases that get picked up. Reach journalists, boost SEO, and build your brand with Presslyy.',
      keywords: [
        'press release distribution',
        'newswire service',
        'media coverage',
        'PR distribution',
        'press release platform',
        'Presslyy',
        'publish press release',
        'journalist outreach',
        'media relations',
        'company announcements',
      ],
    },
    introBadge: 'How it works',
    introTitle: 'From draft to distributed — in three simple steps.',
    introParagraphs: [
      'Presslyy is built for PR teams, founders, and communications professionals who need to get their story out fast. Write once, reach everywhere — with a clean archive that journalists can browse and cite.',
      'Every release gets its own SEO-optimised page, a shareable link, and automatic distribution to our media partner network. No technical setup. No agency fees. Just results.',
    ],
    sideBadge: 'What you get',
    sidePoints: [
      'Instant distribution to 500+ media outlets and journalist contacts.',
      'SEO-optimised release pages indexed by Google News.',
      'Real-time analytics showing views, pickups, and reach.',
    ],
    primaryLink: {
      label: 'Browse press releases',
      href: '/updates',
    },
    secondaryLink: {
      label: 'Talk to our team',
      href: '/contact',
    },
  },
  cta: {
    badge: 'Start today',
    title: 'Ready to get your story in front of the right journalists?',
    description:
      'Join thousands of brands and PR professionals who use Presslyy to publish press releases that get noticed, shared, and cited.',
    primaryCta: {
      label: 'Get started free',
      href: '/register',
    },
    secondaryCta: {
      label: 'View pricing',
      href: '/pricing',
    },
  },
  taskSectionHeading: 'Latest Press Releases',
  taskSectionDescriptionSuffix: 'Fresh from the wire — the most recent releases published on Presslyy.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles',
    description: 'Read the latest posts and long-form updates.',
  },
  listing: {
    title: 'Listings',
    description: 'Explore listings and directory-style entries.',
  },
  classified: {
    title: 'Classifieds',
    description: 'Browse classifieds and short-form notices.',
  },
  image: {
    title: 'Images',
    description: 'Browse image-led updates and visual posts.',
  },
  profile: {
    title: 'Profiles',
    description: 'View profile pages and public identities.',
  },
  sbm: {
    title: 'Bookmarks',
    description: 'Browse curated resources and saved links.',
  },
  pdf: {
    title: 'Resources',
    description: 'Open PDFs and downloadable files.',
  },
  mediaDistribution: {
    title: 'Press Release Archive',
    description:
      'Browse the full Presslyy newswire — search by company, topic, or date to find the release you need.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: { title: 'Listings', paragraphs: ['Directory entries and service pages.'], links: [{ label: 'Home', href: '/' }] },
  article: { title: 'Articles', paragraphs: ['General long-form article feed.'], links: [{ label: 'Home', href: '/' }] },
  classified: { title: 'Classifieds', paragraphs: ['Short-form posts and notices.'], links: [{ label: 'Home', href: '/' }] },
  image: { title: 'Images', paragraphs: ['Image-first posts and galleries.'], links: [{ label: 'Home', href: '/' }] },
  profile: { title: 'Profiles', paragraphs: ['Profile pages and identity surfaces.'], links: [{ label: 'Home', href: '/' }] },
  sbm: { title: 'Bookmarks', paragraphs: ['Curated saved links and references.'], links: [{ label: 'Home', href: '/' }] },
  pdf: { title: 'Resources', paragraphs: ['Downloadable files and documents.'], links: [{ label: 'Home', href: '/' }] },
  social: { title: 'Social', paragraphs: ['Short updates and activity.'], links: [{ label: 'Home', href: '/' }] },
  comment: { title: 'Comments', paragraphs: ['Commentary and response posts.'], links: [{ label: 'Home', href: '/' }] },
  org: { title: 'Organizations', paragraphs: ['Organization pages and entities.'], links: [{ label: 'Home', href: '/' }] },
  mediaDistribution: {
    title: 'Press Release Archive',
    paragraphs: [
      'Browse every press release published on Presslyy — sorted by date, searchable by company, topic, or keyword. Each release opens into a full editorial page built for reading, sharing, and citation.',
      'Looking for a specific announcement? Use the search bar to find releases by company name, product, executive, or subject matter across the entire Presslyy archive.',
    ],
    links: [
      { label: 'Home', href: '/' },
      { label: 'Search releases', href: '/search' },
    ],
  },
}
