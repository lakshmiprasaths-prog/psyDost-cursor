/* PsyDost Therapist Portal - Main JavaScript */

function initApp() {
  initSidebar();
  initToasts();
  initModals();
  initTabs();
  setActiveNavLink();
}

document.addEventListener('DOMContentLoaded', initApp);
document.addEventListener('layout:ready', () => {
  initSidebar();
  setActiveNavLink();
});

/* Sidebar Toggle */
function initSidebar() {
  const toggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('show');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar?.classList.remove('open');
      overlay.classList.remove('show');
    });
  }
}

/* Set Active Nav Link */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || href.endsWith('/' + currentPage))) {
      link.classList.add('active');
    }
  });
}

/* Toast Notifications */
function initToasts() {
  if (!document.querySelector('.toast-container-custom')) {
    const container = document.createElement('div');
    container.className = 'toast-container-custom';
    document.body.appendChild(container);
  }
}

function showToast(message, type = 'info', duration = 4000) {
  const container = document.querySelector('.toast-container-custom');
  if (!container) return;

  const icons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    warning: 'fa-exclamation-triangle',
    info: 'fa-info-circle'
  };

  const toast = document.createElement('div');
  toast.className = `toast-custom ${type}`;
  toast.innerHTML = `
    <i class="fas ${icons[type] || icons.info}"></i>
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" style="background:none;border:none;margin-left:auto;cursor:pointer;color:#94a3b8;">
      <i class="fas fa-times"></i>
    </button>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* Loading Spinner */
function showLoading(show = true) {
  let overlay = document.querySelector('.spinner-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'spinner-overlay';
    overlay.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(overlay);
  }
  overlay.classList.toggle('show', show);
}

/* Modal System */
function initModals() {
  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal');
      openModal(modalId);
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal.id);
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close-modal');
      closeModal(modalId);
    });
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('show');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('show');
}

/* Tabs */
function initTabs() {
  document.querySelectorAll('.nav-tabs-custom').forEach(tabContainer => {
    const tabs = tabContainer.querySelectorAll('.nav-tab');
    const parent = tabContainer.closest('.page-content') || tabContainer.closest('.row') || tabContainer.closest('.card') || document.body;
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        if (parent) {
          parent.querySelectorAll('.tab-pane').forEach(pane => {
            pane.style.display = pane.id === target ? 'block' : 'none';
          });
        }
      });
    });
  });
}

/* Search Filter for Tables */
function filterTable(inputId, tableId) {
  const input = document.getElementById(inputId);
  const table = document.getElementById(tableId);
  if (!input || !table) return;

  input.addEventListener('input', () => {
    const filter = input.value.toLowerCase();
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(filter) ? '' : 'none';
    });
  });
}

/* Format Currency */
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

/* Format Date */
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
}

/* Confirm Action */
function confirmAction(message, callback) {
  if (confirm(message)) callback();
}

/* Export for global use */
window.PsyDost = {
  showToast,
  showLoading,
  openModal,
  closeModal,
  filterTable,
  formatCurrency,
  formatDate,
  confirmAction
};
