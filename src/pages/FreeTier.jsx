import { useState } from 'react'

// Free workouts available to FREE tier
const FREE_WORKOUTS = [
  {
    id: 'free-1',
    name: 'Beginner Full Body',
    duration: 15,
    difficulty: 'Easy',
    icon: '🏃',
    locked: false,
    objectives: [
      { exercise: 'Warm-up', reps: '2 min', duration: 120, command: 'Start', instruction: 'Light movement', details: 'Easy pace' },
      { exercise: 'Squats', reps: '10x', duration: 60, command: 'Go', instruction: 'Basic squats', details: 'Keep form' },
      { exercise: 'Push-ups', reps: '5x', duration: 45, command: 'Push', instruction: 'Modified ok', details: 'On knees if needed' },
      { exercise: 'Plank', reps: '20 sec', duration: 20, command: 'Hold', instruction: 'Core tight', details: 'Breathe' },
      { exercise: 'Cool Down', reps: '2 min', duration: 120, command: 'Done', instruction: 'Stretch', details: 'Well done!' }
    ]
  },
  {
    id: 'free-2',
    name: 'Morning Stretch',
    duration: 10,
    difficulty: 'Easy',
    icon: '🌅',
    locked: false,
    objectives: [
      { exercise: 'Neck Rolls', reps: '30 sec', duration: 30, command: 'Relax', instruction: 'Gentle circles', details: 'Both ways' },
      { exercise: 'Arm Circles', reps: '30 sec', duration: 30, command: 'Circle', instruction: 'Big circles', details: 'Loosen up' },
      { exercise: 'Toe Touch', reps: '30 sec', duration: 30, command: 'Reach', instruction: 'Bend forward', details: 'Dont force' },
      { exercise: 'Cat-Cow', reps: '1 min', duration: 60, command: 'Flow', instruction: 'Arch and round', details: 'Breathe' },
      { exercise: 'Final Stretch', reps: '2 min', duration: 120, command: 'Finish', instruction: 'Full body', details: 'Great start!' }
    ]
  },
  {
    id: 'free-3',
    name: 'Quick Cardio Burst',
    duration: 10,
    difficulty: 'Medium',
    icon: '💨',
    locked: false,
    objectives: [
      { exercise: 'Jumping Jacks', reps: '30 sec', duration: 30, command: 'Jump', instruction: 'Full extension', details: 'Keep rhythm' },
      { exercise: 'High Knees', reps: '30 sec', duration: 30, command: 'Knees up', instruction: 'Quick feet', details: 'Stay light' },
      { exercise: 'Rest', reps: '15 sec', duration: 15, command: 'Breathe', instruction: 'Catch breath', details: 'Almost there' },
      { exercise: 'Burpees', reps: '5x', duration: 45, command: 'Explode', instruction: 'Full burpees', details: 'Give it all' },
      { exercise: 'Cool Down', reps: '1 min', duration: 60, command: 'Done', instruction: 'Walk it off', details: 'Nice work!' }
    ]
  }
]

// Locked premium workouts (teasers)
const LOCKED_WORKOUTS = [
  { id: 'locked-1', name: 'Fat Burn Extreme', duration: 30, difficulty: 'Advanced', icon: '🔥', tier: 'PRO' },
  { id: 'locked-2', name: 'Muscle Builder', duration: 45, difficulty: 'Advanced', icon: '💪', tier: 'PRO' },
  { id: 'locked-3', name: 'HIIT Destroyer', duration: 20, difficulty: 'Expert', icon: '⚡', tier: 'ELITE' },
  { id: 'locked-4', name: 'Warrior Training', duration: 60, difficulty: 'Expert', icon: '⚔️', tier: 'ELITE' },
  { id: 'locked-5', name: 'Saiyan Protocol', duration: 90, difficulty: 'Legend', icon: '🐉', tier: 'LEGEND' },
]

