import { useState } from 'react'

const CHALLENGES = [
  {
    id: 1,
    name: "5K Run Challenge",
    icon: "🏃",
    tier: "pro",
    duration: "30 days",
    target: 5000,
    unit: "meters",
    description: "Complete a 5K run. Track your progress daily.",
    color: "from-blue-500 to-cyan-500",
    milestones: [1000, 2500, 4000, 5000]
  },
  {
    id: 2,
    name: "100 Pushups Challenge",
    icon: "💪",
    tier: "pro",
    duration: "7 days",
    target: 100,
    unit: "pushups",
    description: "Do 100 pushups in one session. Build up daily.",
    color: "from-orange-500 to-red-500",
    milestones: [25, 50, 75, 100]
  },
  {
    id: 3,
    name: "30 Day Squat Challenge",
    icon: "🦵",
    tier: "pro",
    duration: "30 days",
    target: 250,
    unit: "squats",
    description: "Progressive squat challenge. Start with 10, end with 250.",
    color: "from-purple-500 to-pink-500",
    milestones: [50, 100, 175, 250]
  },
  {
    id: 4,
    name: "1000 Burpees Challenge",
    icon: "🔥",
    tier: "elite",
    duration: "30 days",
    target: 1000,
    unit: "burpees",
    description: "The ultimate test. 1000 burpees in 30 days.",
    color: "from-red-500 to-orange-500",
    milestones: [250, 500, 750, 1000]
  },
  {
    id: 5,
    name: "Marathon Prep",
    icon: "🏅",
    tier: "elite",
    duration: "60 days",
    target: 42195,
    unit: "meters",
    description: "Train for a full marathon. 60 day program.",
    color: "from-yellow-500 to-orange-500",
    milestones: [10000, 21000, 35000, 42195]
  },
  {
    id: 6,
    name: "Iron Core Challenge",
    icon: "🎯",
    tier: "elite",
    duration: "14 days",
    target: 500,
    unit: "minutes",
    description: "500 minutes of core work in 2 weeks.",
    color: "from-emerald-500 to-teal-500",
    milestones: [125, 250, 375, 500]
  }
]

export default function Challenges({ userTier, onBack, onStartChallenge }) {
  const [selectedChallenge, setSelectedChallenge] = useState(null)

  const canAccess = (challengeTier) => {
    if (userTier === 'elite') return true
    if (userTier === 'pro' && challengeTier === 'pro') return true
    return false
  }

  const getTierBadge = (tier) => {
    if (tier === 'elite') return { text: 'ELITE', color: 'bg-gradient-to-r from-yellow-500 to-amber-500' }
    return { text: 'PRO', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' }
  }

  return (
    <div className="h-screen w-screen bg-black/60 backdrop-blur-sm px-4 py-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/70">
          ←
        </button>
        <h1 className="text-2xl font-black">CHALLENGES</h1>
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${userTier === 'elite' ? 'bg-gradient-to-r from-yellow-500 to-amber-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'}`}>
          {userTier?.toUpperCase() || 'FREE'}
        </div>
      </div>

      {/* Info Banner */}
      {!userTier && (
        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-4 mb-6">
          <p className="text-sm text-white/80">
            🔒 Challenges are available for <span className="font-bold text-blue-400">PRO</span> and <span className="font-bold text-yellow-400">ELITE</span> members.
          </p>
        </div>
      )}

      {/* Challenge Cards */}
      <div className="space-y-4">
        {CHALLENGES.map(challenge => {
          const badge = getTierBadge(challenge.tier)
          const hasAccess = canAccess(challenge.tier)

          return (
            <div
              key={challenge.id}
              onClick={() => hasAccess && setSelectedChallenge(challenge)}
              className={`relative overflow-hidden rounded-3xl border transition-all ${
                hasAccess
                  ? 'border-white/20 bg-white/10 backdrop-blur-xl active:scale-98 cursor-pointer'
                  : 'border-white/10 bg-white/5 opacity-60'
              }`}
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${challenge.color}`} />

              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${challenge.color} flex items-center justify-center text-2xl`}>
                      {challenge.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white">{challenge.name}</h3>
                      <p className="text-sm text-white/50">{challenge.duration}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-bold ${badge.color}`}>
                    {badge.text}
                  </div>
                </div>

                <p className="text-sm text-white/60 mb-4">{challenge.description}</p>

                {/* Target */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-white">{challenge.target.toLocaleString()}</span>
                    <span className="text-sm text-white/50">{challenge.unit}</span>
                  </div>
                  {hasAccess ? (
                    <button className={`px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r ${challenge.color}`}>
                      START →
                    </button>
                  ) : (
                    <div className="px-4 py-2 rounded-xl text-sm font-bold bg-white/10 text-white/40">
                      🔒 LOCKED
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Challenge Detail Modal */}
      {selectedChallenge && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl p-6 w-full max-w-sm border border-white/20">
            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${selectedChallenge.color} flex items-center justify-center text-4xl mx-auto mb-4`}>
              {selectedChallenge.icon}
            </div>

            <h2 className="text-2xl font-black text-center mb-2">{selectedChallenge.name}</h2>
            <p className="text-center text-white/60 mb-6">{selectedChallenge.description}</p>

            {/* Milestones */}
            <div className="mb-6">
              <p className="text-xs text-white/40 mb-3 text-center">MILESTONES</p>
              <div className="flex justify-between">
                {selectedChallenge.milestones.map((milestone, i) => (
                  <div key={i} className="text-center">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${selectedChallenge.color} opacity-${25 + i * 25} flex items-center justify-center text-xs font-bold mb-1`}>
                      {i + 1}
                    </div>
                    <p className="text-xs text-white/50">{milestone >= 1000 ? `${milestone/1000}K` : milestone}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white/10 rounded-2xl p-3 text-center">
                <p className="text-2xl font-black">{selectedChallenge.target.toLocaleString()}</p>
                <p className="text-xs text-white/50">{selectedChallenge.unit}</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-3 text-center">
                <p className="text-2xl font-black">{selectedChallenge.duration.split(' ')[0]}</p>
                <p className="text-xs text-white/50">days</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedChallenge(null)}
                className="flex-1 py-4 rounded-2xl font-bold bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onStartChallenge && onStartChallenge(selectedChallenge)
                  setSelectedChallenge(null)
                }}
                className={`flex-1 py-4 rounded-2xl font-bold bg-gradient-to-r ${selectedChallenge.color}`}
              >
                Start Challenge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
