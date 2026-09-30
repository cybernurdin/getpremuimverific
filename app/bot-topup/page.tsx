'use client'

import { useEffect, useState } from 'react'

type CheckoutState = { amount_xaf: number; expires_at: string; status: string }

export default function BotTopupPage() {
  const [checkout, setCheckout] = useState<CheckoutState | null>(null)
  const [error, setError] = useState('')
  const [starting, setStarting] = useState(false)
  const token = typeof window === 'undefined' ? '' : new URLSearchParams(window.location.search).get('token') || ''

  useEffect(() => {
    if (!token) { setError('This secure top-up link is incomplete. Return to the bot for a new one.'); return }
    fetch(`/api/bot/topup?token=${encodeURIComponent(token)}`)
      .then(async (response) => {
        const payload = await response.json()
        if (!response.ok) throw new Error(payload.error || 'This secure top-up link is unavailable.')
        setCheckout(payload)
      })
      .catch((reason: Error) => setError(reason.message))
  }, [token])

  async function continueToPayunit() {
    setStarting(true)
    setError('')
    try {
      const response = await fetch('/api/bot/topup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }) })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || 'Could not start payment.')
      if (payload.status === 'completed') { setCheckout((current) => current ? { ...current, status: 'completed' } : current); return }
      window.location.assign(payload.payment_url)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Could not start payment.')
      setStarting(false)
    }
  }

  return <main className="min-h-screen bg-slate-950 px-5 py-16 text-slate-100"><section className="mx-auto max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-7 shadow-2xl"><p className="text-sm font-bold uppercase tracking-widest text-orange-400">Premium Verify</p><h1 className="mt-3 text-3xl font-black">Secure wallet top-up</h1>{error ? <p className="mt-5 rounded-xl bg-red-950/60 p-4 text-sm text-red-200">{error}</p> : !checkout ? <p className="mt-5 text-slate-300">Loading your secure checkout…</p> : checkout.status === 'completed' ? <p className="mt-5 rounded-xl bg-emerald-950/60 p-4 text-emerald-200">Payment confirmed. Your wallet has been credited.</p> : <><p className="mt-4 text-slate-300">This link is linked to the customer who requested it in the bot.</p><div className="my-6 rounded-2xl bg-slate-800 p-5"><p className="text-sm text-slate-400">Amount to add</p><p className="mt-1 text-3xl font-black text-white">{checkout.amount_xaf.toLocaleString()} XAF</p></div><button onClick={continueToPayunit} disabled={starting} className="w-full rounded-xl bg-orange-500 px-4 py-3 font-bold text-slate-950 disabled:opacity-60">{starting ? 'Opening secure checkout…' : 'Continue to secure payment'}</button><p className="mt-4 text-center text-xs text-slate-400">This link expires at {new Date(checkout.expires_at).toLocaleTimeString()}.</p></>}</section></main>
}
