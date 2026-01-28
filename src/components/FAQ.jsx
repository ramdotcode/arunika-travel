"use client"

import { useState } from 'react'

export default function FAQ({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="max-w-[1200px] mx-auto px-4 lg:px-10 py-20 w-full" id="faq">
      <h2 className="text-3xl font-bold text-center mb-12">Pertanyaan Populer (FAQ)</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i
          return (
            <div key={faq.id} className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-primary shadow-lg shadow-primary/5 bg-card' : 'border-card-border bg-card'}`}>
              <button 
                className="w-full px-6 py-5 flex items-center justify-between text-left font-bold transition-colors hover:text-primary"
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <span className="text-lg">{faq.question}</span>
                <span className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-gray-400'}`}>
                  expand_more
                </span>
              </button>
              <div 
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 text-card-text leading-relaxed border-t border-card-border/50 pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
