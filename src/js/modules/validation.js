// src/js/modules/validation.js

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const namePattern = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'\-]{2,}$/;
const streetPattern = /^[a-zA-Z0-9\s',.\-#]{5,}$/;
const cityStatePattern = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'\-]{2,}$/;
const postalPattern = /^[a-zA-Z0-9\s\-]{3,10}$/;
const countryPattern = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'\-]{2,}$/;
const commentsPattern = /^.{10,}$/;

const getErrorMessage = (input) => {
  if (input.validity.valueMissing) {
    return 'This field is required';
  }
  if (input.type === 'email' && !emailPattern.test(input.value)) {
    return 'Please enter a valid email address';
  }
  if (input.name === 'first_name' && !namePattern.test(input.value)) {
    return 'Please enter a valid first name';
  }
  if (input.name === 'last_name' && !namePattern.test(input.value)) {
    return 'Please enter a valid last name';
  }
  if (input.name === 'street' && !streetPattern.test(input.value)) {
    return 'Please enter a valid street address';
  }
  if (input.name === 'city' && !cityStatePattern.test(input.value)) {
    return 'Please enter a valid city';
  }
  if (input.name === 'state' && !cityStatePattern.test(input.value)) {
    return 'Please enter a valid state or province';
  }
  if (input.name === 'postal' && !postalPattern.test(input.value)) {
    return 'Please enter a valid postal code';
  }
  if (input.name === 'country' && !countryPattern.test(input.value)) {
    return 'Please enter a valid country';
  }
  if (input.name === 'comments' && input.value !== '' && !commentsPattern.test(input.value)) {
    return 'Comments must be at least 10 characters';
  }
  return null;
};

const showError = (input, message) => {
  const field = input.closest('.modal__field');
  if (!field) return;

  let error = field.querySelector('.modal__error');
  if (!error) {
    error = document.createElement('span');
    error.classList.add('modal__error');
    field.appendChild(error);
  }
  error.textContent = message;
  input.classList.add('is-invalid');
};

const clearError = (input) => {
  const field = input.closest('.modal__field');
  if (!field) return;

  const error = field.querySelector('.modal__error');
  if (error) error.remove();
  input.classList.remove('is-invalid');
};

const validateForm = (form) => {
  let isValid = true;

  const fields = form.querySelectorAll('input:not([type="hidden"]), textarea');

  fields.forEach((input) => {
    clearError(input);
    const message = getErrorMessage(input);
    if (message) {
      showError(input, message);
      isValid = false;
    }
  });

  return isValid;
};

const initValidation = (form) => {
  if (!form) return;

  let submitting = false;

  const fields = form.querySelectorAll('input:not([type="hidden"]), textarea');

  fields.forEach((input) => {
    input.addEventListener('blur', () => {
      if (submitting) return;
      if (input.value === '' && !input.required) return;
      const message = getErrorMessage(input);
      if (message) {
        showError(input, message);
      } else {
        clearError(input);
      }
    });

    input.addEventListener('input', () => {
      const message = getErrorMessage(input);
      if (!message) clearError(input);
    });
  });

  form.addEventListener('submit', () => {
    submitting = true;
    setTimeout(() => {
      submitting = false;
    }, 100);
  });

  return validateForm;
};

export { initValidation, validateForm };
