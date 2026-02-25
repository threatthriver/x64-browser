import { Minus, Square, X, Copy, Chrome } from 'lucide-react';
import { useState, useEffect } from 'react';

const { ipcRenderer } = window.require('electron');

export function TitleBar({ title = 'X64 Browser' }: { title?: string }) {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const checkMaximized = async () => {
      const maximized = await ipcRenderer.invoke('is-maximized');
      setIsMaximized(maximized);
    };
    checkMaximized();
    
    const handleMaximizeChange = () => {
      checkMaximized();
    };
    ipcRenderer.on('window-maximized', handleMaximizeChange);
    ipcRenderer.on('window-unmaximized', handleMaximizeChange);
    
    return () => {
      ipcRenderer.removeListener('window-maximized', handleMaximizeChange);
      ipcRenderer.removeListener('window-unmaximized', handleMaximizeChange);
    };
  }, []);

  const handleMinimize = () => {
    ipcRenderer.send('minimize-window');
  };

  const handleMaximize = () => {
    ipcRenderer.send('maximize-window');
    setIsMaximized(!isMaximized);
  };

  const handleClose = () => {
    ipcRenderer.send('close-window');
  };

  return (
    <div
      className="h-[40px] bg-[var(--color-browser-bg)] flex items-center justify-between px-3 select-none border-b border-[var(--color-browser-border)]"
      style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
    >
      <div 
        className="flex items-center gap-2" 
        onMouseDown={(e) => e.stopPropagation()}
        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
      >
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleClose}
            className="w-[14px] h-[14px] rounded-full bg-[#ff5f57] hover:bg-[#ff3b30] transition-colors flex items-center justify-center group"
            aria-label="Close"
          >
            <X className="w-[8px] h-[8px] text-[#4d0000] opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
          </button>
          <button
            onClick={handleMinimize}
            className="w-[14px] h-[14px] rounded-full bg-[#febd2e] hover:bg-[#ffa500] transition-colors flex items-center justify-center group"
            aria-label="Minimize"
          >
            <Minus className="w-[8px] h-[8px] text-[#995700] opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
          </button>
          <button
            onClick={handleMaximize}
            className="w-[14px] h-[14px] rounded-full bg-[#27c93f] hover:bg-[#1db954] transition-colors flex items-center justify-center group"
            aria-label="Maximize"
          >
            {isMaximized ? (
              <Copy className="w-[7px] h-[7px] text-[#006500] opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
            ) : (
              <Square className="w-[7px] h-[7px] text-[#006500] opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
            )}
          </button>
        </div>
      </div>
      
      <div 
        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5"
        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
      >
        <Chrome className="w-3.5 h-3.5 text-[var(--color-browser-text-tertiary)]" strokeWidth={2} />
        <span className="text-[11px] text-[var(--color-browser-text-tertiary)] font-medium tracking-tight">
          {title}
        </span>
      </div>
      
      <div className="w-[60px]" />
    </div>
  );
}