export default function FreeTier({ goTo, onSelectWorkout }) {
  const [selectedWorkout, setSelectedWorkout] = useState(null)

  const handleSelectFree = (workout) => {
    if (onSelectWorkout) {
      onSelectWorkout(workout)
    }
  }

  const handleUpgrade = () => {
    goTo('pricing')
  }

  return (
    <div className="min-h-screen w-screen bg-black/90 p-4 pb-24 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => goTo('home')} className="text-white text-2xl">←</button>
        <h1 className="text-white font-bold text-xl">FREE Workouts</h1>
        <div className="px-2 py-1 rounded-full bg-white/20 text-xs">FREE</div>
      </div>

      {/* Upgrade Banner */}
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-orange-500/30 to-red-500/30 border border-orange-500/50">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🔓</div>
          <div className="flex-1">
            <p className="text-white font-bold">Debloquer +50 workouts</p>
            <p className="text-gray-300 text-sm">Challenges, skins, progression tree...</p>
          </div>
          <button
            onClick={handleUpgrade}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-bold text-sm"
          >
            UPGRADE
          </button>
        </div>
      </div>

      {/* Free Workouts Section */}
      <div className="mb-8">
        <h2 className="text-white font-bold mb-3 flex items-center gap-2">
          <span className="text-green-500">✓</span> Disponible gratuitement
        </h2>
        <div className="space-y-3">
          {FREE_WORKOUTS.map(workout => (
            <button
              key={workout.id}
              onClick={() => handleSelectFree(workout)}
              className="w-full p-4 rounded-2xl bg-white/5 border-2 border-green-500/30 hover:border-green-500 text-left active:scale-95 transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white text-lg font-bold">{workout.name}</p>
                  <p className="text-gray-400 text-sm">{workout.duration} min - {workout.difficulty}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{workout.icon}</span>
                  <span className="text-green-500 text-xl">▶</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Locked Premium Section */}
      <div className="mb-8">
        <h2 className="text-white font-bold mb-3 flex items-center gap-2">
          <span className="text-orange-500">🔒</span> Premium Workouts
        </h2>
        <div className="space-y-3">
          {LOCKED_WORKOUTS.map(workout => (
            <div
              key={workout.id}
              className="w-full p-4 rounded-2xl bg-white/5 border-2 border-white/10 opacity-60 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <p className="text-white text-lg font-bold">{workout.name}</p>
                  <p className="text-gray-400 text-sm">{workout.duration} min - {workout.difficulty}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl opacity-50">{workout.icon}</span>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    workout.tier === 'PRO' ? 'bg-blue-500/30 text-blue-300' :
                    workout.tier === 'ELITE' ? 'bg-purple-500/30 text-purple-300' :
                    'bg-yellow-500/30 text-yellow-300'
                  }`}>
                    {workout.tier}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Comparison */}
      <div className="mb-8">
        <h2 className="text-white font-bold mb-3">Ce que tu manques</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-white/5 text-center">
            <p className="text-2xl mb-1">🏆</p>
            <p className="text-white text-sm font-bold">Challenges</p>
            <p className="text-gray-500 text-xs">5K, 100 pushups...</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 text-center">
            <p className="text-2xl mb-1">🎨</p>
            <p className="text-white text-sm font-bold">Skins</p>
            <p className="text-gray-500 text-xs">Goku, Vegeta...</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 text-center">
            <p className="text-2xl mb-1">🌳</p>
            <p className="text-white text-sm font-bold">Progression</p>
            <p className="text-gray-500 text-xs">XP & Badges</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 text-center">
            <p className="text-2xl mb-1">📊</p>
            <p className="text-white text-sm font-bold">Stats</p>
            <p className="text-gray-500 text-xs">Tracking avance</p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
        <button
          onClick={handleUpgrade}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-black text-lg active:scale-95 transition"
        >
          UPGRADE - A partir de $5.99/mois
        </button>
      </div>
    </div>
  )
}
