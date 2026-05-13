import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, HelpCircle } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { siteIdentity } from '@/config/site.identity'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const plans = [
  {
    name: 'Basic',
    blurb: 'A focused lane for one brand newsroom and steady press cadence.',
    price: '$199',
    cadence: '/ month',
    highlight: false,
    features: ['1 brand profile & boilerplate', '3 releases / month', 'Index & archive hosting', 'Standard coverage reporting'],
  },
  {
    name: 'Pro',
    blurb: 'Where most teams start when launch windows stack up across categories.',
    price: '$499',
    cadence: '/ month',
    highlight: true,
    features: [
      'Everything in Basic',
      '10 releases / month',
      'Add-on: translation (discounted bundle)',
      'Deeper index placement & analytics snapshot',
    ],
  },
  {
    name: 'Premium',
    blurb: 'High-volume, multi-entity distribution with tailored routing and SLAs.',
    price: 'Custom',
    cadence: '',
    highlight: false,
    features: [
      'Everything in Pro',
      'Unlimited* releases (fair-use)',
      'Dedicated review window',
      'Strategic add-ons: disclosure timing, industry packs',
    ],
  },
] as const

const addOns = [
  { title: 'Rush same-day', body: 'Accelerated desk review and publish for urgent market disclosures.' },
  { title: 'Category packs', body: 'Temporary boosts into vertical clusters that match the story (tech, health, etc.).' },
  { title: 'Translation bundle', body: 'Parallel headline + key quote localization with glossary alignment.' },
] as const

