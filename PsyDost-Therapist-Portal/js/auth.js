/* PsyDost - Authentication JavaScript */

document.addEventListener('DOMContentLoaded', () => {
  initPasswordToggle();
  initFormValidation();
  initOTPInputs();
  initPasswordStrength();
});

/* Password Visibility Toggle */
function initPasswordToggle() {
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('input');
      const icon = btn.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
      }
    });
  });
}

/* Form Validation */
function initFormValidation() {
  document.querySelectorAll('.auth-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      form.querySelectorAll('[required]').forEach(field => {
        clearFieldError(field);
        if (!field.value.trim()) {
          showFieldError(field, 'This field is required');
          isValid = false;
        }
      });

      const emailField = form.querySelector('[type="email"]');
      if (emailField && emailField.value && !isValidEmail(emailField.value)) {
        showFieldError(emailField, 'Please enter a valid email address');
        isValid = false;
      }

      const passwordField = form.querySelector('#password, #newPassword');
      if (passwordField && passwordField.value && passwordField.value.length < 8) {
        showFieldError(passwordField, 'Password must be at least 8 characters');
        isValid = false;
      }

      const confirmField = form.querySelector('#confirmPassword');
      if (confirmField && passwordField) {
        if (confirmField.value !== passwordField.value) {
          showFieldError(confirmField, 'Passwords do not match');
          isValid = false;
        }
      }

      if (isValid) {
        handleFormSubmit(form);
      }
    });
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(field, message) {
  field.classList.add('is-invalid');
  let feedback = field.parentElement.querySelector('.invalid-feedback');
  if (!feedback) {
    feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    field.parentElement.appendChild(feedback);
  }
  feedback.textContent = message;
}

function clearFieldError(field) {
  field.classList.remove('is-invalid');
  const feedback = field.parentElement.querySelector('.invalid-feedback');
  if (feedback) feedback.remove();
}

function handleFormSubmit(form) {
  const submitBtn = form.querySelector('.auth-submit, [type="submit"]');
  const originalText = submitBtn.innerHTML;
  
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;

    const redirect = form.getAttribute('data-redirect');
    const successMsg = form.getAttribute('data-success');

    if (successMsg) {
      showAuthAlert(form, successMsg, 'success');
    }

    if (redirect) {
      setTimeout(() => {
        window.location.href = redirect;
      }, 1500);
    }
  }, 2000);
}

function showAuthAlert(form, message, type) {
  let alert = form.querySelector('.alert-custom');
  if (!alert) {
    alert = document.createElement('div');
    alert.className = 'alert-custom';
    form.insertBefore(alert, form.firstChild);
  }
  alert.className = `alert-custom ${type}`;
  alert.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
}

/* OTP Input Handling */
function initOTPInputs() {
  const otpInputs = document.querySelectorAll('.otp-input');
  if (!otpInputs.length) return;

  otpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      const value = e.target.value.replace(/\D/g, '');
      e.target.value = value.slice(0, 1);
      if (value && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !e.target.value && index > 0) {
        otpInputs[index - 1].focus();
      }
    });

    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const paste = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
      paste.split('').forEach((char, i) => {
        if (otpInputs[i]) otpInputs[i].value = char;
      });
      if (paste.length >= otpInputs.length) otpInputs[otpInputs.length - 1].focus();
    });
  });

  startOTPTimer();
}

function startOTPTimer() {
  const timerEl = document.querySelector('.otp-timer span');
  const resendLink = document.querySelector('.resend-link');
  if (!timerEl) return;

  let seconds = 60;
  timerEl.textContent = seconds;

  const interval = setInterval(() => {
    seconds--;
    timerEl.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(interval);
      if (resendLink) {
        resendLink.classList.remove('disabled');
        resendLink.textContent = 'Resend OTP';
      }
    }
  }, 1000);

  if (resendLink) {
    resendLink.addEventListener('click', () => {
      if (resendLink.classList.contains('disabled')) return;
      resendLink.classList.add('disabled');
      resendLink.textContent = 'OTP Sent!';
      seconds = 60;
      timerEl.textContent = seconds;
      startOTPTimer();
    });
  }
}

/* Password Strength Meter */
function initPasswordStrength() {
  const passwordField = document.querySelector('#newPassword, #password');
  if (!passwordField) return;

  passwordField.addEventListener('input', () => {
    const strength = calculatePasswordStrength(passwordField.value);
    const bar = document.querySelector('.strength-bar-fill');
    const text = document.querySelector('.strength-text');

    if (bar) {
      bar.style.width = strength.percent + '%';
      bar.style.background = strength.color;
    }
    if (text) {
      text.textContent = strength.label;
      text.style.color = strength.color;
    }
  });
}

function calculatePasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  const levels = [
    { percent: 0, color: '#ef4444', label: 'Enter a password' },
    { percent: 20, color: '#ef4444', label: 'Weak' },
    { percent: 40, color: '#f59e0b', label: 'Fair' },
    { percent: 60, color: '#f59e0b', label: 'Good' },
    { percent: 80, color: '#10b981', label: 'Strong' },
    { percent: 100, color: '#10b981', label: 'Very Strong' }
  ];

  return levels[Math.min(score, levels.length - 1)];
}
