import type { Tab as TabType } from '../types';
import { Tab } from './Tab';

interface TabBarProps {
  tabs: TabType[];
  activeTabId: string;
  onTabClick: (id: string) => void;
  onTabClose: (id: string) => void;
  onNewTab: () => void;
}

export function TabBar({ tabs, activeTabId, onTabClick, onTabClose, onNewTab }: TabBarProps) {
  return (
    <div className="flex items-center bg-[#f5f5f7] dark:bg-[#2d2d2d] border-b border-[#d2d2d7] dark:border-[#3d3d3d] overflow-x-auto">
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          tab={tab}
          isActive={tab.id === activeTabId}
          onClick={() => onTabClick(tab.id)}
          onClose={(e) => {
            e.stopPropagation();
            onTabClose(tab.id);
          }}
        />
      ))}
      <button
        onClick={onNewTab}
        className="flex items-center justify-center w-8 h-8 mx-1 rounded-md hover:bg-[#d1d1d6] dark:hover:bg-[#3a3a3c] transition-colors"
        aria-label="New tab"
      >
        <svg className="w-4 h-4 text-[#86868b] dark:text-[#98989d]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 3v10M3 8h10" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
