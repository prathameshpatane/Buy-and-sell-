import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { PropertyCard } from '@/components/property/PropertyCard'
import { MOCK_PROPERTIES } from '@/lib/mock-data'

export function RecentlyViewed() {
  const props = MOCK_PROPERTIES.slice(0, 3)
  return (
    <section className="bg-neutral-50 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="section-title">Recently Viewed</h2>
            <p className="section-sub">Pick up where you left off</p>
          </div>
          <Link href="/buy" className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {props.map(p => <PropertyCard key={p.id} property={p} compact />)}
        </div>
      </div>
    </section>
  )
}
