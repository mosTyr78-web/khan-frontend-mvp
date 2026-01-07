import { useState } from 'react';

const SKINS = [
  // ANIME MEN
  {
    code: 'goku',
    name: 'Goku Theme',
    description: 'Unlock the power of a Saiyan warrior',
    category: 'anime',
    unlockCondition: 'Complete 10 Force challenges',
    image: '/assets/skins/goku.png',
    primaryColor: '#FF6B00',
    secondaryColor: '#0066FF',
    accentColor: '#FFD700',
    minTier: 'PRO',
    rarity: 'legendary',
    icon: '🔥',
    gender: 'male'
  },
  {
    code: 'vegeta',
    name: 'Vegeta Theme',
    description: 'Pride of the Saiyan Prince',
    category: 'anime',
    unlockCondition: 'Reach Titan level in Strength tree',
    image: '/assets/skins/vegeta.png',
    primaryColor: '#1E3A8A',
    secondaryColor: '#FFD700',
    accentColor: '#FFFFFF',
    minTier: 'ELITE',
    rarity: 'legendary',
    icon: '👑',
    gender: 'male'
  },
  {
    code: 'saitama',
    name: 'Saitama Theme',
    description: '100 pushups, 100 situps, 100 squats, 10km run. Every day.',
    category: 'anime',
    unlockCondition: 'Complete 1,000,000 reps total',
    image: '/assets/skins/saitama.png',
    primaryColor: '#FEF08A',
    secondaryColor: '#DC2626',
    accentColor: '#000000',
    minTier: 'LEGEND',
    rarity: 'mythic',
    icon: '👊',
    gender: 'male'
  },
  {
    code: 'naruto',
    name: 'Naruto Theme',
    description: 'Believe it! Never give up',
    category: 'anime',
    unlockCondition: 'Complete 50 challenges',
    image: '/assets/skins/naruto.png',
    primaryColor: '#F97316',
    secondaryColor: '#1E3A8A',
    accentColor: '#FFFFFF',
    minTier: 'PRO',
    rarity: 'epic',
    icon: '🍥',
    gender: 'male'
  },
  {
    code: 'flash',
    name: 'Flash Theme',
    description: 'Speed force activated',
    category: 'heroes',
    unlockCondition: 'Reach Ultra Runner in Running tree',
    image: '/assets/skins/flash.png',
    primaryColor: '#DC2626',
    secondaryColor: '#FCD34D',
    accentColor: '#FFFFFF',
    minTier: 'ELITE',
    rarity: 'legendary',
    icon: '⚡',
    gender: 'male'
  },
  {
    code: 'broly',
    name: 'Broly Theme',
    description: 'LEGENDARY Super Saiyan - Ultimate power unleashed',
    category: 'anime',
    unlockCondition: 'LEGEND tier exclusive - The ultimate warrior',
    image: '/assets/skins/broly.png',
    primaryColor: '#22C55E',
    secondaryColor: '#000000',
    accentColor: '#A855F7',
    minTier: 'LEGEND',
    rarity: 'mythic',
    icon: '🐉',
    gender: 'male'
  },

  // ANIME WOMEN
  {
    code: 'caulifla',
    name: 'Caulifla Theme',
    description: 'The prodigy Saiyan warrior',
    category: 'anime',
    unlockCondition: 'Complete 10 Force challenges',
    image: '/assets/skins/caulifla.png',
    primaryColor: '#A855F7',
    secondaryColor: '#EC4899',
    accentColor: '#FFFFFF',
    minTier: 'PRO',
    rarity: 'legendary',
    icon: '💜',
    gender: 'female'
  },
  {
    code: 'android18',
    name: 'Android 18 Theme',
    description: 'Cool, calm, unstoppable',
    category: 'anime',
    unlockCondition: 'Reach Titan level in Strength tree',
    image: '/assets/skins/android18.png',
    primaryColor: '#60A5FA',
    secondaryColor: '#1E3A8A',
    accentColor: '#FFFFFF',
    minTier: 'ELITE',
    rarity: 'legendary',
    icon: '❄️',
    gender: 'female'
  },
  {
    code: 'sakura',
    name: 'Sakura Theme',
    description: 'Inner strength unleashed',
    category: 'anime',
    unlockCondition: 'Complete 50 challenges',
    image: '/assets/skins/sakura.png',
    primaryColor: '#F472B6',
    secondaryColor: '#22C55E',
    accentColor: '#FFFFFF',
    minTier: 'PRO',
    rarity: 'epic',
    icon: '🌸',
    gender: 'female'
  },
  {
    code: 'mirko',
    name: 'Mirko Theme',
    description: 'The rabbit hero - pure power',
    category: 'anime',
    unlockCondition: 'Reach 500 workouts',
    image: '/assets/skins/mirko.png',
    primaryColor: '#1F2937',
    secondaryColor: '#EF4444',
    accentColor: '#FFFFFF',
    minTier: 'ELITE',
    rarity: 'legendary',
    icon: '🐰',
    gender: 'female'
  },

  // HEROES WOMEN
  {
    code: 'wonderwoman',
    name: 'Wonder Woman Theme',
    description: 'Amazonian warrior strength',
    category: 'heroes',
    unlockCondition: 'Complete 100 challenges',
    image: '/assets/skins/wonderwoman.png',
    primaryColor: '#DC2626',
    secondaryColor: '#FFD700',
    accentColor: '#1E3A8A',
    minTier: 'ULTRA',
    rarity: 'mythic',
    icon: '⭐',
    gender: 'female'
  },
  {
    code: 'captainmarvel',
    name: 'Captain Marvel Theme',
    description: 'Cosmic power unleashed',
    category: 'heroes',
    unlockCondition: 'Subscribe to LEGEND tier',
    image: '/assets/skins/captainmarvel.png',
    primaryColor: '#DC2626',
    secondaryColor: '#1E40AF',
    accentColor: '#FFD700',
    minTier: 'LEGEND',
    rarity: 'mythic',
    icon: '✨',
    gender: 'female'
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
    icon: '🌿',
    gender: 'neutral'
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
    icon: '🌊',
    gender: 'neutral'
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
    icon: '🌋',
    gender: 'neutral'
  },

  // LEGENDARY TIER SKINS
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
    icon: '👑',
    gender: 'neutral'
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
    icon: '💎',
    gender: 'neutral'
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

const CATEGORIES = ['all', 'anime', 'heroes', 'nature', 'legendary'];
const GENDERS = ['all', 'male', 'female'];

export default function Skins({ goTo, userTier, activeSkin, setActiveSkin }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedSkin, setSelectedSkin] = useState(null);

  // Demo: unlock some skins based on tier
  const tierOrder = ['FREE', 'STARTER', 'PRO', 'ELITE', 'ULTRA', 'LEGEND'];
  const userTierIndex = tierOrder.indexOf(userTier);

  const getUnlockedSkins = () => {
    const unlocked = [];
    if (userTierIndex >= 2) unlocked.push('naruto', 'sakura', 'nature', 'caulifla'); // PRO
    if (userTierIndex >= 3) unlocked.push('flash', 'goku', 'vegeta', 'android18', 'mirko', 'ocean', 'volcano'); // ELITE
    if (userTierIndex >= 4) unlocked.push('ultra', 'wonderwoman'); // ULTRA
    if (userTierIndex >= 5) unlocked.push('legend', 'saitama', 'captainmarvel'); // LEGEND
    return unlocked;
  };

  const unlockedSkins = getUnlockedSkins();

  const filteredSkins = SKINS.filter(s => {
    const categoryMatch = selectedCategory === 'all' || s.category === selectedCategory;
    const genderMatch = selectedGender === 'all' || s.gender === selectedGender || s.gender === 'neutral';
    return categoryMatch && genderMatch;
  });

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
          <button onClick={() => goTo('home')} className="text-2xl">←</button>
          <h1 className="text-xl font-bold">Skins</h1>
          <div className="text-sm text-gray-400">
            {unlockedSkins.length}/{SKINS.length}
          </div>
        </div>

        {/* Gender Filter */}
        <div className="flex gap-2 px-4 pb-2">
          {GENDERS.map(g => (
            <button
              key={g}
              onClick={() => setSelectedGender(g)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedGender === g
                  ? 'bg-orange-500 text-white'
                  : 'bg-white/10 text-gray-400'
              }`}
            >
              {g === 'all' ? '👥 All' : g === 'male' ? '👨 Men' : '👩 Women'}
            </button>
          ))}
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
      {activeSkin && SKINS.find(s => s.code === activeSkin) && (
        <div className="p-4">
          <div
            className="relative p-6 rounded-2xl border-2 border-orange-500 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${
                SKINS.find(s => s.code === activeSkin)?.primaryColor || '#FF6B00'
              }30, ${
                SKINS.find(s => s.code === activeSkin)?.secondaryColor || '#FF0000'
              }30)`
            }}
          >
            {SKINS.find(s => s.code === activeSkin)?.image && (
              <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30">
                <img
                  src={SKINS.find(s => s.code === activeSkin)?.image}
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
            )}
            <div className="relative z-10">
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
        </div>
      )}

      {/* Skins Grid */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {filteredSkins.map(skin => {
          const isUnlocked = unlockedSkins.includes(skin.code);
          const isActive = activeSkin === skin.code;

          return (
            <div
              key={skin.code}
              onClick={() => setSelectedSkin(skin)}
              className={`relative rounded-xl border-2 overflow-hidden cursor-pointer transition-all hover:scale-105 ${
                isActive ? 'border-orange-500 ring-2 ring-orange-500' : RARITY_COLORS[skin.rarity]
              } ${!isUnlocked && 'opacity-60'}`}
            >
              {/* Background image or gradient */}
              {skin.image ? (
                <div className="aspect-square relative">
                  <img
                    src={skin.image}
                    alt={skin.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
              ) : (
                <div className={`aspect-square bg-gradient-to-br ${RARITY_BG[skin.rarity]}`} />
              )}

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="flex justify-between items-end">
                  <div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      skin.rarity === 'mythic' ? 'bg-red-500' :
                      skin.rarity === 'legendary' ? 'bg-orange-500' :
                      skin.rarity === 'epic' ? 'bg-purple-500' :
                      skin.rarity === 'rare' ? 'bg-blue-500' :
                      'bg-gray-500'
                    }`}>
                      {skin.rarity}
                    </span>
                    <h3 className="font-bold text-sm mt-1">{skin.name}</h3>
                  </div>
                  <span className="text-2xl">{skin.icon}</span>
                </div>
              </div>

              {/* Lock overlay */}
              {!isUnlocked && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-3xl">🔒</span>
                    <p className="text-xs text-gray-400 mt-1">{skin.minTier}+</p>
                  </div>
                </div>
              )}

              {/* Active indicator */}
              {isActive && (
                <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                  <span className="text-white text-sm">✓</span>
                </div>
              )}
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
            className="bg-gray-900 rounded-t-3xl w-full max-w-lg overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Skin image header */}
            {selectedSkin.image && (
              <div className="relative h-64">
                <img
                  src={selectedSkin.image}
                  alt={selectedSkin.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                <button
                  onClick={() => setSelectedSkin(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white text-xl"
                >
                  ×
                </button>
              </div>
            )}

            <div className="p-6" style={{
              background: selectedSkin.image ? undefined : `linear-gradient(135deg, ${selectedSkin.primaryColor}20, ${selectedSkin.secondaryColor}20)`
            }}>
              {!selectedSkin.image && (
                <button
                  onClick={() => setSelectedSkin(null)}
                  className="absolute top-4 right-4 text-gray-400 text-2xl"
                >
                  ×
                </button>
              )}

              <div className="flex items-center gap-4 mb-4">
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
                  🔒 Locked - Requires {selectedSkin.minTier}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
