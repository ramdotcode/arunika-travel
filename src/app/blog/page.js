import Link from 'next/link'
import CTA from '@/components/CTA'
import { supabase } from '@/lib/supabase'

export const metadata = {
  title: "Blog & Inspirasi Perjalanan - Arunika",
  description: "Dapatkan tips and trik berlibur, info destinasi terbaru, dan cerita perjalanan menarik dari tim kami.",
};

async function getPosts() {
  const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
  return data || []
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="pt-10">
      <section className="max-w-[1200px] mx-auto px-4 lg:px-10 text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-black mb-6">Blog & Inspirasi</h1>
        <p className="text-card-text max-w-2xl mx-auto text-lg">
          Temukan tips perjalanan, panduan destinasi, dan cerita menarik dari para petualang.
        </p>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 lg:px-10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              href={`/blog/${post.slug}`} 
              key={post.id} 
              className="group bg-card rounded-2xl overflow-hidden border border-card-border transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-black/5"
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={post.image_url} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-lg">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4 font-medium">
                  <span>{new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>Oleh {post.author}</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 leading-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-card-text line-clamp-3 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-primary font-bold gap-2 text-sm uppercase tracking-wider">
                  Baca Selengkapnya
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTA />
    </div>
  )
}
