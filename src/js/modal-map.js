const openModalMapBtn = document.getElementById("open-modal-map");
const closeModalMapBtn = document.getElementById("close-modal-map");
const modalMap = document.getElementById("modal-map");
const imageContainer = document.querySelector(".modal__image-container");
const image = document.querySelector(".modal__image");

let currentPanX = 0;
let currentPanY = 0;

function openModal() {
  modalMap.classList.add("modal-show");
}

function closeModal() {
  modalMap.classList.add("modal-hide");
  setTimeout(() => {
    modalMap.classList.remove("modal-show", "modal-hide");
  }, 50);
}

function panImage(direction) {
  let newPanX = currentPanX;
  let newPanY = currentPanY;
  let imageRect = image.getBoundingClientRect();
  let containerRect = imageContainer.getBoundingClientRect();

  switch (direction) {
    case "up":
      if (imageRect.top >= containerRect.top - 20) return;
      newPanY += 20;
      break;
    case "down":
      if (imageRect.bottom <= containerRect.bottom) return;
      newPanY -= 20;
      break;
    case "left":
      if (imageRect.left >= containerRect.left - 30) {
        return;
      }
      newPanX += 20;
      break;
    case "right":
      if (imageRect.right <= containerRect.right) return;
      newPanX -= 20;
      break;
  }

  image.style.transform = `translate(${newPanX}px, ${newPanY}px)`;
  currentPanX = newPanX;
  currentPanY = newPanY;
}

openModalMapBtn.addEventListener("click", () => {
  openModal();
});

closeModalMapBtn.addEventListener("click", () => {
  closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  } else if (modalMap.classList.contains("modal-show")) {
    switch (e.key) {
      case "ArrowUp":
        panImage("up");
        break;
      case "ArrowDown":
        panImage("down");
        break;
      case "ArrowLeft":
        panImage("left");
        break;
      case "ArrowRight":
        panImage("right");
        break;
    }
  }
});

modalMap.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});
