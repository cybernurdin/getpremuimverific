'use client'

import React, { useState } from 'react'
import {
  UserCheck,
  Search,
  Filter,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Tv,
  Key,
  ShoppingBag,
  Star,
  Zap,
  Info
} from 'lucide-react'
import { ACCOUNT_PRODUCTS, AccountProductItem } from '@/lib/mockData'
import { useAppState } from '@/lib/store'
import confetti from 'canvas-confetti'

export default function AccountsPage() {
  const { purchaseAccount, accountOrders } = useAppState()

  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<AccountProductItem | null>(null)
  const [purchasedOrderDetails, setPurchasedOrderDetails] = useState<any | null>(null)

  const categories = ['All', 'Social Media Accounts', 'Monetization & Recovery', 'Streaming Subscriptions', 'VPN Services']

  const filteredProducts = ACCOUNT_PRODUCTS.filter(p => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  const handleBuyNow = (prod: AccountProductItem) => {
    const order = purchaseAccount(prod.title, prod.category, prod.price, prod.deliveryType === 'Instant delivery' ? 'instant' : 'manual')
    if (order) {
      setPurchasedOrderDetails(order)
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      })
    }
  }

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Accounts & Subscriptions Store</h1>
          <p className="text-sm text-gray-500 mt-1">
            Buy verified accounts, TikTok UK/USA monetization accounts, Facebook rescue & recovery, streaming & VPN services.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-xs text-[#ea580c] font-bold shadow-xs">
          <Zap className="w-4 h-4 fill-current" />
          <span>Premium Verify Warranty & Instant Delivery</span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#ff6b00] text-white shadow-xs'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-300 focus:border-[#ff6b00] rounded-xl py-2 pl-10 pr-4 text-gray-900 text-xs outline-none"
            placeholder="Search accounts..."
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="agoverify-card p-6 flex flex-col justify-between space-y-4 group hover:border-[#ff6b00]/40 transition">
            
            {/* Top Badges & Category */}
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-orange-50 text-[#ea580c] text-[10px] font-bold uppercase tracking-wider">
                {product.category}
              </span>
              {product.badge && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#ff6b00] text-white text-[10px] font-black">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Product Info */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#ea580c] transition mb-2">
                {product.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                {product.description}
              </p>
            </div>

            {/* Price & Rating */}
            <div className="pt-3 border-t border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl font-extrabold text-gray-900">
                    {product.price.toLocaleString()} <span className="text-xs font-semibold text-[#ea580c]">XAF</span>
                  </div>
                  {product.originalPrice && (
                    <div className="text-xs text-gray-400 line-through">
                      {product.originalPrice.toLocaleString()} XAF
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{product.rating}</span>
                  </div>
                  <div className="text-[10px] text-gray-500">{product.soldCount} sold</div>
                </div>
              </div>

              {/* Delivery method pill */}
              <div className="text-[11px] font-semibold text-[#ea580c] bg-orange-50 px-3 py-1 rounded-lg inline-block">
                {product.deliveryType}
              </div>

              {/* Buy Button */}
              <button
                onClick={() => setSelectedProduct(product)}
                className="w-full py-3 rounded-xl bg-[#ff6b00] hover:bg-[#ea580c] text-white font-extrabold text-xs transition shadow-xs flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buy Now</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Confirmation / Purchase Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white border border-gray-200 w-full max-w-md rounded-2xl p-6 relative space-y-5 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900">Confirm Purchase</h3>
            
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <div className="text-sm font-bold text-gray-900">{selectedProduct.title}</div>
              <div className="text-xs text-gray-600">{selectedProduct.description}</div>
              <div className="text-lg font-extrabold text-[#ea580c] pt-2">
                Price: {selectedProduct.price.toLocaleString()} XAF
              </div>
            </div>

            <div className="text-xs text-gray-500 space-y-1">
              <div>• Delivery Mode: <span className="text-gray-900 font-semibold">{selectedProduct.deliveryType}</span></div>
              <div>• 24/7 Replacement guarantee if login fails</div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedProduct(null)}
                className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const prod = selectedProduct
                  setSelectedProduct(null)
                  handleBuyNow(prod)
                }}
                className="flex-1 py-3 rounded-xl bg-[#ff6b00] hover:bg-[#ea580c] text-white font-extrabold text-xs transition shadow-xs"
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Purchased Order Credentials Modal */}
      {purchasedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white border border-[#ff6b00] w-full max-w-lg rounded-2xl p-6 relative space-y-5 shadow-2xl">
            <div className="flex items-center gap-3 text-[#ea580c]">
              <CheckCircle2 className="w-8 h-8" />
              <div>
                <h3 className="text-xl font-bold text-gray-900">Order Completed!</h3>
                <p className="text-xs text-gray-500">Order ID: #{purchasedOrderDetails.id}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3 font-mono text-xs">
              <div className="text-gray-500 font-sans font-bold text-xs uppercase">Purchased Item Credentials</div>
              {purchasedOrderDetails.credentials_data?.username ? (
                <div className="space-y-1 text-gray-900">
                  <div><span className="text-gray-500">Username:</span> {purchasedOrderDetails.credentials_data.username}</div>
                  <div><span className="text-gray-500">Password:</span> {purchasedOrderDetails.credentials_data.password}</div>
                  <div><span className="text-gray-500">2FA Codes:</span> {purchasedOrderDetails.credentials_data.backup_codes.join(', ')}</div>
                </div>
              ) : (
                <div className="text-gray-700 font-sans text-xs">
                  {purchasedOrderDetails.credentials_data?.instruction}
                </div>
              )}
            </div>

            <button
              onClick={() => setPurchasedOrderDetails(null)}
              className="w-full py-3 rounded-xl bg-[#ff6b00] hover:bg-[#ea580c] text-white font-bold text-xs"
            >
              Done & Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
