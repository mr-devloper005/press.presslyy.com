import Image from 'next/image'
import Link from 'next/link'
import { Twitter, Linkedin } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { fetchTaskPosts } from '@/lib/task-data'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { siteContent } from '@/config/site.content'

export const FOOTER_OVERRIDE_ENABLED = true


const getCategoryLabel = (value: string) => {
  const normalized = normalizeCategory(value)
  return CATEGORY_OPTIONS.find((item) => item.slug === normalized)?.name || value
}


const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Distribution',
    links: [
      { label: 'Press Releases', href: '/updates' },
      { label: 'Search', href: '/search' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Cookies', href: '/cookies' },
    ],
  },
  {
    title: 'Access',
    links: [
      { label: 'Sign in', href: '/login' },
      { label: 'Create account', href: '/register' },
    ],
  },
]

export async function FooterOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 200, { allowMockFallback: false })
  const categories = Array.from(
    new Map(
      posts
        .map((post) => {
          const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
          const raw = typeof content.category === 'string' ? content.category.trim() : ''
          if (!raw) return null
          const slug = normalizeCategory(raw)
          return { slug, name: getCategoryLabel(raw) }
        })
        .filter((item): item is { slug: string; name: string } => Boolean(item))
        .map((item) => [item.slug, item])
    ).values()
  ).slice(0, 8)

  return (
    <footer className="mt-auto border-t border-[#f0d88a] bg-[#1a0e00] text-[#FEFCDB]">
      {/* Top accent bar */}
      <div
        className="h-1 w-full"
        style={{ background: 'linear-gradient(90deg, #F05A28 0%, #F7931E 50%, #FFF0BC 100%)' }}
        aria-hidden
      />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2">
            <Link href="/" aria-label="Presslyy home">
              <Image
                src="/logo-white.svg"
                alt="Presslyy"
                width={160}
                height={40}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-3 text-sm text-[#FFF0BC]/65">{siteContent.footer.tagline}</p>
            <p className="mt-3 max-w-sm text-sm leading-7 text-[#FFF0BC]/45">{SITE_CONFIG.description}</p>
            <p className="mt-2 text-sm text-[#FFF0BC]/30">{SITE_CONFIG.domain}</p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#F7931E]">{col.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-[#FFF0BC]/70 transition hover:text-[#FFF0BC]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}

        {categories.length ? (
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">Categories</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/updates?category=${category.slug}`}
                  className="opacity-80 underline-offset-4 transition hover:opacity-100 hover:underline"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-12 flex flex-col gap-4 border-t border-[#FFF0BC]/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#FFF0BC]/40">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-3" aria-label="Social">
            <a
              className="rounded-full border border-[#FFF0BC]/15 p-2.5 text-[#FFF0BC]/60 transition hover:border-[#F7931E]/50 hover:text-[#F7931E]"
              href="https://x.com"
              rel="noreferrer"
              target="_blank"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              className="rounded-full border border-[#FFF0BC]/15 p-2.5 text-[#FFF0BC]/60 transition hover:border-[#F7931E]/50 hover:text-[#F7931E]"
              href="https://www.linkedin.com"
              rel="noreferrer"
              target="_blank"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
