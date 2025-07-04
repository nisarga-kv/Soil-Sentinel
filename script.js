
const phLevel = document.getElementById('ph-level');
const moisture = document.getElementById('moisture');
const nutrients = document.getElementById('nutrients');
const alerts = document.getElementById('alerts');
const microbeLog = document.getElementById('microbe-log');

// Chart setup
const ctx = document.getElementById('soilChart').getContext('2d');
const soilChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Moisture %',
      data: [],
      borderColor: 'green',
      borderWidth: 2,
      fill: false
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: { display: true, title: { display: true, text: 'Time' } },
      y: { beginAtZero: true, title: { display: true, text: 'Moisture %' } }
    }
  }
});

let time = 0;

function updateDashboard() {
  const ph = (6 + Math.random() * 2).toFixed(2);
  const moist = (30 + Math.random() * 40).toFixed(2);
  const npk = (Math.random() * 100).toFixed(0);

  phLevel.textContent = `pH: ${ph}`;
  moisture.textContent = `Moisture: ${moist}%`;
  nutrients.textContent = `NPK: ${npk}`;

  soilChart.data.labels.push(`${time}s`);
  soilChart.data.datasets[0].data.push(moist);
  if (soilChart.data.labels.length > 10) {
    soilChart.data.labels.shift();
    soilChart.data.datasets[0].data.shift();
  }
  soilChart.update();

  // Alert and Microbe Log simulation
  alerts.style.display = moist < 35 ? 'block' : 'none';
  alerts.textContent = moist < 35 ? '⚠️ Moisture level is low! Microbes activating hydration support.' : '';

  const msg = moist < 35 ? 'Microbes initiated hydration process.' : 'Microbes monitoring...';
  const log = document.createElement('li');
  log.textContent = `[${time}s] ${msg}`;
  microbeLog.prepend(log);

  time += 5;
}

setInterval(updateDashboard, 5000);
// Initial call to start the dashboard updates
updateDashboard();