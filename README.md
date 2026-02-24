# 🌐 Remote Debugging - Chrome DevTools Protocol

Welcome! This project demonstrates how to interact with **Chrome's Remote Debugging Protocol** using Node.js. It provides an interactive command-line interface to explore and execute Chrome DevTools Protocol (CDP) commands through WebSocket connections.

## 📖 What Does This Project Do?

This tool allows you to:
- Connect to a Chrome browser instance via WebSocket
- Execute Chrome DevTools Protocol (CDP) commands interactively
- Navigate pages, capture screenshots, evaluate JavaScript, and much more
- Save request configurations and responses as JSON files
- Learn and experiment with browser automation

Perfect for developers interested in browser automation, web scraping, testing, or understanding how tools like Puppeteer work under the hood!

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **Chrome/Chromium browser** (automatically installed via npm)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/tarsislimadev/remotedebugging.git
cd remotedebugging
```

2. **Install dependencies**
```bash
npm ci
```

This will also automatically install a compatible Chrome browser for remote debugging.

## 🎯 Usage

### Step 1: Start Chrome with Remote Debugging

Open a terminal and start Chrome with remote debugging enabled:

**Windows:**
```bash
.\chrome\win64-145.0.7632.117\chrome-win64\chrome.exe --remote-debugging-port=9222
```

**Linux/Mac:**
```bash
./chrome/chrome --remote-debugging-port=9222
```

This opens Chrome with a debugging port on `localhost:9222`.

### Step 2: Run the Application

In a **new terminal window**, start the application:

```bash
node app.js
```

### Step 3: Explore Commands

The app displays an interactive menu where you can:
- Select CDP methods (Page, Runtime, DOM, Network, etc.)
- Configure parameters for each command
- Save requests for later reuse
- Execute commands and view responses

All responses are automatically saved to the `responses/` directory as timestamped JSON files.

## 🛠️ How It Works

1. **WebSocket Connection**: The app connects to Chrome's debugging WebSocket endpoint
2. **Interactive Menu**: Choose from available CDP methods organized by domain
3. **Send Commands**: Compose and send JSON-RPC style commands to Chrome
4. **Receive Responses**: Chrome responds with data (screenshots, DOM info, etc.)
5. **Save & Reuse**: Save configurations and replay requests

### Protocol Structure

Commands follow the Chrome DevTools Protocol format:
```json
{
  "id": 1,
  "method": "Page.navigate",
  "params": {
    "url": "https://example.com"
  }
}
```

## 📁 Project Structure

```
remotedebugging/
├── app.js              # Main application entry point
├── menu.js             # Interactive menu and command definitions
├── package.json        # Project dependencies and scripts
├── responses/          # Saved JSON responses from Chrome
└── README.md           # This file
```

## 📚 Learn More

### Documentation
- **[Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)** - Official CDP documentation

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs via [GitHub Issues](https://github.com/tarsislimadev/remotedebugging/issues)
- Submit pull requests with improvements
- Share your use cases and ideas

## 📝 License

This project is open source. See the repository for license details.

## 💡 Tips for Beginners

- Start with simple commands like `Page.navigate` or `Page.captureScreenshot`
- Check the `docs/` folder for detailed explanations and examples
- Responses are saved in `responses/` - inspect them to understand the data structure
- Use the Chrome DevTools Protocol Viewer to explore all available commands
- Experiment and have fun! This is a learning tool.

**Happy Debugging! 🐛✨**

For questions or support, open an issue on GitHub or check the documentation in the `docs/` folder.
