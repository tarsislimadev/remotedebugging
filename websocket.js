const { WebSocketOpenEvent, WebSocketMessageEvent, WebSocketErrorEvent, WebSocketCloseEvent } = require('./events.js')

class ApplicationWebSocket extends WebSocket {
  id = 'id' + Date.now()
  ee = new EventTarget()

  constructor({ url, ee } = {}) {
    super(url)

    this.ee = ee

    this.addEventListener('open', () => this.ee.dispatchEvent(new WebSocketOpenEvent(this.getId())))
    this.addEventListener('message', (m) => this.ee.dispatchEvent(new WebSocketMessageEvent(this.getId(), m)))
    this.addEventListener('error', (e) => this.ee.dispatchEvent(new WebSocketErrorEvent(this.getId(), e)))
    this.addEventListener('close', () => this.ee.dispatchEvent(new WebSocketCloseEvent(this.getId())))
  }

  getId() { return this.id }
}

module.exports = { ApplicationWebSocket }
