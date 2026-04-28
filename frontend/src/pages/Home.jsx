import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createRoom, joinRoom } from '../services/api'

function Home() {
  const navigate = useNavigate()
  const [playerName, setPlayerName] = useState('')
  const [roomCode, setRoomCode] = useState('')
  const [error, setError] = useState('')

  const handleCreate = async () => {
    if (!playerName.trim()) return setError('Entre ton pseudo')
    try {
      const { code } = await createRoom(playerName)
      navigate(`/lobby/${code}`, { state: { playerName, isHost: true } })
    } catch (e) {
      setError('Erreur lors de la création de la salle')
    }
  }

  const handleJoin = async () => {
    if (!playerName.trim()) return setError('Entre ton pseudo')
    if (!roomCode.trim()) return setError('Entre un code de salle')
    try {
      await joinRoom(roomCode, playerName)
      navigate(`/lobby/${roomCode}`, { state: { playerName, isHost: false } })
    } catch (e) {
      setError('Salle introuvable ou pseudo déjà pris')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-5xl font-bold mb-2 text-purple-400">🕵️ Jeu de l'Imposteur</h1>
      <p className="text-gray-400 mb-10">Trouve l'imposteur parmi tes amis !</p>

      <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-xl space-y-4">
        <input
          className="w-full bg-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Ton pseudo"
          value={playerName}
          onChange={e => { setPlayerName(e.target.value); setError('') }}
        />

        <button
          onClick={handleCreate}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Créer une salle
        </button>

        <div className="flex items-center gap-2">
          <hr className="flex-1 border-gray-600" />
          <span className="text-gray-500 text-sm">OU</span>
          <hr className="flex-1 border-gray-600" />
        </div>

        <input
          className="w-full bg-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Code de salle"
          value={roomCode}
          onChange={e => { setRoomCode(e.target.value.toUpperCase()); setError('') }}
          maxLength={6}
        />

        <button
          onClick={handleJoin}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Rejoindre une salle
        </button>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      </div>
    </div>
  )
}

export default Home
