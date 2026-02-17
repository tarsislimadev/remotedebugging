const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const { ErrorMessageModel } = require('./models.js')
const { ApplicationWebSocket } = require('./websocket.js')

const port = process.env.PORT || 3000
const state = { ws: {} }

const ee = new EventTarget()
ee.addEventListener('websocket-open', console.log)
ee.addEventListener('websocket-message', console.log)
ee.addEventListener('websocket-error', console.log)
ee.addEventListener('websocket-close', console.log)

const app = express()
const httpServer = createServer(app)

app.use(express.static('public'))

const events = {
  connect: (m) => {
    state.ws = new ApplicationWebSocket({ ...m.body, ee })
  },
  message: (m) => {
    console.log('message', m)

    state.ws.send({ method: m.body.message.name, params: { url: m.body.message.url } })
  },
}

const io = new Server(httpServer)

io.on('connect', (socket) => {
  console.log('connect', socket.id)

  socket.on('message', (message) => {
    if (!message.headers?.name) return socket.send(new ErrorMessageModel('request must have name in headers'))

    switch (message.headers.name) {
      case 'connect': return events.connect(message)
      case 'message': return events.message(message)
    }
  })

  socket.on('disconnect', () => console.log('disconnect', socket.id))
})

httpServer.listen(port, () => console.log(`It's on http://localhost:${port}`))
