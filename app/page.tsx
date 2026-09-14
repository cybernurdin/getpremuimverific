'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  Zap,
  Smartphone,
  Share2,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  Star,
  MessageSquare,
  Globe,
  Sparkles,
  ChevronDown,
  HelpCircle,
  Lock,
  Mail,
  Phone,
  Bot
} from 'lucide-react'
import { SMS_SERVICES, COUNTRIES, SMM_SERVICES, ACCOUNT_PRODUCTS, PLATFORM_INFO } from '@/lib/mockData'
import { AuthModal } from '@/components/AuthModal'

export default function LandingPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authActionTitle, setAuthActionTitle] = useState('Sign In to Premium Verify')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // Pricing preview state
  const [calcPlatform, setCalcPlatform] = useState('Instagram')
  const [calcQuantity, setCalcQuantity] = useState(1000)

  const handleCtaClick = (title: string) => {
    setAuthActionTitle(title)
    setIsAuthOpen(true)
  }

  const faqs = [
    {
      q: 'How fast are SMS verification codes delivered?',
      a: 'SMS codes are delivered instantly in real time (usually within 3-10 seconds) upon requesting a virtual number for WhatsApp, Telegram, TikTok, Facebook, or Google.'
    },
    {
      q: 'What is the SMM Panel and how does it work?',
      a: 'Our SMM Panel connects directly to automated high-speed servers (JustAnotherPanel API v2) to deliver organic Instagram followers, YouTube watch hours, TikTok viral views, and Facebook page likes.'
    },
    {
      q: 'Do you offer Facebook Account Rescue & Recovery?',
      a: 'Yes! Our technical team specializes in restoring compromised, hacked, locked, or 2FA-blocked Facebook profiles and business pages.'
    },
    {
      q: 'How do I top up my wallet balance?',
      a: 'You can deposit funds instantly using Mobile Money (MTN MoMo, Orange Money), Visa/Mastercard credit cards, or USDT Crypto.'
    }
  ]

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 font-sans">
      
      {/* PUBLIC MARKETING HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#ff6b00] flex items-center justify-center text-white font-extrabold shadow-md">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-black text-gray-900 tracking-tight block leading-none">Premium Verify</span>
              <span className="text-[10px] text-gray-500 font-semibold">{PLATFORM_INFO.domain}</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
            <a href="#services" className="hover:text-[#ff6b00] transition">SMM Services</a>
            <a href="#sms" className="hover:text-[#ff6b00] transition">Virtual SMS</a>
            <a href="#accounts" className="hover:text-[#ff6b00] transition">Accounts Store</a>
            <a href="#pricing" className="hover:text-[#ff6b00] transition">Pricing</a>
            <a href="#faq" className="hover:text-[#ff6b00] transition">FAQ</a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleCtaClick('Sign In to Premium Verify')}
              className="px-4 py-2.5 rounded-xl font-bold text-xs text-gray-700 hover:bg-gray-100 transition hidden sm:block"
            >
              Sign In
            </button>

            <button
              onClick={() => handleCtaClick('Create Free Account')}
              className="px-5 py-2.5 rounded-xl bg-[#ff6b00] hover:bg-[#ea580c] text-white font-extrabold text-xs transition shadow-md flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Get Started</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-orange-50/60 via-white to-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-[#ea580c] border border-orange-200 text-xs font-bold shadow-xs">
              <Sparkles className="w-4 h-4" />
              <span>#1 Best & Cheapest SMM Panel & SMS Verification Service</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight">
              Supercharge Your Social Media & Get <span className="text-[#ff6b00]">Instant Virtual Numbers</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-xl text-gray-600 max-w-2xl font-normal leading-relaxed">
              Automated high-speed SMM services for Instagram, YouTube, TikTok, Facebook & Telegram + instant virtual SMS numbers across 197 countries.
            </p>

            {/* CTA BUTTONS (Matching User Request) */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full">
              
              {/* CTA 1: Get a UK Number */}
              <button
                onClick={() => handleCtaClick('Get a Dedicated UK Phone Number')}
                className="px-6 py-4 rounded-2xl bg-[#ff6b00] hover:bg-[#ea580c] text-white font-extrabold text-sm transition shadow-lg flex items-center gap-2"
              >
                <Smartphone className="w-5 h-5" />
                <span>Get a UK Number</span>
              </button>

              {/* CTA 2: Boost Social Media */}
              <button
                onClick={() => handleCtaClick('Boost Your Social Media Accounts')}
                className="px-6 py-4 rounded-2xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-sm transition shadow-lg flex items-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                <span>Boost Social Media</span>
              </button>

              {/* CTA 3: Get Verified */}
              <button
                onClick={() => handleCtaClick('Get Verified Account')}
                className="px-6 py-4 rounded-2xl bg-gray-900 hover:bg-black text-white font-extrabold text-sm transition shadow-lg flex items-center gap-2"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Get Verified</span>
              </button>

              {/* CTA 4: Sign in with Google */}
              <button
                onClick={() => handleCtaClick('Sign in with Google')}
                className="px-6 py-4 rounded-2xl bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-extrabold text-sm transition shadow-sm flex items-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

            </div>

            {/* Trust Signals */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-gray-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ff6b00]" /> 100% Instant Delivery
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ff6b00]" /> 197+ Countries Covered
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ff6b00]" /> Mobile Money (MoMo/Orange) Supported
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* STATS COUNTER BAR */}
      <section className="bg-white border-y border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-black text-gray-900">10M+</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">SMM Orders Processed</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-[#ff6b00]">197+</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Countries Supported</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-gray-900">99.99%</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">SMS Delivery Uptime</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-[#2563eb]">24/7</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Live WhatsApp Support</div>
          </div>
        </div>
      </section>

      {/* CORE SERVICES SECTION */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#ea580c] uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
              Core Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Comprehensive Social Media & Verification Platform</h2>
            <p className="text-sm text-gray-600">Everything you need to grow your digital presence and verify accounts effortlessly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Service 1: SMM Growth Panel */}
            <div className="agoverify-card p-8 flex flex-col justify-between space-y-6 hover:border-[#ff6b00] transition group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#ff6b00] flex items-center justify-center font-bold text-xl group-hover:bg-[#ff6b00] group-hover:text-white transition">
                  <Share2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">SMM Growth Panel</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Instagram followers, YouTube 4,000 watch hours & subscribers monetization package, TikTok viral views, Facebook page likes, and Telegram members.
                </p>
                <ul className="space-y-2 text-xs text-gray-700 font-medium pt-2">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#ea580c]" /> Instagram Real Followers & Likes</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#ea580c]" /> YouTube 4,000 Hours Monetization</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#ea580c]" /> TikTok FYP Viral View Speed</li>
                </ul>
              </div>

              <button
                onClick={() => handleCtaClick('Access SMM Growth Panel')}
                className="w-full py-3 rounded-xl bg-[#ff6b00] hover:bg-[#ea580c] text-white font-extrabold text-xs transition shadow-xs flex items-center justify-center gap-2"
              >
                <span>Order SMM Panel</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Service 2: Virtual SMS Verification */}
            <div id="sms" className="agoverify-card p-8 flex flex-col justify-between space-y-6 hover:border-[#2563eb] transition group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-[#2563eb] flex items-center justify-center font-bold text-xl group-hover:bg-[#2563eb] group-hover:text-white transition">
                  <Smartphone className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Virtual SMS Activation</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Receive instant SMS codes for WhatsApp, Telegram, TikTok, Facebook, Google, OpenAI, and Netflix across 197 countries including USA, UK & Cameroon.
                </p>
                <ul className="space-y-2 text-xs text-gray-700 font-medium pt-2">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#2563eb]" /> Dedicated UK & USA Phone Numbers</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#2563eb]" /> WhatsApp & Telegram Verification</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#2563eb]" /> Automatic Code Receiver Monitor</li>
                </ul>
              </div>

              <button
                onClick={() => handleCtaClick('Get Virtual SMS Number')}
                className="w-full py-3 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-xs transition shadow-xs flex items-center justify-center gap-2"
              >
                <span>Get Virtual Number</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Service 3: Accounts & Facebook Rescue */}
            <div id="accounts" className="agoverify-card p-8 flex flex-col justify-between space-y-6 hover:border-gray-900 transition group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 text-gray-900 flex items-center justify-center font-bold text-xl group-hover:bg-gray-900 group-hover:text-white transition">
                  <UserCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Accounts & Facebook Rescue</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Buy pre-verified USA/UK TikTok accounts (Creator Rewards ready), verified Facebook accounts with 2FA, and expert Facebook hacking recovery service.
                </p>
                <ul className="space-y-2 text-xs text-gray-700 font-medium pt-2">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-900" /> USA & UK Monetized TikTok Accounts</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-900" /> Facebook Hacking & Rescue Recovery</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-900" /> Netflix 4K UHD & ExpressVPN</li>
                </ul>
              </div>

              <button
                onClick={() => handleCtaClick('Browse Accounts Marketplace')}
                className="w-full py-3 rounded-xl bg-gray-900 hover:bg-black text-white font-extrabold text-xs transition shadow-xs flex items-center justify-center gap-2"
              >
                <span>Browse Store</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* PRICING CALCULATOR PREVIEW */}
      <section id="pricing" className="py-20 bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-[#ea580c] uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
              Transparent Rates
            </span>
            <h2 className="text-3xl font-black text-gray-900">Calculate Your Instant Order Cost</h2>
            <p className="text-sm text-gray-600">Select platform and quantity to estimate price in XAF.</p>
          </div>

          <div className="agoverify-card p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div>
                <label className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-2 block">
                  Select Social Platform
                </label>
                <select
                  value={calcPlatform}
                  onChange={(e) => setCalcPlatform(e.target.value)}
                  className="w-full bg-white border border-gray-300 focus:border-[#ff6b00] rounded-xl py-3 px-4 text-gray-900 text-sm outline-none font-bold"
                >
                  <option value="Instagram">Instagram Followers (1,200 XAF / 1k)</option>
                  <option value="YouTube">YouTube High Retention Views (1,800 XAF / 1k)</option>
                  <option value="TikTok">TikTok FYP Viral Views (150 XAF / 1k)</option>
                  <option value="Facebook">Facebook Page Boost (1,900 XAF / 1k)</option>
                  <option value="Telegram">Telegram Channel Members (1,100 XAF / 1k)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-2 block">
                  Quantity
                </label>
                <input
                  type="number"
                  step="500"
                  min="500"
                  value={calcQuantity}
                  onChange={(e) => setCalcQuantity(Number(e.target.value))}
                  className="w-full bg-white border border-gray-300 focus:border-[#ff6b00] rounded-xl py-3 px-4 text-gray-900 text-sm outline-none font-bold"
                />
              </div>

            </div>

            <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase">Estimated Total Charge</div>
                <div className="text-2xl font-black text-[#ea580c]">
                  {(calcPlatform === 'TikTok' ? Math.ceil((150 * calcQuantity)/1000) : Math.ceil((1200 * calcQuantity)/1000)).toLocaleString()} XAF
                </div>
              </div>

              <button
                onClick={() => handleCtaClick('Order SMM Package Now')}
                className="px-6 py-3 rounded-xl bg-[#ff6b00] hover:bg-[#ea580c] text-white font-extrabold text-xs transition shadow-sm"
              >
                Place Order Now
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-black text-gray-900">Frequently Asked Questions</h2>
            <p className="text-sm text-gray-600">Everything you need to know about Premium Verify services.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-xs transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-gray-900 text-sm hover:text-[#ea580c] transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === idx ? 'rotate-180 text-[#ea580c]' : ''}`} />
                </button>

                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA FOOTER BANNER */}
      <section className="bg-gradient-to-r from-[#ff6b00] to-[#ea580c] py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-3xl md:text-4xl font-black">Ready to Grow Your Digital Accounts?</h2>
          <p className="text-sm md:text-base text-white/90 max-w-xl mx-auto font-medium">
            Join thousands of partners using Premium Verify for instant SMS activations and automated SMM panel growth.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleCtaClick('Get Started Free')}
              className="px-8 py-4 rounded-2xl bg-white text-gray-900 hover:bg-gray-100 font-extrabold text-sm transition shadow-lg"
            >
              Get Started Free
            </button>
            <a
              href="https://wa.me/237677034736"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-2xl bg-black/30 hover:bg-black/40 text-white font-extrabold text-sm transition border border-white/20"
            >
              Contact Support WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-12 text-xs border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-black text-lg">
              <ShieldCheck className="w-6 h-6 text-[#ff6b00]" />
              <span>Premium Verify</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Automated high-speed SMM Panel services & instant virtual SMS verification numbers across 197 countries.
            </p>
            <div className="text-gray-500 font-mono text-[11px]">© 2026 Premium Verify (premiumverific.com). All rights reserved.</div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-white transition">SMM Services</a></li>
              <li><a href="#sms" className="hover:text-white transition">Virtual SMS Numbers</a></li>
              <li><a href="#accounts" className="hover:text-white transition">Accounts Marketplace</a></li>
              <li><a href="#pricing" className="hover:text-white transition">Pricing Calculator</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Contact & Support</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-[#ff6b00]" /> +237 677034736</li>
              <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-[#ff6b00]" /> hello@premiumverific.com</li>
              <li className="flex items-center gap-2"><Globe className="w-3.5 h-3.5 text-[#ff6b00]" /> premiumverific.com</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Accepted Payments</h4>
            <div className="text-xs text-gray-400 leading-relaxed">
              MTN Mobile Money • Orange Money • Visa • Mastercard • USDT Crypto
            </div>
          </div>

        </div>
      </footer>

      {/* AUTH MODAL */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

    </div>
  )
}
