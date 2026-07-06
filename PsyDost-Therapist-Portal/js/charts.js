/* PsyDost - Chart.js Configurations */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardCharts();
  initAnalyticsCharts();
  initEarningsCharts();
});

const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  },
  scales: {
    x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#94a3b8' } },
    y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 11 }, color: '#94a3b8' } }
  }
};

function initDashboardCharts() {
  // Monthly Earnings Chart
  const earningsCtx = document.getElementById('monthlyEarningsChart');
  if (earningsCtx) {
    new Chart(earningsCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Earnings',
          data: [85000, 92000, 78000, 105000, 118000, 124500],
          backgroundColor: 'rgba(37, 99, 235, 0.8)',
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: { ...chartDefaults, plugins: { legend: { display: false } } }
    });
  }

  // Consultation Trends
  const trendsCtx = document.getElementById('consultationTrendsChart');
  if (trendsCtx) {
    new Chart(trendsCtx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Consultations',
          data: [8, 12, 10, 14, 11, 6, 4],
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#2563eb',
          pointRadius: 4
        }]
      },
      options: chartDefaults
    });
  }

  // Patient Growth
  const growthCtx = document.getElementById('patientGrowthChart');
  if (growthCtx) {
    new Chart(growthCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'New Patients',
          data: [12, 18, 15, 22, 28, 24],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: chartDefaults
    });
  }

  // Appointment Status
  const statusCtx = document.getElementById('appointmentStatusChart');
  if (statusCtx) {
    new Chart(statusCtx, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Confirmed', 'Pending', 'Cancelled'],
        datasets: [{
          data: [145, 32, 8, 5],
          backgroundColor: ['#10b981', '#2563eb', '#f59e0b', '#ef4444'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 16, usePointStyle: true, font: { size: 11 } }
          }
        }
      }
    });
  }

  // Revenue Overview
  const revenueCtx = document.getElementById('revenueOverviewChart');
  if (revenueCtx) {
    new Chart(revenueCtx, {
      type: 'bar',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Consultations',
            data: [28000, 32000, 29000, 35500],
            backgroundColor: 'rgba(37, 99, 235, 0.8)',
            borderRadius: 6
          },
          {
            label: 'Follow-ups',
            data: [8000, 9500, 7200, 11000],
            backgroundColor: 'rgba(124, 58, 237, 0.8)',
            borderRadius: 6
          }
        ]
      },
      options: {
        ...chartDefaults,
        plugins: { legend: { display: true, position: 'top', labels: { usePointStyle: true, font: { size: 11 } } } }
      }
    });
  }

  // Patient Satisfaction
  const satisfactionCtx = document.getElementById('satisfactionChart');
  if (satisfactionCtx) {
    new Chart(satisfactionCtx, {
      type: 'radar',
      data: {
        labels: ['Communication', 'Empathy', 'Expertise', 'Punctuality', 'Follow-up'],
        datasets: [{
          label: 'Rating',
          data: [4.8, 4.9, 4.7, 4.6, 4.5],
          backgroundColor: 'rgba(37, 99, 235, 0.2)',
          borderColor: '#2563eb',
          pointBackgroundColor: '#2563eb'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0, max: 5,
            ticks: { stepSize: 1, font: { size: 10 } },
            grid: { color: '#f1f5f9' }
          }
        },
        plugins: { legend: { display: false } }
      }
    });
  }
}

function initAnalyticsCharts() {
  const revenueGrowthCtx = document.getElementById('revenueGrowthChart');
  if (revenueGrowthCtx) {
    new Chart(revenueGrowthCtx, {
      type: 'line',
      data: {
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Revenue',
          data: [65000, 72000, 68000, 85000, 92000, 98000, 85000, 92000, 78000, 105000, 118000, 124500],
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.08)',
          fill: true,
          tension: 0.3
        }]
      },
      options: chartDefaults
    });
  }

  const appointmentTrendsCtx = document.getElementById('appointmentTrendsChart');
  if (appointmentTrendsCtx) {
    new Chart(appointmentTrendsCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Appointments',
          data: [85, 92, 78, 105, 118, 124],
          backgroundColor: 'rgba(16, 185, 129, 0.8)',
          borderRadius: 8
        }]
      },
      options: chartDefaults
    });
  }

  const successRateCtx = document.getElementById('successRateChart');
  if (successRateCtx) {
    new Chart(successRateCtx, {
      type: 'doughnut',
      data: {
        labels: ['Successful', 'Rescheduled', 'No-show'],
        datasets: [{
          data: [92, 5, 3],
          backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: { legend: { position: 'bottom', labels: { usePointStyle: true } } }
      }
    });
  }

  const ratingTrendCtx = document.getElementById('ratingTrendChart');
  if (ratingTrendCtx) {
    new Chart(ratingTrendCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Avg Rating',
          data: [4.6, 4.7, 4.65, 4.75, 4.8, 4.85],
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        ...chartDefaults,
        scales: {
          ...chartDefaults.scales,
          y: { ...chartDefaults.scales.y, min: 4, max: 5 }
        }
      }
    });
  }
}

function initEarningsCharts() {
  const commissionCtx = document.getElementById('commissionChart');
  if (commissionCtx) {
    new Chart(commissionCtx, {
      type: 'pie',
      data: {
        labels: ['Your Share (85%)', 'Platform Fee (15%)'],
        datasets: [{
          data: [105825, 18675],
          backgroundColor: ['#2563eb', '#e2e8f0'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { usePointStyle: true } } }
      }
    });
  }

  const monthlyBreakdownCtx = document.getElementById('monthlyBreakdownChart');
  if (monthlyBreakdownCtx) {
    new Chart(monthlyBreakdownCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Net Earnings',
          data: [72250, 78200, 66300, 89250, 100300, 105825],
          backgroundColor: 'rgba(37, 99, 235, 0.8)',
          borderRadius: 8
        }]
      },
      options: chartDefaults
    });
  }
}
