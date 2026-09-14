'use client'

import React from 'react'
import { RefreshCw, Zap, TrendingDown } from 'lucide-react'

export default function UpdatesPage() {
  const updates = [
    { date: '2026-09-14', serviceId: 101, title: 'Instagram Followers [Real & Active]', type: 'Price Reduced', details: 'Rate reduced from $2.50 to $2.00 / 1k' },
    { date: '2026-09-13', serviceId: 301, title: 'TikTok Video Views [FYP Speed]', type: 'Speed Increased', details: 'Delivery speed boosted to 1,000,000 / hour' },
    { date: '2026-09-12', serviceId: 501, title: 'Telegram Channel Members', type: 'New Service', details: 'Added 100% Non-Drop guaranteed server pool' },
    { date: '2026-09-10', serviceId: 201, title: 'YouTube High Retention Views', type: 'Updated', details: 'Monetization compliance check updated for 2026 algorithm' }
  ]

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 space-y-6 shadow-2xs">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-[#ff5722]" />
            <span>Service Updates & Price Log</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">Real-time log of price adjustments, speed enhancements, and new service launches.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="font-bold text-gray-500 uppercase bg-[#f8fafc]">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Service ID</th>
                <th className="p-3">Service Title</th>
                <th className="p-3">Update Type</th>
                <th className="p-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
              {updates.map((u, i) => (
                <tr key={i} className="hover:bg-gray-50/80">
                  <td className="p-3 text-gray-500">{u.date}</td>
                  <td className="p-3 font-mono font-bold text-[#ea580c]">#{u.serviceId}</td>
                  <td className="p-3 font-semibold">{u.title}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-orange-100 text-[#ea580c]">
                      {u.type}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600">{u.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
