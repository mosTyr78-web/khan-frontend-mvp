import { useState } from 'react';

export default function BecomeCoach({ goTo, userTier, isLoggedIn }) {
  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    linkedinUrl: '',
    instagramHandle: '',
    specialties: []
  });
  const [submitted, setSubmitted] = useState(false);

  const eliteTiers = ['ELITE', 'ULTRA', 'LEGEND'];
  const isElite = eliteTiers.includes(userTier);

  const availableSpecialties = [
    'Force', 'Musculation', 'Powerlifting',
    'Running', 'Endurance', 'Marathon',
    'HIIT', 'Cardio', 'Fat Loss',
    'Yoga', 'Flexibilite', 'Meditation',
    'Nutrition', 'Mindset', 'Recovery'
  ];

  const toggleSpecialty = (specialty) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty].slice(0, 5)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Call API
    console.log('Submitting:', formData);
    setSubmitted(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-screen bg-black/90 flex flex-col items-center justify-center p-6">
        <div className="text-6xl mb-4">🔐</div>
        <h1 className="text-white font-bold text-2xl mb-2">Connexion requise</h1>
        <p className="text-gray-400 text-center mb-6">
          Connecte-toi pour devenir coach KHAN
        </p>
        <button
          onClick={() => goTo('login')}
          className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-bold"
        >
          Se connecter
        </button>
        <button
          onClick={() => goTo('home')}
          className="mt-4 text-gray-500"
        >
          Retour
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen w-screen bg-black/90 flex flex-col items-center justify-center p-6">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-white font-bold text-2xl mb-2">Candidature envoyee!</h1>
        <p className="text-gray-400 text-center mb-6">
          {isElite
            ? "En tant que membre Elite+, tu peux commencer a coacher immediatement!"
            : "Nous allons verifier ton profil. Tu recevras une confirmation sous 48h."
          }
        </p>
        <button
          onClick={() => goTo('coaches')}
          className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-bold"
        >
          Voir les coachs
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-black/90 p-4 pb-24 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => goTo('coaches')} className="text-white text-2xl">←</button>
        <h1 className="text-white font-bold text-xl">Devenir Coach</h1>
        <div className="w-8" />
      </div>

      {/* Elite badge */}
      {isElite && (
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 mb-6 border border-purple-500/30">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👑</span>
            <div>
              <p className="text-purple-400 font-bold">Membre {userTier}</p>
              <p className="text-purple-300/70 text-sm">Tu peux coacher immediatement!</p>
            </div>
          </div>
        </div>
      )}

      {/* Benefits */}
      <div className="bg-white/5 rounded-xl p-4 mb-6">
        <h2 className="text-white font-bold mb-3">Avantages Coach KHAN</h2>
        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-gray-300 text-sm">
            <span className="text-green-400">✓</span> Beta 100% gratuite
          </li>
          <li className="flex items-center gap-2 text-gray-300 text-sm">
            <span className="text-green-400">✓</span> 30% reduction avec 50+ clients
          </li>
          <li className="flex items-center gap-2 text-gray-300 text-sm">
            <span className="text-green-400">✓</span> Badge coach verifie
          </li>
          <li className="flex items-center gap-2 text-gray-300 text-sm">
            <span className="text-green-400">✓</span> Visibilite sur la plateforme
          </li>
        </ul>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Display Name */}
        <div>
          <label className="text-gray-400 text-sm mb-1 block">Nom d'affichage</label>
          <input
            type="text"
            value={formData.displayName}
            onChange={e => setFormData({...formData, displayName: e.target.value})}
            placeholder="Mike 'Iron' Johnson"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-500"
            required
          />
        </div>

        {/* Bio */}
        <div>
          <label className="text-gray-400 text-sm mb-1 block">Bio</label>
          <textarea
            value={formData.bio}
            onChange={e => setFormData({...formData, bio: e.target.value})}
            placeholder="Decris ton experience et ta philosophie de coaching..."
            rows={4}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 resize-none"
            required
          />
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Instagram</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4 py-3">
              <span className="text-gray-500">@</span>
              <input
                type="text"
                value={formData.instagramHandle}
                onChange={e => setFormData({...formData, instagramHandle: e.target.value})}
                placeholder="username"
                className="flex-1 bg-transparent text-white placeholder:text-gray-500 ml-1 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">LinkedIn</label>
            <input
              type="url"
              value={formData.linkedinUrl}
              onChange={e => setFormData({...formData, linkedinUrl: e.target.value})}
              placeholder="URL profil"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-500"
            />
          </div>
        </div>

        <p className="text-gray-500 text-xs">* LinkedIn ou Instagram requis pour verification</p>

        {/* Specialties */}
        <div>
          <label className="text-gray-400 text-sm mb-2 block">Specialites (max 5)</label>
          <div className="flex flex-wrap gap-2">
            {availableSpecialties.map(specialty => (
              <button
                key={specialty}
                type="button"
                onClick={() => toggleSpecialty(specialty)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  formData.specialties.includes(specialty)
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                    : 'bg-white/10 text-gray-400'
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!formData.displayName || !formData.bio || (!formData.instagramHandle && !formData.linkedinUrl)}
          className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6"
        >
          Soumettre ma candidature
        </button>
      </form>
    </div>
  );
}
