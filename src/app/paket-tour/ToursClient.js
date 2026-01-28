"use client"

import { useState } from 'react'
import TourPackages from '@/components/TourPackages'
import CTA from '@/components/CTA'

export default function ToursClient({ tours }) {
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  
  const categories = ['Semua', ...new Set(tours.map(t => t.category).filter(Boolean))]
  
  const filteredTours = selectedCategory === 'Semua' 
    ? tours 
    : tours.filter(t => t.category === selectedCategory)

  return (
    <div className="pt-10">
      <section className="max-w-[1200px] mx-auto px-4 lg:px-10 text-center mb-10">
        <h1 className="text-4xl lg:text-5xl font-black mb-6">Semua Paket Tour</h1>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border
                ${selectedCategory === cat 
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105' 
                  : 'bg-white text-gray-500 border-card-border hover:border-primary hover:text-primary'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="text-card-text max-w-2xl mx-auto">
          Temukan berbagai destinasi menarik dengan layanan terbaik dari kami. Kami siap mengantarkan Anda ke tempat-tempat impian.
        </p>
      </section>
      
      <TourPackages 
        tours={filteredTours} 
        title={selectedCategory === 'Semua' ? 'Pilih Destinasi Kamu' : `Paket ${selectedCategory}`} 
        showViewAll={false} 
      />
      
      <div className="mt-20">
        <CTA />
      </div>
    </div>
  )
}
