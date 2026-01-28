"use client"

import { FadeIn, Reveal } from './Animate'

export default function Hero() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 lg:px-10 py-6 w-full">
      <div 
        className="relative min-h-[640px] rounded-[2rem] overflow-hidden flex items-end p-8 lg:p-20 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%), url("https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=2000")`
        }}
      >
        <div className="max-w-2xl flex flex-col gap-8 relative z-10">
          <div className="space-y-6">
            <Reveal>
              <h1 className="text-white text-4xl lg:text-7xl font-black leading-[1.05] tracking-tight">
                Jelajahi Indonesia <br /> 
                <span className="text-primary-foreground italic font-serif">Lebih Berarti</span>
              </h1>
            </Reveal>
            
            <FadeIn delay={0.4}>
              <p className="text-white/80 text-lg lg:text-xl font-medium max-w-lg leading-relaxed">
                Arunika merancang perjalanan eksklusif untuk Anda yang mengutamakan kenyamanan, detail, dan pengalaman tak terlupakan.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.6} direction="up" distance={40}>
            <div className="flex flex-wrap gap-5">
              <button className="bg-primary text-white px-10 py-5 rounded-full text-lg font-black hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-2xl shadow-primary/40">
                <span className="material-symbols-outlined text-2xl font-black">chat</span>
                Mulai Konsultasi
              </button>
              <button className="bg-white/10 backdrop-blur-xl text-white border border-white/20 px-10 py-5 rounded-full text-lg font-black hover:bg-white/20 transition-all active:scale-95">
                Lihat Destinasi
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
