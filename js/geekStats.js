document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  const clockEl = document.getElementById("clock");
  const memEl = document.getElementById("memoria");
  const screenEl = document.getElementById("screen");
  const cookiesEl = document.getElementById("cookies");
  const langEl = document.getElementById("lang");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (clockEl) {
    function updateClock() {
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      clockEl.textContent =
        now.toLocaleDateString("es-ES", options) +
        " " +
        now.toLocaleTimeString("es-ES");
    }
    setInterval(updateClock, 1000);
    updateClock();
  }

  if (memEl && performance && performance.memory) {
    function updateMemory() {
      const mem = (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
      memEl.textContent = `${mem} MB`;
    }
    setInterval(updateMemory, 2000);
    updateMemory();
  }

  function updateScreen() {
    screenEl.textContent = `${window.innerWidth}x${window.innerHeight}`;
  }
  updateScreen();
  window.addEventListener("resize", updateScreen);

  cookiesEl.textContent = navigator.cookieEnabled ? "Sí" : "No";

  langEl.textContent = navigator.language;
});
