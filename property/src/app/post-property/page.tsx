'use client'

import { useState } from 'react'
import { Check, Home, MapPin, FileText, Image as ImageIcon, ChevronRight, ChevronLeft, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const STEPS = [
  { id: 1, label: 'Basic Info',    icon: Home },
  { id: 2, label: 'Location',      icon: MapPin },
  { id: 3, label: 'Details',       icon: FileText },
  { id: 4, label: 'Photos',        icon: ImageIcon },
]

const PROPERTY_TYPES = ['Apartment', 'Villa / House', 'Plot / Land', 'Office Space', 'Shop / Showroom', 'Warehouse', 'PG / Co-living']
const LISTING_TYPES = ['Sell', 'Rent', 'PG / Flatmates', 'Lease']
const FURNISHING = ['Furnished', 'Semi-Furnished', 'Unfurnished']
const STATUS = ['Ready to Move', 'Under Construction']
const BHK_OPTIONS = ['1 RK / Studio', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK']
const AMENITIES = ['Swimming Pool', 'Gym', 'Club House', 'Power Backup', 'Lift', 'Security', 'CCTV', 'Garden', 'Parking', 'Intercom', 'Children Play Area', 'Gas Pipeline']

export default function PostPropertyPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    listingType: '',
    propertyType: '',
    bedrooms: '',
    price: '',
    area: '',
    areaUnit: 'sqft',
    furnishing: '',
    constructionStatus: '',
    address: '',
    locality: '',
    city: '',
    pincode: '',
    title: '',
    description: '',
    amenities: [] as string[],
  })

  function setField(key: string, val: string) {
    setForm(f => ({ ...f, [key]: val }))
  }
  function toggleAmenity(a: string) {
    setForm(f => ({
      ...f,
      amenities: f.amenities.includes(a) ? f.amenities.filter(x => x !== a) : [...f.amenities, a]
    }))
  }

  return (
    <div className="bg-neutral-50 min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-3">
            <Building2 className="w-4 h-4" /> Post Property for FREE
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-1">List Your Property</h1>
          <p className="text-neutral-500 text-sm">Reach crores of buyers & tenants across India in minutes</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-between mb-8 px-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={() => step > s.id && setStep(s.id)}
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                    step > s.id  ? 'bg-green-500 text-white cursor-pointer' :
                    step === s.id ? 'bg-brand-600 text-white ring-4 ring-brand-100' :
                    'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  )}
                >
                  {step > s.id ? <Check className="w-5 h-5" /> : <s.icon className="w-4 h-4" />}
                </button>
                <span className={cn('text-xs font-medium hidden sm:block', step === s.id ? 'text-brand-600' : 'text-neutral-400')}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn('flex-1 h-0.5 mx-2 mt-[-16px]', step > s.id ? 'bg-green-400' : 'bg-neutral-200')} />
              )}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl shadow-card p-6 sm:p-8">

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-neutral-800">Basic Information</h2>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">I want to</label>
                <div className="flex flex-wrap gap-2">
                  {LISTING_TYPES.map(t => (
                    <button key={t} onClick={() => setField('listingType', t)}
                      className={cn('px-4 py-2.5 rounded-xl border text-sm font-medium transition-all',
                        form.listingType === t ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-neutral-700 border-neutral-200 hover:border-brand-300'
                      )}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Property Type</label>
                <div className="flex flex-wrap gap-2">
                  {PROPERTY_TYPES.map(t => (
                    <button key={t} onClick={() => setField('propertyType', t)}
                      className={cn('px-4 py-2.5 rounded-xl border text-sm font-medium transition-all',
                        form.propertyType === t ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-neutral-700 border-neutral-200 hover:border-brand-300'
                      )}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {(form.propertyType === 'Apartment' || form.propertyType === 'Villa / House') && (
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Bedrooms</label>
                  <div className="flex flex-wrap gap-2">
                    {BHK_OPTIONS.map(b => (
                      <button key={b} onClick={() => setField('bedrooms', b)}
                        className={cn('px-4 py-2.5 rounded-xl border text-sm font-medium transition-all',
                          form.bedrooms === b ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-neutral-700 border-neutral-200 hover:border-brand-300'
                        )}>
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-neutral-800">Property Location</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">City *</label>
                  <input
                    type="text"
                    placeholder="e.g. Noida"
                    value={form.city}
                    onChange={e => setField('city', e.target.value)}
                    className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">PIN Code *</label>
                  <input
                    type="text"
                    placeholder="e.g. 201301"
                    value={form.pincode}
                    onChange={e => setField('pincode', e.target.value)}
                    className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Locality / Area *</label>
                <input
                  type="text"
                  placeholder="e.g. Sector 62"
                  value={form.locality}
                  onChange={e => setField('locality', e.target.value)}
                  className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Full Address</label>
                <input
                  type="text"
                  placeholder="House / Flat number, Society name, Street"
                  value={form.address}
                  onChange={e => setField('address', e.target.value)}
                  className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-400"
                />
              </div>

              <div className="bg-neutral-50 rounded-2xl p-4 text-sm text-neutral-500 flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-brand-500 shrink-0" />
                <span>Your exact address is only shared with genuine buyers/tenants after they show interest.</span>
              </div>
            </div>
          )}

          {/* Step 3: Property Details */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-neutral-800">Property Details</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Price (₹) *</label>
                  <input
                    type="number"
                    placeholder="e.g. 8500000"
                    value={form.price}
                    onChange={e => setField('price', e.target.value)}
                    className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-400"
                  />
                  {form.price && Number(form.price) >= 100000 && (
                    <p className="text-xs text-brand-600 mt-1 font-medium">
                      ₹{Number(form.price) >= 10000000
                        ? (Number(form.price) / 10000000).toFixed(2) + ' Crore'
                        : (Number(form.price) / 100000).toFixed(2) + ' Lakh'}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Area *</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Area"
                      value={form.area}
                      onChange={e => setField('area', e.target.value)}
                      className="flex-1 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-400"
                    />
                    <select
                      value={form.areaUnit}
                      onChange={e => setField('areaUnit', e.target.value)}
                      className="border border-neutral-200 rounded-xl px-3 py-2.5 text-sm outline-none bg-white"
                    >
                      <option value="sqft">sqft</option>
                      <option value="sqm">sqm</option>
                      <option value="acre">acre</option>
                      <option value="yard">yard</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Furnishing Status</label>
                <div className="flex gap-2">
                  {FURNISHING.map(f => (
                    <button key={f} onClick={() => setField('furnishing', f)}
                      className={cn('flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all',
                        form.furnishing === f ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-neutral-700 border-neutral-200 hover:border-brand-300'
                      )}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Construction Status</label>
                <div className="flex gap-2">
                  {STATUS.map(s => (
                    <button key={s} onClick={() => setField('constructionStatus', s)}
                      className={cn('flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all',
                        form.constructionStatus === s ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-neutral-700 border-neutral-200 hover:border-brand-300'
                      )}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Property Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Spacious 3 BHK Apartment with City View"
                  value={form.title}
                  onChange={e => setField('title', e.target.value)}
                  className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe your property — key highlights, nearby landmarks, special features..."
                  value={form.description}
                  onChange={e => setField('description', e.target.value)}
                  className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {AMENITIES.map(a => (
                    <button key={a} onClick={() => toggleAmenity(a)}
                      className={cn('px-3 py-1.5 rounded-xl border text-xs font-medium transition-all',
                        form.amenities.includes(a) ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-neutral-600 border-neutral-200 hover:border-brand-300'
                      )}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Photos */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-neutral-800">Add Photos</h2>
              <p className="text-sm text-neutral-500">Properties with photos get 5x more enquiries. Add at least 5 good photos.</p>

              {/* Upload area */}
              <div className="border-2 border-dashed border-neutral-300 hover:border-brand-400 transition-colors rounded-2xl p-10 text-center cursor-pointer">
                <ImageIcon className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
                <p className="font-semibold text-neutral-700 mb-1">Drag & drop photos here</p>
                <p className="text-sm text-neutral-400 mb-4">or</p>
                <button className="btn-primary text-sm">Browse Files</button>
                <p className="text-xs text-neutral-400 mt-3">JPG, PNG up to 10MB each. Max 20 photos.</p>
              </div>

              {/* Photo tips */}
              <div className="bg-blue-50 rounded-2xl p-4 space-y-2">
                <p className="text-sm font-semibold text-blue-700">📸 Photo Tips</p>
                <ul className="text-sm text-blue-600 space-y-1 list-disc pl-4">
                  <li>Shoot during daytime for best lighting</li>
                  <li>Cover all rooms: living, bedroom, kitchen, bathrooms</li>
                  <li>Include exterior / building entrance</li>
                  <li>Avoid personal items in frame</li>
                </ul>
              </div>

              {/* Summary */}
              <div className="bg-neutral-50 rounded-2xl p-4 space-y-2">
                <p className="text-sm font-semibold text-neutral-700 mb-3">Listing Summary</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-neutral-400">Type</div><div className="font-medium text-neutral-700">{form.listingType || '—'}</div>
                  <div className="text-neutral-400">Property</div><div className="font-medium text-neutral-700">{form.propertyType || '—'}</div>
                  <div className="text-neutral-400">City</div><div className="font-medium text-neutral-700">{form.city || '—'}</div>
                  <div className="text-neutral-400">Price</div>
                  <div className="font-medium text-neutral-700">
                    {form.price
                      ? Number(form.price) >= 10000000
                        ? `₹${(Number(form.price) / 10000000).toFixed(2)} Cr`
                        : Number(form.price) >= 100000
                        ? `₹${(Number(form.price) / 100000).toFixed(2)} L`
                        : `₹${Number(form.price).toLocaleString('en-IN')}`
                      : '—'}
                  </div>
                  <div className="text-neutral-400">Area</div><div className="font-medium text-neutral-700">{form.area ? `${form.area} ${form.areaUnit}` : '—'}</div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-100">
            <button
              onClick={() => setStep(s => Math.max(1, s - 1))}
              disabled={step === 1}
              className={cn('flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all',
                step === 1 ? 'opacity-0 pointer-events-none' : 'border border-neutral-200 text-neutral-600 hover:border-brand-300 hover:text-brand-600'
              )}
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            <p className="text-xs text-neutral-400">Step {step} of {STEPS.length}</p>

            {step < STEPS.length ? (
              <button
                onClick={() => setStep(s => Math.min(STEPS.length, s + 1))}
                className="btn-primary flex items-center gap-2"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors">
                <Check className="w-4 h-4" /> Submit Listing
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}