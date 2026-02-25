import type { Tab as TabType } from '../types';

interface TabProps {
  tab: TabType;
  isActive: boolean;
  onClick: () => void;
  onClose: (e: React.MouseEvent) => void;
}

export function Tab({ tab, isActive, onClick, onClose }: TabProps) {
  return (
    <div
      onClick={onClick}
      className={`
        group flex items-center gap-1.5 px-3 py-1.5 min-w-[100px] max-w-[200px] cursor-pointer
        transition-colors duration-150 select-none
        ${
          isActive
            ? 'bg-white dark:bg-[#424245] border-t-2 border-t-[#007aff]'
            : 'bg-[#d1d1d6] dark:bg-[#2c2c2e] hover:bg-[#e8e8ed] dark:hover:bg-[#3a3a3c]'
        }
      `}
    >
      {tab.favicon ? (
        <img src={tab.favicon} alt="" className="w-4 h-4 rounded-sm flex-shrink-0" />
      ) : (
        <div className="w-4 h-4 flex-shrink-0" />
      )}
      <span className="text-xs text-[#1d1d1f] dark:text-[#f5f5f7] truncate flex-1">
        {tab.title || 'New Tab'}
      </span>
      <button
        onClick={onClose}
        className={`
          w-4 h-4 flex items-center justify-center rounded-sm
          opacity-0 group-hover:opacity-100 hover:bg-[#d1d1d6] dark:hover:bg-[#4a4a4c]
          transition-opacity
        `}
        aria-label="Close tab"
      >
        <svg className="w-3 h-3 text-[#86868b]" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 2L8 8M8 2L2 8" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
