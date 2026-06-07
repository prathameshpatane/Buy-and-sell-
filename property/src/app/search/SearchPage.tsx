'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal, Grid3X3, List, ChevronDown, X, MapPin } from 'lucide-react'
import { PropertyCard } from '@/components/property/PropertyCard'
import { MOCK_PROPERTIES } from '@/lib/mock-data'
import { cn, SORT_OPTIONS, BEDROOM_OPTIONS } from '@/lib/utils'
import { SearchBar } from '@/components/search/SearchBar'

const PRICE_RANGES = [
  { label: 'Under 50 Lac', min: 0, max: 5000000 },
  { label: '50L – 1 Cr', min: 5000000, max: 10000000 },
  { label: '1 Cr – 2 Cr', min: 10000000, max: 20000000 },
  { label: '2 Cr – 5 Cr', min: 20000000, max: 50000000 },
  { label: 'Above 5 Cr', min: 50000000, max: Infinity },
]

export default function SearchPage({ params }: { params?: { type?: string } } = {}) {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || ''
  const type = params?.type || searchParams.get('type') || 'buy'

  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('relevance')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedBeds, setSelectedBeds] = useState<number[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null)
  const [postedBy, setPostedBy] = useState<string[]>([])
  const [furnishing, setFurnishing] = useState<string[]>([])

  const properties = MOCK_PROPERTIES.filter(p =>
    type === 'all' || p.listingType === type ||
    (type === 'buy' && p.listingType === 'buy')
  )

  function toggleArr<T>(arr: T[], val: T): T[] {
    return arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top search bar */}
      <div className="bg-brand-600 py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <SearchBar variant="compact" defaultTab={type} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar filters */}
          <aside className={cn(
            'w-72 shrink-0 hidden lg:block'
          )}>
            <div className="bg-white rounded-2xl shadow-card p-5 sticky top-20">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-neutral-800">Filters</h3>
                <button className="text-xs text-brand-600 font-medium hover:underline">Clear All</button>
              </div>

              {/* Budget */}
              <FilterSection title="Budget">
                {PRICE_RANGES.map((r, i) => (
                  <label key={i} className="flex items-center gap-2 py-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={selectedPriceRange === i}
                      onChange={() => setSelectedPriceRange(i)}
                      className="accent-brand-600"
                    />
                    <span className="text-sm text-neutral-700">{r.label}</span>
                  </label>
                ))}
              </FilterSection>

              {/* Bedrooms */}
              <FilterSection title="Bedrooms">
                <div className="flex flex-wrap gap-2">
                  {BEDROOM_OPTIONS.map(n => (
                    <button
                      key={n}
                      onClick={() => setSelectedBeds(toggleArr(selectedBeds, n))}
                      className={cn(
                        'w-10 h-10 rounded-xl text-sm font-medium border transition-all',
                        selectedBeds.includes(n)
                          ? 'bg-brand-600 text-white border-brand-600'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:border-brand-300'
                      )}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    onClick={() => setSelectedBeds(toggleArr(selectedBeds, 5))}
                    className={cn(
                      'px-3 h-10 rounded-xl text-sm font-medium border transition-all',
                      selectedBeds.includes(5)
                        ? 'bg-brand-600 text-white border-brand-600'
                        : 'bg-white text-neutral-700 border-neutral-200'
                    )}
                  >
                    5+
                  </button>
                </div>
              </FilterSection>

              {/* Posted By */}
              <FilterSection title="Posted By">
                {['Owner', 'Agent', 'Builder'].map(p => (
                  <label key={p} className="flex items-center gap-2 py-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={postedBy.includes(p)}
                      onChange={() => setPostedBy(toggleArr(postedBy, p))}
                      className="accent-brand-600"
                    />
                    <span className="text-sm text-neutral-700">{p}</span>
                  </label>
                ))}
              </FilterSection>

              {/* Furnishing */}
              <FilterSection title="Furnishing Status">
                {['Furnished', 'Semi-Furnished', 'Unfurnished'].map(f => (
                  <label key={f} className="flex items-center gap-2 py-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={furnishing.includes(f)}
                      onChange={() => setFurnishing(toggleArr(furnishing, f))}
                      className="accent-brand-600"
                    />
                    <span className="text-sm text-neutral-700">{f}</span>
                  </label>
                ))}
              </FilterSection>

              {/* Construction Status */}
              <FilterSection title="Construction Status">
                {['Ready to Move', 'Under Construction', 'New Launch'].map(s => (
                  <label key={s} className="flex items-center gap-2 py-1.5 cursor-pointer">
                    <input type="checkbox" className="accent-brand-600" />
                    <span className="text-sm text-neutral-700">{s}</span>
                  </label>
                ))}
              </FilterSection>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Results header */}
            <div className="flex items-center justify-between mb-5 bg-white rounded-2xl px-5 py-3.5 shadow-card">
              <div>
                <p className="font-semibold text-neutral-800">
                  {properties.length.toLocaleString()} Properties
                  {q && <span className="text-neutral-400 font-normal"> for &ldquo;{q}&rdquo;</span>}
                </p>
                <p className="text-xs text-neutral-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" /> All India
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="appearance-none bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2 text-sm text-neutral-700 pr-8 cursor-pointer focus:outline-none focus:border-brand-300"
                  >
                    {SORT_OPTIONS.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                </div>

                {/* View toggle */}
                <div className="flex items-center bg-neutral-100 rounded-xl p-1">
                  <button
                    onClick={() => setView('grid')}
                    className={cn('p-1.5 rounded-lg transition-colors', view === 'grid' ? 'bg-white shadow-sm text-brand-600' : 'text-neutral-400')}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className={cn('p-1.5 rounded-lg transition-colors', view === 'list' ? 'bg-white shadow-sm text-brand-600' : 'text-neutral-400')}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Filter button (mobile) */}
                <button
                  onClick={() => setFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 btn-outline"
                >
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                </button>
              </div>
            </div>

            {/* Active filters chips */}
            {(selectedBeds.length > 0 || postedBy.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedBeds.map(b => (
                  <span key={b} className="flex items-center gap-1 bg-brand-50 text-brand-700 text-xs px-3 py-1.5 rounded-full font-medium">
                    {b} BHK
                    <button onClick={() => setSelectedBeds(selectedBeds.filter(x => x !== b))}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {postedBy.map(p => (
                  <span key={p} className="flex items-center gap-1 bg-brand-50 text-brand-700 text-xs px-3 py-1.5 rounded-full font-medium">
                    {p}
                    <button onClick={() => setPostedBy(postedBy.filter(x => x !== p))}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Property grid/list */}
            <div className={cn(
              view === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 gap-5'
                : 'flex flex-col gap-4'
            )}>
              {properties.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  horizontal={view === 'list'}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-10">
              {[1, 2, 3, 4, 5].map(page => (
                <button
                  key={page}
                  className={cn(
                    'w-9 h-9 rounded-xl text-sm font-medium transition-colors',
                    page === 1 ? 'bg-brand-600 text-white' : 'bg-white text-neutral-700 hover:border-brand-300 border border-neutral-200'
                  )}
                >
                  {page}
                </button>
              ))}
              <span className="text-neutral-400 px-1">...</span>
              <button className="w-9 h-9 rounded-xl border border-neutral-200 text-sm text-neutral-700 hover:border-brand-300">
                12
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="mb-5 border-b border-neutral-100 pb-5 last:border-0 last:pb-0 last:mb-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-semibold text-neutral-800 mb-3"
      >
        {title}
        <ChevronDown className={cn('w-4 h-4 transition-transform', open && 'rotate-180')} />
      </button>
      {open && <div>{children}</div>}
    </div>
  )
}
