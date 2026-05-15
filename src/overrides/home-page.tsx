import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Radio,
  Sparkles,
  Upload,
  UserPlus,
  Newspaper,
  Globe,
  TrendingUp,
  Clock,
  ChevronRight,
  Megaphone,
  BarChart3,
  Search,
  Shield,
  Zap,
} from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'
import { SITE_CONFIG } from '@/lib/site-config'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'

export const HOME_PAGE_OVERRIDE_ENABLED = true

const mediaPartners = [
  { label: 'Reuters' },
  { label: 'Bloomberg' },
  { label: 'Forbes' },
  { label: 'The Guardian' },
  { label: 'Yahoo News' },
  { label: 'AP News' },
  { label: 'Business Wire' },
  { label: 'PR Newswire' },
] as const

const services = [
  { title: 'Instant Distribution', body: 'Reach 500+ verified journalists and media outlets across print, digital, and broadcast with a single submission.', icon: Megaphone },
  { title: 'Google News Indexing', body: 'Every release gets an SEO-optimised page submitted to Google News, Bing News, and major search engines automatically.', icon: Search },
  { title: 'Multilingual Reach', body: 'Professional translation into 20+ languages while preserving quotes, facts, and brand tone for global audiences.', icon: Globe },
  { title: 'Editorial Copywriting', body: 'Our editors polish your headline, lede, and boilerplate so your release reads press-ready from day one.', icon: FileText },
  { title: 'Real-Time Analytics', body: 'Track views, media pickups, journalist opens, and social shares from a single dashboard updated in real time.', icon: BarChart3 },
  { title: 'Compliance & Disclosure', body: 'Keep regulated announcements aligned with SEC, FCA, and regional disclosure requirements.', icon: Shield },
] as const

const stats = [
  { value: '50,000+', label: 'Releases Published' },
  { value: '500+', label: 'Media Outlets' },
  { value: '4 hrs', label: 'Avg. Pickup Time' },
  { value: '98%', label: 'Client Satisfaction' },
] as const

