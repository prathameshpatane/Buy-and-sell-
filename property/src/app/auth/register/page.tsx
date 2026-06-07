'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Building2, Eye, EyeOff, ArrowRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

type Role = 'buyer' | 'owner' | 'agent' | 'builder'
const ROLES: { value: Role; label: string; desc: string; emoji: string }[] = [
  { value: 'buyer',   label: 'Buyer / Tenant',   desc: 'Looking to buy or rent',   emoji: '🔍' },
  { value: 'owner',   label: 'Owner',             desc: 'List my property',         emoji: '🏠' },
  { value: 'agent',   label: 'Agent / Broker',    desc: 'Manage client listings',   emoji: '👤' },
  { value: 'builder', label: 'Builder',           desc: 'Post projects & units',    emoji: '🏗️' },
]

export default function RegisterPage() {
  const [role, setRole] = useState<Role>('buyer')
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })

  function strength(p: string) {
    let s = 0
    if (p.length >= 8) s++
    if (/[A-Z]/.test(p)) s++
    if (/[0-9]/.test(p)) s++
    if (/[^A-Za-z0-9]/.test(p)) s++
    return s
  }
  const str = strength(form.password)
  const strColors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500']
  const strLabels = ['Weak', 'Fair', 'Good', 'Strong']

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center shadow-brand">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-brand-600">Prop<span className="text-accent-500">Space</span></span>
          </Link>
          <h1 className="text-xl font-bold text-neutral-900 mt-6 mb-1">Create Your Account</h1>
          <p className="text-sm text-neutral-400">Join 50 lakh+ users on India&apos;s fastest growing property portal</p>
        </div>

        <div className="bg-white rounded-3xl shadow-card p-7">
          {/* Role selector */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-neutral-700 mb-3">I am a...</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {ROLES.map(r => (
                <button key={r.value} onClick={() => setRole(r.value)}
                  className={cn('p-3 rounded-2xl border text-center transition-all',
                    role === r.value
                      ? 'bg-brand-50 border-brand-500 ring-1 ring-brand-300'
                      : 'bg-white border-neutral-200 hover:border-brand-200'
                  )}>
                  <div className="text-2xl mb-1">{r.emoji}</div>
                  <div className={cn('text-xs font-semibold', role === r.value ? 'text-brand-700' : 'text-neutral-700')}>{r.label}</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">{r.desc}</div>
                  {role === r.value && (
                    <div className="w-4 h-4 bg-brand-600 rounded-full flex items-center justify-center mx-auto mt-1.5">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Form fields */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  placeholder="Rahul Sharma"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Phone Number *</label>
                <div className="flex gap-2">
                  <span className="flex items-center border border-neutral-200 rounded-xl px-3 py-2.5 text-sm bg-neutral-50 text-neutral-600 shrink-0">
                    🇮🇳 +91
                  </span>
                  <input
                    type="tel"
                    placeholder="98765 43210"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="flex-1 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-400"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Email Address *</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Password *</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full border border-neutral-200 rounded-xl px-4 pr-10 py-2.5 text-sm outline-none focus:border-brand-400"
                />
                <button onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[0,1,2,3].map(i => (
                      <div key={i} className={cn('flex-1 h-1 rounded-full transition-all',
                        i < str ? strColors[str - 1] : 'bg-neutral-200'
                      )} />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-400">{strLabels[str - 1] || 'Too short'}</p>
                </div>
              )}
            </div>

            {/* Agent/Builder extra fields */}
            {(role === 'agent' || role === 'builder') && (
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                  {role === 'agent' ? 'RERA Registration Number' : 'Company / Builder Name'}
                </label>
                <input
                  type="text"
                  placeholder={role === 'agent' ? 'RERA/AGENT/XX/2024/XXXXXX' : 'e.g. Prestige Group'}
                  className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-400"
                />
              </div>
            )}

            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" className="mt-0.5 accent-brand-600" />
              <label htmlFor="terms" className="text-xs text-neutral-500">
                I agree to PropSpace&apos;s{' '}
                <Link href="/terms" className="text-brand-600 hover:underline">Terms of Service</Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-brand-600 hover:underline">Privacy Policy</Link>.
                I consent to receiving property updates via SMS & email.
              </label>
            </div>

            <button className="w-full btn-primary py-3 flex items-center justify-center gap-2">
              Create Account <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="text-xs text-neutral-400">or</span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          {/* Social */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 border border-neutral-200 rounded-xl py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
              <span className="text-lg">🇬</span> Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-neutral-200 rounded-xl py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
              <span className="text-lg">📘</span> Facebook
            </button>
          </div>

          <p className="text-center text-sm text-neutral-400 mt-5">
            Already have an account?{' '}
            <Link href="/auth-login" className="text-brand-600 font-semibold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}