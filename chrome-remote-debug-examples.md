Here are clear examples of how you’d send requests to the Chrome DevTools Protocol (CDP) using its JSON-RPC style. Each request includes the `method` and `params` fields, plus an `id` for tracking responses.

---

## Page Domain
```json
{ "id": 1, "method": "Page.navigate", "params": { "url": "https://example.com" } }

{ "id": 2, "method": "Page.reload", "params": { "ignoreCache": true } }

{ "id": 3, "method": "Page.captureScreenshot", "params": { "format": "png" } }
```

---

## Runtime Domain
```json
{ "id": 4, "method": "Runtime.evaluate", "params": { "expression": "document.title" } }

{ "id": 5, "method": "Runtime.callFunctionOn", "params": { 
    "objectId": "1234", 
    "functionDeclaration": "function() { return this.innerText; }" 
} }
```

---

## DOM Domain
```json
{ "id": 6, "method": "DOM.getDocument", "params": {} }

{ "id": 7, "method": "DOM.querySelector", "params": { "nodeId": 1, "selector": "#main" } }

{ "id": 8, "method": "DOM.setAttributeValue", "params": { "nodeId": 2, "name": "class", "value": "highlight" } }
```

---

## Network Domain
```json
{ "id": 9, "method": "Network.enable", "params": {} }

{ "id": 10, "method": "Network.setExtraHTTPHeaders", "params": { "headers": { "Authorization": "Bearer token123" } } }

{ "id": 11, "method": "Network.getResponseBody", "params": { "requestId": "ABC123" } }
```

---

## Debugger Domain
```json
{ "id": 12, "method": "Debugger.enable", "params": {} }

{ "id": 13, "method": "Debugger.setBreakpointByUrl", "params": { 
    "lineNumber": 42, 
    "url": "https://example.com/script.js" 
} }

{ "id": 14, "method": "Debugger.resume", "params": {} }
```

---

## Console Domain
```json
{ "id": 15, "method": "Console.enable", "params": {} }
```

---

## Emulation Domain
```json
{ "id": 16, "method": "Emulation.setDeviceMetricsOverride", "params": { 
    "width": 375, 
    "height": 812, 
    "deviceScaleFactor": 3, 
    "mobile": true 
} }

{ "id": 17, "method": "Emulation.setGeolocationOverride", "params": { 
    "latitude": -22.411, 
    "longitude": -47.561, 
    "accuracy": 100 
} }
```

---

✅ These examples show the **basic structure** of CDP requests. You’d send them over a WebSocket connection to Chrome’s remote debugging port (usually `localhost:9222`).  

Would you like me to also show **example responses** from Chrome for these requests, so you can see what data comes back?
