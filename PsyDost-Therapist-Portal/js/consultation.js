/* PsyDost - Live Consultation Features */

document.addEventListener('DOMContentLoaded', () => {
  initConsultationTimer();
});

function initConsultationTimer() {
  const timerEl = document.querySelector('.consultation-timer');
  if (!timerEl) return;

  let seconds = 23 * 60 + 45;
  setInterval(() => {
    seconds++;
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    timerEl.innerHTML = `<i class="fas fa-clock"></i> ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }, 1000);
}
