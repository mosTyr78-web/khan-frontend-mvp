import { useState } from 'react';

const mockClients = [
  { id: 1, name: 'Jean Dupont', tier: 'PRO', startedAt: '2024-12-01', status: 'active' },
  { id: 2, name: 'Marie Martin', tier: 'ELITE', startedAt: '2024-11-15', status: 'active' },
  { id: 3, name: 'Pierre Bernard', tier: 'PRO', startedAt: '2024-10-20', status: 'active' },
];

export default function CoachDashboard({ goTo, isLoggedIn }) {
  const [coachData] = useState({
    displayName: 'Coach Demo',
    bio: 'Coach fitness passionne',
    verified: true,
    isBeta: true,
    clientsCount: 45,
    discountEarned: 0,
    rating: 4.8,
    totalReviews: 32
  });

  const [clients] = useState(mockClients);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-screen bg-black/90 flex flex-col items-center justify-center p-6">
        <div className="text-6xl mb-4">🔐</div>
        <h1 className="text-white font-bold text-2xl mb-2">Connexion requise</h1>
        <button
          onClick={() => goTo('login')}
          className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-bold"
        >
          Se connecter
        </button>
      </div>
    );
  }

  const progressTo50 = Math.min((coachData.clientsCount / 50) * 100, 100);
  const clientsNeeded = Math.max(50 - coachData.clientsCount, 0);

  return (
    <div className="min-h-screen w-screen bg-black/90 p-4 pb-24 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => goTo('home')} className="text-white text-2xl">←</button>
        <h1 className="text-white font-bold text-xl">Dashboard Coach</h1>
        <button className="text-gray-400">⚙️</button>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-4 mb-6 border border-orange-500/30">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-2xl">
            {coachData.displayName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-white font-bold text-lg">{coachData.displayName}</h2>
              {coachData.verified && <span className="text-blue-400">✓</span>}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-yellow-400">★</span>
              <span className="text-white text-sm">{coachData.rating}</span>
              <span className="text-gray-500 text-sm">({coachData.totalReviews} avis)</span>
            </div>
            {coachData.isBeta && (
              <span className="inline-block mt-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                Beta Gratuite
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-white">{coachData.clientsCount}</p>
          <p className="text-gray-400 text-xs">Clients</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-white">{coachData.rating}</p>
          <p className="text-gray-400 text-xs">Note</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-400">{coachData.discountEarned}%</p>
          <p className="text-gray-400 text-xs">Reduction</p>
        </div>
      </div>

      {/* Discount Progress */}
      <div className="bg-white/5 rounded-xl p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-white font-bold">Objectif 50 clients</p>
          <p className="text-orange-400 font-bold">{coachData.clientsCount}/50</p>
        </div>
        <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all"
            style={{ width: `${progressTo50}%` }}
          />
        </div>
        {clientsNeeded > 0 ? (
          <p className="text-gray-400 text-sm mt-2">
            Encore {clientsNeeded} clients pour debloquer 30% de reduction!
          </p>
        ) : (
          <p className="text-green-400 text-sm mt-2">
            🎉 30% de reduction debloquee!
          </p>
        )}
      </div>

      {/* Clients List */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-white font-bold">Mes Clients</h3>
          <button className="text-orange-500 text-sm">+ Inviter</button>
        </div>

        <div className="space-y-2">
          {clients.map(client => (
            <div
              key={client.id}
              className="flex items-center justify-between bg-white/10 rounded-xl p-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
                  {client.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-medium">{client.name}</p>
                  <p className="text-gray-500 text-xs">
                    Depuis {new Date(client.startedAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                client.tier === 'ELITE' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
              }`}>
                {client.tier}
              </span>
            </div>
          ))}
        </div>

        {clients.length === 0 && (
          <div className="text-center py-8 bg-white/5 rounded-xl">
            <p className="text-gray-500">Aucun client pour l'instant</p>
            <button className="mt-4 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white text-sm font-bold">
              Inviter des clients
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
