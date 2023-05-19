const fullscrBtn = document.getElementById("fullscr");

fullscrBtn.addEventListener("click", () => {
  if (document.fullscreenEnabled) {
    document.documentElement.requestFullscreen();
  }
});
