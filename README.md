# F1 Blocker Chrome Extension

A Chrome extension that blocks the F1 key from opening the Chrome help tab.

## Installation

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" and select this folder
4. The extension will appear in your toolbar

## Features

- **Blocks F1 Help Tab** - Prevents F1 from opening the Chrome help page
- **Toggle Blocking** - Enable/disable F1 blocking as needed

## How It Works

The extension monitors tab navigation and detects when a Chrome help page is about to open. When F1 is pressed:
1. The extension detects the attempt to open `https://support.google.com/chrome`
2. The help tab is prevented from opening
3. Your configured action is executed instead
4. F1 blocking can be toggled on/off in the extension popup

## Files

- `manifest.json` - Extension configuration with webNavigation permission
- `background.js` - Service worker that monitors and blocks help tabs
- `popup.html` - Configuration interface
- `popup.js` - Configuration management and storage

