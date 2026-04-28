import { useState } from 'react'

function VotePanel({ players, currentPlayer, onVote }) {
  const [voted, setVoted] = useState(false)
  const [selected, setSelected] = useState(null)

  const handleVote = (name) => {
    if (voted) return
    setSelected(name)
    setVoted(true)
    onVote(name)
  }

  return (
    <div className="w-full max-w-md">
      <h3 className="text-center text-xl font-bold text-yellow-400 mb-4">
        🗳️ Votez pour l'imposteur !
      </h3>
      <ul className="space-y-2">
        {players
          .filter(p => p.name !== currentPlayer)
          .map((p, i) => (
            <li key={i}>
              <button
                onClick={() => handleVote(p.name)}
                disabled={voted}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-semibold
                  ${selected === p.name
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white disabled:opacity-50'}`}
              >
                <span>🎯</span>
                <span>{p.name}</span>
                {selected === p.name && <span className="ml-auto text-sm">Voté ✓</span>}
              </button>
            </li>
          ))}
      </ul>
      {voted && (
        <p className="text-center text-gray-400 mt-4 text-sm">
          Vote enregistré. En attente des autres joueurs…
        </p>
      )}
    </div>
  )
}

export default VotePanel
