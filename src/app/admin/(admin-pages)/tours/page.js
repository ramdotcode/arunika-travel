"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import ImageUpload from "@/components/ImageUpload"
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  Clock, 
  Users, 
  Globe, 
  MapPin,
  MoreVertical,
  CheckCircle2,
  AlertTriangle,
  Image as ImageIcon
} from "lucide-react"

export default function ToursManagement() {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  
  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState("add") // "add" | "edit"
  const [availableCategories, setAvailableCategories] = useState(["Domestik", "Internasional"])
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false)
  const [newCategory, setNewCategory] = useState("")
  
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    slug: "",
    category: "Domestik",
    price: "",
    duration: "",
    description: "",
    image_url: "",
    badge: "",
    remaining_slots: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Delete State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [tourToDelete, setTourToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

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
      
      const categories = [...new Set((data || []).map(t => t.category))]
      if (categories.length > 0) {
        setAvailableCategories(categories.sort())
      }
    } catch (err) {
      console.error("Error fetching tours:", err)
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === "name") {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        slug: generateSlug(value)
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const openAddModal = () => {
    setFormMode("add")
    setFormData({
      id: "",
      name: "",
      slug: "",
      category: "Domestik",
      price: "",
      duration: "",
      description: "",
      image_url: "",
      badge: "",
      remaining_slots: ""
    })
    setIsAddingNewCategory(false)
    setNewCategory("")
    setIsFormOpen(true)
  }

  const openEditModal = (tour) => {
    setFormMode("edit")
    setFormData({
      ...tour,
      price: tour.price.toString(),
      remaining_slots: tour.remaining_slots?.toString() || ""
    })
    setIsAddingNewCategory(false)
    setNewCategory("")
    setIsFormOpen(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const finalCategory = isAddingNewCategory ? newCategory : formData.category
      
      const payload = {
        name: formData.name,
        slug: formData.slug,
        category: finalCategory,
        price: parseFloat(formData.price),
        duration: formData.duration,
        description: formData.description,
        image_url: formData.image_url,
        badge: formData.badge,
        remaining_slots: formData.remaining_slots ? parseInt(formData.remaining_slots) : null
      }

      if (formMode === "add") {
        const { data, error } = await supabase.from("tours").insert([payload]).select()
        if (error) throw error
        setTours([data[0], ...tours])
      } else {
        const { error } = await supabase.from("tours").update(payload).eq("id", formData.id)
        if (error) throw error
        setTours(tours.map(t => t.id === formData.id ? { ...t, ...payload } : t))
      }

      setIsFormOpen(false)
    } catch (err) {
      alert("Gagal menyimpan paket: " + err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const confirmDelete = async () => {
    if (!tourToDelete) return
    setIsDeleting(true)

    try {
      const { error } = await supabase.from("tours").delete().eq("id", tourToDelete.id)
      if (error) throw error
      setTours(tours.filter(t => t.id !== tourToDelete.id))
      setIsDeleteModalOpen(false)
    } catch (err) {
      alert("Gagal menghapus paket: " + err.message)
    } finally {
      setIsDeleting(false)
      setTourToDelete(null)
    }
  }

  const filteredTours = tours.filter(tour => 
    tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 lg:space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 italic">Tour Management</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Create and manage your travel packages efficiently.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-primary hover:bg-primary/90 text-white px-5 lg:px-6 py-3.5 lg:py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 w-fit self-start lg:self-auto"
        >
          <Plus size={20} />
          <span>New Tour Package</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-3 lg:p-4 rounded-2xl border border-slate-50 shadow-sm">
        <div className="flex-1 min-w-0 w-full flex items-center gap-3 bg-slate-50/50 px-4 py-2.5 rounded-xl transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10 border border-transparent focus-within:border-primary/20">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name or category..." 
            className="bg-transparent outline-none font-medium text-sm w-full text-slate-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">{filteredTours.length} Packages</span>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-[2rem] border border-slate-50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/30 border-b border-slate-50">
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Package Details</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Duration</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pricing</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Availability</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="6" className="px-8 py-10">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl" />
                        <div className="space-y-2 flex-1">
                          <div className="h-4 bg-slate-50 rounded w-1/4" />
                          <div className="h-3 bg-slate-50 rounded w-1/6" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : filteredTours.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-300">
                      <ImageIcon size={48} strokeWidth={1} className="mb-4" />
                      <p className="font-bold text-slate-400">No packages found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTours.map((tour) => (
                  <tr key={tour.id} className="hover:bg-slate-50/20 transition-all group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden border border-slate-100/50 flex-shrink-0 relative">
                          {tour.image_url ? (
                            <img src={tour.image_url} alt={tour.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <ImageIcon size={24} />
                            </div>
                          )}
                          {tour.badge && (
                            <div className="absolute top-1 left-1 bg-primary text-white text-[8px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-tighter">
                              {tour.badge}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 group-hover:text-primary transition-colors truncate">{tour.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium font-mono mt-0.5">{tour.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        {tour.category === "Internasional" ? (
                          <Globe size={14} className="text-indigo-400" />
                        ) : (
                          <MapPin size={14} className="text-emerald-400" />
                        )}
                        <span className="text-xs font-bold text-slate-600">{tour.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Clock size={14} />
                        <span className="text-xs font-semibold">{tour.duration}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-bold text-slate-900">
                        Rp {new Intl.NumberFormat('id-ID').format(tour.price)}
                      </p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${tour.remaining_slots === 0 ? 'bg-red-400' : 'bg-emerald-400'}`} />
                        <span className="text-xs font-bold text-slate-600">
                          {tour.remaining_slots ? `${tour.remaining_slots} Slots` : 'Unlimited'}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(tour)}
                          className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => { setTourToDelete(tour); setIsDeleteModalOpen(true); }}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 size={16} />
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

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-slate-50 animate-pulse space-y-4">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-slate-50 rounded-xl" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-slate-50 rounded w-3/4" />
                  <div className="h-3 bg-slate-50 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))
        ) : filteredTours.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl border border-slate-50 text-center text-slate-300">
            <ImageIcon size={48} className="mx-auto mb-2 opacity-20" />
            <p className="font-bold">No packages found</p>
          </div>
        ) : (
          filteredTours.map((tour) => (
            <div key={tour.id} className="bg-white p-4 rounded-2xl border border-slate-50 shadow-sm flex flex-col gap-4 group active:scale-[0.98] transition-all">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0 relative">
                  {tour.image_url ? (
                    <img src={tour.image_url} alt={tour.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <ImageIcon size={20} />
                    </div>
                  )}
                  {tour.badge && (
                    <div className="absolute top-1 left-1 bg-primary text-white text-[7px] font-black px-1 py-0.5 rounded-sm uppercase">
                      {tour.badge}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1 flex flex-col justify-center">
                  <h3 className="font-bold text-slate-900 text-sm truncate">{tour.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tour.category}</span>
                    <span className="text-[10px] text-slate-300">•</span>
                    <span className="text-[10px] font-bold text-primary italic">{tour.duration}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <button onClick={() => openEditModal(tour)} className="p-2 text-slate-400 active:text-blue-500">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => { setTourToDelete(tour); setIsDeleteModalOpen(true); }} className="p-2 text-slate-400 active:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold text-slate-400 uppercase">Pricing</span>
                  <p className="text-sm font-black text-slate-900">Rp {new Intl.NumberFormat('id-ID').format(tour.price)}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[8px] font-bold text-slate-400 uppercase">Availability</span>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${tour.remaining_slots === 0 ? 'bg-red-400' : 'bg-emerald-400'}`} />
                    <span className="text-xs font-bold text-slate-700">{tour.remaining_slots ? `${tour.remaining_slots} Slots` : 'Unlimited'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 lg:p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => !isSubmitting && setIsFormOpen(false)} />
          <div className="relative bg-white rounded-3xl lg:rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in slide-in-from-bottom-4 duration-500 max-h-[95vh] flex flex-col">
            <div className="p-6 lg:p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 text-primary rounded-xl">
                  {formMode === "add" ? <Plus size={20} /> : <Edit2 size={20} />}
                </div>
                <div>
                  <h2 className="text-lg lg:text-xl font-bold text-slate-900">
                    {formMode === "add" ? "Create New Package" : "Edit Tour Details"}
                  </h2>
                  <p className="hidden sm:block text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Configuration Panel</p>
                </div>
              </div>
              <button 
                onClick={() => setIsFormOpen(false)}
                className="p-2 hover:bg-white rounded-full transition-all text-slate-400 hover:text-slate-900 shadow-sm border border-transparent hover:border-slate-100"
                disabled={isSubmitting}
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 lg:p-8 overflow-y-auto custom-scrollbar flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                <div className="space-y-6 md:col-span-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Package Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter tour name..."
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-slate-900 text-sm lg:text-base"
                    />
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Permalink:</span>
                      <span className="text-[10px] text-primary font-mono font-bold truncate max-w-[200px] sm:max-w-none">arunika.com/tour/{formData.slug}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</label>
                    <button 
                      type="button"
                      onClick={() => setIsAddingNewCategory(!isAddingNewCategory)}
                      className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest"
                    >
                      {isAddingNewCategory ? "Cancel" : "+ Custom"}
                    </button>
                  </div>
                  
                  {isAddingNewCategory ? (
                    <input 
                      type="text"
                      required
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="New category name..."
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary outline-none transition-all font-bold text-slate-900"
                    />
                  ) : (
                    <div className="relative">
                      <select 
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary outline-none transition-all font-bold text-slate-900 appearance-none cursor-pointer pr-10"
                      >
                        {availableCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <ChevronRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 rotate-90" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Price (IDR)</label>
                  <input 
                    type="number" 
                    name="price"
                    required
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g. 5000000"
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary outline-none transition-all font-bold text-slate-900"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Duration</label>
                  <div className="relative">
                    <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      name="duration"
                      required
                      value={formData.duration}
                      onChange={handleInputChange}
                      placeholder="e.g. 3D2N"
                      className="w-full pl-11 pr-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary outline-none transition-all font-bold text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Badge (Optional)</label>
                  <input 
                    type="text" 
                    name="badge"
                    value={formData.badge}
                    onChange={handleInputChange}
                    placeholder="e.g. Best Seller"
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary outline-none transition-all font-bold text-slate-900"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                    <ImageIcon size={12} /> Cover Image
                  </label>
                  <div className="p-1 bg-slate-50 rounded-2xl lg:rounded-[2.5rem] border border-slate-100">
                    <ImageUpload 
                      value={formData.image_url} 
                      onChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
                      folder="tours"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                    <Users size={12} /> Slots
                  </label>
                  <input 
                    type="number" 
                    name="remaining_slots"
                    value={formData.remaining_slots}
                    onChange={handleInputChange}
                    placeholder="Unlimited"
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary outline-none transition-all font-bold text-slate-900"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Short Description</label>
                  <textarea 
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="What's included in this trip?"
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary outline-none transition-all font-medium text-slate-600 resize-none text-sm"
                  ></textarea>
                </div>
              </div>

              <div className="mt-8 lg:mt-10 flex flex-col sm:flex-row gap-3 lg:gap-4">
                <button 
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  disabled={isSubmitting}
                  className="order-2 sm:order-1 flex-1 px-8 py-4 rounded-2xl font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all border border-transparent"
                >
                  Discard
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="order-1 sm:order-2 flex-[2] bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-slate-900/10 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Save Tour Package</span>
                  )}
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
          <div className="relative bg-white rounded-3xl lg:rounded-[2.5rem] shadow-2xl w-full max-w-sm p-8 lg:p-10 text-center animate-in zoom-in duration-300">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-red-50 text-red-500 rounded-2xl lg:rounded-[2rem] flex items-center justify-center mb-6 mx-auto">
              <AlertTriangle size={36} strokeWidth={2.5} />
            </div>
            
            <h2 className="text-xl lg:text-2xl font-bold text-slate-900">Delete Package?</h2>
            <p className="text-sm text-slate-500 font-medium mt-3 mb-8 px-2 leading-relaxed">
              Are you sure you want to delete <span className="text-slate-900 font-bold italic">"{tourToDelete?.name}"</span>? This action is permanent.
            </p>

            <div className="flex flex-col gap-3">
              <button 
                onClick={confirmDelete}
                disabled={isDeleting}
                className="w-full bg-red-500 text-white px-6 py-4 rounded-2xl font-bold shadow-lg shadow-red-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  "Yes, Delete Forever"
                )}
              </button>
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeleting}
                className="w-full px-6 py-4 rounded-2xl font-bold text-slate-400 hover:text-slate-600 transition-all text-sm"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
