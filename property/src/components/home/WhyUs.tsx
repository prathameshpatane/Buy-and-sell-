import { Shield, Search, TrendingUp, Users, Headphones, Smartphone } from 'lucide-react'

const FEATURES = [
  {
    icon: Shield,
    title: 'Verified Listings',
    desc: 'Every property is physically verified by our team. No fake or duplicate listings.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Search,
    title: 'Smart Search',
    desc: 'AI-powered search helps you find exactly what you\'re looking for in seconds.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: TrendingUp,
    title: 'Market Insights',
    desc: 'Real-time price trends, locality reports, and investment analysis at your fingertips.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Users,
    title: 'Owner Direct',
    desc: 'Connect directly with owners — no middlemen, no extra brokerage.',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    desc: 'Our property experts are available around the clock to assist you.',
    color: 'bg-pink-50 text-pink-600',
  },
  {
    icon: Smartphone,
    title: 'Mobile App',
    desc: 'Take PropSpace with you. Search, save, and contact on the go.',
    color: 'bg-indigo-50 text-indigo-600',
  },
]

export function WhyUs() {
  return (
    <section className="bg-neutral-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">Why Choose PropSpace?</h2>
          <p className="text-neutral-400">India&apos;s most trusted real estate platform, loved by millions</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-neutral-800 rounded-3xl p-6 hover:bg-neutral-700 transition-colors duration-300"
            >
              <div className={`w-12 h-12 rounded-2xl ${f.color} flex items-center justify-center mb-4`}>
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* App download banner */}
        <div className="mt-12 bg-brand-600 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-2xl font-bold mb-1">Download Our App</h3>
            <p className="text-blue-200">Get the best experience on your phone. Available on iOS & Android.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white text-neutral-900 px-5 py-3 rounded-2xl font-semibold text-sm hover:bg-neutral-100 transition-colors">
              <span className="text-2xl">🍎</span>
              <div className="text-left">
                <div className="text-[10px] text-neutral-500">Download on the</div>
                <div>App Store</div>
              </div>
            </button>
            <button className="flex items-center gap-2 bg-white text-neutral-900 px-5 py-3 rounded-2xl font-semibold text-sm hover:bg-neutral-100 transition-colors">
              <span className="text-2xl">🤖</span>
              <div className="text-left">
                <div className="text-[10px] text-neutral-500">Get it on</div>
                <div>Google Play</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
