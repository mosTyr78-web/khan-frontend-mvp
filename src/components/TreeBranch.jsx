import BadgeCard from './BadgeCard';
import LockedOverlay from './LockedOverlay';

const sportIcons = {
  walking: '🚶',
  running: '🏃',
  strength: '💪',
  cardio: '❤️',
  flexibility: '🧘'
};

const sportColors = {
  walking: 'from-green-500 to-emerald-600',
  running: 'from-blue-500 to-cyan-600',
  strength: 'from-red-500 to-orange-600',
  cardio: 'from-pink-500 to-rose-600',
  flexibility: 'from-purple-500 to-indigo-600'
};

export default function TreeBranch({ tree, userTier, onUpgrade, onSelectLevel }) {
  const tierOrder = ['FREE', 'STARTER', 'PRO', 'ELITE', 'ULTRA', 'LEGEND'];
  const userTierIndex = tierOrder.indexOf(userTier || 'FREE');

  return (
    <div className="mb-8">
      {/* Sport Header */}
      <div className={`flex items-center gap-3 mb-4 p-3 rounded-xl bg-gradient-to-r ${sportColors[tree.sport]} bg-opacity-20`}>
        <span className="text-3xl">{sportIcons[tree.sport]}</span>
        <div>
          <h3 className="text-white font-bold text-lg capitalize">{tree.sport}</h3>
          <p className="text-white/70 text-xs">{tree.levels.length} niveaux</p>
        </div>
      </div>

      {/* Levels */}
      <div className="relative">
        {/* Vertical line connecting levels */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/30 to-transparent" />

        {tree.levels.map((level, index) => {
          const isLocked = tierOrder.indexOf(level.minTier) > userTierIndex;
          const progressPercent = level.target > 0 ? Math.min((level.progress / level.target) * 100, 100) : 0;

          return (
            <div
              key={level.id}
              className="relative pl-14 pb-6 last:pb-0"
              onClick={() => !isLocked && onSelectLevel(level)}
            >
              {/* Node */}
              <div
                className={`
                  absolute left-3 w-6 h-6 rounded-full
                  ${level.completed
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 ring-2 ring-green-300'
                    : isLocked
                      ? 'bg-gray-700 border-2 border-gray-600'
                      : 'bg-gradient-to-r from-orange-400 to-red-500'
                  }
                  flex items-center justify-center text-xs
                `}
              >
                {level.completed ? '✓' : isLocked ? '🔒' : index + 1}
              </div>

              {/* Level Card */}
              <div
                className={`
                  relative p-4 rounded-xl
                  ${isLocked ? 'bg-gray-800/50' : 'bg-white/10 hover:bg-white/15 cursor-pointer'}
                  backdrop-blur-sm transition-all
                  ${level.completed ? 'ring-1 ring-green-500/30' : ''}
                `}
              >
                {isLocked && (
                  <LockedOverlay requiredTier={level.minTier} onUpgrade={onUpgrade} />
                )}

                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="text-white font-bold">{level.name}</h4>
                    <p className="text-gray-400 text-sm">
                      {level.progress.toLocaleString()} / {level.target.toLocaleString()} {level.unit}
                    </p>

                    {/* Progress bar */}
                    {!isLocked && (
                      <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            level.completed
                              ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                              : 'bg-gradient-to-r from-orange-500 to-red-500'
                          }`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    )}

                    {/* Rewards */}
                    <div className="flex gap-2 mt-2">
                      {level.badgeCode && (
                        <span className="text-xs bg-purple-500/30 text-purple-300 px-2 py-0.5 rounded-full">
                          🏆 Badge
                        </span>
                      )}
                      {level.skinReward && (
                        <span className="text-xs bg-yellow-500/30 text-yellow-300 px-2 py-0.5 rounded-full">
                          🎨 Skin: {level.skinReward}
                        </span>
                      )}
                      <span className="text-xs bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded-full">
                        +{level.xpReward} XP
                      </span>
                    </div>
                  </div>

                  {/* Badge preview */}
                  {level.badgeCode && (
                    <div className="ml-3">
                      <BadgeCard
                        badge={{ icon: level.badgeCode.split('_').pop(), rarity: 'common' }}
                        earned={level.completed}
                        size="sm"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
