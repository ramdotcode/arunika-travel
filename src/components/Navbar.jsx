"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Paket Tour', href: '/paket-tour' },
    { name: 'Blog', href: '/blog' },
    { name: 'Testimoni', href: '/#testimoni' },
    { name: 'FAQ', href: '/#faq' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-card-border">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-10 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 lg:gap-3">
          <Image src="/logo.png" alt="Arunika Logo" width={32} height={32} className="h-8 lg:h-10 w-auto" priority />
          <h2 className="text-lg lg:text-xl font-bold tracking-tight text-site">Arunika</h2>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              className="text-sm font-medium hover:text-primary transition-colors" 
              href={link.href}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop WhatsApp Button */}
        <a 
          href="https://wa.me/628111111111"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">chat</span>
          <span>WhatsApp Kami</span>
        </a>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-site"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="material-symbols-outlined text-3xl">
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-[100%] left-0 w-full bg-card border-b border-card-border shadow-2xl p-6 space-y-6 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                className="text-lg font-bold text-site hover:text-primary transition-colors" 
                href={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-card-border">
            <a 
              href="https://wa.me/628111111111"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-primary text-white px-6 py-4 rounded-2xl text-base font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
            >
              <span className="material-symbols-outlined">chat</span>
              Hubungi WhatsApp Kami
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
