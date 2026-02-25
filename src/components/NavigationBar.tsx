import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Lock, Star, MoreHorizontal, RefreshCcw, Loader2, Shield, Search } from 'lucide-react';

interface NavigationBarProps {
  url: string;
  isLoading: boolean;
  loadProgress?: number;
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
  loadProgress = 0,
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

  useEffect(() => {
    const handleFocusUrl = () => {
      inputRef.current?.focus();
    };
    window.addEventListener('focus-url', handleFocusUrl);
    return () => window.removeEventListener('focus-url', handleFocusUrl);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let searchUrl = inputValue.trim();
    
    if (!searchUrl.startsWith('http://') && !searchUrl.startsWith('https://') && !searchUrl.startsWith('about:')) {
      if (searchUrl.includes('.') && !searchUrl.includes(' ')) {
        searchUrl = 'https://' + searchUrl;
      } else {
        searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(searchUrl);
      }
    }
    
    onNavigate(searchUrl);
    inputRef.current?.blur();
  };

  const getDomain = (urlString: string) => {
    try {
      if (urlString.startsWith('about:')) return urlString;
      const urlObj = new URL(urlString);
      return urlObj.hostname + (urlObj.pathname !== '/' ? urlObj.pathname : '');
    } catch {
      return urlString;
    }
  };

  const isSecure = url.startsWith('https://');
  const isSearchEngine = url.includes('google.com/search') || url.includes('bing.com/search');

  return (
    <div className="relative flex items-center gap-1.5 px-2.5 py-1.5 bg-[var(--color-browser-bg)] border-b border-[var(--color-browser-border)]">
      <div className="flex items-center gap-1">
        <button
          onClick={onGoBack}
          disabled={!canGoBack}
          className={`
            w-[32px] h-[32px] flex items-center justify-center rounded-[var(--radius-md)]
            transition-all duration-[var(--transition-fast)] group
            ${canGoBack 
              ? 'hover:bg-[var(--color-browser-surface)] text-[var(--color-browser-text-secondary)] hover:text-[var(--color-browser-text)]' 
              : 'opacity-30 cursor-not-allowed text-[var(--color-browser-text-tertiary)]'
            }
          `}
          aria-label="Go back"
        >
          <ArrowLeft className="w-[17px] h-[17px] transition-transform group-hover:scale-105 group-active:scale-95" strokeWidth={2} />
        </button>
        <button
          onClick={onGoForward}
          disabled={!canGoForward}
          className={`
            w-[32px] h-[32px] flex items-center justify-center rounded-[var(--radius-md)]
            transition-all duration-[var(--transition-fast)] group
            ${canGoForward 
              ? 'hover:bg-[var(--color-browser-surface)] text-[var(--color-browser-text-secondary)] hover:text-[var(--color-browser-text)]' 
              : 'opacity-30 cursor-not-allowed text-[var(--color-browser-text-tertiary)]'
            }
          `}
          aria-label="Go forward"
        >
          <ArrowRight className="w-[17px] h-[17px] transition-transform group-hover:scale-105 group-active:scale-95" strokeWidth={2} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex items-center max-w-[680px] mx-auto">
        <div 
          className={`
            flex-1 flex items-center gap-2.5 px-3.5 py-2 rounded-[var(--radius-xl)] 
            bg-[var(--color-browser-surface)] 
            transition-all duration-[var(--transition-normal)]
            border border-transparent
            ${isFocused 
              ? 'bg-[var(--color-browser-bg)] border-[var(--color-browser-accent)] shadow-[var(--shadow-browser-glow)]' 
              : 'hover:bg-[var(--color-browser-surface-hover)]'
            }
          `}
        >
          {isLoading ? (
            <button
              type="button"
              onClick={onStop}
              className="flex items-center justify-center w-5 h-5 text-[var(--color-browser-text-secondary)] hover:text-[var(--color-browser-warning)] transition-colors"
              aria-label="Stop loading"
            >
              <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
            </button>
          ) : (
            <button
              type="button"
              onClick={onRefresh}
              className="flex items-center justify-center w-5 h-5 text-[var(--color-browser-text-secondary)] hover:text-[var(--color-browser-text)] transition-colors"
              aria-label="Refresh page"
            >
              <RefreshCcw className="w-4 h-4" strokeWidth={2} />
            </button>
          )}
          
          <div className="flex-1 flex items-center gap-2 min-w-0">
            {isSecure && !isSearchEngine && !isFocused && (
              <div className="flex items-center gap-1 text-[var(--color-browser-success)] flex-shrink-0">
                <Shield className="w-3.5 h-3.5" strokeWidth={2.5} />
              </div>
            )}
            {!isSecure && url && !url.startsWith('about:') && !isFocused && (
              <Lock className="w-3.5 h-3.5 text-[var(--color-browser-text-tertiary)] flex-shrink-0" strokeWidth={2.5} />
            )}
            
            <input
              ref={inputRef}
              type="text"
              value={isFocused ? inputValue : (isSearchEngine ? inputValue : getDomain(inputValue))}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search or enter URL"
              className="flex-1 text-[13px] text-[var(--color-browser-text)] bg-transparent outline-none placeholder-[var(--color-browser-text-tertiary)] min-w-0"
              spellCheck={false}
            />
          </div>
          
          <div className="flex items-center gap-0.5 flex-shrink-0">
            {url && !isFocused && (
              <button
                type="button"
                onClick={onAddBookmark}
                className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-browser-text-tertiary)] hover:text-[var(--color-browser-text-secondary)] hover:bg-[var(--color-browser-surface)] transition-all duration-[var(--transition-fast)]"
                aria-label="Add bookmark"
              >
                <Star className="w-4 h-4" strokeWidth={2} />
              </button>
            )}
            {!isFocused && (
              <button
                type="button"
                className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-browser-text-tertiary)] hover:text-[var(--color-browser-text-secondary)] hover:bg-[var(--color-browser-surface)] transition-all duration-[var(--transition-fast)]"
                aria-label="More options"
              >
                <MoreHorizontal className="w-4 h-4" strokeWidth={2} />
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="w-[32px] h-[32px]" />
      
      {isLoading && loadProgress > 0 && loadProgress < 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-browser-border)]">
          <div 
            className="h-full bg-[var(--color-browser-accent)] transition-all duration-150"
            style={{ width: `${loadProgress * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}