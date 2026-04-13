const albumTrack = document.querySelector(".album-slider__track");
const albumCards = document.querySelectorAll(".album-card");
const albumPrev = document.querySelector(".album-slider__btn--prev");
const albumNext = document.querySelector(".album-slider__btn--next");

if (albumTrack && albumCards.length && albumPrev && albumNext) {
  let currentIndex = 0;

  function getVisibleCards() {
    if (window.innerWidth <= 575) return 1;
    if (window.innerWidth <= 991) return 2;
    return 3;
  }

  function getCardStep() {
    const firstCard = albumCards[0];
    const gap = parseFloat(window.getComputedStyle(albumTrack).gap) || 0;
    return firstCard.offsetWidth + gap;
  }

  function updateSlider() {
    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(0, albumCards.length - visibleCards);

    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    const step = getCardStep();
    albumTrack.style.transform = `translateX(-${currentIndex * step}px)`;

    albumPrev.disabled = currentIndex === 0;
    albumNext.disabled = currentIndex >= maxIndex;

    albumPrev.style.opacity = currentIndex === 0 ? "0.45" : "1";
    albumNext.style.opacity = currentIndex >= maxIndex ? "0.45" : "1";
  }

  albumNext.addEventListener("click", () => {
    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(0, albumCards.length - visibleCards);

    if (currentIndex < maxIndex) {
      currentIndex += 1;
      updateSlider();
    }
  });

  albumPrev.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      updateSlider();
    }
  });

  window.addEventListener("resize", updateSlider);
  updateSlider();
}

document.querySelectorAll("[data-expand]").forEach((block) => {
  const button = block.parentElement.querySelector("button");

  if (!button) return;

  button.addEventListener("click", () => {
    block.classList.toggle("active");
    button.textContent = block.classList.contains("active")
      ? "Сховати"
      : "Читати більше";
  });
});

const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");

if (burger && mobileMenu) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  document.querySelectorAll(".mobile-menu__link").forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });
}

const modalOpenButtons = document.querySelectorAll("[data-modal-open]");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");
const modals = document.querySelectorAll(".modal");

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal(modal) {
  if (!modal) return;

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

modalOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openModal(button.dataset.modalOpen);
  });
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    closeModal(button.closest(".modal"));
  });
});

modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const activeModal = document.querySelector(".modal.active");
    if (activeModal) {
      closeModal(activeModal);
    }
  }
});
