export default function DashboardOverview() {
  const stats = [
    { name: "Total Paket Tour", value: "12", icon: "package", color: "blue" },
    { name: "Artikel Blog", value: "24", icon: "edit_note", color: "purple" },
    { name: "Testimoni", value: "156", icon: "chat", color: "orange" },
    { name: "Pengunjung (Bulan Ini)", value: "2.4k", icon: "trending_up", color: "green" },
  ]

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-black text-site">Selamat Datang, Admin! 👋</h1>
        <p className="text-gray-500 font-medium mt-1">Berikut adalah ringkasan performa website kamu hari ini.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-8 rounded-3xl border border-card-border shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 
              ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600' : 
                stat.color === 'purple' ? 'bg-purple-50 text-purple-600' : 
                stat.color === 'orange' ? 'bg-orange-50 text-orange-600' : 
                'bg-green-50 text-green-600'}`}>
              <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.name}</p>
            <p className="text-4xl font-black text-site">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white p-10 rounded-3xl border border-card-border">
          <h2 className="text-xl font-black mb-8">Aksi Cepat</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-card-border hover:border-primary hover:bg-primary/5 transition-all">
              <span className="material-symbols-outlined text-primary">add_box</span>
              <span className="font-bold text-sm">Tambah Tour</span>
            </button>
            <button className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-card-border hover:border-primary hover:bg-primary/5 transition-all">
              <span className="material-symbols-outlined text-primary">post_add</span>
              <span className="font-bold text-sm">Tulis Blog</span>
            </button>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-site p-10 rounded-3xl border border-card-border border-dashed">
          <h2 className="text-xl font-black mb-6">Status Sistem</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-card-border">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="font-bold text-sm">Database Supabase</span>
              </div>
              <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full font-bold">Terhubung</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-card-border">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="font-bold text-sm">Next.js 15 Server</span>
              </div>
              <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full font-bold">Aktif</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
