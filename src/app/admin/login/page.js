"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        // Refresh router untuk memastikan middleware mendapatkan session terbaru
        router.refresh()
        
        // Beri sedikit jeda agar cookie tersimpan sempurna sebelum pindah
        setTimeout(() => {
          router.push("/admin/dashboard")
        }, 100)
      }
    } catch (err) {
      console.error("Login Error:", err)
      // Tampilkan pesan error spesifik dari Supabase (misal: "Email not confirmed")
      setError(err.message || "Gagal login. Periksa kembali email dan password.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f6f8] p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-white mb-4 shadow-xl shadow-primary/20">
            <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
          </div>
          <h1 className="text-3xl font-black text-site">Admin Panel</h1>
          <p className="text-gray-500 mt-2 font-medium">Silakan masuk untuk mengelola website</p>
        </div>

        <div className="bg-card p-8 rounded-3xl border border-card-border shadow-2xl shadow-black/5">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-base">error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
              <input 
                type="email" 
                required
                placeholder="admin@travel.com"
                className="w-full px-5 py-4 rounded-2xl border border-card-border bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="w-full px-5 py-4 rounded-2xl border border-card-border bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Memverifikasi...</span>
                </>
              ) : (
                "Masuk ke Dashboard"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          Lupa password? Hubungi developer sistem.
        </p>
      </div>
    </div>
  )
}
