const BASE_URL = import.meta.env.VITE_API_URL

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || 'Erreur réseau')
  }
  return res.json()
}

export function createRoom(playerName) {
  return request('/api/rooms', {
    method: 'POST',
    body: JSON.stringify({ playerName }),
  })
}

export function joinRoom(roomCode, playerName) {
  return request(`/api/rooms/${roomCode}/join`, {
    method: 'POST',
    body: JSON.stringify({ playerName }),
  })
}

export function getRoom(roomCode) {
  return request(`/api/rooms/${roomCode}`)
}
