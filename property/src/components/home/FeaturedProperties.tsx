'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { PropertyCard } from '@/components/property/PropertyCard'
import { MOCK_PROPERTIES } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const TABS = [
  { label: 'Featured', value: 'featured' },
  { label: 'For Sale', value: 'buy' },
  { label: 'For Rent', value: 'rent' },
  { label: 'New Launch', value: 'new' },
]

export function FeaturedProperties() {
  const [activeTab, setActiveTab] = useState('featured')

  const filtered = MOCK_PROPERTIES.filter(p => {
    if (activeTab === 'featured') return p.isFeatured
    if (activeTab === 'new') return p.isNew
    return p.listingType === activeTab
  }).slice(0, 6)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="section-title">All Property Needs — One Portal</h2>
          <p className="section-sub">Find Better Places to Live, Work and Wonder</p>
        </div>
        <Link href="/buy" className="hidden sm:flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              'px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border',
              activeTab === tab.value
                ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                : 'bg-white text-neutral-600 border-neutral-200 hover:border-brand-300 hover:text-brand-600'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-12 text-neutral-400">
            No properties found. Check back soon.
          </div>
        )}
      </div>

      <div className="text-center mt-8">
        <Link href="/buy" className="btn-outline inline-flex items-center gap-2">
          Explore All Properties <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}
