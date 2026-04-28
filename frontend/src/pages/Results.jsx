import { useLocation, useNavigate, useParams } from 'react-router-dom'

function Results() {
  const { roomCode } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()
  const votes = state?.votes || {}

  const sorted = Object.entries(votes).sort((a, b) => b[1] - a[1])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-4xl font-bold text-purple-400 mb-8">Résultats du vote</h2>

      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md space-y-3">
        {sorted.map(([name, count]) => (
          <div key={name} className="flex justify-between items-center bg-gray-700 rounded-lg px-4 py-3">
            <span className="font-semibold">{name}</span>
            <span className="text-purple-300 font-bold">{count} vote{count > 1 ? 's' : ''}</span>
          </div>
        ))}
      </div>

      {sorted.length > 0 && (
        <p className="mt-6 text-xl font-semibold text-red-400">
          🎯 Éliminé : {sorted[0][0]}
        </p>
      )}

      <div className="flex gap-4 mt-8">
        <button
          onClick={() => navigate(`/lobby/${roomCode}`, { state })}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          Rejouer
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          Accueil
        </button>
      </div>
    </div>
  )
}

export default Results
