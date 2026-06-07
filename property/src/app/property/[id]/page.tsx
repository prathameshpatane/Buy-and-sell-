'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Heart, Share2, MapPin, BedDouble, Bath, Maximize2, Calendar,
  Shield, Phone, MessageSquare, Star, Eye, ChevronLeft, ChevronRight,
  CheckCircle, Home, Building2, Compass, Layers
} from 'lucide-react'
import { MOCK_PROPERTIES } from '@/lib/mock-data'
import { formatPrice, formatArea, bhkLabel, timeAgo, AMENITY_ICONS } from '@/lib/utils'
import { PropertyCard } from '@/components/property/PropertyCard'

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = MOCK_PROPERTIES.find(p => p.id === params.id) || MOCK_PROPERTIES[0]
  const [activeImg, setActiveImg] = useState(0)
  const [saved, setSaved] = useState(false)
  const [showPhone, setShowPhone] = useState(false)
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', message: '' })

  const similar = MOCK_PROPERTIES.filter(p => p.id !== property.id && p.listingType === property.listingType).slice(0, 3)

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-neutral-500">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <Link href={`/${property.listingType}`} className="capitalize hover:text-brand-600">{property.listingType}</Link>
          <span>/</span>
          <Link href={`/${property.listingType}?city=${property.location.city.toLowerCase()}`} className="hover:text-brand-600">{property.location.city}</Link>
          <span>/</span>
          <span className="text-neutral-700 line-clamp-1">{property.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Image gallery */}
            <div className="bg-black rounded-3xl overflow-hidden mb-5 relative" style={{ height: 460 }}>
              <Image
                src={property.images[activeImg]}
                alt={property.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 800px"
                priority
              />

              {/* Navigation */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg(i => (i - 1 + property.images.length) % property.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white shadow"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImg(i => (i + 1) % property.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white shadow"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Thumbnails */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {property.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${i === activeImg ? 'border-white scale-110' : 'border-transparent opacity-60'}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="56px" />
                  </button>
                ))}
              </div>

              {/* Top badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                {property.isNew && <span className="badge-new">New</span>}
                {property.isFeatured && <span className="badge-featured">Featured</span>}
                {property.isVerified && (
                  <span className="flex items-center gap-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded font-semibold">
                    <Shield className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>

              {/* Action buttons */}
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => setSaved(!saved)}
                  className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center hover:bg-white shadow"
                >
                  <Heart className={saved ? 'w-4 h-4 fill-red-500 text-red-500' : 'w-4 h-4 text-neutral-600'} />
                </button>
                <button className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center hover:bg-white shadow">
                  <Share2 className="w-4 h-4 text-neutral-600" />
                </button>
              </div>

              {/* View count */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
                <Eye className="w-3 h-3" /> {property.views.toLocaleString()} views
              </div>
            </div>

            {/* Property info */}
            <div className="bg-white rounded-3xl shadow-card p-6 mb-5">
              <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-neutral-900 mb-1">{property.title}</h1>
                  <p className="flex items-center gap-1.5 text-neutral-500">
                    <MapPin className="w-4 h-4 text-brand-500" />
                    {property.location.address}, {property.location.locality}, {property.location.city}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-neutral-900">
                    {formatPrice(property.price)}
                    {property.listingType === 'rent' && <span className="text-base font-normal text-neutral-400">/month</span>}
                  </p>
                  {property.pricePerSqft && (
                    <p className="text-sm text-neutral-400">₹{property.pricePerSqft.toLocaleString()}/sqft</p>
                  )}
                </div>
              </div>

              {/* Key specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-neutral-50 rounded-2xl mb-5">
                {property.bedrooms != null && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <BedDouble className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400">Bedrooms</p>
                      <p className="font-semibold text-neutral-800">{bhkLabel(property.bedrooms)}</p>
                    </div>
                  </div>
                )}
                {property.bathrooms != null && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                      <Bath className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400">Bathrooms</p>
                      <p className="font-semibold text-neutral-800">{property.bathrooms}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                    <Maximize2 className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400">Area</p>
                    <p className="font-semibold text-neutral-800">{formatArea(property.area)}</p>
                  </div>
                </div>
                {property.floors != null && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                      <Layers className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400">Floor</p>
                      <p className="font-semibold text-neutral-800">{property.floors} of {property.totalFloors}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                {[
                  { icon: Home, label: 'Property Type', val: property.type },
                  { icon: Calendar, label: 'Listed', val: timeAgo(property.createdAt) },
                  { icon: Building2, label: 'Status', val: property.constructionStatus?.replace(/-/g, ' ') },
                  { icon: Compass, label: 'Facing', val: property.facing },
                  { icon: Shield, label: 'Furnishing', val: property.furnishing },
                  { icon: Building2, label: 'Posted By', val: property.postedBy },
                ].filter(d => d.val).map(d => (
                  <div key={d.label} className="bg-neutral-50 rounded-xl p-3">
                    <p className="text-xs text-neutral-400 mb-0.5">{d.label}</p>
                    <p className="text-sm font-medium text-neutral-700 capitalize">{d.val}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="mb-5">
                <h3 className="font-bold text-neutral-800 mb-2">About this Property</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{property.description}</p>
              </div>

              {/* Amenities */}
              {property.amenities.length > 0 && (
                <div>
                  <h3 className="font-bold text-neutral-800 mb-3">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map(a => (
                      <span key={a} className="flex items-center gap-1.5 bg-brand-50 text-brand-700 text-sm px-3 py-1.5 rounded-xl font-medium">
                        <span>{AMENITY_ICONS[a] || '✨'}</span>
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Similar properties */}
            {similar.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-neutral-800 mb-4">Similar Properties</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {similar.map(p => <PropertyCard key={p.id} property={p} compact />)}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 shrink-0 space-y-4">
            {/* Agent / Contact card */}
            <div className="bg-white rounded-3xl shadow-card p-5 sticky top-20">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-neutral-100">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold">
                  {property.postedBy === 'owner' ? '🏠' : '👤'}
                </div>
                <div>
                  <p className="font-semibold text-neutral-800">
                    {property.postedBy === 'owner' ? 'Property Owner' : 'Registered Agent'}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-neutral-400">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>4.8 · Verified</span>
                    <CheckCircle className="w-3 h-3 text-green-500 ml-1" />
                  </div>
                </div>
              </div>

              {/* Phone */}
              <button
                onClick={() => setShowPhone(true)}
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-2xl mb-3 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {showPhone ? '+91 98765 43210' : 'Show Phone Number'}
              </button>

              {/* Message / Email */}
              <button className="w-full flex items-center justify-center gap-2 btn-outline mb-4">
                <MessageSquare className="w-4 h-4" />
                Send Message
              </button>

              {/* Lead form */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-neutral-700">Request Callback</p>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={leadForm.name}
                  onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                  className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-400 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={leadForm.phone}
                  onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                  className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-400 transition-colors"
                />
                <textarea
                  placeholder="I'm interested in this property..."
                  rows={3}
                  value={leadForm.message}
                  onChange={e => setLeadForm({ ...leadForm, message: e.target.value })}
                  className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-400 transition-colors resize-none"
                />
                <button className="btn-primary w-full">
                  Send Enquiry
                </button>
                <p className="text-xs text-neutral-400 text-center">
                  By submitting you agree to our Terms & Privacy Policy
                </p>
              </div>
            </div>

            {/* Share card */}
            <div className="bg-white rounded-3xl shadow-card p-5">
              <p className="font-semibold text-neutral-700 mb-3">Share this Property</p>
              <div className="flex items-center gap-2">
                {['📱 WhatsApp', '📧 Email', '🔗 Copy Link'].map(s => (
                  <button key={s} className="flex-1 text-center text-xs bg-neutral-50 hover:bg-neutral-100 py-2 rounded-xl transition-colors text-neutral-600">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}