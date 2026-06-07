// ===== PROPERTY TYPES =====
export type PropertyType = 'apartment' | 'villa' | 'plot' | 'commercial' | 'pg' | 'house' | 'office' | 'shop'
export type ListingType = 'buy' | 'rent' | 'pg' | 'commercial' | 'plot' | 'lease'
export type PropertyStatus = 'active' | 'sold' | 'rented' | 'inactive' | 'pending'
export type FurnishingStatus = 'furnished' | 'semi-furnished' | 'unfurnished'
export type ConstructionStatus = 'ready-to-move' | 'under-construction' | 'new-launch'
export type FacingDirection = 'north' | 'south' | 'east' | 'west' | 'north-east' | 'north-west' | 'south-east' | 'south-west'

export interface Location {
  address: string
  locality: string
  city: string
  state: string
  pincode: string
  lat?: number
  lng?: number
}

export interface Property {
  id: string
  title: string
  description: string
  type: PropertyType
  listingType: ListingType
  status: PropertyStatus
  price: number
  pricePerSqft?: number
  area: number
  areaUnit: 'sqft' | 'sqm' | 'acre' | 'yard'
  bedrooms?: number
  bathrooms?: number
  balconies?: number
  floors?: number
  totalFloors?: number
  furnishing?: FurnishingStatus
  constructionStatus?: ConstructionStatus
  facing?: FacingDirection
  location: Location
  images: string[]
  amenities: string[]
  postedBy: 'owner' | 'agent' | 'builder'
  agentId?: string
  ownerId?: string
  projectId?: string
  isVerified: boolean
  isFeatured: boolean
  isNew: boolean
  views: number
  leads: number
  createdAt: string
  updatedAt: string
  expiresAt?: string
}

// ===== USER TYPES =====
export type UserRole = 'buyer' | 'seller' | 'agent' | 'builder' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  avatar?: string
  isVerified: boolean
  subscription?: Subscription
  createdAt: string
}

// ===== AGENT / BUILDER =====
export interface Agent {
  id: string
  userId: string
  name: string
  phone: string
  email: string
  agency?: string
  reraId?: string
  avatar?: string
  rating: number
  totalListings: number
  totalDeals: number
  areas: string[]
  isVerified: boolean
}

export interface Builder {
  id: string
  name: string
  logo?: string
  description: string
  reraId?: string
  totalProjects: number
  ongoingProjects: number
  deliveredProjects: number
  rating: number
  operatingCities: string[]
  isVerified: boolean
}

// ===== PROJECT (Builder Projects) =====
export interface Project {
  id: string
  name: string
  builderId: string
  builderName: string
  type: PropertyType[]
  status: ConstructionStatus
  location: Location
  priceRange: { min: number; max: number }
  configurations: string[]
  totalUnits: number
  availableUnits: number
  area: { min: number; max: number }
  images: string[]
  amenities: string[]
  reraId?: string
  possessionDate?: string
  launchDate?: string
  isNew: boolean
  isFeatured: boolean
}

// ===== LEAD =====
export interface Lead {
  id: string
  propertyId: string
  userId?: string
  name: string
  phone: string
  email?: string
  message?: string
  status: 'new' | 'contacted' | 'visited' | 'converted' | 'lost'
  source: 'website' | 'app' | 'call'
  createdAt: string
}

// ===== SUBSCRIPTION =====
export type PlanType = 'free' | 'silver' | 'gold' | 'platinum'
export interface Subscription {
  id: string
  userId: string
  plan: PlanType
  listingsAllowed: number
  listingsUsed: number
  featuredListings: number
  leadsPerMonth: number
  validUntil: string
  autoRenew: boolean
}

// ===== SEARCH / FILTER =====
export interface SearchFilters {
  listingType: ListingType
  propertyType?: PropertyType[]
  city?: string
  locality?: string[]
  minPrice?: number
  maxPrice?: number
  minArea?: number
  maxArea?: number
  bedrooms?: number[]
  bathrooms?: number[]
  furnishing?: FurnishingStatus[]
  constructionStatus?: ConstructionStatus[]
  postedBy?: ('owner' | 'agent' | 'builder')[]
  amenities?: string[]
  facing?: FacingDirection[]
  sortBy?: 'relevance' | 'price-asc' | 'price-desc' | 'newest' | 'area-asc' | 'area-desc'
  page?: number
  limit?: number
}

export interface SearchResult {
  properties: Property[]
  total: number
  page: number
  totalPages: number
  filters: SearchFilters
}

// ===== MISC =====
export interface City {
  name: string
  slug: string
  state: string
  image?: string
  totalListings: number
}

export interface Testimonial {
  id: string
  name: string
  avatar?: string
  rating: number
  review: string
  city: string
  type: 'buyer' | 'seller' | 'renter'
}