import { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { getSocket } from '../services/socket'
import WordCard from '../components/WordCard'
import VotePanel from '../components/VotePanel'
import Timer from '../components/Timer'

function Game() {
  const { roomCode } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()
  const socket = getSocket()

  const [role, setRole] = useState(null) // 'normal' | 'impostor'
  const [word, setWord] = useState('')
  const [players, setPlayers] = useState([])
  const [phase, setPhase] = useState('reveal') // 'reveal' | 'discuss' | 'vote'
  const [timeLeft, setTimeLeft] = useState(60)

  useEffect(() => {
    socket.on('game-data', ({ role, word, players }) => {
      setRole(role)
      setWord(word)
      setPlayers(players)
    })

    socket.on('phase-change', ({ phase, timeLeft }) => {
      setPhase(phase)
      setTimeLeft(timeLeft)
    })

    socket.on('round-ended', ({ votes }) => {
      navigate(`/results/${roomCode}`, { state: { ...state, votes } })
    })

    socket.on('tick', ({ timeLeft }) => setTimeLeft(timeLeft))

    socket.emit('ready', { roomCode, playerName: state?.playerName })

    return () => {
      socket.off('game-data')
      socket.off('phase-change')
      socket.off('round-ended')
      socket.off('tick')
    }
  }, [])

  const handleVote = (targetName) => {
    socket.emit('vote', { roomCode, target: targetName })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6">
      <Timer timeLeft={timeLeft} phase={phase} />
      <WordCard role={role} word={word} />
      {phase === 'vote' && (
        <VotePanel
          players={players}
          currentPlayer={state?.playerName}
          onVote={handleVote}
        />
      )}
      {phase === 'discuss' && (
        <p className="text-gray-300 text-lg">
          🗣️ Discutez entre vous pour trouver l'imposteur…
        </p>
      )}
    </div>
  )
}

export default Game
