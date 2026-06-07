import type { Metadata } from 'next'
import { Suspense } from 'react'
import SearchPage from '@/app/search/page'

export const metadata: Metadata = {
  title: 'Commercial Property – Office, Shops | PropSpace',
}

export default function CommercialPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-400">Loading...</div>}>
      <SearchPage />
    </Suspense>
  )
}
