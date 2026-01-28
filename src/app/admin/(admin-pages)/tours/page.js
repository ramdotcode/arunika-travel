"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function ToursManagement() {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTours()
  }, [])

  const fetchTours = async () => {
    try {
      const { data, error } = await supabase
        .from("tours")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setTours(data || [])
    } catch (err) {
      console.error("Error fetching tours:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus paket tour ini?")) return

    try {
      const { error } = await supabase.from("tours").delete().eq("id", id)
      if (error) throw error
      setTours(tours.filter(t => t.id !== id))
    } catch (err) {
      alert("Gagal menghapus paket: " + err.message)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-site text-gray-800">Manajemen Paket Tour</h1>
          <p className="text-gray-500 font-medium mt-1">Kelola daftar perjalanan yang ditawarkan kepada pelanggan.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-2">
          <span className="material-symbols-outlined">add_circle</span>
          Tambah Paket
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-card-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-card-border">
                <th className="px-6 py-5 text-sm font-black text-gray-400 uppercase tracking-widest">Paket Tour</th>
                <th className="px-6 py-5 text-sm font-black text-gray-400 uppercase tracking-widest">Kategori</th>
                <th className="px-6 py-5 text-sm font-black text-gray-400 uppercase tracking-widest">Harga</th>
                <th className="px-6 py-5 text-sm font-black text-gray-400 uppercase tracking-widest">Durasi</th>
                <th className="px-6 py-5 text-sm font-black text-gray-400 uppercase tracking-widest">Status / Slot</th>
                <th className="px-6 py-5 text-sm font-black text-gray-400 uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="6" className="px-6 py-8">
                      <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                    </td>
                  </tr>
                ))
              ) : tours.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center text-gray-400 font-medium">
                    Belum ada paket tour yang ditambahkan.
                  </td>
                </tr>
              ) : (
                tours.map((tour) => (
                  <tr key={tour.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-card-border">
                          {tour.image_url ? (
                            <img src={tour.image_url} alt={tour.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                              <span className="material-symbols-outlined text-3xl">image</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-site leading-tight">{tour.name}</p>
                          <p className="text-xs text-gray-400 mt-1 font-medium italic">slug: {tour.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        tour.category === 'Internasional' ? 'bg-purple-50 text-purple-600 border border-purple-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                      }`}>
                        {tour.category}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-black text-site">Rp {new Intl.NumberFormat('id-ID').format(tour.price)}</p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5 text-gray-500 font-bold">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        {tour.duration}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                        {tour.badge && (
                          <span className="text-[10px] font-bold text-orange-500">{tour.badge}</span>
                        )}
                        <span className="text-sm font-medium text-gray-400">
                          {tour.remaining_slots ? `${tour.remaining_slots} Slot Tersisa` : 'Slot Tak Terbatas'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button 
                          onClick={() => handleDelete(tour.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" 
                          title="Hapus"
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
