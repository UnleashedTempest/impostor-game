# 🕵️ Jeu de l'Imposteur

Un jeu multijoueur en temps réel inspiré de « Qui est l'imposteur ? »

## Structure

```
impostor-game/
├── frontend/          # React + Vite + TailwindCSS
│   └── src/
│       ├── pages/     # Home, Lobby, Game, Results
│       ├── components/# PlayerList, WordCard, VotePanel, Timer, RoomCode
│       ├── services/  # socket.js, api.js
│       └── styles/
└── backend/           # Node.js + Express + Socket.io
    └── src/
        ├── database/  # roomStore.js (stockage en mémoire)
        ├── socket/    # gameSocket.js (logique temps réel)
        ├── models/    # Room.js, Player.js
        ├── routes/    # rooms.js
        └── middleware/# roomMiddleware.js
```

## Lancer le projet

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Ouvre http://localhost:5173 dans ton navigateur.

## Règles du jeu

1. Un hôte crée une salle et partage le code
2. Les joueurs rejoignent avec le code
3. L'hôte lance la partie (3-8 joueurs)
4. Chaque joueur voit son rôle :
   - **Joueurs normaux** → voient le mot secret
   - **Imposteur** → ne voit pas le mot
5. Phase de discussion : les joueurs échangent pour démasquer l'imposteur
6. Phase de vote : chacun vote pour qui il pense être l'imposteur
7. Le joueur le plus voté est éliminé — était-ce l'imposteur ?
