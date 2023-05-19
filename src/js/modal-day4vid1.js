document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const day4VideoBtn = document.querySelector(".day4-video-btn");
  const modalDay4Vid1Overlay = document.getElementById("modal-day4vid1-overlay");
  const modalDay4Vid1 = document.getElementById("modal-day4vid1");
  const closeModalBtn = document.getElementById("close-modal-day4vid1");
  const video = document.getElementById("day4vid1"); // Get the video element by id

  // Add click event listener to open modal
  day4VideoBtn.addEventListener("click", function () {
    // Show modal overlay with fadeIn animation
    modalDay4Vid1Overlay.classList.add("show");

    // Show modal with fadeIn animation
    modalDay4Vid1.classList.add("show");

    // Play the video
    video.play();
  });

  // Add click event listener to close modal
  closeModalBtn.addEventListener("click", function () {
    // Pause the video
    video.pause();

    // Hide modal with fadeOut animation
    modalDay4Vid1.classList.remove("show");

    // Hide modal overlay
    modalDay4Vid1Overlay.classList.remove("show");
  });

  // Add keydown event listener to close modal on Escape key press
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      // Pause the video
      video.pause();

      // Hide modal with fadeOut animation
      modalDay4Vid1.classList.remove("show");

      // Hide modal overlay
      modalDay4Vid1Overlay.classList.remove("show");
    }
  });

  // Add click event listener to modal overlay to close modal
  modalDay4Vid1Overlay.addEventListener("click", function (event) {
    // If clicked element is the modal overlay (not its children), close modal
    if (event.target === modalDay4Vid1Overlay) {
      // Pause the video
      video.pause();

      // Hide modal with fadeOut animation
      modalDay4Vid1.classList.remove("show");

      // Hide modal overlay
      modalDay4Vid1Overlay.classList.remove("show");
    }
  });
});

document.getElementById("close-modal-day4vid1").addEventListener("click", function () {
  document.querySelector(".modal__text-overlay").style.display = "none";
});

document.querySelector(".modal__text-overlay").addEventListener("click", function () {
  this.style.display = "none";
});
