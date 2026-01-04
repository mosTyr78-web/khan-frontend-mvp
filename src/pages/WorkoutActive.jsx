import { useEffect } from 'react'

const getVideoForExercise = (exercise) => {
  const name = exercise.toLowerCase()
  if (name.includes('burpee')) return '/videos/burpees.mp4'
  if (name.includes('squat')) return '/videos/squat.mp4'
  if (name.includes('push') || name.includes('bench') || name.includes('press')) return '/videos/pushups.mp4'
  if (name.includes('sprint') || name.includes('run') || name.includes('jog') || name.includes('cardio') || name.includes('warm') || name.includes('cool')) return '/videos/run.mp4'
  if (name.includes('abs') || name.includes('crunch') || name.includes('plank') || name.includes('core')) return '/videos/abs.mp4'
  return '/videos/run.mp4' // default
}

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
    <div className="h-screen w-screen bg-black/50 px-4 py-6 flex flex-col overflow-hidden">
      <button onClick={onExit} className="text-gray-400 mb-4">← Exit</button>
      
      <div className="text-center mb-6">
        <p className="text-xs text-gray-400 mb-1">TOTAL</p>
        <p className="text-4xl font-black">{formatTime(sessionTime)} / {formatTime(td)}</p>
        <div className="w-full bg-gray-800 rounded-full h-2 mt-3 overflow-hidden">
          <div className="bg-gray-600 h-full" style={{width: tp + '%'}}></div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
        <p className="text-5xl font-black">{formatTime(tl)}</p>

        <div className="w-40 h-40 rounded-2xl overflow-hidden bg-black/50">
          <video
            key={obj.exercise}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={getVideoForExercise(obj.exercise)} type="video/mp4" />
          </video>
        </div>

        <div className="text-center">
          <p className="text-2xl font-black">{obj.exercise}</p>
          <p className="text-gray-400">{obj.reps}</p>
        </div>

        <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
          <div className="bg-gray-600 h-full" style={{width: op + '%'}}></div>
        </div>

        <div className="border-4 border-gray-500 rounded-2xl p-4 bg-gray-900/50 w-full text-center">
          <p className="text-2xl font-black text-gray-200">{obj.command}</p>
          <p className="text-sm text-gray-300">{obj.instruction}</p>
        </div>

        {!isCompleted ? <button onClick={() => {}} className="px-12 py-4 rounded-xl font-black text-xl bg-gray-700 active:scale-95">PUSH</button> : <button onClick={onComplete} className="px-12 py-4 rounded-xl font-black text-xl bg-gray-600 active:scale-95">DONE</button>}
      </div>
    </div>
  )
}
