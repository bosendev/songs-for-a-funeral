// src/js/utils/logger.js
// Debug logging utility

import { config } from '../config.js';

export const logger = {
  log: (...args) => {
    if (config.debug) {
      console.log('[App]', ...args);
    }
  },
  error: (...args) => {
    if (config.debug) {
      console.error('[App Error]', ...args);
    }
  },
  warn: (...args) => {
    if (config.debug) {
      console.warn('[App Warning]', ...args);
    }
  }
};
