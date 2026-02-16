# auto-weblate

Translate using Chromium Remote Debugging and Argos AI model 

## Install Chromium

```bash
npx @puppeteer/browsers install chrome@stable
```

## Go to Chrome path

```bash
cd .\chrome\win64-145.0.7632.76\chrome-win64\
```

## Run Chromium Remote Debugging

```bash
.\chrome.exe  --remote-debugging-port=9222
```

## Get WebSocket Debugger Url

```bash
curl "http://localhost:9222/json" | jq '.[].webSocketDebuggerUrl'
```

## Connect using WebSocket

```bash
npx wsc "ws://localhost:9222/devtools/page/FCE111F111BEFF1111CFADD11A1E1111"
```
