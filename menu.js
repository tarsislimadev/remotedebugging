const menu = [
  [],
  [
    'Page.navigate',
    async ({ req, question } = {}) => {
      const answer = await question('Enter URL to navigate to:');
      req.push({ method: 'Page.navigate', params: { url: answer } });
    }
  ],
  [
    'Page.reload',
    async ({ ws } = {}) => {
      ws.send({ 'method': 'Page.reload', 'params': { 'ignoreCache': true } })
    }
  ],
  [
    'Page.captureScreenshot',
    async ({ ws } = {}) => {
      ws.send({ 'method': 'Page.captureScreenshot', 'params': { 'format': 'png' } })
    }
  ],
  [
    'Runtime.evaluate',
    async ({ req, question } = {}) => {
      const answer = await question('Enter expression to evaluate:');
      req.push({ 'method': 'Runtime.evaluate', 'params': { 'expression': answer } })
    }
  ],
  [
    'Runtime.callFunctionOn',
    async ({ req, question } = {}) => {
      const objectId = await question('objectId:');
      const functionDeclaration = await question('functionDeclaration:');
      req.push({ 'method': 'Runtime.callFunctionOn', 'params': { objectId, functionDeclaration } })
    }
  ],
  [
    'DOM.getDocument',
    async ({ ws } = {}) => {
      ws.send({ 'method': 'DOM.getDocument', 'params': {} })
    }
  ],
  // ['DOM.querySelector', async ({ } = {}) => { }],
  // ['DOM.setAttributeValue', async ({ } = {}) => { }],
  [
    'Network.enable',
    async ({ ws } = {}) => {
      ws.send({ 'method': 'Network.enable', 'params': {} })
    }
  ],
  [
    'Network.setExtraHTTPHeaders',
    async ({ req, question } = {}) => {
      const answer = await question('headers.Authorization:')
      req.push({ 'method': 'Network.setExtraHTTPHeaders', 'params': { 'headers': { 'Authorization': answer } } })
    }
  ],
  // ['Network.getResponseBody', async ({ } = {}) => { }],
  [
    'Debugger.enable',
    async ({ ws } = {}) => {
      ws.send({ 'method': 'Debugger.enable', 'params': {} })
    }
  ],
  // ['Debugger.setBreakpointByUrl', async ({ } = {}) => { }],
  [
    'Debugger.resume',
    async ({ ws } = {}) => {
      ws.send({ 'method': 'Debugger.resume', 'params': {} })
    }
  ],
  [
    'Console.enable',
    async ({ ws } = {}) => {
      ws.send({ 'method': 'Console.enable', 'params': {} })
    }
  ],
  // ['Emulation.setDeviceMetricsOverride', async ({ } = {}) => { }],
  // ['Emulation.setGeolocationOverride', async ({ } = {}) => { }],
  ['Exit', async ({ ws } = {}) => ws.close()],
];

module.exports = { menu };
