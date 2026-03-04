// src/js/modules/modal.js

import { logger } from '../utils/logger.js';

const initModal = () => {
  const overlay = document.querySelector('.modal-overlay');
  const modal = document.querySelector('.modal');
  const closeBtn = document.querySelector('.modal__close');
  const printBtn = document.querySelector('.modal__print-btn');
  const formWrapper = document.querySelector('.modal__form-wrapper');
  const formDismiss = document.querySelector('.modal__form-dismiss');
  const form = document.querySelector('.modal__form');
  const thankYou = document.querySelector('.modal__thankyou');
  const trigger = document.querySelector('.card-art-work__image');
  const bodyL = document.querySelector('.body-l');
  const body = document.body;

  if (!overlay || !trigger) return;

  const openModal = () => {
    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('is-active');
    modal.setAttribute('open', '');
    bodyL.inert = true;
    closeBtn.focus();
    body.style.overflow = 'hidden';
    logger.log('Modal opened');
  };

  const closeModal = () => {
    overlay.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('is-active');
    modal.removeAttribute('open');
    formWrapper.classList.remove('is-active');
    bodyL.inert = false;
    printBtn.hidden = false;
    trigger.focus();
    body.style.overflow = 'auto';
    logger.log('Modal closed');
  };

  // Open modal on image click
  trigger.addEventListener('click', openModal);

  // Close on close button click
  closeBtn.addEventListener('click', closeModal);

  // Close on overlay click (outside modal)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
      closeModal();
    }
  });

  // Show form on print button click
  printBtn.addEventListener('click', () => {
    printBtn.hidden = true;
    formWrapper.classList.add('is-active');
    formDismiss.focus();
    logger.log('Print form opened');
  });

  // Hide form on dismiss click
  formDismiss.addEventListener('click', () => {
    formWrapper.classList.remove('is-active');
    printBtn.hidden = false;
    printBtn.focus();
    logger.log('Print form dismissed');
  });

  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        form.hidden = true;
        thankYou.hidden = false;
        logger.log('Form submitted successfully');
      } else {
        logger.log('Form submission failed');
      }
    } catch (err) {
      logger.log('Form submission error', err);
    }
  });

  logger.log('Modal initialized');
};

export default initModal;
