'use client'

import React, { useState } from 'react'
import { SMM_CATEGORIES, SMM_SERVICES, SmmServiceItem } from '@/lib/mockData'
import { Search, Star, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDetailService, setSelectedDetailService] = useState<SmmServiceItem | null>(null)

  const servicesDisplay = SMM_SERVICES.filter(s => {
    const matchCat = selectedCategory === 'All' || s.category === selectedCategory
    const matchQuery = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || String(s.id).includes(searchQuery)
    return matchCat && matchQuery
  })

  // Group services by category for category header rows (like `* CoinMarketCap` in Screenshot 2)
  const categoriesPresent = Array.from(new Set(servicesDisplay.map(s => s.category)))

  return (
    <div className="space-y-6">
      
      {/* Top Filter & Search Bar (Exact JAP layout Screenshot 2) */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl py-2 px-4 text-xs text-gray-800 outline-none focus:border-[#ff5722]"
          />
        </div>

        {/* Category Select */}
        <div className="w-full md:w-64">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl py-2 px-4 text-xs font-semibold text-gray-800 outline-none"
          >
            <option value="All">All Categories</option>
            {SMM_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Services Data Table (Exact JAP layout Screenshot 2) */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="font-bold text-gray-500 uppercase bg-[#f8fafc] border-b border-gray-200/80">
              <tr>
                <th className="p-3.5">ID</th>
                <th className="p-3.5">Service</th>
                <th className="p-3.5">Rate/1000</th>
                <th className="p-3.5">Min</th>
                <th className="p-3.5">Max</th>
                <th className="p-3.5">Average time</th>
                <th className="p-3.5 text-center">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
              {categoriesPresent.map((categoryName) => {
                const catServices = servicesDisplay.filter(s => s.category === categoryName)
                return (
                  <React.Fragment key={categoryName}>
                    
                    {/* Category Header Row (Exact match to JAP screenshot `* CoinMarketCap` style) */}
                    <tr className="bg-[#f0f7ff] border-y border-blue-100">
                      <td colSpan={7} className="p-3 font-bold text-[#2563eb] text-center text-xs">
                        * {categoryName}
                      </td>
                    </tr>

                    {/* Services in category */}
                    {catServices.map((service) => (
                      <tr key={service.id} className="hover:bg-gray-50/80 transition">
                        {/* ID */}
                        <td className="p-3.5 font-bold font-mono text-gray-900 flex items-center gap-2">
                          <Star className="w-3.5 h-3.5 text-gray-400 hover:text-amber-500 cursor-pointer" />
                          <span>{service.id}</span>
                        </td>

                        {/* Service Title */}
                        <td className="p-3.5 max-w-md font-semibold text-gray-800 leading-relaxed">
                          {service.name}
                        </td>

                        {/* Rate / 1000 */}
                        <td className="p-3.5 font-bold font-mono text-[#ea580c]">
                          ${(service.rate / 600).toFixed(4)}
                        </td>

                        {/* Min */}
                        <td className="p-3.5 font-mono text-gray-600">{service.min}</td>

                        {/* Max */}
                        <td className="p-3.5 font-mono text-gray-600">{service.max.toLocaleString()}</td>

                        {/* Average time */}
                        <td className="p-3.5 text-gray-600 whitespace-nowrap">{service.avgTime}</td>

                        {/* Show Details Orange Button (Exact match Screenshot 2) */}
                        <td className="p-3.5 text-center">
                          <button
                            onClick={() => setSelectedDetailService(service)}
                            className="px-4 py-2 rounded-lg bg-[#ff5722] hover:bg-[#ea580c] text-white font-extrabold text-[11px] uppercase tracking-wider transition shadow-2xs"
                          >
                            SHOW DETAILS
                          </button>
                        </td>
                      </tr>
                    ))}

                  </React.Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedDetailService && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-bold text-gray-900">
                Service #{selectedDetailService.id} Details
              </h3>
              <button
                onClick={() => setSelectedDetailService(null)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-700">
              <div>
                <div className="font-bold text-gray-400 uppercase text-[10px]">Service Name</div>
                <div className="font-bold text-gray-900 text-sm mt-0.5">{selectedDetailService.name}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-xl">
                <div>
                  <div className="font-bold text-gray-400 uppercase text-[10px]">Rate per 1000</div>
                  <div className="font-extrabold text-[#ff5722] text-sm">${(selectedDetailService.rate / 600).toFixed(4)}</div>
                </div>
                <div>
                  <div className="font-bold text-gray-400 uppercase text-[10px]">Average Speed</div>
                  <div className="font-bold text-gray-800">{selectedDetailService.avgTime}</div>
                </div>
              </div>

              <div>
                <div className="font-bold text-gray-400 uppercase text-[10px]">Description</div>
                <div className="leading-relaxed text-gray-600 mt-1">{selectedDetailService.description}</div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedDetailService(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-bold text-xs"
              >
                Close
              </button>
              <Link
                href={`/dashboard?service=${selectedDetailService.id}`}
                onClick={() => setSelectedDetailService(null)}
                className="px-5 py-2 rounded-xl bg-[#ff5722] text-white font-extrabold text-xs shadow-sm"
              >
                Order This Service
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
