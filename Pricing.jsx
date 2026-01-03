export default function Pricing({ onBack }) {
  const createCheckoutSession = async (tier) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 px-6 py-12">
      <button onClick={onBack} className="text-gray-400 mb-8">← Back</button>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-black mb-12">Upgrade to Premium</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border-2 border-gray-700 rounded-xl p-8">
            <h2 className="text-2xl font-black mb-4">Starter</h2>
            <p className="text-4xl font-black mb-6">$5.99/mo</p>
            <button onClick={() => createCheckoutSession('STARTER')} className="w-full py-3 rounded-lg border-2 border-gray-700 font-bold">Get Started</button>
          </div>
          <div className="border-2 border-gray-600 rounded-xl p-8">
            <h2 className="text-2xl font-black mb-4">Pro</h2>
            <p className="text-4xl font-black mb-6">$9.99/mo</p>
            <button onClick={() => createCheckoutSession('PRO')} className="w-full py-3 rounded-lg bg-gray-700 font-bold">Upgrade</button>
          </div>
          <div className="border-2 border-gray-700 rounded-xl p-8">
            <h2 className="text-2xl font-black mb-4">Elite</h2>
            <p className="text-4xl font-black mb-6">$19.99/mo</p>
            <button onClick={() => createCheckoutSession('ELITE')} className="w-full py-3 rounded-lg border-2 border-gray-700 font-bold">Go Elite</button>
          </div>
        </div>
      </div>
    </div>
  )
}
