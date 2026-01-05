import { useState } from 'react';

const SKINS = [
  // ANIME
  {
    code: 'goku',
    name: 'Goku Theme',
    description: 'Unlock the power of a Saiyan warrior',
    category: 'anime',
    unlockCondition: 'Reach Titan level in Strength tree',
    primaryColor: '#FF6B00',
    secondaryColor: '#0066FF',
    accentColor: '#FFD700',
    minTier: 'PRO',
    rarity: 'legendary',
    icon: '🔥'
  },
  {
    code: 'vegeta',
    name: 'Vegeta Theme',
    description: 'Pride of the Saiyan Prince',
    category: 'anime',
    unlockCondition: 'Reach Hercule level in Strength tree',
    primaryColor: '#1E3A8A',
    secondaryColor: '#FFD700',
    accentColor: '#FFFFFF',
    minTier: 'ELITE',
    rarity: 'legendary',
    icon: '👑'
  },
  {
    code: 'flash',
    name: 'Flash Theme',
    description: 'Speed force activated',
    category: 'anime',
    unlockCondition: 'Reach Ultra Runner in Running tree',
    primaryColor: '#DC2626',
    secondaryColor: '#FCD34D',
    accentColor: '#FFFFFF',
    minTier: 'PRO',
    rarity: 'epic',
    icon: '⚡'
  },
  {
    code: 'naruto',
    name: 'Naruto Theme',
    description: 'Believe it! Never give up',
    category: 'anime',
    unlockCondition: 'Complete 50 challenges',
    primaryColor: '#F97316',
    secondaryColor: '#1E3A8A',
    accentColor: '#FFFFFF',
    minTier: 'PRO',
    rarity: 'epic',
    icon: '🍥'
  },
  {
    code: 'one_punch',
    name: 'Saitama Theme',
    description: '100 pushups, 100 situps, 100 squats, 10km run. Every day.',
    category: 'anime',
    unlockCondition: 'Complete Saitama workout 30 days straight',
    primaryColor: '#FEF08A',
    secondaryColor: '#DC2626',
    accentColor: '#000000',
    minTier: 'ELITE',
    rarity: 'mythic',
    icon: '👊'
  },
  {
    code: 'rock_lee',
    name: 'Rock Lee Theme',
    description: 'Hard work beats talent',
    category: 'anime',
    unlockCondition: 'Reach Avance in Strength tree',
    primaryColor: '#22C55E',
    secondaryColor: '#F97316',
    accentColor: '#FFFFFF',
    minTier: 'PRO',
    rarity: 'rare',
    icon: '💚'
  },

  // NATURE
  {
    code: 'nature',
    name: 'Nature Theme',
    description: 'Connected to the earth',
    category: 'nature',
    unlockCondition: 'Reach Roi de la Marche (25,000km)',
    primaryColor: '#22C55E',
    secondaryColor: '#065F46',
    accentColor: '#84CC16',
    minTier: 'PRO',
    rarity: 'epic',
    icon: '🌿'
  },
  {
    code: 'ocean',
    name: 'Ocean Theme',
    description: 'Deep as the sea',
    category: 'nature',
    unlockCondition: 'Reach Inarretable in Cardio tree',
    primaryColor: '#0EA5E9',
    secondaryColor: '#1E3A8A',
    accentColor: '#67E8F9',
    minTier: 'ELITE',
    rarity: 'epic',
    icon: '🌊'
  },
  {
    code: 'volcano',
    name: 'Volcano Theme',
    description: 'Explosive power within',
    category: 'nature',
    unlockCondition: 'Complete 100 challenges',
    primaryColor: '#DC2626',
    secondaryColor: '#F97316',
    accentColor: '#FCD34D',
    minTier: 'ELITE',
    rarity: 'legendary',
    icon: '🌋'
  },
  {
    code: 'aurora',
    name: 'Aurora Theme',
    description: 'Northern lights guide your path',
    category: 'nature',
    unlockCondition: 'Master Flexibility tree',
    primaryColor: '#8B5CF6',
    secondaryColor: '#06B6D4',
    accentColor: '#F0ABFC',
    minTier: 'ULTRA',
    rarity: 'legendary',
    icon: '🌌'
  },

  // SPORT
  {
    code: 'fire',
    name: 'Fire Theme',
    description: 'Burning determination',
    category: 'sport',
    unlockCondition: 'Complete 25 challenges',
    primaryColor: '#F97316',
    secondaryColor: '#DC2626',
    accentColor: '#FCD34D',
    minTier: 'PRO',
    rarity: 'rare',
    icon: '🔥'
  },
  {
    code: 'gold',
    name: 'Gold Champion',
    description: 'First place mentality',
    category: 'sport',
    unlockCondition: 'Earn 5 legendary badges',
    primaryColor: '#FFD700',
    secondaryColor: '#B8860B',
    accentColor: '#FFFFFF',
    minTier: 'ELITE',
    rarity: 'legendary',
    icon: '🏆'
  },
  {
    code: 'iron',
    name: 'Iron Will',
    description: 'Unbreakable spirit',
    category: 'sport',
    unlockCondition: 'Reach Iron Legs (15,000km running)',
    primaryColor: '#6B7280',
    secondaryColor: '#374151',
    accentColor: '#F3F4F6',
    minTier: 'PRO',
    rarity: 'epic',
    icon: '🦾'
  },
  {
    code: 'neon',
    name: 'Neon Nights',
    description: 'Train while they sleep',
    category: 'sport',
    unlockCondition: '50 workouts after 22h',
    primaryColor: '#F0ABFC',
    secondaryColor: '#7C3AED',
    accentColor: '#22D3EE',
    minTier: 'PRO',
    rarity: 'rare',
    icon: '🌙'
  },

  // LEGENDARY
  {
    code: 'legend',
    name: 'LEGEND Theme',
    description: 'For those who reached the top',
    category: 'legendary',
    unlockCondition: 'Subscribe to LEGEND tier',
    primaryColor: '#F59E0B',
    secondaryColor: '#DC2626',
    accentColor: '#FFD700',
    minTier: 'LEGEND',
    rarity: 'mythic',
    icon: '👑'
  },
  {
    code: 'ultra',
    name: 'ULTRA Theme',
    description: 'Beyond Elite',
    category: 'legendary',
    unlockCondition: 'Subscribe to ULTRA tier',
    primaryColor: '#7C3AED',
    secondaryColor: '#EC4899',
    accentColor: '#FFFFFF',
    minTier: 'ULTRA',
    rarity: 'legendary',
    icon: '💎'
  },
  {
    code: 'saiyan',
    name: 'Super Saiyan',
    description: 'Transcend your limits',
    category: 'legendary',
    unlockCondition: 'Reach Saiyan level (1,000,000 reps)',
    primaryColor: '#FFD700',
    secondaryColor: '#F97316',
    accentColor: '#FFFFFF',
    minTier: 'LEGEND',
    rarity: 'mythic',
    icon: '✨'
  },
  {
    code: 'flash_human',
    name: 'Flash Humain',
    description: 'The fastest human alive',
    category: 'legendary',
    unlockCondition: 'Run 50,000km total',
    primaryColor: '#DC2626',
    secondaryColor: '#FFD700',
    accentColor: '#FFFFFF',
    minTier: 'LEGEND',
    rarity: 'mythic',
    icon: '⚡'
  }
];

