import { useState } from 'react'

export default function Home({ workouts, onSelect, onPricing, onChallenges, onLogin, userTier, isLoggedIn, goTo }) {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Tous', icon: '🏠' },
    { id: 'standard', name: 'Standard', icon: '🔥' },
    { id: 'kids', name: 'Kids', icon: '🦸' },
    { id: 'mama', name: 'Mama Strong', icon: '💪👩' },
    { id: 'accessible', name: 'Accessible', icon: '🦽' }
  ]

  const filteredWorkouts = selectedCategory === 'all'
    ? workouts
    : workouts.filter(w => w.category === selectedCategory)

  const tierColors = {
    FREE: 'bg-white/20',
    STARTER: 'bg-gray-500',
    PRO: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    ELITE: 'bg-gradient-to-r from-purple-500 to-pink-500',
    ULTRA: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    LEGEND: 'bg-gradient-to-r from-red-500 to-orange-500'
  }

  return (
    <div className="h-screen w-screen bg-black/50 px-4 py-6 overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        {/* User Tier Badge or Login */}
        {isLoggedIn ? (
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${tierColors[userTier] || tierColors.FREE}`}>
            {userTier === 'LEGEND' && '👑 '}{userTier || 'FREE'}
          </div>
        ) : (
          <div className="w-16" />
        )}

        <h1 className="text-3xl font-black">KHAN</h1>

        {!isLoggedIn ? (
          <button
            onClick={onLogin}
            className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-500 to-red-500"
          >
            LOGIN
          </button>
        ) : (
          <button
            onClick={() => goTo && goTo('coach-dashboard')}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-sm font-bold"
          >
            👤
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-start">
        <p className="text-gray-400 mb-6">Professional Fitness Coach</p>

        {/* New Feature Buttons Row */}
        <div className="w-full max-w-sm grid grid-cols-2 gap-3 mb-4">
          {/* Progression Tree */}
          <button
            onClick={() => goTo && goTo('progression')}
            className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50 hover:border-purple-500 text-left active:scale-95 transition"
          >
            <div className="flex flex-col">
              <p className="text-2xl mb-1">🌳</p>
              <p className="text-sm font-black text-purple-400">PROGRESSION</p>
              <p className="text-xs text-gray-400">Badges & XP</p>
            </div>
          </button>

          {/* Skins */}
          <button
            onClick={() => goTo && goTo('skins')}
            className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-500/50 hover:border-orange-500 text-left active:scale-95 transition"
          >
            <div className="flex flex-col">
              <p className="text-2xl mb-1">🎨</p>
              <p className="text-sm font-black text-orange-400">SKINS</p>
              <p className="text-xs text-gray-400">Goku, Vegeta...</p>
            </div>
          </button>

          {/* Coaches */}
          <button
            onClick={() => goTo && goTo('coaches')}
            className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/50 hover:border-blue-500 text-left active:scale-95 transition"
          >
            <div className="flex flex-col">
              <p className="text-2xl mb-1">🏋️</p>
              <p className="text-sm font-black text-blue-400">COACHS</p>
              <p className="text-xs text-gray-400">Trouve ton coach</p>
            </div>
          </button>

          {/* Shop - Amazon Partner */}
          <button
            onClick={() => goTo && goTo('shop')}
            className="p-4 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 hover:border-green-500 text-left active:scale-95 transition"
          >
            <div className="flex flex-col">
              <p className="text-2xl mb-1">🛒</p>
              <p className="text-sm font-black text-green-400">SHOP</p>
              <p className="text-xs text-gray-400">Gear & Equipment</p>
            </div>
          </button>
        </div>

        {/* Challenges Button */}
        <button
          onClick={onChallenges}
          className="w-full max-w-sm mb-4 p-4 rounded-2xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-500/50 hover:border-orange-500 text-left active:scale-95 transition"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl font-black text-orange-400">CHALLENGES</p>
              <p className="text-xs text-gray-400">5K • Pushups • Squats & more</p>
            </div>
            <p className="text-3xl">🏆</p>
          </div>
        </button>

        {/* Category Filter */}
        <div className="w-full max-w-sm mb-4 flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex-shrink-0 px-3 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Workouts List */}
        <div className="w-full max-w-sm space-y-3">
          {filteredWorkouts.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Aucun workout dans cette categorie</p>
          ) : (
            filteredWorkouts.map(w => (
              <button key={w.id} onClick={() => onSelect(w.id)} className="w-full p-4 rounded-2xl border-2 border-gray-700 hover:border-gray-500 bg-gray-900/50 text-left active:scale-95 transition">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xl font-black">{w.name}</p>
                    <p className="text-xs text-gray-400">{w.difficulty} • {w.duration}min</p>
                  </div>
                  <p className="text-3xl">{w.icon}</p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="space-y-4 mt-4">
        <button onClick={onPricing} className="w-full py-4 rounded-2xl bg-gray-800 hover:bg-gray-700 font-black active:scale-95 transition">
          View Pricing
        </button>

        {/* Social Links Footer */}
        <div className="text-center">
          <p className="text-xs text-white/40 mb-3">Follow KHAN</p>
          <div className="flex justify-center gap-4">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/johnkhanapp/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center hover:scale-110 transition-transform"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@khanthefitnessapp"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-black border border-white/20 flex items-center justify-center hover:scale-110 transition-transform"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
            </a>

            {/* Twitter/X */}
            <a
              href="https://x.com/TheKhanfitness"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-black border border-white/20 flex items-center justify-center hover:scale-110 transition-transform"
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@Johnkhanbash"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:scale-110 transition-transform"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
