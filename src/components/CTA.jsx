export default function CTA() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 lg:px-10 py-12 w-full mb-20">
      <div className="bg-primary rounded-xl p-12 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="url(#grad1)"></path>
            <defs>
              <linearGradient id="grad1" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 0.2 }}></stop>
                <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 0 }}></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="relative z-10 space-y-8">
          <h2 className="text-3xl lg:text-5xl font-black">Destinasi Impian Tinggal Selangkah Lagi</h2>
          <p className="text-white/80 text-lg lg:text-xl max-w-2xl mx-auto">
            Konsultasikan rencana perjalanan Anda secara GRATIS dengan travel expert kami sekarang juga.
          </p>
          <div className="flex flex-col items-center gap-4">
            <button className="group relative bg-[#25D366] hover:bg-[#20ba56] text-white px-10 py-5 rounded-full text-xl font-bold flex items-center gap-3 transition-all transform hover:scale-105 shadow-2xl shadow-green-500/20">
              <span className="material-symbols-outlined text-3xl">chat</span>
              Tanya Lewat WhatsApp
              <span className="absolute -top-2 -right-2 flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-white"></span>
              </span>
            </button>
            <p className="text-sm text-white/60">Fast response: 09:00 - 21:00 WIB</p>
          </div>
        </div>
      </div>
    </section>
  )
}
