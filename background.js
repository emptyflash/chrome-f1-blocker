// Background service worker for handling tab blocking
chrome.runtime.onInstalled.addListener(() => {
  // Set default action when extension is installed
  chrome.storage.sync.set({
    f1Blocking: true
  });
});

// Listen for tab navigation to block Chrome help pages
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  // Check if this is a Chrome help page being opened
  if (details.url.includes('https://support.google.com/chrome')) {
    // Get blocking configuration
    chrome.storage.sync.get(['f1Blocking'], (result) => {
      const blockingEnabled = result.f1Blocking !== false; // Default to true

      if (blockingEnabled) {
        // Cancel the navigation to prevent the help tab from opening
        chrome.tabs.remove(details.tabId);
      }
    });

    return { cancel: true };
  }
}, { url: [{ urlMatches: 'https://support.google.com/chrome*' }] });


