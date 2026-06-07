'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  Heart, MapPin, BedDouble, Bath, Maximize2,
  Shield, Star, Eye, Phone, MessageSquare, ChevronRight
} from 'lucide-react'
import { cn, formatPrice, formatArea, bhkLabel, timeAgo } from '@/lib/utils'
import { Property } from '@/types'

interface PropertyCardProps {
  property: Property
  compact?: boolean
  horizontal?: boolean
}

export function PropertyCard({ property, compact = false, horizontal = false }: PropertyCardProps) {
  const [saved, setSaved] = useState(false)
  const [imgIdx, setImgIdx] = useState(0)

  const img = property.images[imgIdx] || property.images[0]

  if (horizontal) {
    return (
      <Link href={`/property/${property.id}`} className="block">
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex">
          {/* Image */}
          <div className="relative w-52 shrink-0">
            <Image src={img} alt={property.title} fill className="object-cover" sizes="208px" />
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {property.isNew && <span className="badge-new">New</span>}
              {property.isFeatured && <span className="badge-featured">Featured</span>}
              {property.isVerified && <span className="badge-verified">✓ Verified</span>}
            </div>
          </div>
          {/* Content */}
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xl font-bold text-brand-600">{formatPrice(property.price)}</p>
                {property.pricePerSqft && (
                  <p className="text-xs text-neutral-400">₹{property.pricePerSqft}/sqft</p>
                )}
              </div>
              <button onClick={(e) => { e.preventDefault(); setSaved(!saved) }}
                className="p-1.5 rounded-full hover:bg-neutral-100">
                <Heart className={cn('w-4 h-4', saved ? 'fill-red-500 text-red-500' : 'text-neutral-400')} />
              </button>
            </div>
            <h3 className="font-semibold text-neutral-800 mt-1 line-clamp-1">{property.title}</h3>
            <p className="flex items-center gap-1 text-sm text-neutral-500 mt-0.5">
              <MapPin className="w-3.5 h-3.5" />{property.location.locality}, {property.location.city}
            </p>
            <div className="flex items-center gap-3 mt-2 text-sm text-neutral-600">
              {property.bedrooms && <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5" />{bhkLabel(property.bedrooms)}</span>}
              {property.bathrooms && <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{property.bathrooms} Bath</span>}
              <span className="flex items-center gap-1"><Maximize2 className="w-3.5 h-3.5" />{formatArea(property.area)}</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium',
                  property.postedBy === 'owner' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                )}>
                  {property.postedBy === 'owner' ? '🏠 Owner' : property.postedBy === 'agent' ? '👤 Agent' : '🏗️ Builder'}
                </span>
                <span className="text-xs text-neutral-400">{timeAgo(property.createdAt)}</span>
              </div>
              <span className="text-brand-600 text-sm font-medium flex items-center gap-0.5">
                View <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: compact ? 180 : 220 }}>
        <Image
          src={img}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 400px"
        />

        {/* Image dots */}
        {property.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {property.images.slice(0, 4).map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                className={cn('w-1.5 h-1.5 rounded-full transition-all', i === imgIdx ? 'bg-white w-4' : 'bg-white/60')}
              />
            ))}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {property.isNew && <span className="badge-new">New</span>}
          {property.isFeatured && <span className="badge-featured">Featured</span>}
          {property.isVerified && (
            <span className="flex items-center gap-0.5 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              <Shield className="w-2.5 h-2.5" /> Verified
            </span>
          )}
        </div>

        {/* Save button */}
        <button
          onClick={() => setSaved(!saved)}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow hover:scale-110 transition-transform"
        >
          <Heart className={cn('w-4 h-4', saved ? 'fill-red-500 text-red-500' : 'text-neutral-500')} />
        </button>

        {/* Listing type tag */}
        <div className="absolute bottom-2 right-2">
          <span className={cn(
            'text-[10px] font-bold px-2 py-0.5 rounded uppercase',
            property.listingType === 'buy' ? 'bg-brand-500 text-white' :
            property.listingType === 'rent' ? 'bg-purple-500 text-white' :
            property.listingType === 'pg' ? 'bg-pink-500 text-white' :
            'bg-neutral-700 text-white'
          )}>
            {property.listingType === 'buy' ? 'For Sale' : property.listingType === 'rent' ? 'For Rent' : property.listingType.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <p className="text-xl font-bold text-neutral-900">
              {formatPrice(property.price)}
              {property.listingType === 'rent' && <span className="text-sm font-normal text-neutral-400">/mo</span>}
            </p>
            {property.pricePerSqft && (
              <p className="text-xs text-neutral-400">₹{property.pricePerSqft.toLocaleString('en-IN')}/sqft</p>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-neutral-400">
            <Eye className="w-3 h-3" /> {property.views.toLocaleString()}
          </div>
        </div>

        <Link href={`/property/${property.id}`}>
          <h3 className="font-semibold text-neutral-800 hover:text-brand-600 transition-colors line-clamp-2 leading-snug mb-1">
            {property.title}
          </h3>
        </Link>

        <p className="flex items-center gap-1 text-sm text-neutral-500 mb-3">
          <MapPin className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
          <span className="line-clamp-1">{property.location.locality}, {property.location.city}</span>
        </p>

        {/* Specs */}
        {!compact && (
          <div className="flex items-center gap-3 text-xs text-neutral-600 py-2.5 border-t border-b border-neutral-100 mb-3">
            {property.bedrooms != null && (
              <span className="flex items-center gap-1">
                <BedDouble className="w-3.5 h-3.5 text-neutral-400" />
                {bhkLabel(property.bedrooms)}
              </span>
            )}
            {property.bathrooms != null && (
              <span className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5 text-neutral-400" />
                {property.bathrooms} Bath
              </span>
            )}
            <span className="flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5 text-neutral-400" />
              {formatArea(property.area)}
            </span>
            {property.furnishing && (
              <span className="text-neutral-400 capitalize">{property.furnishing}</span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-700">
              {property.postedBy === 'owner' ? 'O' : property.postedBy === 'agent' ? 'A' : 'B'}
            </div>
            <span className={cn(
              'text-xs font-medium',
              property.postedBy === 'owner' ? 'text-green-600' : 'text-blue-600'
            )}>
              {property.postedBy === 'owner' ? 'Owner' : property.postedBy === 'agent' ? 'Agent' : 'Builder'}
            </span>
            {property.isVerified && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg bg-brand-50 text-brand-600 hover:bg-brand-100 transition-colors">
              <Phone className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 rounded-lg bg-brand-50 text-brand-600 hover:bg-brand-100 transition-colors">
              <MessageSquare className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}