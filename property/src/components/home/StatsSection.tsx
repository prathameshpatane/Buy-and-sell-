const STATS = [
  { label: 'Properties Listed', value: '20 Lakh+', icon: '🏠', color: 'bg-blue-50 text-blue-700' },
  { label: 'Cities Covered', value: '500+', icon: '🏙️', color: 'bg-purple-50 text-purple-700' },
  { label: 'Happy Customers', value: '50 Lakh+', icon: '😊', color: 'bg-green-50 text-green-700' },
  { label: 'Verified Agents', value: '1 Lakh+', icon: '✅', color: 'bg-orange-50 text-orange-700' },
  { label: 'Transactions Done', value: '₹5000 Cr+', icon: '💰', color: 'bg-yellow-50 text-yellow-700' },
  { label: 'App Downloads', value: '2 Crore+', icon: '📱', color: 'bg-pink-50 text-pink-700' },
]

export function StatsSection() {
  return (
    <section className="bg-brand-600 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-blue-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
