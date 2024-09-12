// Grabbing DOM elements
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsContainer = document.getElementById('laps');

let interval;
let elapsedTime = 0;
let paused = true;
let startTime = 0;

// Format time to hh:mm:ss
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Update the stopwatch display
function updateTime() {
  const currentTime = Date.now();
  const diff = currentTime - startTime;
  elapsedTime += diff;
  timeDisplay.textContent = formatTime(elapsedTime);
  startTime = currentTime;
}

// Start the stopwatch
startBtn.addEventListener('click', () => {
  if (paused) {
    paused = false;
    startTime = Date.now();
    interval = setInterval(updateTime, 1000); // Update every second
  }
});

// Pause the stopwatch
pauseBtn.addEventListener('click', () => {
  if (!paused) {
    clearInterval(interval);
    paused = true;
  }
});

// Reset the stopwatch
resetBtn.addEventListener('click', () => {
  clearInterval(interval);
  elapsedTime = 0;
  paused = true;
  timeDisplay.textContent = '00:00:00';
  lapsContainer.innerHTML = ''; // Clear laps
});

// Record lap time
lapBtn.addEventListener('click', () => {
  if (!paused) {
    const lapTime = document.createElement('div');
    lapTime.classList.add('lap');
    lapTime.textContent = formatTime(elapsedTime);
    lapsContainer.appendChild(lapTime);
  }
});
