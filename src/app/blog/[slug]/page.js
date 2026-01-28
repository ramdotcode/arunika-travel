import Link from 'next/link'
import CTA from '@/components/CTA'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const { data: post } = await supabase.from('posts').select('*').eq('slug', slug).single()
  
  if (!post) return { title: 'Artikel Tidak Ditemukan' }
  
  return {
    title: `${post.title} - Blog Arunika`,
    description: post.excerpt,
  }
}

export default async function BlogPostDetail({ params }) {
  const { slug } = await params
  const { data: post } = await supabase.from('posts').select('*').eq('slug', slug).single()

  if (!post) {
    notFound()
  }

  return (
    <div className="bg-[#f6f6f8] min-h-screen">
      <section className="max-w-[900px] mx-auto px-4 py-20">
        <Link href="/blog" className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-12 font-medium">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Kembali ke Blog
        </Link>

        {/* Header */}
        <div className="mb-12 text-center space-y-6">
          <span className="bg-primary/10 text-primary text-xs font-black px-4 py-2 rounded-full uppercase tracking-[0.2em]">
            {post.category}
          </span>
          <h1 className="text-4xl lg:text-6xl font-black leading-tight text-site">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base">person</span>
              {post.author}
            </div>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base">calendar_month</span>
              {new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden mb-16 shadow-2xl shadow-black/10 aspect-video">
          <img 
            src={post.image_url} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <article className="prose prose-lg max-w-none prose-slate prose-headings:font-black prose-headings:text-site prose-p:text-card-text prose-p:leading-relaxed">
          <div className="bg-white p-10 lg:p-16 rounded-3xl border border-card-border shadow-sm">
            {/* Split content by newlines to simulate paragraphs if content is raw text */}
            {post.content.split('\n').map((para, i) => (
              para && <p key={i} className="mb-6">{para}</p>
            ))}
            
            <div className="mt-16 pt-10 border-t border-card-border flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="font-bold">Bagikan:</span>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                    <span className="material-symbols-outlined text-sm">share</span>
                  </button>
                </div>
              </div>
              <Link href="/paket-tour" className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                Cek Paket Liburan
              </Link>
            </div>
          </div>
        </article>
      </section>

      <CTA />
    </div>
  )
}
