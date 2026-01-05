export default function LockedOverlay({ requiredTier, onUpgrade }) {
  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl z-10">
      <div className="text-4xl mb-2">🔒</div>
      <p className="text-white font-bold text-lg mb-1">Verrouille</p>
      <p className="text-gray-400 text-sm mb-3">Requiert {requiredTier}</p>
      <button
        onClick={onUpgrade}
        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-bold text-sm hover:scale-105 transition-transform"
      >
        Upgrade
      </button>
    </div>
  );
}
