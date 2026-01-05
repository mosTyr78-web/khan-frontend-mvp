import { useState, useEffect } from 'react';
import TreeBranch from '../components/TreeBranch';
import BadgeCard from '../components/BadgeCard';

const API_URL = 'https://khan-backend.onrender.com';

// Mock data for demo (will be replaced by API)
const mockTrees = [
  {
    sport: 'walking',
    icon: '🚶',
    levels: [
      { id: 1, name: 'Marcheur Debutant', order: 1, target: 100, unit: 'km', badgeCode: 'walker_rookie', skinReward: null, minTier: 'PRO', xpReward: 100, progress: 45, completed: false },
      { id: 2, name: 'Randonneur', order: 2, target: 500, unit: 'km', badgeCode: 'walker_hiker', skinReward: null, minTier: 'PRO', xpReward: 250, progress: 0, completed: false },
      { id: 3, name: 'Explorateur', order: 3, target: 2500, unit: 'km', badgeCode: 'walker_explorer', skinReward: null, minTier: 'ELITE', xpReward: 500, progress: 0, completed: false },
      { id: 4, name: 'Globe-Trotter', order: 4, target: 10000, unit: 'km', badgeCode: 'walker_globetrotter', skinReward: null, minTier: 'ELITE', xpReward: 1000, progress: 0, completed: false },
      { id: 5, name: 'Roi de la Marche', order: 5, target: 25000, unit: 'km', badgeCode: 'walker_king', skinReward: 'nature', minTier: 'ULTRA', xpReward: 2500, progress: 0, completed: false },
      { id: 6, name: 'Legende Eternelle', order: 6, target: 100000, unit: 'km', badgeCode: 'walker_eternal', skinReward: 'earth', minTier: 'LEGEND', xpReward: 10000, progress: 0, completed: false },
    ]
  },
  {
    sport: 'running',
    icon: '🏃',
    levels: [
      { id: 7, name: 'Jogger', order: 1, target: 50, unit: 'km', badgeCode: 'runner_jogger', skinReward: null, minTier: 'PRO', xpReward: 100, progress: 50, completed: true },
      { id: 8, name: 'Coureur', order: 2, target: 250, unit: 'km', badgeCode: 'runner_coureur', skinReward: null, minTier: 'PRO', xpReward: 250, progress: 120, completed: false },
      { id: 9, name: 'Marathonien', order: 3, target: 1000, unit: 'km', badgeCode: 'runner_marathon', skinReward: null, minTier: 'ELITE', xpReward: 500, progress: 0, completed: false },
      { id: 10, name: 'Ultra Runner', order: 4, target: 5000, unit: 'km', badgeCode: 'runner_ultra', skinReward: 'flash', minTier: 'ELITE', xpReward: 1000, progress: 0, completed: false },
      { id: 11, name: 'Iron Legs', order: 5, target: 15000, unit: 'km', badgeCode: 'runner_iron', skinReward: null, minTier: 'ULTRA', xpReward: 2500, progress: 0, completed: false },
      { id: 12, name: 'Flash Humain', order: 6, target: 50000, unit: 'km', badgeCode: 'runner_flash', skinReward: 'lightning', minTier: 'LEGEND', xpReward: 10000, progress: 0, completed: false },
    ]
  },
  {
    sport: 'strength',
    icon: '💪',
    levels: [
      { id: 13, name: 'Debutant Force', order: 1, target: 1000, unit: 'reps', badgeCode: 'strength_beginner', skinReward: null, minTier: 'PRO', xpReward: 100, progress: 200, completed: false },
      { id: 14, name: 'Intermediaire', order: 2, target: 10000, unit: 'reps', badgeCode: 'strength_intermediate', skinReward: null, minTier: 'PRO', xpReward: 250, progress: 0, completed: false },
      { id: 15, name: 'Avance', order: 3, target: 50000, unit: 'reps', badgeCode: 'strength_advanced', skinReward: null, minTier: 'ELITE', xpReward: 500, progress: 0, completed: false },
      { id: 16, name: 'Titan', order: 4, target: 200000, unit: 'reps', badgeCode: 'strength_titan', skinReward: 'vegeta', minTier: 'ELITE', xpReward: 1000, progress: 0, completed: false },
      { id: 17, name: 'Hercule', order: 5, target: 500000, unit: 'reps', badgeCode: 'strength_hercule', skinReward: null, minTier: 'ULTRA', xpReward: 2500, progress: 0, completed: false },
      { id: 18, name: 'Saiyan', order: 6, target: 1000000, unit: 'reps', badgeCode: 'strength_saiyan', skinReward: 'goku', minTier: 'LEGEND', xpReward: 10000, progress: 0, completed: false },
    ]
  },
  {
    sport: 'cardio',
    icon: '❤️',
    levels: [
      { id: 19, name: 'Coeur Actif', order: 1, target: 100, unit: 'sessions', badgeCode: 'cardio_active', skinReward: null, minTier: 'PRO', xpReward: 100, progress: 30, completed: false },
      { id: 20, name: 'Endurance', order: 2, target: 500, unit: 'sessions', badgeCode: 'cardio_endurance', skinReward: null, minTier: 'PRO', xpReward: 250, progress: 0, completed: false },
      { id: 21, name: 'Machine', order: 3, target: 2000, unit: 'sessions', badgeCode: 'cardio_machine', skinReward: null, minTier: 'ELITE', xpReward: 500, progress: 0, completed: false },
      { id: 22, name: 'Inarretable', order: 4, target: 10000, unit: 'sessions', badgeCode: 'cardio_unstoppable', skinReward: 'fire', minTier: 'ULTRA', xpReward: 1000, progress: 0, completed: false },
      { id: 23, name: 'Immortel', order: 5, target: 50000, unit: 'sessions', badgeCode: 'cardio_immortal', skinReward: 'phoenix', minTier: 'LEGEND', xpReward: 5000, progress: 0, completed: false },
    ]
  },
  {
    sport: 'flexibility',
    icon: '🧘',
    levels: [
      { id: 24, name: 'Souple', order: 1, target: 50, unit: 'sessions', badgeCode: 'flex_supple', skinReward: null, minTier: 'PRO', xpReward: 100, progress: 10, completed: false },
      { id: 25, name: 'Yogi', order: 2, target: 200, unit: 'sessions', badgeCode: 'flex_yogi', skinReward: null, minTier: 'PRO', xpReward: 250, progress: 0, completed: false },
      { id: 26, name: 'Maitre Zen', order: 3, target: 1000, unit: 'sessions', badgeCode: 'flex_zen', skinReward: 'zen', minTier: 'ELITE', xpReward: 500, progress: 0, completed: false },
      { id: 27, name: 'Contorsionniste', order: 4, target: 5000, unit: 'sessions', badgeCode: 'flex_contortionist', skinReward: 'water', minTier: 'ULTRA', xpReward: 1000, progress: 0, completed: false },
    ]
  }
];

