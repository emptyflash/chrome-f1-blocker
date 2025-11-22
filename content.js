// Content script to intercept and prevent F1 key events
(function() {
  'use strict';

  // Flag to track if F1 blocking is enabled
  let f1BlockingEnabled = true;

  // Function to handle keydown events
  function handleKeyDown(event) {
    // Check if F1 key is pressed (keyCode 112 or key 'F1')
    if ((event.keyCode === 112 || event.key === 'F1') && f1BlockingEnabled) {
      // Prevent the default F1 behavior (opening help tab)
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      console.log('F1 key blocked by Chrome Extension');

      // Get the configured action from storage
      chrome.storage.sync.get(['f1Action', 'f1Message'], (result) => {
        const action = result.f1Action || 'alert';
        const message = result.f1Message || 'F1 key pressed!';

        // Execute the configured action
        switch (action) {
          case 'alert':
            // Show alert (works in content script context)
            alert(message);
            break;
          case 'console':
            // Log to console
            console.log('F1 Action:', message);
            break;
          case 'newTab':
            // Open a new tab with the message
            window.open(`data:text/html,<h1>${encodeURIComponent(message)}</h1>`, '_blank');
            break;
          default:
            console.log('Unknown F1 action:', action);
        }
      });

      return false;
    }
  }

  // Add event listeners to capture F1 key
  document.addEventListener('keydown', handleKeyDown, true); // Use capture phase
  window.addEventListener('keydown', handleKeyDown, true); // Use capture phase

  // Listen for messages from popup to enable/disable F1 blocking
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleF1Blocking') {
      f1BlockingEnabled = request.enabled;
      sendResponse({success: true});
    }
  });

  console.log('F1 blocking content script loaded');
})();

