import { useEffect } from 'react'

export default function WorkoutActive({ workout, sessionTime, setSessionTime, sessionActive, setSessionActive, onComplete, onExit }) {
  useEffect(() => {
    if (!sessionActive) return
    const timer = setInterval(() => setSessionTime(t => t + 1), 1000)
    return () => clearInterval(timer)
  }, [sessionActive, setSessionTime])

  const getTotalDuration = () => workout.objectives.reduce((s, o) => s + o.duration, 0)
  const td = getTotalDuration()

  let cumTime = 0, objIndex = 0
  for (let i = 0; i < workout.objectives.length; i++) {
    cumTime += workout.objectives[i].duration
    if (sessionTime < cumTime) { objIndex = i; break }
  }

  cumTime = 0
  let timeIntoObj = 0
  for (let i = 0; i < workout.objectives.length; i++) {
    if (sessionTime < cumTime + workout.objectives[i].duration) { timeIntoObj = sessionTime - cumTime; break }
    cumTime += workout.objectives[i].duration
  }

  const obj = workout.objectives[objIndex]
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
    <div className="h-screen w-screen bg-black text-white px-5 py-6 flex flex-col">
      <button onClick={onExit} className="text-gray-400 mb-4">← Exit</button>
      
      <div className="text-center mb-6">
        <p className="text-xs text-gray-500 uppercase mb-2">0:03 / 14:00</p>
        <p className="text-5xl font-black">{formatTime(sessionTime)} / {formatTime(td)}</p>
        <div className="w-full bg-gray-800 rounded-full h-2 mt-3 overflow-hidden">
          <div className="bg-gray-600 h-full" style={{width: tp + '%'}}></div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        <p className="text-6xl font-black">{formatTime(tl)}</p>
        <p className="text-2xl font-black text-center">{obj.exercise}</p>
        <p className="text-gray-400 text-sm">{obj.reps}</p>

        <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
          <div className="bg-gray-600 h-full" style={{width: op + '%'}}></div>
        </div>

        <div className="border-4 border-gray-500 rounded-2xl p-6 bg-gray-900 w-full text-center space-y-2">
          <p className="text-3xl font-black">{obj.command}</p>
          <p className="text-sm text-gray-300">{obj.instruction}</p>
        </div>

        {!isCompleted ? (
          <button className="px-12 py-4 rounded-lg bg-gray-700 font-black">PUSH</button>
        ) : (
          <button onClick={onComplete} className="px-12 py-4 rounded-lg bg-gray-700 font-black">COMPLETE</button>
        )}
      </div>
    </div>
  )
}
