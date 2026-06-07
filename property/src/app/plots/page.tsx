import type { Metadata } from 'next'
import { Suspense } from 'react'
import SearchPage from '@/app/search/page'

export const metadata: Metadata = {
  title: 'Plots & Land for Sale in India | PropSpace',
  description: 'Buy residential & commercial plots across India. RERA verified land listings from owners & developers.',
}

export default function PlotsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-400">Loading...</div>}>
      <SearchPage params={{ type: 'plot' }} />
    </Suspense>
  )
}