'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Home, Heart, Phone, Eye, TrendingUp, Plus, Settings,
  Bell, ChevronRight, Building2, Users, BarChart2,
  CheckCircle, Clock, AlertCircle, Edit, Trash2
} from 'lucide-react'
import { MOCK_PROPERTIES } from '@/lib/mock-data'
import { formatPrice, timeAgo } from '@/lib/utils'
import { cn } from '@/lib/utils'

const TABS = [
  { id: 'overview',  label: 'Overview',    icon: BarChart2 },
  { id: 'listings',  label: 'My Listings', icon: Building2 },
  { id: 'leads',     label: 'Leads',       icon: Users },
  { id: 'saved',     label: 'Saved',       icon: Heart },
  { id: 'settings',  label: 'Settings',    icon: Settings },
]

const MOCK_LEADS = [
  { id: 1, name: 'Rahul Sharma', phone: '+91 98765 11111', property: '3 BHK in Sector 62', time: '2024-12-15T09:00:00Z', status: 'new' },
  { id: 2, name: 'Priya Singh',  phone: '+91 87654 22222', property: '2 BHK in Koramangala', time: '2024-12-14T14:00:00Z', status: 'contacted' },
  { id: 3, name: 'Amit Verma',   phone: '+91 76543 33333', property: '4 BHK Villa Jubilee Hills', time: '2024-12-14T10:00:00Z', status: 'visited' },
  { id: 4, name: 'Neha Joshi',   phone: '+91 65432 44444', property: '3 BHK in Sector 62', time: '2024-12-13T16:00:00Z', status: 'converted' },
]

const STATUS_COLORS: Record<string, string> = {
  new:       'bg-blue-50 text-blue-700',
  contacted: 'bg-yellow-50 text-yellow-700',
  visited:   'bg-purple-50 text-purple-700',
  converted: 'bg-green-50 text-green-700',
  lost:      'bg-red-50 text-red-700',
}

