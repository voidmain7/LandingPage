let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  if (currentScroll <= 0) {
    header.classList.remove("hidden");
    footer.classList.remove("hidden");
    return;
  }

  if (currentScroll > lastScroll) {
    // Bajando → ocultar
    header.classList.add("hidden");
    footer.classList.add("hidden");
  } else {
    // Subiendo → mostrar
    header.classList.remove("hidden");
    footer.classList.remove("hidden");
  }

  lastScroll = currentScroll;
});
