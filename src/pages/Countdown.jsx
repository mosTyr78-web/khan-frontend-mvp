import { useState, useEffect } from 'react'

export default function Countdown({ workout, onStart, onBack }) {
  const [count, setCount] = useState(10)

  useEffect(() => {
    if (count <= 0) {
      onStart()
      return
    }
    const timer = setTimeout(() => setCount(count - 1), 1000)
    return () => clearTimeout(timer)
  }, [count, onStart])

  return (
    <div className="h-screen w-screen bg-black/50 flex flex-col items-center justify-center px-4">
      <button onClick={onBack} className="absolute top-6 left-6 text-gray-400">←</button>
      <h1 className="text-4xl font-black mb-8">{workout.name}</h1>
      <p className="text-xl text-gray-400 mb-12">Ready?</p>
      <div className="text-9xl font-black text-white animate-pulse">{count > 0 ? count : 'GO'}</div>
    </div>
  )
}
