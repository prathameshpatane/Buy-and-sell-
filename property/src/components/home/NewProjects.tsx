import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Shield, Calendar, MapPin } from 'lucide-react'
import { MOCK_PROJECTS } from '@/lib/mock-data'
import { formatPriceRange } from '@/lib/utils'

export function NewProjects() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="section-title">New Launch Projects</h2>
          <p className="section-sub">Invest in upcoming premium developments by top builders</p>
        </div>
        <Link href="/projects" className="hidden sm:flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_PROJECTS.map(project => (
          <Link key={project.id} href={`/projects/${project.id}`} className="group">
            <div className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col sm:flex-row">
              {/* Image */}
              <div className="relative sm:w-60 shrink-0" style={{ height: 200 }}>
                <Image
                  src={project.images[0]}
                  alt={project.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="240px"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {project.isNew && <span className="badge-new">New Launch</span>}
                  {project.isFeatured && <span className="badge-featured">Featured</span>}
                  {project.reraId && (
                    <span className="flex items-center gap-0.5 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded font-semibold">
                      <Shield className="w-2.5 h-2.5" /> RERA
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-brand-600 font-semibold mb-0.5">{project.builderName}</p>
                  <h3 className="font-bold text-neutral-800 text-lg leading-snug group-hover:text-brand-600 transition-colors mb-1">
                    {project.name}
                  </h3>
                  <p className="flex items-center gap-1 text-sm text-neutral-500 mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    {project.location.locality}, {project.location.city}
                  </p>
                  <p className="text-lg font-bold text-neutral-900 mb-1">
                    {formatPriceRange(project.priceRange.min, project.priceRange.max)}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.configurations.map(c => (
                      <span key={c} className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full">{c}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span className={`capitalize px-2 py-0.5 rounded-full font-medium ${
                    project.status === 'ready-to-move' ? 'bg-green-50 text-green-700' :
                    project.status === 'under-construction' ? 'bg-orange-50 text-orange-700' :
                    'bg-blue-50 text-blue-700'
                  }`}>
                    {project.status.replace('-', ' ')}
                  </span>
                  {project.possessionDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Possession: {project.possessionDate}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
