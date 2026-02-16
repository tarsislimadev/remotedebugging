const ee = new EventTarget()

ee.addEventListener('connect-debugger-page', (ev) => {
  console.log({ ev }, ev.value, ev.data)
})

const getJSON = () => fetch('http://localhost:9222/json').then(res => res.json())

const getWebSocketDebuggerUrls = () => getJSON().then(json => Array.from(json).map((item) => item.webSocketDebuggerUrl))

const getDebuggerPageUrl = () => getWebSocketDebuggerUrls().then(urls => Array.from(urls).filter((url) => url.includes('/page/')).at(0))

class ConnectDebuggerPageEvent extends Event {
  constructor(url) {
    super('connect-debugger-page')
    this.value = this.data = { url }
    this.url = url
  }
}

getDebuggerPageUrl().then((url) => ee.dispatchEvent(new ConnectDebuggerPageEvent(url)))
