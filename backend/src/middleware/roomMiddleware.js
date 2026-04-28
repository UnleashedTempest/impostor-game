import { getRoom } from '../database/roomStore.js'

export function requireRoom(req, res, next) {
  const room = getRoom(req.params.code)
  if (!room) return res.status(404).json({ message: 'Salle introuvable' })
  req.room = room
  next()
}

export function requireWaiting(req, res, next) {
  if (req.room?.status !== 'waiting') {
    return res.status(400).json({ message: 'La partie a déjà commencé' })
  }
  next()
}
