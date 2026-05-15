'use client'

import Link from 'next/link'
import { Newspaper, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export const REGISTER_PAGE_OVERRIDE_ENABLED = true

const benefits = [
  'Distribute to 500+ verified media outlets',
  'Google News indexing on every release',
  'Real-time pickup tracking & analytics',
  'Editorial review add-on available',
  'Multilingual distribution in 20+ languages',
  'Free plan — no credit card required',
]

export function RegisterPageOverride() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid min-h-[640px] overflow-hidden rounded-3xl border border-gray-200 shadow-[0_24px_80px_rgba(0,0,0,0.08)] lg:grid-cols-[1fr_1fr]">

          {/* ── LEFT PANEL ── dark brand side ── */}
          <div
            className="relative flex flex-col justify-between overflow-hidden p-8 sm:p-10"
            style={{ background: 'linear-gradient(145deg, #0f0700 0%, #1e0c00 50%, #2d1500 100%)' }}
          >
            {/* Grid texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)',
                backgroundSize: '50px 50px',
              }}
              aria-hidden
            />
            {/* Glow blobs */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #F7931E, transparent 70%)' }} aria-hidden />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full opacity-25" style={{ background: 'radial-gradient(circle, #F05A28, transparent 70%)' }} aria-hidden />

            {/* Logo */}
            <div className="relative flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F05A28] text-white shadow-lg shadow-[#F05A28]/40">
                <Newspaper className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-lg font-bold text-white">{SITE_CONFIG.name}</p>
                <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/40">Press Release Platform</p>
              </div>
            </div>

            {/* Headline */}
            <div className="relative mt-10">
              <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                Get your story in front of{' '}
                <span style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', backgroundImage: 'linear-gradient(90deg, #F05A28, #F7931E)' }}>
                  the right journalists.
                </span>
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/50">
                Join thousands of brands and PR professionals who use Presslyy to publish press releases that get noticed, shared, and cited.
              </p>
            </div>

            {/* Benefits checklist */}
            <div className="relative mt-10 space-y-3">
              {benefits.map((b) => (
                <div key={b} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F05A28]/25 text-[#F7931E]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-sm text-white/65">{b}</p>
                </div>
              ))}
            </div>

            {/* Bottom stat strip */}
            <div className="relative mt-8 flex flex-wrap gap-6 border-t border-white/8 pt-6">
              {[['50K+', 'Releases'], ['500+', 'Outlets'], ['4 hrs', 'Avg. Pickup']].map(([val, lbl]) => (
                <div key={lbl}>
                  <p className="font-display text-xl font-bold text-[#F7931E]">{val}</p>
                  <p className="text-[0.65rem] text-white/35">{lbl}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT PANEL ── form ── */}
          <div className="flex flex-col justify-center bg-white p-8 sm:p-10">
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#F05A28]">Free to start</p>
              <h1 className="mt-2 font-display text-3xl font-bold text-gray-900">Create your account</h1>
              <p className="mt-2 text-sm text-gray-400">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-[#F05A28] hover:underline">
                  Sign in
                </Link>
              </p>
            </div>

            <form className="mt-8 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Full name <span className="text-[#F05A28]">*</span>
                </label>
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Smith"
                  className="mt-1.5 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#F05A28]/50 focus:bg-white focus:ring-2 focus:ring-[#F05A28]/15"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Work email <span className="text-[#F05A28]">*</span>
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="jane@company.com"
                  className="mt-1.5 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#F05A28]/50 focus:bg-white focus:ring-2 focus:ring-[#F05A28]/15"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Password <span className="text-[#F05A28]">*</span>
                </label>
                <div className="relative mt-1.5">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="Min. 8 characters"
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 pr-11 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#F05A28]/50 focus:bg-white focus:ring-2 focus:ring-[#F05A28]/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Organisation type */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Organisation type
                </label>
                <select
                  className="mt-1.5 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition focus:border-[#F05A28]/50 focus:bg-white focus:ring-2 focus:ring-[#F05A28]/15"
                  defaultValue=""
                >
                  <option value="" disabled>Select your organisation type</option>
                  <option value="business">Business / brand</option>
                  <option value="agency">PR agency</option>
                  <option value="startup">Startup</option>
                  <option value="media">Media / journalist</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F05A28] text-sm font-bold text-white shadow-md shadow-[#F05A28]/25 transition hover:-translate-y-0.5 hover:bg-[#d44820]"
              >
                Create free account <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-100" />
              <span className="text-xs text-gray-400">or sign up with</span>
              <div className="h-px flex-1 bg-gray-100" />
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Google', logo: 'G' },
                { label: 'LinkedIn', logo: 'in' },
              ].map((s) => (
                <button
                  key={s.label}
                  type="button"
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-[0.65rem] font-black">
                    {s.logo}
                  </span>
                  {s.label}
                </button>
              ))}
            </div>

            <p className="mt-8 text-center text-xs text-gray-400">
              By creating an account you agree to our{' '}
              <Link href="/terms" className="font-medium text-gray-500 hover:text-[#F05A28]">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="font-medium text-gray-500 hover:text-[#F05A28]">Privacy Policy</Link>.
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
