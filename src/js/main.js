// src/js/main.js
// Main JavaScript entry point

// Import styles
import '../css/main.scss';

// Import modules
import { config } from './config.js';
import { logger } from './utils/logger.js';
import { initMenuToggle } from './modules/menuToggle.js';

// Initialize app
// Initialize app
function init() {
  logger.log('App initializing...', config);

  initMenuToggle();

  logger.log('App ready!');

  // Fade in page when everything is loaded
  document.body.classList.add('loaded');
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
