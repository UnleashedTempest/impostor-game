import { v4 as uuidv4 } from 'uuid'

// rooms: Map<roomCode, Room>
const rooms = new Map()

const WORDS = [
  'Pizza', 'Football', 'Plage', 'Cinéma', 'Hôpital',
  'Forêt', 'Avion', 'Bibliothèque', 'Montagne', 'Piscine',
  'Supermarché', 'Musée', 'Zoo', 'École', 'Restaurant',
]

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export function createRoom(hostName) {
  let code = generateCode()
  while (rooms.has(code)) code = generateCode()

  const room = {
    code,
    hostName,
    players: [{ id: uuidv4(), name: hostName, isHost: true }],
    status: 'waiting', // 'waiting' | 'playing' | 'voting' | 'ended'
    word: null,
    impostorId: null,
    votes: {},
  }
  rooms.set(code, room)
  return room
}

export function getRoom(code) {
  return rooms.get(code) || null
}

export function addPlayer(code, playerName) {
  const room = rooms.get(code)
  if (!room) throw new Error('Salle introuvable')
  if (room.status !== 'waiting') throw new Error('Partie déjà commencée')
  if (room.players.find(p => p.name === playerName)) throw new Error('Pseudo déjà pris')
  if (room.players.length >= 8) throw new Error('Salle pleine')

  const player = { id: uuidv4(), name: playerName, isHost: false }
  room.players.push(player)
  return player
}

export function startGame(code) {
  const room = rooms.get(code)
  if (!room) throw new Error('Salle introuvable')
  if (room.players.length < 3) throw new Error('Il faut au moins 3 joueurs')

  room.word = WORDS[Math.floor(Math.random() * WORDS.length)]
  room.status = 'playing'

  const impostorIdx = Math.floor(Math.random() * room.players.length)
  room.impostorId = room.players[impostorIdx].id
  room.votes = {}

  return room
}

export function registerVote(code, voterName, targetName) {
  const room = rooms.get(code)
  if (!room) throw new Error('Salle introuvable')
  room.votes[targetName] = (room.votes[targetName] || 0) + 1
  return room.votes
}

export function deleteRoom(code) {
  rooms.delete(code)
}
