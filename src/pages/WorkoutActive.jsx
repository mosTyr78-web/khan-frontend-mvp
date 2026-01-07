import { useState, useEffect } from 'react'

// Exercise images (replace with Midjourney generated images)
const EXERCISE_IMAGES = {
  pushups: '/images/exercises/pushups.png',
  squats: '/images/exercises/squats.png',
  burpees: '/images/exercises/burpees.png',
  plank: '/images/exercises/plank.png',
  lunges: '/images/exercises/lunges.png',
  mountain_climbers: '/images/exercises/mountain-climbers.png',
  jumping_jacks: '/images/exercises/jumping-jacks.png',
  crunches: '/images/exercises/crunches.png',
  default: '/images/exercises/default.png'
}

const getExerciseImage = (exercise) => {
  const name = exercise.toLowerCase()
  if (name.includes('push')) return EXERCISE_IMAGES.pushups
  if (name.includes('squat')) return EXERCISE_IMAGES.squats
  if (name.includes('burpee')) return EXERCISE_IMAGES.burpees
  if (name.includes('plank')) return EXERCISE_IMAGES.plank
  if (name.includes('lunge')) return EXERCISE_IMAGES.lunges
  if (name.includes('mountain') || name.includes('climber')) return EXERCISE_IMAGES.mountain_climbers
  if (name.includes('jump') || name.includes('jack')) return EXERCISE_IMAGES.jumping_jacks
  if (name.includes('crunch') || name.includes('abs') || name.includes('sit')) return EXERCISE_IMAGES.crunches
  return EXERCISE_IMAGES.default
}

const getVideoForExercise = (exercise) => {
  const name = exercise.toLowerCase()
  if (name.includes('burpee')) return '/videos/burpees.mp4'
  if (name.includes('squat')) return '/videos/squat.mp4'
  if (name.includes('push') || name.includes('bench') || name.includes('press')) return '/videos/pushups.mp4'
  if (name.includes('sprint') || name.includes('run') || name.includes('jog')) return '/videos/run.mp4'
  if (name.includes('abs') || name.includes('crunch') || name.includes('plank')) return '/videos/abs.mp4'
  return '/videos/run.mp4'
}

