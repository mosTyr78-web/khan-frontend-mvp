export default function Home({ workouts, onSelect, onPricing }) {
  return (
    <div className="h-screen w-screen bg-black text-white px-5 py-8 flex flex-col">
      {/* Logo Header */}
      <div className="text-center mb-12 pt-4">
        <h1 className="text-7xl font-black mb-2">KHAN</h1>
        <p className="text-base text-gray-400">Professional Fitness Coach</p>
      </div>

      {/* Workout Grid - 2 columns mobile style */}
      <div className="flex-1 grid grid-cols-1 gap-3 mb-6 overflow-y-auto">
        {workouts.map(w => (
          <button
            key={w.id}
            onClick={() => onSelect(w.id)}
            className="h-24 rounded-2xl border-2 border-gray-600 bg-gray-900/40 hover:border-gray-500 active:scale-95 flex flex-col justify-center px-4 py-3 text-left transition"
          >
            <p className="text-lg font-black">{w.name}</p>
            <p className="text-xs text-gray-400 mt-1">{w.difficulty} • {w.duration}min</p>
          </button>
        ))}
      </div>

      {/* Pricing Button - Bottom */}
      <button
        onClick={onPricing}
        className="w-full py-4 rounded-2xl bg-gray-700 hover:bg-gray-600 font-black active:scale-95"
      >
        Upgrade to Premium
      </button>
    </div>
  )
}