const testimonials = [
  { quote: 'Presslyy got our product launch picked up by three national outlets within 24 hours. The distribution is genuinely impressive.', name: 'Michael Torres', role: 'VP of Communications, NovaTech Inc.' },
  { quote: 'We replaced our expensive PR agency with Presslyy for routine announcements. Same reach, a fraction of the cost.', name: 'Amanda Chen', role: 'Marketing Director, FinScale Group' },
  { quote: 'The editorial team polished our release and it read like it came straight from a seasoned PR desk. Highly recommend.', name: 'David Okonkwo', role: 'Founder & CEO, BrightPath Ventures' },
] as const

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 10, { fresh: true })

  return (
    <div className="min-h-screen bg-white text-[#1a0e00]">
      <NavbarShell />
      <SchemaJsonLd data={[
        { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_CONFIG.name, url: SITE_CONFIG.baseUrl },
        { '@context': 'https://schema.org', '@type': 'Organization', name: SITE_CONFIG.name, url: SITE_CONFIG.baseUrl, description: SITE_CONFIG.description },
      ]} />
      <main>

        {/* ── HERO ── dark split layout ─────────────────────────────── */}
        <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f0700 0%, #1e0c00 40%, #2d1200 100%)' }}>
          {/* Subtle grid */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)', backgroundSize: '60px 60px' }} aria-hidden />
          {/* Orange glow top-left */}
          <div className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #F05A28 0%, transparent 70%)' }} aria-hidden />
          {/* Amber glow bottom-right */}
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #F7931E 0%, transparent 70%)' }} aria-hidden />

          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">

              {/* Left copy */}
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#F05A28]/50 bg-[#F05A28]/15 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-[#F7931E]">
                  <Radio className="h-3 w-3" /> {siteContent.hero.badge}
                </span>

                <h1 className="mt-5 font-display text-4xl font-bold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
                  Get Your Story{' '}
                  <span className="relative inline-block">
                    <span style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', backgroundImage: 'linear-gradient(90deg, #F05A28, #F7931E)' }}>
                      Covered
                    </span>
                    <span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full" style={{ background: 'linear-gradient(90deg, #F05A28, #F7931E)' }} />
                  </span>{' '}
                  by the Media That Matters
                </h1>

                <p className="mt-5 max-w-lg text-base leading-8 text-white/65 sm:text-lg">
                  {siteContent.hero.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={siteContent.hero.primaryCta.href} className="inline-flex items-center gap-2 rounded-full bg-[#F05A28] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#F05A28]/40 transition hover:-translate-y-0.5 hover:bg-[#d44820]">
                    {siteContent.hero.primaryCta.label} <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <Link href={siteContent.hero.secondaryCta.href} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-7 py-3.5 text-sm font-semibold text-white/90 backdrop-blur-sm transition hover:bg-white/15">
                    {siteContent.hero.secondaryCta.label}
                  </Link>
                </div>

                {/* Stats */}
                <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {stats.map((s) => (
                    <div key={s.label} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4 backdrop-blur-sm">
                      <p className="font-display text-2xl font-bold text-[#F7931E]">{s.value}</p>
                      <p className="mt-1 text-[0.68rem] text-white/45">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: live wire mockup card */}
              <div className="relative hidden lg:block">
                <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, #F05A28, transparent 70%)' }} aria-hidden />
                <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #F7931E, transparent 70%)' }} aria-hidden />

                <div className="relative rounded-3xl border border-white/10 bg-white/6 p-6 shadow-[0_40px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F05A28] px-3 py-1 text-[0.62rem] font-bold uppercase tracking-widest text-white">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> Live Wire
                    </span>
                    <span className="text-[0.62rem] text-white/35">press.presslyy.com</span>
                  </div>

                  {/* Release rows */}
                  <div className="mt-4 space-y-2.5">
                    {[
                      { cat: 'Technology', title: 'Acme Corp Raises $40M Series B to Expand AI Platform', time: '2 min ago' },
                      { cat: 'Finance', title: 'GlobalBank Reports Record Q3 Earnings, Beats Estimates', time: '18 min ago' },
                      { cat: 'Healthcare', title: 'MedTech Startup Receives FDA Clearance for Wearable Device', time: '1 hr ago' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/5 p-3.5">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F05A28]/25">
                          <Newspaper className="h-3.5 w-3.5 text-[#F7931E]" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-[#F7931E]">{item.cat}</p>
                          <p className="mt-0.5 text-[0.82rem] font-semibold leading-snug text-white/90">{item.title}</p>
                          <p className="mt-1 text-[0.62rem] text-white/35">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pickup bar */}
                  <div className="mt-4 flex items-center justify-between rounded-xl border border-[#F7931E]/25 bg-[#F7931E]/10 px-4 py-3">
                    <div>
                      <p className="text-[0.78rem] font-bold text-[#F7931E]">📈 12 media pickups today</p>
                      <p className="mt-0.5 text-[0.62rem] text-white/40">Reuters · Bloomberg · Forbes · +9 more</p>
                    </div>
                    <TrendingUp className="h-5 w-5 text-[#F7931E]" />
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -left-7 top-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-2xl">
                  <p className="text-[0.75rem] font-bold text-[#F05A28]">✓ Editorial reviewed</p>
                  <p className="mt-0.5 text-[0.62rem] text-gray-500">Ready for distribution</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── MEDIA PARTNERS ── white strip ────────────────────────── */}
        <section className="border-b border-gray-100 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <p className="mb-6 text-center text-[0.68rem] font-bold uppercase tracking-[0.3em] text-gray-400">
              Your releases reach these outlets and thousands more
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              {mediaPartners.map((p) => (
                <span key={p.label} className="text-sm font-bold tracking-wide text-gray-300 transition hover:text-gray-500">
                  {p.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── light gray bg ────────────────────────── */}
        <section className="bg-gray-50">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#F05A28]/10 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[#F05A28]">
                {siteContent.home.introBadge}
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {siteContent.home.introTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-500">{siteContent.home.introParagraphs[0]}</p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { step: '01', title: 'Write Your Release', blurb: 'Use our guided editor to craft a professional press release — headline, dateline, body, quotes, and boilerplate. Our editorial checklist keeps you on track.', icon: UserPlus, detail: 'Guided editor · Editorial checklist · Templates' },
                { step: '02', title: 'Choose Distribution', blurb: 'Select target industries, regions, and media tiers. Add translation, editorial review, or premium outlet targeting as optional upgrades.', icon: Upload, detail: '500+ outlets · Regional targeting · Industry filters' },
                { step: '03', title: 'Publish & Track', blurb: 'Go live instantly. Your release is indexed by Google News, distributed to journalists, and tracked in real time — views, pickups, and shares.', icon: Radio, detail: 'Google News · Real-time analytics · Pickup alerts' },
              ].map((item) => (
                <div key={item.step} className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-[#F05A28]/8">
                  {/* Step watermark */}
                  <span className="absolute right-5 top-4 select-none font-display text-6xl font-black text-gray-100">{item.step}</span>
                  {/* Icon */}
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F05A28] text-white shadow-md shadow-[#F05A28]/30">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#F05A28]">Step {item.step}</p>
                  <h3 className="mt-2 font-display text-xl font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-2 grow text-sm leading-7 text-gray-500">{item.blurb}</p>
                  {/* Feature pill */}
                  <div className="mt-5 rounded-xl bg-orange-50 px-3 py-2.5">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#F05A28]/80">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LATEST RELEASES ── white ─────────────────────────────── */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="flex flex-col items-start justify-between gap-4 border-b border-gray-100 pb-8 sm:flex-row sm:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#F05A28]/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[#F05A28]">
                  <Clock className="h-3 w-3" /> Live Wire
                </span>
                <h2 className="mt-3 font-display text-2xl font-bold text-gray-900 sm:text-3xl">{siteContent.taskSectionHeading}</h2>
                <p className="mt-1 text-sm text-gray-400">{siteContent.taskSectionDescriptionSuffix}</p>
              </div>
              <Link href="/updates" className="inline-flex items-center gap-2 rounded-full border border-[#F05A28]/30 bg-orange-50 px-4 py-2 text-sm font-semibold text-[#F05A28] transition hover:bg-orange-100">
                Full archive <FileText className="h-4 w-4" />
              </Link>
            </div>

            <ul className="divide-y divide-gray-100">
              {(posts.length ? posts : []).map((post) => (
                <li key={post.id}>
                  <Link href={`/updates/${post.slug}`} className="group flex items-start gap-4 py-5 sm:gap-6">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-50 transition group-hover:bg-[#F05A28] group-hover:text-white">
                      <Newspaper className="h-3.5 w-3.5 text-[#F05A28] transition group-hover:text-white" />
                    </span>
                    <p className="min-w-0 flex-1 text-base font-semibold leading-snug text-gray-800 transition group-hover:text-[#F05A28] sm:text-lg">{post.title}</p>
                    <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-[#F05A28]" />
                  </Link>
                </li>
              ))}
            </ul>

            {posts.length === 0 && (
              <p className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-sm text-gray-400">
                New press releases will appear here as they are published.{' '}
                <Link className="font-semibold text-[#F05A28] underline" href="/updates">Open the full archive</Link>.
              </p>
            )}
          </div>
        </section>

        {/* ── SERVICES ── dark bg ───────────────────────────────────── */}
        <section style={{ background: 'linear-gradient(160deg, #0f0700 0%, #1e0c00 50%, #2d1500 100%)' }}>
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#F7931E]/30 bg-[#F7931E]/12 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[#F7931E]">
                  What We Offer
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Everything you need to get covered.
                </h2>
                <p className="mt-3 text-white/55">{siteContent.home.introParagraphs[1]}</p>
                <ul className="mt-8 space-y-3">
                  {services.map((s) => (
                    <li key={s.title} className="flex gap-3 rounded-xl border border-white/8 bg-white/5 p-4 transition hover:border-[#F05A28]/40 hover:bg-white/8">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F05A28]/20 text-[#F7931E]">
                        <s.icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="font-semibold text-white">{s.title}</p>
                        <p className="mt-1 text-sm leading-7 text-white/50">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phone mockup */}
              <div className="relative justify-self-center lg:sticky lg:top-24 lg:justify-self-end">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-25" style={{ background: 'radial-gradient(circle, #F7931E, transparent 70%)' }} aria-hidden />
                <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #F05A28, transparent 70%)' }} aria-hidden />
                <div className="relative w-[min(100%,290px)]">
                  <Image
                    src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&h=1200&fit=crop&q=60&auto=format"
                    alt="Presslyy mobile dashboard"
                    width={580} height={780}
                    className="h-auto w-full rounded-[2rem] object-cover shadow-2xl ring-1 ring-white/10"
                  />
                  <div className="absolute inset-x-5 top-5 rounded-xl border border-white/20 bg-black/55 p-3 text-[0.58rem] font-bold uppercase tracking-widest text-white/80 backdrop-blur-sm">
                    {SITE_CONFIG.name} · Live Dashboard
                  </div>
                  <div className="absolute -right-5 bottom-20 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-xl">
                    <p className="text-[0.75rem] font-bold text-[#F05A28]">3 pickups today</p>
                    <p className="mt-0.5 text-[0.62rem] text-gray-400">Reuters · Forbes · Yahoo</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust cards */}
            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {[
                { icon: Zap, title: 'Live in Under 1 Hour', desc: 'Submit your release and it goes live on Presslyy and starts distributing to media contacts within 60 minutes.' },
                { icon: Shield, title: 'Editorial Quality Check', desc: 'Every release is reviewed by our editorial team before distribution to ensure it meets professional media standards.' },
                { icon: TrendingUp, title: 'Measurable Results', desc: 'Track every pickup, view, and share in real time. Know exactly which outlets covered your story and when.' },
              ].map((t) => (
                <div key={t.title} className="flex flex-col items-center rounded-2xl border border-white/8 bg-white/5 p-6 text-center transition hover:border-[#F05A28]/30 hover:bg-white/8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F05A28] text-white shadow-lg shadow-[#F05A28]/30">
                    <t.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-base font-bold text-white">{t.title}</p>
                  <p className="mt-2 text-sm leading-7 text-white/50">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── light gray ────────────────────────────── */}
        <section className="bg-gray-50">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#F05A28]/10 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[#F05A28]">
                Client Stories
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold text-gray-900 sm:text-3xl">
                Trusted by PR teams, founders, and agencies worldwide.
              </h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <div key={t.name} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="flex gap-0.5 text-[#F7931E]">
                    {Array.from({ length: 5 }).map((_, i) => <span key={i} className="text-sm">★</span>)}
                  </div>
                  <p className="mt-4 grow text-sm leading-7 text-gray-600">"{t.quote}"</p>
                  <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F05A28] text-xs font-bold text-white">
                      {t.name.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── orange gradient ────────────────────────── */}
        <section className="relative overflow-hidden" style={{ background: 'linear-gradient(115deg, #c43d10 0%, #F05A28 45%, #F7931E 100%)' }}>
          <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'repeating-linear-gradient(60deg, rgba(255,255,255,0.6) 0, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 10px)' }} aria-hidden />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-10" style={{ background: 'radial-gradient(ellipse at right, white, transparent 70%)' }} aria-hidden />

          <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 py-14 sm:flex-row sm:items-center sm:px-6 sm:py-16">
            <div>
              <p className="font-display text-2xl font-bold text-white sm:text-3xl">{siteContent.cta.title}</p>
              <p className="mt-2 max-w-xl text-sm text-white/80 sm:text-base">{siteContent.cta.description}</p>
              <div className="mt-5 flex flex-wrap gap-4">
                {['Free plan available', 'No credit card required', 'Live in under 1 hour'].map((f) => (
                  <span key={f} className="flex items-center gap-1.5 text-sm text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-white" /> {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a href={siteContent.cta.primaryCta.href} className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-7 py-3.5 text-sm font-extrabold text-[#F05A28] shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-50">
                {siteContent.cta.primaryCta.label} <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── white ────────────────────────────────────────── */}
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
            <div className="text-center">
              <Sparkles className="mx-auto h-5 w-5 text-[#F7931E]" />
              <h2 className="mt-3 font-display text-2xl font-bold text-gray-900 sm:text-3xl">About {SITE_CONFIG.name}</h2>
            </div>
            <div className="mt-7 space-y-4 text-[0.98rem] leading-8 text-gray-600">
              <p>Presslyy is a modern press release distribution platform built for businesses of every size — from early-stage startups announcing their first funding round to enterprise communications teams managing dozens of releases a month.</p>
              <p>We believe every company deserves professional media coverage. Our platform combines editorial expertise, a verified journalist network, and real-time analytics to give your story the best possible chance of being picked up, shared, and remembered.</p>
              <p>Questions about plans, distribution reach, or custom enterprise packages?{' '}
                <Link href="/contact" className="font-semibold text-[#F05A28] underline-offset-2 hover:underline">Talk to our team</Link>.
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
