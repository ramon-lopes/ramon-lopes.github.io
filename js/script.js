/* Interações do portfólio.
   Cada comportamento fica isolado em uma função para facilitar a manutenção. */

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setupCurrentYear();
  setupProfilePhoto();
  setupNavigationState();
  setupScrollReveal();
});

function setupMobileMenu() {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#main-navigation");

  if (!menuButton || !navigation) return;

  function closeMenu() {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu de navegação");
    navigation.classList.remove("is-open");
  }

  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    menuButton.setAttribute(
      "aria-label",
      isExpanded ? "Abrir menu de navegação" : "Fechar menu de navegação",
    );
    navigation.classList.toggle("is-open", !isExpanded);
  });

  document.querySelectorAll('.site-header a[href^="#"]').forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 681px)").matches) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";

    if (event.key === "Escape" && isExpanded) {
      closeMenu();
      menuButton.focus();
    }
  });
}

function setupCurrentYear() {
  const yearElement = document.querySelector("#ano");

  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}

function setupProfilePhoto() {
  const profilePhoto = document.querySelector(".profile-photo");

  if (!profilePhoto) return;

  const fallbackSrc = profilePhoto.dataset.fallbackSrc;

  if (!fallbackSrc) return;

  function handleImageError() {
    // Se a própria imagem reserva falhar, oculta o ícone de imagem quebrada.
    if (profilePhoto.dataset.fallbackApplied === "true") {
      profilePhoto.hidden = true;
      return;
    }

    profilePhoto.dataset.fallbackApplied = "true";
    profilePhoto.alt = "Ilustração de perfil de Ramon Lopes";
    profilePhoto.classList.add("is-placeholder");
    profilePhoto.src = fallbackSrc;
  }

  // O listener também captura a falha da imagem reserva, sem criar um loop.
  profilePhoto.addEventListener("error", handleImageError);

  // Cobre imagens que falharam antes da criação do listener.
  if (profilePhoto.complete && profilePhoto.naturalWidth === 0) {
    handleImageError();
  }
}

function setupNavigationState() {
  const navigationLinks = [
    ...document.querySelectorAll('.main-nav a[href^="#"]'),
  ];

  const sections = navigationLinks
    .map((link) => document.getElementById(link.getAttribute("href").slice(1)))
    .filter(Boolean);

  if (!navigationLinks.length || !sections.length) return;

  function setActiveSection(sectionId) {
    navigationLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${sectionId}`) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function updateActiveLink() {
    const header = document.querySelector(".site-header");
    const activationPoint =
      (header?.offsetHeight || 0) + window.innerHeight * 0.2;

    let activeSection = sections[0];

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= activationPoint) {
        activeSection = section;
      }
    });

    // No fim da página, mantém ativa a última seção.
    const reachedPageBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2;

    if (reachedPageBottom) {
      activeSection = sections[sections.length - 1];
    }

    setActiveSection(activeSection.id);
  }

  let scrollScheduled = false;

  function scheduleNavigationUpdate() {
    if (scrollScheduled) return;

    scrollScheduled = true;

    window.requestAnimationFrame(() => {
      updateActiveLink();
      scrollScheduled = false;
    });
  }

  window.addEventListener("scroll", scheduleNavigationUpdate, {
    passive: true,
  });
  window.addEventListener("resize", scheduleNavigationUpdate);
  window.addEventListener("hashchange", scheduleNavigationUpdate);

  // Define o item correto também ao abrir a página já em uma âncora.
  updateActiveLink();
}


// Animação progressiva de entrada: sem suporte ou com movimento reduzido, exibe normalmente.
function setupScrollReveal() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion || !("IntersectionObserver" in window)) return;

  const targets = document.querySelectorAll(
    ".section-heading, .about-intro, .education-card, .skill-card, .project-card, .contact-card",
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -24px 0px",
  });

  targets.forEach((target) => {
    target.classList.add("reveal-ready");
    observer.observe(target);
  });
}
