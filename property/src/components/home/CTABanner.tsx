import Link from 'next/link'
import { ArrowRight, Building2 } from 'lucide-react'

export function CTABanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
      <div className="relative bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(circle at 80% 50%, #fff 0%, transparent 50%)` }} />

        <div className="relative z-10 px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-6 h-6 text-blue-300" />
              <span className="text-blue-200 text-sm font-semibold uppercase tracking-wide">For Property Owners</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              List Your Property for <span className="text-accent-400">FREE</span>
            </h2>
            <p className="text-blue-200 max-w-lg leading-relaxed">
              Reach crores of buyers and tenants across India. Get verified leads, manage inquiries, and close deals faster — all from one dashboard.
            </p>
            <div className="flex items-center gap-4 mt-4 text-sm text-blue-200">
              <span>✅ No Brokerage</span>
              <span>✅ Verified Leads</span>
              <span>✅ Free Listing</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <Link
              href="/post-property"
              className="flex items-center gap-2 bg-white text-brand-700 font-bold px-8 py-3.5 rounded-2xl hover:bg-blue-50 transition-colors text-sm shadow-lg"
            >
              Post Property Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="flex items-center justify-center gap-2 border border-white/30 text-white font-medium px-8 py-3.5 rounded-2xl hover:bg-white/10 transition-colors text-sm"
            >
              View Premium Plans
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
