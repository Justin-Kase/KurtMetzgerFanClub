// Root Page — Server Component
// Fetches CMS data and passes to client components

import { getTourDates, getQuotes, getBlogPosts } from '@/lib/sanity'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import OccultDecorations from '@/components/OccultDecorations'
import TourDates from '@/components/TourDates'
import BlogSection from '@/components/BlogSection'
import DerpSection from '@/components/DerpSection'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'
import KonamiCode from '@/components/KonamiCode'

export default async function Home() {
  // Parallel data fetching from Sanity (falls back to static data if unconfigured)
  const [tourDates, quotes, blogPosts] = await Promise.all([
    getTourDates(),
    getQuotes(),
    getBlogPosts(),
  ])

  return (
    <>
      {/* Fixed occult background decorations */}
      <OccultDecorations />

      {/* Navigation */}
      <Navbar />

      <main>
        {/* Hero / Sanctum */}
        <HeroSection quotes={quotes} />

        {/* Tour Dates */}
        <TourDates tourDates={tourDates} />

        {/* Metzger Mind — Blog */}
        <BlogSection posts={blogPosts} />

        {/* Derp Streams */}
        <DerpSection />

        {/* Join the Unholy Alliance — Newsletter */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />

      {/* Konami Code Easter Egg (client only) */}
      <KonamiCode />
    </>
  )
}
