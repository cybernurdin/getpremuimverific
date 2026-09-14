'use client'

import React, { useState } from 'react'
import { Receipt, CreditCard, ArrowDownRight, ArrowUpRight, Plus, Filter, Search } from 'lucide-react'
import { useAppState } from '@/lib/store'
import { DepositModal } from '@/components/DepositModal'

export default function TransactionsPage() {
  const { transactions, profile } = useAppState()
  const [isDepositOpen, setIsDepositOpen] = useState(false)
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTx = transactions.filter(tx => {
    const matchType = typeFilter === 'all' || tx.type === typeFilter
    const matchSearch = tx.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        tx.description?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchType && matchSearch
  })

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Transactions & Billing</h1>
          <p className="text-sm text-gray-500 mt-1">
            Complete transaction ledger of deposits, SMS purchases, SMM panel orders, and account purchases.
          </p>
        </div>

        <button
          onClick={() => setIsDepositOpen(true)}
          className="px-5 py-3 rounded-xl bg-[#ff6b00] hover:bg-[#ea580c] text-white font-extrabold text-xs transition shadow-xs flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Deposit Funds</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="agoverify-card p-5">
          <div className="text-xs font-bold uppercase text-gray-500 mb-1">Available Balance</div>
          <div className="text-2xl font-black text-gray-900">
            {profile.balance_xaf.toLocaleString()} <span className="text-xs text-[#ea580c]">XAF</span>
          </div>
        </div>

        <div className="agoverify-card p-5">
          <div className="text-xs font-bold uppercase text-gray-500 mb-1">Total Transactions</div>
          <div className="text-2xl font-black text-gray-900">{transactions.length}</div>
        </div>

        <div className="agoverify-card p-5">
          <div className="text-xs font-bold uppercase text-gray-500 mb-1">Supported Gateways</div>
          <div className="text-xs font-bold text-[#ea580c] mt-2">
            MTN MoMo • Orange Money • Visa • Crypto
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="agoverify-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {[
              { label: 'All', val: 'all' },
              { label: 'Deposits', val: 'deposit' },
              { label: 'SMS Orders', val: 'sms_purchase' },
              { label: 'SMM Orders', val: 'smm_order' },
              { label: 'Account Orders', val: 'account_purchase' },
            ].map(tab => (
              <button
                key={tab.val}
                onClick={() => setTypeFilter(tab.val)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  typeFilter === tab.val
                    ? 'bg-[#ff6b00] text-white'
                    : 'bg-gray-100 text-gray-600 hover:text-gray-900 border border-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-300 focus:border-[#ff6b00] rounded-xl py-2 pl-10 pr-4 text-gray-900 text-xs outline-none"
              placeholder="Search reference..."
            />
          </div>
        </div>

        {/* Transactions Table */}
        {filteredTx.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-xs">
            No transactions found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="font-bold text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-3">Reference</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Gateway</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTx.map(tx => (
                  <tr key={tx.id} className="hover:bg-gray-50 transition">
                    <td className="p-3 font-mono font-bold text-gray-700">{tx.reference}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-orange-50 text-[#ea580c]">
                        {tx.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-gray-500 uppercase">{tx.payment_method.replace('_', ' ')}</td>
                    <td className="p-3 text-gray-800">{tx.description}</td>
                    <td className={`p-3 font-extrabold ${tx.type === 'deposit' ? 'text-[#ea580c]' : 'text-gray-900'}`}>
                      {tx.type === 'deposit' ? '+' : '-'}{tx.amount.toLocaleString()} XAF
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700">
                        {tx.status}
                      </span>
                    </td>
                    <td className="p-3 text-gray-500">{new Date(tx.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <DepositModal isOpen={isDepositOpen} onClose={() => setIsDepositOpen(false)} />
    </div>
  )
}
