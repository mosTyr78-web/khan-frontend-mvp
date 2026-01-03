import { useEffect } from 'react'

export default function WorkoutActive({ workoutId, workouts, sessionTime, setSessionTime, sessionActive, setSessionActive, onComplete, onExit }) {
  const w = workouts.find(x => x.id === workoutId)

  useEffect(() => {
    if (!sessionActive) return
    const timer = setTimeout(() => setSessionTime(sessionTime + 1), 1000)
    return () => clearTimeout(timer)
  }, [sessionTime, sessionActive])

  const getTotalDuration = () => w.objectives.reduce((sum, obj) => sum + obj.duration, 0)
  const td = getTotalDuration()

  let cumTime = 0, objIndex = 0
  for (let i = 0; i < w.objectives.length; i++) {
    cumTime += w.objectives[i].duration
    if (sessionTime < cumTime) { objIndex = i; break }
  }

  cumTime = 0
  let timeIntoObj = 0
  for (let i = 0; i < w.objectives.length; i++) {
    if (sessionTime < cumTime + w.objectives[i].duration) { timeIntoObj = sessionTime - cumTime; break }
    cumTime += w.objectives[i].duration
  }

  const obj = w.objectives[objIndex]
  const tp = Math.min(100, (sessionTime / td) * 100)
  const op = Math.min(100, (timeIntoObj / obj.duration) * 100)
  const tl = obj.duration - timeIntoObj
  const isCompleted = sessionTime >= td

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return m + ':' + (sec < 10 ? '0' : '') + sec
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 px-6 py-8 flex flex-col overflow-y-auto">
      <button onClick={onExit} className="text-gray-400 self-start mb-4 hover:text-white">← Exit</button>
      <div className="text-center mb-8">
        <p className="text-gray-400 text-sm mb-2">TOTAL TIME</p>
        <p className="text-5xl font-black">{formatTime(sessionTime)} / {formatTime(td)}</p>
        <div className="w-full bg-gray-800 rounded-full h-2 mt-3"><div className="bg-gray-600 h-full" style={{width: tp + '%'}}></div></div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 max-w-3xl mx-auto">
        <div className="text-6xl font-black">{formatTime(tl)}</div>
        <div className="text-3xl font-black">{obj.exercise}</div>
        <div className="border-2 border-gray-600 rounded-xl p-8 bg-gray-900/50 w-full text-center">
          <p className="text-4xl font-black">{obj.command}</p>
          <p className="text-xl text-gray-300 mt-4">{obj.instruction}</p>
        </div>
        {!isCompleted ? <button onClick={() => {}} className="px-16 py-6 rounded-xl font-black text-2xl bg-gray-700">PUSH</button> : <button onClick={onComplete} className="px-16 py-6 rounded-xl font-black text-2xl bg-gray-600">COMPLETE</button>}
      </div>
    </div>
  )
}
