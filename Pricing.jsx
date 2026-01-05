async function createCheckoutSession(tier) {
  try {
    const response = await fetch('https://khan-backend.onrender.com/stripe/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier })
    })
    const data = await response.json()
    if (data.sessionId) {
      const stripe = Stripe('pk_live_51SglrmP8gDUIaCuBFi5kmHcgbubxdVDPLE7yLK8k27x4CZKmPkuL8bq84ZM0oukELXFSKWhrh4Xqp1KHkBWJSqRo00nf3iJDW6')
      await stripe.redirectToCheckout({ sessionId: data.sessionId })
    }
  } catch (error) {
    alert('Error: ' + error.message)
  }
}

export default function Pricing({ onBack }) {
  return (
    <div className="h-screen w-screen bg-black text-white px-5 py-8 flex flex-col">
      <button onClick={onBack} className="text-gray-400 mb-8">← Back</button>
      <h1 className="text-4xl font-black text-center mb-10">Pricing</h1>
      
      <div className="space-y-3 flex-1">
        {[
          { tier: 'STARTER', name: 'Starter', price: '$5.99' },
          { tier: 'PRO', name: 'Pro', price: '$9.99' },
          { tier: 'ELITE', name: 'Elite', price: '$19.99' }
        ].map(t => (
          <button key={t.tier} onClick={() => createCheckoutSession(t.tier)} className="w-full p-5 rounded-2xl border-2 border-gray-700 bg-gray-900 hover:border-gray-500 active:scale-95">
            <p className="text-lg font-black mb-2">{t.name}</p>
            <p className="text-2xl font-black">{t.price}<span className="text-xs text-gray-400">/mo</span></p>
          </button>
        ))}
      </div>
    </div>
  )
}
