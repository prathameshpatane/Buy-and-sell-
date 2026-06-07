'use client'
import { useState, useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastType = 'success' | 'error' | 'info'
interface Toast { id: string; message: string; type: ToastType }

// Simple global toast store
let _toasts: Toast[] = []
let _listeners: ((toasts: Toast[]) => void)[] = []

function notify(listeners: ((t: Toast[]) => void)[], toasts: Toast[]) {
  listeners.forEach(l => l([...toasts]))
}

export function toast(message: string, type: ToastType = 'info') {
  const id = Math.random().toString(36).slice(2)
  _toasts = [..._toasts, { id, message, type }]
  notify(_listeners, _toasts)
  setTimeout(() => {
    _toasts = _toasts.filter(t => t.id !== id)
    notify(_listeners, _toasts)
  }, 4000)
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    _listeners.push(setToasts)
    return () => { _listeners = _listeners.filter(l => l !== setToasts) }
  }, [])

  return (
    <div className="fixed bottom-5 right-5 z-[100] space-y-2 min-w-72">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            'flex items-start gap-3 px-4 py-3 rounded-2xl shadow-lg border text-sm animate-slide-up',
            t.type === 'success' && 'bg-green-50 border-green-200 text-green-800',
            t.type === 'error' && 'bg-red-50 border-red-200 text-red-800',
            t.type === 'info' && 'bg-blue-50 border-blue-200 text-blue-800',
          )}
        >
          {t.type === 'success' && <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />}
          {t.type === 'error' && <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />}
          {t.type === 'info' && <Info className="w-4 h-4 mt-0.5 shrink-0" />}
          <span className="flex-1">{t.message}</span>
          <button
            onClick={() => {
              _toasts = _toasts.filter(x => x.id !== t.id)
              notify(_listeners, _toasts)
            }}
          >
            <X className="w-3.5 h-3.5 opacity-60" />
          </button>
        </div>
      ))}
    </div>
  )
}