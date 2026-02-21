const menu = [
  [],
  [
    'Page.navigate',
    async ({ ws, req, question } = {}) => {
      const answer = await question('Enter URL to navigate to:');
      req.push({ method: 'Page.navigate', params: { url: answer } });
    }
  ],
  [
    'Page.reload',
    async ({ ws, req, question } = {}) => ws.send({ 'method': 'Page.reload', 'params': { 'ignoreCache': true } })
  ],
  [
    'Page.captureScreenshot',
    async ({ ws, req, question } = {}) => ws.send({ 'method': 'Page.captureScreenshot', 'params': { 'format': 'png' } })
  ],
  [
    'Runtime.evaluate',
    async ({ ws, req, question } = {}) => {
      const answer = await question('Enter expression to evaluate:');
      req.push({ 'method': 'Runtime.evaluate', 'params': { 'expression': answer } })
    }
  ],
  [
    'Runtime.callFunctionOn',
    async ({ ws, req, question } = {}) => {
      const objectId = await question('objectId:');
      const functionDeclaration = await question('functionDeclaration:');
      req.push({ 'method': 'Runtime.callFunctionOn', 'params': { objectId, functionDeclaration } })
    }
  ],
  [
    'DOM.getDocument',
    async ({ ws, req, question } = {}) => { }
  ],
  [
    'DOM.querySelector',
    async ({ ws, req, question } = {}) => { }
  ],
  [
    'DOM.setAttributeValue',
    async ({ ws, req, question } = {}) => { }
  ],
  [
    'Network.enable',
    async ({ ws, req, question } = {}) => { }
  ],
  [
    'Network.setExtraHTTPHeaders',
    async ({ ws, req, question } = {}) => { }
  ],
  [
    'Network.getResponseBody',
    async ({ ws, req, question } = {}) => { }
  ],
  [
    'Debugger.enable',
    async ({ ws, req, question } = {}) => { }
  ],
  [
    'Debugger.setBreakpointByUrl',
    async ({ ws, req, question } = {}) => { }
  ],
  [
    'Debugger.resume',
    async ({ ws, req, question } = {}) => { }
  ],
  [
    'Console.enable',
    async ({ ws, req, question } = {}) => { }
  ],
  [
    'Emulation.setDeviceMetricsOverride',
    async ({ ws, req, question } = {}) => { }
  ],
  [
    'Emulation.setGeolocationOverride',
    async ({ ws, req, question } = {}) => { }
  ],
  [
    'Exit',
    async ({ ws, req, question } = {}) => ws.close()
  ],
];

module.exports = { menu };
