const rarityColors = {
  common: 'from-gray-400 to-gray-600',
  uncommon: 'from-green-400 to-green-600',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 to-orange-500',
  mythic: 'from-red-500 to-pink-500'
};

const rarityGlow = {
  common: 'shadow-gray-500/30',
  uncommon: 'shadow-green-500/30',
  rare: 'shadow-blue-500/30',
  epic: 'shadow-purple-500/30',
  legendary: 'shadow-yellow-500/50',
  mythic: 'shadow-red-500/50'
};

const iconMap = {
  walk: '🚶',
  hike: '🥾',
  explore: '🧭',
  globe: '🌍',
  crown: '👑',
  star: '⭐',
  run: '🏃',
  medal: '🏅',
  fire: '🔥',
  iron: '🦿',
  bolt: '⚡',
  muscle: '💪',
  titan: '🗿',
  hercule: '🦁',
  saiyan: '🔱',
  heart: '❤️',
  robot: '🤖',
  rocket: '🚀',
  infinity: '♾️',
  yoga: '🧘',
  zen: '☯️',
  pretzel: '🥨'
};

export default function BadgeCard({ badge, earned = false, size = 'md' }) {
  const sizeClasses = {
    sm: 'w-12 h-12 text-xl',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-20 h-20 text-3xl'
  };

  const rarity = badge.rarity || 'common';

  return (
    <div className={`flex flex-col items-center ${earned ? '' : 'opacity-40 grayscale'}`}>
      <div
        className={`
          ${sizeClasses[size]}
          rounded-full bg-gradient-to-br ${rarityColors[rarity]}
          flex items-center justify-center
          shadow-lg ${earned ? rarityGlow[rarity] : ''}
          ${earned ? 'ring-2 ring-white/30' : ''}
          transition-all duration-300
        `}
      >
        <span>{iconMap[badge.icon] || '🏆'}</span>
      </div>
      {size !== 'sm' && (
        <>
          <p className="text-white text-xs font-bold mt-2 text-center">{badge.name}</p>
          <p className="text-gray-500 text-xs capitalize">{rarity}</p>
        </>
      )}
    </div>
  );
}
