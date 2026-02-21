const menu = [
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
  [
    'Exit',
    async ({ ws } = {}) => {
      ws.close()
    }
  ]
]

module.exports = { menu }

// ['Page.addScriptToEvaluateOnNewDocument', async () => {}],
// ['Page.bringToFront', async () => {}],
// ['Page.close', async () => {}],
// ['Page.createIsolatedWorld', async () => {}],
// ['Page.disable', async () => {}],
// ['Page.enable', async () => {}],
// ['Page.getAppManifest', async () => {}],
// ['Page.getFrameTree', async () => {}],
// ['Page.getLayoutMetrics', async () => {}],
// ['Page.getNavigationHistory', async () => {}],
// ['Page.handleJavaScriptDialog', async () => {}],
// ['Page.navigateToHistoryEntry', async () => {}],
// ['Page.printToPDF', async () => {}],
// ['Page.removeScriptToEvaluateOnNewDocument', async () => {}],
// ['Page.resetNavigationHistory', async () => {}],
// ['Page.setBypassCSP', async () => {}],
// ['Page.setDocumentContent', async () => {}],
// ['Page.setInterceptFileChooserDialog', async () => {}],
// ['Page.setLifecycleEventsEnabled', async () => {}],
// ['Page.stopLoading', async () => {}],

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
