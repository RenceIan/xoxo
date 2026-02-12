const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

const memoryCards = document.querySelectorAll(".memory-card");
const memoryModal = document.getElementById("memory-modal");

if (memoryCards.length && memoryModal) {
  const modalImage = memoryModal.querySelector(".memory-modal-image");
  const modalTitle = memoryModal.querySelector(".memory-modal-title");
  const modalText = memoryModal.querySelector(".memory-modal-text");
  const modalLetter = memoryModal.querySelector(".memory-modal-letter");
  const modalClose = memoryModal.querySelector(".modal-close");

  const openModal = (card) => {
    const image = card.dataset.image || "";
    const title = card.querySelector("h3")?.textContent || "";
    const text = card.querySelector(".memory-body p:last-of-type")?.textContent || "";
    const letter = card.dataset.letter || "";

    if (modalImage) {
      modalImage.style.backgroundImage = image
        ? `linear-gradient(140deg, rgba(215, 101, 114, 0.35), rgba(183, 213, 209, 0.6)), url('${image}')`
        : "";
    }
    if (modalTitle) {
      modalTitle.textContent = title;
    }
    if (modalText) {
      modalText.textContent = text;
    }
    if (modalLetter) {
      modalLetter.textContent = letter;
    }

    memoryModal.classList.add("is-visible");
    memoryModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    memoryModal.classList.remove("is-visible");
    memoryModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  memoryCards.forEach((card) => {
    card.addEventListener("click", () => openModal(card));
  });

  modalClose?.addEventListener("click", closeModal);

  memoryModal.addEventListener("click", (event) => {
    if (event.target === memoryModal) {
      closeModal();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

const letters = document.querySelectorAll(".letter");
if (letters.length) {
  const closeLetters = () => {
    letters.forEach((letter) => letter.classList.remove("is-open"));
  };

  letters.forEach((letter) => {
    letter.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = letter.classList.contains("is-open");
      closeLetters();
      if (!isOpen) {
        letter.classList.add("is-open");
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".letter")) {
      closeLetters();
    }
  });
}

const valentinePhotos = document.querySelectorAll(".valentine-photo");
if (valentinePhotos.length) {
  const clearPoppedPhotos = () => {
    valentinePhotos.forEach((photo) => photo.classList.remove("is-popped"));
  };

  valentinePhotos.forEach((photo) => {
    photo.addEventListener("click", (event) => {
      event.stopPropagation();
      const isPopped = photo.classList.contains("is-popped");
      clearPoppedPhotos();
      if (!isPopped) {
        photo.classList.add("is-popped");
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".valentine-photo")) {
      clearPoppedPhotos();
    }
  });
}

