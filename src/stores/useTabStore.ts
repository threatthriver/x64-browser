import { create } from 'zustand';

export interface Tab {
  id: string;
  url: string;
  title: string;
  favicon?: string | null;
  loading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  loadProgress: number;
  error?: { code: number; description: string } | null;
}

interface TabState {
  tabs: Tab[];
  activeTabId: string | null;
  addTab: (tab: Partial<Tab>) => void;
  removeTab: (id: string) => void;
  updateTab: (id: string, updates: Partial<Tab>) => void;
  switchTab: (id: string) => void;
}

export const useTabStore = create<TabState>((set, get) => ({
  tabs: [],
  activeTabId: null,
  
  addTab: (tabData) => {
    const newTab: Tab = {
      id: tabData.id || `tab-${Date.now()}`,
      url: tabData.url || 'about:blank',
      title: tabData.title || 'New Tab',
      favicon: tabData.favicon || null,
      loading: tabData.loading || false,
      canGoBack: false,
      canGoForward: false,
      loadProgress: 0,
      error: null,
      ...tabData,
    };
    
    set((state) => ({
      tabs: [...state.tabs, newTab],
      activeTabId: newTab.id,
    }));
  },
  
  removeTab: (id) => {
    set((state) => {
      const newTabs = state.tabs.filter((tab) => tab.id !== id);
      let newActiveTabId = state.activeTabId;
      
      if (state.activeTabId === id) {
        const removedIndex = state.tabs.findIndex((tab) => tab.id === id);
        if (newTabs.length > 0) {
          const newIndex = Math.min(removedIndex, newTabs.length - 1);
          newActiveTabId = newTabs[newIndex].id;
        } else {
          newActiveTabId = null;
        }
      }
      
      return {
        tabs: newTabs,
        activeTabId: newActiveTabId,
      };
    });
  },
  
  updateTab: (id, updates) => {
    set((state) => ({
      tabs: state.tabs.map((tab) =>
        tab.id === id ? { ...tab, ...updates } : tab
      ),
    }));
  },
  
  switchTab: (id) => {
    set({ activeTabId: id });
  },
}));
