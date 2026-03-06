// docs: https://chromedevtools.github.io/devtools-protocol/

const menu = [
  [
    'Page.navigate',
    async ({ req, question, vars } = {}) => {
      const { url } = await vars([
        ['url', 'type=string', 'question=Enter URL to navigate to'],
      ])
      req.push({ 'method': 'Page.navigate', params: { url } });
    }
  ],
  [
    'Page.reload',
    async ({ ws } = {}) => ws.send({ 'method': 'Page.reload', 'params': { 'ignoreCache': true } })
  ],
  [
    'Page.captureScreenshot',
    async ({ ws } = {}) => ws.send({ 'method': 'Page.captureScreenshot', 'params': { 'format': 'png' } })
  ],
  [
    'Page.addScriptToEvaluateOnNewDocument',
    async ({ req, question, vars } = {}) => {
      const { source } = await vars([
        ['source', 'type=string', 'question=Source']
      ])
      req.push({ 'method': 'Page.addScriptToEvaluateOnNewDocument', params: { source } });
    }
  ],
  [
    'Page.bringToFront',
    async ({ ws }) => ws.send({ 'method': 'Page.bringToFront' })
  ],
  [
    'Page.getAppManifest',
    async ({ ws, question }) => {
      const manifestId = await question('Manifest Id:');
      ws.send({ 'method': 'Page.getAppManifest', params: { manifestId } })
    }
  ],
  [
    'Page.getFrameTree',
    async ({ ws }) => ws.send({ 'method': 'Page.getFrameTree' })
  ],
  [
    'Page.getLayoutMetrics',
    async ({ ws }) => ws.send({ 'method': 'Page.getLayoutMetrics' })
  ],
  [
    'Page.getNavigationHistory',
    async ({ ws }) => ws.send({ 'method': 'Page.getNavigationHistory' })
  ],
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
  ['Runtime.addBinding', async ({ ws }) => ws.send({ 'method': 'Runtime.addBinding', 'params': {} })],
  [
    'Runtime.awaitPromise',
    async ({ req, question }) => {
      const promiseObjectId = await question('Promise Object Id:')
      const returnByValue = await question('Return By Value:')
      req.push({ 'method': 'Runtime.awaitPromise', 'params': { promiseObjectId, returnByValue } })
    }
  ],
  [
    'Runtime.callFunctionOn',
    async ({ req, question }) => {
      const functionDeclaration = await question('Function Declaration:')
      const objectId = await question('Object Id:')
      const args = await question('Arguments:')
      const returnByValue = await question('Return By Value:')
      req.push({ 'method': 'Runtime.callFunctionOn', 'params': { functionDeclaration, objectId, arguments: args, returnByValue } })
    }
  ],
  [
    'Runtime.compileScript',
    async ({ req, question }) => {
      const expression = await question('Expression:')
      const sourceURL = await question('Source URL:')
      const persistScript = await question('Persist Script (0/1):')
      req.push({ 'method': 'Runtime.compileScript', 'params': { expression, sourceURL, persistScript } })
    }
  ],
  [
    'Runtime.disable',
    async ({ ws }) => ws.send({ 'method': 'Runtime.disable', 'params': {} })
  ],
  [
    'Runtime.discardConsoleEntries',
    async ({ ws }) => ws.send({ 'method': 'Runtime.discardConsoleEntries', 'params': {} })
  ],
  [
    'Runtime.enable',
    async ({ ws }) => ws.send({ 'method': 'Runtime.enable', 'params': {} })
  ],
  [
    'Runtime.evaluate',
    async ({ req, question }) => {
      const expression = await question('Expression:')
      const returnByValue = await question('Return By Value:')
      req.push({ 'method': 'Runtime.evaluate', 'params': { expression, returnByValue } })
    }
  ],
  [
    'Runtime.getProperties',
    async ({ req, question }) => {
      const objectId = await question('Object Id:')
      const ownProperties = await question('Own Properties:')
      req.push({ 'method': 'Runtime.getProperties', 'params': { objectId, ownProperties } })
    }
  ],
  [
    'Runtime.globalLexicalScopeNames',
    async ({ req, question }) => {
      req.push({ 'method': 'Runtime.globalLexicalScopeNames', 'params': {} })
    }
  ],
  [
    'Runtime.queryObjects',
    async ({ req, question }) => {
      const prototypeObjectId = await question('Prototype Object Id:')
      req.push({ 'method': 'Runtime.queryObjects', 'params': { prototypeObjectId } })
    }
  ],
  [
    'Runtime.releaseObject',
    async ({ req, question }) => {
      const objectId = await question('Object Id:')
      req.push({ 'method': 'Runtime.releaseObject', 'params': { objectId } })
    }
  ],
  [
    'Runtime.releaseObjectGroup',
    async ({ req, question }) => {
      const objectGroup = await question('Object Group:')
      req.push({ 'method': 'Runtime.releaseObjectGroup', 'params': { objectGroup } })
    }
  ],
  [
    'Runtime.removeBinding',
    async ({ req, question }) => {
      const name = await question('Name:')
      req.push({ 'method': 'Runtime.removeBinding', 'params': { name } })
    }
  ],
  [
    'Runtime.runIfWaitingForDebugger',
    async ({ ws }) => ws.send({ 'method': 'Runtime.runIfWaitingForDebugger', 'params': {} })
  ],
  [
    'Runtime.runScript',
    async ({ req, question }) => {
      const scriptId = await question('Script Id:')
      const executionContextId = await question('Execution Context Id:')
      const awaitPromise = await question('Await Promise:')
      req.push({ 'method': 'Runtime.runScript', 'params': { scriptId, executionContextId, awaitPromise } })
    }
  ],
  [
    'Runtime.setAsyncCallStackDepth',
    async ({ req, question }) => {
      const depth = await question('Depth:')
      req.push({ 'method': 'Runtime.setAsyncCallStackDepth', 'params': { depth } })
    }
  ],
  [
    'DOM.getDocument',
    async ({ ws } = {}) => {
      ws.send({ 'method': 'DOM.getDocument', 'params': {} })
    }
  ],
  [
    'DOM.describeNode',
    async ({ req, question }) => {
      const nodeId = await question('Node Id:')
      req.push({ 'method': 'DOM.describeNode', 'params': { nodeId } })
    }
  ],
  [
    'DOM.disable',
    async ({ ws }) => ws.send({ 'method': 'DOM.disable', 'params': {} })
  ],
  [
    'DOM.enable',
    async ({ ws }) => ws.send({ 'method': 'DOM.enable', 'params': {} })
  ],
  [
    'DOM.focus',
    async ({ req, question }) => {
      const nodeId = await question('Node Id:')
      req.push({ 'method': 'DOM.focus', 'params': { nodeId } })
    }
  ],
  [
    'DOM.getAttributes',
    async ({ req, question }) => {
      const nodeId = await question('Node Id:')
      req.push({ 'method': 'DOM.getAttributes', 'params': { nodeId } })
    }
  ],
  [
    'DOM.getBoxModel',
    async ({ req, question }) => {
      const nodeId = await question('Node Id:')
      req.push({ 'method': 'DOM.getBoxModel', 'params': { nodeId } })
    }
  ],
  [
    'DOM.getDocument',
    async ({ ws }) => ws.send({ 'method': 'DOM.getDocument', 'params': {} })
  ],
  [
    'DOM.getNodeForLocation',
    async ({ req, question }) => {
      const x = await question('x:')
      const y = await question('y:')
      req.push({ 'method': 'DOM.getNodeForLocation', 'params': { x, y } })
    }
  ],
  [
    'DOM.getOuterHTML',
    async ({ req, question }) => {
      const nodeId = await question('Node Id:')
      req.push({ 'method': 'DOM.getOuterHTML', 'params': { nodeId } })
    }
  ],
  [
    'DOM.hideHighlight',
    async ({ ws }) => ws.send({ 'method': 'DOM.hideHighlight', 'params': {} })
  ],
  [
    'DOM.highlightNode',
    async ({ req, question }) => {
      const nodeId = await question('Node Id:')
      req.push({ 'method': 'DOM.highlightNode', 'params': { nodeId } })
    }
  ],
  [
    'DOM.highlightRect',
    async ({ req, question }) => {
      const x = await question('x:')
      const y = await question('y:')
      const width = await question('width:')
      const height = await question('height:')
      req.push({ 'method': 'DOM.highlightRect', 'params': { x, y, width, height } })
    }
  ],
  [
    'DOM.moveTo',
    async ({ req, question }) => {
      const nodeId = await question('Node Id:')
      const x = await question('x:')
      const y = await question('y:')
      req.push({ 'method': 'DOM.moveTo', 'params': { nodeId, x, y } })
    }
  ],
  [
    'DOM.querySelector',
    async ({ req, question }) => {
      const nodeId = await question('Node Id:')
      const selector = await question('Selector:')
      req.push({ 'method': 'DOM.querySelector', 'params': { nodeId, selector } })
    }
  ],
  [
    'DOM.querySelectorAll',
    async ({ req, question }) => {
      const nodeId = await question('Node Id:')
      const selector = await question('Selector:')
      req.push({ 'method': 'DOM.querySelectorAll', 'params': { nodeId, selector } })
    }
  ],
  [
    'DOM.removeAttribute',
    async ({ req, question }) => {
      const nodeId = await question('Node Id:')
      const name = await question('Name:')
      req.push({ 'method': 'DOM.removeAttribute', 'params': { nodeId, name } })
    }
  ],
  [
    'DOM.removeNode',
    async ({ req, question }) => {
      const nodeId = await question('Node Id:')
      req.push({ 'method': 'DOM.removeNode', 'params': { nodeId } })
    }
  ],
  [
    'DOM.requestChildNodes',
    async ({ req, question }) => {
      const nodeId = await question('Node Id:')
      const depth = await question('Depth:')
      req.push({ 'method': 'DOM.requestChildNodes', 'params': { nodeId, depth } })
    }
  ],
  [
    'DOM.requestNode',
    async ({ req, question }) => {
      const nodeId = await question('Node Id:')
      req.push({ 'method': 'DOM.requestNode', 'params': { nodeId } })
    }
  ],
  [
    'DOM.resolveNode',
    async ({ req, question }) => {
      const nodeId = await question('Node Id:')
      req.push({ 'method': 'DOM.resolveNode', 'params': { nodeId } })
    }
  ],
  [
    'DOM.scrollIntoViewIfNeeded',
    async ({ req, question }) => {
      const nodeId = await question('Node Id:')
      req.push({ 'method': 'DOM.scrollIntoViewIfNeeded', 'params': { nodeId } })
    }
  ],
  [
    'DOM.setAttributesAsText',
    async ({ req, question }) => {
      const nodeId = await question('Node Id:')
      const text = await question('Text:')
      req.push({ 'method': 'DOM.setAttributesAsText', 'params': { nodeId, text } })
    }
  ],
  [
    'DOM.setAttributeValue',
    async ({ req, question }) => {
      const nodeId = await question('Node Id:')
      const name = await question('Name:')
      const value = await question('Value:')
      req.push({ 'method': 'DOM.setAttributeValue', 'params': { nodeId, name, value } })
    }
  ],
  [
    'DOM.setFileInputFiles',
    async ({ req, question }) => {
      const nodeId = await question('Node Id:')
      const files = await question('Files:')
      req.push({ 'method': 'DOM.setFileInputFiles', 'params': { nodeId, files } })
    }
  ],
  [
    'DOM.setNodeName',
    async ({ req, question }) => {
      const nodeId = await question('Node Id:')
      const name = await question('Name:')
      req.push({ 'method': 'DOM.setNodeName', 'params': { nodeId, name } })
    }
  ],
  [
    'DOM.setNodeValue',
    async ({ req, question }) => {
      const nodeId = await question('Node Id:')
      const value = await question('Value:')
      req.push({ 'method': 'DOM.setNodeValue', 'params': { nodeId, value } })
    }
  ],
  [
    'DOM.setOuterHTML',
    async ({ req, question }) => {
      const nodeId = await question('Node Id:')
      const outerHTML = await question('Outer HTML:')
      req.push({ 'method': 'DOM.setOuterHTML', 'params': { nodeId, outerHTML } })
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
