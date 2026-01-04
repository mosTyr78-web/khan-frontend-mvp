import { useEffect } from 'react'

const getVideoForExercise = (exercise) => {
  const name = exercise.toLowerCase()
  if (name.includes('burpee')) return '/videos/burpees.mp4'
  if (name.includes('squat')) return '/videos/squat.mp4'
  if (name.includes('push') || name.includes('bench') || name.includes('press')) return '/videos/pushups.mp4'
  if (name.includes('sprint') || name.includes('run') || name.includes('jog') || name.includes('cardio') || name.includes('warm') || name.includes('cool')) return '/videos/run.mp4'
  if (name.includes('abs') || name.includes('crunch') || name.includes('plank') || name.includes('core')) return '/videos/abs.mp4'
  return '/videos/run.mp4'
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

  // Circular progress calculation
  const radius = 85
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (op / 100) * circumference

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-black/70 via-black/50 to-black/70 px-4 py-6 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={onExit} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/70 hover:bg-white/20 transition-all">
          ←
        </button>
        <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md">
          <span className="text-xs text-white/60">ROUND </span>
          <span className="text-sm font-bold text-white">{objIndex + 1}/{workout.objectives.length}</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-xs animate-pulse">
          {Math.round(tp)}%
        </div>
      </div>

      {/* Total Progress Bar */}
      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mb-6 backdrop-blur-sm">
        <div
          className="absolute h-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full transition-all duration-300"
          style={{width: tp + '%'}}
        />
        <div className="absolute h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">

        {/* Circular Video Container */}
        <div className="relative mb-6">
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-red-500 blur-2xl opacity-30 animate-pulse" />

          {/* SVG Circular Progress */}
          <svg className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)] -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="6"
            />
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-300"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="50%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>

          {/* Video */}
          <div className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
            <video
              key={obj.exercise}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-125"
            >
              <source src={getVideoForExercise(obj.exercise)} type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Timer */}
        <div className="text-7xl font-black text-white mb-2 tracking-tight" style={{textShadow: '0 0 40px rgba(249,115,22,0.5)'}}>
          {formatTime(tl)}
        </div>

        {/* Exercise Info Card */}
        <div className="w-full max-w-sm bg-white/10 backdrop-blur-xl rounded-3xl p-5 border border-white/20 shadow-2xl mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-2xl font-black text-white">{obj.exercise}</p>
              <p className="text-orange-400 font-semibold">{obj.reps}</p>
            </div>
            <div className="text-4xl">{workout.icon}</div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-3" />

          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-4 border border-orange-500/30">
            <p className="text-xl font-black text-white mb-1">{obj.command}</p>
            <p className="text-sm text-white/70">{obj.instruction}</p>
          </div>
        </div>

        {/* Action Button */}
        {!isCompleted ? (
          <button className="group relative px-16 py-5 rounded-2xl font-black text-xl text-white overflow-hidden transition-all active:scale-95">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2">
              🔥 PUSH IT
            </span>
          </button>
        ) : (
          <button onClick={onComplete} className="group relative px-16 py-5 rounded-2xl font-black text-xl text-white overflow-hidden transition-all active:scale-95">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2">
              ✨ COMPLETE
            </span>
          </button>
        )}
      </div>
    </div>
  )
}
