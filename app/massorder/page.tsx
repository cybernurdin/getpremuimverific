'use client'

import React, { useState } from 'react'
import { useAppState } from '@/lib/store'
import { SMM_SERVICES } from '@/lib/mockData'
import confetti from 'canvas-confetti'

export default function MassOrderPage() {
  const { createSmmOrder } = useAppState()
  const [massText, setMassText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!massText.trim()) {
      alert('Please enter order details in format: service_id | link | quantity')
      return
    }

    const lines = massText.trim().split('\n')
    let successCount = 0

    lines.forEach((line) => {
      const parts = line.split('|')
      if (parts.length >= 3) {
        const srvId = parseInt(parts[0].trim(), 10)
        const link = parts[1].trim()
        const qty = parseInt(parts[2].trim(), 10)
        const srv = SMM_SERVICES.find(s => s.id === srvId)

        if (srv && link && qty > 0) {
          const cost = Math.ceil((srv.rate * qty) / 1000)
          createSmmOrder(srv.id, srv.name, srv.category, link, qty, cost)
          successCount++
        }
      }
    })

    if (successCount > 0) {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } })
      alert(`Successfully placed ${successCount} mass orders!`)
      setMassText('')
    } else {
      alert('Could not parse orders. Format should be: service_id | link | quantity')
    }
  }

  return (
    <div className="space-y-6">
      
      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 space-y-6 shadow-2xs">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-[#f8fafc] rounded-2xl border border-gray-200/80 p-4">
            <textarea
              rows={12}
              value={massText}
              onChange={(e) => setMassText(e.target.value)}
              placeholder="service_id | link | quantity"
              className="w-full bg-transparent text-gray-800 font-mono text-sm outline-none placeholder-gray-400 resize-y"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-[#ff5722] hover:bg-[#ea580c] text-white font-extrabold text-sm uppercase tracking-wider transition shadow-md flex items-center justify-center"
          >
            <span>SUBMIT</span>
          </button>
        </form>

      </div>

    </div>
  )
}
