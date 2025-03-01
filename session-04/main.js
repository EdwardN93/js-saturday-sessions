// creeat un counter de la 1-2 min
// progress bar sa se goleasca pe masura ce timer se apropie de final
// sa se schimbe culoarea la 10 secunde

let progressBar =
  document.querySelector("#progressBar") ||
  document.querySelector(".progress-bar");

const stopBtn = document.querySelector(".stopTimer");
const pauseBtn = document.querySelector(".pauseTimer");

let setTimer = 12;
const remainingTimer = setTimer;

const hrsDisplay = document.querySelector(".hrs");
const minDisplay = document.querySelector(".minutes");
const secDisplay = document.querySelector(".seconds");

let pause = false;
stopBtn.addEventListener("click", stopTimer);
pauseBtn.addEventListener("click", pauseTimer);

function updateTimer() {
  if (!pause) {
    setTimer--;
    const formattedTime = formatTimer(setTimer);

    hrsDisplay.textContent = formattedTime.hrs;
    minDisplay.textContent = formattedTime.min;
    secDisplay.textContent = formattedTime.sec;

    progressBarUpdate(setTimer);

    if (setTimer == 10) {
      document.querySelector(".timer").style.color = "red";
      progressBar.classList.add("bg-danger");
    }
    if (setTimer == 0) {
      clearInterval(interval);
      setDisabledButtonsTrue();
    }
  }
}

function formatTimer(timer) {
  let hrs = Math.floor(timer / (60 * 60));
  let min = Math.floor((timer / 60) % 60);
  let sec = setTimer % 60;
  return {
    hrs: hrs > 9 ? hrs : `0${String(hrs)}`,
    min: min > 9 ? min : `0${String(min)}`,
    sec: sec > 9 ? sec : `0${String(sec)}`,
  };
}

function stopTimer() {
  document.querySelector(".hrs").textContent = "00";
  document.querySelector(".minutes").textContent = "00";
  document.querySelector(".seconds").textContent = "00";
  clearInterval(interval);
  setDisabledButtonsTrue();
  progressBar.style.width = "100%";
  document.querySelector(".timer").style.color = "inherit";

  progressBar.classList.remove("bg-danger");
}

function pauseTimer() {
  if (pause) {
    pauseBtn.textContent = "Pause Timer";
  } else {
    pauseBtn.textContent = "Start Timer";
  }
  pause = !pause;
}

function progressBarUpdate(timer) {
  progressBar.style.width = (timer / remainingTimer) * 100 + "%";
}

function setDisabledButtonsTrue() {
  stopBtn.disabled = true;
  pauseBtn.disabled = true;
}

const interval = setInterval(updateTimer, 1000);
