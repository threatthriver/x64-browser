import type { Tab as TabType } from '../types';
import { X, Globe } from 'lucide-react';

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
        group relative flex items-center gap-2 h-[36px] min-w-[80px] max-w-[220px] cursor-pointer
        transition-all duration-[var(--transition-fast)] select-none
        ${isActive 
          ? 'bg-[var(--color-browser-bg)] z-10' 
          : 'bg-[var(--color-browser-surface)] hover:bg-[var(--color-browser-surface-hover)]'
        }
      `}
      style={{
        borderRadius: isActive ? 'var(--radius-lg) var(--radius-lg) 0 0' : 'var(--radius-md)',
        marginLeft: isActive ? '4px' : '2px',
        marginRight: isActive ? '4px' : '2px',
        marginBottom: isActive ? '0' : '4px',
      }}
    >
      {isActive && (
        <>
          <div 
            className="absolute -left-[6px] bottom-0 w-[10px] h-[10px]"
            style={{
              background: 'radial-gradient(circle at 0 0, transparent 8px, var(--color-browser-bg) 8px)',
            }}
          />
          <div 
            className="absolute -right-[6px] bottom-0 w-[10px] h-[10px]"
            style={{
              background: 'radial-gradient(circle at 100% 0, transparent 8px, var(--color-browser-bg) 8px)',
            }}
          />
        </>
      )}
      
      <div className="flex items-center gap-2 flex-1 min-w-0 px-3">
        {tab.favicon ? (
          <img 
            src={tab.favicon} 
            alt="" 
            className="w-[15px] h-[15px] flex-shrink-0 rounded-[3px] object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-[15px] h-[15px] flex-shrink-0 flex items-center justify-center">
            <Globe className="w-[13px] h-[13px] text-[var(--color-browser-text-tertiary)]" strokeWidth={2} />
          </div>
        )}
        
        <span className={`
          text-[12px] truncate flex-1 min-w-0
          transition-colors duration-[var(--transition-fast)]
          ${isActive 
            ? 'text-[var(--color-browser-text)] font-medium' 
            : 'text-[var(--color-browser-text-secondary)] group-hover:text-[var(--color-browser-text)]'
          }
        `}>
          {tab.title || 'New Tab'}
        </span>
        
        <button
          onClick={onClose}
          className={`
            w-[20px] h-[20px] flex items-center justify-center rounded-[var(--radius-sm)]
            transition-all duration-[var(--transition-fast)] flex-shrink-0
            ${isActive 
              ? 'opacity-60 hover:opacity-100 hover:bg-[var(--color-browser-surface)]' 
              : 'opacity-0 group-hover:opacity-100 hover:bg-[var(--color-browser-bg)]'
            }
          `}
          aria-label="Close tab"
        >
          <X className="w-[14px] h-[14px] text-[var(--color-browser-text-secondary)] hover:text-[var(--color-browser-text)]" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}