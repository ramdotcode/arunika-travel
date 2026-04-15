import Link from 'next/link'
import CTA from '@/components/CTA'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const { data: tour } = await supabase.from('tours').select('*').eq('slug', slug).single()
  
  if (!tour) return { title: 'Paket Tidak Ditemukan' }
  
  return {
    title: `${tour.name} - Liburan Impian`,
    description: tour.description,
  }
}

export default async function TourDetail({ params }) {
  const { slug } = await params
  const { data: tour } = await supabase.from('tours').select('*').eq('slug', slug).single()

  if (!tour) {
    notFound()
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="bg-[#f6f6f8] min-h-screen">
      {/* Hero Header */}
      <section className="relative h-[60vh] min-h-[400px] w-full">
        <img 
          src={tour.image_url} 
          alt={tour.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 lg:p-20">
          <div className="max-w-[1200px] mx-auto">
            <Link href="/paket-tour" className="text-white/80 hover:text-white flex items-center gap-2 mb-6 text-sm font-medium transition-colors">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Kembali ke Paket
            </Link>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                {tour.duration}
              </span>
              {tour.badge && (
                <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30 uppercase tracking-widest">
                  {tour.badge}
                </span>
              )}
            </div>
            <h1 className="text-4xl lg:text-7xl font-black text-white leading-tight mb-4">
              {tour.name}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[1200px] mx-auto px-4 lg:px-10 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Info */}
          <div className="flex-1 space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Tentang Paket Ini</h2>
              <p className="text-card-text text-lg leading-relaxed">
                {tour.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6 italic">Rencana Perjalanan (Itinerary)</h2>
              <div className="space-y-0 relative border-l-2 border-primary/20 ml-4">
                <div className="pb-10 ml-8 relative">
                  <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-primary ring-4 ring-primary/20"></div>
                  <h4 className="font-bold text-lg text-primary">Day 1: Penjemputan & Check-in</h4>
                  <p className="text-card-text mt-2">Tiba di meeting point, penjemputan oleh guide, dan proses check-in hotel.</p>
                </div>
                <div className="pb-10 ml-8 relative">
                  <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-primary/40"></div>
                  <h4 className="font-bold text-lg">Day 2: Full Day Tour</h4>
                  <p className="text-card-text mt-2">Mengunjungi destinasi utama favorit dan makan siang kuliner lokal.</p>
                </div>
                <div className="pb-4 ml-8 relative">
                  <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-green-500"></div>
                  <h4 className="font-bold text-lg text-green-600">Day 3: Belanja Oleh-oleh & Kepulangan</h4>
                  <p className="text-card-text mt-2">Waktu bebas untuk belanja dan pengantaran kembali ke bandara/stasiun.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-card p-8 rounded-2xl border border-card-border sticky top-24 shadow-xl shadow-black/5">
              <div className="mb-8">
                <p className="text-sm text-gray-500 font-medium uppercase tracking-widest mb-2">Harga Per Orang</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-primary">{formatPrice(tour.price)}</span>
                  <span className="text-gray-400 font-medium whitespace-nowrap">/ pack</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <span className="material-symbols-outlined text-green-500">check_circle</span>
                  <span>Hotel Bintang 4/5</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <span className="material-symbols-outlined text-green-500">check_circle</span>
                  <span>Makan Sesuai Jadwal</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <span className="material-symbols-outlined text-green-500">check_circle</span>
                  <span>Tiket Masuk Wisata</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <span className="material-symbols-outlined text-green-500">check_circle</span>
                  <span>Local Guide Berlisensi</span>
                </div>
              </div>

              <button className="w-full bg-[#25D366] hover:bg-[#20ba56] text-white py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] shadow-lg shadow-green-500/20">
                <span className="material-symbols-outlined">chat</span>
                Pesan via WhatsApp
              </button>
              <p className="text-center text-[10px] text-gray-400 mt-4">Tersedia cicilan 0% dengan kartu kredit pilihan</p>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  )
}
