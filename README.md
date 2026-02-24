# auto-weblate

Translate using Chromium Remote Debugging and Argos AI model 

## Install Node.js dependencies

```bash
npm ci
```

## Run Chromium Remote Debugging

```bash
.\chrome\win64-145.0.7632.117\chrome-win64\chrome.exe --remote-debugging-port=9222
```

## Run app

```bash
node ./app.js
```

## How it works

The app show available methods. The user chooses methods and fill params for saving JSON files with data. The user may choose JSON file for requesting current WebScoket connection.

## See more

[chrome-devtools-protocol](https://chromedevtools.github.io/devtools-protocol/tot/Page/)
