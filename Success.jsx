export default function Success({ onHome }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center px-6">
      <div className="text-center space-y-8">
        <div className="text-7xl">✨</div>
        <h1 className="text-5xl font-black">Workout Complete!</h1>
        <button onClick={onHome} className="px-12 py-4 rounded-xl bg-gray-700 font-black">Back Home</button>
      </div>
    </div>
  )
}
