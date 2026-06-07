import type { Metadata } from 'next'
import { Suspense } from 'react'
import SearchPage from '@/app/search/page'

export const metadata: Metadata = {
  title: 'Rent Property in India – Flats, Houses, Apartments | PropSpace',
  description: 'Find rental properties across India. Verified listings from owners & agents. Zero brokerage options.',
}

export default function RentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-400">Loading...</div>}>
      <SearchPage params={{ type: 'rent' }} />
    </Suspense>
  )
}