export default function DashboardPage() {
  const [tab, setTab] = useState('overview')
  const myListings = MOCK_PROPERTIES.slice(0, 3)

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Top bar */}
      <div className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-lg">S</div>
            <div>
              <h1 className="font-bold text-neutral-900">Welcome back, Sneha!</h1>
              <p className="text-sm text-neutral-400">sneha.vaish@email.com · Free Plan</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-neutral-100 text-neutral-500">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <Link href="/post-property" className="btn-primary flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" /> Post Property
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-56 shrink-0 hidden lg:block">
            <nav className="bg-white rounded-2xl shadow-card p-3 space-y-1 sticky top-20">
              {TABS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    tab === t.id ? 'bg-brand-50 text-brand-700' : 'text-neutral-600 hover:bg-neutral-50'
                  )}
                >
                  <t.icon className="w-4 h-4" />
                  {t.label}
                </button>
              ))}
              <div className="border-t border-neutral-100 pt-2 mt-2">
                <Link href="/pricing"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-accent-600 hover:bg-orange-50 transition-all">
                  <TrendingUp className="w-4 h-4" />
                  Upgrade Plan
                </Link>
              </div>
            </nav>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Mobile tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 mb-6 lg:hidden">
              {TABS.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={cn('px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all',
                    tab === t.id ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-neutral-600 border-neutral-200'
                  )}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Overview tab */}
            {tab === 'overview' && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Active Listings', value: '3', icon: Home, color: 'bg-blue-50 text-blue-600', change: '+1 this month' },
                    { label: 'Total Views', value: '1,892', icon: Eye, color: 'bg-purple-50 text-purple-600', change: '+234 this week' },
                    { label: 'Leads Received', value: '24', icon: Phone, color: 'bg-green-50 text-green-600', change: '+8 this week' },
                    { label: 'Saved by Others', value: '56', icon: Heart, color: 'bg-pink-50 text-pink-600', change: '+12 this week' },
                  ].map(s => (
                    <div key={s.label} className="bg-white rounded-2xl p-5 shadow-card">
                      <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                        <s.icon className="w-5 h-5" />
                      </div>
                      <p className="text-2xl font-bold text-neutral-900">{s.value}</p>
                      <p className="text-xs text-neutral-400 mt-0.5">{s.label}</p>
                      <p className="text-xs text-green-600 font-medium mt-1">{s.change}</p>
                    </div>
                  ))}
                </div>

                {/* Subscription banner */}
                <div className="bg-gradient-to-r from-brand-600 to-brand-800 rounded-3xl p-6 flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold text-lg mb-0.5">You&apos;re on the Free Plan</p>
                    <p className="text-blue-200 text-sm">Upgrade to Gold for featured listings, unlimited leads & more</p>
                  </div>
                  <Link href="/pricing" className="bg-white text-brand-700 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors shrink-0">
                    Upgrade Now
                  </Link>
                </div>

                {/* Recent leads */}
                <div className="bg-white rounded-2xl shadow-card p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-neutral-800">Recent Leads</h3>
                    <button onClick={() => setTab('leads')} className="text-sm text-brand-600 hover:underline flex items-center gap-1">
                      View All <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {MOCK_LEADS.slice(0, 3).map(lead => (
                      <div key={lead.id} className="flex items-center justify-between py-2 border-b border-neutral-50 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-600">
                            {lead.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-neutral-800">{lead.name}</p>
                            <p className="text-xs text-neutral-400 truncate max-w-48">{lead.property}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${STATUS_COLORS[lead.status]}`}>
                            {lead.status}
                          </span>
                          <span className="text-xs text-neutral-300">{timeAgo(lead.time)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Listings tab */}
            {tab === 'listings' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-neutral-800">My Listings (3)</h2>
                  <Link href="/post-property" className="btn-primary text-sm flex items-center gap-1.5">
                    <Plus className="w-4 h-4" /> Add Listing
                  </Link>
                </div>
                {myListings.map(p => (
                  <div key={p.id} className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-4">
                    <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-neutral-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-neutral-800 truncate text-sm">{p.title}</p>
                      <p className="text-xs text-neutral-400">{p.location.locality}, {p.location.city}</p>
                      <p className="text-sm font-bold text-brand-600 mt-0.5">{formatPrice(p.price)}</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-neutral-400 shrink-0">
                      <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{p.views}</span>
                      <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{p.leads}</span>
                      <span className={cn('px-2 py-0.5 rounded-full font-medium text-[11px]',
                        p.isVerified ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                      )}>
                        {p.isVerified ? <><CheckCircle className="w-3 h-3 inline mr-0.5" />Verified</> : <><Clock className="w-3 h-3 inline mr-0.5" />Pending</>}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-brand-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Leads tab */}
            {tab === 'leads' && (
              <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
                  <h2 className="font-bold text-neutral-800">All Leads (24)</h2>
                  <select className="text-sm border border-neutral-200 rounded-xl px-3 py-1.5 outline-none bg-white">
                    <option>All Status</option>
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Visited</option>
                    <option>Converted</option>
                  </select>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-neutral-50">
                      <tr>
                        {['Name', 'Phone', 'Property', 'Time', 'Status', 'Action'].map(h => (
                          <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {MOCK_LEADS.map(lead => (
                        <tr key={lead.id} className="border-t border-neutral-50 hover:bg-neutral-50 transition-colors">
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-700">
                                {lead.name.charAt(0)}
                              </div>
                              <span className="font-medium text-neutral-800">{lead.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 text-neutral-600">{lead.phone}</td>
                          <td className="px-5 py-3.5 text-neutral-500 max-w-36 truncate">{lead.property}</td>
                          <td className="px-5 py-3.5 text-neutral-400 text-xs">{timeAgo(lead.time)}</td>
                          <td className="px-5 py-3.5">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${STATUS_COLORS[lead.status]}`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <button className="text-brand-600 hover:underline text-xs font-medium">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Saved tab */}
            {tab === 'saved' && (
              <div className="text-center py-16">
                <Heart className="w-12 h-12 text-neutral-200 mx-auto mb-3" />
                <p className="font-semibold text-neutral-700 mb-1">No saved properties yet</p>
                <p className="text-sm text-neutral-400 mb-5">Click the heart icon on any property to save it here</p>
                <Link href="/buy" className="btn-primary inline-flex items-center gap-2">
                  Browse Properties <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            {/* Settings tab */}
            {tab === 'settings' && (
              <div className="space-y-5">
                <h2 className="font-bold text-neutral-800">Account Settings</h2>
                <div className="bg-white rounded-2xl shadow-card p-6 space-y-4">
                  <h3 className="font-semibold text-neutral-700 text-sm">Personal Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Full Name', value: 'Sneha Vaish' },
                      { label: 'Email', value: 'sneha.vaish@email.com' },
                      { label: 'Phone', value: '+91 98765 43210' },
                      { label: 'City', value: 'Noida, UP' },
                    ].map(f => (
                      <div key={f.label}>
                        <label className="block text-xs font-semibold text-neutral-500 mb-1.5">{f.label}</label>
                        <input
                          defaultValue={f.value}
                          className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-400"
                        />
                      </div>
                    ))}
                  </div>
                  <button className="btn-primary text-sm mt-2">Save Changes</button>
                </div>

                <div className="bg-white rounded-2xl shadow-card p-6 space-y-3">
                  <h3 className="font-semibold text-neutral-700 text-sm">Notifications</h3>
                  {['New lead received', 'Listing expiry reminder', 'Price drop alerts', 'Weekly performance report'].map(n => (
                    <label key={n} className="flex items-center justify-between cursor-pointer py-1">
                      <span className="text-sm text-neutral-700">{n}</span>
                      <div className="relative">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-10 h-5 bg-neutral-200 peer-checked:bg-brand-600 rounded-full transition-colors" />
                        <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
                      </div>
                    </label>
                  ))}
                </div>

                <div className="bg-white rounded-2xl shadow-card p-6">
                  <h3 className="font-semibold text-neutral-700 text-sm mb-3">Danger Zone</h3>
                  <button className="flex items-center gap-2 text-red-500 text-sm hover:text-red-600 font-medium">
                    <AlertCircle className="w-4 h-4" /> Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}