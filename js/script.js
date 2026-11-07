// Interações do portfólio.
// Cada comportamento fica isolado em uma função para facilitar a manutenção.

document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setupCurrentYear();
  setupProfilePhoto();
  setupNavigationState();
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
      isExpanded ? "Abrir menu de navegação" : "Fechar menu de navegação"
    );
    navigation.classList.toggle("is-open", !isExpanded);
  });

  navigation.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 681px)").matches) closeMenu();
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
  if (yearElement) yearElement.textContent = String(new Date().getFullYear());
}

function setupProfilePhoto() {
  const profilePhoto = document.querySelector(".profile-photo");
  if (!profilePhoto) return;

  const fallbackSrc = profilePhoto.dataset.fallbackSrc;
  if (!fallbackSrc) return;

  function applyFallback() {
    // Enquanto a foto pessoal não existir, mostramos o avatar de reserva.
    if (profilePhoto.dataset.fallbackApplied === "true") return;
    profilePhoto.dataset.fallbackApplied = "true";
    profilePhoto.src = fallbackSrc;
    profilePhoto.classList.add("is-placeholder");
  }

  profilePhoto.addEventListener("error", applyFallback);

  // Também cobre o caso em que a imagem falhou antes deste listener ser criado.
  if (profilePhoto.complete && profilePhoto.naturalWidth === 0) applyFallback();
}

function setupNavigationState() {
  const navigationLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  const sections = navigationLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
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
    const activationPoint = (header?.offsetHeight || 0) + window.innerHeight * 0.2;
    let activeSection = sections[0];

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= activationPoint) {
        activeSection = section;
      }
    });

    // No fim da página, a última seção deve permanecer ativa.
    const reachedPageBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (reachedPageBottom) activeSection = sections[sections.length - 1];

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

  window.addEventListener("scroll", scheduleNavigationUpdate, { passive: true });
  window.addEventListener("resize", scheduleNavigationUpdate);
  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = link.getAttribute("href").slice(1);
      setActiveSection(targetId);
      scheduleNavigationUpdate();
    });
  });

  updateActiveLink();
}
