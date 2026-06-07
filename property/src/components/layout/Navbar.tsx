'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu, X, ChevronDown, Search, Bell, Heart, User,
  Home, Building2, MapPin, Briefcase, TrendingUp, LogOut, Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  {
    label: 'Buy',
    href: '/buy',
    children: [
      { label: 'Apartments', href: '/buy?type=apartment', icon: Building2 },
      { label: 'Villas & Houses', href: '/buy?type=villa', icon: Home },
      { label: 'Plots & Land', href: '/plots', icon: MapPin },
      { label: 'Luxury Properties', href: '/buy?featured=true', icon: TrendingUp },
    ],
  },
  {
    label: 'Rent',
    href: '/rent',
    children: [
      { label: 'Apartments', href: '/rent?type=apartment', icon: Building2 },
      { label: 'Houses / Villas', href: '/rent?type=villa', icon: Home },
      { label: 'PG / Co-living', href: '/pg', icon: User },
    ],
  },
  { label: 'New Launch', href: '/projects', badge: 'NEW' },
  { label: 'Commercial', href: '/commercial' },
  { label: 'Plots/Land', href: '/plots' },
  { label: 'Insights', href: '/insights', badge: 'NEW' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isTransparent = isHome && !scrolled

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isTransparent
            ? 'bg-transparent'
            : 'bg-white border-b border-neutral-200 shadow-sm'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={dropdownRef}>
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center shadow-brand">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className={cn(
                'text-xl font-bold tracking-tight',
                isTransparent ? 'text-white' : 'text-brand-600'
              )}>
                Prop<span className="text-accent-500">Space</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="relative">
                  {link.children ? (
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                      className={cn(
                        'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        isTransparent
                          ? 'text-white/90 hover:text-white hover:bg-white/10'
                          : 'text-neutral-700 hover:text-brand-600 hover:bg-brand-50',
                        pathname.startsWith(link.href) && !isTransparent && 'text-brand-600 bg-brand-50'
                      )}
                    >
                      {link.label}
                      <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', activeDropdown === link.label && 'rotate-180')} />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        isTransparent
                          ? 'text-white/90 hover:text-white hover:bg-white/10'
                          : 'text-neutral-700 hover:text-brand-600 hover:bg-brand-50',
                        pathname.startsWith(link.href) && !isTransparent && 'text-brand-600 bg-brand-50'
                      )}
                    >
                      {link.label}
                      {link.badge && (
                        <span className="text-[9px] font-bold bg-orange-500 text-white px-1.5 py-0.5 rounded uppercase">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {link.children && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-2xl shadow-lg border border-neutral-100 py-2 animate-fade-in">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                        >
                          <child.icon className="w-4 h-4 text-neutral-400" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right section */}
            <div className="hidden lg:flex items-center gap-2">
              <button className={cn(
                'p-2 rounded-lg transition-colors',
                isTransparent ? 'text-white/80 hover:bg-white/10' : 'text-neutral-500 hover:bg-neutral-100'
              )}>
                <Bell className="w-5 h-5" />
              </button>
              <button className={cn(
                'p-2 rounded-lg transition-colors',
                isTransparent ? 'text-white/80 hover:bg-white/10' : 'text-neutral-500 hover:bg-neutral-100'
              )}>
                <Heart className="w-5 h-5" />
              </button>

              {/* User */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-xl transition-colors text-sm font-medium',
                    isTransparent
                      ? 'text-white border border-white/30 hover:bg-white/10'
                      : 'text-neutral-700 border border-neutral-200 hover:border-brand-300 hover:text-brand-600'
                  )}
                >
                  <div className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span>Account</span>
                  <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', userMenuOpen && 'rotate-180')} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-lg border border-neutral-100 py-2 animate-fade-in">
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50">
                      <User className="w-4 h-4" /> My Dashboard
                    </Link>
                    <Link href="/dashboard/wishlist" className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50">
                      <Heart className="w-4 h-4" /> Saved Properties
                    </Link>
                    <Link href="/dashboard/leads" className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50">
                      <Briefcase className="w-4 h-4" /> My Leads
                    </Link>
                    <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50">
                      <Settings className="w-4 h-4" /> Settings
                    </Link>
                    <div className="border-t border-neutral-100 mt-1 pt-1">
                      <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/post-property"
                className="btn-primary flex items-center gap-1.5"
              >
                Post Property
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-bold uppercase">FREE</span>
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(!open)}
              className={cn(
                'lg:hidden p-2 rounded-lg',
                isTransparent ? 'text-white' : 'text-neutral-700'
              )}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <span className="font-bold text-brand-600 text-lg">PropSpace</span>
              <button onClick={() => setOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-3 py-3 rounded-xl text-neutral-700 hover:bg-brand-50 hover:text-brand-600 font-medium"
                  >
                    {link.label}
                    {link.badge && <span className="badge-new">{link.badge}</span>}
                  </Link>
                  {link.children && (
                    <div className="pl-4 space-y-0.5 mt-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg"
                        >
                          <child.icon className="w-4 h-4" /> {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="p-4 border-t space-y-3">
              <Link href="/auth-login" onClick={() => setOpen(false)} className="btn-outline w-full text-center block">
                Sign In
              </Link>
              <Link href="/post-property" onClick={() => setOpen(false)} className="btn-primary w-full text-center block">
                Post Property FREE
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="h-16" />
    </>
  )
}