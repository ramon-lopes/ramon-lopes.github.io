// Interações do portfólio
// Mantemos cada comportamento em uma pequena função para facilitar a manutenção.

document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setupCurrentYear();
  setupNavigationState();
});

function setupMobileMenu() {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#main-navigation");

  // Se os elementos não existirem nesta página, não há nada a configurar.
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
      isExpanded ? "Abrir menu de navegação" : "Fechar menu de navegação"
    );
    navigation.classList.toggle("is-open", !isExpanded);
  });

  // Fechar o menu após selecionar uma seção é útil em telas pequenas.
  navigation.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Se a janela for redimensionada para desktop, removemos o estado móvel.
  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 681px)").matches) {
      closeMenu();
    }
  });

  // Escape fecha o menu se ele estiver aberto.
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
  if (!yearElement) return;

  yearElement.textContent = String(new Date().getFullYear());
}

function setupNavigationState() {
  const sectionLinks = document.querySelectorAll('.main-nav a[href^="#"]');
  const sections = [...sectionLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sectionLinks.length || !sections.length || !("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (!visibleSections.length) return;

      const activeId = visibleSections[0].target.id;

      sectionLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${activeId}`) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    },
    {
      rootMargin: "-20% 0px -60% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
  );

  sections.forEach((section) => observer.observe(section));
}
