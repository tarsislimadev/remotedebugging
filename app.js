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

const createFilename = (name) => path.join('.', 'responses', `${name}.${Date.now().toFixed(0)}.json`)

const saveJsonResponse = (name, data = {}) => fs.writeFileSync(createFilename(name), JSON.stringify(data))

const createWebSocket = async () => {
  const url = await getWebSocketURL()
  const ws = new WebSocket(url)
  ws.addEventListener('open', () => console.log('WebSocket connection opened'))
  ws.addEventListener('message', (event) => saveJsonResponse('response', JSON.parse(event.data)))
  ws.addEventListener('close', () => rl.close())
  ws.addEventListener('error', (error) => console.error('WebSocket error:', error))
  return ws
}

const state = { counter: 0, ws: null };

createWebSocket().then((ws) => state.ws = ws);

const getCounter = () => ++state.counter

const ws_send = (req = {}) => { if (req) state.ws.send(JSON.stringify({ id: getCounter(), ...req })) }

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
