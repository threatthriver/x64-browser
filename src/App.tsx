import { useEffect, useCallback } from 'react';
import { TitleBar } from './components/TitleBar';
import { TabBar } from './components/TabBar';
import { NavigationBar } from './components/NavigationBar';
import { BrowserView } from './components/BrowserView';
import { useTabStore } from './stores/useTabStore';
import { useSettingsStore } from './stores/useSettingsStore';
import { useBookmarkStore } from './stores/useBookmarkStore';
import { useHistoryStore } from './stores/useHistoryStore';
import './index.css';

function App() {
  const {
    tabs,
    activeTab,
    activeTabId,
    createTab,
    closeTab,
    updateTab,
    switchTab,
  } = useTabStore();

  const { settings } = useSettingsStore();
  const { addBookmark } = useBookmarkStore();
  const { addEntry } = useHistoryStore();

  const handleNavigate = useCallback(
    (url: string) => {
      let normalizedUrl = url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        if (url.includes('.') && !url.includes(' ')) {
          normalizedUrl = 'https://' + url;
        } else {
          normalizedUrl = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
        }
      }
      updateTab(activeTabId, { url: normalizedUrl, isLoading: true });
      addEntry(normalizedUrl, activeTab.title || 'New Tab');
    },
    [activeTabId, updateTab, addEntry, activeTab.title]
  );

  const handleGoBack = useCallback(() => {
    const webview = document.querySelector('webview') as any;
    if (webview?.goBack) {
      webview.goBack();
    }
  }, []);

  const handleGoForward = useCallback(() => {
    const webview = document.querySelector('webview') as any;
    if (webview?.goForward) {
      webview.goForward();
    }
  }, []);

  const handleRefresh = useCallback(() => {
    const webview = document.querySelector('webview') as any;
    if (webview?.reload) {
      webview.reload();
    }
    updateTab(activeTabId, { isLoading: true });
  }, [activeTabId, updateTab]);

  const handleStop = useCallback(() => {
    updateTab(activeTabId, { isLoading: false });
  }, [activeTabId, updateTab]);

  const handleLoadEnd = useCallback(() => {
    updateTab(activeTabId, { isLoading: false });
    
    const webview = document.querySelector('webview') as any;
    if (webview?.getTitle) {
      webview.getTitle().then((title: string) => {
        updateTab(activeTabId, { title });
      });
    }
  }, [activeTabId, updateTab]);

  const handleTitleChange = useCallback(
    (title: string) => {
      updateTab(activeTabId, { title });
    },
    [activeTabId, updateTab]
  );

  const handleUrlChange = useCallback(
    (url: string) => {
      updateTab(activeTabId, { url });
    },
    [activeTabId, updateTab]
  );

  const handleNavigationStateChange = useCallback(
    (canGoBack: boolean, canGoForward: boolean) => {
      updateTab(activeTabId, { canGoBack, canGoForward });
    },
    [activeTabId, updateTab]
  );

  const handleAddBookmark = useCallback(() => {
    if (activeTab.url && activeTab.title) {
      addBookmark({
        title: activeTab.title,
        url: activeTab.url,
      });
    }
  }, [activeTab, addBookmark]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case 't':
            e.preventDefault();
            createTab();
            break;
          case 'w':
            e.preventDefault();
            closeTab(activeTabId);
            break;
          case 'r':
            e.preventDefault();
            handleRefresh();
            break;
          case 'd':
            e.preventDefault();
            handleAddBookmark();
            break;
        }
      }
      
      if (e.key === 'Escape') {
        handleStop();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [createTab, closeTab, activeTabId, handleRefresh, handleStop, handleAddBookmark]);

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
    <div className="flex flex-col h-screen bg-white dark:bg-[#1e1e1e]">
      <TitleBar />
      <TabBar
        tabs={tabs}
        activeTabId={activeTabId}
        onTabClick={switchTab}
        onTabClose={closeTab}
        onNewTab={createTab}
      />
      <NavigationBar
        url={activeTab.url}
        isLoading={activeTab.isLoading}
        canGoBack={activeTab.canGoBack}
        canGoForward={activeTab.canGoForward}
        onNavigate={handleNavigate}
        onGoBack={handleGoBack}
        onGoForward={handleGoForward}
        onRefresh={handleRefresh}
        onStop={handleStop}
        onAddBookmark={handleAddBookmark}
      />
      {tabs.map((tab) => (
        <BrowserView
          key={tab.id}
          url={tab.url}
          isActive={tab.id === activeTabId}
          onLoadEnd={handleLoadEnd}
          onTitleChange={handleTitleChange}
          onUrlChange={handleUrlChange}
          onNavigationStateChange={handleNavigationStateChange}
        />
      ))}
    </div>
  );
}

export default App;
