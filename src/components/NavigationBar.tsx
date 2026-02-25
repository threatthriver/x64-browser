import { useState, useRef, useEffect } from 'react';

interface NavigationBarProps {
  url: string;
  isLoading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  onNavigate: (url: string) => void;
  onGoBack: () => void;
  onGoForward: () => void;
  onRefresh: () => void;
  onStop: () => void;
  onAddBookmark?: () => void;
}

export function NavigationBar({
  url,
  isLoading,
  canGoBack,
  canGoForward,
  onNavigate,
  onGoBack,
  onGoForward,
  onRefresh,
  onStop,
  onAddBookmark,
}: NavigationBarProps) {
  const [inputValue, setInputValue] = useState(url);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(url);
  }, [url]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let navigateUrl = inputValue.trim();
    if (!navigateUrl.startsWith('http://') && !navigateUrl.startsWith('https://')) {
      if (navigateUrl.includes('.') && !navigateUrl.includes(' ')) {
        navigateUrl = `https://${navigateUrl}`;
      } else {
        navigateUrl = `https://duckduckgo.com/?q=${encodeURIComponent(navigateUrl)}`;
      }
    }
    onNavigate(navigateUrl);
    inputRef.current?.blur();
  };

  const getDomain = (urlString: string) => {
    try {
      const url = new URL(urlString);
      return url.hostname;
    } catch {
      return urlString;
    }
  };

  const isSecure = url.startsWith('https://');

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-[#e8e8ed] dark:bg-[#3a3a3c] border-b border-[#d2d2d7] dark:border-[#3d3d3d]">
      <div className="flex items-center gap-1">
        <button
          onClick={onGoBack}
          disabled={!canGoBack}
          className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
            canGoBack ? 'hover:bg-[#d1d1d6] dark:hover:bg-[#4a4a4c]' : 'opacity-40 cursor-not-allowed'
          }`}
          aria-label="Go back"
        >
          <svg className="w-4 h-4 text-[#1d1d1f] dark:text-[#f5f5f7]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={onGoForward}
          disabled={!canGoForward}
          className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
            canGoForward ? 'hover:bg-[#d1d1d6] dark:hover:bg-[#4a4a4c]' : 'opacity-40 cursor-not-allowed'
          }`}
          aria-label="Go forward"
        >
          <svg className="w-4 h-4 text-[#1d1d1f] dark:text-[#f5f5f7]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={isLoading ? onStop : onRefresh}
          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#d1d1d6] dark:hover:bg-[#4a4a4c] transition-colors"
          aria-label={isLoading ? 'Stop' : 'Refresh'}
        >
          {isLoading ? (
            <svg className="w-4 h-4 text-[#1d1d1f] dark:text-[#f5f5f7]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 3v10h10" strokeLinecap="round" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-[#1d1d1f] dark:text-[#f5f5f7]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 8a6 6 0 0 1 11.17-2M14 8a6 6 0 0 1-11.17 2" strokeLinecap="round" />
              <path d="M14 2v4h-4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 14V10h4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex items-center">
        <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-[#1e1e1e] rounded-lg border border-[#d2d2d7] dark:border-[#3d3d3d] focus-within:border-[#007aff] focus-within:ring-1 focus-within:ring-[#007aff]">
          {isSecure && (
            <svg className="w-4 h-4 text-[#27c93f] flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1l6 3v4c0 3.5-2.5 6-6 7-3.5-1-6-3.5-6-7V4l6-3z" />
              <path d="M6 8l2 2 3-3" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <input
            ref={inputRef}
            type="text"
            value={isFocused ? inputValue : getDomain(inputValue)}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search or enter URL"
            className="flex-1 text-sm text-[#1d1d1f] dark:text-[#f5f5f7] bg-transparent outline-none placeholder-[#86868b]"
          />
        </div>
      </form>

      <div className="flex items-center gap-1">
        <button
          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#d1d1d6] dark:hover:bg-[#4a4a4c] transition-colors"
          aria-label="Menu"
        >
          <svg className="w-4 h-4 text-[#86868b]" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="8" cy="3" r="1.5" />
            <circle cx="8" cy="8" r="1.5" />
            <circle cx="8" cy="13" r="1.5" />
          </svg>
        </button>
        <button
          onClick={onAddBookmark}
          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#d1d1d6] dark:hover:bg-[#4a4a4c] transition-colors"
          aria-label="Add Bookmark"
        >
          <svg className="w-4 h-4 text-[#86868b]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 2h10v14l-5-3-5 3V2z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
