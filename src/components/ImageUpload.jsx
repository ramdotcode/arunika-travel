"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { 
  Image as ImageIcon, 
  UploadCloud, 
  CheckCircle2, 
  Loader2,
  FileImage,
  RefreshCw
} from "lucide-react"

export default function ImageUpload({ value, onChange, folder = "general" }) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState(value)

  const MAX_SIZE = 2 * 1024 * 1024 // 2MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"]

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate size
    if (file.size > MAX_SIZE) {
      alert("File size too large! Maximum 2MB.")
      e.target.value = ""
      return
    }

    // Validate type
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert("Format not supported! Use JPG, PNG, or WEBP.")
      e.target.value = ""
      return
    }

    setIsUploading(true)
    
    // Create preview
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `${folder}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      onChange(publicUrl)
    } catch (error) {
      alert("Upload failed: " + error.message)
      setPreview(value)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative group overflow-hidden rounded-[2rem]">
        <div className="w-full h-52 border-2 border-dashed border-slate-100 bg-slate-50/50 flex items-center justify-center transition-all group-hover:border-primary/40 group-hover:bg-primary/5">
          {preview ? (
            <img src={preview} alt="Upload Preview" className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
          ) : (
            <div className="flex flex-col items-center justify-center text-center px-8">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-300 shadow-sm mb-4 transition-transform group-hover:scale-110 group-hover:text-primary">
                <UploadCloud size={24} />
              </div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Select Media File</p>
              <p className="text-[10px] text-slate-400 mt-1 font-medium">Max 2MB &bull; JPG, PNG, WEBP</p>
            </div>
          )}
          
          {isUploading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-md flex items-center justify-center z-10 transition-all">
              <div className="flex flex-col items-center gap-4">
                <Loader2 size={32} className="text-primary animate-spin" />
                <div className="flex flex-col items-center">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Uploading Content</p>
                  <div className="w-24 h-1 bg-primary/10 rounded-full mt-2 overflow-hidden">
                    <div className="w-1/2 h-full bg-primary animate-ping" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hover Overlay */}
          {preview && !isUploading && (
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center cursor-pointer">
              <div className="flex flex-col items-center gap-3 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                  <RefreshCw size={18} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest">Replace Texture</p>
              </div>
            </div>
          )}
        </div>
        
        <input 
          type="file" 
          accept="image/jpeg,image/png,image/webp,image/jpg"
          onChange={handleUpload}
          disabled={isUploading}
          className="absolute inset-0 opacity-0 cursor-pointer z-20"
        />
      </div>
      
      {value && !isUploading && (
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-50 shadow-sm animate-in slide-in-from-top-2 duration-300">
          <div className="p-1.5 bg-emerald-50 text-emerald-500 rounded-lg">
            <CheckCircle2 size={14} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Asset URL</p>
            <p className="text-[11px] text-slate-600 truncate font-mono mt-0.5 font-medium italic">
              {value}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
