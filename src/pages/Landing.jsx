export default function Landing({ goTo }) {
  const features = [
    {
      icon: '💪',
      title: 'Workouts Guides',
      description: 'Videos HD pour chaque exercice. Timing parfait. Zero confusion.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: '🏆',
      title: 'Challenges Epiques',
      description: '5K Run, 100 Pushups, Marathon Prep... Des objectifs qui te poussent.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: '🌳',
      title: 'Arbre de Progression',
      description: 'Debloque des badges et skins en progressant. Objectifs sur 50 ans.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '🎨',
      title: 'Skins Exclusifs',
      description: 'Theme Goku, Vegeta, Flash... Debloques uniquement par le merite.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🏋️',
      title: 'Coachs Certifies',
      description: 'Trouve ton coach. Verifies LinkedIn/Instagram. Elite peut coacher.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '📊',
      title: 'Stats & XP',
      description: 'Suis ta progression. Accumule des XP. Grimpe le leaderboard.',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const tiers = [
    { name: 'FREE', price: 0, features: ['Workouts de base', 'Timer integre'] },
    { name: 'STARTER', price: 5.99, features: ['Workouts illimites', 'Stats de base'] },
    { name: 'PRO', price: 9.99, features: ['Challenges Pro', 'Progression tracking', 'Badges'], popular: true },
    { name: 'ELITE', price: 19.99, features: ['Challenges Elite', 'Peut coacher', 'Skins exclusifs'] },
    { name: 'ULTRA', price: 39.99, features: ['Challenges ULTRA', 'Coaching prioritaire'] },
    { name: 'LEGEND', price: 49.99, features: ['ACCES TOTAL', 'Tous skins', 'VIP'], legendary: true }
  ];

  return (
    <div className="min-h-screen w-screen bg-black text-white overflow-y-auto">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            KHAN
          </h1>
          <p className="text-2xl md:text-4xl font-bold text-white mb-2">
            AI FITNESS COACH
          </p>
          <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
            La seule app fitness ou tu debloques des recompenses uniquement par ton effort.
            Pas d'achats. Que du merite.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => goTo('home')}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-orange-500/30"
            >
              Commencer Maintenant
            </button>
            <button
              onClick={() => goTo('pricing')}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-bold text-lg hover:bg-white/20 transition-all"
            >
              Voir les Prix
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-4">
            Pourquoi <span className="text-orange-500">KHAN</span> ?
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Une app construite pour les vrais athletes. Pas de raccourcis. Pas de pay-to-win.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Progression Tree Preview */}
      <section className="px-6 py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black mb-4">
                Progression sur <span className="text-purple-500">50 ans</span>
              </h2>
              <p className="text-gray-400 mb-6">
                Du Marcheur Debutant au Roi de la Marche. Du Jogger au Flash Humain.
                Chaque kilometre compte. Chaque rep compte.
              </p>
              <ul className="space-y-3">
                {['5 arbres de progression (Marche, Course, Force, Cardio, Flex)', '27 niveaux a debloquer', 'Badges uniques par niveau', 'Skins app exclusifs (Goku, Vegeta, Flash...)'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-green-400">✓</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => goTo('progression')}
                className="mt-8 px-6 py-3 bg-purple-500 rounded-full text-white font-bold hover:bg-purple-600 transition-colors"
              >
                Voir l'Arbre
              </button>
            </div>
            <div className="relative">
              {/* Mock tree visualization */}
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-purple-500/30">
                <div className="space-y-4">
                  {['Marcheur Debutant', 'Randonneur', 'Explorateur', 'Globe-Trotter', 'Roi de la Marche'].map((level, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full ${i < 2 ? 'bg-green-500' : 'bg-gray-700'} flex items-center justify-center text-sm`}>
                        {i < 2 ? '✓' : i + 1}
                      </div>
                      <div className="flex-1">
                        <p className={`font-bold ${i < 2 ? 'text-white' : 'text-gray-500'}`}>{level}</p>
                        <div className="h-1 bg-gray-700 rounded-full mt-1">
                          <div
                            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                            style={{ width: i === 0 ? '100%' : i === 1 ? '60%' : '0%' }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="px-6 py-20 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-4">
            Choisis ton <span className="text-orange-500">Tier</span>
          </h2>
          <p className="text-gray-400 text-center mb-12">
            De FREE a LEGEND. Upgrade quand tu veux.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tiers.map((tier, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border ${
                  tier.legendary
                    ? 'border-orange-500 bg-gradient-to-b from-orange-500/20 to-red-500/20'
                    : tier.popular
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                <p className="text-sm font-bold text-gray-400">{tier.name}</p>
                <p className="text-2xl font-black mt-1">
                  ${tier.price}<span className="text-sm text-gray-500">/mo</span>
                </p>
                <ul className="mt-3 space-y-1">
                  {tier.features.slice(0, 2).map((f, j) => (
                    <li key={j} className="text-xs text-gray-400 flex items-center gap-1">
                      <span className="text-green-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => goTo('pricing')}
              className="px-8 py-3 bg-white/10 border border-white/20 rounded-full text-white font-bold hover:bg-white/20 transition-all"
            >
              Voir tous les details
            </button>
          </div>
        </div>
      </section>

      {/* Coach Section */}
      <section className="px-6 py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4">
            Deviens <span className="text-blue-500">Coach</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Tu es Elite ou plus? Tu peux coacher d'autres membres.
            Beta gratuite. 30% de reduction avec 50+ clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => goTo('coaches')}
              className="px-6 py-3 bg-blue-500 rounded-full text-white font-bold hover:bg-blue-600 transition-colors"
            >
              Trouver un Coach
            </button>
            <button
              onClick={() => goTo('become-coach')}
              className="px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white font-bold hover:bg-white/20 transition-all"
            >
              Devenir Coach
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-orange-500/20 to-red-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Pret a devenir une <span className="text-orange-500">Legende</span>?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Rejoins des milliers d'athletes qui se depassent chaque jour.
          </p>
          <button
            onClick={() => goTo('home')}
            className="px-10 py-5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-bold text-xl hover:scale-105 transition-transform shadow-lg shadow-orange-500/30"
          >
            Commencer Gratuitement
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-black border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-2xl font-black">KHAN</h3>
              <p className="text-gray-500 text-sm">AI Fitness Coach</p>
            </div>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/johnkhanapp/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <span>📸</span>
              </a>
              <a href="https://www.tiktok.com/@khanthefitnessapp" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <span>🎵</span>
              </a>
              <a href="https://x.com/TheKhanfitness" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <span>𝕏</span>
              </a>
              <a href="https://youtube.com/@khanfitness" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <span>▶️</span>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
            <p>&copy; 2024 KHAN Fitness. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
