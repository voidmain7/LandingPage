document.addEventListener("DOMContentLoaded", () => {
  let lastScroll = 0;
  let hideTimeout = null;

  const header = document.querySelector("header");
  const body = document.body;

  const checkScroll = () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.classList.remove("hidden");
      body.classList.remove("header-hidden");
      if (hideTimeout) clearTimeout(hideTimeout);
    } else if (currentScroll > lastScroll) {
      header.classList.add("hidden");
      body.classList.add("header-hidden");
      if (hideTimeout) clearTimeout(hideTimeout);
    } else {
      header.classList.remove("hidden");
      body.classList.remove("header-hidden");

      if (hideTimeout) clearTimeout(hideTimeout);

      hideTimeout = setTimeout(() => {
        if (window.pageYOffset > 0) {
          header.classList.add("hidden");
          body.classList.add("header-hidden");
        }
      }, 2000);
    }

    lastScroll = currentScroll;
  };

  window.addEventListener("scroll", checkScroll);
});
