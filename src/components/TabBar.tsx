import type { Tab as TabType } from '../types';
import { Tab } from './Tab';
import { Plus } from 'lucide-react';

interface TabBarProps {
  tabs: TabType[];
  activeTabId: string | null;
  onTabClick: (id: string) => void;
  onTabClose: (id: string) => void;
  onNewTab: () => void;
}

export function TabBar({ tabs, activeTabId, onTabClick, onTabClose, onNewTab }: TabBarProps) {
  return (
    <div className="relative flex items-end h-[40px] bg-[var(--color-browser-surface)] overflow-x-auto no-scrollbar">
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-[var(--color-browser-border)]" />
      
      <div className="flex items-end gap-0 px-1 py-0 min-h-full">
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
      </div>
      
      <button
        onClick={onNewTab}
        className="flex items-center justify-center w-[32px] h-[32px] my-auto ml-1 rounded-[var(--radius-md)] text-[var(--color-browser-text-tertiary)] hover:bg-[var(--color-browser-bg)] hover:text-[var(--color-browser-text-secondary)] transition-all duration-[var(--transition-fast)]"
        aria-label="New tab"
      >
        <Plus className="w-4 h-4" strokeWidth={2} />
      </button>
    </div>
  );
}