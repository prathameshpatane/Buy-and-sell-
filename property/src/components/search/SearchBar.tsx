'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Mic, LocateFixed, X, ChevronDown } from 'lucide-react'
import { cn, LISTING_TABS, POPULAR_CITIES } from '@/lib/utils'

interface SearchBarProps {
  variant?: 'hero' | 'compact'
  defaultTab?: string
}

const SUGGESTIONS = [
  'Koramangala, Bangalore',
  'Sector 62, Noida',
  'Bandra West, Mumbai',
  'Jubilee Hills, Hyderabad',
  'Anna Nagar, Chennai',
  'Salt Lake, Kolkata',
  'Viman Nagar, Pune',
  'Bopal, Ahmedabad',
]

export function SearchBar({ variant = 'hero', defaultTab = 'buy' }: SearchBarProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [propertyType, setPropertyType] = useState('All Residential')
  const [typeOpen, setTypeOpen] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  const filteredSuggestions = query
    ? SUGGESTIONS.filter(s => s.toLowerCase().includes(query.toLowerCase()))
    : SUGGESTIONS

  useEffect(() => {
    function outside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
        setTypeOpen(false)
      }
    }
    document.addEventListener('mousedown', outside)
    return () => document.removeEventListener('mousedown', outside)
  }, [])

  function handleSearch() {
    if (!query.trim()) return
    router.push(`/search?type=${activeTab}&q=${encodeURIComponent(query)}`)
  }

  const PROP_TYPES = [
    'All Residential', 'Apartment', 'Villa / House', 'Studio Apartment',
    'Farm House', 'Serviced Apartments',
  ]

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2 bg-white rounded-2xl border border-neutral-200 shadow-sm px-4 py-2.5 max-w-2xl w-full">
        <Search className="w-4 h-4 text-neutral-400 shrink-0" />
        <input
          type="text"
          placeholder="Enter Locality / Project / Society / Landmark"
          className="flex-1 text-sm outline-none text-neutral-800 placeholder:text-neutral-400"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} className="btn-primary text-sm px-4 py-2">Search</button>
      </div>
    )
  }

  return (
    <div ref={wrapRef} className="w-full max-w-3xl mx-auto">
      {/* Tabs */}
      <div className="flex items-center gap-1 mb-0">
        {LISTING_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              'px-5 py-3 text-sm font-semibold rounded-t-2xl transition-all duration-200 relative',
              activeTab === tab.value
                ? 'bg-white text-brand-600 shadow-sm'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            )}
          >
            {tab.label}
            {tab.value === 'projects' && (
              <span className="absolute -top-1.5 -right-1 bg-orange-500 text-white text-[8px] px-1 rounded font-bold">NEW</span>
            )}
          </button>
        ))}
        <div className="ml-auto">
          <button className="btn-primary text-sm flex items-center gap-1 rounded-t-2xl rounded-b-none py-3">
            Post Property
            <span className="text-[9px] bg-white/20 px-1 rounded font-bold">FREE</span>
          </button>
        </div>
      </div>

      {/* Search box */}
      <div className="bg-white rounded-2xl rounded-tl-none shadow-search p-4 sm:p-5">
        <div className="flex items-center gap-3">
          {/* Property type selector */}
          <div className="relative shrink-0">
            <button
              onClick={() => setTypeOpen(!typeOpen)}
              className="flex items-center gap-1.5 text-sm font-medium text-neutral-700 border-r border-neutral-200 pr-4 mr-1 whitespace-nowrap hover:text-brand-600 transition-colors"
            >
              {propertyType}
              <ChevronDown className={cn('w-4 h-4 transition-transform', typeOpen && 'rotate-180')} />
            </button>
            {typeOpen && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-lg border border-neutral-100 py-2 z-10 animate-fade-in">
                {PROP_TYPES.map(t => (
                  <button
                    key={t}
                    onClick={() => { setPropertyType(t); setTypeOpen(false) }}
                    className={cn(
                      'w-full text-left px-4 py-2.5 text-sm hover:bg-brand-50 hover:text-brand-600 transition-colors',
                      propertyType === t && 'text-brand-600 font-medium'
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search input */}
          <div className="flex-1 relative">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder={`Search for locality, project or landmark in ${activeTab === 'buy' ? 'India' : 'your city'}...`}
              className="w-full pl-7 pr-6 text-sm outline-none text-neutral-800 placeholder:text-neutral-400"
              value={query}
              onChange={e => { setQuery(e.target.value); setShowSuggestions(true) }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-0 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-neutral-400 hover:text-neutral-600" />
              </button>
            )}

            {/* Suggestions dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-lg border border-neutral-100 py-2 z-20 animate-fade-in">
                <div className="px-4 py-1.5 text-xs text-neutral-400 font-semibold uppercase tracking-wide">
                  {query ? 'Suggestions' : 'Popular Searches'}
                </div>
                {filteredSuggestions.map(s => (
                  <button
                    key={s}
                    onClick={() => { setQuery(s); setShowSuggestions(false); handleSearch() }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-neutral-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                    {s}
                  </button>
                ))}
                <div className="border-t border-neutral-100 mt-1 pt-1 px-4 py-1.5 text-xs text-neutral-400 font-semibold uppercase tracking-wide">
                  Popular Cities
                </div>
                <div className="flex flex-wrap gap-2 px-4 pb-3">
                  {POPULAR_CITIES.slice(0, 6).map(city => (
                    <button
                      key={city}
                      onClick={() => { setQuery(city); setShowSuggestions(false) }}
                      className="text-xs bg-neutral-100 hover:bg-brand-50 hover:text-brand-600 px-3 py-1.5 rounded-full transition-colors"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              title="Use current location"
              className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-brand-600 transition-colors"
            >
              <LocateFixed className="w-5 h-5" />
            </button>
            <button
              title="Voice search"
              className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-brand-600 transition-colors"
            >
              <Mic className="w-5 h-5" />
            </button>
            <button
              onClick={handleSearch}
              className="btn-primary flex items-center gap-2 px-6"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}