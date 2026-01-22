// Main JavaScript entry point
// This file is processed by Vite

// Import your styles
import '../css/main.scss';

// Your JavaScript here
console.log('Vite + Craft CMS ready!');

// Example: Simple module
function init() {
  console.log('Site initialized');
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
