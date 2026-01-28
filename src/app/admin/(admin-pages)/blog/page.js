"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function BlogManagement() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

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

  const handleDelete = async (id) => {
    if (!confirm("Hapus artikel ini selamanya?")) return

    try {
      const { error } = await supabase.from("posts").delete().eq("id", id)
      if (error) throw error
      setPosts(posts.filter(p => p.id !== id))
    } catch (err) {
      alert("Gagal menghapus: " + err.message)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-site text-gray-800">Artikel Blog</h1>
          <p className="text-gray-500 font-medium mt-1">Tulis dan terbitkan tips perjalanan untuk pengunjung.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-2">
          <span className="material-symbols-outlined">edit_square</span>
          Tulis Artikel Baru
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-card-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-card-border">
                <th className="px-6 py-5 text-sm font-black text-gray-400 uppercase tracking-widest">Judul Artikel</th>
                <th className="px-6 py-5 text-sm font-black text-gray-400 uppercase tracking-widest">Kategori</th>
                <th className="px-6 py-5 text-sm font-black text-gray-400 uppercase tracking-widest">Penulis</th>
                <th className="px-6 py-5 text-sm font-black text-gray-400 uppercase tracking-widest">Tanggal Publish</th>
                <th className="px-6 py-5 text-sm font-black text-gray-400 uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="5" className="px-6 py-8"><div className="h-4 bg-gray-100 rounded w-1/3"></div></td>
                  </tr>
                ))
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center text-gray-400 font-medium">Belum ada artikel.</td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-card-border">
                          {post.image_url && <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />}
                        </div>
                        <div>
                          <p className="font-bold text-site max-w-sm truncate">{post.title}</p>
                          <p className="text-[10px] text-gray-400 font-mono mt-0.5">{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-[10px] font-black uppercase tracking-wider">
                        {post.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-bold text-gray-500 text-sm">
                      {post.author}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-400 font-medium">
                      {new Date(post.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><span className="material-symbols-outlined">edit</span></button>
                        <button onClick={() => handleDelete(post.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><span className="material-symbols-outlined">delete</span></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
