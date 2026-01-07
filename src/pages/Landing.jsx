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

  const skins = [
    { name: 'Goku', color: 'from-orange-500 to-yellow-500', unlock: '10 Force challenges', icon: '🔥' },
    { name: 'Vegeta', color: 'from-blue-600 to-blue-400', unlock: 'Titan (Force)', icon: '👑' },
    { name: 'Saitama', color: 'from-yellow-400 to-red-500', unlock: '1M reps', icon: '👊' },
    { name: 'Naruto', color: 'from-orange-400 to-red-400', unlock: '50 challenges', icon: '🍥' },
    { name: 'Flash', color: 'from-red-500 to-yellow-400', unlock: 'Ultra Runner', icon: '⚡' },
    { name: 'Rock Lee', color: 'from-green-500 to-emerald-400', unlock: '500 workouts', icon: '🥋' },
    { name: 'All Might', color: 'from-blue-500 to-red-500', unlock: 'LEGEND tier', icon: '💪' },
    { name: 'Broly', color: 'from-green-400 to-yellow-400', unlock: '100 ULTRA challenges', icon: '💚' }
  ];

  const programs = [
    {
      icon: '🔥',
      name: 'Standard',
      desc: 'Tous niveaux',
      features: ['Fat Loss Protocol', 'Upper Body', 'Lower Body', 'Cardio'],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: '🦸',
      name: 'Kids',
      desc: '6-12 ans',
      features: ['Super Hero Training', 'Animal Adventure', 'Ninja Training'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '💪👩',
      name: 'Mama Strong',
      desc: 'Femmes & Mamans',
      features: ['Core Recovery', 'Stroller Walks', 'Postpartum'],
      color: 'from-pink-500 to-purple-500'
    },
    {
      icon: '🦽',
      name: 'Accessible',
      desc: 'Mobilite adaptee',
      features: ['Seated Strength', 'Chair Cardio', 'Upper Body Only'],
      color: 'from-green-500 to-teal-500'
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
      {/* BETA Badge */}
      <div className="fixed top-4 left-4 z-50">
        <span className="px-3 py-1 bg-orange-500 rounded text-xs font-bold">BETA</span>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl">
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20">
              Tout se merite. Rien ne s'achete.
            </span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black mb-4 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 bg-clip-text text-transparent animate-pulse">
            KHAN
          </h1>
          <p className="text-2xl md:text-4xl font-bold text-white mb-2">
            AI FITNESS COACH
          </p>
          <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
            La seule app fitness ou les skins legendaires se debloquent par le merite.
            Goku, Vegeta, Flash... A toi de les meriter.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => goTo('home')}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-orange-500/30"
            >
              Commencer Maintenant
            </button>
            <button
              onClick={() => goTo('skins')}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-bold text-lg hover:bg-white/20 transition-all"
            >
              Voir les Skins
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

      {/* SKINS SHOWCASE - NEW SEXY SECTION */}
      <section className="px-6 py-20 bg-gradient-to-b from-black via-purple-900/20 to-black relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-400 text-sm font-bold border border-purple-500/30">
              DEBLOQUES PAR LE MERITE
            </span>
            <h2 className="text-5xl font-black mt-6 mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                SKINS LEGENDAIRES
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Inspire par tes heros preferes. Goku, Vegeta, Saitama, Naruto, Flash...
              Chaque skin se merite par l'effort. Aucun achat possible.
            </p>
          </div>

          {/* Skins Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skins.map((skin, i) => (
              <div
                key={i}
                className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all hover:scale-105 cursor-pointer overflow-hidden"
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${skin.color} opacity-0 group-hover:opacity-20 transition-opacity`} />

                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${skin.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  {skin.icon}
                </div>

                <h3 className="text-xl font-black">{skin.name}</h3>
                <p className="text-xs text-gray-500 mt-1">Theme</p>

                {/* Unlock condition */}
                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="text-xs text-gray-400">
                    <span className="text-green-400">🔓</span> {skin.unlock}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => goTo('skins')}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-bold hover:scale-105 transition-transform"
            >
              Voir les 20+ Skins
            </button>
          </div>
        </div>
      </section>

      {/* PROGRAMS SECTION - NEW */}
      <section className="px-6 py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="px-4 py-2 bg-green-500/20 rounded-full text-green-400 text-sm font-bold border border-green-500/30">
              POUR TOUS
            </span>
            <h2 className="text-5xl font-black mt-6 mb-4">
              Programmes <span className="text-green-500">Inclusifs</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Du fitness pour TOUT LE MONDE. Enfants, adultes, seniors, mamans,
              personnes a mobilite reduite. Zero discrimination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((prog, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${prog.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                  {prog.icon}
                </div>
                <h3 className="text-2xl font-black">{prog.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{prog.desc}</p>
                <ul className="space-y-2">
                  {prog.features.map((f, j) => (
                    <li key={j} className="text-sm text-gray-400 flex items-center gap-2">
                      <span className="text-green-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Inclusion Banner */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold mb-2">Politique d'Inclusion</h3>
                <p className="text-gray-400 text-sm">
                  Zero tolerance pour le racisme, sexisme, homophobie ou toute discrimination.
                  KHAN est un espace safe pour tous.
                </p>
              </div>
              <button
                onClick={() => goTo('about')}
                className="px-6 py-3 bg-white/10 rounded-full text-white font-bold hover:bg-white/20 transition-all whitespace-nowrap"
              >
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-gray-900">
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
      <section className="px-6 py-20 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-400 text-sm font-bold border border-purple-500/30">
                GAMIFICATION
              </span>
              <h2 className="text-4xl font-black mt-6 mb-4">
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

      {/* Merch Section - NEW */}
      <section className="px-6 py-20 bg-gradient-to-b from-black via-orange-900/10 to-black">
        <div className="max-w-6xl mx-auto text-center">
          <span className="px-4 py-2 bg-orange-500/20 rounded-full text-orange-400 text-sm font-bold border border-orange-500/30">
            RECOMPENSES PHYSIQUES
          </span>
          <h2 className="text-4xl font-black mt-6 mb-4">
            Merch a <span className="text-orange-500">Meriter</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            T-shirts, hoodies, medailles... Ces items physiques sont envoyes GRATUITEMENT
            quand tu atteins les objectifs. Impossible a acheter.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['👕 KHAN Warrior Tee', '🧥 Elite Fire Hoodie', '🏅 Iron Will Medal', '🎒 KHAN Gym Bag'].map((item, i) => (
              <div key={i} className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-sm">
                {item}
              </div>
            ))}
          </div>

          <button
            onClick={() => goTo('about')}
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-bold hover:scale-105 transition-transform"
          >
            Voir le Merch
          </button>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="px-6 py-20 bg-gray-900">
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
                {tier.legendary && <p className="text-xs text-orange-400 font-bold mb-1">👑 BEST</p>}
                {tier.popular && <p className="text-xs text-blue-400 font-bold mb-1">POPULAIRE</p>}
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
      <section className="px-6 py-20 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <span className="px-4 py-2 bg-blue-500/20 rounded-full text-blue-400 text-sm font-bold border border-blue-500/30">
            COACHING
          </span>
          <h2 className="text-4xl font-black mt-6 mb-4">
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
      <section className="px-6 py-20 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-purple-500/20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
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
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">KHAN</h3>
              <p className="text-gray-500 text-sm mt-2">AI Fitness Coach</p>
              <p className="text-gray-600 text-xs mt-1">Tout se merite. Rien ne s'achete.</p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold mb-3">App</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => goTo('home')} className="hover:text-white transition">Workouts</button></li>
                <li><button onClick={() => goTo('challenges')} className="hover:text-white transition">Challenges</button></li>
                <li><button onClick={() => goTo('progression')} className="hover:text-white transition">Progression</button></li>
                <li><button onClick={() => goTo('skins')} className="hover:text-white transition">Skins</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3">Coaching</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => goTo('coaches')} className="hover:text-white transition">Trouver un Coach</button></li>
                <li><button onClick={() => goTo('become-coach')} className="hover:text-white transition">Devenir Coach</button></li>
                <li><button onClick={() => goTo('pricing')} className="hover:text-white transition">Pricing</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => goTo('about')} className="hover:text-white transition">A Propos</button></li>
                <li><button onClick={() => goTo('about')} className="hover:text-white transition">CGU / RGPD</button></li>
                <li><a href="mailto:contact@khanfitness.app" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10">
            <div className="flex gap-4">
              <a href="https://www.instagram.com/johnkhanapp/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@khanthefitnessapp" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-black border border-white/20 flex items-center justify-center hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
              <a href="https://x.com/TheKhanfitness" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-black border border-white/20 flex items-center justify-center hover:scale-110 transition-transform">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@Johnkhanbash" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-500 text-sm">&copy; 2024-2025 KHAN Fitness. All rights reserved.</p>
              <p className="text-gray-600 text-xs mt-1">Made with 💪 for athletes worldwide</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
