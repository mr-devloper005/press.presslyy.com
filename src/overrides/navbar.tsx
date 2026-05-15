'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export const NAVBAR_OVERRIDE_ENABLED = true

const mainNav = [
  { label: 'Press Releases', href: '/updates' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const pathname = usePathname()
  const active = pathname === href || (href !== '/' && pathname.startsWith(href))
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
        active
          ? 'bg-[#F05A28]/12 text-[#F05A28]'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
      )}
    >
      {label}
    </Link>
  )
}

export function NavbarOverride() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-white transition-all duration-300',
        scrolled
          ? 'border-b border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
          : 'border-b border-gray-100',
      )}
    >
      <div
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6',
          scrolled ? 'h-[3.75rem]' : 'h-[4.25rem]',
        )}
      >
        {/* ── SVG Logo ── */}
        <Link href="/" className="flex shrink-0 items-center transition-opacity hover:opacity-85" aria-label="Presslyy home">
          <Image
            src="/logo.svg"
            alt="Presslyy"
            width={160}
            height={40}
            priority
            className={cn('transition-all duration-300', scrolled ? 'h-8 w-auto' : 'h-9 w-auto')}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {mainNav.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 sm:flex">
          <Button
            size="icon"
            variant="ghost"
            asChild
            className="rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <Link href="/search" aria-label="Search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            className="rounded-full bg-[#F05A28] px-5 font-semibold text-white shadow-sm shadow-[#F05A28]/25 transition hover:bg-[#d44820]"
          >
            <Link href="/register">Submit Release</Link>
          </Button>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1.5 sm:hidden">
          <Button size="icon" variant="ghost" asChild className="rounded-full text-gray-500 hover:bg-gray-100">
            <Link href="/search" aria-label="Search"><Search className="h-5 w-5" /></Link>
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="rounded-full text-gray-500 hover:bg-gray-100"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-3 py-3">
            {mainNav.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} onClick={() => setOpen(false)} />
            ))}
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-[#F05A28] px-4 py-3 text-center text-sm font-bold text-white"
            >
              Submit Release
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
