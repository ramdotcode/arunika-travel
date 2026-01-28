"use client"

import Link from 'next/link'
import { motion } from "motion/react"
import { FadeIn, StaggerContainer } from './Animate'

export default function TourPackages({ tours, title = "Paket Tour Populer", showViewAll = true }) {
  const formatPrice = (price) => {
    if (price >= 1000000) {
      const million = price / 1000000;
      return `Rp ${million.toString().replace('.', ',')} Jt`;
    }
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <section className="max-w-[1200px] mx-auto px-4 lg:px-10 py-20 w-full" id="paket">
      <FadeIn>
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600">Pilih destinasi impianmu sekarang juga.</p>
          </div>
          {showViewAll && (
            <Link href="/paket-tour" className="text-primary font-bold flex items-center gap-2">
              Lihat Semua <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          )}
        </div>
      </FadeIn>

      <StaggerContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour) => (
            <motion.div 
              key={tour.id}
              variants={{ hidden: { opacity: 0, scale: 0.95, y: 30 }, show: { opacity: 1, scale: 1, y: 0 } }}
            >
              <Link href={`/paket-tour/${tour.slug}`} className="group bg-card rounded-[2rem] overflow-hidden border border-card-border transition-all flex flex-col h-full hover:shadow-2xl hover:shadow-primary/5">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    alt={tour.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 bg-gray-100" 
                    src={tour.image_url || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800'} 
                  />
                  {tour.badge && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className={`text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-[0.1em] shadow-lg
                        ${tour.badge.includes('Slot') ? 'bg-red-600' : 
                          tour.badge.includes('Soon') ? 'bg-gray-600' : 'bg-primary'}`}>
                        {tour.badge}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <div className="space-y-4 flex-1">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span className="text-primary">{tour.category}</span>
                        <span className="text-gray-400 flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">schedule</span>
                          {tour.duration}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg leading-tight line-clamp-2 h-12 group-hover:text-primary transition-colors">{tour.name}</h3>
                    </div>
                    <p className="text-sm text-card-text leading-relaxed line-clamp-2 h-10">{tour.description}</p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-card-border flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Mulai dari</p>
                      <p className="text-primary font-black text-xl lg:text-2xl truncate">{formatPrice(tour.price)}</p>
                    </div>
                    <button className="bg-primary text-white w-11 h-11 rounded-full hover:scale-110 active:scale-95 transition-all flex items-center justify-center shadow-lg shadow-primary/30 flex-shrink-0">
                      <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </StaggerContainer>
    </section>
  )
}
