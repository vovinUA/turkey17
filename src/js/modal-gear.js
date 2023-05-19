const openModalGearBtn = document.getElementById("open-modal-gear");
const closeModalGearBtn = document.getElementById("close-modal-gear");
const modalGear = document.getElementById("modal-gear");
const mainContent = document.querySelector("section");

function openModal() {
  modalGear.classList.add("modal-show");
  mainContent.classList.add("blur");
}

function closeModal() {
  modalGear.classList.add("modal-hide");
  mainContent.classList.remove("blur");
  modalGear.addEventListener(
    "transitionend",
    () => {
      modalGear.classList.remove("modal-show", "modal-hide");
    },
    { once: true }
  );
}

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}

function handleClickOutsideModal(event) {
  if (event.target === modalGear) {
    closeModal();
  }
}

openModalGearBtn.addEventListener("click", () => {
  openModal();
});

closeModalGearBtn.addEventListener("click", () => {
  closeModal();
});

modalGear.addEventListener("click", handleClickOutsideModal);

document.addEventListener("keyup", handleEscapeKey);
