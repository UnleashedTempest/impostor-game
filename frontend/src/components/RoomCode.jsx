import { useState } from 'react'

function RoomCode({ code }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col items-center gap-2 mb-4">
      <p className="text-gray-400 text-sm">Code de la salle</p>
      <button
        onClick={handleCopy}
        className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl text-3xl font-bold tracking-widest text-white transition"
      >
        {code}
      </button>
      <p className="text-xs text-gray-500">{copied ? '✅ Copié !' : 'Clique pour copier'}</p>
    </div>
  )
}

export default RoomCode
