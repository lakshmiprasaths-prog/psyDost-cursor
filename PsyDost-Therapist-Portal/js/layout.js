/* PsyDost - Shared Layout Components */
function getSidebar(activePage) {
  const nav = [
    { section: 'Main', items: [
      { href: 'dashboard.html', icon: 'fa-th-large', label: 'Dashboard' },
      { href: 'appointments-list.html', icon: 'fa-calendar-alt', label: 'Appointments', badge: 5 },
      { href: 'appointments-calendar.html', icon: 'fa-calendar', label: 'Calendar' },
      { href: 'patients-list.html', icon: 'fa-users', label: 'Patients' },
      { href: 'consultation-history.html', icon: 'fa-video', label: 'Consultations' },
    ]},
    { section: 'Finance', items: [
      { href: 'earnings-dashboard.html', icon: 'fa-rupee-sign', label: 'Earnings' },
      { href: 'analytics.html', icon: 'fa-chart-bar', label: 'Analytics' },
    ]},
    { section: 'Account', items: [
      { href: 'notifications.html', icon: 'fa-bell', label: 'Notifications', badge: 3 },
      { href: 'profile-view.html', icon: 'fa-user-md', label: 'Profile' },
      { href: 'settings.html', icon: 'fa-cog', label: 'Settings' },
      { href: '../login.html', icon: 'fa-sign-out-alt', label: 'Logout' },
    ]}
  ];

  let html = `<aside class="sidebar">
    <div class="sidebar-brand">
      <div class="logo-icon"><i class="fas fa-brain"></i></div>
      <div><h1>PsyDost</h1><span>Therapist Portal</span></div>
    </div>
    <nav class="sidebar-nav">`;

  nav.forEach(section => {
    html += `<div class="nav-section"><div class="nav-section-title">${section.section}</div>`;
    section.items.forEach(item => {
      const active = item.href === activePage ? ' active' : '';
      const badge = item.badge ? `<span class="badge-count">${item.badge}</span>` : '';
      html += `<a href="${item.href}" class="nav-link${active}"><i class="fas ${item.icon}"></i> ${item.label}${badge}</a>`;
    });
    html += '</div>';
  });

  html += `</nav>
    <div class="sidebar-footer">
      <div class="sidebar-user">
        <img src="https://ui-avatars.com/api/?name=Priya+Sharma&background=2563eb&color=fff" alt="Dr. Priya">
        <div class="sidebar-user-info"><h6>Dr. Priya Sharma</h6><small>Clinical Psychologist</small></div>
      </div>
    </div>
  </aside>`;
  return html;
}

function getHeader() {
  return `<header class="top-header">
    <button class="sidebar-toggle" aria-label="Toggle menu"><i class="fas fa-bars"></i></button>
    <div class="header-search">
      <i class="fas fa-search"></i>
      <input type="search" placeholder="Search patients, appointments..." id="globalSearch">
    </div>
    <div class="header-actions">
      <a href="notifications.html" class="header-btn" title="Notifications"><i class="fas fa-bell"></i><span class="dot"></span></a>
      <button class="header-btn" title="Messages"><i class="fas fa-envelope"></i></button>
      <a href="settings.html" class="header-btn" title="Settings"><i class="fas fa-cog"></i></a>
      <a href="profile-view.html" class="header-profile">
        <img src="https://ui-avatars.com/api/?name=Priya+Sharma&background=2563eb&color=fff" alt="Profile">
        <span>Dr. Priya</span>
      </a>
    </div>
  </header>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const sidebarEl = document.getElementById('app-sidebar');
  const headerEl = document.getElementById('app-header');
  const activePage = document.body.dataset.page;
  if (sidebarEl) sidebarEl.innerHTML = getSidebar(activePage);
  if (headerEl) headerEl.innerHTML = getHeader();
  document.dispatchEvent(new CustomEvent('layout:ready'));
});
