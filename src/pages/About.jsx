import { useState } from 'react';

const MERCH_ITEMS = [
  // T-SHIRTS
  {
    id: 'tshirt-warrior',
    name: 'KHAN Warrior Tee',
    type: 'T-Shirt',
    image: '/merch/warrior-tee.png',
    requirement: '100 workouts completes',
    progress: 67,
    target: 100,
    tier: 'PRO',
    description: 'T-shirt officiel KHAN avec design Warrior exclusif'
  },
  {
    id: 'tshirt-legend',
    name: 'KHAN Legend Tee',
    type: 'T-Shirt',
    image: '/merch/legend-tee.png',
    requirement: 'Atteindre LEGEND tier',
    progress: 0,
    target: 1,
    tier: 'LEGEND',
    description: 'T-shirt dore reserve aux Legends'
  },
  {
    id: 'tshirt-saiyan',
    name: 'Saiyan Training Tee',
    type: 'T-Shirt',
    image: '/merch/saiyan-tee.png',
    requirement: '500,000 reps total (Force)',
    progress: 125000,
    target: 500000,
    tier: 'ELITE',
    description: 'Inspire par les guerriers legendaires'
  },

  // HOODIES
  {
    id: 'hoodie-khan',
    name: 'KHAN Original Hoodie',
    type: 'Hoodie',
    image: '/merch/khan-hoodie.png',
    requirement: '1 an d\'abonnement continu',
    progress: 8,
    target: 12,
    tier: 'PRO',
    description: 'Hoodie premium avec logo KHAN brode'
  },
  {
    id: 'hoodie-elite',
    name: 'Elite Fire Hoodie',
    type: 'Hoodie',
    image: '/merch/elite-hoodie.png',
    requirement: '50 challenges completes',
    progress: 23,
    target: 50,
    tier: 'ELITE',
    description: 'Hoodie avec design flammes exclusif'
  },

  // ACCESSORIES
  {
    id: 'cap-khan',
    name: 'KHAN Snapback',
    type: 'Casquette',
    image: '/merch/khan-cap.png',
    requirement: '30 jours consecutifs d\'entrainement',
    progress: 12,
    target: 30,
    tier: 'STARTER',
    description: 'Casquette snapback avec logo KHAN'
  },
  {
    id: 'bottle-khan',
    name: 'KHAN Shaker Pro',
    type: 'Shaker',
    image: '/merch/khan-shaker.png',
    requirement: '10,000 calories brulees',
    progress: 4500,
    target: 10000,
    tier: 'FREE',
    description: 'Shaker 750ml avec design KHAN'
  },
  {
    id: 'bag-gym',
    name: 'KHAN Gym Bag',
    type: 'Sac',
    image: '/merch/khan-bag.png',
    requirement: '200 workouts completes',
    progress: 67,
    target: 200,
    tier: 'PRO',
    description: 'Sac de sport KHAN avec compartiments'
  },

  // SPECIAL ITEMS
  {
    id: 'medal-iron',
    name: 'Medaille Iron Will',
    type: 'Medaille',
    image: '/merch/iron-medal.png',
    requirement: 'Courir 1,000km total',
    progress: 234,
    target: 1000,
    tier: 'ELITE',
    description: 'Medaille physique envoyee chez vous'
  },
  {
    id: 'medal-legend',
    name: 'Medaille Legend',
    type: 'Medaille',
    image: '/merch/legend-medal.png',
    requirement: 'Completer toutes les branches de progression',
    progress: 2,
    target: 5,
    tier: 'LEGEND',
    description: 'La medaille ultime - plaquee or'
  },
  {
    id: 'poster-signed',
    name: 'Poster Signe KHAN',
    type: 'Poster',
    image: '/merch/poster.png',
    requirement: 'Top 100 du leaderboard mensuel',
    progress: 0,
    target: 1,
    tier: 'ULTRA',
    description: 'Poster A2 avec artwork exclusif signe'
  }
];

const TIER_COLORS = {
  FREE: 'text-gray-400 border-gray-500',
  STARTER: 'text-gray-300 border-gray-400',
  PRO: 'text-blue-400 border-blue-500',
  ELITE: 'text-purple-400 border-purple-500',
  ULTRA: 'text-yellow-400 border-yellow-500',
  LEGEND: 'text-orange-400 border-orange-500'
};

