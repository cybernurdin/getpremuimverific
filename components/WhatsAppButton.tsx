'use client'

import React from 'react'
import { MessageCircle } from 'lucide-react'

export const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/237677034736"
      target="_blank"
      rel="noreferrer"
      aria-label="Contact Customer Support on WhatsApp +237 677034736"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-2xl transition hover:scale-110 active:scale-95 group"
    >
      <MessageCircle className="w-8 h-8 fill-current" />
      <span className="absolute right-16 bg-[#131f37] border border-[#1e3a8a] text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
        Need Help? Chat on WhatsApp +237 677034736
      </span>
    </a>
  )
}
