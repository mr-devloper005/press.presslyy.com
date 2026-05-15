import Link from 'next/link'
import { Search, SlidersHorizontal, Newspaper, ChevronRight, ArrowUpRight } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { buildPostUrl, fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { ContentImage } from '@/components/shared/content-image'
import type { SitePost } from '@/lib/site-connector'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { SITE_CONFIG, getTaskConfig } from '@/lib/site-config'
import { Button } from '@/components/ui/button'
import { taskPageMetadata as taskPageSeo } from '@/config/site.content'
import { cn } from '@/lib/utils'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

function cnPill(active: boolean) {
  return cn(
    'rounded-full border px-3 py-1.5 text-xs font-semibold transition-all',
    active
      ? 'border-[#F05A28] bg-[#F05A28] text-white shadow-sm shadow-[#F05A28]/30'
      : 'border-gray-200 bg-white text-gray-500 hover:border-[#F05A28]/40 hover:text-[#F05A28]',
  )
}

function excerpt(text?: string | null) {
  const value = (text || '').trim()
  if (!value) return 'Open the full release for details, quotes, and context.'
  return value.length > 180 ? value.slice(0, 177).trimEnd() + '…' : value
}

function getPostImage(post: SitePost) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage =
    post?.content && typeof post.content === 'object' && Array.isArray((post.content as { images?: string[] }).images)
      ? (post.content as { images: string[] }).images.find((url) => typeof url === 'string' && url)
      : null
  return mediaUrl || contentImage || '/placeholder.svg?height=600&width=900'
}

function getLabel(post: SitePost) {
  if (post.content && typeof post.content === 'object') {
    const c = (post.content as { category?: string }).category
    if (typeof c === 'string' && c.trim()) return c.trim()
  }
  return 'Press'
}

export async function TaskListPageOverride({ task, category }: { task: TaskKey; category?: string }) {
  const posts = await fetchTaskPosts(task, 40, { fresh: true })
  const activeSlug = category ? normalizeCategory(category) : ''
  const filtered = !activeSlug
    ? posts
    : posts.filter((p) => {
        const c = p.content && typeof p.content === 'object' ? (p.content as { category?: string }).category : ''
        if (typeof c !== 'string') return false
        return normalizeCategory(c) === activeSlug
      })
  const taskConfig = getTaskConfig(task)
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const listUrl = `${baseUrl}${taskConfig?.route || '/updates'}`
  const titleAndDesc = taskPageSeo.mediaDistribution

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NavbarShell />
      <SchemaJsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${titleAndDesc.title} | ${SITE_CONFIG.name}`,
          url: listUrl,
          hasPart: filtered.slice(0, 12).map((post, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${listUrl.replace(/\/$/, '')}/${post.slug}`,
            name: post.title,
          })),
        }}
      />
      <main>

        {/* ── PAGE HEADER ── dark hero band ── */}
        <section
          className="relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0f0700 0%, #1e0c00 50%, #2d1500 100%)' }}
        >
          {/* Subtle grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)',
              backgroundSize: '60px 60px',
            }}
            aria-hidden
          />
          {/* Orange glow */}
          <div
            className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #F05A28, transparent 70%)' }}
            aria-hidden
          />

          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#F05A28]/40 bg-[#F05A28]/15 px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#F7931E]">
              <Newspaper className="h-3 w-3" /> Newswire
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {titleAndDesc.title}
            </h1>
            <p className="mt-3 max-w-2xl text-white/55">{titleAndDesc.description}</p>

            {/* Search bar */}
            <form className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" action="/search" method="get">
              <input type="hidden" name="master" value="1" />
              <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/12 bg-white/8 px-5 py-1 backdrop-blur-sm">
                <Search className="h-4 w-4 shrink-0 text-white/40" />
                <input
                  name="q"
                  className="h-11 w-full min-w-0 border-0 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                  placeholder="Search titles, companies, and subjects…"
                  aria-label="Search releases"
                />
              </div>
              <Button
                type="submit"
                className="h-12 shrink-0 rounded-2xl bg-[#F05A28] px-6 font-semibold text-white shadow-lg shadow-[#F05A28]/30 hover:bg-[#d44820]"
              >
                Search
              </Button>
            </form>
          </div>
        </section>

        {/* ── FILTERS + GRID ── */}
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">

          {/* Category pills */}
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-gray-400">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Filter
            </span>
            <Link href={taskConfig?.route || '/updates'} className={cnPill(!activeSlug)}>
              All
            </Link>
            {CATEGORY_OPTIONS.slice(0, 12).map((opt) => (
              <Link
                key={opt.slug}
                href={`${taskConfig?.route || '/updates'}?category=${opt.slug}`}
                className={cnPill(activeSlug === opt.slug)}
              >
                {opt.name}
              </Link>
            ))}
          </div>

          {/* Results count */}
          {filtered.length > 0 && (
            <p className="mb-6 text-sm text-gray-400">
              Showing <span className="font-semibold text-gray-700">{filtered.length}</span> release{filtered.length !== 1 ? 's' : ''}
              {activeSlug ? ` in "${activeSlug}"` : ''}
            </p>
          )}

          {/* Cards grid */}
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <li key={post.id}>
                <Link
                  href={buildPostUrl(task, post.slug)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#F05A28]/30 hover:shadow-lg hover:shadow-[#F05A28]/8"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <ContentImage
                      src={getPostImage(post)}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                    {/* Category badge */}
                    <div className="absolute left-3 top-3">
                      <span className="rounded-full bg-white/95 px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-[#F05A28] shadow-sm">
                        {getLabel(post)}
                      </span>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition group-hover:opacity-100" />
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="line-clamp-2 font-display text-lg font-bold leading-snug text-gray-900 transition group-hover:text-[#F05A28]">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 grow text-sm leading-7 text-gray-500">
                      {excerpt(post.summary)}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-[#F05A28]">
                      Read release
                      <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="mt-8 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-12 text-center">
              <Newspaper className="mx-auto h-10 w-10 text-gray-300" />
              <p className="mt-4 text-base font-semibold text-gray-700">No releases found</p>
              <p className="mt-1 text-sm text-gray-400">
                Try a different filter or{' '}
                <Link href={taskConfig?.route || '/updates'} className="font-semibold text-[#F05A28] hover:underline">
                  view all releases
                </Link>
                .
              </p>
            </div>
          )}

          {/* Bottom CTA */}
          {filtered.length > 0 && (
            <div className="mt-14 rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center">
              <p className="font-display text-xl font-bold text-gray-900">Want your story here?</p>
              <p className="mt-2 text-sm text-gray-500">
                Publish your press release on Presslyy and reach 500+ media outlets worldwide.
              </p>
              <a
                href="/register"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#F05A28] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#F05A28]/25 transition hover:-translate-y-0.5 hover:bg-[#d44820]"
              >
                Submit a Release <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
