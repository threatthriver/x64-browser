import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface HistoryEntry {
  id: string;
  title: string;
  url: string;
  visitedAt: number;
}

interface HistoryStore {
  history: HistoryEntry[];
  addEntry: (url: string, title: string) => void;
  removeEntry: (id: string) => void;
  clearHistory: () => void;
  searchHistory: (query: string) => HistoryEntry[];
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set, get) => ({
      history: [],
      addEntry: (url: string, title: string) => {
        const newEntry: HistoryEntry = {
          id: Date.now().toString(),
          title,
          url,
          visitedAt: Date.now(),
        };
        set((state: { history: HistoryEntry[] }) => ({
          history: [newEntry, ...state.history].slice(0, 1000),
        }));
      },
      removeEntry: (id: string) => {
        set((state: { history: HistoryEntry[] }) => ({
          history: state.history.filter((h: HistoryEntry) => h.id !== id),
        }));
      },
      clearHistory: () => {
        set({ history: [] });
      },
      searchHistory: (query: string) => {
        const lowerQuery = query.toLowerCase();
        return get().history.filter(
          (h: HistoryEntry) =>
            h.url.toLowerCase().includes(lowerQuery) ||
            h.title.toLowerCase().includes(lowerQuery)
        );
      },
    }),
    {
      name: 'x64-browser-history',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
