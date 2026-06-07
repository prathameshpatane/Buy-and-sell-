import { Star } from 'lucide-react'
import { MOCK_TESTIMONIALS } from '@/lib/mock-data'

export function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center mb-10">
        <h2 className="section-title">What Our Users Say</h2>
        <p className="section-sub">Trusted by millions of happy home buyers, sellers, and renters</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {MOCK_TESTIMONIALS.map((t) => (
          <div key={t.id} className="bg-white rounded-3xl p-6 shadow-card border border-neutral-100 hover:shadow-card-hover transition-all duration-300">
            {/* Stars */}
            <div className="flex items-center gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-200'}`} />
              ))}
            </div>
            <p className="text-neutral-600 text-sm leading-relaxed mb-5 italic">
              &ldquo;{t.review}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-sm">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-sm text-neutral-800">{t.name}</p>
                <p className="text-xs text-neutral-400">
                  {t.type === 'buyer' ? 'Home Buyer' : t.type === 'seller' ? 'Property Seller' : 'Tenant'} • {t.city}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
