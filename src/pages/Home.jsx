export default function Home({ workouts, onSelect, onPricing, onChallenges, userTier }) {
  return (
    <div className="h-screen w-screen bg-black/50 px-4 py-8 overflow-y-auto flex flex-col">
      {/* User Tier Badge */}
      {userTier && (
        <div className="flex justify-center mb-4">
          <div className={`px-4 py-1 rounded-full text-xs font-bold ${
            userTier === 'elite'
              ? 'bg-gradient-to-r from-yellow-500 to-amber-500'
              : 'bg-gradient-to-r from-blue-500 to-cyan-500'
          }`}>
            {userTier.toUpperCase()} MEMBER
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-start pt-4">
        <h1 className="text-6xl font-black mb-2">KHAN</h1>
        <p className="text-gray-400 mb-8">Professional Fitness Coach</p>

        {/* Challenges Button */}
        <button
          onClick={onChallenges}
          className="w-full max-w-sm mb-6 p-4 rounded-2xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-500/50 hover:border-orange-500 text-left active:scale-95 transition"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl font-black text-orange-400">CHALLENGES</p>
              <p className="text-xs text-gray-400">5K • Pushups • Squats & more</p>
            </div>
            <p className="text-3xl">🏆</p>
          </div>
        </button>

        <div className="w-full max-w-sm space-y-3">
          {workouts.map(w => (
            <button key={w.id} onClick={() => onSelect(w.id)} className="w-full p-4 rounded-2xl border-2 border-gray-700 hover:border-gray-500 bg-gray-900/50 text-left active:scale-95 transition">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-black">{w.name}</p>
                  <p className="text-xs text-gray-400">{w.difficulty} • {w.duration}min</p>
                </div>
                <p className="text-3xl">{w.icon}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <button onClick={onPricing} className="w-full py-4 rounded-2xl bg-gray-800 hover:bg-gray-700 font-black active:scale-95 transition">View Pricing</button>
    </div>
  )
}
