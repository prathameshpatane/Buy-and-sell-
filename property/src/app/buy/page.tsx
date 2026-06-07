import type { Metadata } from 'next'
import { Suspense } from 'react'
import SearchPage from '@/app/search/page'

export const metadata: Metadata = {
  title: 'Buy Property in India – Apartments, Villas, Plots | PropSpace',
  description: 'Search from lakhs of properties for sale across India. Verified listings from owners, agents & builders.',
}

export default function BuyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-400">Loading...</div>}>
      <SearchPage params={{ type: 'buy' }} />
    </Suspense>
  )
}