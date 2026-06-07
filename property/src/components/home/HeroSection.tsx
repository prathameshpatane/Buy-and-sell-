import { SearchBar } from '@/components/search/SearchBar'
import { Shield, Star, TrendingUp } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden -mt-16">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80')`,
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900/90 via-brand-800/75 to-brand-700/50" />
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 pt-36">
        {/* Trust badges */}
        <div className="flex items-center gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full border border-white/20">
            <Shield className="w-4 h-4 text-green-400" />
            <span>Verified Listings</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full border border-white/20">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>4.8★ Rated Platform</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full border border-white/20">
            <TrendingUp className="w-4 h-4 text-accent-400" />
            <span>2M+ Properties</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 max-w-3xl">
          Find Your
          <span className="text-accent-400"> Perfect </span>
          Property in India
        </h1>
        <p className="text-white/75 text-lg mb-10 max-w-xl leading-relaxed">
          Browse from 2 million+ verified listings across 500+ cities.
          Buy, sell, or rent — all in one place.
        </p>

        {/* Search */}
        <SearchBar variant="hero" />

        {/* Quick stats */}
        <div className="flex items-center gap-6 mt-8 text-white/70 text-sm flex-wrap">
          <span>🏠 <strong className="text-white">12 Lakh+</strong> for Buy</span>
          <span>🔑 <strong className="text-white">8 Lakh+</strong> for Rent</span>
          <span>🛏️ <strong className="text-white">1.5 Lakh+</strong> PG listings</span>
          <span>🏢 <strong className="text-white">3 Lakh+</strong> Commercial</span>
        </div>
      </div>
    </section>
  )
}