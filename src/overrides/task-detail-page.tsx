import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Facebook, Linkedin, Twitter, ArrowLeft, ChevronRight, Newspaper, Share2 } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { buildPostUrl, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { formatRichHtml, RichContent } from '@/components/shared/rich-content'
import { ContentImage } from '@/components/shared/content-image'
import { SITE_CONFIG, getTaskConfig } from '@/lib/site-config'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import type { SitePost } from '@/lib/site-connector'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

const isImageUrl = (v?: string | null) =>
  typeof v === 'string' && (v.startsWith('/') || v.startsWith('http'))

function getHeroImage(post: SitePost) {
  const content = (post.content || {}) as { images?: string[]; body?: string }
  const fromMedia = Array.isArray(post.media) ? post.media.find((m) => m?.url)?.url : null
  const fromContent = Array.isArray(content.images)
    ? content.images.find((u) => isImageUrl(u))
    : null
  return (fromMedia || fromContent || '').trim() || null
}

function getSubtitle(post: SitePost) {
  const c =
    post.content && typeof post.content === 'object'
      ? (post.content as { excerpt?: string }).excerpt
      : ''
  if (typeof c === 'string' && c.trim()) return c.trim()
  return post.summary || ''
}

function getCategory(post: SitePost): string {
  if (post.content && typeof post.content === 'object') {
    const c = (post.content as { category?: string }).category
    if (typeof c === 'string' && c.trim()) return c.trim()
  }
  return ''
}

export async function TaskDetailPageOverride({ task, slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()

  const related = (await fetchTaskPosts(task, 8, { fresh: true }))
    .filter((item) => item.slug !== slug)
    .slice(0, 3)

  const content = (post.content || {}) as Record<string, unknown>
  const html = formatRichHtml(
    (content.body as string) || post.summary || '',
    'Release body will appear here.',
  )
  const hero = getHeroImage(post)
  const subtitle = getSubtitle(post)
  const category = getCategory(post)
  const path = buildPostUrl(task, post.slug)
  const taskLabel = getTaskConfig(task)?.label || 'Post'
  const isPressWire = task === 'mediaDistribution'
  const url = `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${path}`
  const encodedUrl = encodeURIComponent(url)
  const shareTitle = encodeURIComponent(post.title)

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NavbarShell />
      <SchemaJsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: post.title,
          datePublished: post.publishedAt || undefined,
          author: {
            '@type': 'Organization',
            name: post.authorName || SITE_CONFIG.name,
          },
          image: hero
            ? hero.startsWith('http')
              ? hero
              : `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${hero}`
            : undefined,
        }}
      />

      {/* ── ARTICLE HEADER ── dark band ── */}
      <header
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
        {/* Glow */}
        <div
          className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #F05A28, transparent 70%)' }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
          {/* Back link */}
          <Link
            href="/updates"
            className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-white/50 transition hover:text-white/80"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to releases
          </Link>

          {/* Category + wire badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F05A28] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-white">
              <Newspaper className="h-3 w-3" />
              {isPressWire ? 'Press Release' : taskLabel}
            </span>
            {category && (
              <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white/60">
                {category}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-[2.5rem]">
            {post.title}
          </h1>

          {/* Subtitle */}
          {subtitle ? (
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/55">{subtitle}</p>
          ) : null}

          {/* Meta row */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/45">
            <span className="font-semibold text-white/70">{post.authorName || SITE_CONFIG.name}</span>
          </div>

          {/* Share buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-2" aria-label="Share">
            <span className="flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-white/35">
              <Share2 className="h-3 w-3" /> Share
            </span>
            {[
              { label: 'X / Twitter', icon: Twitter, href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${shareTitle}` },
              { label: 'LinkedIn', icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
              { label: 'Facebook', icon: Facebook, href: `https://www.facebook.com/sharer.php?u=${encodedUrl}` },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                rel="noreferrer"
                target="_blank"
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/12 bg-white/8 px-3 text-[0.72rem] font-semibold text-white/70 transition hover:bg-white/15 hover:text-white"
              >
                <s.icon className="h-3.5 w-3.5" /> {s.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* ── HERO IMAGE ── */}
      {hero && (
        <div className="bg-gray-950">
          <div className="relative mx-auto max-w-5xl">
            <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
              <ContentImage src={hero} alt={post.title} fill className="object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" aria-hidden />
            </div>
          </div>
        </div>
      )}

      {/* ── BODY + SIDEBAR ── */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">

          {/* Article body */}
          <article
            className="prose prose-lg max-w-none
              prose-headings:font-display prose-headings:tracking-tight prose-headings:text-gray-900
              prose-h2:text-2xl prose-h3:text-xl
              prose-p:text-gray-600 prose-p:leading-8
              prose-li:text-gray-600
              prose-a:text-[#F05A28] prose-a:font-medium prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900
              prose-blockquote:border-l-[#F05A28] prose-blockquote:text-gray-500"
          >
            <RichContent html={html} />
          </article>

          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">

            {/* Wire notice */}
            {isPressWire && (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F05A28] text-white">
                    <Newspaper className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Official Wire</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Published for media and stakeholders. Citation should reference{' '}
                  <span className="font-semibold text-gray-700">{SITE_CONFIG.name}</span>.
                </p>
              </div>
            )}

            {/* Share (sidebar repeat) */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                <Share2 className="h-3.5 w-3.5" /> Share this release
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {[
                  { label: 'Share on X / Twitter', icon: Twitter, href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${shareTitle}` },
                  { label: 'Share on LinkedIn', icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
                  { label: 'Share on Facebook', icon: Facebook, href: `https://www.facebook.com/sharer.php?u=${encodedUrl}` },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    rel="noreferrer"
                    target="_blank"
                    className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-[#F05A28]/30 hover:bg-orange-50 hover:text-[#F05A28]"
                  >
                    <s.icon className="h-4 w-4" /> {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Read next */}
            {related.length > 0 && (
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Read next</p>
                <ul className="mt-3 divide-y divide-gray-100">
                  {related.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={buildPostUrl(task, item.slug)}
                        className="group flex items-start gap-2 py-3"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-50 text-[#F05A28] transition group-hover:bg-[#F05A28] group-hover:text-white">
                          <ChevronRight className="h-3 w-3" />
                        </span>
                        <span className="text-sm font-medium leading-snug text-gray-700 transition group-hover:text-[#F05A28]">
                          {item.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Submit CTA */}
            <div
              className="overflow-hidden rounded-2xl p-5 text-white"
              style={{ background: 'linear-gradient(135deg, #c43d10, #F05A28 60%, #F7931E)' }}
            >
              <p className="text-sm font-bold">Have a story to share?</p>
              <p className="mt-1.5 text-xs leading-5 text-white/75">
                Publish your press release on Presslyy and reach 500+ media outlets.
              </p>
              <Link
                href="/register"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#F05A28] transition hover:bg-gray-50"
              >
                Submit a Release <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

          </aside>
        </div>
      </div>

      {/* ── RELATED RELEASES ── */}
      {related.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50 py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#F05A28]/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#F05A28]">
                  More releases
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold text-gray-900">Related stories</h2>
              </div>
              <Link
                href="/updates"
                className="text-sm font-semibold text-[#F05A28] transition hover:underline"
              >
                View all →
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={buildPostUrl(task, item.slug)}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#F05A28]/25 hover:shadow-lg hover:shadow-[#F05A28]/8"
                >
                  {getHeroImage(item) ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                      <ContentImage
                        src={getHeroImage(item) || '/placeholder.svg'}
                        alt=""
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[16/9] w-full items-center justify-center bg-gradient-to-br from-orange-50 to-gray-100">
                      <Newspaper className="h-10 w-10 text-gray-300" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#F05A28]">
                      {getCategory(item) || 'Press Release'}
                    </span>
                    <h3 className="mt-2 line-clamp-2 font-display text-base font-bold leading-snug text-gray-900 transition group-hover:text-[#F05A28]">
                      {item.title}
                    </h3>
                    {item.summary && (
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">{item.summary}</p>
                    )}
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#F05A28]">
                      Read release <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
