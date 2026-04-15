"use client"

import { FadeIn, Reveal } from './Animate'

export default function Hero({ settings }) {
  const content = settings || {
    title_main: "Jelajahi Indonesia",
    title_accent: "Lebih Berarti",
    description: "Arunika merancang perjalanan eksklusif untuk Anda yang mengutamakan kenyamanan, detail, dan pengalaman tak terlupakan.",
    image_url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=2000",
    primary_btn: "Mulai Konsultasi",
    secondary_btn: "Lihat Destinasi"
  }

  return (
    <section className="max-w-[1200px] mx-auto px-4 lg:px-10 py-4 lg:py-6 w-full">
      <div 
        className="relative min-h-[500px] lg:min-h-[640px] rounded-2xl lg:rounded-[2rem] overflow-hidden flex items-end p-6 lg:p-20 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%), url("${content.image_url}")`
        }}
      >
        <div className="max-w-2xl flex flex-col gap-6 lg:gap-8 relative z-10 w-full">
          <div className="space-y-4 lg:space-y-6">
            <Reveal>
              <h1 className="text-white text-3xl md:text-5xl lg:text-7xl font-black leading-[1.1] lg:leading-[1.05] tracking-tight">
                {content.title_main} <br /> 
                <span className="text-primary-foreground italic font-serif">{content.title_accent}</span>
              </h1>
            </Reveal>
            
            <FadeIn delay={0.4}>
              <p className="text-white/80 text-base md:text-lg lg:text-xl font-medium max-w-lg leading-relaxed">
                {content.description}
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.6} direction="up" distance={40}>
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-5">
              <a 
                href="https://wa.me/628111111111"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white px-8 lg:px-10 py-4 lg:py-5 rounded-full text-base lg:text-lg font-black hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-primary/40"
              >
                <span className="material-symbols-outlined text-2xl font-black">chat</span>
                {content.primary_btn}
              </a>
              <button className="bg-white/10 backdrop-blur-xl text-white border border-white/20 px-8 lg:px-10 py-4 lg:py-5 rounded-full text-base lg:text-lg font-black hover:bg-white/20 transition-all active:scale-95">
                {content.secondary_btn}
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
