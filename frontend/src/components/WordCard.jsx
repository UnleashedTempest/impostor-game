function WordCard({ role, word }) {
  if (!role) return null

  const isImpostor = role === 'impostor'

  return (
    <div className={`rounded-2xl p-8 w-full max-w-sm text-center shadow-2xl
      ${isImpostor ? 'bg-red-900 border-2 border-red-500' : 'bg-indigo-900 border-2 border-indigo-500'}`}>
      <p className="text-sm uppercase tracking-widest text-gray-300 mb-2">Ton rôle</p>
      <p className={`text-3xl font-bold mb-6 ${isImpostor ? 'text-red-300' : 'text-indigo-300'}`}>
        {isImpostor ? '🕵️ Imposteur' : '👤 Joueur normal'}
      </p>
      {isImpostor ? (
        <p className="text-gray-300 italic">Tu ne connais pas le mot secret. Fais semblant !</p>
      ) : (
        <>
          <p className="text-sm text-gray-400 mb-2">Le mot secret est</p>
          <p className="text-4xl font-extrabold text-white">{word}</p>
        </>
      )}
    </div>
  )
}

export default WordCard
