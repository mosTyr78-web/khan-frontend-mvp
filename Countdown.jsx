import { useState, useEffect } from 'react'

export default function Countdown({ workout, onStart, onBack }) {
  const [count, setCount] = useState(10)

  useEffect(() => {
    if (count <= 0) { onStart(); return }
    const timer = setTimeout(() => setCount(count - 1), 1000)
    return () => clearTimeout(timer)
  }, [count, onStart])

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center px-6 relative">
      <button onClick={onBack} className="absolute top-6 left-6 text-gray-400">←</button>
      <h2 className="text-3xl font-black mb-8">{workout.name}</h2>
      <p className="text-lg text-gray-400 mb-16 font-bold">Ready?</p>
      <div className="text-9xl font-black animate-pulse">{count > 0 ? count : 'GO'}</div>
    </div>
  )
}
