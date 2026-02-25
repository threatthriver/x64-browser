import { create } from 'zustand';

interface Settings {
  theme: 'light' | 'dark' | 'system';
  searchEngine: 'google' | 'duckduckgo' | 'bing';
  homepage: string;
  showBookmarksBar: boolean;
}

interface SettingsState {
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: {
    theme: 'system',
    searchEngine: 'google',
    homepage: 'about:blank',
    showBookmarksBar: true,
  },
  updateSettings: (updates) => {
    set((state) => ({
      settings: { ...state.settings, ...updates },
    }));
  },
}));
