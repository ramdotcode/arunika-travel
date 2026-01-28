import Hero from '@/components/Hero'
import Trust from '@/components/Trust'
import Features from '@/components/Features'
import TourPackages from '@/components/TourPackages'
import Itinerary from '@/components/Itinerary'
import Gallery from '@/components/Gallery'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import CTA from '@/components/CTA'
import { supabase } from '@/lib/supabase'

async function getData() {
  const [
    { data: tours },
    { data: testimonials },
    { data: faqs },
    { data: gallery }
  ] = await Promise.all([
    supabase.from('tours').select('*').order('created_at', { ascending: false }),
    supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
    supabase.from('faqs').select('*').order('order_index', { ascending: true }),
    supabase.from('gallery').select('*').order('created_at', { ascending: false })
  ])

  return {
    tours: tours || [],
    testimonials: testimonials || [],
    faqs: faqs || [],
    gallery: gallery || []
  }
}

export default async function Home() {
  const data = await getData()
  const popularTours = data.tours.slice(0, 4)

  return (
    <>
      <Hero />
      <Trust />
      <Features />
      <TourPackages tours={popularTours} title="Paket Tour Populer" showViewAll={true} />
      <Itinerary />
      <Gallery gallery={data.gallery} />
      <Testimonials testimonials={data.testimonials} />
      <FAQ faqs={data.faqs} />
      <CTA />
    </>
  )
}
