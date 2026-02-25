import { useState, useEffect } from 'react';
import { Search, Sparkles } from 'lucide-react';

export function NewTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    let url = searchQuery.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      if (url.includes('.') && !url.includes(' ')) {
        url = `https://${url}`;
      } else {
        url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
      }
    }
    window.location.href = url;
  };

  const quickLinks = [
    { name: 'Google', url: 'https://google.com', color: '#4285f4', letter: 'G' },
    { name: 'YouTube', url: 'https://youtube.com', color: '#ff0000', letter: 'Y' },
    { name: 'GitHub', url: 'https://github.com', color: '#333', letter: 'GH' },
    { name: 'Reddit', url: 'https://reddit.com', color: '#ff4500', letter: 'R' },
    { name: 'Twitter', url: 'https://twitter.com', color: '#1da1f2', letter: 'X' },
    { name: 'Wikipedia', url: 'https://wikipedia.org', color: '#fff', letter: 'W' },
    { name: 'Gmail', url: 'https://gmail.com', color: '#ea4335', letter: 'M' },
    { name: 'Drive', url: 'https://drive.google.com', color: '#1a73e8', letter: 'D' },
  ];

  const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="flex flex-col items-center justify-start min-h-screen gradient-mesh pt-[18vh] px-4">
      <div 
        className={`
          flex flex-col items-center gap-8 transition-all duration-700 ease-out
          ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        <div className="flex flex-col items-center gap-1">
          <div className="relative w-[56px] h-[56px] mb-2">
            <svg viewBox="0 0 56 56" className="w-full h-full">
              <defs>
                <linearGradient id="browserGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-browser-accent)" />
                  <stop offset="100%" stopColor="var(--color-browser-success)" />
                </linearGradient>
              </defs>
              <circle cx="28" cy="28" r="26" fill="url(#browserGradient)" opacity="0.15" />
              <circle cx="28" cy="28" r="20" fill="url(#browserGradient)" opacity="0.25" />
              <circle cx="28" cy="28" r="14" fill="url(#browserGradient)" />
              <path 
                d="M28 14v28M14 28h28" 
                stroke="rgba(255,255,255,0.3)" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div className="text-center mb-2">
          <div className="text-[64px] font-extralight tracking-[-0.02em] text-[var(--color-browser-text)] leading-none mb-1">
            {timeString}
          </div>
          <div className="text-[15px] text-[var(--color-browser-text-secondary)] font-normal">
            {dateString}
          </div>
        </div>

        <form onSubmit={handleSearch} className="w-full max-w-[520px]">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center z-10 pointer-events-none">
              <Search className="w-[18px] h-[18px] text-[var(--color-browser-text-tertiary)] group-focus-within:text-[var(--color-browser-accent)] transition-colors" strokeWidth={2} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search the web"
              className="w-full pl-12 pr-5 py-[14px] rounded-[var(--radius-xl)] bg-[var(--color-browser-surface)] text-[var(--color-browser-text)] text-[15px] shadow-[var(--shadow-browser-card)] outline-none placeholder-[var(--color-browser-text-tertiary)] transition-all duration-[var(--transition-normal)] focus:bg-[var(--color-browser-bg)] focus:shadow-[var(--shadow-browser-glow),var(--shadow-browser-card)] hover:bg-[var(--color-browser-surface-hover)]"
              autoFocus
            />
          </div>
        </form>

        <div className="flex items-center gap-2 mt-4">
          {quickLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.url}
              className={`
                flex flex-col items-center gap-2 p-2 rounded-[var(--radius-lg)]
                transition-all duration-[var(--transition-fast)]
                hover:bg-[var(--color-browser-surface)] group
              `}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div 
                className="w-[44px] h-[44px] rounded-[var(--radius-md)] flex items-center justify-center text-[13px] font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-transform duration-[var(--transition-fast)] group-hover:scale-105"
                style={{ 
                  backgroundColor: link.color,
                  color: link.color === '#fff' || link.color === '#333' ? 'var(--color-browser-text)' : 'white',
                }}
              >
                {link.letter}
              </div>
              <span className="text-[11px] text-[var(--color-browser-text-tertiary)] group-hover:text-[var(--color-browser-text-secondary)] transition-colors">
                {link.name}
              </span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-8 text-[12px] text-[var(--color-browser-text-tertiary)]">
          <Sparkles className="w-3.5 h-3.5" strokeWidth={2} />
          <span>Press</span>
          <kbd className="px-2 py-0.5 bg-[var(--color-browser-surface)] rounded-[var(--radius-sm)] text-[var(--color-browser-text-secondary)] font-mono text-[11px] border border-[var(--color-browser-border)]">
            ⌘T
          </kbd>
          <span>for a new tab</span>
        </div>
      </div>
    </div>
  );
}