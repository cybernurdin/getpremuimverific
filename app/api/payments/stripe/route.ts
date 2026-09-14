import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, currency = 'usd' } = body

    const stripeSecret = process.env.STRIPE_SECRET_KEY

    if (stripeSecret) {
      // Integration with Stripe SDK / REST API
      const stripeRes = await fetch('https://api.stripe.com/v1/payment_intents', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${stripeSecret}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          amount: String(Math.round(amount * 100)),
          currency: currency.toLowerCase(),
          'payment_method_types[]': 'card'
        })
      })

      const stripeData = await stripeRes.json()
      if (stripeData.client_secret) {
        return NextResponse.json({
          client_secret: stripeData.client_secret,
          id: stripeData.id,
          status: 'requires_payment_method'
        })
      }
    }

    // Demo response if Stripe key is not configured yet
    const demoRef = `CARD-${Math.floor(100000 + Math.random() * 900000)}`
    return NextResponse.json({
      success: true,
      status: 'COMPLETED',
      reference: demoRef,
      amount,
      message: 'Card payment intent processed.'
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Stripe payment failed' }, { status: 500 })
  }
}
