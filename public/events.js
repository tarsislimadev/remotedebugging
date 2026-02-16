class ConnectDebuggerPageEvent extends Event {
  constructor(url) {
    super('connect-debugger-page')
    this.value = this.data = { url }
    this.url = url
  }
}

export default { ConnectDebuggerPageEvent }
