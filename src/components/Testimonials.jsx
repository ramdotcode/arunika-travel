"use client"

import { motion } from "motion/react"
import { FadeIn, StaggerContainer } from './Animate'

export default function Testimonials({ testimonials }) {
  return (
    <section className="bg-primary/5 py-24" id="testimoni">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-10">
        <FadeIn>
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-black text-site tracking-tight">Cerita dari Mereka yang Telah <br /> Bepergian Bersama Kami</h2>
            <p className="text-gray-500 font-medium italic">Social Proof & Testimoni</p>
          </div>
        </FadeIn>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <motion.div 
                key={t.id}
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
              >
                <div className="bg-white p-10 rounded-[2.5rem] border border-card-border shadow-sm hover:shadow-xl transition-all duration-500 group h-full flex flex-col">
                  <div className="flex gap-1 text-orange-400 mb-6">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined fill-current text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-8 italic leading-relaxed flex-1">&quot;{t.content}&quot;</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 p-0.5">
                      <img className="w-full h-full object-cover rounded-full" alt={t.name} src={t.avatar_url || `https://ui-avatars.com/api/?name=${t.name}&background=random`} />
                    </div>
                    <div>
                      <p className="font-black text-site">{t.name}</p>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{t.location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}
