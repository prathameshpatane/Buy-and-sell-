import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Shield, Calendar, MapPin, ChevronRight, Building2, Star } from 'lucide-react'
import { MOCK_PROJECTS } from '@/lib/mock-data'
import { formatPriceRange } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'New Launch Projects in India – Builder Properties | PropSpace',
  description: 'Explore new residential & commercial projects by top builders. RERA verified upcoming & ready projects.',
}

const FILTER_TABS = ['All', 'Under Construction', 'Ready to Move', 'New Launch']
const CITIES = ['All Cities', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Noida']

export default function ProjectsPage() {
  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-700 to-brand-900 py-14 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-blue-300 text-sm font-semibold uppercase tracking-widest mb-2">New Launch</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Discover Premium Projects
          </h1>
          <p className="text-blue-200 max-w-xl mx-auto">
            Handpicked residential & commercial projects by India&apos;s top builders. RERA verified, best prices.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex gap-2 flex-wrap">
            {FILTER_TABS.map((tab, i) => (
              <button key={tab} className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                i === 0
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-brand-300 hover:text-brand-600'
              }`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="ml-auto">
            <select className="appearance-none bg-white border border-neutral-200 rounded-xl px-4 py-2 text-sm text-neutral-700 focus:outline-none focus:border-brand-300">
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Active Projects', value: '2,400+', icon: Building2 },
            { label: 'Top Builders', value: '850+', icon: Star },
            { label: 'Cities', value: '120+', icon: MapPin },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl px-5 py-4 shadow-card flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
                <s.icon className="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-neutral-900">{s.value}</p>
                <p className="text-xs text-neutral-400">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...MOCK_PROJECTS, ...MOCK_PROJECTS].map((project, idx) => (
            <Link key={`${project.id}-${idx}`} href={`/projects/${project.id}`} className="group">
              <div className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={project.images[0]}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {project.isNew && <span className="badge-new">New Launch</span>}
                    {project.isFeatured && <span className="badge-featured">Featured</span>}
                    {project.reraId && (
                      <span className="flex items-center gap-0.5 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded font-semibold">
                        <Shield className="w-2.5 h-2.5" /> RERA
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      project.status === 'ready-to-move'
                        ? 'bg-green-500 text-white'
                        : project.status === 'under-construction'
                        ? 'bg-orange-500 text-white'
                        : 'bg-brand-500 text-white'
                    }`}>
                      {project.status.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <p className="text-xs text-brand-600 font-semibold mb-0.5">{project.builderName}</p>
                      <h3 className="font-bold text-neutral-800 text-lg leading-snug group-hover:text-brand-600 transition-colors">
                        {project.name}
                      </h3>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-neutral-900">
                        {formatPriceRange(project.priceRange.min, project.priceRange.max)}
                      </p>
                    </div>
                  </div>

                  <p className="flex items-center gap-1 text-sm text-neutral-500 mb-3">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    {project.location.locality}, {project.location.city}
                  </p>

                  {/* Configs */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.configurations.map(c => (
                      <span key={c} className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full">{c}</span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-neutral-500 pt-3 border-t border-neutral-100">
                    <span>{project.availableUnits} units available of {project.totalUnits}</span>
                    {project.possessionDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Possession: {project.possessionDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load more */}
        <div className="text-center mt-10">
          <button className="btn-outline inline-flex items-center gap-2">
            Load More Projects <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}