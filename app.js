const fs = require('fs')
const path = require('path')
const readline = require('readline')
const { menu } = require('./menu.js')

const requests = []

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

rl.addListener('close', () => process.exit(0))

rl.addListener('SIGTSTP', () => process.exit(0))

const question = (query) => new Promise((resolve) => rl.question(`${query}\n> `, resolve))

const getWebSocketURL = async () => {
  const data = await fetch('http://localhost:9222/json')
  const json = await data.json()
  return json.find((item) => item.url === 'chrome://newtab/')?.webSocketDebuggerUrl
}

const createFilename = (name, ext = 'json') => path.join('.', 'responses', `${name}.${Date.now().toFixed(0)}.${ext}`)

const saveJsonResponse = (name, data = {}) => fs.writeFileSync(createFilename(name), JSON.stringify(data))

const onOpen = () => {
  console.log('WebSocket connection opened')
}

const writePngFile = (data) => {
  fs.writeFileSync(createFilename('screenshot', 'png'), Buffer.from(data, 'base64'))
}

const onMessage = (event) => {
  const { data } = event
  saveJsonResponse('response', JSON.parse(data))
  writePngFile(data.result.data)
}

const onClose = () => {
  rl.close()
}

const onError = (error) => {
  console.error('WebSocket error:', error)
}

const createWebSocket = async () => {
  const url = await getWebSocketURL()
  const ws = new WebSocket(url)
  ws.addEventListener('open', onOpen)
  ws.addEventListener('message', onMessage)
  ws.addEventListener('close', onClose)
  ws.addEventListener('error', onError)
  return ws
}

const state = { counter: 0, ws: null };

createWebSocket().then((ws) => state.ws = ws);

const getCounter = () => ++state.counter

const ws_send = (req = {}) => {
  if (req) {
    const data = { id: getCounter(), ...req }
    state.ws.send(JSON.stringify(data))
    saveJsonResponse('request', data)
  }
}

const run_request = async (index) => ws_send(requests[index])

const main_menu = async () => {
  const answer = await question([
    'Select a method: ',
    ...menu.map(([name], ix) => `${ix}. ${name}`),
    ...requests.map(({ method, params = {} }, ix) => `r${ix}. ${method}(${Object.keys(params).map((p) => `${p}=${params[p]}`).join(', ')})`)
  ].join('\n'))

  if (menu[answer]) return menu[answer][1]?.({ req: requests, ws: { send: ws_send, close: () => rl.close() }, question })
  return run_request(+answer.replace('r', '').toString())
}

const run = async () => { while (true) await main_menu() }

run()
