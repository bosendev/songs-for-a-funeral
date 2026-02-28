// src/js/modules/menuToggle.js
// Menu toggle functionality for site header navigation

import { config } from '../config.js';
import { logger } from '../utils/logger.js';

export function initMenuToggle() {
  const menuBtn = document.querySelector('.menu-btn');
  const header = document.querySelector('.site-header');

  if (!menuBtn || !header) {
    logger.warn('Menu elements not found');
    return;
  }

  menuBtn.addEventListener('click', () => {
    const isActive = header.classList.toggle('is-active');

    logger.log('Menu toggled:', isActive ? 'open' : 'closed');

    if (isActive) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReducedMotion) {
        setTimeout(() => {
          const currentItem = document.querySelector('.site-header__nav-list .is-current');

          if (currentItem) {
            currentItem.scrollIntoView({
              behavior: 'smooth',
              inline: 'center',
              block: 'nearest',
            });
            logger.log('Scrolled to active nav item');
          }
        }, 250);
      }
    }
  });

  logger.log('Menu toggle initialized');
}
