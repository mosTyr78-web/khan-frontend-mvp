export default function Home({ workouts, onSelect, onPricing }) {
  return (
    <div className="h-screen w-screen bg-gradient-to-b from-black to-gray-900 px-4 py-8 overflow-y-auto flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-start pt-8">
        <h1 className="text-6xl font-black mb-2">KHAN</h1>
        <p className="text-gray-400 mb-12">Professional Fitness Coach</p>
        
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
