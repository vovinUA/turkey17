const day2Vid2 = document.getElementById("day2-vid2-mp4");
const playBtn = document.getElementById("day2-vid2-btn");
const hint1 = document.getElementById("video-hint1");
const hint2 = document.getElementById("video-hint2");

day2Vid2.addEventListener("timeupdate", function () {
  if (day2Vid2.currentTime >= 30 && day2Vid2.currentTime <= 35) {
    hint1.style.opacity = "1";
    hint1.style.transition = "opacity 0.5s";
    setTimeout(function () {
      hint1.style.opacity = "0";
      hint1.style.transition = "opacity 0.5s";
    }, 5000);
  } else if (day2Vid2.currentTime >= 60 && day2Vid2.currentTime <= 65) {
    hint2.style.opacity = "1";
    hint2.style.transition = "opacity 0.5s";
    setTimeout(function () {
      hint2.style.opacity = "0";
      hint2.style.transition = "opacity 0.5s";
    }, 5000);
  }
});

playBtn.addEventListener("click", function () {
  day2Vid2.play();
  playBtn.style.display = "none";
});

day2Vid2.addEventListener("ended", function () {
  day2Vid2.currentTime = 0;
  playBtn.style.display = "block";
});

hint1.style.top = (day2Vid2.offsetHeight - hint1.offsetHeight) / 2 + "px";
hint1.style.left = (day2Vid2.offsetWidth - hint1.offsetWidth) / 2 + "px";

hint2.style.top = (day2Vid2.offsetHeight - hint2.offsetHeight) / 2 + "px";
hint2.style.left = (day2Vid2.offsetWidth - hint2.offsetWidth) / 2 + "px";
