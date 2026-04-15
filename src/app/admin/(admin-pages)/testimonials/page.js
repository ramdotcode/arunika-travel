"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { 
  Plus, 
  Star, 
  MapPin, 
  Quote, 
  Edit2, 
  Trash2, 
  X, 
  User, 
  Calendar,
  AlertTriangle,
  MessageSquare
} from "lucide-react"

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState("add") // "add" | "edit"
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    location: "",
    content: "",
    avatar_url: "",
    rating: 5
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Delete State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [testimonialToDelete, setTestimonialToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === "rating" ? parseInt(value) : value 
    }))
  }

  const openAddModal = () => {
    setFormMode("add")
    setFormData({
      id: "",
      name: "",
      location: "",
      content: "",
      avatar_url: "",
      rating: 5
    })
    setIsFormOpen(true)
  }

  const openEditModal = (item) => {
    setFormMode("edit")
    setFormData({ ...item })
    setIsFormOpen(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const payload = {
        name: formData.name,
        location: formData.location,
        content: formData.content,
        avatar_url: formData.avatar_url,
        rating: formData.rating
      }

      if (formMode === "add") {
        const { data, error } = await supabase.from("testimonials").insert([payload]).select()
        if (error) throw error
        setTestimonials([data[0], ...testimonials])
      } else {
        const { error } = await supabase.from("testimonials").update(payload).eq("id", formData.id)
        if (error) throw error
        setTestimonials(testimonials.map(t => t.id === formData.id ? { ...t, ...payload } : t))
      }

      setIsFormOpen(false)
    } catch (err) {
      alert("Gagal menyimpan testimoni: " + err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const confirmDelete = async () => {
    if (!testimonialToDelete) return
    setIsDeleting(true)

    try {
      const { error } = await supabase.from("testimonials").delete().eq("id", testimonialToDelete.id)
      if (error) throw error
      setTestimonials(testimonials.filter(t => t.id !== testimonialToDelete.id))
      setIsDeleteModalOpen(false)
    } catch (err) {
      alert("Gagal menghapus testimoni: " + err.message)
    } finally {
      setIsDeleting(false)
      setTestimonialToDelete(null)
    }
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 italic">User Feedback</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Manage client testimonials and team reviews.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-primary hover:bg-primary/90 text-white px-5 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-primary/20 w-fit"
        >
          <Plus size={20} />
          <span>Add New Review</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-64 bg-white rounded-[2rem] border border-slate-100 animate-pulse" />
          ))
        ) : testimonials.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-200">
            <div className="flex flex-col items-center justify-center text-slate-300">
              <MessageSquare size={48} strokeWidth={1} className="mb-4" />
              <p className="font-bold text-slate-400">No testimonials yet</p>
              <p className="text-xs mt-1">Start by adding your first client review.</p>
            </div>
          </div>
        ) : (
          testimonials.map((item) => (
            <div key={item.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm flex flex-col group relative transition-all hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
              <div className="absolute top-8 right-8 text-slate-50 group-hover:text-primary/10 transition-colors">
                <Quote size={40} />
              </div>

              <div className="flex items-center gap-4 mb-6 relative">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden border border-slate-100/50 flex-shrink-0">
                  {item.avatar_url ? (
                    <img src={item.avatar_url} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <User size={20} />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 leading-tight truncate">{item.name}</p>
                  <div className="flex items-center gap-1 text-slate-400 mt-1">
                    <MapPin size={10} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{item.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    className={i < (item.rating || 5) ? "fill-orange-400 text-orange-400" : "text-slate-100"} 
                  />
                ))}
              </div>

              <p className="text-slate-600 text-sm font-medium leading-relaxed italic flex-1">
                "{item.content}"
              </p>

              <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-widest font-mono">
                    {new Date(item.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => openEditModal(item)}
                    className="w-8 h-8 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-blue-50 hover:text-blue-500 transition-all"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button 
                    onClick={() => { setTestimonialToDelete(item); setIsDeleteModalOpen(true); }}
                    className="w-8 h-8 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => !isSubmitting && setIsFormOpen(false)} />
          <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in slide-in-from-bottom-4 duration-500">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 text-primary rounded-xl">
                  {formMode === "add" ? <Plus size={20} /> : <Edit2 size={20} />}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {formMode === "add" ? "Write New Review" : "Edit Experience"}
                  </h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Integration Panel</p>
                </div>
              </div>
              <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-white rounded-full transition-all text-slate-400 hover:text-slate-900 shadow-sm border border-transparent hover:border-slate-100">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Customer Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. John Doe"
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-slate-900"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Location / Context</label>
                  <input 
                    type="text" 
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Jakarta"
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary outline-none transition-all font-bold text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-2 text-center">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Rating</label>
                <div className="flex justify-center gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        formData.rating >= star ? 'bg-orange-400 text-white shadow-lg shadow-orange-100' : 'bg-slate-50 text-slate-200'
                      }`}
                    >
                      <Star size={20} fill={formData.rating >= star ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Profile Photo URL</label>
                <input 
                  type="text" 
                  name="avatar_url"
                  value={formData.avatar_url}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary outline-none transition-all font-bold text-slate-900"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Full Review</label>
                <textarea 
                  name="content"
                  rows="4"
                  required
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Share the customer's amazing experience..."
                  className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary outline-none transition-all font-medium text-slate-600 resize-none text-sm"
                ></textarea>
              </div>

              <div className="mt-8 flex gap-3">
                <button type="button" onClick={() => setIsFormOpen(false)} className="flex-1 px-8 py-4 rounded-2xl font-bold text-slate-400 hover:text-slate-600 transition-all">
                  Discard
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-slate-900/10 hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Publish Feedback"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => !isDeleting && setIsDeleteModalOpen(false)} />
          <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-sm p-10 text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-[2rem] flex items-center justify-center mb-6 mx-auto">
              <AlertTriangle size={36} strokeWidth={2.5} />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900">Remove Review?</h2>
            <p className="text-sm text-slate-500 font-medium mt-3 mb-8">
              Deleting feedback from <span className="text-slate-900 font-bold">{testimonialToDelete?.name}</span> cannot be undone.
            </p>

            <div className="flex flex-col gap-3">
              <button 
                onClick={confirmDelete}
                disabled={isDeleting}
                className="w-full bg-red-500 text-white px-6 py-4 rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isDeleting ? "Removing..." : "Delete Forever"}
              </button>
              <button onClick={() => setIsDeleteModalOpen(false)} className="w-full px-6 py-4 rounded-2xl font-bold text-slate-400 hover:text-slate-600 transition-all">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
