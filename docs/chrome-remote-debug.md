# Chrome Remote Debugging

When you connect to Chromium’s **Remote Debugging WebSocket**, you’re speaking the **Chrome DevTools Protocol (CDP)**. This protocol is organized into **domains** (modules), each with its own set of commands and events. You send JSON messages over the WebSocket, and the browser responds with JSON as well.

### 📡 Message Structure
A typical command looks like this:
```json
{
  "id": 1,
  "method": "Page.navigate",
  "params": {
    "url": "https://example.com"
  }
}
```
- **id** → unique number to match requests with responses  
- **method** → command name (domain + command)  
- **params** → arguments for the command  

Responses will include the same `id` so you can correlate them.

### 🔑 Common Domains & Commands
Here are some of the most useful instructions you can send:

| Domain | Example Commands | Purpose |
|--------|------------------|---------|
| **Page** | `Page.navigate`, `Page.reload`, `Page.captureScreenshot` | Control navigation and capture screenshots |
| **Runtime** | `Runtime.evaluate`, `Runtime.callFunctionOn` | Execute JavaScript in the page context |
| **DOM** | `DOM.getDocument`, `DOM.querySelector`, `DOM.setAttributeValue` | Inspect and manipulate the DOM |
| **Network** | `Network.enable`, `Network.setExtraHTTPHeaders`, `Network.getResponseBody` | Monitor and control network traffic |
| **Debugger** | `Debugger.enable`, `Debugger.setBreakpointByUrl`, `Debugger.resume` | Set breakpoints and step through code |
| **Console** | `Console.enable` | Listen for console messages |
| **Emulation** | `Emulation.setDeviceMetricsOverride`, `Emulation.setGeolocationOverride` | Simulate devices, screen sizes, and locations |

### 🔔 Events
Besides commands, the browser sends **events** asynchronously. For example:
- `Network.requestWillBeSent` → when a request starts
- `Page.loadEventFired` → when a page finishes loading
- `Runtime.consoleAPICalled` → when `console.log` is triggered

### ⚠️ Notes
- The full protocol is documented here: Chrome DevTools Protocol Viewer [(chromedevtools.github.io in Bing)](https://www.bing.com/search?q="https%3A%2F%2Fchromedevtools.github.io%2Fdevtools-protocol%2F")  
- The protocol evolves with Chrome versions, so commands may differ slightly depending on your browser build.  
- For automation, libraries like **Puppeteer** or **Playwright** wrap these WebSocket calls, making them easier to use.  

Would you like me to show you a **step-by-step example** of connecting to the WebSocket and sending a command (like navigating to a page and taking a screenshot) using plain Node.js?
