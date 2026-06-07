import type { Metadata, Viewport } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Toaster } from '@/components/ui/Toaster'
import '@/styles/globals.css'


const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | PropSpace – Buy, Sell & Rent Properties',
    default: 'PropSpace – Buy, Sell & Rent Properties in India',
  },
  description: 'Find your dream home, investment property, or rental. Browse verified listings across residential, commercial, plots & PGs across India.',
  keywords: ['buy property', 'rent flat', 'real estate India', 'apartments', 'property portal', 'PG', 'villa', 'plot'],
  openGraph: {
    title: 'PropSpace – Buy, Sell & Rent Properties in India',
    description: 'Find your dream home with verified listings.',
    type: 'website',
    locale: 'en_IN',
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a56db',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-neutral-50 text-neutral-900">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}