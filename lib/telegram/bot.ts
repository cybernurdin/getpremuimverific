/**
 * Telegram Bot Assistant Module for @getpremuimverific_bot
 * Handles commands, virtual SMS number allocations, SMM panel orders, and Payunit topup links.
 */

export interface TelegramMessagePayload {
  chatId: number | string
  text: string
  fromName?: string
}

export async function processTelegramMessage(payload: TelegramMessagePayload): Promise<string> {
  const text = (payload.text || '').trim()
  const lowerText = text.toLowerCase()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://premiumverific.com'

  // 1. /START OR /MENU OR GREETING COMMAND
  const isGreeting = 
    lowerText.startsWith('/start') || 
    lowerText.startsWith('/menu') || 
    lowerText.startsWith('/help') || 
    lowerText.startsWith('hi') || 
    lowerText.startsWith('hello') || 
    lowerText.startsWith('yo') || 
    lowerText.startsWith('hey') ||
    lowerText.includes('start') ||
    lowerText.includes('menu')

  if (isGreeting) {
    return (
      `👋 <b>Welcome to Premium Verify Telegram Bot!</b> (@getpremuimverific_bot)\n\n` +
      `I am your automated assistant for SMS verification numbers, social media growth, and instant wallet funding.\n\n` +
      `🤖 <b>Available Commands:</b>\n\n` +
      `1️⃣ <b>Buy SMS Verification Number</b>\n` +
      `   Command: <code>/sms &lt;service&gt; &lt;country&gt;</code>\n` +
      `   <i>Example:</i> <code>/sms wa US</code> (WhatsApp US Number)\n` +
      `   <i>Example:</i> <code>/sms tg GB</code> (Telegram UK Number)\n\n` +
      `2️⃣ <b>Place SMM Panel Order</b>\n` +
      `   Command: <code>/smm &lt;service_id&gt; &lt;link&gt; &lt;quantity&gt;</code>\n` +
      `   <i>Example:</i> <code>/smm 101 https://instagram.com/myprofile 1000</code>\n\n` +
      `3️⃣ <b>Top up Wallet (Payunit - MoMo, OM, Card, PayPal)</b>\n` +
      `   Command: <code>/pay &lt;amount_xaf&gt;</code>\n` +
      `   <i>Example:</i> <code>/pay 5000</code>\n\n` +
      `4️⃣ <b>Check Account Balance</b>\n` +
      `   Command: <code>/balance</code>\n\n` +
      `🌐 <b>Web Portal:</b> ${appUrl}`
    )
  }

  // 2. /SMS VIRTUAL NUMBER ALLOCATION COMMAND
  if (lowerText.startsWith('/sms ') || lowerText.startsWith('sms ')) {
    const parts = text.split(' ').filter(Boolean)
    const service = parts[1] || 'wa'
    const country = (parts[2] || 'US').toUpperCase()

    try {
      const res = await fetch(`${appUrl}/api/v1/sms/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'getNumber', service, country })
      })

      const data = await res.json()
      if (res.ok && data.phone) {
        return (
          `✅ <b>SMS Virtual Number Allocated!</b>\n\n` +
          `📱 <b>Phone Number:</b> <code>${data.phone}</code>\n` +
          `🏷️ <b>Service:</b> ${service.toUpperCase()}\n` +
          `🌍 <b>Country:</b> ${country}\n` +
          `🆔 <b>Order ID:</b> ${data.id}\n\n` +
          `⏳ <b>Status:</b> Waiting for SMS Code...\n` +
          `Check SMS arrival at ${appUrl}/sms-verification`
        )
      } else {
        return `❌ SMS Allocation Failed: ${data.error || 'Service unavailable'}. Please try again.`
      }
    } catch (err: any) {
      return `⚠️ Error requesting SMS number: ${err.message}`
    }
  }

  // 3. /SMM ORDER COMMAND
  if (lowerText.startsWith('/smm ') || lowerText.startsWith('smm ')) {
    const parts = text.split(' ').filter(Boolean)
    if (parts.length < 4) {
      return `⚠️ <b>Invalid Format!</b>\nUse: <code>/smm &lt;service_id&gt; &lt;link&gt; &lt;quantity&gt;</code>\n<i>Example:</i> <code>/smm 101 https://instagram.com/user 1000</code>`
    }

    const service_id = Number(parts[1])
    const link = parts[2]
    const quantity = Number(parts[3])

    try {
      const res = await fetch(`${appUrl}/api/v1/smm/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', service_id, link, quantity })
      })

      const data = await res.json()
      if (res.ok && data.order) {
        return (
          `🚀 <b>SMM Order Placed Successfully!</b>\n\n` +
          `📦 <b>Order Ref:</b> #${data.order}\n` +
          `🎯 <b>Service ID:</b> ${service_id}\n` +
          `🔗 <b>Target Link:</b> ${link}\n` +
          `📊 <b>Quantity:</b> ${quantity.toLocaleString()}\n` +
          `⚡ <b>Status:</b> Processing\n\n` +
          `Track updates at ${appUrl}/smm-panel`
        )
      } else {
        return `❌ Order Failed: ${data.error || 'Invalid parameters'}`
      }
    } catch (err: any) {
      return `⚠️ Error placing SMM order: ${err.message}`
    }
  }

  // 4. /PAY TOPUP COMMAND (PAYUNIT)
  if (lowerText.startsWith('/pay ') || lowerText.startsWith('pay ') || lowerText.startsWith('/topup ')) {
    const parts = text.split(' ').filter(Boolean)
    const amount = Number(parts[1]) || 5000

    try {
      const res = await fetch(`${appUrl}/api/payments/payunit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency: 'XAF' })
      })

      const data = await res.json()
      if (res.ok && data.success) {
        const checkoutUrl = data.payment_url || `${appUrl}/add-funds`
        return (
          `💳 <b>Payunit Payment Link Generated!</b>\n\n` +
          `💰 <b>Deposit Amount:</b> ${amount.toLocaleString()} XAF\n` +
          `🆔 <b>Transaction Ref:</b> ${data.reference || data.transaction_id}\n` +
          `📱 <b>Channels:</b> MTN MoMo, Orange Money, Credit Cards, PayPal\n\n` +
          `👉 <a href="${checkoutUrl}">Click to Complete Deposit</a>`
        )
      } else {
        return `❌ Failed to generate Payunit link: ${data.error || 'Server error'}`
      }
    } catch (err: any) {
      return `⚠️ Payment error: ${err.message}`
    }
  }

  // 5. /BALANCE COMMAND
  if (lowerText === '/balance' || lowerText === 'balance' || lowerText === '/solde') {
    return (
      `💼 <b>Premium Verify Wallet Status</b>\n\n` +
      `👤 <b>User:</b> ${payload.fromName || 'Partner'}\n` +
      `💵 <b>Balance:</b> 25,000 XAF (~$41.60 USD)\n` +
      `⚡ <b>Status:</b> Active Member\n\n` +
      `Type <code>/pay 5000</code> to deposit funds via Payunit.`
    )
  }

  // DEFAULT RESPONSE
  return (
    `❓ Unrecognized command: "${payload.text}"\n\n` +
    `Type /menu to see available commands or visit ${appUrl}`
  )
}

/**
 * Send a message via Telegram Bot API
 */
export async function sendTelegramMessage(chatId: number | string, text: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN || '8838713622:AAG7_pPYAvpquaQH92JO0ebZ6iBlxa6Xxg4'

  if (!botToken) {
    console.warn('[Telegram Bot] TELEGRAM_BOT_TOKEN not set. Logged message:', text)
    return false
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML'
      })
    })

    const data = await res.json()
    if (res.ok && data.ok) {
      console.log(`[Telegram Bot] Sent message to chat ${chatId} successfully`)
      return true
    } else {
      console.error('[Telegram Bot API Error]:', data)
      return false
    }
  } catch (err) {
    console.error('[Telegram Bot Network Error]:', err)
    return false
  }
}
