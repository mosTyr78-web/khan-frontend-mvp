export default function Success({ onHome }) {
  return (
    <div className="h-screen w-screen bg-black/50 flex items-center justify-center px-4">
      <div className="text-center space-y-8">
        <div className="text-7xl">✨</div>
        <h1 className="text-5xl font-black">Complete!</h1>
        <button onClick={onHome} className="px-8 py-4 rounded-xl bg-gray-700 font-black active:scale-95">Home</button>
      </div>
    </div>
  )
}
