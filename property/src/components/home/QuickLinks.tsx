import Link from 'next/link'
import Image from 'next/image'

const LINKS = [
  {
    label: 'Buying a Home',
    href: '/buy',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80',
    color: 'from-blue-500/80',
  },
  {
    label: 'Renting a Home',
    href: '/rent',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80',
    color: 'from-purple-500/80',
  },
  {
    label: 'Invest in Real Estate',
    href: '/projects',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80',
    badge: 'NEW',
    color: 'from-green-500/80',
  },
  {
    label: 'Sell / Rent Your Property',
    href: '/post-property',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80',
    color: 'from-orange-500/80',
  },
  {
    label: 'Plots / Land',
    href: '/plots',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80',
    color: 'from-emerald-500/80',
  },
  {
    label: 'Explore Insights',
    href: '/insights',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
    badge: 'NEW',
    color: 'from-indigo-500/80',
  },
  {
    label: 'PG / Co-living',
    href: '/pg',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80',
    color: 'from-pink-500/80',
  },
  {
    label: 'Commercial',
    href: '/commercial',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
    color: 'from-slate-600/80',
  },
]

export function QuickLinks() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p className="text-center text-xs text-neutral-400 uppercase tracking-widest font-semibold mb-4">
        Get Started with Exploring Real Estate Options
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="group relative rounded-2xl overflow-hidden aspect-square flex items-end p-3 hover:scale-[1.03] transition-transform duration-300 shadow-md"
          >
            <Image
              src={link.image}
              alt={link.label}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, 12.5vw"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${link.color} to-transparent`} />
            {link.badge && (
              <span className="absolute top-2 left-2 badge-new">{link.badge}</span>
            )}
            <span className="relative z-10 text-white text-[11px] font-semibold leading-tight">
              {link.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
