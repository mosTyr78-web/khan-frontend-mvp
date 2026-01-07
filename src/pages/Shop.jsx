import { useState } from 'react';

// Rewards - Unlockable through progression only
// T-shirts: PRO+ | Hoodies/Pants: ELITE+ | Medals: ELITE+
const REWARDS = {
  men: [
    { id: 1, name: 'KHAN Classic', image: '/images/merch/tshirt-1.png', requirement: '50 workouts', unlockValue: 50, type: 'workouts', tier: 'PRO' },
    { id: 2, name: 'KHAN Elite Tee', image: '/images/merch/tshirt-2.png', requirement: '100 workouts', unlockValue: 100, type: 'workouts', tier: 'PRO' },
    { id: 3, name: 'KHAN Warrior', image: '/images/merch/tshirt-3.png', requirement: '30 day streak', unlockValue: 30, type: 'streak', tier: 'PRO' },
    { id: 4, name: 'KHAN White Hoodie', image: '/images/merch/hoodie-1.png', requirement: '90 day streak', unlockValue: 90, type: 'streak', tier: 'LEGEND' },
    { id: 5, name: 'KHAN Joggers', image: '/images/merch/sweatpants-1.png', requirement: '75 workouts', unlockValue: 75, type: 'workouts', tier: 'ELITE' },
  ],
  women: [
    { id: 6, name: 'KHAN Fit Tee', image: '/images/merch/tshirt-women-1.png', requirement: '50 workouts', unlockValue: 50, type: 'workouts', tier: 'PRO' },
    { id: 7, name: 'KHAN Sport Tee', image: '/images/merch/tshirt-women-2.png', requirement: '100 workouts', unlockValue: 100, type: 'workouts', tier: 'PRO' },
    { id: 8, name: 'KHAN Active Tee', image: '/images/merch/tshirt-women-3.png', requirement: '30 day streak', unlockValue: 30, type: 'streak', tier: 'PRO' },
    { id: 9, name: 'KHAN Cozy Hoodie', image: '/images/merch/hoodie-women-1.png', requirement: '60 day streak', unlockValue: 60, type: 'streak', tier: 'ELITE' },
    { id: 10, name: 'KHAN Cloud Hoodie', image: '/images/merch/hoodie-women-2.png', requirement: '90 day streak', unlockValue: 90, type: 'streak', tier: 'LEGEND' },
  ],
  medals: [
    { id: 11, name: 'Champion Medal', image: '/images/merch/medal-gold-1.png', requirement: '25 challenges', unlockValue: 25, type: 'challenges', tier: 'ELITE' },
    { id: 12, name: 'Warrior Medal', image: '/images/merch/medal-gold-2.png', requirement: '50 challenges', unlockValue: 50, type: 'challenges', tier: 'ELITE' },
    { id: 13, name: 'Legend Medal', image: '/images/merch/medal-gold-3.png', requirement: '100 challenges', unlockValue: 100, type: 'challenges', tier: 'LEGEND' },
    { id: 14, name: 'Starter Medal', image: '/images/merch/medal-6.png', requirement: '30 day member', unlockValue: 30, type: 'days', tier: 'ELITE' },
  ],
};

const tierOrder = { FREE: 0, PRO: 1, ELITE: 2, ULTRA: 3, LEGEND: 4 };

export default function Shop({ goTo, userTier = 'ELITE' }) {
  const [section, setSection] = useState('men');

  // Mock user stats
  const userStats = {
    workouts: 45,
    streak: 7,
    challenges: 12,
    days: 60
  };

  const userTierLevel = tierOrder[userTier] || 0;

  const getAccessibleItems = () => {
    return REWARDS[section].filter(item => tierOrder[item.tier] <= userTierLevel);
  };

  const isUnlocked = (item) => {
    return userStats[item.type] >= item.unlockValue;
  };

  const getProgress = (item) => {
    return Math.min(100, Math.round((userStats[item.type] / item.unlockValue) * 100));
  };

  const accessibleItems = getAccessibleItems();
  const unlockedItems = accessibleItems.filter(i => isUnlocked(i));
  const lockedItems = accessibleItems.filter(i => !isUnlocked(i));
  const visibleLockedItems = lockedItems.slice(0, 2);
  const hiddenCount = lockedItems.length - visibleLockedItems.length;
  const tierLockedCount = REWARDS[section].filter(item => tierOrder[item.tier] > userTierLevel).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => goTo('home')} className="text-2xl">←</button>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black">Rewards</h1>
            <span className="px-2 py-0.5 bg-orange-500 rounded text-[10px] font-bold">BETA</span>
          </div>
          <div className="w-8" />
        </div>
      </div>

      <div className="p-4">
        <p className="text-gray-500 text-sm mb-4">Earned through dedication</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
            <p className="text-orange-500 text-xl font-black">{unlockedItems.length}</p>
            <p className="text-gray-500 text-[10px]">UNLOCKED</p>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <p className="text-purple-500 text-xl font-black">{userStats.workouts}</p>
            <p className="text-gray-500 text-[10px]">WORKOUTS</p>
          </div>
          <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
            <p className="text-green-500 text-xl font-black">{userStats.streak}</p>
            <p className="text-gray-500 text-[10px]">STREAK</p>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex gap-2 mb-6">
          {['men', 'women', 'medals'].map(s => (
            <button
              key={s}
              onClick={() => setSection(s)}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                section === s
                  ? 'bg-orange-500 text-white'
                  : 'bg-white/5 text-gray-500 border border-white/10'
              }`}
            >
              {s === 'men' ? "Men's" : s === 'women' ? "Women's" : 'Medals'}
            </button>
          ))}
        </div>

        {/* Tier Notice */}
        {section === 'medals' && userTierLevel < tierOrder['ELITE'] && (
          <div className="mb-4 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <p className="text-purple-400 text-xs font-semibold">Medals require ELITE tier or above</p>
          </div>
        )}

        {/* Unlocked Items */}
        {unlockedItems.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold mb-3">Unlocked</h3>
            <div className="grid grid-cols-2 gap-3">
              {unlockedItems.map(item => (
                <div
                  key={item.id}
                  className="rounded-xl bg-green-500/5 border border-green-500/20 overflow-hidden"
                >
                  <div className="relative aspect-square bg-black/50">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 right-2 px-2 py-0.5 bg-green-500 rounded text-[10px] font-bold">
                      UNLOCKED
                    </span>
                  </div>
                  <div className="p-3">
                    <h4 className="font-bold text-sm">{item.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* In Progress Items */}
        {visibleLockedItems.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-500 mb-3">In Progress</h3>
            <div className="grid grid-cols-2 gap-3">
              {visibleLockedItems.map(item => {
                const progress = getProgress(item);
                return (
                  <div
                    key={item.id}
                    className="rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden"
                  >
                    <div className="relative aspect-square bg-black/50">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-40" />
                      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                        <span className="text-2xl mb-1">⏳</span>
                        <span className="text-gray-400 text-xs">{item.requirement}</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-bold text-sm text-gray-500">{item.name}</h4>
                      <div className="mt-2">
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500 rounded-full" style={{ width: `${progress}%` }} />
                        </div>
                        <p className="text-gray-600 text-[10px] mt-1 text-right">{progress}%</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Hidden Rewards */}
        {(hiddenCount > 0 || tierLockedCount > 0) && (
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎁</span>
              <div>
                <p className="font-bold">{hiddenCount + tierLockedCount} More Rewards</p>
                <p className="text-gray-500 text-xs">Keep training to discover</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
