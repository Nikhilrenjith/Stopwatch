let startTime,
  elapsedTime = 0;
let timerInterval;
let isRunning = false;
let stoppedCount = 1;

const display = document.getElementById("display");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const stoppedTimes = document.getElementById("stoppedTimes");

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTime, 10);
  isRunning = true;
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false;
}

function stopTimer() {
  clearInterval(timerInterval);
  elapsedTime = Date.now() - startTime;
  isRunning = false;
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;
  addStoppedTime(formatTime(elapsedTime));
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  isRunning = false;
  display.innerHTML = "00:00:00:00";
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
  stoppedTimes.innerHTML = "";
  stoppedCount = 1;
}

function updateTime() {
  const currentTime = Date.now() - startTime;
  display.innerHTML = formatTime(currentTime);
}

function formatTime(time) {
  const milliseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  return (
    padNumber(hours) +
    ":" +
    padNumber(minutes) +
    ":" +
    padNumber(seconds) +
    "." +
    padNumber(milliseconds)
  );
}

function padNumber(number) {
  return number.toString().padStart(2, "0");
}

function addStoppedTime(time) {
  const li = document.createElement("li");
  li.textContent = ` ${stoppedCount}.   ${time}`;
  stoppedTimes.appendChild(li);
  stoppedCount++;
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
