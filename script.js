// Sélectionne les éléments de la navigation
const nav = document.querySelector(".nav");
const navMenu = document.querySelector(".nav-items");
const btnToggleNav = document.querySelector(".menu-btn");

// Sélectionne les éléments de travail et les images de travail
const workEls = document.querySelectorAll(".work-box");
const workImgs = document.querySelectorAll(".work-img");

// Sélectionne l'élément principal et l'élément de l'année dans le pied de page
const mainEl = document.querySelector("main");
const yearEl = document.querySelector(".footer-text span");

// Fonction pour basculer la navigation
const toggleNav = () => {
  // Ajoute ou supprime la classe "hidden" pour afficher ou masquer la navigation
  nav.classList.toggle("hidden");

  // Empêche le défilement de l'écran lorsque le menu est ouvert
  document.body.classList.toggle("lock-screen");

  // Change le texte du bouton en fonction de l'état du menu
  if (nav.classList.contains("hidden")) {
    btnToggleNav.textContent = "menu";
  } else {
    // Lorsque le menu est ouvert après la transition, change le texte respectivement
    setTimeout(() => {
      btnToggleNav.textContent = "close";
    }, 475);
  }
};

// Ajoute un écouteur d'événement pour le bouton de basculement de la navigation
btnToggleNav.addEventListener("click", toggleNav);

// Ajoute un écouteur d'événement pour les éléments du menu de navigation
navMenu.addEventListener("click", (e) => {
  // Si l'élément cliqué est un lien, bascule la navigation
  if (e.target.localName === "a") {
    toggleNav();
  }
});

// Ajoute un écouteur d'événement pour la touche "Escape" pour fermer le menu
document.body.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !nav.classList.contains("hidden")) {
    toggleNav();
  }
});

// Ajoute la classe "transform" à toutes les images de travail pour les animer
workImgs.forEach((workImg) => workImg.classList.add("transform"));

// Crée un observateur d'intersection pour animer les instances de travail au défilement
let observer = new IntersectionObserver(
  (entries) => {
    const [entry] = entries;
    const [textbox, picture] = Array.from(entry.target.children);
    if (entry.isIntersecting) {
      picture.classList.remove("transform");
      Array.from(textbox.children).forEach(
        (el) => (el.style.animationPlayState = "running")
      );
    }
  },
  { threshold: 0.3 }
);

// Observe chaque élément de travail pour déclencher l'animation
workEls.forEach((workEl) => {
  observer.observe(workEl);
});

// Sélectionne l'élément de basculement du thème et récupère le thème stocké
const switchThemeEl = document.querySelector('input[type="checkbox"]');
const storedTheme = localStorage.getItem("theme");

// Définit l'état initial du basculement du thème en fonction du thème stocké
switchThemeEl.checked = storedTheme === "dark" || storedTheme === null;

// Ajoute un écouteur d'événement pour basculer le thème et stocker la préférence de l'utilisateur
switchThemeEl.addEventListener("click", () => {
  const isChecked = switchThemeEl.checked;

  if (!isChecked) {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
    switchThemeEl.checked = false;
  } else {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }
});

// Sélectionne le dernier élément focalisé pour piéger la tabulation lorsque le menu est ouvert
const lastFocusedEl = document.querySelector('a[data-focused="last-focused"]');

// Ajoute un écouteur d'événement pour piéger la tabulation lorsque le menu est ouvert
document.body.addEventListener("keydown", (e) => {
  if (e.key === "Tab" && document.activeElement === lastFocusedEl) {
    e.preventDefault();
    btnToggleNav.focus();
  }
});

// Animation de rotation des logos
const logosWrappers = document.querySelectorAll(".logo-group");

// Fonction de temporisation pour les animations
const sleep = (number) => new Promise((res) => setTimeout(res, number));

// Ajoute une animation de rotation aux groupes de logos
logosWrappers.forEach(async (logoWrapper, i) => {
  const logos = Array.from(logoWrapper.children);
  await sleep(1400 * i);
  setInterval(() => {
    let temp = logos[0];
    logos[0] = logos[1];
    logos[1] = logos[2];
    logos[2] = temp;
    logos[0].classList.add("hide", "to-top");
    logos[1].classList.remove("hide", "to-top", "to-bottom");
    logos[2].classList.add("hide", "to-bottom");
  }, 5600);
});

// Met à jour l'année dans le pied de page avec l'année actuelle
yearEl.textContent = new Date().getFullYear();