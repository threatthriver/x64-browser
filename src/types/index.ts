export interface Tab {
  id: string;
  url: string;
  title: string;
  favicon?: string;
  loading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  createdAt: string;
}

export interface HistoryEntry {
  id: string;
  url: string;
  title: string;
  timestamp: number;
}

export interface Download {
  id: string;
  url: string;
  filename: string;
  progress: number;
  status: 'pending' | 'downloading' | 'paused' | 'completed' | 'failed';
  receivedBytes: number;
  totalBytes: number;
  savePath?: string;
}

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  searchEngine: 'google' | 'duckduckgo' | 'bing';
  homepage: string;
  showBookmarksBar: boolean;
}