export default function WorkoutActive({ workout, sessionTime, setSessionTime, sessionActive, setSessionActive, onComplete, onExit }) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [currentRep, setCurrentRep] = useState(0)
  const [showCoachVideo, setShowCoachVideo] = useState(false)
  const [isResting, setIsResting] = useState(false)
  const [restTime, setRestTime] = useState(0)
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false)
  const [particles, setParticles] = useState([])

  const exercises = workout.objectives || []
  const currentExercise = exercises[currentExerciseIndex] || {}
  const totalExercises = exercises.length
  const targetReps = parseInt(currentExercise.reps) || 20

  // Timer effect
  useEffect(() => {
    if (!sessionActive) return
    const timer = setInterval(() => setSessionTime(t => t + 1), 1000)
    return () => clearInterval(timer)
  }, [sessionActive, setSessionTime])

  // Rest timer
  useEffect(() => {
    if (!isResting || restTime <= 0) return
    const timer = setInterval(() => {
      setRestTime(t => {
        if (t <= 1) {
          setIsResting(false)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [isResting, restTime])

  // Spawn particles on rep complete
  const spawnParticles = () => {
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      emoji: ['🔥', '⚡', '💪', '✨', '🎯'][Math.floor(Math.random() * 5)]
    }))
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 1000)
  }

  const handleRepComplete = () => {
    if (currentRep < targetReps) {
      setCurrentRep(prev => prev + 1)
      if (currentRep + 1 >= targetReps) {
        spawnParticles()
      }
    }
  }

  const handleExerciseComplete = () => {
    setShowCompletionAnimation(true)
    spawnParticles()

    setTimeout(() => {
      setShowCompletionAnimation(false)
      if (currentExerciseIndex < totalExercises - 1) {
        setCurrentExerciseIndex(prev => prev + 1)
        setCurrentRep(0)
        setIsResting(true)
        setRestTime(30)
      } else {
        onComplete()
      }
    }, 800)
  }

  const handlePrevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1)
      setCurrentRep(0)
    }
  }

  const handleNextExercise = () => {
    if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex(prev => prev + 1)
      setCurrentRep(0)
    }
  }

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const progressPercent = ((currentExerciseIndex + 1) / totalExercises) * 100

  // Rest Screen
  if (isResting) {
    return (
      <div className="h-screen w-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
        </div>

        <div className="relative z-10 text-center">
          <p className="text-blue-400 text-xl font-bold mb-4 tracking-widest">REST TIME</p>
          <div className="text-[120px] font-black text-white leading-none mb-8" style={{ textShadow: '0 0 60px rgba(59,130,246,0.5)' }}>
            {restTime}
          </div>
          <p className="text-gray-400 text-lg mb-8">Next: <span className="text-white font-bold">{exercises[currentExerciseIndex + 1]?.exercise || 'Finish'}</span></p>

          <button
            onClick={() => { setIsResting(false); setRestTime(0) }}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl font-bold text-white text-lg active:scale-95 transition-transform"
          >
            SKIP REST →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col relative overflow-hidden">

      {/* Floating particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute text-3xl animate-ping pointer-events-none z-50"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          {p.emoji}
        </div>
      ))}

      {/* Completion flash */}
      {showCompletionAnimation && (
        <div className="absolute inset-0 bg-green-500/30 z-40 animate-pulse" />
      )}

      {/* Header */}
      <div className="relative z-10 p-4">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onExit}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-xl hover:bg-white/20 transition-all"
          >
            ←
          </button>

          <div className="text-center">
            <p className="text-white/60 text-xs font-medium tracking-wider">EXERCISES</p>
            <p className="text-white font-black text-lg">{currentExerciseIndex + 1}/{totalExercises}</p>
          </div>

          {/* Coach Video Button */}
          <button
            onClick={() => setShowCoachVideo(true)}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/30 hover:scale-110 transition-transform"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Exercise Card */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-2">

        {/* Exercise Image Container */}
        <div className="relative w-full max-w-sm mb-6">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-transparent rounded-3xl blur-2xl" />

          <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
            {/* Exercise illustration */}
            <div className="relative aspect-[4/3] bg-gradient-to-b from-gray-100 to-white flex items-center justify-center p-6">
              <img
                src={getExerciseImage(currentExercise.exercise)}
                alt={currentExercise.exercise}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              {/* Fallback emoji display */}
              <div className="hidden text-[100px] items-center justify-center">
                {workout.icon || '💪'}
              </div>

              {/* Form guide dots overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Exercise Name & Reps */}
        <div className="text-center mb-6">
          <h2 className="text-white text-2xl font-black uppercase tracking-wide mb-2">
            {currentExercise.exercise}
          </h2>

          {/* Rep Counter */}
          <div
            className="cursor-pointer select-none"
            onClick={handleRepComplete}
          >
            <span className="text-7xl font-black bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              {currentRep}
            </span>
            <span className="text-4xl font-bold text-white/40">/{targetReps}</span>
          </div>

          <p className="text-white/50 text-sm mt-2">Tap to count reps</p>
        </div>

        {/* Coach Tip */}
        {currentExercise.instruction && (
          <div className="w-full max-w-sm bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-sm">💡</span>
              </div>
              <div>
                <p className="text-orange-400 text-xs font-bold mb-1">COACH TIP</p>
                <p className="text-white/80 text-sm">{currentExercise.instruction}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="relative z-10 p-4 pb-8">
        <div className="flex items-center justify-between gap-4">
          {/* Previous */}
          <button
            onClick={handlePrevExercise}
            disabled={currentExerciseIndex === 0}
            className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all ${
              currentExerciseIndex === 0
                ? 'bg-white/5 text-white/20'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            ‹
          </button>

          {/* Complete/Done Button */}
          <button
            onClick={handleExerciseComplete}
            disabled={currentRep < targetReps}
            className={`flex-1 py-4 rounded-2xl font-black text-lg transition-all active:scale-95 ${
              currentRep >= targetReps
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30'
                : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              {currentRep >= targetReps ? (
                <>✓ DONE</>
              ) : (
                <>↻ {targetReps - currentRep} LEFT</>
              )}
            </span>
          </button>

          {/* Next */}
          <button
            onClick={handleNextExercise}
            disabled={currentExerciseIndex === totalExercises - 1}
            className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all ${
              currentExerciseIndex === totalExercises - 1
                ? 'bg-white/5 text-white/20'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            ›
          </button>
        </div>

        {/* Session Timer */}
        <div className="text-center mt-4">
          <p className="text-white/40 text-xs">Session Time</p>
          <p className="text-white/60 font-mono text-lg">{formatTime(sessionTime)}</p>
        </div>
      </div>

      {/* Coach Video Modal */}
      {showCoachVideo && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowCoachVideo(false)}
        >
          <div
            className="relative w-full max-w-lg bg-gray-900 rounded-3xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setShowCoachVideo(false)}
                className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white text-xl"
              >
                ×
              </button>
            </div>

            <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500">
              <h3 className="text-white font-black text-xl">COACH TIPS</h3>
              <p className="text-white/80 text-sm">{currentExercise.exercise}</p>
            </div>

            <div className="aspect-video bg-black">
              <video
                autoPlay
                loop
                controls
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={getVideoForExercise(currentExercise.exercise)} type="video/mp4" />
              </video>
            </div>

            <div className="p-4">
              <p className="text-white font-bold mb-2">{currentExercise.command}</p>
              <p className="text-gray-400 text-sm">{currentExercise.instruction}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
