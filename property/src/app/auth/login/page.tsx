'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Building2, Eye, EyeOff, Phone, Mail, Lock, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Mode = 'email' | 'phone'

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>('phone')
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ email: '', phone: '', password: '', otp: '' })
  const [otpSent, setOtpSent] = useState(false)

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center shadow-brand">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-brand-600">Prop<span className="text-accent-500">Space</span></span>
          </Link>
          <h1 className="text-xl font-bold text-neutral-900 mt-6 mb-1">Welcome Back</h1>
          <p className="text-sm text-neutral-400">Sign in to manage your properties & leads</p>
        </div>

        <div className="bg-white rounded-3xl shadow-card p-7">
          {/* Mode toggle */}
          <div className="flex bg-neutral-100 rounded-xl p-1 mb-6">
            {(['phone', 'email'] as Mode[]).map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={cn('flex-1 py-2 rounded-lg text-sm font-medium transition-all capitalize',
                  mode === m ? 'bg-white shadow text-brand-600' : 'text-neutral-500'
                )}>
                {m === 'phone' ? '📱 Phone OTP' : '📧 Email'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {mode === 'phone' ? (
              <>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Phone Number</label>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 border border-neutral-200 rounded-xl px-3 py-2.5 bg-neutral-50 text-sm text-neutral-600 shrink-0">
                      🇮🇳 +91
                    </div>
                    <input
                      type="tel"
                      placeholder="98765 43210"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="flex-1 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-400"
                    />
                  </div>
                </div>

                {otpSent && (
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Enter OTP</label>
                    <div className="flex gap-2">
                      {[0,1,2,3,4,5].map(i => (
                        <input key={i} type="text" maxLength={1}
                          className="flex-1 border border-neutral-200 rounded-xl text-center py-3 text-lg font-bold outline-none focus:border-brand-400 text-neutral-800"
                        />
                      ))}
                    </div>
                    <p className="text-xs text-neutral-400 mt-2">
                      Didn&apos;t receive?{' '}
                      <button className="text-brand-600 font-medium hover:underline">Resend OTP</button>
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setOtpSent(true)}
                  className="w-full btn-primary py-3 flex items-center justify-center gap-2"
                >
                  {otpSent ? 'Verify OTP' : 'Send OTP'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-neutral-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-brand-400"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-semibold text-neutral-700">Password</label>
                    <Link href="/forgot-password" className="text-xs text-brand-600 hover:underline">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type={showPass ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={e => setForm({ ...form, password: e.target.value })}
                      className="w-full border border-neutral-200 rounded-xl pl-10 pr-10 py-2.5 text-sm outline-none focus:border-brand-400"
                    />
                    <button onClick={() => setShowPass(!showPass)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button className="w-full btn-primary py-3 flex items-center justify-center gap-2">
                  Sign In <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="text-xs text-neutral-400">or continue with</span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          {/* Social login */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 border border-neutral-200 rounded-xl py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
              <span className="text-lg">🇬</span> Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-neutral-200 rounded-xl py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
              <span className="text-lg">📘</span> Facebook
            </button>
          </div>

          <p className="text-center text-sm text-neutral-400 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/auth-register" className="text-brand-600 font-semibold hover:underline">Sign Up Free</Link>
          </p>
        </div>

        <p className="text-center text-xs text-neutral-400 mt-5">
          By continuing you agree to our{' '}
          <Link href="/terms" className="hover:text-brand-500">Terms of Service</Link> &{' '}
          <Link href="/privacy" className="hover:text-brand-500">Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}