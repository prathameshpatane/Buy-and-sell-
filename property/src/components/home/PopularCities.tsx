import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { MOCK_CITIES } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'

export function PopularCities() {
  return (
    <section className="bg-neutral-100 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Explore by City</h2>
            <p className="section-sub">Find properties in India&apos;s most sought-after cities</p>
          </div>
          <Link href="/buy" className="hidden sm:flex items-center gap-1 text-sm text-brand-600 font-medium hover:underline">
            All Cities <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Large cards */}
          {MOCK_CITIES.slice(0, 2).map(city => (
            <Link
              key={city.name}
              href={`/buy?city=${city.slug}`}
              className="group relative rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 col-span-1 row-span-2"
              style={{ height: 320 }}
            >
              {city.image && (
                <Image src={city.image} alt={city.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="300px" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white text-xl font-bold">{city.name}</h3>
                <p className="text-white/70 text-sm">{formatNumber(city.totalListings)} properties</p>
              </div>
            </Link>
          ))}

          {/* Smaller cards */}
          {MOCK_CITIES.slice(2, 8).map(city => (
            <Link
              key={city.name}
              href={`/buy?city=${city.slug}`}
              className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
              style={{ height: 150 }}
            >
              {city.image && (
                <Image src={city.image} alt={city.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="200px" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-white text-sm font-bold">{city.name}</h3>
                <p className="text-white/60 text-xs">{formatNumber(city.totalListings)} props</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
