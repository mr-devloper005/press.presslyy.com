import Link from 'next/link'
import { ArrowUpRight, MessageSquare } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

export function ContactPageOverride() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NavbarShell />
      <main>

        {/* ── PAGE HEADER ── dark hero band ── */}
        <section
          className="relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0f0700 0%, #1e0c00 50%, #2d1500 100%)' }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)',
              backgroundSize: '60px 60px',
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #F7931E, transparent 70%)' }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-16 bottom-0 h-60 w-60 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #F05A28, transparent 70%)' }}
            aria-hidden
          />

          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#F05A28]/40 bg-[#F05A28]/15 px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#F7931E]">
              <MessageSquare className="h-3 w-3" /> Contact
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Let's talk about your story.
            </h1>
            <p className="mt-3 max-w-2xl text-white/55">
              Distribution questions, account setup, editorial routing, or partnership enquiries — our team is ready to help you get covered.
            </p>


          </div>
        </section>

        {/* ── FORM + IMAGE ── */}
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-18">

          {/* Form card */}
          <div className="order-2 rounded-2xl border border-gray-200 bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.07)] sm:p-9 lg:order-1">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F05A28] text-white shadow-md shadow-[#F05A28]/30">
                <MessageSquare className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Send us a message</h2>
                <p className="text-xs text-gray-400">We'll get back to you within 2 hours</p>
              </div>
            </div>

            <form className="mt-7 space-y-5">
              {/* Name + Phone */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Full Name <span className="text-[#F05A28]">*</span>
                  </label>
                  <input
                    className="mt-1.5 h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition focus:border-[#F05A28]/50 focus:bg-white focus:ring-2 focus:ring-[#F05A28]/15 placeholder:text-gray-400"
                    placeholder="Jane Smith"
                    type="text"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Phone</label>
                  <input
                    className="mt-1.5 h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition focus:border-[#F05A28]/50 focus:bg-white focus:ring-2 focus:ring-[#F05A28]/15 placeholder:text-gray-400"
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                    autoComplete="tel"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Work Email <span className="text-[#F05A28]">*</span>
                </label>
                <input
                  className="mt-1.5 h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition focus:border-[#F05A28]/50 focus:bg-white focus:ring-2 focus:ring-[#F05A28]/15 placeholder:text-gray-400"
                  placeholder="jane@company.com"
                  type="email"
                  autoComplete="email"
                />
              </div>

              {/* Org + Subject */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Organisation type</label>
                  <select
                    className="mt-1.5 h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition focus:border-[#F05A28]/50 focus:bg-white focus:ring-2 focus:ring-[#F05A28]/15"
                    defaultValue="business"
                  >
                    <option value="business">Business / brand</option>
                    <option value="agency">PR agency</option>
                    <option value="media">Media / journalist</option>
                    <option value="startup">Startup</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Enquiry type</label>
                  <select
                    className="mt-1.5 h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition focus:border-[#F05A28]/50 focus:bg-white focus:ring-2 focus:ring-[#F05A28]/15"
                    defaultValue="distribution"
                  >
                    <option value="distribution">Press distribution</option>
                    <option value="billing">Plans &amp; billing</option>
                    <option value="editorial">Editorial services</option>
                    <option value="technical">Technical / access</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Message <span className="text-[#F05A28]">*</span>
                </label>
                <textarea
                  className="mt-1.5 min-h-[140px] w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#F05A28]/50 focus:bg-white focus:ring-2 focus:ring-[#F05A28]/15 placeholder:text-gray-400"
                  placeholder="Tell us about your release, timeline, and any specific distribution requirements…"
                />
              </div>

              {/* Privacy */}
              <p className="text-xs text-gray-400">
                By submitting, you agree we may use this information to respond. See our{' '}
                <Link className="font-semibold text-[#F05A28] hover:underline" href="/privacy">
                  Privacy Policy
                </Link>
                .
              </p>

              {/* Submit */}
              <Button
                type="button"
                className="h-12 w-full rounded-xl bg-[#F05A28] text-sm font-bold text-white shadow-md shadow-[#F05A28]/25 transition hover:bg-[#d44820] sm:w-auto sm:px-8"
              >
                Send Message <ArrowUpRight className="ml-1.5 inline h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Right column */}
          <div className="order-1 flex flex-col gap-5 lg:order-2">
            {/* Why contact card */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h3 className="font-display text-base font-bold text-gray-900">Why reach out?</h3>
              <ul className="mt-4 space-y-3">
                {[
                  'Get a custom distribution quote for your industry',
                  'Ask about editorial review and copywriting add-ons',
                  'Discuss bulk plans for agencies and PR teams',
                  'Report a technical issue or account problem',
                  'Explore media partnership opportunities',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F05A28]/12 text-[#F05A28]">
                      <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 8 8">
                        <path d="M6.41 1L3 4.41 1.59 3 0 4.59 3 7.59 8 2.59z" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick links */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Quick links</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  { label: 'View pricing', href: '/pricing' },
                  { label: 'Browse releases', href: '/updates' },
                  { label: 'About us', href: '/about' },
                ].map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:border-[#F05A28]/40 hover:text-[#F05A28]"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  )
}
