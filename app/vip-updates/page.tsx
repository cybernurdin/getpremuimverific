'use client'

import React from 'react'
import { Star, Crown } from 'lucide-react'

export default function VipUpdatesPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 space-y-6 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">VIP Exclusive Updates</h1>
            <p className="text-xs text-gray-500">Exclusive high-volume reseller rates and custom server node access.</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-gray-800 space-y-3">
          <div className="font-extrabold text-amber-800 text-sm">VIP Reseller Benefits Active</div>
          <ul className="space-y-2 list-disc list-inside text-gray-700">
            <li>Dedicated High-Speed Server API Endpoint with zero latency</li>
            <li>Custom Discount Tier (Up to 35% discount on bulk orders)</li>
            <li>Priority Ticket Resolution within 5 minutes</li>
            <li>Direct WhatsApp VIP Manager Contact</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
