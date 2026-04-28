import express from 'express'
import { createRoom, getRoom, addPlayer } from '../database/roomStore.js'

const router = express.Router()

// POST /api/rooms — créer une salle
router.post('/', (req, res) => {
  const { playerName } = req.body
  if (!playerName?.trim()) {
    return res.status(400).json({ message: 'Pseudo requis' })
  }
  try {
    const room = createRoom(playerName.trim())
    res.status(201).json({ code: room.code, players: room.players })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// GET /api/rooms/:code — infos de la salle
router.get('/:code', (req, res) => {
  const room = getRoom(req.params.code)
  if (!room) return res.status(404).json({ message: 'Salle introuvable' })
  res.json({ code: room.code, players: room.players, status: room.status })
})

// POST /api/rooms/:code/join — rejoindre une salle
router.post('/:code/join', (req, res) => {
  const { playerName } = req.body
  if (!playerName?.trim()) {
    return res.status(400).json({ message: 'Pseudo requis' })
  }
  try {
    const player = addPlayer(req.params.code, playerName.trim())
    res.status(200).json(player)
  } catch (e) {
    const status = e.message === 'Salle introuvable' ? 404 : 400
    res.status(status).json({ message: e.message })
  }
})

export default router
