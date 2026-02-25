export interface Tab {
  id: string;
  title: string;
  url: string;
  favicon: string;
  isLoading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  folder?: string;
  createdAt: number;
}

export interface HistoryEntry {
  id: string;
  title: string;
  url: string;
  visitedAt: number;
}

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  homepage: string;
  searchEngine: string;
  showBookmarksBar: boolean;
}

export interface Download {
  id: string;
  url: string;
  filename: string;
  progress: number;
  status: 'pending' | 'downloading' | 'completed' | 'failed';
}
