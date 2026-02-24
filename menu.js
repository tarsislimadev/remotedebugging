const menu = [
  [
    'Page.navigate',
    async ({ req, question } = {}) => {
      const answer = await question('Enter URL to navigate to:');
      req.push({ 'method': 'Page.navigate', params: { url: answer } });
    }
  ],
  ['Page.reload', async ({ ws } = {}) => ws.send({ 'method': 'Page.reload', 'params': { 'ignoreCache': true } })],
  ['Page.captureScreenshot', async ({ ws } = {}) => ws.send({ 'method': 'Page.captureScreenshot', 'params': { 'format': 'png' } })],
  [
    'Page.addScriptToEvaluateOnNewDocument',
    async ({ req, question } = {}) => {
      const source = await question('Source:');
      req.push({ 'method': 'Page.addScriptToEvaluateOnNewDocument', params: { source } });
    }
  ],
  ['Page.bringToFront', async ({ ws }) => ws.send({ 'method': 'Page.bringToFront' })],
  [
    'Page.getAppManifest',
    async ({ ws, question }) => {
      const manifestId = await question('Manifest Id:');
      ws.send({ 'method': 'Page.getAppManifest', params: { manifestId } })
    }
  ],
  ['Page.getFrameTree', async ({ ws }) => ws.send({ 'method': 'Page.getFrameTree' })],
  ['Page.getLayoutMetrics', async ({ ws }) => ws.send({ 'method': 'Page.getLayoutMetrics' })],
  ['Page.getNavigationHistory', async ({ ws }) => ws.send({ 'method': 'Page.getNavigationHistory' })],
  [
    'Page.handleJavaScriptDialog',
    async ({ ws, question }) => {
      const accept = await question('Accept (0/1):');
      const promptText = await question('Prompt Text:');
      req.push({ 'method': 'Page.handleJavaScriptDialog', 'params': { accept, promptText } });
    }
  ],
  [
    'Page.navigateToHistoryEntry',
    async ({ req, question }) => {
      const entryId = await question('Entry Id:');
      req.push({ 'method': 'Page.navigateToHistoryEntry', 'params': { entryId } });
    }
  ],
  [
    'Page.printToPDF',
    async ({ req, question }) => {
      const landscape = await question('landscape (0/1):');
      const displayHeaderFooter = await question('display header and footer (0/1):');
      const printBackground = await question('print background (0/1):');
      const scale = await question('scale (0/1):');
      req.push({ 'method': 'Page.printToPDF', 'params': { landscape, displayHeaderFooter, printBackground, scale } });
    }
  ],
  [
    'Page.setBypassCSP',
    async ({ req, question }) => {
      const enabled = await question('enabled (0/1):')
      req.push({ 'method': 'Page.setBypassCSP', 'params': { 'enabled': !!enabled } });
    }
  ],
  [
    'Page.setDocumentContent',
    async ({ req, question }) => {
      const frameId = await question('frame id:')
      const html = await question('html:')
      req.push({ 'method': 'Page.setDocumentContent', 'params': { frameId, html } })
    }
  ],
  [
    'Page.setInterceptFileChooserDialog',
    async ({ req, question }) => {
      const enabled = await question('enabled (0/1):')
      req.push({ 'method': 'Page.setInterceptFileChooserDialog', 'params': { enabled } })
    }
  ],
  [
    'Page.setLifecycleEventsEnabled',
    async ({ req, question }) => {
      const enabled = await question('enabled (0/1):')
      req.push({ 'method': 'Page.setLifecycleEventsEnabled', 'params': { enabled } })
    }
  ],
  ['Page.resetNavigationHistory', async ({ ws }) => ws.send({ 'method': 'Page.resetNavigationHistory', 'params': {} })],
  ['Page.stopLoading', async ({ ws }) => ws.send({ 'method': 'Page.stopLoading', 'params': {} })],
  ['Page.disable', async ({ ws }) => ws.send({ 'method': 'Page.disable', 'params': {} })],
  ['Page.close', async ({ ws }) => ws.send({ 'method': 'Page.close', 'params': {} })],
  //
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
  [
    'Exit',
    async ({ ws } = {}) => {
      ws.close()
    }
  ]
]

module.exports = { menu }

// ['Runtime.addBinding', async () => {}],
// ['Runtime.awaitPromise', async () => {}],
// ['Runtime.callFunctionOn', async () => {}],
// ['Runtime.compileScript', async () => {}],
// ['Runtime.disable', async () => {}],
// ['Runtime.discardConsoleEntries', async () => {}],
// ['Runtime.enable', async () => {}],
// ['Runtime.evaluate', async () => {}],
// ['Runtime.getProperties', async () => {}],
// ['Runtime.globalLexicalScopeNames', async () => {}],
// ['Runtime.queryObjects', async () => {}],
// ['Runtime.releaseObject', async () => {}],
// ['Runtime.releaseObjectGroup', async () => {}],
// ['Runtime.removeBinding', async () => {}],
// ['Runtime.runIfWaitingForDebugger', async () => {}],
// ['Runtime.runScript', async () => {}],
// ['Runtime.setAsyncCallStackDepth', async () => {}],

// ['DOM.describeNode', async () => {}],
// ['DOM.disable', async () => {}],
// ['DOM.enable', async () => {}],
// ['DOM.focus', async () => {}],
// ['DOM.getAttributes', async () => {}],
// ['DOM.getBoxModel', async () => {}],
// ['DOM.getDocument', async () => {}],
// ['DOM.getNodeForLocation', async () => {}],
// ['DOM.getOuterHTML', async () => {}],
// ['DOM.hideHighlight', async () => {}],
// ['DOM.highlightNode', async () => {}],
// ['DOM.highlightRect', async () => {}],
// ['DOM.moveTo', async () => {}],
// ['DOM.querySelector', async () => {}],
// ['DOM.querySelectorAll', async () => {}],
// ['DOM.removeAttribute', async () => {}],
// ['DOM.removeNode', async () => {}],
// ['DOM.requestChildNodes', async () => {}],
// ['DOM.requestNode', async () => {}],
// ['DOM.resolveNode', async () => {}],
// ['DOM.scrollIntoViewIfNeeded', async () => {}],
// ['DOM.setAttributesAsText', async () => {}],
// ['DOM.setAttributeValue', async () => {}],
// ['DOM.setFileInputFiles', async () => {}],
// ['DOM.setNodeName', async () => {}],
// ['DOM.setNodeValue', async () => {}],
// ['DOM.setOuterHTML', async () => {}],