const RARITY_COLORS = {
  common: 'border-gray-500',
  rare: 'border-blue-500',
  epic: 'border-purple-500',
  legendary: 'border-orange-500',
  mythic: 'border-red-500 animate-pulse'
};

const RARITY_BG = {
  common: 'from-gray-500/20 to-gray-600/20',
  rare: 'from-blue-500/20 to-blue-600/20',
  epic: 'from-purple-500/20 to-purple-600/20',
  legendary: 'from-orange-500/20 to-yellow-500/20',
  mythic: 'from-red-500/20 to-pink-500/20'
};

const CATEGORIES = ['all', 'anime', 'nature', 'sport', 'legendary'];

export default function Skins({ goTo, userTier, activeSkin, setActiveSkin }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSkin, setSelectedSkin] = useState(null);

  // Demo: unlock some skins based on tier
  const tierOrder = ['FREE', 'STARTER', 'PRO', 'ELITE', 'ULTRA', 'LEGEND'];
  const userTierIndex = tierOrder.indexOf(userTier);

  const getUnlockedSkins = () => {
    // Demo logic - in production this comes from API
    const unlocked = ['fire']; // Everyone starts with fire
    if (userTierIndex >= 2) unlocked.push('rock_lee'); // PRO
    if (userTierIndex >= 3) unlocked.push('flash', 'naruto'); // ELITE
    if (userTierIndex >= 4) unlocked.push('ultra', 'ocean'); // ULTRA
    if (userTierIndex >= 5) unlocked.push('legend', 'goku', 'vegeta'); // LEGEND
    return unlocked;
  };

  const unlockedSkins = getUnlockedSkins();

  const filteredSkins = selectedCategory === 'all'
    ? SKINS
    : SKINS.filter(s => s.category === selectedCategory);

  const canAccessSkin = (skin) => {
    const skinTierIndex = tierOrder.indexOf(skin.minTier);
    return userTierIndex >= skinTierIndex;
  };

  const handleSelectSkin = (skin) => {
    if (unlockedSkins.includes(skin.code)) {
      setActiveSkin(skin.code);
      setSelectedSkin(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => goTo('home')}
            className="text-2xl"
          >
            ←
          </button>
          <h1 className="text-xl font-bold">Skins</h1>
          <div className="text-sm text-gray-400">
            {unlockedSkins.length}/{SKINS.length}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 px-4 pb-4 overflow-x-auto">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Active Skin Preview */}
      <div className="p-4">
        <div
          className="p-6 rounded-2xl border-2 border-orange-500"
          style={{
            background: `linear-gradient(135deg, ${
              SKINS.find(s => s.code === activeSkin)?.primaryColor || '#FF6B00'
            }30, ${
              SKINS.find(s => s.code === activeSkin)?.secondaryColor || '#FF0000'
            }30)`
          }}
        >
          <p className="text-sm text-gray-400 mb-2">Active Skin</p>
          <div className="flex items-center gap-4">
            <div className="text-4xl">
              {SKINS.find(s => s.code === activeSkin)?.icon || '🎨'}
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {SKINS.find(s => s.code === activeSkin)?.name || 'Default Theme'}
              </h2>
              <p className="text-gray-400 text-sm">
                {SKINS.find(s => s.code === activeSkin)?.description || 'Classic KHAN theme'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Skins Grid */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {filteredSkins.map(skin => {
          const isUnlocked = unlockedSkins.includes(skin.code);
          const canAccess = canAccessSkin(skin);
          const isActive = activeSkin === skin.code;

          return (
            <div
              key={skin.code}
              onClick={() => setSelectedSkin(skin)}
              className={`relative rounded-xl border-2 overflow-hidden cursor-pointer transition-all ${
                isActive ? 'border-orange-500 scale-105' : RARITY_COLORS[skin.rarity]
              } ${!isUnlocked && 'opacity-60'}`}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${RARITY_BG[skin.rarity]}`}
              />

              {/* Content */}
              <div className="relative p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-2xl">{skin.icon}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    skin.rarity === 'mythic' ? 'bg-red-500' :
                    skin.rarity === 'legendary' ? 'bg-orange-500' :
                    skin.rarity === 'epic' ? 'bg-purple-500' :
                    skin.rarity === 'rare' ? 'bg-blue-500' :
                    'bg-gray-500'
                  }`}>
                    {skin.rarity}
                  </span>
                </div>

                <h3 className="font-bold text-sm mb-1">{skin.name}</h3>

                {/* Color preview */}
                <div className="flex gap-1 mt-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: skin.primaryColor }}
                  />
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: skin.secondaryColor }}
                  />
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: skin.accentColor }}
                  />
                </div>

                {/* Lock overlay */}
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-2xl">🔒</span>
                  </div>
                )}

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute top-2 right-2">
                    <span className="text-green-400">✓</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Skin Detail Modal */}
      {selectedSkin && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-end justify-center"
          onClick={() => setSelectedSkin(null)}
        >
          <div
            className="bg-gray-900 rounded-t-3xl w-full max-w-lg p-6"
            onClick={e => e.stopPropagation()}
            style={{
              background: `linear-gradient(135deg, ${selectedSkin.primaryColor}20, ${selectedSkin.secondaryColor}20)`
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <span className="text-5xl">{selectedSkin.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold">{selectedSkin.name}</h2>
                  <span className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                    selectedSkin.rarity === 'mythic' ? 'bg-red-500' :
                    selectedSkin.rarity === 'legendary' ? 'bg-orange-500' :
                    selectedSkin.rarity === 'epic' ? 'bg-purple-500' :
                    selectedSkin.rarity === 'rare' ? 'bg-blue-500' :
                    'bg-gray-500'
                  }`}>
                    {selectedSkin.rarity.toUpperCase()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedSkin(null)}
                className="text-gray-400 text-2xl"
              >
                ×
              </button>
            </div>

            <p className="text-gray-300 mb-4">{selectedSkin.description}</p>

            {/* Color palette */}
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-2">Color Palette</p>
              <div className="flex gap-2">
                <div className="flex-1 h-12 rounded-lg" style={{ backgroundColor: selectedSkin.primaryColor }} />
                <div className="flex-1 h-12 rounded-lg" style={{ backgroundColor: selectedSkin.secondaryColor }} />
                <div className="flex-1 h-12 rounded-lg" style={{ backgroundColor: selectedSkin.accentColor }} />
              </div>
            </div>

            {/* Unlock condition */}
            <div className="bg-black/30 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-400 mb-1">How to unlock</p>
              <p className="font-medium">{selectedSkin.unlockCondition}</p>
              <p className="text-xs text-gray-500 mt-2">Requires {selectedSkin.minTier}+ tier</p>
            </div>

            {/* Action button */}
            {unlockedSkins.includes(selectedSkin.code) ? (
              <button
                onClick={() => handleSelectSkin(selectedSkin)}
                className={`w-full py-4 rounded-xl font-bold text-lg ${
                  activeSkin === selectedSkin.code
                    ? 'bg-green-500 text-white'
                    : 'bg-orange-500 text-white'
                }`}
              >
                {activeSkin === selectedSkin.code ? '✓ Active' : 'Apply Skin'}
              </button>
            ) : (
              <button
                disabled
                className="w-full py-4 rounded-xl font-bold text-lg bg-gray-700 text-gray-400"
              >
                🔒 Locked
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
