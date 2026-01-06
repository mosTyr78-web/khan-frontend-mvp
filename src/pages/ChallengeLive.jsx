import { useState, useEffect } from 'react';

// Upcoming and past live challenges
const LIVE_CHALLENGES = [
  {
    id: 'live-001',
    title: 'KHAN LIVE: 1000 Squats Challenge',
    description: 'Rejoins-nous en direct pour 1000 squats en communaute. Ceux qui finissent gagnent le badge "Squat Warrior".',
    youtubeId: null, // Will be set when live
    scheduledDate: '2025-01-15T18:00:00',
    duration: 60,
    difficulty: 'HARD',
    badge: {
      name: 'Squat Warrior',
      icon: '🦵',
      description: 'A complete le 1000 Squats Live Challenge'
    },
    participants: 0,
    status: 'upcoming',
    host: 'KHAN',
    category: 'strength'
  },
  {
    id: 'live-002',
    title: 'KHAN LIVE: 5K Run Together',
    description: 'Course de 5K en direct. Filme-toi et partage sur les reseaux avec #KHAN5K pour le badge.',
    youtubeId: null,
    scheduledDate: '2025-01-20T08:00:00',
    duration: 45,
    difficulty: 'MEDIUM',
    badge: {
      name: 'Community Runner',
      icon: '🏃',
      description: 'A participe au 5K Live Challenge'
    },
    participants: 0,
    status: 'upcoming',
    host: 'KHAN',
    category: 'running'
  },
  {
    id: 'live-003',
    title: 'KHAN LIVE: 100 Burpees Blitz',
    description: '100 burpees en moins de 20 minutes. Les survivors gagnent le badge "Burpee Beast".',
    youtubeId: null,
    scheduledDate: '2025-01-25T19:00:00',
    duration: 30,
    difficulty: 'EXTREME',
    badge: {
      name: 'Burpee Beast',
      icon: '🔥',
      description: 'A survecu au 100 Burpees Live Challenge'
    },
    participants: 0,
    status: 'upcoming',
    host: 'KHAN',
    category: 'cardio'
  },
  {
    id: 'live-004',
    title: 'KHAN LIVE: Yoga Flow Session',
    description: 'Session yoga relaxante pour tous niveaux. Badge "Zen Master" pour les participants.',
    youtubeId: null,
    scheduledDate: '2025-01-28T07:00:00',
    duration: 45,
    difficulty: 'EASY',
    badge: {
      name: 'Zen Master',
      icon: '🧘',
      description: 'A participe au Yoga Flow Live'
    },
    participants: 0,
    status: 'upcoming',
    host: 'KHAN',
    category: 'flexibility'
  }
];

const PAST_CHALLENGES = [
  {
    id: 'live-past-001',
    title: 'KHAN LIVE: New Year 2025 Workout',
    description: 'Le premier workout de 2025 en communaute!',
    youtubeId: 'dQw4w9WgXcQ', // Placeholder
    date: '2025-01-01T10:00:00',
    duration: 60,
    badge: {
      name: 'New Year Warrior',
      icon: '🎆',
      description: 'A commence 2025 avec KHAN'
    },
    participants: 234,
    status: 'completed'
  }
];

const DIFFICULTY_COLORS = {
  EASY: 'bg-green-500/20 text-green-400 border-green-500/30',
  MEDIUM: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  HARD: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  EXTREME: 'bg-red-500/20 text-red-400 border-red-500/30'
};

const CATEGORY_ICONS = {
  strength: '💪',
  running: '🏃',
  cardio: '❤️',
  flexibility: '🧘'
};

