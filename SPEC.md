# X64 Browser - Specification Document

## 1. Project Overview

### Project Name
**X64 Browser** - A high-performance, cross-platform web browser built from scratch

### Project Type
Desktop Web Browser Application

### Core Feature Summary
A fast, lightweight web browser for macOS and Windows built with Tauri that supports tabbed browsing, bookmarks, history, downloads, DevTools, and Chrome extensions.

### Target Users
- macOS users seeking a fast, privacy-focused alternative to Safari and Chrome
- Windows users looking for a lightweight, privacy-focused browser
- Power users who want Chrome extension support with better performance
- Developers who need a lightweight browser with DevTools

---

## 2. Technology Stack

### Framework
- **Tauri 2.x** - Uses Rust backend with native WebView (WKWebView on macOS, WebView2 on Windows)
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: CSS Modules or Tailwind CSS

### Key Dependencies
- `@tauri-apps/api` - Tauri JavaScript API
- `@tauri-apps/plugin-shell` - Shell commands
- `@tauri-apps/plugin-fs` - File system access
- `@tauri-apps/plugin-dialog` - Native dialogs
- `@tauri-apps/plugin-store` - Local storage for settings/bookmarks
- `webextension-polyfill` - Chrome extension API support

### Platform-Specific Technologies

| Platform | WebView | Window Controls | Notes |
|----------|---------|-----------------|-------|
| **macOS** | WKWebView | Traffic Lights | Touch Bar support |
| **Windows** | WebView2 (Edge Chromium) | Standard Min/Max/Close | Windows 10/11 |

---

## 3. UI/UX Specification

### Window Model
- **Main Window**: Single primary window with tabbed interface
- **Dialog Windows**: Native platform dialogs for settings, downloads, etc.
- **Frameless Window**: Custom title bar with native-like controls

### Platform-Specific Window Controls

| Feature | macOS | Windows |
|---------|-------|---------|
| Window Buttons | Traffic Lights (left) | Min/Max/Close (right) |
| Title Bar | Unified with tab bar | Standard or custom |
| Transparency | Vibrancy/Blur | Acrylic/Mica (Windows 11) |

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ [Title Bar: Window Controls] [Tab Bar]            [+]     │
├─────────────────────────────────────────────────────────────┤
│ [<][>][↻] [URL Bar with security indicator]     [⋮][📖][⚙] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                     Web Content Area                        │
│                   (WebView Instance)                        │
│                                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Visual Design

#### Color Palette
| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Primary Background | `#FFFFFF` | `#1E1E1E` |
| Secondary Background | `#F5F5F7` | `#2D2D2D` |
| Accent Color | `#007AFF` (macOS Blue) | `#0A84FF` |
| Text Primary | `#1D1D1F` | `#F5F5F7` |
| Text Secondary | `#86868B` | `#98989D` |
| Border/Divider | `#D2D2D7` | `#3D3D3D` |
| URL Bar Background | `#E8E8ED` | `#3A3A3C` |
| Tab Active | `#FFFFFF` | `#424245` |
| Tab Inactive | `#D1D1D6` | `#2C2C2E` |

#### Typography
- **Font Family**: 
  - macOS: `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif`
  - Windows: `"Segoe UI", "Microsoft YaHei", sans-serif`
- **Tab Title**: 13px, medium weight
- **URL Bar**: 14px, regular weight
- **Button Labels**: 13px, medium weight

#### Spacing System
- Base unit: 4px
- Component padding: 8px
- Toolbar height: 48px
- Tab bar height: 36px
- Title bar height: 28px

#### Platform-Specific Elements

**macOS:**
- **Traffic Lights**: Custom close/minimize/zoom buttons matching macOS design
- **Unified Title/Tab Bar**: Integrated toolbar and tab bar
- **Touch Bar**: Support for navigation controls (if applicable)
- **Menu Bar**: Full macOS menu bar integration
- **Vibrancy**: Translucent materials for sidebar and toolbars

