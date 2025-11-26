// Modal de ubicación
const btnUbicacion = document.getElementById("btnUbicacion");
const modal = document.getElementById("modal");
const overlay = document.getElementById("modalOverlay");
const cerrar = document.getElementById("cerrarModal");

// Abrir modal
btnUbicacion.addEventListener("click", function (e) {
  e.preventDefault();
  modal.style.display = "block";
  overlay.style.display = "block";
});

// Cerrar modal al click en botón
cerrar.addEventListener("click", function () {
  modal.style.display = "none";
  overlay.style.display = "none";
});

// Cerrar modal al click en overlay
overlay.addEventListener("click", function () {
  modal.style.display = "none";
  overlay.style.display = "none";
});
