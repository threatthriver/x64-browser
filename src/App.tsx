import { useEffect, useCallback, useState } from 'react';
import { TitleBar } from './components/TitleBar';
import { TabBar } from './components/TabBar';
import { NavigationBar } from './components/NavigationBar';
import { NewTab } from './components/NewTab';
import { useTabStore, type Tab } from './stores/useTabStore';
import { useSettingsStore } from './stores/useSettingsStore';
import './index.css';

const { ipcRenderer } = window.require('electron');

function App() {
  const { tabs, activeTabId, addTab, removeTab, updateTab } = useTabStore();
  const { settings } = useSettingsStore();
  const [activeTab, setActiveTab] = useState<Tab | null>(null);
  const [isNewTab, setIsNewTab] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsNewTab(params.get('newtab') === 'true');
  }, []);

  if (isNewTab) {
    return <NewTab />;
  }

  useEffect(() => {
    if (activeTabId) {
      const tab = tabs.find(t => t.id === activeTabId);
      setActiveTab(tab || null);
      setLoadProgress(tab?.loadProgress || 0);
    } else {
      setActiveTab(null);
      setLoadProgress(0);
    }
  }, [activeTabId, tabs]);

  useEffect(() => {
    const handleTabCreated = (_event: unknown, { tabId, title, url }: { tabId: string; title: string; url: string }) => {
      addTab({ id: tabId, title, url, loading: false });
    };

    const handleTabClosed = (_event: unknown, { tabId }: { tabId: string }) => {
      removeTab(tabId);
    };

    const handleTabLoading = (_event: unknown, { tabId, loading }: { tabId: string; loading: boolean }) => {
      updateTab(tabId, { loading });
    };

    const handleTabTitle = (_event: unknown, { tabId, title }: { tabId: string; title: string }) => {
      updateTab(tabId, { title });
    };

    const handleTabNavigate = (_event: unknown, { tabId, url, title, favicon }: { tabId: string; url: string; title: string; favicon?: string }) => {
      updateTab(tabId, { url, title, favicon });
    };

    const handleTabProgress = (_event: unknown, { tabId, progress }: { tabId: string; progress: number }) => {
      if (tabId === activeTabId) {
        setLoadProgress(progress);
      }
      updateTab(tabId, { loadProgress: progress });
    };

    const handleTabError = (_event: unknown, { tabId, error }: { tabId: string; error: string }) => {
      updateTab(tabId, { error: { code: -1, description: error }, loading: false });
    };

    ipcRenderer.on('tab-created', handleTabCreated);
    ipcRenderer.on('tab-closed', handleTabClosed);
    ipcRenderer.on('tab-loading', handleTabLoading);
    ipcRenderer.on('tab-title', handleTabTitle);
    ipcRenderer.on('tab-navigate', handleTabNavigate);
    ipcRenderer.on('tab-progress', handleTabProgress);
    ipcRenderer.on('tab-error', handleTabError);

    return () => {
      ipcRenderer.removeListener('tab-created', handleTabCreated);
      ipcRenderer.removeListener('tab-closed', handleTabClosed);
      ipcRenderer.removeListener('tab-loading', handleTabLoading);
      ipcRenderer.removeListener('tab-title', handleTabTitle);
      ipcRenderer.removeListener('tab-navigate', handleTabNavigate);
      ipcRenderer.removeListener('tab-progress', handleTabProgress);
      ipcRenderer.removeListener('tab-error', handleTabError);
    };
  }, [addTab, removeTab, updateTab, activeTabId]);

  const handleNavigate = useCallback((url: string) => {
    if (activeTabId) {
      ipcRenderer.send('navigate', activeTabId, url);
      updateTab(activeTabId, { url, loading: true });
    }
  }, [activeTabId, updateTab]);

  const handleGoBack = useCallback(() => {
    if (activeTabId) {
      ipcRenderer.send('go-back', activeTabId);
    }
  }, [activeTabId]);

  const handleGoForward = useCallback(() => {
    if (activeTabId) {
      ipcRenderer.send('go-forward', activeTabId);
    }
  }, [activeTabId]);

  const handleRefresh = useCallback(() => {
    if (activeTabId) {
      ipcRenderer.send('refresh', activeTabId);
    }
  }, [activeTabId]);

  const handleStop = useCallback(() => {
    if (activeTabId) {
      ipcRenderer.send('stop', activeTabId);
      updateTab(activeTabId, { loading: false });
    }
  }, [activeTabId, updateTab]);

  const handleCreateTab = useCallback(() => {
    ipcRenderer.send('create-tab', 'about:blank');
  }, []);

  const handleCloseTab = useCallback((tabId: string) => {
    ipcRenderer.send('close-tab', tabId);
  }, []);

  const handleTabClick = useCallback((tabId: string) => {
    ipcRenderer.send('switch-tab', tabId);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case 't':
            e.preventDefault();
            handleCreateTab();
            break;
          case 'w':
            e.preventDefault();
            if (activeTabId) handleCloseTab(activeTabId);
            break;
          case 'r':
            e.preventDefault();
            handleRefresh();
            break;
          case 'l':
            e.preventDefault();
            break;
          case 'd':
            e.preventDefault();
            break;
        }
      }

      if (e.key === 'Escape') {
        handleStop();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleCreateTab, handleCloseTab, handleRefresh, handleStop, activeTabId]);

  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else if (settings.theme === 'light') {
      root.classList.remove('dark');
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [settings.theme]);

  return (
    <div className="flex flex-col h-screen bg-[var(--color-browser-bg)] overflow-hidden">
      <TitleBar />
      <TabBar
        tabs={tabs}
        activeTabId={activeTabId}
        onTabClick={handleTabClick}
        onTabClose={handleCloseTab}
        onNewTab={handleCreateTab}
      />
      <NavigationBar
        url={activeTab?.url || ''}
        isLoading={activeTab?.loading || false}
        loadProgress={loadProgress}
        canGoBack={activeTab?.canGoBack || false}
        canGoForward={activeTab?.canGoForward || false}
        onNavigate={handleNavigate}
        onGoBack={handleGoBack}
        onGoForward={handleGoForward}
        onRefresh={handleRefresh}
        onStop={handleStop}
      />
      <div className="flex-1 bg-white dark:bg-[var(--color-browser-bg)]" />
    </div>
  );
}

export default App;