**Windows:**
- **Window Controls**: Standard minimize/maximize/close on right
- **Title Bar**: Custom or native title bar option
- **Mica/Acrylic**: Windows 11 material support for modern look
- **Taskbar Integration**: Jump lists and thumbnail previews

### Components

#### 1. Title Bar
- **macOS**: Custom traffic light buttons (close: `#FF5F56`, minimize: `#FFBD2E`, zoom: `#27C93F`)
- **Windows**: Standard window controls or custom styled
- Draggable region for window movement
- Tab bar integration

#### 2. Tab Bar
- Horizontal scrollable tabs
- Each tab shows: favicon, title, close button
- Active tab indicator (accent color underline)
- New tab button (+)
- Tab context menu (close, close others, duplicate, etc.)
- Drag-to-reorder functionality
- Maximum tab width: 200px, minimum: 100px

#### 3. Navigation Bar
- **Back Button**: `<` icon, disabled when no history
- **Forward Button**: `>` icon, disabled when no forward history
- **Refresh Button**: `↻` icon, shows `×` when loading
- **URL/Search Bar**:
  - Rounded rectangle (8px radius)
  - Security indicator (lock icon for HTTPS)
  - Loading progress bar underneath
  - Autocomplete dropdown for history/bookmarks
- **Menu Button**: `⋮` for additional options
- **Bookmarks Button**: `📖` star icon
- **Settings Button**: `⚙` gear icon

#### 4. Web Content Area
- Full WKWebView integration
- Supports: HTML, CSS, JavaScript, WebGL, video, audio
- Pinch-to-zoom support
- Text selection and context menus

#### 5. Status Bar (optional, toggleable)
- Shows: page load progress, zoom level, connection status

---

## 4. Functional Specification

### Core Features

#### 4.1 Tab Management
- Create new tabs (Cmd+T)
- Close tabs (Cmd+W, middle-click)
- Switch tabs (Cmd+1-9, Cmd+Shift+[ ], Cmd+Tab)
- Reorder tabs via drag-and-drop
- Duplicate tabs
- Close all / Close other tabs
- Tab groups (future enhancement)
- Restore closed tabs (Cmd+Shift+T)

#### 4.2 Navigation
- URL bar input with smart search
- Keyboard shortcuts:
  - `Cmd+Enter`: Add www. and .com
  - `Cmd+Shift+Enter`: Add .org
  - `Alt+Enter`: Open in new tab
- Back/Forward history
- Page refresh (Cmd+R, Cmd+Shift+R for hard refresh)
- Stop loading (Esc)
- Auto-complete from history/bookmarks

#### 4.3 Bookmarks
- Add/Remove bookmarks (Cmd+D)
- Bookmark manager (Cmd+Shift+B)
- Bookmark bar (toggleable)
- Import/Export bookmarks (HTML format)
- Folder organization

#### 4.4 History
- Automatic history recording
- Search history (in URL bar)
- History manager
- Clear history (with time range options)
- History sidebar in manager

#### 4.5 Downloads
- Download manager (Cmd+Shift+L)
- Download progress indicator in status bar
- Pause/Resume downloads
- Clear completed downloads
- Download location setting
- File type handling

#### 4.6 DevTools
- Built-in developer tools (Cmd+Opt+I)
- Console, Elements, Network, Sources panels
- JavaScript debugging
- Performance profiling

