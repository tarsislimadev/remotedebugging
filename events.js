

class WebSocketOpenEvent extends Event {
  constructor(id) {
    super('websocket-open')
    this.value = { id }
  }
}

class WebSocketMessageEvent extends Event {
  constructor(id, m) {
    super('websocket-message')
    this.value = { id, message: m }
  }
}

class WebSocketErrorEvent extends Event {
  constructor(id, e) {
    super('websocket-error')
    this.value = { id, error: e }
  }
}

class WebSocketCloseEvent extends Event {
  constructor(id) {
    super('websocket-close')
    this.value = { id }
  }
}

module.exports = { WebSocketOpenEvent, WebSocketMessageEvent, WebSocketErrorEvent, WebSocketCloseEvent }
