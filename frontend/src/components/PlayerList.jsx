function PlayerList({ players }) {
  return (
    <div className="w-full max-w-md mt-4">
      <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-3">
        Joueurs ({players.length})
      </h3>
      <ul className="space-y-2">
        {players.map((p, i) => (
          <li
            key={i}
            className="flex items-center gap-3 bg-gray-700 rounded-lg px-4 py-3"
          >
            <span className="text-2xl">{p.isHost ? '👑' : '🎮'}</span>
            <span className="font-medium">{p.name}</span>
            {p.isHost && (
              <span className="ml-auto text-xs text-purple-400">Hôte</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PlayerList
