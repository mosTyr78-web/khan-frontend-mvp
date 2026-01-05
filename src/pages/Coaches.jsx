import { useState } from 'react';

const mockCoaches = [
  {
    id: 1,
    displayName: 'Mike "Iron" Johnson',
    bio: 'Ancien athlete olympique. 15 ans experience en coaching force et conditionnement.',
    instagramHandle: 'iron_mike_coach',
    specialties: ['Force', 'Musculation', 'Powerlifting'],
    verified: true,
    isBeta: true,
    clientsCount: 67,
    rating: 4.9,
    totalReviews: 45,
    userTier: 'LEGEND'
  },
  {
    id: 2,
    displayName: 'Sarah Chen',
    bio: 'Marathonienne elite. Specialiste endurance et preparation marathon.',
    instagramHandle: 'sarahrunsfar',
    linkedinUrl: 'linkedin.com/in/sarahchen',
    specialties: ['Running', 'Endurance', 'Marathon'],
    verified: true,
    isBeta: true,
    clientsCount: 124,
    rating: 4.8,
    totalReviews: 89,
    userTier: 'ELITE'
  },
  {
    id: 3,
    displayName: 'Yuki Tanaka',
    bio: 'Maitre yoga et meditation. Approche holistique du fitness.',
    instagramHandle: 'yukiyoga',
    specialties: ['Yoga', 'Flexibilite', 'Meditation'],
    verified: true,
    isBeta: true,
    clientsCount: 89,
    rating: 5.0,
    totalReviews: 52,
    userTier: 'ULTRA'
  },
  {
    id: 4,
    displayName: 'Alex Thunder',
    bio: 'Coach HIIT et cardio extreme. Transformations garanties.',
    instagramHandle: 'thunder_fitness',
    specialties: ['HIIT', 'Cardio', 'Fat Loss'],
    verified: false,
    isBeta: true,
    clientsCount: 23,
    rating: 4.6,
    totalReviews: 18,
    userTier: 'ELITE'
  }
];

const specialtyFilters = ['Tous', 'Force', 'Running', 'Yoga', 'HIIT', 'Cardio'];

export default function Coaches({ goTo, userTier, isLoggedIn }) {
  const [coaches] = useState(mockCoaches);
  const [selectedSpecialty, setSelectedSpecialty] = useState('Tous');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  const filteredCoaches = coaches.filter(coach => {
    if (showVerifiedOnly && !coach.verified) return false;
    if (selectedSpecialty !== 'Tous' && !coach.specialties.includes(selectedSpecialty)) return false;
    return true;
  });

  const tierBadgeColors = {
    ELITE: 'bg-purple-500',
    ULTRA: 'bg-yellow-500',
    LEGEND: 'bg-gradient-to-r from-red-500 to-orange-500'
  };

  return (
    <div className="min-h-screen w-screen bg-black/90 p-4 pb-24 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => goTo('home')} className="text-white text-2xl">←</button>
        <h1 className="text-white font-bold text-xl">Coachs KHAN</h1>
        <button
          onClick={() => goTo('become-coach')}
          className="text-orange-500 text-sm font-bold"
        >
          Devenir Coach
        </button>
      </div>

      {/* Beta Banner */}
      <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 mb-6 border border-green-500/30">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎉</span>
          <div>
            <p className="text-green-400 font-bold">Beta Gratuite</p>
            <p className="text-green-300/70 text-sm">Coaching gratuit pendant la beta!</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {specialtyFilters.map(specialty => (
            <button
              key={specialty}
              onClick={() => setSelectedSpecialty(specialty)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                selectedSpecialty === specialty
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  : 'bg-white/10 text-gray-400'
              }`}
            >
              {specialty}
            </button>
          ))}
        </div>
      </div>

      {/* Verified toggle */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setShowVerifiedOnly(!showVerifiedOnly)}
          className={`w-12 h-6 rounded-full transition-all ${
            showVerifiedOnly ? 'bg-green-500' : 'bg-gray-700'
          }`}
        >
          <div className={`w-5 h-5 bg-white rounded-full transform transition-all ${
            showVerifiedOnly ? 'translate-x-6' : 'translate-x-0.5'
          }`} />
        </button>
        <span className="text-gray-400 text-sm">Verifies uniquement</span>
      </div>

      {/* Coaches List */}
      <div className="space-y-4">
        {filteredCoaches.map(coach => (
          <div
            key={coach.id}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
          >
            <div className="flex gap-4">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-2xl">
                {coach.displayName.charAt(0)}
              </div>

              <div className="flex-1">
                {/* Name & verification */}
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold">{coach.displayName}</h3>
                  {coach.verified && (
                    <span className="text-blue-400">✓</span>
                  )}
                  <span className={`text-xs px-2 py-0.5 rounded-full text-white ${tierBadgeColors[coach.userTier]}`}>
                    {coach.userTier}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-white text-sm">{coach.rating}</span>
                  <span className="text-gray-500 text-sm">({coach.totalReviews} avis)</span>
                  <span className="text-gray-500 text-sm ml-2">• {coach.clientsCount} clients</span>
                </div>

                {/* Bio */}
                <p className="text-gray-400 text-sm mt-2 line-clamp-2">{coach.bio}</p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {coach.specialties.map(s => (
                    <span
                      key={s}
                      className="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Social */}
                <div className="flex gap-3 mt-3">
                  {coach.instagramHandle && (
                    <a
                      href={`https://instagram.com/${coach.instagramHandle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-400 text-sm"
                    >
                      @{coach.instagramHandle}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 mt-4">
              <button className="flex-1 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white font-bold text-sm">
                Contacter
              </button>
              <button className="px-4 py-2 bg-white/10 rounded-xl text-white text-sm">
                Profil
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCoaches.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun coach trouve</p>
        </div>
      )}
    </div>
  );
}
