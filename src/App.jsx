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
import About from './pages/About'
import ChallengeLive from './pages/ChallengeLive'
import FreeTier from './pages/FreeTier'

// Background images based on tier/skin
const BACKGROUNDS = {
  default: '/assets/backgrounds/gym-default.png',
  FREE: '/assets/backgrounds/gym-default.png',
  STARTER: '/assets/backgrounds/gym-2.png',
  PRO: '/assets/backgrounds/gym-3.png',
  ELITE: '/assets/backgrounds/gym-4.png',
  ULTRA: '/assets/backgrounds/fire-1.png',
  LEGEND: '/assets/backgrounds/fire-2.png',
  // Skin-specific backgrounds
  goku: '/assets/backgrounds/fire-3.png',
  vegeta: '/assets/backgrounds/fire-4.png',
  broly: '/assets/backgrounds/fire-1.png'
}

const WORKOUTS = [
  // STANDARD WORKOUTS
  { id: 1, name: "Fat Loss Protocol", category: "standard", difficulty: "Advanced", duration: 30, icon: "🔥", objectives: [
    { exercise: "Warm-up", reps: "5 min", duration: 300, command: "Get Ready", instruction: "Light jogging. Arm circles.", details: "Light pace" },
    { exercise: "Burpees", reps: "40 sec", duration: 40, command: "Max Speed", instruction: "Drop → Push → Jump", details: "Full range" },
    { exercise: "Cool Down", reps: "5 min", duration: 300, command: "Done", instruction: "Walk it out", details: "Rest" }
  ]},
  { id: 2, name: "Upper Body Powerhouse", category: "standard", difficulty: "Advanced", duration: 30, icon: "💪", objectives: [
    { exercise: "Warm-up", reps: "3 min", duration: 180, command: "Prepare", instruction: "Light cardio", details: "Light pace" },
    { exercise: "Bench Press", reps: "4x6", duration: 360, command: "Heavy", instruction: "Lower chest", details: "Full depth" },
    { exercise: "Cool Down", reps: "5 min", duration: 300, command: "Done", instruction: "Stretch", details: "Rest" }
  ]},
  { id: 3, name: "Lower Body Blast", category: "standard", difficulty: "Intermediate", duration: 30, icon: "🦵", objectives: [
    { exercise: "Warm-up", reps: "3 min", duration: 180, command: "Activate", instruction: "Light cardio", details: "Light pace" },
    { exercise: "Squats", reps: "4x12", duration: 240, command: "Push", instruction: "Full depth", details: "Control" },
    { exercise: "Cool Down", reps: "5 min", duration: 300, command: "Done", instruction: "Stretch", details: "Rest" }
  ]},
  { id: 4, name: "Cardio Endurance", category: "standard", difficulty: "Advanced", duration: 30, icon: "🏃", objectives: [
    { exercise: "Warm-up", reps: "5 min", duration: 300, command: "Easy", instruction: "Light jog", details: "Steady" },
    { exercise: "Sprint", reps: "10 min", duration: 600, command: "Go Hard", instruction: "Max speed", details: "All out" },
    { exercise: "Cool Down", reps: "5 min", duration: 300, command: "Done", instruction: "Walk", details: "Rest" }
  ]},

  // KIDS WORKOUTS (Ages 6-12)
  { id: 10, name: "Super Hero Training", category: "kids", difficulty: "Fun", duration: 15, icon: "🦸", objectives: [
    { exercise: "Hero Warm-up", reps: "2 min", duration: 120, command: "Power Up!", instruction: "Jump like a superhero", details: "Have fun!" },
    { exercise: "Spider Crawls", reps: "30 sec", duration: 30, command: "Crawl!", instruction: "Hands and feet on ground, crawl forward", details: "Like Spiderman" },
    { exercise: "Superman Hold", reps: "20 sec", duration: 20, command: "Fly!", instruction: "Lie on belly, lift arms and legs", details: "You're flying!" },
    { exercise: "Frog Jumps", reps: "10x", duration: 60, command: "Ribbit!", instruction: "Squat down and jump forward", details: "Be a frog!" },
    { exercise: "Star Jumps", reps: "15x", duration: 45, command: "Shine!", instruction: "Jump and spread arms/legs wide", details: "Like a star!" },
    { exercise: "Cool Down Dance", reps: "2 min", duration: 120, command: "Dance!", instruction: "Free dance to celebrate", details: "You did it!" }
  ]},
  { id: 11, name: "Animal Adventure", category: "kids", difficulty: "Fun", duration: 10, icon: "🐻", objectives: [
    { exercise: "Bear Walk", reps: "30 sec", duration: 30, command: "Grrrr!", instruction: "Walk on hands and feet", details: "Like a bear" },
    { exercise: "Bunny Hops", reps: "20x", duration: 40, command: "Hop!", instruction: "Small jumps forward", details: "Be a bunny!" },
    { exercise: "Crab Walk", reps: "30 sec", duration: 30, command: "Sideways!", instruction: "Walk sideways on hands/feet", details: "Like a crab" },
    { exercise: "Flamingo Stand", reps: "20 sec each leg", duration: 40, command: "Balance!", instruction: "Stand on one leg", details: "Don't fall!" },
    { exercise: "Gorilla Shuffle", reps: "30 sec", duration: 30, command: "Ooh ooh!", instruction: "Squat low, shuffle sideways", details: "Beat your chest!" }
  ]},
  { id: 12, name: "Ninja Training", category: "kids", difficulty: "Medium", duration: 12, icon: "🥷", objectives: [
    { exercise: "Ninja Sneak", reps: "1 min", duration: 60, command: "Silent!", instruction: "Walk super quietly", details: "Don't make a sound" },
    { exercise: "Ninja Kicks", reps: "10 each leg", duration: 60, command: "Hi-ya!", instruction: "Front kicks with control", details: "Stay balanced" },
    { exercise: "Ninja Roll", reps: "5x", duration: 45, command: "Roll!", instruction: "Forward roll on soft surface", details: "Tuck your head" },
    { exercise: "Wall Sit", reps: "20 sec", duration: 20, command: "Hide!", instruction: "Back against wall, squat", details: "Invisible ninja!" },
    { exercise: "Speed Punches", reps: "30 sec", duration: 30, command: "Fast!", instruction: "Punch the air quickly", details: "Super speed!" }
  ]},

  // MAMA STRONG (Women/Moms)
  { id: 20, name: "Mama Strong Core", category: "mama", difficulty: "Moderate", duration: 20, icon: "💪👩", objectives: [
    { exercise: "Gentle Warm-up", reps: "3 min", duration: 180, command: "Breathe", instruction: "Deep breaths, arm circles", details: "Center yourself" },
    { exercise: "Pelvic Tilts", reps: "15x", duration: 90, command: "Engage", instruction: "Lie down, tilt pelvis up", details: "Core activation" },
    { exercise: "Bird Dog", reps: "10 each side", duration: 120, command: "Balance", instruction: "Opposite arm/leg extend", details: "Stable core" },
    { exercise: "Glute Bridges", reps: "15x", duration: 90, command: "Lift", instruction: "Lift hips, squeeze glutes", details: "Hold 2 sec" },
    { exercise: "Modified Plank", reps: "30 sec", duration: 30, command: "Hold", instruction: "Knees down plank", details: "Breathe steady" },
    { exercise: "Cat-Cow Stretch", reps: "10x", duration: 60, command: "Flow", instruction: "Arch and round back", details: "Relax spine" }
  ]},
  { id: 21, name: "Stroller Power Walk", category: "mama", difficulty: "Easy", duration: 30, icon: "👶🚶‍♀️", objectives: [
    { exercise: "Warm-up Walk", reps: "5 min", duration: 300, command: "Start", instruction: "Easy pace with stroller", details: "Relax shoulders" },
    { exercise: "Power Walk", reps: "5 min", duration: 300, command: "Speed up", instruction: "Brisk walking pace", details: "Arms swinging" },
    { exercise: "Walking Lunges", reps: "10 each leg", duration: 120, command: "Lunge", instruction: "Lunge while pushing stroller", details: "Keep control" },
    { exercise: "Power Walk", reps: "5 min", duration: 300, command: "Push it", instruction: "Fast walking", details: "Breathe steady" },
    { exercise: "Incline Walk", reps: "5 min", duration: 300, command: "Climb", instruction: "Find a hill or incline", details: "Extra burn" },
    { exercise: "Cool Down", reps: "5 min", duration: 300, command: "Relax", instruction: "Slow easy walk", details: "Stretch after" }
  ]},
  { id: 22, name: "Postpartum Recovery", category: "mama", difficulty: "Gentle", duration: 15, icon: "🌸", objectives: [
    { exercise: "Breathing", reps: "2 min", duration: 120, command: "Inhale", instruction: "Deep belly breathing", details: "Reconnect with core" },
    { exercise: "Kegels", reps: "10x hold 5 sec", duration: 90, command: "Squeeze", instruction: "Pelvic floor engagement", details: "Relax fully between" },
    { exercise: "Heel Slides", reps: "10 each leg", duration: 90, command: "Slide", instruction: "Lie down, slide heel out", details: "Keep core engaged" },
    { exercise: "Toe Taps", reps: "10 each leg", duration: 90, command: "Tap", instruction: "Lie down, lower one leg", details: "Control the movement" },
    { exercise: "Wall Push-ups", reps: "10x", duration: 60, command: "Push", instruction: "Hands on wall, push away", details: "Gentle strength" },
    { exercise: "Relaxation", reps: "3 min", duration: 180, command: "Rest", instruction: "Lie down, close eyes", details: "You're amazing" }
  ]},

  // ACCESSIBLE WORKOUTS (Seated/Limited Mobility)
  { id: 30, name: "Seated Strength", category: "accessible", difficulty: "Adaptive", duration: 20, icon: "🦽💪", objectives: [
    { exercise: "Seated Arm Circles", reps: "1 min", duration: 60, command: "Circle", instruction: "Small to large circles", details: "Both directions" },
    { exercise: "Seated Punches", reps: "30 sec", duration: 30, command: "Punch", instruction: "Alternate arm punches", details: "Engage core" },
    { exercise: "Shoulder Press", reps: "12x", duration: 60, command: "Press", instruction: "Press arms overhead", details: "Use weights if able" },
    { exercise: "Bicep Curls", reps: "12x", duration: 60, command: "Curl", instruction: "Curl arms up", details: "Control the motion" },
    { exercise: "Seated Twists", reps: "10 each side", duration: 60, command: "Twist", instruction: "Rotate torso", details: "Keep hips still" },
    { exercise: "Leg Extensions", reps: "10 each leg", duration: 90, command: "Extend", instruction: "Straighten leg out", details: "If able" },
    { exercise: "Arm Stretch", reps: "2 min", duration: 120, command: "Stretch", instruction: "Stretch all arm muscles", details: "Breathe deeply" }
  ]},
  { id: 31, name: "Chair Cardio", category: "accessible", difficulty: "Adaptive", duration: 15, icon: "🪑❤️", objectives: [
    { exercise: "Seated March", reps: "1 min", duration: 60, command: "March", instruction: "Lift knees alternately", details: "Get heart pumping" },
    { exercise: "Arm Swings", reps: "1 min", duration: 60, command: "Swing", instruction: "Swing arms front to back", details: "Build momentum" },
    { exercise: "Seated Jacks", reps: "30 sec", duration: 30, command: "Open", instruction: "Arms and legs out/in", details: "Modified jumping jack" },
    { exercise: "Boxing", reps: "1 min", duration: 60, command: "Fight", instruction: "Seated boxing moves", details: "Jab, cross, hook" },
    { exercise: "Toe Taps", reps: "1 min", duration: 60, command: "Tap", instruction: "Tap toes rapidly", details: "Fast feet!" },
    { exercise: "Cool Down", reps: "2 min", duration: 120, command: "Breathe", instruction: "Slow movements, deep breaths", details: "Great job!" }
  ]},
  { id: 32, name: "Upper Body Only", category: "accessible", difficulty: "Adaptive", duration: 15, icon: "💪🙌", objectives: [
    { exercise: "Neck Rolls", reps: "5 each way", duration: 60, command: "Roll", instruction: "Gentle neck circles", details: "Release tension" },
    { exercise: "Shoulder Shrugs", reps: "15x", duration: 45, command: "Shrug", instruction: "Lift shoulders to ears", details: "Hold and release" },
    { exercise: "Chest Press", reps: "12x", duration: 60, command: "Press", instruction: "Press arms forward", details: "Squeeze chest" },
    { exercise: "Rows", reps: "12x", duration: 60, command: "Pull", instruction: "Pull elbows back", details: "Squeeze back" },
    { exercise: "Tricep Extensions", reps: "12x", duration: 60, command: "Extend", instruction: "Extend arms overhead back", details: "Control motion" },
    { exercise: "Wrist Circles", reps: "10 each way", duration: 40, command: "Circle", instruction: "Rotate wrists", details: "Both directions" },
    { exercise: "Stretch", reps: "3 min", duration: 180, command: "Relax", instruction: "Full upper body stretch", details: "You're strong!" }
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

  // Get background based on skin or tier
  const getBackground = () => {
    if (activeSkin && BACKGROUNDS[activeSkin]) {
      return BACKGROUNDS[activeSkin]
    }
    return BACKGROUNDS[userTier] || BACKGROUNDS.default
  }

  return (
    <div
      className="h-screen w-screen text-white overflow-hidden"
      style={{
        backgroundImage: `url(${getBackground()})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
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
      {page === 'about' && (
        <About
          goTo={goTo}
          userTier={userTier}
        />
      )}
      {page === 'challenge-live' && (
        <ChallengeLive
          goTo={goTo}
          userTier={userTier}
          isLoggedIn={isLoggedIn}
        />
      )}
      {page === 'free-tier' && (
        <FreeTier
          goTo={goTo}
          onSelectWorkout={(workout) => {
            setSelectedWorkout(workout.id)
            setPage('countdown')
          }}
        />
      )}
    </div>
  )
}
