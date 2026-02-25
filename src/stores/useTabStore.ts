import { useState, useCallback } from 'react';
import { Tab } from '../types';

const generateId = () => Math.random().toString(36).substring(2, 9);

const DEFAULT_HOMEPAGE = 'https://duckduckgo.com';

export function useTabStore() {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: generateId(),
      title: 'New Tab',
      url: DEFAULT_HOMEPAGE,
      favicon: '',
      isLoading: false,
      canGoBack: false,
      canGoForward: false,
    },
  ]);
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0].id);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const createTab = useCallback((url: string = DEFAULT_HOMEPAGE) => {
    const newTab: Tab = {
      id: generateId(),
      title: 'New Tab',
      url,
      favicon: '',
      isLoading: false,
      canGoBack: false,
      canGoForward: false,
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newTab.id);
    return newTab.id;
  }, []);

  const closeTab = useCallback(
    (id: string) => {
      if (tabs.length === 1) return;
      const index = tabs.findIndex((t) => t.id === id);
      const newTabs = tabs.filter((t) => t.id !== id);
      setTabs(newTabs);
      if (activeTabId === id) {
        const newIndex = Math.min(index, newTabs.length - 1);
        setActiveTabId(newTabs[newIndex].id);
      }
    },
    [tabs, activeTabId]
  );

  const updateTab = useCallback((id: string, updates: Partial<Tab>) => {
    setTabs((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, []);

  const switchTab = useCallback((id: string) => {
    setActiveTabId(id);
  }, []);

  return {
    tabs,
    activeTab,
    activeTabId,
    createTab,
    closeTab,
    updateTab,
    switchTab,
  };
}
