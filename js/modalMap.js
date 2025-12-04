document.addEventListener("DOMContentLoaded", () => {
  const btnUbicacion = document.getElementById("btnUbicacion");
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("modalOverlay");
  const cerrar = document.getElementById("cerrarModal");

  if (!btnUbicacion || !modal || !overlay || !cerrar) return;

  btnUbicacion.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
    overlay.style.display = "block";
  });

  cerrar.addEventListener("click", () => {
    modal.style.display = "none";
    overlay.style.display = "none";
  });

  overlay.addEventListener("click", () => {
    modal.style.display = "none";
    overlay.style.display = "none";
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.style.display = "none";
      overlay.style.display = "none";
    }
  });
});
