export default function Itinerary() {
  const steps = [
    { day: 1, title: 'Arrival & Sunset Dinner', desc: 'Penjemputan Bandara Ngurah Rai dan makan malam romantis di Jimbaran.', active: true },
    { day: 2, title: 'Cultural Ubud Explorer', desc: 'Tegallalang Rice Terrace, Monkey Forest, dan makan siang bebek tepi sawah.', active: false },
    { day: 3, title: 'Nusa Penida One Day Trip', desc: 'Kelingking Beach, Broken Beach, dan Crystal Bay snorkelling.', active: false },
    { day: 4, title: 'Uluwatu & Kecak Dance', desc: 'Pantai Melasti, Pura Uluwatu, dan pertunjukan tari Kecak saat matahari terbenam.', active: false },
    { day: 5, title: 'Souvenirs & Departure', desc: 'Belanja oleh-oleh khas Bali dan pengantaran kembali ke bandara.', active: false, last: true }
  ]

  return (
    <section className="bg-card py-20">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-6">
            <span className="text-primary font-bold uppercase tracking-widest text-sm">Contoh Rencana</span>
            <h2 className="text-4xl font-black">5 Hari di Bali: <br/>Momen Tak Terlupakan</h2>
            <p className="text-card-text">Bayangkan liburan sempurna Anda sudah tersusun rapi. Kami menangani segalanya mulai dari penjemputan hingga makan malam romantis.</p>
            <button className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20">Dapatkan Detail Itinerary</button>
          </div>
          <div className="flex-1 w-full max-w-md">
            <div className="space-y-0 relative border-l-2 border-primary/20 ml-4">
              {steps.map((step, i) => (
                <div key={i} className={`${step.last ? 'pb-4' : 'pb-10'} ml-8 relative`}>
                  <div className={`absolute -left-[41px] top-0 w-5 h-5 rounded-full ring-4 ring-primary/20 
                    ${step.last ? 'bg-green-500' : (step.active ? 'bg-primary' : 'bg-primary/40')}`}></div>
                  <h4 className={`font-bold text-lg ${step.last ? 'text-green-600' : (step.active ? 'text-primary' : '')}`}>
                    Day {step.day}: {step.title}
                  </h4>
                  <p className="text-sm text-card-text mt-2">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
