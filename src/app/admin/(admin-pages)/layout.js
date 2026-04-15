"use client"

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
  User
} from "lucide-react"

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }



  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-50 flex flex-col fixed h-full z-20">
        <div className="p-6 flex flex-col h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-10 group cursor-pointer px-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-lg shadow-slate-900/10 transition-transform group-hover:scale-105">
              <Package size={18} />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">Arunika.</span>
          </Link>

          {/* Navigation */}
          <nav className="space-y-1 flex-1">
            {[
              { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
              { name: "Projects", icon: Home, path: "/admin/homepage", hasChild: true },
              { name: "Tasks", icon: Package, path: "/admin/tours", hasChild: true },
              { name: "Team", icon: User, path: "/admin/testimonials" },
              { name: "Blog", icon: FileText, path: "/admin/blog" },
            ].map((item) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.path}
                  href={item.path}
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
      <div className="flex-1 ml-64 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white/50 backdrop-blur-sm sticky top-0 z-10 px-8 flex items-center justify-between border-b border-white/20">
          <div className="flex items-center gap-4 bg-slate-100/50 px-4 py-2 rounded-xl transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10 border border-transparent focus-within:border-primary/20">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent outline-none font-medium text-sm w-64 text-slate-900"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-all relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2" />
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-900">Admin Arunika</p>
                <p className="text-[10px] text-slate-500">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200 overflow-hidden">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
