const express = require('express')
const { createServer } = require('http')
const { join } = require('path')
const { Server } = require('socket.io')

const port = process.env.PORT || 3000

const app = express()
const httpServer = createServer(app)

app.use(express.static('public'))

app.get('/', (_, res) => res.sendFile(join(__dirname, 'index.html')))

const io = new Server(httpServer)

io.on('connect', (socket) => {
  console.log('connect', socket.id)

  setInterval(() => socket.send({ date: Date.now() }), 1000)

  socket.on('message', (message) => console.log('message', message))

  socket.on('disconnect', () => console.log('disconnect'))
})

httpServer.listen(port, () => console.log(`application is running at: http://localhost:${port}`))
