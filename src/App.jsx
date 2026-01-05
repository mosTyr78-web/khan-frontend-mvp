import { useState, useEffect } from 'react'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Countdown from './pages/Countdown'
import WorkoutActive from './pages/WorkoutActive'
import Success from './pages/Success'
import Pricing from './pages/Pricing'
import Challenges from './pages/Challenges'
import Login from './pages/Login'
import ProgressionTree from './pages/ProgressionTree'
import Coaches from './pages/Coaches'
import BecomeCoach from './pages/BecomeCoach'
import CoachDashboard from './pages/CoachDashboard'
import Share from './pages/Share'
import Skins from './pages/Skins'
import Shop from './pages/Shop'

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
  const [page, setPage] = useState('landing')
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const [sessionTime, setSessionTime] = useState(0)
  const [sessionActive, setSessionActive] = useState(false)
  // User state - For demo: set to 'PRO', 'ELITE', 'ULTRA', 'LEGEND', or 'FREE'
  const [userTier, setUserTier] = useState('ELITE')
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [completedChallenges, setCompletedChallenges] = useState(3)
  const [activeSkin, setActiveSkin] = useState('fire')

  const handleStartChallenge = (challenge) => {
    setActiveChallenge(challenge)
    alert(`Challenge "${challenge.name}" started! Good luck!`)
    setPage('home')
  }

  const handleLogin = (user) => {
    setIsLoggedIn(true)
    setPage('home')
  }

  const goTo = (pageName) => setPage(pageName)

  const currentWorkout = WORKOUTS.find(w => w.id === selectedWorkout)

  return (
    <div className="h-screen w-screen text-white overflow-hidden">
      {page === 'landing' && (
        <Landing goTo={goTo} />
      )}
      {page === 'home' && (
        <Home
          workouts={WORKOUTS}
          userTier={userTier}
          isLoggedIn={isLoggedIn}
          onSelect={(id) => { setSelectedWorkout(id); setPage('countdown'); }}
          onPricing={() => setPage('pricing')}
          onChallenges={() => setPage('challenges')}
          onLogin={() => setPage('login')}
          goTo={goTo}
        />
      )}
      {page === 'countdown' && (
        <Countdown
          workout={currentWorkout}
          onStart={() => { setPage('workout'); setSessionActive(true); setSessionTime(0); }}
          onBack={() => setPage('home')}
        />
      )}
      {page === 'workout' && (
        <WorkoutActive
          workout={currentWorkout}
          sessionTime={sessionTime}
          setSessionTime={setSessionTime}
          sessionActive={sessionActive}
          setSessionActive={setSessionActive}
          onComplete={() => setPage('success')}
          onExit={() => { setPage('home'); setSessionActive(false); }}
        />
      )}
      {page === 'success' && (
        <Success
          workout={currentWorkout}
          sessionTime={sessionTime}
          onHome={() => setPage('home')}
          onShare={() => setPage('share')}
        />
      )}
      {page === 'pricing' && (
        <Pricing
          onBack={() => setPage('home')}
          currentTier={userTier}
        />
      )}
      {page === 'challenges' && (
        <Challenges
          userTier={userTier}
          onBack={() => setPage('home')}
          onStartChallenge={handleStartChallenge}
        />
      )}
      {page === 'login' && (
        <Login
          onBack={() => setPage('home')}
          onLogin={handleLogin}
        />
      )}
      {page === 'progression' && (
        <ProgressionTree
          userTier={userTier}
          goTo={goTo}
        />
      )}
      {page === 'coaches' && (
        <Coaches
          goTo={goTo}
          userTier={userTier}
          isLoggedIn={isLoggedIn}
        />
      )}
      {page === 'become-coach' && (
        <BecomeCoach
          goTo={goTo}
          userTier={userTier}
          isLoggedIn={isLoggedIn}
        />
      )}
      {page === 'coach-dashboard' && (
        <CoachDashboard
          goTo={goTo}
          isLoggedIn={isLoggedIn}
        />
      )}
      {page === 'share' && (
        <Share
          goTo={goTo}
          userTier={userTier}
          sessionTime={sessionTime}
          completedChallenges={completedChallenges}
        />
      )}
      {page === 'skins' && (
        <Skins
          goTo={goTo}
          userTier={userTier}
          activeSkin={activeSkin}
          setActiveSkin={setActiveSkin}
        />
      )}
      {page === 'shop' && (
        <Shop
          goTo={goTo}
          userTier={userTier}
        />
      )}
    </div>
  )
}
