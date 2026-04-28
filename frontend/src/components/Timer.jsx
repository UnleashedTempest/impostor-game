function Timer({ timeLeft, phase }) {
  const phaseLabels = {
    reveal: '👁️ Mémorisez votre mot',
    discuss: '🗣️ Discussion',
    vote: '🗳️ Vote',
  }

  const color = timeLeft <= 10 ? 'text-red-400' : timeLeft <= 20 ? 'text-yellow-400' : 'text-green-400'

  return (
    <div className="flex flex-col items-center">
      <p className="text-gray-400 text-sm mb-1">{phaseLabels[phase] || phase}</p>
      <p className={`text-5xl font-mono font-bold ${color}`}>
        {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
        {String(timeLeft % 60).padStart(2, '0')}
      </p>
    </div>
  )
}

export default Timer
