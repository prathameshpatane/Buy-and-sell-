import Link from 'next/link'
import { Building2, MapPin, Phone, Mail } from 'lucide-react'

const FOOTER_LINKS = {
  'Quick Links': [
    { label: 'Buy Property', href: '/buy' },
    { label: 'Rent Property', href: '/rent' },
    { label: 'PG / Co-living', href: '/pg' },
    { label: 'Commercial', href: '/commercial' },
    { label: 'Plots & Land', href: '/plots' },
    { label: 'New Projects', href: '/projects' },
  ],
  'For Owners': [
    { label: 'Post Property Free', href: '/post-property' },
    { label: 'Owner Dashboard', href: '/dashboard' },
    { label: 'Subscription Plans', href: '/pricing' },
    { label: 'Manage Listings', href: '/dashboard' },
    { label: 'View Leads', href: '/dashboard' },
  ],
  'For Agents & Builders': [
    { label: 'Agent Registration', href: '/auth-register' },
    { label: 'Builder Registration', href: '/auth-register' },
    { label: 'Agent Dashboard', href: '/dashboard' },
    { label: 'Builder Dashboard', href: '/dashboard' },
    { label: 'Premium Plans', href: '/pricing' },
  ],
  'Company': [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog & Insights', href: '/insights' },
    { label: 'Media & Press', href: '/press' },
    { label: 'Contact Us', href: '/contact' },
  ],
}

const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
  'Kolkata', 'Pune', 'Ahmedabad', 'Noida', 'Gurugram',
  'Navi Mumbai', 'Jaipur',
]

// SVG social icons — lucide-react does not include social media brands
const SOCIAL = [
  {
    label: 'Facebook',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Prop<span className="text-accent-400">Space</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              India&apos;s trusted real estate portal for buying, selling, and renting residential
              and commercial properties. Connecting buyers, sellers, agents, and builders since 2024.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0 text-brand-400" />
                <span>123, Tower B, Cyber Park, Gurugram, Haryana 122001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-brand-400" />
                <span>1800-123-4567 (Toll Free)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-brand-400" />
                <span>support@propspace.in</span>
              </div>
            </div>

            {/* Social icons using inline SVG */}
            <div className="flex items-center gap-3 mt-6">
              {SOCIAL.map(({ label, href, svg }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-brand-500 transition-colors text-neutral-400 hover:text-white"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-semibold text-sm mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-brand-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Popular cities */}
        <div className="border-t border-neutral-800 mt-10 pt-8">
          <h4 className="text-white font-semibold text-sm mb-4">Popular Cities</h4>
          <div className="flex flex-wrap gap-2">
            {CITIES.map((city) => (
              <Link
                key={city}
                href={`/buy?city=${city.toLowerCase()}`}
                className="text-xs bg-neutral-800 hover:bg-brand-600 hover:text-white px-3 py-1.5 rounded-full transition-colors"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© 2024 PropSpace Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy"    className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms"      className="hover:text-white">Terms of Use</Link>
            <Link href="/disclaimer" className="hover:text-white">Disclaimer</Link>
            <Link href="/feedback"   className="hover:text-white">Feedback</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
