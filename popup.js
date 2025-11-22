document.addEventListener('DOMContentLoaded', function() {
  const actionType = document.getElementById('actionType');
  const actionMessage = document.getElementById('actionMessage');
  const saveButton = document.getElementById('saveConfig');
  const statusDiv = document.getElementById('status');
  const f1BlockingCheckbox = document.getElementById('f1Blocking');

  // Load current configuration
  chrome.storage.sync.get(['f1Action', 'f1Message', 'f1Blocking'], function(result) {
    actionType.value = result.f1Action || 'alert';
    actionMessage.value = result.f1Message || 'F1 key pressed!';
    f1BlockingCheckbox.checked = result.f1Blocking !== false; // Default to true
  });

  // Save configuration
  saveButton.addEventListener('click', function() {
    const config = {
      f1Action: actionType.value,
      f1Message: actionMessage.value || 'F1 key pressed!',
      f1Blocking: f1BlockingCheckbox.checked
    };

    chrome.storage.sync.set(config, function() {
      // Send message to all tabs to update F1 blocking
      chrome.tabs.query({}, function(tabs) {
        tabs.forEach(function(tab) {
          chrome.tabs.sendMessage(tab.id, {
            action: 'toggleF1Blocking',
            enabled: f1BlockingCheckbox.checked
          });
        });
      });

      // Show success message
      statusDiv.textContent = 'Configuration saved!';
      statusDiv.className = 'status success';
      statusDiv.style.display = 'block';

      // Hide status after 2 seconds
      setTimeout(function() {
        statusDiv.style.display = 'none';
      }, 2000);
    });
  });
});

