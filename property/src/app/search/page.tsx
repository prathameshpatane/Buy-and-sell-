import { Suspense } from 'react'
import SearchPage from './SearchPage'

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-50 flex items-center justify-center">Loading...</div>}>
      <SearchPage />
    </Suspense>
  )
}
