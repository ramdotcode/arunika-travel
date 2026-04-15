export default function Trust() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 lg:px-10 py-6 lg:py-8 w-full">
      <div className="bg-card rounded-3xl p-6 lg:p-8 border border-card-border flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
        <div className="flex items-center gap-6 w-full lg:w-auto border-b lg:border-b-0 lg:border-r border-card-border pb-6 lg:pb-0 lg:pr-12">
          <div>
            <p className="text-xs lg:text-sm text-gray-500 font-medium whitespace-nowrap">Rating Pelanggan</p>
            <div className="flex items-center gap-2">
              <span className="text-xl lg:text-2xl font-black">4.8/5</span>
              <span className="material-symbols-outlined text-yellow-500 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
          </div>
          <div className="w-px h-10 bg-card-border hidden lg:block"></div>
          <div>
            <p className="text-xs lg:text-sm text-gray-500 font-medium whitespace-nowrap">Happy Travelers</p>
            <p className="text-xl lg:text-2xl font-black">50k+</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-6 lg:gap-12 w-full lg:w-auto opacity-40 grayscale">
          <span className="font-black text-sm lg:text-lg text-site text-center">GARUDA</span>
          <span className="font-black text-sm lg:text-lg text-site text-center">HILTON</span>
          <span className="font-black text-sm lg:text-lg text-site text-center">TRAVELOKA</span>
          <span className="font-black text-sm lg:text-lg text-site text-center">MARRIOTT</span>
        </div>
      </div>
    </section>
  )
}
