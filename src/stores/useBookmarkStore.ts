import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Bookmark {
  id: string;
  title: string;
  url: string;
  folder?: string;
  createdAt: number;
}

interface BookmarkStore {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  removeBookmark: (id: string) => void;
  getBookmarks: () => Bookmark[];
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      addBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => {
        const newBookmark: Bookmark = {
          ...bookmark,
          id: Date.now().toString(),
          createdAt: Date.now(),
        };
        set((state: { bookmarks: Bookmark[] }) => ({
          bookmarks: [...state.bookmarks, newBookmark],
        }));
      },
      removeBookmark: (id: string) => {
        set((state: { bookmarks: Bookmark[] }) => ({
          bookmarks: state.bookmarks.filter((b: Bookmark) => b.id !== id),
        }));
      },
      getBookmarks: () => get().bookmarks,
    }),
    {
      name: 'x64-browser-bookmarks',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
