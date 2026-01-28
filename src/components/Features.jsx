"use client"

import { motion } from "motion/react"
import { FadeIn, StaggerContainer } from './Animate'

export default function Features() {
  return (
    <>
      <section className="max-w-[1200px] mx-auto px-4 lg:px-10 py-12 w-full">
        <FadeIn>
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-black text-site">Alasan Klien Mempercayakan Perjalanan Mereka kepada Kami</h2>
            <p className="text-gray-500 font-medium">Kenapa Arunika?</p>
          </div>
        </FadeIn>
        
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
              <div className="bg-white h-full p-8 rounded-3xl border border-card-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">psychology</span>
                </div>
                <h3 className="text-xl font-black mb-3 text-site">Pendekatan Personal</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">Setiap itinerary dirancang secara khusus, bukan template.</p>
              </div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
              <div className="bg-white h-full p-8 rounded-3xl border border-card-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">groups</span>
                </div>
                <h3 className="text-xl font-black mb-3 text-site">Tim Berpengalaman</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">Menangani private & corporate trip dengan standar profesional.</p>
              </div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
              <div className="bg-white h-full p-8 rounded-3xl border border-card-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">verified</span>
                </div>
                <h3 className="text-xl font-black mb-3 text-site">Transparansi Biaya</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">Harga jelas sejak awal, tanpa biaya tersembunyi.</p>
              </div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
              <div className="bg-white h-full p-8 rounded-3xl border border-card-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">center_focus_strong</span>
                </div>
                <h3 className="text-xl font-black mb-3 text-site">Detail-Oriented</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">Fokus pada kenyamanan, timing, dan pengalaman.</p>
              </div>
            </motion.div>
          </div>
        </StaggerContainer>
      </section>
    </>
  )
}
