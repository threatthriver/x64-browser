import { invoke } from '@tauri-apps/api/core';
import { getCurrentWindow } from '@tauri-apps/api/window';

interface TitleBarProps {
  title?: string;
}

export function TitleBar({ title = 'X64 Browser' }: TitleBarProps) {
  const appWindow = getCurrentWindow();

  const handleMinimize = async () => {
    await invoke('minimize_window');
  };

  const handleMaximize = async () => {
    await invoke('maximize_window');
  };

  const handleClose = async () => {
    await invoke('close_window');
  };

  const handleDragStart = async () => {
    await appWindow.startDragging();
  };

  return (
    <div
      className="h-7 bg-[#f5f5f7] dark:bg-[#2d2d2d] flex items-center justify-between px-3 select-none border-b border-[#d2d2d7] dark:border-[#3d3d3d]"
      onMouseDown={handleDragStart}
    >
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5" onMouseDown={(e) => e.stopPropagation()}>
          <button
            onClick={handleClose}
            className="w-3 h-3 rounded-full bg-[#ff5f56] hover:opacity-80 transition-opacity flex items-center justify-center"
            aria-label="Close"
          >
            <svg className="w-2 h-2 text-[#4d0000] opacity-0 hover:opacity-100" viewBox="0 0 10 10" fill="currentColor">
              <path d="M1 1L9 9M9 1L1 9" stroke="#4d0000" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
          </button>
          <button
            onClick={handleMinimize}
            className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:opacity-80 transition-opacity flex items-center justify-center"
            aria-label="Minimize"
          >
            <svg className="w-2 h-1 opacity-0 hover:opacity-100" viewBox="0 0 10 3" fill="#995700">
              <rect width="8" height="1.5" x="1" y="1" fill="#995700" />
            </svg>
          </button>
          <button
            onClick={handleMaximize}
            className="w-3 h-3 rounded-full bg-[#27c93f] hover:opacity-80 transition-opacity flex items-center justify-center"
            aria-label="Maximize"
          >
            <svg className="w-2 h-2 opacity-0 hover:opacity-100" viewBox="0 0 10 10" fill="none" stroke="#006500" strokeWidth="1.2">
              <rect x="1.5" y="1.5" width="7" height="7" />
            </svg>
          </button>
        </div>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 text-xs text-[#86868b] dark:text-[#98989d] font-medium">
        {title}
      </div>
      <div className="w-14" />
    </div>
  );
}