#### 4.7 Chrome Extension Support
- Manifest V2 and V3 support
- Extension manager (chrome://extensions)
- Install extensions from CRX files
- Extension settings and permissions
- Key APIs to support:
  - `chrome.tabs`, `chrome.windows`
  - `chrome.bookmarks`, `chrome.history`
  - `chrome.storage`, `chrome.runtime`
  - `chrome.webRequest`, `chrome.declarativeNetRequest`
  - `chrome.contextMenus`, `chrome.commands`

### User Interactions and Flows

#### New Tab Flow
1. User presses Cmd+T or clicks + button
2. New tab created with focused URL bar
3. User types URL or search query
4. Press Enter to navigate

#### Bookmark Flow
1. User navigates to desired page
2. Press Cmd+D or click bookmark icon
3. Bookmark dialog appears with title/URL
4. User selects folder and confirms
5. Bookmark saved to storage

#### Download Flow
1. User clicks download link
2. Download starts automatically
3. Progress shown in status bar
4. Notification when complete
5. File saved to download folder

### Data Flow & Processing

#### Storage Architecture
```
Local Storage/
├── settings.json       # User preferences
├── bookmarks.json      # Bookmark data
├── history.db          # SQLite history database
├── extensions/         # Installed extensions
│   └── {extension_id}/
├── downloads/          # Downloaded files
└── cache/              # WebView cache
```

#### Key Modules

| Module | Responsibility | Public API |
|--------|---------------|------------|
| `TabManager` | Tab lifecycle, state | `createTab()`, `closeTab()`, `switchTab()` |
| `NavigationManager` | URL handling, history | `navigate()`, `back()`, `forward()` |
| `BookmarkStore` | Bookmark CRUD | `addBookmark()`, `removeBookmark()`, `getBookmarks()` |
| `HistoryStore` | History recording/search | `addEntry()`, `search()`, `clear()` |
| `DownloadManager` | Download handling | `startDownload()`, `pauseDownload()`, `cancelDownload()` |
| `ExtensionLoader` | Extension loading | `loadExtension()`, `unloadExtension()` |
| `SettingsStore` | Preferences | `get()`, `set()`, `reset()` |

### Edge Cases

1. **No Internet**: Show offline page, allow viewing cached content
2. **Invalid URL**: Show error page with search option
3. **Tab Crash**: Show "Tab crashed" message, offer reload
4. **Extension Error**: Disable problematic extension, show notification
5. **Large Downloads**: Handle gracefully, show progress
6. **Memory Pressure**: Implement tab unloading for inactive tabs

---

## 5. System Integration

### Required Capabilities

#### macOS
- [ ] Window Management (minimize, maximize, fullscreen)
- [ ] Menu Bar Integration
- [ ] Keyboard Shortcuts
- [ ] Drag and Drop (files, URLs)
- [ ] Clipboard (copy/paste URLs)
- [ ] Touch Bar Support
- [ ] Dock Icon (downloading badge)

#### Windows
- [ ] Window Management (minimize, maximize, restore)
- [ ] Taskbar Integration (jump lists, previews)
- [ ] Keyboard Shortcuts
- [ ] Drag and Drop (files, URLs)
- [ ] Clipboard (copy/paste URLs)
- [ ] File Explorer Integration
- [ ] System Tray Icon (optional)

### Security
- [ ] HTTPS by default
- [ ] Safe Browsing integration (optional)
- [ ] Extension permission prompts
- [ ] Sandbox enabled

---

## 6. Acceptance Criteria

### Phase 1: Core Browser
- [ ] Application launches without errors
- [ ] URL bar accepts input and navigates
- [ ] Web pages render correctly (HTML, CSS, JS)
- [ ] Back/Forward navigation works
- [ ] Page refresh works

### Phase 2: Tab Management
- [ ] Can create new tabs
- [ ] Can close tabs
- [ ] Can switch between tabs
- [ ] Tab state persists (content preserved)

### Phase 3: Bookmarks & History
- [ ] Can add/remove bookmarks
- [ ] Bookmarks persist across sessions
- [ ] History is recorded
- [ ] Can search history

### Phase 4: Downloads & DevTools
- [ ] Can download files
- [ ] Download progress visible
- [ ] DevTools opens and functional
- [ ] Console shows JavaScript errors

### Phase 5: Extensions
- [ ] Can load Chrome extensions
- [ ] Extensions persist across sessions
- [ ] Basic extension APIs work

### Visual Checkpoints
1. Window matches macOS design language
2. Traffic lights render correctly
3. Dark/Light mode toggles properly
4. Animations are smooth (60fps)
5. Memory usage reasonable (<500MB for 10 tabs)
