import { getRoom, startGame, registerVote } from '../database/roomStore.js'

const PHASE_DURATIONS = {
  reveal: 15,   // secondes pour mémoriser le mot
  discuss: 120, // secondes de discussion
  vote: 30,     // secondes pour voter
}

export function registerSocketHandlers(io) {
  io.on('connection', (socket) => {
    // Rejoindre une salle via socket
    socket.on('join-room', ({ roomCode, playerName }) => {
      socket.join(roomCode)
      socket.data.roomCode = roomCode
      socket.data.playerName = playerName

      const room = getRoom(roomCode)
      if (room) {
        io.to(roomCode).emit('update-players', room.players)
      }
    })

    // Lancer la partie
    socket.on('start-game', ({ roomCode }) => {
      try {
        const room = startGame(roomCode)
        io.to(roomCode).emit('game-started')

        // Lancer la phase "reveal"
        startPhase(io, roomCode, 'reveal')
      } catch (e) {
        socket.emit('error', { message: e.message })
      }
    })

    // Prêt (rejoint la partie en cours)
    socket.on('ready', ({ roomCode, playerName }) => {
      socket.join(roomCode)
      socket.data.roomCode = roomCode
      socket.data.playerName = playerName

      const room = getRoom(roomCode)
      if (!room) return

      const player = room.players.find(p => p.name === playerName)
      if (!player) return

      const isImpostor = player.id === room.impostorId
      socket.emit('game-data', {
        role: isImpostor ? 'impostor' : 'normal',
        word: isImpostor ? null : room.word,
        players: room.players,
      })
    })

    // Vote
    socket.on('vote', ({ roomCode, target }) => {
      const voterName = socket.data.playerName
      const votes = registerVote(roomCode, voterName, target)

      const room = getRoom(roomCode)
      if (!room) return

      const totalVoters = room.players.length - 1 // exclude self
      const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0)

      if (totalVotes >= totalVoters) {
        io.to(roomCode).emit('round-ended', { votes })
        room.status = 'ended'
      }
    })

    socket.on('disconnect', () => {
      const { roomCode, playerName } = socket.data || {}
      if (roomCode && playerName) {
        const room = getRoom(roomCode)
        if (room && room.status === 'waiting') {
          room.players = room.players.filter(p => p.name !== playerName)
          io.to(roomCode).emit('update-players', room.players)
        }
      }
    })
  })
}

function startPhase(io, roomCode, phase) {
  const duration = PHASE_DURATIONS[phase]
  io.to(roomCode).emit('phase-change', { phase, timeLeft: duration })

  let timeLeft = duration
  const interval = setInterval(() => {
    timeLeft--
    io.to(roomCode).emit('tick', { timeLeft })

    if (timeLeft <= 0) {
      clearInterval(interval)
      const nextPhase = getNextPhase(phase)
      if (nextPhase) {
        startPhase(io, roomCode, nextPhase)
      }
    }
  }, 1000)
}

function getNextPhase(current) {
  const flow = ['reveal', 'discuss', 'vote']
  const idx = flow.indexOf(current)
  return idx >= 0 && idx < flow.length - 1 ? flow[idx + 1] : null
}
