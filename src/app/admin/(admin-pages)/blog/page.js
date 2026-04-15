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
  Calendar, 
  User, 
  Tag, 
  FileText,
  AlertTriangle,
  Image as ImageIcon,
  ExternalLink,
  ChevronRight
} from "lucide-react"

export default function BlogManagement() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState("add") // "add" | "edit"
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image_url: "",
    author: "Admin",
    category: "Travel Tips"
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Delete State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (err) {
      console.error("Error fetching posts:", err)
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === "title") {
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
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image_url: "",
      author: "Admin",
      category: "Travel Tips"
    })
    setIsFormOpen(true)
  }

  const openEditModal = (post) => {
    setFormMode("edit")
    setFormData({ ...post })
    setIsFormOpen(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const payload = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        image_url: formData.image_url,
        author: formData.author,
        category: formData.category
      }

      if (formMode === "add") {
        const { data, error } = await supabase.from("posts").insert([payload]).select()
        if (error) throw error
        setPosts([data[0], ...posts])
      } else {
        const { error } = await supabase.from("posts").update(payload).eq("id", formData.id)
        if (error) throw error
        setPosts(posts.map(p => p.id === formData.id ? { ...p, ...payload } : p))
      }

      setIsFormOpen(false)
    } catch (err) {
      alert("Gagal menyimpan artikel: " + err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const confirmDelete = async () => {
    if (!postToDelete) return
    setIsDeleting(true)

    try {
      const { error } = await supabase.from("posts").delete().eq("id", postToDelete.id)
      if (error) throw error
      setPosts(posts.filter(p => p.id !== postToDelete.id))
      setIsDeleteModalOpen(false)
    } catch (err) {
      alert("Gagal menghapus artikel: " + err.message)
    } finally {
      setIsDeleting(false)
      setPostToDelete(null)
    }
  }

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 italic">Journal & Insights</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Create engaging content and travel tips for your audience.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-primary hover:bg-primary/90 text-white px-5 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-primary/20 w-fit"
        >
          <Plus size={20} />
          <span>Write New Post</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-slate-50 shadow-sm">
        <div className="flex-1 min-w-0 w-full flex items-center gap-3 bg-slate-50/50 px-4 py-2 rounded-xl transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10 border border-transparent focus-within:border-primary/20">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search articles by title or tags..." 
            className="bg-transparent outline-none font-medium text-sm w-full text-slate-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">{filteredPosts.length} Articles</span>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-[2rem] border border-slate-50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/30 border-b border-slate-50">
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Article Details</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Author</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Published</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="5" className="px-8 py-10">
                      <div className="flex gap-4">
                        <div className="w-20 h-14 bg-slate-50 rounded-xl" />
                        <div className="space-y-2 flex-1">
                          <div className="h-4 bg-slate-50 rounded w-1/3" />
                          <div className="h-3 bg-slate-50 rounded w-1/4" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-300">
                      <FileText size={48} strokeWidth={1} className="mb-4" />
                      <p className="font-bold text-slate-400">No articles published yet</p>
                      <p className="text-xs mt-1">Start writing your first travel insight today.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/20 transition-all group">
                    <td className="px-8 py-5 text-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-14 rounded-xl bg-slate-100 overflow-hidden border border-slate-100/50 flex-shrink-0 relative">
                          {post.image_url ? (
                            <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <ImageIcon size={20} />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 group-hover:text-primary transition-colors truncate max-w-xs">{post.title}</p>
                          <p className="text-[10px] text-slate-400 font-medium font-mono mt-0.5 truncate max-w-xs italic opacity-70">
                            /{post.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <Tag size={12} className="text-primary/40" />
                        <span className="text-[11px] font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                          {post.category || 'Uncategorized'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 font-bold text-slate-500 text-xs">
                      {post.author}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Calendar size={14} />
                        <span className="text-[11px] font-semibold">
                          {new Date(post.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        <button 
                          onClick={() => openEditModal(post)}
                          className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => { setPostToDelete(post); setIsDeleteModalOpen(true); }}
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

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => !isSubmitting && setIsFormOpen(false)} />
          <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl overflow-hidden animate-in zoom-in slide-in-from-bottom-4 duration-500 flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 text-primary rounded-xl">
                  {formMode === "add" ? <Plus size={20} /> : <Edit2 size={20} />}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {formMode === "add" ? "Draft New Insight" : "Refinement Section"}
                  </h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Content Editor Mode</p>
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
            
            <form onSubmit={handleSave} className="p-8 overflow-y-auto custom-scrollbar space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Article Headline</label>
                  <input 
                    type="text" 
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter a captivating title..."
                    className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-2xl text-slate-900 italic"
                  />
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">URL:</span>
                      <span className="text-[10px] text-primary font-mono font-bold">arunika.com/blog/{formData.slug}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Category / Tags</label>
                    <div className="relative group">
                      <Tag size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
                      <input 
                        type="text" 
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        placeholder="e.g. Travel Destinations"
                        className="w-full pl-12 pr-6 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary outline-none transition-all font-bold text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Assigned Author</label>
                    <div className="relative group">
                      <User size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
                      <input 
                        type="text" 
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-6 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary outline-none transition-all font-bold text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                    <ImageIcon size={12} /> Main Feature Image
                  </label>
                  <div className="p-1 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                    <ImageUpload 
                      value={formData.image_url} 
                      onChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
                      folder="posts"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Search Engine Snippet (Excerpt)</label>
                  <textarea 
                    name="excerpt"
                    rows="2"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    placeholder="Short summary for SEO and previews..."
                    className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary outline-none transition-all font-medium text-slate-600 resize-none text-sm leading-relaxed"
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Dynamic Content Body</label>
                  <div className="relative group border border-slate-100 rounded-[2rem] bg-slate-50/50 p-1 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/5 transition-all">
                    <textarea 
                      name="content"
                      rows="12"
                      required
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Start telling your story..."
                      className="w-full px-6 py-5 bg-transparent outline-none font-medium text-slate-700 leading-loose resize-y min-h-[300px]"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  disabled={isSubmitting}
                  className="flex-1 px-8 py-4 rounded-2xl font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Discard Draft
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-slate-900/10 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>{formMode === "add" ? "Publish to Journal" : "Update Insight"}</span>
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
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
          <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-sm p-10 text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-[2rem] flex items-center justify-center mb-6 mx-auto transition-transform hover:rotate-12">
              <AlertTriangle size={36} strokeWidth={2.5} />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900">Unpublish Post?</h2>
            <p className="text-sm text-slate-500 font-medium mt-3 mb-8">
              Are you sure you want to remove <span className="text-slate-900 font-bold italic">"{postToDelete?.title}"</span>? This cannot be undone.
            </p>

            <div className="flex flex-col gap-3">
              <button 
                onClick={confirmDelete}
                disabled={isDeleting}
                className="w-full bg-red-500 text-white px-6 py-4 rounded-2xl font-bold shadow-lg shadow-red-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isDeleting ? "Processing..." : "Confirm Removal"}
              </button>
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeleting}
                className="w-full px-6 py-4 rounded-2xl font-bold text-slate-400 hover:text-slate-600 transition-all font-mono tracking-tighter"
              >
                ABORT_ACTION
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
