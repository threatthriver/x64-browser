import { useEffect, useState } from 'react';

interface BrowserViewProps {
  url: string;
  isActive: boolean;
  onLoadEnd?: () => void;
  onTitleChange?: (title: string) => void;
  onUrlChange?: (url: string) => void;
  onNavigationStateChange?: (canGoBack: boolean, canGoForward: boolean) => void;
}

export function BrowserView({
  url,
  isActive,
}: BrowserViewProps) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (isActive && url) {
      setKey(k => k + 1);
    }
  }, [isActive, url]);

  if (!isActive) {
    return null;
  }

  const showEmptyState = !url || url === '' || url === 'about:blank';

  return (
    <div className="flex-1 bg-white dark:bg-[#1e1e1e] relative">
      {!showEmptyState ? (
        <webview
          key={key}
          src={url}
          className="w-full h-full border-none"
        />
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-[#1e1e1e]">
          <div className="text-center">
            <div className="text-6xl mb-4">🌐</div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              X64 Browser
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Enter a URL to start browsing
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