const mockBadges = [
  { code: 'runner_jogger', name: 'Jogger', icon: 'run', rarity: 'common', earnedAt: '2024-01-15' }
];

export default function ProgressionTree({ userTier = 'PRO', goTo }) {
  const [trees, setTrees] = useState(mockTrees);
  const [myBadges, setMyBadges] = useState(mockBadges);
  const [selectedSport, setSelectedSport] = useState(null);
  const [totalXp, setTotalXp] = useState(100);

  // Calculate stats
  const totalCompleted = trees.reduce((sum, t) => sum + t.levels.filter(l => l.completed).length, 0);
  const totalLevels = trees.reduce((sum, t) => sum + t.levels.length, 0);

  const handleUpgrade = () => {
    goTo('pricing');
  };

  const handleSelectLevel = (level) => {
    console.log('Selected level:', level);
    // TODO: Show level details modal
  };

  return (
    <div className="min-h-screen w-screen bg-black/90 p-4 pb-24 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => goTo('home')}
          className="text-white text-2xl"
        >
          ←
        </button>
        <h1 className="text-white font-bold text-xl">Progression</h1>
        <div className="w-8" />
      </div>

      {/* Stats Card */}
      <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-4 mb-6 backdrop-blur-sm border border-orange-500/30">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-sm">Total XP</p>
            <p className="text-white text-2xl font-bold">{totalXp.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Completes</p>
            <p className="text-white text-2xl font-bold">{totalCompleted}/{totalLevels}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">Badges</p>
            <p className="text-white text-2xl font-bold">{myBadges.length}</p>
          </div>
        </div>
      </div>

      {/* My Badges */}
      {myBadges.length > 0 && (
        <div className="mb-6">
          <h2 className="text-white font-bold mb-3">Mes Badges</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {myBadges.map(badge => (
              <BadgeCard key={badge.code} badge={badge} earned={true} size="md" />
            ))}
          </div>
        </div>
      )}

      {/* Sport Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        <button
          onClick={() => setSelectedSport(null)}
          className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
            selectedSport === null
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
              : 'bg-white/10 text-gray-400'
          }`}
        >
          Tous
        </button>
        {trees.map(tree => (
          <button
            key={tree.sport}
            onClick={() => setSelectedSport(tree.sport)}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
              selectedSport === tree.sport
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                : 'bg-white/10 text-gray-400'
            }`}
          >
            {tree.icon} {tree.sport}
          </button>
        ))}
      </div>

      {/* Trees */}
      <div>
        {trees
          .filter(t => selectedSport === null || t.sport === selectedSport)
          .map(tree => (
            <TreeBranch
              key={tree.sport}
              tree={tree}
              userTier={userTier}
              onUpgrade={handleUpgrade}
              onSelectLevel={handleSelectLevel}
            />
          ))}
      </div>

      {/* Tier info footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-white/10 p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-xs">Ton tier</p>
            <p className="text-white font-bold">{userTier}</p>
          </div>
          <button
            onClick={handleUpgrade}
            className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-bold text-sm"
          >
            Upgrade pour debloquer plus
          </button>
        </div>
      </div>
    </div>
  );
}
