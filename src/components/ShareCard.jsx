export default function ShareCard({ type, userTier, sessionTime, completedChallenges }) {
  const minutes = Math.floor((sessionTime || 0) / 60);

  const cardContent = {
    workout: {
      title: 'WORKOUT COMPLETED',
      stat: `${minutes} MIN`,
      subtitle: 'of pure intensity',
      gradient: 'from-orange-500 to-red-600'
    },
    challenge: {
      title: 'CHALLENGE CRUSHED',
      stat: completedChallenges || 1,
      subtitle: 'challenge completed',
      gradient: 'from-yellow-500 to-orange-600'
    },
    badge: {
      title: 'NEW BADGE EARNED',
      stat: '🏆',
      subtitle: 'Level up achieved',
      gradient: 'from-purple-500 to-pink-600'
    },
    streak: {
      title: 'STREAK ON FIRE',
      stat: '7 DAYS',
      subtitle: 'consistency is key',
      gradient: 'from-red-500 to-orange-500'
    }
  };

  const content = cardContent[type] || cardContent.workout;

  return (
    <div className={`relative bg-gradient-to-br ${content.gradient} rounded-2xl p-6 overflow-hidden`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">K</span>
          </div>
          <span className="text-white/80 font-bold text-sm">KHAN FITNESS</span>
        </div>

        {/* Title */}
        <p className="text-white/60 text-xs font-bold tracking-widest mb-1">{content.title}</p>

        {/* Main stat */}
        <div className="text-white text-5xl font-black mb-1">{content.stat}</div>

        {/* Subtitle */}
        <p className="text-white/80 text-sm">{content.subtitle}</p>

        {/* User tier badge */}
        <div className="mt-6 flex items-center gap-2">
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
            userTier === 'LEGEND' ? 'bg-yellow-400 text-black' :
            userTier === 'ULTRA' ? 'bg-purple-400 text-white' :
            userTier === 'ELITE' ? 'bg-blue-400 text-white' :
            'bg-white/20 text-white'
          }`}>
            {userTier || 'FREE'}
          </div>
          <span className="text-white/60 text-xs">Member</span>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-6 pt-4 border-t border-white/20">
        <p className="text-white/60 text-xs text-center">
          Join the tribe → khan-fitness.app
        </p>
      </div>
    </div>
  );
}
