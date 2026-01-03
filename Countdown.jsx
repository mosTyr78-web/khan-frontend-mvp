import { useEffect } from 'react'

export default function Countdown({ workoutId, workouts, countdownValue, setCountdownValue, onStart, onBack }) {
  const w = workouts.find(x => x.id === workoutId)

  useEffect(() => {
    if (countdownValue <= 0) {
      onStart()
      return
    }
    const timer = setTimeout(() => setCountdownValue(countdownValue - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdownValue])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex flex-col items-center justify-center px-6">
      <button onClick={onBack} className="absolute top-6 left-6 text-gray-400 hover:text-white">← Back</button>
      <div className="text-center space-y-12">
        <h1 className="text-5xl font-black">{w.name}</h1>
        <p className="text-3xl text-gray-400 font-bold">Ready?</p>
        <div className="relative">
          <div className="absolute inset-0 bg-gray-700 blur-3xl opacity-30"></div>
          <div className="relative text-9xl font-black text-white animate-pulse">{countdownValue > 0 ? countdownValue : 'GO'}</div>
        </div>
      </div>
    </div>
  )
}
