import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-card-border">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-10 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Arunika Logo" className="h-10 w-auto" />
          <h2 className="text-xl font-bold tracking-tight text-site">Arunika</h2>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/">Home</Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/paket-tour">Paket Tour</Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/blog">Blog</Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/#testimoni">Testimoni</Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/#faq">FAQ</Link>
        </nav>
        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">chat</span>
          <span>WhatsApp Kami</span>
        </button>
      </div>
    </header>
  )
}
