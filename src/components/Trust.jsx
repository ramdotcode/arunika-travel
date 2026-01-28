export default function Trust() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 lg:px-10 py-8 w-full">
      <div className="bg-card rounded-xl p-8 border border-card-border flex flex-wrap items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-sm text-gray-500 font-medium">Rating Pelanggan</p>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold">4.8/5</span>
              <div className="flex text-yellow-400">
                <span className="material-symbols-outlined fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </div>
          </div>
          <div className="w-px h-10 bg-card-border"></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Happy Travelers</p>
            <p className="text-2xl font-bold">50k+</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <span className="font-bold text-xl text-site">GARUDA</span>
          <span className="font-bold text-xl text-site">HILTON</span>
          <span className="font-bold text-xl text-site">TRAVELOKA</span>
          <span className="font-bold text-xl text-site">MARRIOTT</span>
        </div>
      </div>
    </section>
  )
}
