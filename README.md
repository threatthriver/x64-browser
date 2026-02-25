# X64 Browser

<div align="center">

![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-blue?style=for-the-badge)
![Electron](https://img.shields.io/badge/Electron-34.0-47848F?style=for-the-badge&logo=electron&logoColor=white)
![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

**A high-performance, privacy-focused web browser built with Electron**

[Features](#features) • [Installation](#installation) • [Development](#development) • [Contributing](#contributing) • [License](#license)

</div>

---

## 🌟 About X64 Browser

X64 Browser is a modern, lightweight web browser built using [Electron](https://www.electronjs.org/), [React](https://react.dev/), and [TypeScript](https://www.typescriptlang.org/). It uses Chromium's rendering engine for full website compatibility and provides a clean, native-like experience on macOS, Windows, and Linux.

### Why X64 Browser?

- 🚀 **Full Chromium Engine** - Same rendering as Chrome, all websites work perfectly
- 🔒 **Privacy First** - No telemetry, no data collection, built-in tracking protection
- 🎨 **Native Design** - Beautiful, platform-optimized UI that feels right at home
- 🔌 **Chrome Extension Support** - Your favorite extensions work seamlessly (coming soon)
- 💻 **Developer Friendly** - Built-in DevTools with full debugging capabilities
- 📑 **Tabbed Browsing** - Smooth tab management with multiple BrowserViews

---

## ✨ Features

### Core Browsing
- 📑 **Tabbed Browsing** - Smooth tab management with drag-to-reorder and keyboard shortcuts
- 🔖 **Bookmarks** - Organize your favorite sites with folders and quick access
- 📜 **History** - Full browsing history with search and time-based filtering
- ⬇️ **Downloads** - Built-in download manager with pause/resume support

### Developer Tools
- 🛠️ **Built-in DevTools** - Full Chrome DevTools integration
- 🔍 **JavaScript Debugging** - Complete debugging capabilities with breakpoints
- 📊 **Performance Profiling** - Analyze page performance

### User Experience
- 🌓 **Dark/Light Mode** - Automatic theme switching based on system preferences
- ⌨️ **Keyboard Shortcuts** - Comprehensive shortcut support for power users
- 🎯 **Smart Search** - Intelligent URL bar with autocomplete and suggestions
- 🪟 **Native Window Controls** - Traffic lights on macOS, standard controls on Windows

---

## 🚀 Installation

### Prerequisites

- **Node.js** 18.x or later
- **npm** or **yarn**

### From Source

```bash
# Clone the repository
git clone https://github.com/threatthriver/x64-browser.git
cd x64-browser

# Install dependencies
npm install

# Start development
npm run electron:dev
```

### Building for Production

```bash
# Build the application
npm run electron:build

# Built applications location:
# macOS: release/X64 Browser.dmg
# Windows: release/X64 Browser Setup.exe
# Linux: release/X64 Browser.AppImage
```

---

## 🛠️ Development

### Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS 4 |
| **State Management** | Zustand |
| **Backend** | Electron, Node.js |
| **Rendering** | Chromium (same as Chrome) |

### Project Structure

```
x64-browser/
├── src/                    # Frontend React/TypeScript code
│   ├── components/         # UI components (tabs, navigation, etc.)
│   ├── stores/             # Zustand state stores
│   ├── types/              # TypeScript type definitions
│   └── assets/             # Static assets
├── electron/               # Electron main process
│   └── main.js             # Main process entry point
├── public/                 # Public assets
├── dist/                   # Built frontend
└── release/                # Built application installers
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run electron:dev` | Run Electron app in development mode |
| `npm run build` | Build frontend for production |
| `npm run electron:build` | Build complete application |
| `npm run electron:start` | Start built Electron app |

### Keyboard Shortcuts

| Action | macOS | Windows/Linux |
|--------|-------|---------------|
| New tab | `Cmd + T` | `Ctrl + T` |
| Close tab | `Cmd + W` | `Ctrl + W` |
| Reopen closed tab | `Cmd + Shift + T` | `Ctrl + Shift + T` |
| Focus URL bar | `Cmd + L` | `Ctrl + L` |
| Refresh page | `Cmd + R` | `Ctrl + R` |
| Hard refresh | `Cmd + Shift + R` | `Ctrl + Shift + R` |
| Bookmark page | `Cmd + D` | `Ctrl + D` |
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

- [Electron](https://www.electronjs.org/) - The framework powering our application
- [React](https://react.dev/) - The UI library for our frontend
- [Chromium](https://www.chromium.org/) - The rendering engine
- [Zustand](https://zustand-demo.pmnd.rs/) - Simple state management
- [Lucide React](https://lucide.dev/) - Beautiful icons

---

## 📬 Contact

- **Repository**: [github.com/threatthriver/x64-browser](https://github.com/threatthriver/x64-browser)
- **Issues**: [Report a bug](https://github.com/threatthriver/x64-browser/issues)
- **Discussions**: [Join the conversation](https://github.com/threatthriver/x64-browser/discussions)

---

<div align="center">

**Built with ❤️ using Electron**

[⬆ Back to Top](#x64-browser)

</div>
