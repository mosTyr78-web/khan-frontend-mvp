import { useState, useEffect } from 'react'
import Home from './pages/Home'
import Countdown from './pages/Countdown'
import WorkoutActive from './pages/WorkoutActive'
import Success from './pages/Success'
import Pricing from './pages/Pricing'
import Challenges from './pages/Challenges'

const WORKOUTS = [
  { id: 1, name: "Fat Loss Protocol", difficulty: "Advanced", duration: 30, icon: "🔥", objectives: [
    { exercise: "Warm-up", reps: "5 min", duration: 300, command: "Get Ready", instruction: "Light jogging. Arm circles.", details: "Light pace" },
    { exercise: "Burpees", reps: "40 sec", duration: 40, command: "Max Speed", instruction: "Drop → Push → Jump", details: "Full range" },
    { exercise: "Cool Down", reps: "5 min", duration: 300, command: "Done", instruction: "Walk it out", details: "Rest" }
  ]},
  { id: 2, name: "Upper Body Powerhouse", difficulty: "Advanced", duration: 30, icon: "💪", objectives: [
    { exercise: "Warm-up", reps: "3 min", duration: 180, command: "Prepare", instruction: "Light cardio", details: "Light pace" },
    { exercise: "Bench Press", reps: "4x6", duration: 360, command: "Heavy", instruction: "Lower chest", details: "Full depth" },
    { exercise: "Cool Down", reps: "5 min", duration: 300, command: "Done", instruction: "Stretch", details: "Rest" }
  ]},
  { id: 3, name: "Lower Body Blast", difficulty: "Intermediate", duration: 30, icon: "🦵", objectives: [
    { exercise: "Warm-up", reps: "3 min", duration: 180, command: "Activate", instruction: "Light cardio", details: "Light pace" },
    { exercise: "Squats", reps: "4x12", duration: 240, command: "Push", instruction: "Full depth", details: "Control" },
    { exercise: "Cool Down", reps: "5 min", duration: 300, command: "Done", instruction: "Stretch", details: "Rest" }
  ]},
  { id: 4, name: "Cardio Endurance", difficulty: "Advanced", duration: 30, icon: "🏃", objectives: [
    { exercise: "Warm-up", reps: "5 min", duration: 300, command: "Easy", instruction: "Light jog", details: "Steady" },
    { exercise: "Sprint", reps: "10 min", duration: 600, command: "Go Hard", instruction: "Max speed", details: "All out" },
    { exercise: "Cool Down", reps: "5 min", duration: 300, command: "Done", instruction: "Walk", details: "Rest" }
  ]}
]

export default function App() {
  const [page, setPage] = useState('home')
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const [sessionTime, setSessionTime] = useState(0)
  const [sessionActive, setSessionActive] = useState(false)
  // For demo: set to 'pro', 'elite', or null (free user)
  const [userTier, setUserTier] = useState('elite')
  const [activeChallenge, setActiveChallenge] = useState(null)

  const handleStartChallenge = (challenge) => {
    setActiveChallenge(challenge)
    // TODO: Start challenge tracking
    alert(`Challenge "${challenge.name}" started! Good luck!`)
    setPage('home')
  }

  return (
    <div className="h-screen w-screen text-white overflow-hidden">
      {page === 'home' && <Home workouts={WORKOUTS} userTier={userTier} onSelect={(id) => { setSelectedWorkout(id); setPage('countdown'); }} onPricing={() => setPage('pricing')} onChallenges={() => setPage('challenges')} />}
      {page === 'countdown' && <Countdown workout={WORKOUTS.find(w => w.id === selectedWorkout)} onStart={() => { setPage('workout'); setSessionActive(true); setSessionTime(0); }} onBack={() => setPage('home')} />}
      {page === 'workout' && <WorkoutActive workout={WORKOUTS.find(w => w.id === selectedWorkout)} sessionTime={sessionTime} setSessionTime={setSessionTime} sessionActive={sessionActive} setSessionActive={setSessionActive} onComplete={() => setPage('success')} onExit={() => { setPage('home'); setSessionActive(false); }} />}
      {page === 'success' && <Success onHome={() => setPage('home')} />}
      {page === 'pricing' && <Pricing onBack={() => setPage('home')} />}
      {page === 'challenges' && <Challenges userTier={userTier} onBack={() => setPage('home')} onStartChallenge={handleStartChallenge} />}
    </div>
  )
}
