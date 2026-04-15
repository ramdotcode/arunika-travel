"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Jangan catat statistik jika di halaman admin
    if (pathname.startsWith('/admin')) return

    const trackView = async () => {
      try {
        await supabase.from('page_views').insert([
          { 
            path: pathname,
            user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown'
          }
        ])
      } catch (error) {
        console.error('Error tracking analytics:', error)
      }
    }

    trackView()
  }, [pathname])

  return null
}
