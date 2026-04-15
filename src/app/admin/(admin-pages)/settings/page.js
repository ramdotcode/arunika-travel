"use client"

import { useState } from "react"
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Moon, 
  Globe, 
  Database, 
  Palette,
  ChevronRight,
  Save,
  Mail,
  Lock
} from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1500)
  }

  const tabs = [
    { id: "general", name: "General", icon: Settings },
    { id: "profile", name: "Admin Profile", icon: User },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "security", name: "Security", icon: Shield },
    { id: "appearance", name: "Appearance", icon: Palette },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 italic">System Settings</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Configure your administrative environment and preferences.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-slate-900/10 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save size={18} />
          )}
          <span>{isSaving ? "Saving..." : "Save Changes"}</span>
        </button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Tabs */}
        <div className="w-64 space-y-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${
                  isActive 
                    ? "bg-white text-slate-900 shadow-sm border border-slate-50 font-bold" 
                    : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon size={18} className={isActive ? "text-primary" : ""} />
                  <span className="text-sm">{tab.name}</span>
                </div>
                {isActive && <ChevronRight size={14} className="text-slate-300" />}
              </button>
            )
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-sm p-10">
            {activeTab === "general" && (
              <div className="space-y-8">
                <section className="space-y-4">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Website Identity</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 ml-1">Site Title</label>
                      <input 
                        type="text" 
                        defaultValue="Arunika Travel"
                        className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary outline-none transition-all font-bold text-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 ml-1">Site Slogan</label>
                      <input 
                        type="text" 
                        defaultValue="Explore the world together"
                        className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary outline-none transition-all font-bold text-slate-900"
                      />
                    </div>
                  </div>
                </section>

                <section className="space-y-4 pt-4">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Engine Configuration</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-white rounded-xl text-slate-400">
                          <Globe size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">Maintenance Mode</p>
                          <p className="text-[10px] text-slate-500 font-medium">Temporarily disable the public website</p>
                        </div>
                      </div>
                      <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer group">
                        <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all group-hover:scale-110 shadow-sm" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-white rounded-xl text-slate-400">
                          <Database size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">Automatic Backups</p>
                          <p className="text-[10px] text-slate-500 font-medium">Daily database snapshots to cloud storage</p>
                        </div>
                      </div>
                      <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                        <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-8">
                <div className="flex items-center gap-8 pb-8 border-b border-slate-50">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-[2rem] bg-slate-100 overflow-hidden border-2 border-white shadow-xl">
                      <img src="https://ui-avatars.com/api/?name=Admin&background=1754cf&color=fff" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                      <ImageIcon size={14} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">Arunika SuperAdmin</h4>
                    <p className="text-sm text-slate-500 font-medium">superadmin@arunika.com</p>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-primary/10 text-primary rounded-lg mt-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Verified Operator</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Display Name</label>
                    <div className="relative group">
                      <User size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
                      <input 
                        type="text" 
                        defaultValue="Arunika Admin"
                        className="w-full pl-12 pr-6 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary outline-none transition-all font-bold text-slate-900"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Email Identifier</label>
                    <div className="relative group">
                      <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
                      <input 
                        type="email" 
                        defaultValue="admin@arunika.com"
                        className="w-full pl-12 pr-6 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary outline-none transition-all font-bold text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Security Credentials</h4>
                  <button className="flex items-center gap-3 px-6 py-4 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-100 transition-all group">
                    <Lock size={18} className="text-slate-400 group-hover:text-primary transition-colors" />
                    <span className="text-sm font-bold text-slate-700">Change Authentication Password</span>
                    <ChevronRight size={16} className="ml-auto text-slate-300" />
                  </button>
                </div>
              </div>
            )}

            {/* Placeholder for other tabs */}
            {(activeTab === "notifications" || activeTab === "security" || activeTab === "appearance") && (
              <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
                <div className="p-6 bg-slate-50 rounded-[2.5rem] mb-6">
                  <Database size={48} className="text-slate-200" strokeWidth={1} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 italic">Module under encryption</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Access restricted in development build</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
