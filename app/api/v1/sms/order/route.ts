import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { service, country } = body

    if (!service || !country) {
      return NextResponse.json({ error: 'Service code and country code are required' }, { status: 400 })
    }

    const mockPhone = `+1 (${Math.floor(100 + Math.random() * 900)}) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`
    const orderId = 'sms_' + Math.random().toString(36).substr(2, 9)

    return NextResponse.json({
      success: true,
      order_id: orderId,
      phone_number: mockPhone,
      service,
      country,
      status: 'waiting_sms',
      expires_in_seconds: 1200
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Internal server error' }, { status: 500 })
  }
}