const faqs = [
  {
    q: 'Is there a per-release fee on top of the plan?',
    a: "Plans include a monthly release quota. Overage is billed at a predictable per-item rate, or you can move to a higher plan when volume is sustained.",
  },
  {
    q: 'What analytics are included?',
    a: "You'll see a practical snapshot: archive visibility, link engagement signals, and referral context—enough to brief leadership without a heavy BI stack.",
  },
  {
    q: 'Can we white-label the reader experience?',
    a: "Premium and select Pro accounts can align typography, CTA, and index framing to your brand while keeping the wire architecture intact.",
  },
] as const

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/pricing',
    title: `Press distribution pricing | ${siteIdentity.name}`,
    description: `Compare Basic, Pro, and Premium plans for ${siteIdentity.name} newswire distribution, add-ons, and FAQs.`,
    keywords: ['pricing', 'press distribution', 'newswire', siteIdentity.name],
  })
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--brand-ink)]">
      <NavbarShell />
      <main>
        <section
          className="relative overflow-hidden border-b border-slate-200/80"
          style={{
            background: 'radial-gradient(1000px 500px at 20% 0%, rgba(251,113,133,0.22), transparent), linear-gradient(120deg, #1a0a0d, #4c0516 50%, #9a031e)',
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.18) 0, rgba(255,255,255,0.18) 1px, transparent 1px, transparent 10px)',
            }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-6xl px-4 py-16 text-white sm:px-6 sm:py-20">
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Press distribution that scales with your story calendar</h1>
            <p className="mt-4 max-w-2xl text-rose-100/90">
              {SITE_CONFIG.description}
            </p>
          </div>
        </section>

        <div className="mx-auto -mt-10 max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={[
                  'flex flex-col rounded-2xl border p-6 shadow-sm [transition:transform_0.25s_var(--motion-ease),box-shadow_0.25s] hover:-translate-y-0.5 hover:shadow-lg',
                  plan.highlight
                    ? 'border-[#fda4af] bg-white shadow-slate-300/30 ring-2 ring-[#fda4af]/50'
                    : 'border-slate-200/80 bg-white',
                ].join(' ')}
              >
                {plan.highlight && (
                  <p className="w-fit rounded-full bg-[#ffe4e6] px-2.5 py-0.5 text-[0.65rem] font-extrabold uppercase tracking-wider text-[#9a031e]">
                    Most popular
                  </p>
                )}
                <h2 className="mt-2 font-display text-2xl font-bold">{plan.name}</h2>
                <p className="mt-1 text-sm text-[var(--brand-muted)]">{plan.blurb}</p>
                <p className="mt-5 text-3xl font-bold text-[var(--brand-ink)]">
                  {plan.price}
                  <span className="ml-1 text-sm font-medium text-rose-400/80">{plan.cadence}</span>
                </p>
                <ul className="mt-6 grow space-y-2.5 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button
                    asChild
                    className={
                      plan.highlight
                        ? 'h-11 w-full rounded-xl bg-[var(--brand-red)] font-semibold hover:bg-[#7a0214]'
                        : 'h-11 w-full rounded-xl border border-slate-300/90 bg-slate-100/60 font-semibold text-[var(--brand-ink)] hover:bg-slate-100'
                    }
                  >
                    <Link href="/contact">{plan.name === 'Premium' ? 'Contact sales' : 'Start now'}</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-2xl font-bold">Comparison</h2>
          <p className="mt-2 text-sm text-[var(--brand-muted)]">Where plans differ on distribution support and visibility signals.</p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200/80 bg-white">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="border-b border-slate-200/80 bg-slate-100/80 text-[var(--brand-muted)]">
                <tr>
                  <th className="p-3 font-semibold">Feature</th>
                  <th className="p-3 font-semibold">Basic</th>
                  <th className="p-3 font-semibold">Pro</th>
                  <th className="p-3 font-semibold">Premium</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Index placement depth', 'Core', 'Expanded', 'Priority + rotation'],
                  ['Reader analytics', 'Summary', 'Weekly', 'Custom snapshot'],
                  ['Add-on: translation', 'A la carte', 'Bundle', 'Retainer'],
                  ['Target industry packs', '—', 'Optional', 'Bundled where needed'],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-slate-100/90">
                    {row.map((cell) => (
                      <td key={cell} className="p-3">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="border-y border-slate-200/80 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="font-display text-2xl font-bold text-[var(--brand-orange)]">Add-ons</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {addOns.map((a) => (
                <div
                  key={a.title}
                  className="rounded-2xl border border-[#e36414]/30 bg-gradient-to-br from-[#fff8f3] to-white p-5 shadow-[0_4px_14px_rgba(227,100,20,0.08)] [transition:box-shadow_0.25s,border-color_0.25s] hover:border-[#e36414]/50 hover:shadow-[0_8px_22px_rgba(227,100,20,0.16)]"
                >
                  <p className="text-sm font-bold text-[var(--brand-ink)]">{a.title}</p>
                  <p className="mt-2 text-sm text-[var(--brand-muted)]">{a.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-[var(--brand-muted)]">
              * &ldquo;Unlimited&rdquo; releases on Premium are subject to desk fair-use, abuse monitoring, and category eligibility—your account lead will confirm
              the exact run-rate that fits your newsroom.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="flex items-center gap-2 font-display text-2xl font-bold">
            <HelpCircle className="h-6 w-6 text-[var(--brand-orange)]" />
            FAQs
          </h2>
          <Accordion type="single" collapsible className="mt-4 w-full">
            {faqs.map((item) => (
              <AccordionItem key={item.q} value={item.q} className="border-slate-200/80">
                <AccordionTrigger className="text-left text-base font-semibold [font-family:var(--site-font-sans)] hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-[var(--brand-muted)] leading-relaxed">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section
          className="mx-4 mb-20 max-w-6xl rounded-3xl border border-slate-200/80 bg-white sm:mx-auto"
          style={{ padding: '2rem 1.5rem' }}
        >
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="font-display text-2xl font-bold text-[var(--brand-ink)]">{siteContent.cta.title}</p>
              <p className="mt-1 max-w-xl text-sm text-[var(--brand-muted)]">{siteContent.cta.description}</p>
            </div>
            <Button asChild className="h-12 rounded-xl bg-[#9a031e] font-semibold text-white hover:bg-[#7a0214]">
              <Link href="/contact">{siteContent.cta.primaryCta.label}</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
