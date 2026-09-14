import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, crypto = 'USDT' } = body

    const coinbaseApiKey = process.env.COINBASE_COMMERCE_API_KEY

    if (coinbaseApiKey) {
      const cbRes = await fetch('https://api.commerce.coinbase.com/charges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CC-Api-Key': coinbaseApiKey,
          'X-CC-Version': '2018-03-22'
        },
        body: JSON.stringify({
          name: 'Premium Verify Wallet Deposit',
          description: `Topup ${amount} USD to Premium Verify`,
          pricing_type: 'fixed_price',
          local_price: {
            amount: String(amount),
            currency: 'USD'
          }
        })
      })

      const cbData = await cbRes.json()
      if (cbData.data && cbData.data.hosted_url) {
        return NextResponse.json({
          success: true,
          hosted_url: cbData.data.hosted_url,
          code: cbData.data.code,
          addresses: cbData.data.addresses
        })
      }
    }

    // Default static USDT / Bitcoin payment response
    const usdtAddress = process.env.BITCOIN_USDT_WALLET_ADDRESS || 'TYP7vX9zK2L3m4N5p6Q7R8s9T0u1V2W3X4Y5Z'
    return NextResponse.json({
      success: true,
      crypto,
      amount,
      address: usdtAddress,
      network: 'TRC20 / BEP20',
      message: `Send exact USDT to address ${usdtAddress}. Balance will update automatically upon network confirmation.`
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Crypto payment failed' }, { status: 500 })
  }
}
