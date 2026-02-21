const menu = [
  [],
  [
    'Page.navigate',
    async ({ ws, req, rl, question } = {}) => {
      const answer = await question('Enter URL to navigate to:');
      req.push({ method: 'Page.navigate', params: { url: answer } });
    }
  ],
  [
    'Page.reload',
    async ({ ws, req, rl, question } = {}) => ws.send({ 'method': 'Page.reload', 'params': { 'ignoreCache': true } })
  ],
  [
    'Page.captureScreenshot',
    async ({ ws, req, rl, question } = {}) => ws.send({ 'method': 'Page.captureScreenshot', 'params': { 'format': 'png' } })
  ],
  [
    'Runtime.evaluate',
    async ({ ws, req, rl, question } = {}) => {
      const answer = await question('Enter expression to evaluate:');
      req.push({ 'method': 'Runtime.evaluate', 'params': { 'expression': answer } })
    }
  ],
  [
    'Runtime.callFunctionOn',
    async ({ ws, req, rl, question } = {}) => {
      const objectId = await question('objectId:');
      const functionDeclaration = await question('functionDeclaration:');
      req.push({ 'method': 'Runtime.callFunctionOn', 'params': { objectId, functionDeclaration } })
    }
  ],
  [
    'DOM.getDocument',
    async ({ ws, req, rl, question } = {}) => { }
  ],
  [
    'DOM.querySelector',
    async ({ ws, req, rl, question } = {}) => { }
  ],
  [
    'DOM.setAttributeValue',
    async ({ ws, req, rl, question } = {}) => { }
  ],
  [
    'Network.enable',
    async ({ ws, req, rl, question } = {}) => { }
  ],
  [
    'Network.setExtraHTTPHeaders',
    async ({ ws, req, rl, question } = {}) => { }
  ],
  [
    'Network.getResponseBody',
    async ({ ws, req, rl, question } = {}) => { }
  ],
  [
    'Debugger.enable',
    async ({ ws, req, rl, question } = {}) => { }
  ],
  [
    'Debugger.setBreakpointByUrl',
    async ({ ws, req, rl, question } = {}) => { }
  ],
  [
    'Debugger.resume',
    async ({ ws, req, rl, question } = {}) => { }
  ],
  [
    'Console.enable',
    async ({ ws, req, rl, question } = {}) => { }
  ],
  [
    'Emulation.setDeviceMetricsOverride',
    async ({ ws, req, rl, question } = {}) => { }
  ],
  [
    'Emulation.setGeolocationOverride',
    async ({ ws, req, rl, question } = {}) => { }
  ],
  [
    'Exit',
    async ({ ws, req, rl, question } = {}) => rl.close()
  ],
];

module.exports = { menu };
