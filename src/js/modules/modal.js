// src/js/modules/modal.js

import { logger } from '../utils/logger.js';
import { initValidation, validateForm } from './validation.js';

const initModal = () => {
  const overlay = document.querySelector('.modal-overlay');
  const modal = document.querySelector('.modal');
  const closeBtn = document.querySelector('.modal__close');
  const printBtn = document.querySelector('.modal__print-btn');
  const essay = document.querySelector('.modal__essay');
  const formWrapper = document.querySelector('.modal__form-wrapper');
  const formDismiss = document.querySelector('.modal__form-dismiss');
  const form = document.querySelector('.modal__form');
  const thankYou = document.querySelector('.modal__thankyou');
  const trigger = document.querySelector('.card-art-work__image');
  const bodyL = document.querySelector('.body-l');
  const body = document.body;

  if (!overlay || !trigger) return;

  const trapFocus = (e) => {
    const focusableSelectors = 'button, input, textarea, [tabindex="0"]';
    const focusableElements = [...modal.querySelectorAll(focusableSelectors)].filter(
      (el) => !el.closest('[hidden]') && !el.closest('.modal__form-wrapper:not(.is-active)')
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  };

  const clearForm = () => {
    const fields = form.querySelectorAll('input:not([type="hidden"]), textarea');
    fields.forEach((input) => {
      input.value = '';
    });
  };

  const clearErrors = () => {
    const fields = form.querySelectorAll('input:not([type="hidden"]), textarea');
    fields.forEach((input) => {
      input.classList.remove('is-invalid');
      const field = input.closest('.modal__field');
      if (field) {
        const error = field.querySelector('.modal__error');
        if (error) error.remove();
      }
    });
  };

  initValidation(form);

  const openModal = () => {
    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('is-active');
    modal.setAttribute('open', '');
    bodyL.inert = true;
    body.style.overflow = 'hidden';
    modal.addEventListener('keydown', trapFocus);

    if (printBtn) {
      closeBtn.focus();
    } else {
      setTimeout(() => {
        const firstInput = form.querySelector('input:not([type="hidden"]), textarea');
        if (firstInput) firstInput.focus();
      }, 100);
    }

    logger.log('Modal opened');
  };

  const closeModal = () => {
    overlay.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('is-active');
    modal.removeAttribute('open');
    if (formWrapper) formWrapper.classList.remove('is-active');
    bodyL.inert = false;
    if (printBtn) printBtn.hidden = false;
    trigger.focus();
    body.style.overflow = 'auto';
    modal.removeEventListener('keydown', trapFocus);
    clearErrors();
    logger.log('Modal closed');
  };

  trigger.addEventListener('click', openModal);

  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal();
    }
  });

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
      closeModal();
    }
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      formWrapper.classList.add('is-active');
      setTimeout(() => {
        const firstInput = form.querySelector('input:not([type="hidden"]), textarea');
        if (firstInput) firstInput.focus();
        logger.log('First input found:', firstInput);
      }, 1050);
      logger.log('Print form opened');
    });
  }

  if (formDismiss) {
    formDismiss.addEventListener('click', () => {
      formWrapper.classList.remove('is-active');
      clearForm();
      if (printBtn) printBtn.hidden = false;
      if (printBtn) printBtn.focus();
      logger.log('Print form dismissed');
    });
  }

  const cancelBtn = document.querySelector('.modal__cancel');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      clearForm();
      closeModal();
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(form)) return;

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
        setTimeout(() => {
          closeModal();
          form.hidden = false;
          thankYou.hidden = true;
          clearForm();
        }, 3000);
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
