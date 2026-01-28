"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  const menuItems = [
    { name: "Dashboard", icon: "dashboard", path: "/admin/dashboard" },
    { name: "Paket Tour", icon: "package", path: "/admin/tours" },
    { name: "Blog Posts", icon: "edit_note", path: "/admin/blog" },
    { name: "Testimoni", icon: "chat", path: "/admin/testimonials" },
  ]

  return (
    <div className="flex min-h-screen bg-[#f6f6f8]">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-card-border flex flex-col fixed h-full z-20">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="text-primary">
              <svg className="size-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-xl font-black tracking-tight text-site">AdminPanel</h2>
          </Link>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${
                  pathname === item.path
                    ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                    : "text-gray-500 hover:bg-gray-50 hover:text-primary"
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-card-border bg-gray-50/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">person</span>
            </div>
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Logged in as</p>
              <p className="text-sm font-bold text-site truncate max-w-[140px]">Administrator</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-500 font-bold hover:bg-red-50 w-full px-4 py-3 rounded-xl transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-72 flex flex-col">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-card-border sticky top-0 z-10 px-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-gray-400">search</span>
            <input 
              type="text" 
              placeholder="Cari sesuatu..." 
              className="bg-transparent outline-none font-medium text-sm w-64"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-full border border-green-100">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-wider">System Live</span>
            </div>
            
            <div className="h-8 w-[1px] bg-gray-100"></div>

            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors group"
            >
              <span className="text-sm font-bold">Logout</span>
              <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">logout</span>
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </main>
      </div>
    </div>
  )
}
