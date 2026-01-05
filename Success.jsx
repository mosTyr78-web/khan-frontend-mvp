export default function Success({ onHome }) {
  return (
    <div className="h-screen w-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center space-y-8">
        <p className="text-7xl">✨</p>
        <h1 className="text-5xl font-black">Workout Complete!</h1>
        <button onClick={onHome} className="px-8 py-4 rounded-lg bg-gray-700 font-black">Back Home</button>
      </div>
    </div>
  )
}
