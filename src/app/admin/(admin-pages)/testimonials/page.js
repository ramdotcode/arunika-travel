"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setTestimonials(data || [])
    } catch (err) {
      console.error("Error fetching testimonials:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Hapus testimoni ini?")) return
    try {
      const { error } = await supabase.from("testimonials").delete().eq("id", id)
      if (error) throw error
      setTestimonials(testimonials.filter(t => t.id !== id))
    } catch (err) {
      alert("Gagal menghapus: " + err.message)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-site text-gray-800">Testimoni Pelanggan</h1>
        <p className="text-gray-500 font-medium mt-1">Ulasan dari pelanggan yang sudah mencoba jasa tour kamu.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-64 bg-white rounded-3xl border border-card-border animate-pulse"></div>
          ))
        ) : testimonials.length === 0 ? (
          <div className="col-span-full py-20 text-center text-gray-400 font-medium">Belum ada testimoni.</div>
        ) : (
          testimonials.map((item) => (
            <div key={item.id} className="bg-white p-8 rounded-3xl border border-card-border shadow-sm flex flex-col group relative overflow-hidden">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden border border-card-border">
                  {item.avatar_url ? <img src={item.avatar_url} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50"><span className="material-symbols-outlined">person</span></div>}
                </div>
                <div>
                  <p className="font-bold text-site leading-tight">{item.name}</p>
                  <p className="text-xs text-gray-400 font-medium">{item.location}</p>
                </div>
              </div>

              <div className="flex gap-0.5 text-orange-400 mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <span key={i} className={`material-symbols-outlined text-[16px] ${i < (item.rating || 5) ? 'fill-current' : 'text-gray-200'}`}>star_rate</span>
                ))}
              </div>

              <p className="text-gray-600 text-sm italic line-clamp-4 flex-1 font-medium leading-relaxed">
                "{item.content}"
              </p>

              <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                <span className="text-[10px] text-gray-300 font-black uppercase tracking-widest">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
