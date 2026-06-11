document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  let targetX = 70;
  let targetY = 28;
  let currentX = targetX;
  let currentY = targetY;
  let rafId = null;

  function animateFog() {
    currentX += (targetX - currentX) * 0.035;
    currentY += (targetY - currentY) * 0.035;

    document.body.style.setProperty("--fog-x", `${currentX.toFixed(2)}%`);
    document.body.style.setProperty("--fog-y", `${currentY.toFixed(2)}%`);

    rafId = requestAnimationFrame(animateFog);
  }

  window.addEventListener("pointermove", (event) => {
    targetX = (event.clientX / window.innerWidth) * 100;
    targetY = (event.clientY / window.innerHeight) * 100;

    if (!rafId) {
      rafId = requestAnimationFrame(animateFog);
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    } else if (!document.hidden && !rafId) {
      rafId = requestAnimationFrame(animateFog);
    }
  });
});
