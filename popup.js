document.addEventListener('DOMContentLoaded', function() {
  const f1BlockingCheckbox = document.getElementById('f1Blocking');
  const statusDiv = document.getElementById('status');

  // Load current configuration
  chrome.storage.sync.get(['f1Blocking'], function(result) {
    f1BlockingCheckbox.checked = result.f1Blocking !== false; // Default to true
  });

  // Save configuration when checkbox changes
  f1BlockingCheckbox.addEventListener('change', function() {
    const config = {
      f1Blocking: f1BlockingCheckbox.checked
    };

    chrome.storage.sync.set(config, function() {
      // Show success message
      statusDiv.textContent = f1BlockingCheckbox.checked ? 'F1 blocking enabled!' : 'F1 blocking disabled!';
      statusDiv.className = 'status success';
      statusDiv.style.display = 'block';

      // Hide status after 2 seconds
      setTimeout(function() {
        statusDiv.style.display = 'none';
      }, 2000);
    });
  });
});

