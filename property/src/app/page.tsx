import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { QuickLinks } from '@/components/home/QuickLinks'
import { FeaturedProperties } from '@/components/home/FeaturedProperties'
import { PopularCities } from '@/components/home/PopularCities'
import { NewProjects } from '@/components/home/NewProjects'
import { WhyUs } from '@/components/home/WhyUs'
import { Testimonials } from '@/components/home/Testimonials'
import { StatsSection } from '@/components/home/StatsSection'
import { CTABanner } from '@/components/home/CTABanner'
import { RecentlyViewed } from '@/components/home/RecentlyViewed'

export const metadata: Metadata = {
  title: 'PropSpace – Buy, Sell & Rent Properties in India',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickLinks />
      <StatsSection />
      <FeaturedProperties />
      <PopularCities />
      <NewProjects />
      <WhyUs />
      <RecentlyViewed />
      <Testimonials />
      <CTABanner />
    </>
  )
}