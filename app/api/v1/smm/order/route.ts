import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { service_id, link, quantity } = body

    if (!service_id || !link || !quantity) {
      return NextResponse.json({ error: 'service_id, link, and quantity parameters are required' }, { status: 400 })
    }

    const orderId = Math.floor(100000 + Math.random() * 900000)

    return NextResponse.json({
      order: orderId,
      status: 'Pending',
      service_id,
      link,
      quantity,
      charge: '1200 XAF'
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Internal server error' }, { status: 500 })
  }
}
