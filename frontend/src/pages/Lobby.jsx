import { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { getSocket } from '../services/socket'
import PlayerList from '../components/PlayerList'
import RoomCode from '../components/RoomCode'

function Lobby() {
  const { roomCode } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()
  const [players, setPlayers] = useState([])
  const socket = getSocket()

  useEffect(() => {
    socket.emit('join-room', { roomCode, playerName: state?.playerName })

    socket.on('update-players', (playerList) => {
      setPlayers(playerList)
    })

    socket.on('game-started', () => {
      navigate(`/game/${roomCode}`, { state })
    })

    return () => {
      socket.off('update-players')
      socket.off('game-started')
    }
  }, [])

  const handleStart = () => {
    if (players.length < 3) return alert('Il faut au moins 3 joueurs !')
    socket.emit('start-game', { roomCode })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-3xl font-bold mb-6 text-purple-400">Salle d'attente</h2>
      <RoomCode code={roomCode} />
      <PlayerList players={players} />

      {state?.isHost && (
        <button
          onClick={handleStart}
          disabled={players.length < 3}
          className="mt-8 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white font-semibold py-3 px-8 rounded-lg transition"
        >
          Lancer la partie ({players.length}/8 joueurs)
        </button>
      )}
      {!state?.isHost && (
        <p className="mt-8 text-gray-400">En attente du lancement par l'hôte…</p>
      )}
    </div>
  )
}

export default Lobby
