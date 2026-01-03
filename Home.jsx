export default function Home({ workouts, onSelectWorkout, onPricing }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-7xl font-black mb-4">KHAN</h1>
          <p className="text-xl text-gray-400">Professional Fitness Coach</p>
        </div>

        <div className="space-y-4 mb-12">
          {workouts.map(w => (
            <button
              key={w.id}
              onClick={() => onSelectWorkout(w.id)}
              className="w-full p-6 rounded-xl border-2 border-gray-700 hover:border-gray-500 bg-gray-900/50 transition text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-black">{w.name}</p>
                  <p className="text-sm text-gray-400 mt-2">{w.difficulty} • {w.duration}min</p>
                </div>
                <p className="text-3xl">{w.icon}</p>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={onPricing}
          className="w-full py-4 rounded-xl bg-gray-800 hover:bg-gray-700 font-black text-lg transition"
        >
          View Pricing
        </button>
      </div>
    </div>
  )
}
