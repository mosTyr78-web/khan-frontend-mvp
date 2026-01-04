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
    <div className="h-screen w-screen bg-black/50 px-4 py-8 overflow-y-auto flex flex-col">
      <button onClick={onBack} className="text-gray-400 mb-8">← Back</button>
      <h1 className="text-4xl font-black text-center mb-10">Pricing</h1>
      
      <div className="space-y-4 flex-1">
        <div className="border-2 border-gray-700 rounded-2xl p-6 bg-gray-900/50">
          <h2 className="text-xl font-black mb-3">Starter</h2>
          <p className="text-3xl font-black mb-4">$5.99/mo</p>
          <button onClick={() => createCheckoutSession('STARTER')} className="w-full py-3 rounded-lg border-2 border-gray-700 font-bold active:scale-95">Start</button>
        </div>
        
        <div className="border-2 border-gray-600 rounded-2xl p-6 bg-gray-800/30">
          <h2 className="text-xl font-black mb-3">Pro</h2>
          <p className="text-3xl font-black mb-4">$9.99/mo</p>
          <button onClick={() => createCheckoutSession('PRO')} className="w-full py-3 rounded-lg bg-gray-700 font-bold active:scale-95">Upgrade</button>
        </div>
        
        <div className="border-2 border-gray-700 rounded-2xl p-6 bg-gray-900/50">
          <h2 className="text-xl font-black mb-3">Elite</h2>
          <p className="text-3xl font-black mb-4">$19.99/mo</p>
          <button onClick={() => createCheckoutSession('ELITE')} className="w-full py-3 rounded-lg border-2 border-gray-700 font-bold active:scale-95">Elite</button>
        </div>
      </div>
    </div>
  )
}
