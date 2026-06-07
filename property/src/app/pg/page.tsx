import type { Metadata } from 'next'
import { Suspense } from 'react'
import SearchPage from '@/app/search/page'

export const metadata: Metadata = {
  title: 'PG / Co-living Accommodation in India | PropSpace',
  description: 'Find PG accommodations, hostels, and co-living spaces near you. Verified listings with photos.',
}

export default function PGPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-400">Loading...</div>}>
      <SearchPage params={{ type: 'pg' }} />
    </Suspense>
  )
}