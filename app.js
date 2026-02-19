const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const question = (query) => new Promise((resolve) => rl.question(`${query}\n> `, resolve))

const getWebSocketURL = async () => {
  const data = await fetch('http://localhost:9222/json')
  const json = await data.json()
  return json.find((item) => item.url === 'chrome://newtab/')?.webSocketDebuggerUrl
}

const createWebSocket = async () => {
  const url = await getWebSocketURL()
  const ws = new WebSocket(url)
  ws.addEventListener('open', () => console.log('WebSocket connection opened'))
  ws.addEventListener('message', (event) => console.log('Received message:', event.data))
  ws.addEventListener('close', () => console.log('WebSocket connection closed'))
  ws.addEventListener('error', (error) => console.error('WebSocket error:', error))
  return ws
}

const ws = await createWebSocket()

const page_navigate_menu = async () => { }

const page_reload_menu = async () => { }

const page_captureScreenshot_menu = async () => { }

const runtime_evaluate_menu = async () => { }

const runtime_callFunctionOn_menu = async () => { }

const dom_getdocument_menu = async () => { }

const dom_querySelector_menu = async () => { }

const dom_setAttributeValue_menu = async () => { }

const network_enable_menu = async () => { }

const network_setextrahttpheaders_menu = async () => { }

const network_getresponsebody_menu = async () => { }

const debugger_enable_menu = async () => { }

const debugger_setbreakpointbyurl_menu = async () => { }

const debugger_resume_menu = async () => { }

const console_enable_menu = async () => { }

const emulation_setdevicemetricsoverride_menu = async () => { }

const emulation_setgeolocationoverride_menu = async () => { }


const main_menu = async () => {
  const answer = await question([
    'Select a method: ',
    ' 1. Page.navigate',
    ' 2. Page.reload',
    ' 3. Page.captureScreenshot',
    ' 4. Runtime.evaluate',
    ' 5. Runtime.callFunctionOn',
    ' 6. DOM.getDocument',
    ' 7. DOM.querySelector',
    ' 8. DOM.setAttributeValue',
    ' 9. Network.enable',
    '10. Network.setExtraHTTPHeaders',
    '11. Network.getResponseBody',
    '12. Debugger.enable',
    '13. Debugger.setBreakpointByUrl',
    '14. Debugger.resume',
    '15. Console.enable',
    '16. Emulation.setDeviceMetricsOverride',
    '17. Emulation.setGeolocationOverride',
    '18. Exit',
  ].join('\n'))

  switch (answer) {
    case '1': return page_navigate_menu()
    case '2': return page_reload_menu()
    case '3': return page_captureScreenshot_menu()
    case '4': return runtime_evaluate_menu()
    case '5': return runtime_callFunctionOn_menu()
    case '6': return dom_getdocument_menu()
    case '7': return dom_querySelector_menu()
    case '8': return dom_setAttributeValue_menu()
    case '9': return network_enable_menu()
    case '10': return network_setextrahttpheaders_menu()
    case '11': return network_getresponsebody_menu()
    case '12': return debugger_enable_menu()
    case '13': return debugger_setbreakpointbyurl_menu()
    case '14': return debugger_resume_menu()
    case '15': return console_enable_menu()
    case '16': return emulation_setdevicemetricsoverride_menu()
    case '17': return emulation_setgeolocationoverride_menu()
    case '18': return rl.close()
    default: return console.log('Invalid option')
  }
  return answer
}

const run = async () => {
  let running = true
  while (running) {
    const answer = await main_menu()
    if (answer === '18') running = false
  }
}

run()
