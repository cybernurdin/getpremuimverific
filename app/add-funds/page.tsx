'use client'

import React, { useState } from 'react'
import { Wallet, Smartphone, CreditCard, DollarSign, CheckCircle2 } from 'lucide-react'

export default function AddFundsPage() {
  const [method, setMethod] = useState<'momo' | 'usdt' | 'card'>('momo')
  const [amountXaf, setAmountXaf] = useState(5000)

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 space-y-6 shadow-2xs">
        
        <div>
          <h1 className="text-xl font-bold text-gray-900">Add Funds to Your Wallet</h1>
          <p className="text-xs text-gray-500 mt-1">
            Top up your balance instantly using Mobile Money (MTN / Orange Cameroon), USDT Crypto, or Credit Card.
          </p>
        </div>

        {/* Payment Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setMethod('momo')}
            className={`p-5 rounded-2xl border text-left transition ${
              method === 'momo'
                ? 'bg-orange-50 border-[#ff5722] text-[#ff5722]'
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-white'
            }`}
          >
            <Smartphone className="w-6 h-6 mb-2" />
            <div className="font-extrabold text-sm">MTN & Orange MoMo</div>
            <div className="text-[11px] opacity-80">Instant Automatic Topup (+237)</div>
          </button>

          <button
            onClick={() => setMethod('usdt')}
            className={`p-5 rounded-2xl border text-left transition ${
              method === 'usdt'
                ? 'bg-blue-50 border-blue-600 text-blue-600'
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-white'
            }`}
          >
            <DollarSign className="w-6 h-6 mb-2" />
            <div className="font-extrabold text-sm">USDT (TRC20 / BEP20)</div>
            <div className="text-[11px] opacity-80">Crypto Automatic Deposit</div>
          </button>

          <button
            onClick={() => setMethod('card')}
            className={`p-5 rounded-2xl border text-left transition ${
              method === 'card'
                ? 'bg-purple-50 border-purple-600 text-purple-600'
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-white'
            }`}
          >
            <CreditCard className="w-6 h-6 mb-2" />
            <div className="font-extrabold text-sm">Credit / Debit Card</div>
            <div className="text-[11px] opacity-80">Visa & Mastercard</div>
          </button>
        </div>

        {/* Method Details */}
        {method === 'momo' && (
          <div className="p-6 rounded-2xl bg-orange-50/50 border border-orange-100 space-y-4 text-xs">
            <h3 className="font-bold text-gray-900 text-sm">Mobile Money Express Payment</h3>
            <div className="space-y-2">
              <label className="font-bold text-gray-600 block uppercase text-[10px]">Enter Amount (XAF)</label>
              <input
                type="number"
                step="1000"
                value={amountXaf}
                onChange={(e) => setAmountXaf(Number(e.target.value))}
                className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm font-bold text-gray-900 outline-none"
              />
            </div>
            
            <div className="p-4 bg-white rounded-xl border border-orange-200 space-y-2 text-gray-700 font-medium">
              <div>Send Mobile Money transfer to: <strong className="text-[#ea580c] font-extrabold">+237 677034736</strong></div>
              <div>Recipient Name: <strong className="text-gray-900">Premium Verify Official</strong></div>
            </div>

            <a
              href={`https://wa.me/237677034736?text=Hello%2C%20I%20want%20to%20deposit%20${amountXaf}%20XAF%20to%20my%20Premium%20Verify%20account.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ff5722] hover:bg-[#ea580c] text-white font-extrabold text-xs shadow-sm transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Deposit on WhatsApp</span>
            </a>
          </div>
        )}

        {method === 'usdt' && (
          <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-4 text-xs">
            <h3 className="font-bold text-gray-900 text-sm">USDT Crypto Payment Address</h3>
            <div className="p-4 bg-white rounded-xl border border-blue-200 space-y-2 font-mono text-gray-800">
              <div className="text-[10px] text-gray-400 font-bold uppercase">USDT TRC20 Address:</div>
              <div className="text-xs font-bold text-blue-600 break-all">TYP7vX9zK2L3m4N5p6Q7R8s9T0u1V2W3X4Y5Z</div>
            </div>
          </div>
        )}

        {method === 'card' && (
          <div className="p-6 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs text-gray-700">
            Visa / Mastercard payments are processed securely via Stripe. Select amount to initiate gateway checkout.
          </div>
        )}

      </div>

    </div>
  )
}
