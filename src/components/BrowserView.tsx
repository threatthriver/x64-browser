import { useEffect, useState } from 'react';

interface BrowserViewProps {
  url: string;
  isActive: boolean;
  onLoadEnd?: () => void;
  onTitleChange?: (title: string) => void;
}

export function BrowserView({
  url,
  isActive,
  onLoadEnd,
}: BrowserViewProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isActive && url && url !== 'about:blank') {
      setLoading(true);
      
      // Simulate loading for now
      const timer = setTimeout(() => {
        setLoading(false);
        onLoadEnd?.();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [url, isActive, onLoadEnd]);

  if (!isActive) {
    return null;
  }

  const showEmptyState = !url || url === '' || url === 'about:blank';

  return (
    <div className="flex-1 bg-white dark:bg-[#1e1e1e] relative overflow-hidden">
      {loading && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 z-10">
          <div className="h-full bg-blue-500 animate-pulse w-1/3" />
        </div>
      )}
      
      {!showEmptyState ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center">
            <div className="text-6xl mb-4">🔄</div>
            <p className="text-gray-600 dark:text-gray-400">Loading {url}...</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              (Native webview content appears here)
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-[#1e1e1e]">
          <div className="text-center">
            <div className="text-7xl mb-6">🌐</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
              Welcome to X64 Browser
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">
              Fast, Secure, and Privacy-Focused
            </p>
            <div className="flex gap-4 justify-center text-sm text-gray-400 dark:text-gray-500">
              <span>⌘ + T — New Tab</span>
              <span>⌘ + L — Focus URL</span>
              <span>⌘ + D — Bookmark</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
