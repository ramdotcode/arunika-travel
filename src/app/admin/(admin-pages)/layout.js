"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { 
  LayoutDashboard, 
  Home, 
  Package, 
  FileText, 
  MessageSquare, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Search,
  Bell,
  User,
  Menu,
  X
} from "lucide-react"

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  const navLinks = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Homepage", icon: Home, path: "/admin/homepage", hasChild: true },
    { name: "Tour", icon: Package, path: "/admin/tours", hasChild: true },
    { name: "User Feedback", icon: User, path: "/admin/testimonials" },
    { name: "Blog", icon: FileText, path: "/admin/blog" },
  ]

  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-white border-r border-slate-50 flex flex-col z-40 transition-transform duration-300 w-64
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="p-6 flex flex-col h-full">
          {/* Logo & Close Button */}
          <div className="flex items-center justify-between mb-10 px-2">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-lg shadow-slate-900/10 transition-transform group-hover:scale-105">
                <Package size={18} />
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-900">Arunika.</span>
            </Link>
            <button className="lg:hidden p-1 text-slate-400" onClick={() => setIsSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 flex-1">
            {navLinks.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center justify-between group px-3 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? "bg-slate-50 text-slate-900 font-bold"
                      : "text-slate-400 hover:bg-slate-50/50 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} className={isActive ? "text-primary" : ""} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  {item.hasChild ? (
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-400 transition-colors" />
                  ) : isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              )
            })}
            
            <Link
              href="/admin/settings"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-50/50 hover:text-slate-900 transition-all mt-4"
            >
              <Settings size={20} />
              <span className="text-sm font-medium">Settings</span>
            </Link>
          </nav>

          {/* Bottom Footer */}
          <div className="mt-auto space-y-1">
            <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-50/50 hover:text-slate-900 transition-all">
              <HelpCircle size={20} />
              <span className="text-sm font-medium">Support</span>
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-50 hover:text-red-500 transition-all"
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">Log out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 lg:h-20 bg-white/80 backdrop-blur-md sticky top-0 z-20 px-4 lg:px-8 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-4 flex-1">
            <button 
              className="lg:hidden p-2 text-slate-600 bg-slate-100 rounded-xl"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="hidden lg:flex items-center gap-4 bg-slate-100/50 px-4 py-2.5 rounded-xl transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10 border border-transparent focus-within:border-primary/10">
              <Search size={18} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent outline-none font-medium text-sm w-64 text-slate-900"
              />
            </div>
            <h1 className="lg:hidden text-base font-bold text-slate-900 truncate">
              {navLinks.find(l => l.path === pathname)?.name || "Admin"}
            </h1>
          </div>

          <div className="flex items-center gap-1 lg:gap-3 lg:pl-4">
            <button className="p-2.5 text-slate-400 hover:bg-slate-100 rounded-xl transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="hidden sm:block h-6 w-[1px] bg-slate-100 mx-2" />
            <div className="flex items-center gap-3 pl-1 lg:pl-2">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-bold text-slate-900">Admin Arunika</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Super Admin</p>
              </div>
              <div className="w-9 h-9 lg:w-11 lg:h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200 overflow-hidden shadow-inner">
                <User size={22} className="opacity-50" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-4 lg:p-8 w-full max-w-[1600px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
