import { useState } from 'react';
import ShareCard from '../components/ShareCard';

export default function Share({ goTo, userTier, sessionTime, completedChallenges = 1 }) {
  const [selectedTemplate, setSelectedTemplate] = useState('workout');
  const [copied, setCopied] = useState(false);

  const templates = [
    { id: 'workout', label: 'Workout', icon: '💪' },
    { id: 'challenge', label: 'Challenge', icon: '🏆' },
    { id: 'badge', label: 'Badge', icon: '🎖️' },
    { id: 'streak', label: 'Streak', icon: '🔥' }
  ];

  const shareText = {
    workout: `Just crushed a ${Math.floor(sessionTime / 60)} min workout on KHAN! 💪🔥`,
    challenge: `Completed ${completedChallenges} challenge${completedChallenges > 1 ? 's' : ''} on KHAN! 🏆`,
    badge: `Just earned a new badge on KHAN! Level up! 🎖️`,
    streak: `On a 7-day streak with KHAN! Never stopping! 🔥`
  };

  const handleShare = async (platform) => {
    const text = shareText[selectedTemplate];
    const url = 'https://khan-frontend-mvp.vercel.app';

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'instagram':
        // Copy to clipboard for Instagram
        await navigator.clipboard.writeText(text + '\n' + url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
      case 'tiktok':
        // Copy to clipboard for TikTok
        await navigator.clipboard.writeText(text + '\n' + url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
      case 'native':
        if (navigator.share) {
          await navigator.share({ title: 'KHAN Fitness', text, url });
        }
        break;
    }
  };

  const handleDownloadCard = () => {
    // TODO: Generate and download image
    alert('Fonctionnalite a venir: Telecharger la card');
  };

  return (
    <div className="min-h-screen w-screen bg-black/90 p-4 pb-24 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => goTo('home')} className="text-white text-2xl">←</button>
        <h1 className="text-white font-bold text-xl">Partager</h1>
        <div className="w-8" />
      </div>

      {/* Template selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {templates.map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedTemplate(t.id)}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedTemplate === t.id
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                : 'bg-white/10 text-gray-400'
            }`}
          >
            <span>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Preview Card */}
      <div className="mb-6">
        <ShareCard
          type={selectedTemplate}
          userTier={userTier}
          sessionTime={sessionTime}
          completedChallenges={completedChallenges}
        />
      </div>

      {/* Download button */}
      <button
        onClick={handleDownloadCard}
        className="w-full py-3 bg-white/10 rounded-xl text-white font-bold mb-6 flex items-center justify-center gap-2"
      >
        📥 Telecharger l'image
      </button>

      {/* Share platforms */}
      <div>
        <h3 className="text-white font-bold mb-4">Partager sur</h3>

        <div className="grid grid-cols-3 gap-3">
          {/* Instagram */}
          <button
            onClick={() => handleShare('instagram')}
            className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl"
          >
            <span className="text-2xl">📸</span>
            <span className="text-white text-xs font-bold">Instagram</span>
          </button>

          {/* TikTok */}
          <button
            onClick={() => handleShare('tiktok')}
            className="flex flex-col items-center gap-2 p-4 bg-black border border-white/20 rounded-xl"
          >
            <span className="text-2xl">🎵</span>
            <span className="text-white text-xs font-bold">TikTok</span>
          </button>

          {/* Twitter/X */}
          <button
            onClick={() => handleShare('twitter')}
            className="flex flex-col items-center gap-2 p-4 bg-black border border-white/20 rounded-xl"
          >
            <span className="text-2xl">𝕏</span>
            <span className="text-white text-xs font-bold">Twitter</span>
          </button>

          {/* Facebook */}
          <button
            onClick={() => handleShare('facebook')}
            className="flex flex-col items-center gap-2 p-4 bg-blue-600 rounded-xl"
          >
            <span className="text-2xl">📘</span>
            <span className="text-white text-xs font-bold">Facebook</span>
          </button>

          {/* WhatsApp */}
          <button
            onClick={() => handleShare('whatsapp')}
            className="flex flex-col items-center gap-2 p-4 bg-green-500 rounded-xl"
          >
            <span className="text-2xl">💬</span>
            <span className="text-white text-xs font-bold">WhatsApp</span>
          </button>

          {/* Native Share */}
          <button
            onClick={() => handleShare('native')}
            className="flex flex-col items-center gap-2 p-4 bg-gray-700 rounded-xl"
          >
            <span className="text-2xl">📤</span>
            <span className="text-white text-xs font-bold">Plus</span>
          </button>
        </div>
      </div>

      {/* Copied toast */}
      {copied && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow-lg animate-bounce">
          ✓ Copie!
        </div>
      )}
    </div>
  );
}
