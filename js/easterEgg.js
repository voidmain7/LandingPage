document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const alien = document.createElement("button");
  const scoreBadge = document.createElement("div");
  let score = 0;
  let x = window.innerWidth * 0.75;
  let y = window.innerHeight * 0.45;
  let vx = 0.55;
  let vy = 0.42;
  let rafId = null;
  let inviteShown = false;

  alien.className = "alien-easter-egg";
  alien.type = "button";
  alien.title = "Pincha el marcianito";
  alien.setAttribute("aria-label", "Pincha el marcianito");
  alien.innerHTML = '<span class="alien-eye left"></span><span class="alien-eye right"></span><span class="alien-mouth"></span>';

  scoreBadge.className = "alien-score-badge";
  scoreBadge.textContent = "Marcianitos: 0";

  document.body.append(scoreBadge, alien);

  function keepInBounds() {
    const size = alien.offsetWidth || 46;
    x = Math.max(8, Math.min(window.innerWidth - size - 8, x));
    y = Math.max(8, Math.min(window.innerHeight - size - 8, y));
  }

  function placeAlien() {
    alien.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function moveAlien() {
    if (!prefersReducedMotion) {
      const size = alien.offsetWidth || 46;
      x += vx;
      y += vy;

      if (x <= 8 || x >= window.innerWidth - size - 8) vx *= -1;
      if (y <= 8 || y >= window.innerHeight - size - 8) vy *= -1;

      keepInBounds();
      placeAlien();
      rafId = requestAnimationFrame(moveAlien);
    }
  }

  function createParticle(startX, startY) {
    const particle = document.createElement("span");
    const angle = Math.random() * Math.PI * 2;
    const distance = 42 + Math.random() * 40;

    particle.className = "alien-particle";
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    particle.style.setProperty("--tx", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--ty", `${Math.sin(angle) * distance}px`);
    document.body.appendChild(particle);
    particle.addEventListener("animationend", () => particle.remove(), { once: true });
  }

  function showGameInvite() {
    if (inviteShown) return;

    const projectCard = document.querySelector("#ProyectosPersonales .proyecto-card");
    if (!projectCard) return;

    inviteShown = true;

    const invite = document.createElement("div");
    invite.className = "alien-game-invite";
    invite.innerHTML = `
      <div class="alien-game-buddy" aria-hidden="true">
        <span class="alien-eye left"></span>
        <span class="alien-eye right"></span>
        <span class="alien-mouth"></span>
        <span class="alien-arm left"></span>
        <span class="alien-arm right"></span>
      </div>
      <div class="alien-speech">
        <p>Has cazado 10 marcianitos. ¿Quieres probar mi juego?</p>
        <a href="https://javitron.itch.io/game" target="_blank" rel="noopener noreferrer">Probar juego</a>
      </div>
    `;

    projectCard.appendChild(invite);
    invite.scrollIntoView({ behavior: "smooth", block: "center" });

    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }

    alien.remove();
    scoreBadge.remove();
  }

  function popAlien() {
    const rect = alien.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    score += 1;
    scoreBadge.textContent = `Marcianitos: ${score}`;
    alien.classList.remove("popped");
    void alien.offsetWidth;
    alien.classList.add("popped");

    for (let i = 0; i < 12; i += 1) {
      createParticle(centerX, centerY);
    }

    x = 20 + Math.random() * Math.max(120, window.innerWidth - 90);
    y = 80 + Math.random() * Math.max(120, window.innerHeight - 160);
    vx = (Math.random() > 0.5 ? 1 : -1) * (0.35 + Math.random() * 0.45);
    vy = (Math.random() > 0.5 ? 1 : -1) * (0.3 + Math.random() * 0.4);
    keepInBounds();
    placeAlien();

    if (score >= 10) {
      showGameInvite();
    }
  }

  alien.addEventListener("click", popAlien);

  window.addEventListener("resize", () => {
    keepInBounds();
    placeAlien();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    } else if (!document.hidden && !prefersReducedMotion && !rafId) {
      moveAlien();
    }
  });

  if (prefersReducedMotion) {
    x = window.innerWidth - 64;
    y = window.innerHeight - 82;
    keepInBounds();
    placeAlien();
  } else {
    moveAlien();
  }
});
