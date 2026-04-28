export class Room {
  constructor({ code, hostName, players = [], status = 'waiting', word = null, impostorId = null, votes = {} }) {
    this.code = code
    this.hostName = hostName
    this.players = players
    this.status = status
    this.word = word
    this.impostorId = impostorId
    this.votes = votes
  }
}

export class Player {
  constructor({ id, name, isHost = false }) {
    this.id = id
    this.name = name
    this.isHost = isHost
  }
}
