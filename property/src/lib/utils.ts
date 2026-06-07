import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format price in Indian format (Lakhs / Crores)
export function formatPrice(price: number, short = false): string {
  if (price >= 10_000_000) {
    const cr = price / 10_000_000
    return short ? `₹${cr.toFixed(cr % 1 === 0 ? 0 : 2)} Cr` : `₹${cr.toFixed(2)} Crore`
  }
  if (price >= 100_000) {
    const lac = price / 100_000
    return short ? `₹${lac.toFixed(lac % 1 === 0 ? 0 : 2)} L` : `₹${lac.toFixed(2)} Lakh`
  }
  return `₹${price.toLocaleString('en-IN')}`
}

export function formatPriceRange(min: number, max: number): string {
  return `${formatPrice(min, true)} - ${formatPrice(max, true)}`
}

// Format area
export function formatArea(area: number, unit = 'sqft'): string {
  return `${area.toLocaleString('en-IN')} ${unit}`
}

// Format number with Indian commas
export function formatNumber(n: number): string {
  return n.toLocaleString('en-IN')
}

// Slugify
export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

// Time ago
export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000)
  if (diff < 60) return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

// BHK label
export function bhkLabel(bedrooms?: number): string {
  if (!bedrooms) return 'Studio'
  return `${bedrooms} BHK`
}

// Amenity icons mapping
export const AMENITY_ICONS: Record<string, string> = {
  'Swimming Pool': '🏊',
  'Gym': '🏋️',
  'Club House': '🏛️',
  'Power Backup': '⚡',
  'Lift': '🛗',
  'Security': '🛡️',
  'CCTV': '📹',
  'Garden': '🌳',
  'Parking': '🅿️',
  'Intercom': '📞',
  'Children Play Area': '🎡',
  'Sports Facility': '🏸',
  'Gas Pipeline': '🔥',
  'Water Supply': '💧',
  'Internet': '🌐',
}

// Cities list
export const POPULAR_CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
  'Kolkata', 'Pune', 'Ahmedabad', 'Noida', 'Gurugram',
  'Navi Mumbai', 'Thane', 'Lucknow', 'Jaipur', 'Chandigarh'
]

export const PROPERTY_TYPES = [
  { label: 'Apartment', value: 'apartment', icon: '🏢' },
  { label: 'Villa', value: 'villa', icon: '🏡' },
  { label: 'House', value: 'house', icon: '🏠' },
  { label: 'Plot', value: 'plot', icon: '📐' },
  { label: 'Commercial', value: 'commercial', icon: '🏪' },
  { label: 'Office', value: 'office', icon: '💼' },
  { label: 'Shop', value: 'shop', icon: '🛍️' },
  { label: 'PG / Co-living', value: 'pg', icon: '🛏️' },
]

export const LISTING_TABS = [
  { label: 'Buy', value: 'buy', href: '/buy' },
  { label: 'Rent', value: 'rent', href: '/rent' },
  { label: 'PG / Co-living', value: 'pg', href: '/pg' },
  { label: 'Commercial', value: 'commercial', href: '/commercial' },
  { label: 'Plots / Land', value: 'plot', href: '/plots' },
  { label: 'Projects', value: 'projects', href: '/projects' },
]

export const BEDROOM_OPTIONS = [1, 2, 3, 4, 5]
export const SORT_OPTIONS = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest First', value: 'newest' },
  { label: 'Area: Low to High', value: 'area-asc' },
]