import 'dotenv/config'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import roomRoutes from './routes/rooms.js'
import { registerSocketHandlers } from './socket/gameSocket.js'

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
})

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/rooms', roomRoutes)

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

registerSocketHandlers(io)

const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`)
})
