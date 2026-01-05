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

const tiers = [
  {
    id: 'STARTER',
    name: 'Starter',
    price: 5.99,
    features: ['Workouts illimites', 'Stats de base', 'Timer integre'],
    color: 'border-gray-600',
    bg: 'bg-gray-800/30',
    buttonStyle: 'bg-gray-700'
  },
  {
    id: 'PRO',
    name: 'Pro',
    price: 9.99,
    popular: true,
    features: ['Tout Starter +', 'Challenges Pro', 'Progression tracking', 'Badges a debloquer'],
    color: 'border-blue-500',
    bg: 'bg-blue-500/10',
    buttonStyle: 'bg-gradient-to-r from-blue-500 to-cyan-500'
  },
  {
    id: 'ELITE',
    name: 'Elite',
    price: 19.99,
    features: ['Tout Pro +', 'Challenges Elite', 'Peut devenir coach', 'Skins exclusifs', 'Support prioritaire'],
    color: 'border-purple-500',
    bg: 'bg-purple-500/10',
    buttonStyle: 'bg-gradient-to-r from-purple-500 to-pink-500'
  },
  {
    id: 'ULTRA',
    name: 'Ultra',
    price: 39.99,
    features: ['Tout Elite +', 'Challenges ULTRA', 'Skins ultra-rares', 'Coaching prioritaire', 'Badges exclusifs'],
    color: 'border-yellow-500',
    bg: 'bg-yellow-500/10',
    buttonStyle: 'bg-gradient-to-r from-yellow-500 to-orange-500'
  },
  {
    id: 'LEGEND',
    name: 'Legend',
    price: 49.99,
    legendary: true,
    features: ['ACCES TOTAL', 'Tous les challenges', 'Tous les skins', 'Coaching VIP', 'Badge Legend', 'Early access'],
    color: 'border-orange-500 border-2',
    bg: 'bg-gradient-to-br from-orange-500/20 to-red-500/20',
    buttonStyle: 'bg-gradient-to-r from-orange-500 to-red-600'
  }
];

export default function Pricing({ onBack, currentTier }) {
  return (
    <div className="min-h-screen w-screen bg-black/90 px-4 py-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-white text-2xl">←</button>
        <h1 className="text-white font-bold text-xl">Abonnements</h1>
        <div className="w-8" />
      </div>

      {/* Current tier */}
      {currentTier && currentTier !== 'FREE' && (
        <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-3 mb-6 text-center">
          <p className="text-green-400 text-sm">
            Tu es actuellement <span className="font-bold">{currentTier}</span>
          </p>
        </div>
      )}

      {/* Tiers */}
      <div className="space-y-4 pb-8">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={`relative rounded-2xl p-5 ${tier.bg} border ${tier.color} overflow-hidden`}
          >
            {/* Popular badge */}
            {tier.popular && (
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                POPULAIRE
              </div>
            )}

            {/* Legendary badge */}
            {tier.legendary && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1">
                <span>👑</span> LEGENDAIRE
              </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-white text-xl font-black">{tier.name}</h2>
                <p className="text-white text-3xl font-black">
                  ${tier.price}
                  <span className="text-gray-500 text-sm font-normal">/mois</span>
                </p>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-2 mb-4">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                  <span className="text-green-400">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Button */}
            <button
              onClick={() => createCheckoutSession(tier.id)}
              disabled={currentTier === tier.id}
              className={`w-full py-3 rounded-xl font-bold text-white transition-all active:scale-95 ${tier.buttonStyle} ${
                currentTier === tier.id ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {currentTier === tier.id ? 'Plan actuel' : 'Choisir ' + tier.name}
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center pb-8">
        <p className="text-gray-500 text-xs">
          Annulable a tout moment. Facturation mensuelle.
        </p>
        <p className="text-gray-600 text-xs mt-2">
          Paiement securise par Stripe
        </p>
      </div>
    </div>
  )
}
