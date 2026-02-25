import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Download {
  id: string;
  url: string;
  filename: string;
  progress: number;
  status: 'pending' | 'downloading' | 'completed' | 'failed';
  path?: string;
  error?: string;
}

interface DownloadStore {
  downloads: Download[];
  addDownload: (url: string, filename: string) => void;
  updateProgress: (id: string, progress: number) => void;
  completeDownload: (id: string, path: string) => void;
  failDownload: (id: string, error: string) => void;
  removeDownload: (id: string) => void;
  clearCompleted: () => void;
}

export const useDownloadStore = create<DownloadStore>()(
  persist(
    (set) => ({
      downloads: [],
      addDownload: (url: string, filename: string) => {
        const newDownload: Download = {
          id: Date.now().toString(),
          url,
          filename,
          progress: 0,
          status: 'pending',
        };
        set((state: { downloads: Download[] }) => ({
          downloads: [...state.downloads, newDownload],
        }));
      },
      updateProgress: (id: string, progress: number) => {
        set((state: { downloads: Download[] }) => ({
          downloads: state.downloads.map((d: Download) =>
            d.id === id ? { ...d, progress, status: 'downloading' } : d
          ),
        }));
      },
      completeDownload: (id: string, path: string) => {
        set((state: { downloads: Download[] }) => ({
          downloads: state.downloads.map((d: Download) =>
            d.id === id ? { ...d, progress: 100, status: 'completed', path } : d
          ),
        }));
      },
      failDownload: (id: string, error: string) => {
        set((state: { downloads: Download[] }) => ({
          downloads: state.downloads.map((d: Download) =>
            d.id === id ? { ...d, status: 'failed', error } : d
          ),
        }));
      },
      removeDownload: (id: string) => {
        set((state: { downloads: Download[] }) => ({
          downloads: state.downloads.filter((d: Download) => d.id !== id),
        }));
      },
      clearCompleted: () => {
        set((state: { downloads: Download[] }) => ({
          downloads: state.downloads.filter((d: Download) => d.status !== 'completed'),
        }));
      },
    }),
    {
      name: 'x64-browser-downloads',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        downloads: state.downloads.filter((d: Download) => d.status !== 'completed'),
      }),
    }
  )
);