export default function ChallengeLive({ goTo, userTier, isLoggedIn }) {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [notifyEnabled, setNotifyEnabled] = useState({});
  const [currentLive, setCurrentLive] = useState(null);

  // Check if any challenge is currently live
  useEffect(() => {
    const checkLive = () => {
      const now = new Date();
      const live = LIVE_CHALLENGES.find(c => {
        const start = new Date(c.scheduledDate);
        const end = new Date(start.getTime() + c.duration * 60000);
        return now >= start && now <= end;
      });
      setCurrentLive(live);
    };

    checkLive();
    const interval = setInterval(checkLive, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeUntil = (dateStr) => {
    const now = new Date();
    const target = new Date(dateStr);
    const diff = target - now;

    if (diff < 0) return 'En cours ou termine';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `Dans ${days}j ${hours}h`;
    if (hours > 0) return `Dans ${hours}h ${minutes}min`;
    return `Dans ${minutes}min`;
  };

  const toggleNotify = (challengeId) => {
    setNotifyEnabled(prev => ({
      ...prev,
      [challengeId]: !prev[challengeId]
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => goTo('home')} className="text-2xl">←</button>
          <div className="text-center">
            <h1 className="text-xl font-bold">KHAN LIVE</h1>
            <p className="text-xs text-red-500 flex items-center justify-center gap-1">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              Challenges en Direct
            </p>
          </div>
          <a
            href="https://www.youtube.com/@Johnkhanbash"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
              <path fill="#000" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setSelectedTab('upcoming')}
            className={`flex-1 py-3 text-sm font-bold ${
              selectedTab === 'upcoming' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'
            }`}
          >
            A Venir
          </button>
          <button
            onClick={() => setSelectedTab('past')}
            className={`flex-1 py-3 text-sm font-bold ${
              selectedTab === 'past' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'
            }`}
          >
            Replays
          </button>
          <button
            onClick={() => setSelectedTab('badges')}
            className={`flex-1 py-3 text-sm font-bold ${
              selectedTab === 'badges' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'
            }`}
          >
            Mes Badges
          </button>
        </div>
      </div>

      {/* Current Live Banner */}
      {currentLive && (
        <div className="m-4 p-4 rounded-2xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
              <span className="text-2xl">🔴</span>
            </div>
            <div className="flex-1">
              <p className="text-red-400 text-xs font-bold">EN DIRECT MAINTENANT</p>
              <p className="font-bold">{currentLive.title}</p>
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${currentLive.youtubeId || 'live'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-red-500 rounded-full text-sm font-bold"
            >
              Rejoindre
            </a>
          </div>
        </div>
      )}

      {/* Info Banner */}
      <div className="mx-4 mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
        <p className="text-sm text-gray-300">
          <span className="text-purple-400 font-bold">Comment ca marche?</span><br/>
          Rejoins les lives YouTube, complete le challenge, et gagne des badges exclusifs!
          Partage ta participation avec <span className="text-orange-400">#KHANLive</span> sur les reseaux.
        </p>
      </div>

      {/* Upcoming Tab */}
      {selectedTab === 'upcoming' && (
        <div className="p-4 space-y-4">
          {LIVE_CHALLENGES.map(challenge => (
            <div
              key={challenge.id}
              className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden"
            >
              {/* Challenge Header */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold border ${DIFFICULTY_COLORS[challenge.difficulty]}`}>
                      {challenge.difficulty}
                    </span>
                    <span className="text-lg">{CATEGORY_ICONS[challenge.category]}</span>
                  </div>
                  <span className="text-xs text-orange-400 font-bold">
                    {getTimeUntil(challenge.scheduledDate)}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-1">{challenge.title}</h3>
                <p className="text-sm text-gray-400 mb-3">{challenge.description}</p>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>📅 {formatDate(challenge.scheduledDate)}</span>
                  <span>⏱️ {challenge.duration} min</span>
                </div>
              </div>

              {/* Badge Preview */}
              <div className="px-4 py-3 bg-white/5 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-xl">
                      {challenge.badge.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-yellow-400">{challenge.badge.name}</p>
                      <p className="text-xs text-gray-500">Badge exclusif</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleNotify(challenge.id)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                      notifyEnabled[challenge.id]
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    {notifyEnabled[challenge.id] ? '🔔 Notifie' : '🔕 Me notifier'}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Subscribe CTA */}
          <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 text-center">
            <p className="text-lg font-bold mb-2">Ne rate aucun live!</p>
            <p className="text-sm text-gray-400 mb-4">
              Abonne-toi a la chaine YouTube et active la cloche
            </p>
            <a
              href="https://www.youtube.com/@Johnkhanbash?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 rounded-full font-bold"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
                <path fill="#fff" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              S'abonner
            </a>
          </div>
        </div>
      )}

      {/* Past/Replays Tab */}
      {selectedTab === 'past' && (
        <div className="p-4 space-y-4">
          {PAST_CHALLENGES.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-4xl mb-4">📹</p>
              <p>Aucun replay disponible pour l'instant</p>
            </div>
          ) : (
            PAST_CHALLENGES.map(challenge => (
              <div
                key={challenge.id}
                className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden"
              >
                {/* YouTube Thumbnail */}
                <div className="relative aspect-video bg-gray-900">
                  <img
                    src={`https://img.youtube.com/vi/${challenge.youtubeId}/maxresdefault.jpg`}
                    alt={challenge.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <a
                      href={`https://www.youtube.com/watch?v=${challenge.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </a>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs">
                    {challenge.duration} min
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold mb-1">{challenge.title}</h3>
                  <p className="text-sm text-gray-400 mb-3">{challenge.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                        {challenge.badge.icon}
                      </div>
                      <span className="text-sm text-yellow-400">{challenge.badge.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">{challenge.participants} participants</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Badges Tab */}
      {selectedTab === 'badges' && (
        <div className="p-4">
          {!isLoggedIn ? (
            <div className="text-center py-12">
              <p className="text-4xl mb-4">🔒</p>
              <p className="text-gray-400 mb-4">Connecte-toi pour voir tes badges Live</p>
              <button
                onClick={() => goTo('login')}
                className="px-6 py-3 bg-orange-500 rounded-full font-bold"
              >
                Se connecter
              </button>
            </div>
          ) : (
            <div>
              <div className="bg-white/5 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-400">
                  Les badges Live sont des recompenses exclusives pour ceux qui participent
                  aux challenges en direct. Ils ne peuvent pas etre obtenus autrement!
                </p>
              </div>

              <h3 className="font-bold mb-4">Mes Badges Live (0)</h3>

              <div className="text-center py-8 text-gray-500">
                <p className="text-4xl mb-4">🏆</p>
                <p>Participe a ton premier live pour gagner un badge!</p>
              </div>

              <h3 className="font-bold mb-4 mt-8">Badges Disponibles</h3>
              <div className="grid grid-cols-2 gap-4">
                {[...LIVE_CHALLENGES, ...PAST_CHALLENGES].map(challenge => (
                  <div
                    key={challenge.id}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 text-center opacity-50"
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-2xl mx-auto mb-2">
                      {challenge.badge.icon}
                    </div>
                    <p className="text-sm font-bold">{challenge.badge.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{challenge.badge.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black to-transparent">
        <div className="flex gap-3">
          <button
            onClick={() => goTo('challenges')}
            className="flex-1 py-4 rounded-xl bg-white/10 font-bold"
          >
            Challenges Solo
          </button>
          <a
            href="https://www.youtube.com/@Johnkhanbash"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-4 rounded-xl bg-red-600 font-bold text-center"
          >
            Chaine YouTube
          </a>
        </div>
      </div>
    </div>
  );
}
