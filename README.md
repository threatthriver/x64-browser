# X64 Browser

<div align="center">

![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows-blue?style=for-the-badge)
![Tauri](https://img.shields.io/badge/Tauri-24C8DB?style=for-the-badge&logo=tauri&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)

**A high-performance, privacy-focused web browser for macOS and Windows built from scratch**

[Features](#features) • [Installation](#installation) • [Development](#development) • [Contributing](#contributing) • [License](#license)

</div>

---

## 🌟 About X64 Browser

X64 Browser is a modern, lightweight web browser built using [Tauri](https://tauri.app/), [React](https://react.dev/), and [Rust](https://www.rust-lang.org/). It combines the speed and security of native platform technologies (WebKit on macOS, WebView2 on Windows) with the flexibility of a modern web frontend.

### Why X64 Browser?

- 🚀 **Lightning Fast** - Native Rust backend with platform-native WebView for optimal performance
- 🔒 **Privacy First** - No telemetry, no data collection, built-in tracking protection
- 🎨 **Native Design** - Beautiful, platform-optimized UI that feels right at home on macOS and Windows
- 🔌 **Chrome Extension Support** - Your favorite extensions work seamlessly
- 💻 **Developer Friendly** - Built-in DevTools with full debugging capabilities

---

## ✨ Features

### Core Browsing
- 📑 **Tabbed Browsing** - Smooth tab management with drag-to-reorder and keyboard shortcuts
- 🔖 **Bookmarks** - Organize your favorite sites with folders and quick access
- 📜 **History** - Full browsing history with search and time-based filtering
- ⬇️ **Downloads** - Built-in download manager with pause/resume support

### Developer Tools
- 🛠️ **Built-in DevTools** - Console, Elements, Network, and Sources panels
- 🔍 **JavaScript Debugging** - Full debugging capabilities with breakpoints
- 📊 **Performance Profiling** - Analyze page performance

### Extension Support
- 🔌 **Chrome Extensions** - Manifest V2 and V3 support
- 📦 **Extension Manager** - Easy install, configure, and manage extensions

### User Experience
- 🌓 **Dark/Light Mode** - Automatic theme switching based on system preferences
- ⌨️ **Keyboard Shortcuts** - Comprehensive shortcut support for power users
- 📱 **Touch Bar** - Native Touch Bar support for compatible MacBooks (macOS)
- 🎯 **Smart Search** - Intelligent URL bar with autocomplete and suggestions
- 🪟 **Native Window Controls** - Traffic lights on macOS, standard controls on Windows

---

## 📸 Screenshots

*Coming soon - Application is currently in development*

---

## 🚀 Installation

### Prerequisites

#### macOS
- **macOS** 10.15 (Catalina) or later
- **Node.js** 18.x or later
- **Rust** 1.70 or later ([Install via rustup](https://rustup.rs/))
- **Xcode Command Line Tools**

#### Windows
- **Windows** 10 or later
- **Node.js** 18.x or later
- **Rust** 1.70 or later ([Install via rustup](https://rustup.rs/))
- **Microsoft Visual Studio C++ Build Tools**
- **WebView2** (usually pre-installed on Windows 10/11)

### From Source

```bash
# Clone the repository
git clone https://github.com/threatthriver/x64-browser.git
cd x64-browser

# Install dependencies
npm install
```

### Development

```bash
# macOS
npm run tauri dev

# Windows (PowerShell/CMD)
npm run tauri dev
```

### Building for Production

```bash
# macOS - Creates DMG and APP bundle
npm run tauri build

# Windows - Creates MSI and NSIS installer
npm run tauri build

# Built applications location:
# macOS: src-tauri/target/release/bundle/dmg/ or .app
# Windows: src-tauri/target/release/bundle/msi/ or .exe
```

### Pre-built Binaries

Download pre-built binaries from the [Releases](https://github.com/threatthriver/x64-browser/releases) page.

---

## 🛠️ Development

### Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS 4 |
| **State Management** | Zustand |
| **Backend** | Rust, Tauri 2.x |
| **WebView** | WKWebView (macOS) / WebView2 (Windows) |

### Project Structure

```
x64-browser/
├── src/                    # Frontend React/TypeScript code
│   ├── components/         # UI components (tabs, navigation, etc.)
│   ├── stores/             # Zustand state stores
│   ├── types/              # TypeScript type definitions
│   └── assets/             # Static assets
├── src-tauri/              # Rust backend
│   ├── src/                # Rust source code
│   ├── icons/              # Application icons
│   └── tauri.conf.json     # Tauri configuration
├── public/                 # Public assets
└── package.json            # Node.js dependencies and scripts
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run tauri dev` | Run Tauri app in development mode |
| `npm run build` | Build frontend for production |
| `npm run tauri build` | Build complete application |
| `npm run preview` | Preview production build |

### Keyboard Shortcuts

| Action | macOS | Windows |
|--------|-------|---------|
| New tab | `Cmd + T` | `Ctrl + T` |
| Close tab | `Cmd + W` | `Ctrl + W` |
| Reopen closed tab | `Cmd + Shift + T` | `Ctrl + Shift + T` |
| Focus URL bar | `Cmd + L` | `Ctrl + L` |
| Refresh page | `Cmd + R` | `Ctrl + R` |
| Hard refresh | `Cmd + Shift + R` | `Ctrl + Shift + R` |
| Bookmark page | `Cmd + D` | `Ctrl + D` |
| Bookmark manager | `Cmd + Shift + B` | `Ctrl + Shift + B` |
| Downloads | `Cmd + Shift + L` | `Ctrl + Shift + L` |
| Open DevTools | `Cmd + Opt + I` | `Ctrl + Shift + I` |

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:

- Code of Conduct
- Development setup
- Pull request process
- Coding standards

### Ways to Contribute

- 🐛 Report bugs and issues
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit bug fixes
- 🎨 Help with UI/UX improvements

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [Tauri](https://tauri.app/) - The framework powering our native backend
- [React](https://react.dev/) - The UI library for our frontend
- [WKWebView](https://developer.apple.com/documentation/webkit/wkwebview) - Apple's web rendering engine (macOS)
- [WebView2](https://docs.microsoft.com/en-us/microsoft-edge/webview2/) - Microsoft Edge WebView2 (Windows)
- [Zustand](https://zustand-demo.pmnd.rs/) - Simple state management

---

## 📬 Contact

- **Repository**: [github.com/threatthriver/x64-browser](https://github.com/threatthriver/x64-browser)
- **Issues**: [Report a bug](https://github.com/threatthriver/x64-browser/issues)
- **Discussions**: [Join the conversation](https://github.com/threatthriver/x64-browser/discussions)

---

<div align="center">

**Built with ❤️ for macOS and Windows**

[⬆ Back to Top](#x64-browser)

</div>
