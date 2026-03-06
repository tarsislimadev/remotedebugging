const fs = require('fs')
const path = require('path')
const readline = require('readline')
const sqlite = require('node:sqlite')

const db = new sqlite.DatabaseSync(`./db.${Date.now()}.sqlite`)

// db.open()

const menus = {
  cdr: require('./menu.js').menu,
  indeed: require('./indeed.js').menu,
  db: [
    [
      'db.create_table',
      async ({ ws, question }) => {
        const table_name = await question('Table name:')
        const columns = []
        let has_more = true
        while (has_more) {
          const name = await question('Column name:')
          const type = await question('Column type:')
          const primary_key = await question('Is column a primary key (0/1):')
          columns.push(`${name} ${type} ${primary_key && 'PRIMARY KEY'}`)
        }

        db.exec(`create table ${table_name} (${columns.join(',')})`)
      }
    ],
    ['db.select', async () => { }],
  ]
}

const requests = []

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

rl.addListener('close', () => process.exit(0))

rl.addListener('SIGTSTP', () => process.exit(0))

const question = (query) => new Promise((resolve) => rl.question(`${query}\n > `, resolve))

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
  saveJsonResponse('response', JSON.parse(event.data))
}

const onClose = () => {
  rl.close()
}

const onError = (error) => {
  console.error('WebSocket error:', error)
}

const createWebSocket = async () => {
  const url = await getWebSocketURL()
  if (!url) throw new Error('No WebSocket URL')
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
  const menu = menus[process.argv[2] || 'cdr']

  const answer = await question([
    'Select a method: ',
    ...menu.map(([name], ix) => `${ix}.${name}`),
    ...requests.map(({ method, params = {} }, ix) => `r${ix}.${method}(${Object.keys(params).map((p) => `${p}=${params[p]}`).join(', ')})`)
  ].join('\n'))

  const vars = async (questions) => {
    return questions.reduce(async (prev, [name, ...props]) => {
      console.log('questions.reduce', { prev, name, props })
      const query = props.map(p => p.split('=')).reduce((p, c) => ({ ...p, [c[0]]: c[1] }), {})
      return {
        ...prev, [name]: await question(query.question)
      }
    }, {})
  }

  if (menu[answer]) return menu[answer][1]?.({ req: requests, ws: { send: ws_send, close: () => rl.close() }, question, vars })
  return run_request(+answer.replace('r', '').toString())
}

const run = async () => { while (true) await main_menu() }

run()
