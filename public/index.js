import events from './events.js'

const state = {}

const ee = new EventTarget()

ee.addEventListener('connect-debugger-page', (ev) => {
  console.log({ ev }, ev.value, ev.data)
})

const getJSON = () => fetch('http://localhost:9222/json').then(res => res.json())

const getDebuggerPageUrl = () => getJSON().then((json) => Array.from(json).filter((item) => item.type == 'page').at(0).webSocketDebuggerUrl)

getDebuggerPageUrl().then((url) => ee.dispatchEvent(new events.ConnectDebuggerPageEvent(url)))
