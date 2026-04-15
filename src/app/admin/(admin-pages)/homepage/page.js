"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import ImageUpload from "@/components/ImageUpload"
import { 
  Save, 
  Layout, 
  MousePointer2, 
  Type, 
  Image as ImageIcon, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react"

export default function HomepageManagement() {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", "homepage")
        .single()

      if (error && error.code !== 'PGRST116') throw error
      
      setSettings(data?.content || {
        hero: { title_main: "", title_accent: "", description: "", image_url: "", primary_btn: "", secondary_btn: "" },
        cta: { title: "", description: "", button_text: "" }
      })
    } catch (err) {
      console.error("Error fetching settings:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e) => {
    if (e) e.preventDefault()
    setIsSaving(true)

    try {
      const { error } = await supabase
        .from("site_settings")
        .upsert({ id: "homepage", content: settings, updated_at: new Date() })

      if (error) throw error
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } catch (err) {
      alert("Gagal menyimpan: " + err.message)
    } finally {
      setIsSaving(false)
    }
  }

  const updateHero = (field, value) => {
    setSettings(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }))
  }

  const updateCTA = (field, value) => {
    setSettings(prev => ({
      ...prev,
      cta: { ...prev.cta, [field]: value }
    }))
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 text-slate-300">
      <div className="w-10 h-10 border-4 border-slate-100 border-t-primary rounded-full animate-spin mb-4" />
      <p className="text-sm font-bold">Loading Projects...</p>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between sticky top-20 z-10 bg-[#f8f9fb]/80 backdrop-blur-md py-4 border-b border-transparent">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 italic">Project Settings</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Configure your main website experience and sections.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <Save size={18} />
          )}
          <span>{isSaving ? "Saving..." : "Save Changes"}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-10">
        {/* HERO SECTION */}
        <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
                <Layout size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Hero Section</h2>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Main Header</span>
          </div>

          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                    <Type size={12} /> Main Title
                  </label>
                  <input 
                    type="text" 
                    value={settings.hero.title_main}
                    onChange={(e) => updateHero("title_main", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-semibold text-slate-900"
                    placeholder="e.g. Explore Indonesia"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                    <Sparkles size={12} /> Accent Title
                  </label>
                  <input 
                    type="text" 
                    value={settings.hero.title_accent}
                    onChange={(e) => updateHero("title_accent", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-semibold italic text-primary"
                    placeholder="e.g. More Meaningful"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                    <AlertCircle size={12} /> Description
                  </label>
                  <textarea 
                    rows="3"
                    value={settings.hero.description}
                    onChange={(e) => updateHero("description", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-slate-600 resize-none text-sm"
                    placeholder="Describe your brand..."
                  ></textarea>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                    <ImageIcon size={12} /> Hero Image
                  </label>
                  <div className="p-1 bg-slate-50 rounded-[2rem] border border-slate-100">
                    <ImageUpload 
                      value={settings.hero.image_url}
                      onChange={(url) => updateHero("image_url", url)}
                      folder="site"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                      <MousePointer2 size={12} /> Primary Btn
                    </label>
                    <input 
                      type="text" 
                      value={settings.hero.primary_btn}
                      onChange={(e) => updateHero("primary_btn", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary outline-none transition-all text-xs font-bold text-slate-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                      Secondary Btn
                    </label>
                    <input 
                      type="text" 
                      value={settings.hero.secondary_btn}
                      onChange={(e) => updateHero("secondary_btn", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary outline-none transition-all text-xs font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-500 rounded-xl">
                <ArrowRight size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">CTA Section</h2>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bottom Banner</span>
          </div>

          <div className="p-8 space-y-6 max-w-2xl mx-auto text-center">
            <div className="space-y-4">
              <div className="space-y-2">
                <input 
                  type="text" 
                  value={settings.cta.title}
                  onChange={(e) => updateCTA("title", e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl border-none bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-xl text-center text-slate-900"
                  placeholder="Catchy CTA Title"
                />
              </div>

              <div className="space-y-2">
                <textarea 
                  rows="2"
                  value={settings.cta.description}
                  onChange={(e) => updateCTA("description", e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl border-none bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium resize-none text-sm text-center text-slate-500"
                  placeholder="Tell them why they should act now..."
                ></textarea>
              </div>

              <div className="flex justify-center pt-2">
                <div className="relative group">
                  <input 
                    type="text" 
                    value={settings.cta.button_text}
                    onChange={(e) => updateCTA("button_text", e.target.value)}
                    className="px-8 py-3 rounded-xl bg-slate-100 group-focus-within:bg-primary group-focus-within:text-white outline-none transition-all font-bold text-sm text-slate-900 text-center w-64 border border-slate-200"
                    placeholder="Button Text"
                  />
                  {!settings.cta.button_text && <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-400 text-xs font-bold">Button CTA</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Success Toast Placeholder */}
      <div className={`fixed bottom-10 right-10 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 transition-all transform ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
          <CheckCircle2 size={16} />
        </div>
        <div>
          <p className="text-sm font-bold">Changes Saved</p>
          <p className="text-[10px] text-slate-400 font-medium">Your homepage has been updated.</p>
        </div>
      </div>
    </div>
  )
}