export default function About({ goTo, userTier }) {
  const [selectedTab, setSelectedTab] = useState('about');
  const [selectedItem, setSelectedItem] = useState(null);

  const tierOrder = ['FREE', 'STARTER', 'PRO', 'ELITE', 'ULTRA', 'LEGEND'];
  const userTierIndex = tierOrder.indexOf(userTier);

  const canClaim = (item) => {
    const itemTierIndex = tierOrder.indexOf(item.tier);
    return item.progress >= item.target && userTierIndex >= itemTierIndex;
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => goTo('home')} className="text-2xl">←</button>
          <h1 className="text-xl font-bold">KHAN</h1>
          <div className="w-8" />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setSelectedTab('about')}
            className={`flex-1 py-3 text-sm font-bold ${
              selectedTab === 'about' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'
            }`}
          >
            A Propos
          </button>
          <button
            onClick={() => setSelectedTab('merch')}
            className={`flex-1 py-3 text-sm font-bold ${
              selectedTab === 'merch' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'
            }`}
          >
            Merch a Meriter
          </button>
          <button
            onClick={() => setSelectedTab('legal')}
            className={`flex-1 py-3 text-sm font-bold ${
              selectedTab === 'legal' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'
            }`}
          >
            Legal
          </button>
        </div>
      </div>

      {/* About Tab */}
      {selectedTab === 'about' && (
        <div className="p-4 space-y-6">
          {/* Hero */}
          <div className="text-center py-8">
            <h2 className="text-5xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              KHAN
            </h2>
            <p className="text-xl text-gray-400 mt-2">AI Fitness Coach</p>
            <p className="text-sm text-gray-500 mt-1">Tout se merite. Rien ne s'achete.</p>
          </div>

          {/* Philosophy */}
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-orange-500/20">
            <h3 className="text-lg font-bold mb-3">Notre Philosophie</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              KHAN est ne d'une conviction simple : dans le fitness comme dans la vie,
              <span className="text-orange-400 font-bold"> les vraies recompenses se meritent</span>.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed mt-3">
              Pas de raccourcis. Pas de pay-to-win. Chaque badge, chaque skin, chaque item
              de merch represente des heures d'effort, de sueur et de determination.
            </p>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-bold mb-3">Nos Programmes</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '🔥', name: 'Standard', desc: 'Tous niveaux' },
                { icon: '🦸', name: 'Kids', desc: '6-12 ans' },
                { icon: '💪👩', name: 'Mama Strong', desc: 'Femmes & Mamans' },
                { icon: '🦽', name: 'Accessible', desc: 'Mobilite adaptee' }
              ].map((prog, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <span className="text-2xl">{prog.icon}</span>
                  <p className="font-bold mt-2">{prog.name}</p>
                  <p className="text-xs text-gray-500">{prog.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div>
            <h3 className="text-lg font-bold mb-3">Nos Valeurs</h3>
            <div className="space-y-3">
              {[
                { icon: '🏆', title: 'Meritocratie', desc: 'Tout se debloque par l\'effort, jamais par l\'argent' },
                { icon: '🌍', title: 'Inclusion', desc: 'Programmes pour tous : enfants, adultes, seniors, personnes handicapees' },
                { icon: '🤝', title: 'Respect', desc: 'Zero tolerance pour le racisme, sexisme ou toute discrimination' },
                { icon: '💪', title: 'Perseverance', desc: 'Des objectifs sur 50 ans - le voyage compte plus que la destination' }
              ].map((val, i) => (
                <div key={i} className="flex gap-3 bg-white/5 rounded-xl p-4">
                  <span className="text-2xl">{val.icon}</span>
                  <div>
                    <p className="font-bold">{val.title}</p>
                    <p className="text-xs text-gray-400">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skins Disclaimer */}
          <div className="bg-purple-500/10 rounded-2xl p-6 border border-purple-500/20">
            <h3 className="text-lg font-bold mb-3 text-purple-400">A Propos des Skins</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Les skins et themes de KHAN sont des <span className="text-purple-400">oeuvres originales inspirees</span> par
              la culture populaire (anime, manga, jeux video).
            </p>
            <p className="text-gray-400 text-xs mt-3">
              Ces designs sont des hommages artistiques non commerciaux. KHAN n'est affilie a aucun
              studio ou detenteur de droits. Les skins se debloquent uniquement par le merite -
              ils ne peuvent pas etre achetes.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-2xl font-black text-orange-500">6</p>
              <p className="text-xs text-gray-500">Tiers</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-2xl font-black text-purple-500">20+</p>
              <p className="text-xs text-gray-500">Skins</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-2xl font-black text-blue-500">50</p>
              <p className="text-xs text-gray-500">Ans de defis</p>
            </div>
          </div>
        </div>
      )}

      {/* Merch Tab */}
      {selectedTab === 'merch' && (
        <div className="p-4">
          <div className="bg-orange-500/10 rounded-xl p-4 mb-4 border border-orange-500/20">
            <p className="text-sm text-orange-300">
              <span className="font-bold">Merch a Meriter</span> - Ces items physiques sont envoyes
              GRATUITEMENT quand vous atteignez les objectifs. Aucun achat possible.
            </p>
          </div>

          <div className="space-y-4">
            {MERCH_ITEMS.map(item => {
              const canClaimItem = canClaim(item);
              const progressPercent = Math.min(100, (item.progress / item.target) * 100);

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`bg-white/5 rounded-xl p-4 border ${
                    canClaimItem ? 'border-green-500' : 'border-white/10'
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center text-3xl">
                      {item.type === 'T-Shirt' && '👕'}
                      {item.type === 'Hoodie' && '🧥'}
                      {item.type === 'Casquette' && '🧢'}
                      {item.type === 'Shaker' && '🥤'}
                      {item.type === 'Sac' && '🎒'}
                      {item.type === 'Medaille' && '🏅'}
                      {item.type === 'Poster' && '🖼️'}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.type}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full border ${TIER_COLORS[item.tier]}`}>
                          {item.tier}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{item.requirement}</p>

                      {/* Progress bar */}
                      <div className="mt-2">
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${canClaimItem ? 'bg-green-500' : 'bg-orange-500'}`}
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">
                            {item.progress.toLocaleString()} / {item.target.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500">{Math.round(progressPercent)}%</span>
                        </div>
                      </div>

                      {canClaimItem && (
                        <button className="mt-2 w-full py-2 bg-green-500 rounded-lg text-sm font-bold">
                          Reclamer!
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Legal Tab */}
      {selectedTab === 'legal' && (
        <div className="p-4 space-y-4">
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="font-bold mb-2">Conditions Generales</h3>
            <p className="text-xs text-gray-400">
              En utilisant KHAN, vous acceptez nos CGU. L'application est destinee aux personnes de 16 ans et plus
              (ou avec autorisation parentale pour le programme Kids).
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="font-bold mb-2">Protection des Donnees (RGPD)</h3>
            <p className="text-xs text-gray-400">
              Vos donnees sont protegees conformement au RGPD. Vous disposez d'un droit d'acces,
              de rectification et de suppression. Contact: privacy@khanfitness.app
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="font-bold mb-2">Propriete Intellectuelle</h3>
            <p className="text-xs text-gray-400">
              Les skins sont des oeuvres originales inspirees de la culture populaire. KHAN n'est
              affilie a aucun studio ou detenteur de droits sur les oeuvres originales.
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="font-bold mb-2">Politique Anti-Discrimination</h3>
            <p className="text-xs text-gray-400">
              KHAN applique une politique de tolerance zero envers toute forme de discrimination.
              Les comptes en infraction sont supprimes sans remboursement.
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="font-bold mb-2">Contact</h3>
            <div className="text-xs text-gray-400 space-y-1">
              <p>Support: support@khanfitness.app</p>
              <p>DPO: dpo@khanfitness.app</p>
              <p>Signalement: report@khanfitness.app</p>
              <p>Legal: legal@khanfitness.app</p>
            </div>
          </div>

          <p className="text-center text-xs text-gray-600 mt-6">
            KHAN Fitness - v1.0.0 - Janvier 2025
          </p>
        </div>
      )}

      {/* Item Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-gray-900 rounded-2xl p-6 max-w-sm w-full"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center mb-4">
              <div className="w-24 h-24 bg-gray-800 rounded-xl mx-auto flex items-center justify-center text-5xl mb-4">
                {selectedItem.type === 'T-Shirt' && '👕'}
                {selectedItem.type === 'Hoodie' && '🧥'}
                {selectedItem.type === 'Casquette' && '🧢'}
                {selectedItem.type === 'Shaker' && '🥤'}
                {selectedItem.type === 'Sac' && '🎒'}
                {selectedItem.type === 'Medaille' && '🏅'}
                {selectedItem.type === 'Poster' && '🖼️'}
              </div>
              <h3 className="text-xl font-bold">{selectedItem.name}</h3>
              <p className="text-gray-400 text-sm">{selectedItem.description}</p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-400 mb-2">Objectif requis:</p>
              <p className="font-bold">{selectedItem.requirement}</p>
              <p className="text-xs text-gray-500 mt-1">Tier minimum: {selectedItem.tier}</p>
            </div>

            <button
              onClick={() => setSelectedItem(null)}
              className="w-full py-3 bg-white/10 rounded-xl font-bold"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
